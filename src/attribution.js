// ─── Attribution data model ───────────────────────────────────────────────────
// Parses the two Google Sheets exports and derives every number the Job
// Attribution tab shows. Kept pure and separate from the view so the figures
// stay re-derivable — and so they can be checked against the pivot tables the
// same workbook produced (see SELF_CHECK at the bottom).
//
// Source files (Google Sheets → File → Download → CSV):
//   360 Attribution Scan - scan.csv        one row per HCP customer (keyed by phone)
//   360 Attribution Scan - tag_report.csv  GHL contacts tagged as Facebook leads
//
// IMPORTANT — what a scan row is: one row is ONE HCP CUSTOMER, not one job.
// The columns are "Scheduled (first job)", "First Job Description" and
// "Total Jobs (this phone)", so counting rows counts customers (equivalently,
// first jobs). Jobs actually delivered = the SUM of "Total Jobs (this phone)".
// The two differ by ~4.7x for AI leads, so every figure below is labelled
// explicitly as customers or jobs.

/** RFC4180-ish parser — handles quoted fields, embedded commas and "" escapes. */
export function parseCSV(text) {
  const rows = [];
  let field = "", row = [], inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\r") { /* skip */ }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.length > 1 || r[0] !== "");
}

function toObjects(text) {
  const rows = parseCSV(text);
  if (!rows.length) return [];
  const head = rows[0].map(h => h.trim());
  return rows.slice(1).map(r =>
    Object.fromEntries(head.map((k, i) => [k, (r[i] ?? "").trim()]))
  );
}

// Tier identity is fixed here, and colour is bound to the tier — never to its
// rank in a sorted list. Filtering the chart must not repaint the survivors.
export const TIERS = [
  { key: "AI LEAD",            label: "AI lead",           color: "#2A8C63" },
  { key: "NOT IN GHL",         label: "Not in GHL",        color: "#3B6FA8" },
  { key: "NO PHONE",           label: "No phone on file",  color: "#BE6B1E" },
  { key: "IN GHL (no AI tag)", label: "In GHL, no AI tag", color: "#A04E7C" },
];
export const tierMeta = k => TIERS.find(t => t.key === k) || { key: k, label: k, color: "#9AA59E" };

// Job-type buckets. This reproduces the workbook's own pivot exactly
// (216 / 63 / 56 / 48 / 5) — verified in SELF_CHECK.
export const JOB_CATS = ["Checkup/Follow-up", "Treatment", "Inspection", "Other", "(no description)"];
export function jobCategory(desc) {
  const s = (desc || "").toLowerCase();
  if (!s) return "(no description)";
  if (s.includes("check up") || s.includes("checkup") || s.includes("follow")) return "Checkup/Follow-up";
  if (s.includes("treatment")) return "Treatment";
  if (s.includes("inspection")) return "Inspection";
  return "Other";
}

const digits = s => (s || "").replace(/\D/g, "");
const last10 = s => digits(s).slice(-10);
const jobsOf = r => parseInt(r["Total Jobs (this phone)"] || "0", 10) || 0;
const monthOf = r => (r["Scheduled (first job)"] || "").slice(0, 7);

/** Build every derived figure from the two raw CSV strings. */
export function buildAttribution(scanText, tagText, now = new Date()) {
  const scan = toObjects(scanText).map(r => ({
    scheduled: r["Scheduled (first job)"] || "",
    customer:  r["HCP Customer"] || "",
    phone:     r["Phone"] || "",
    desc:      r["First Job Description"] || "",
    tier:      r["Tier"] || "",
    ghlName:   r["GHL Contact Name"] || "",
    jobs:      jobsOf(r),
    fbForm:    (r["fb-lead-form?"] || "").toUpperCase() === "YES",
    month:     monthOf(r),
    year:      (r["Scheduled (first job)"] || "").slice(0, 4),
    category:  jobCategory(r["First Job Description"]),
  }));

  const tag = toObjects(tagText).map(r => ({
    name:      r["Name"] || "",
    phone:     r["Phone"] || "",
    hcpJobs:   parseInt(r["HCP Jobs"] || "0", 10) || 0,
    converted: (r["Converted?"] || "").toUpperCase() === "YES",
    alsoFbLead:(r["Also fullbookai_lead?"] || "").toUpperCase() === "YES",
  }));

  const nowISO = now.toISOString();

  // ── Per-period rollups ─────────────────────────────────────────────────────
  // Every breakdown is computed once per period AND carries both measures
  // (customers and jobs), so the Period and Count controls can drive all of
  // them rather than just the tier chart. Anything that genuinely cannot follow
  // a control is declared in FILTERABILITY below and says so in the UI.
  const scan2026 = scan.filter(r => r.year === "2026");

  const rollupTiers = (rows) => TIERS.map(t => {
    const sub = rows.filter(r => r.tier === t.key);
    const jobs = sub.reduce((a, r) => a + r.jobs, 0);
    return { ...t, customers: sub.length, jobs, avgJobs: sub.length ? jobs / sub.length : 0 };
  }).filter(t => t.customers > 0);

  // A time series with missing months must not render them as adjacent bars —
  // that silently compresses gaps and distorts the trend. Fill the run.
  const fillMonths = (list) => {
    if (!list.length) return list;
    const byKey = Object.fromEntries(list.map(x => [x.month, x]));
    const out = [];
    let [y, m] = list[0].month.split("-").map(Number);
    const [yEnd, mEnd] = list[list.length - 1].month.split("-").map(Number);
    while (y < yEnd || (y === yEnd && m <= mEnd)) {
      const key = `${y}-${String(m).padStart(2, "0")}`;
      out.push(byKey[key] || { month: key, customers: 0, jobs: 0 });
      if (m === 12) { m = 1; y++; } else m++;
    }
    return out;
  };

  // "Scheduled (first job)" is a SCHEDULING date, so it runs into the future.
  // Months past today are still filling and must not be read as a decline.
  const rollupMonthly = (rows) => {
    const by = {};
    rows.filter(r => r.tier === "AI LEAD" && r.month).forEach(r => {
      const b = by[r.month] || (by[r.month] = { month: r.month, customers: 0, jobs: 0 });
      b.customers++; b.jobs += r.jobs;
    });
    return fillMonths(Object.values(by).sort((a, b) => a.month.localeCompare(b.month)));
  };

  const rollupMix = (rows) => {
    const by = {};
    rows.filter(r => r.tier === "AI LEAD").forEach(r => {
      const b = by[r.category] || (by[r.category] = { cat: r.category, customers: 0, jobs: 0 });
      b.customers++; b.jobs += r.jobs;
    });
    return JOB_CATS.map(c => by[c]).filter(Boolean);
  };

  const buildScope = (rows) => {
    const tiers = rollupTiers(rows);
    const ai   = tiers.find(t => t.key === "AI LEAD")    || { customers:0, jobs:0, avgJobs:0 };
    const base = tiers.find(t => t.key === "NOT IN GHL") || { customers:0, jobs:0, avgJobs:0 };
    return {
      tiers,
      monthly: rollupMonthly(rows),
      jobMix:  rollupMix(rows),
      totals: {
        customers:   rows.length,
        jobs:        rows.reduce((a, r) => a + r.jobs, 0),
        aiCustomers: ai.customers,
        aiJobs:      ai.jobs,
        aiAvgJobs:   ai.avgJobs,
        baseAvgJobs: base.avgJobs,
      },
    };
  };

  const scopes = { all: buildScope(scan), "2026": buildScope(scan2026) };
  const strays = scan.filter(r => r.tier === "AI LEAD" && r.month && r.month < "2026-01").length;

  // ── Facebook lead-form funnel ──────────────────────────────────────────────
  // tag_report = every GHL contact carrying the Facebook lead-form tag.
  const scanPhones = new Set(scan.map(r => last10(r.phone)).filter(Boolean));
  const fbInHcp    = tag.filter(r => last10(r.phone) && scanPhones.has(last10(r.phone))).length;
  const fbWithJobs = tag.filter(r => r.hcpJobs > 0).length;
  const fbConverted= tag.filter(r => r.converted).length;
  const fbJobsTotal= tag.reduce((a, r) => a + r.hcpJobs, 0);
  const fbFunnel = [
    { step: "Tagged as Facebook lead in GHL", value: tag.length },
    { step: "Phone matches an HCP customer",  value: fbInHcp },
    { step: "Has at least one HCP job",       value: fbWithJobs },
    { step: "Flagged converted",              value: fbConverted },
  ];

  // ── Data-quality flags — things a reader should know before trusting a number ──
  const quality = [];
  const futureRows = scan.filter(r => r.scheduled > nowISO).length;
  if (futureRows) quality.push({
    level: "info",
    text: `${futureRows.toLocaleString()} of ${scan.length.toLocaleString()} rows have a first job scheduled in the future. "Scheduled (first job)" is a booking date, not a completion date, so the latest months include work that has not happened yet.`,
  });
  const noPhone = scan.filter(r => !digits(r.phone)).length;
  if (noPhone) quality.push({
    level: "warn",
    text: `${noPhone} HCP customers have no phone number, so they cannot be matched to GHL at all. They sit in the "No phone on file" tier and are unattributable by construction — not evidence the AI missed them.`,
  });
  const preAI = scan.filter(r => r.year < "2026").length;
  if (preAI) quality.push({
    level: "warn",
    text: `${preAI.toLocaleString()} customers (${Math.round(preAI / scan.length * 100)}%) have their first job before 2026, predating the AI. All-time attribution rate is therefore misleadingly low — the 2026 view is the fair comparison.`,
  });
  const tagJobsNoConvert = tag.filter(r => r.hcpJobs > 0 && !r.converted);
  if (tagJobsNoConvert.length) {
    const many = tagJobsNoConvert.length > 1;
    const jobs = tagJobsNoConvert.reduce((a, r) => a + r.hcpJobs, 0);
    quality.push({
      level: "warn",
      text: `${tagJobsNoConvert.length} Facebook-tagged contact${many ? "s have" : " has"} HCP jobs but ${many ? "are" : "is"} not flagged "Converted?" (${jobs} job${jobs > 1 ? "s" : ""}${many ? " between them" : ""}). The two columns disagree; the "converted" count is the more conservative of the two.`,
    });
  }
  const blankTag = tag.filter(r => !r.name && !digits(r.phone)).length;
  if (blankTag) quality.push({
    level: "warn",
    text: `${blankTag} row${blankTag > 1 ? "s" : ""} in the tag report ${blankTag > 1 ? "have" : "has"} neither a name nor a phone number, so ${blankTag > 1 ? "they" : "it"} cannot be matched or verified.`,
  });
  if (strays) quality.push({
    level: "info",
    text: `${strays} AI-tagged customers have a first job dated before 2026 (as far back as 2022). These are almost certainly existing customers who were later tagged in GHL, not leads the AI generated. On "All time" they appear in the trend; on "2026 only" they are excluded.`,
  });

  const dates = scan.map(r => r.scheduled).filter(Boolean).sort();

  return {
    scan, tag, nowISO,
    scopes,
    meta: { dateMin: dates[0] || "", dateMax: dates[dates.length - 1] || "" },
    fbFunnel,
    fb: { tagged: tag.length, inHcp: fbInHcp, withJobs: fbWithJobs, converted: fbConverted, jobsTotal: fbJobsTotal },
    quality,
  };
}

/**
 * Which controls each panel can honestly follow.
 *
 * The Facebook panels are the important entry here: tag_report.csv has no date
 * column at all (Name, Phone, HCP Jobs, Converted?, Also fullbookai_lead?), so
 * there is no way to restrict that funnel to a period. Rather than let it sit
 * silently showing all-time numbers under a "2026 only" filter — which reads as
 * filtered data and is how the figures get misquoted — the UI labels it.
 */
export const FILTERABILITY = {
  coverage: { period: true,  metric: true },
  trend:    { period: true,  metric: true },
  jobMix:   { period: true,  metric: true },
  facebook: { period: false, metric: false,
    why: "The Facebook tag report has no date or job-date column, so it cannot be split by period. These are all-time figures whichever period is selected." },
  quality:  { period: false, metric: false,
    why: "These caveats describe the whole export, not the selected period." },
  pivots:   { period: false, metric: false,
    why: "Cross-checks compare against the workbook's all-time pivot tables, so they are deliberately unfiltered." },
};

/**
 * Strip the model down to what the dashboard actually renders — counts only.
 *
 * This is the PII boundary. The raw CSVs hold ~3,200 customer names and phone
 * numbers; the dashboard never displays a single one of them, so nothing but
 * aggregates is allowed to cross into the committed artefact. The raw exports
 * stay gitignored and local. Do not add per-row data to this return value.
 *
 * Month flags (future / partial) are deliberately NOT baked in — they depend on
 * "now" and would go stale the moment the file is committed. The view recomputes
 * them at render time.
 */
export function toAggregates(model) {
  const { scan, tag, nowISO, ...rest } = model;
  return {
    ...rest,
    generatedAt: nowISO,
    sourceRows: { scan: scan.length, tag: tag.length },
  };
}

// ─── Self-check against the workbook's own pivot tables ───────────────────────
// The same Google Sheet produced two summary pivots. If this module's parse
// disagrees with them, the dashboard says so rather than quietly showing a
// different number than the sheet the team already trusts.
export const PIVOT_BASELINE = {
  aiLeadTotal: 388,
  jobMix: { "Checkup/Follow-up": 216, "Treatment": 63, "Inspection": 56, "(no description)": 48, "Other": 5 },
};

export function selfCheck(model) {
  // Always checked against the all-time scope — the workbook's pivots are
  // all-time, so checking a filtered view would report false mismatches.
  const all = model.scopes.all;
  const out = [];
  const ai = all.totals.aiCustomers;
  out.push({
    label: "AI-lead total vs sheet pivot",
    ours: ai, theirs: PIVOT_BASELINE.aiLeadTotal, ok: ai === PIVOT_BASELINE.aiLeadTotal,
  });
  Object.entries(PIVOT_BASELINE.jobMix).forEach(([cat, theirs]) => {
    const ours = (all.jobMix.find(m => m.cat === cat) || { customers: 0 }).customers;
    out.push({ label: `Job type — ${cat}`, ours, theirs, ok: ours === theirs });
  });
  return out;
}
