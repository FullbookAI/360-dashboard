import { useState, useEffect } from "react";

const C = {
  bg: "#0D1B2A", panel: "#152638", panelDark: "#0A1520", border: "#1E3A52",
  text: "#E8F4F8", textMute: "#B0CDD8", textDim: "#6B8FA8", textFaint: "#4A7090",
  amber: "#E8A020", green: "#2ECC71", blue: "#3498DB", red: "#E74C3C", purple: "#9B59B6",
};

const styles = {
  app: { fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, minHeight: "100vh", color: C.text },
  setup: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" },
  card: { background: C.panel, borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "480px", border: `1px solid ${C.border}` },
  logo: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem", justifyContent: "center" },
  logoIcon: { width: "36px", height: "36px", background: C.amber, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  logoText: { fontSize: "1.4rem", fontWeight: "700", color: C.text, letterSpacing: "-0.02em" },
  logoSub: { fontSize: "0.75rem", color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase" },
  btn: { width: "100%", background: C.amber, color: C.bg, border: "none", borderRadius: "8px", padding: "12px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", letterSpacing: "0.02em" },
  btnGhost: { width: "100%", background: "transparent", color: C.textDim, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "11px", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  aiBtn: { background: C.amber, color: C.bg, border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", marginTop: "12px" },
  aiBtnDisabled: { background: "#3A5068", color: C.textDim, cursor: "not-allowed" },
  linkBtn: { background: "transparent", border: `1px solid ${C.border}`, color: C.amber, borderRadius: "6px", padding: "4px 10px", fontSize: "0.74rem", fontWeight: "600", cursor: "pointer" },
  hint: { fontSize: "0.78rem", color: C.textFaint, marginTop: "1rem", textAlign: "center", lineHeight: "1.5" },
  header: { background: C.panelDark, borderBottom: `1px solid ${C.border}`, padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  badge: { background: "#0D2E1A", color: C.green, border: "1px solid #1A5C32", borderRadius: "20px", padding: "3px 10px", fontSize: "0.72rem", letterSpacing: "0.06em", fontWeight: "600" },
  tabs: { display: "flex", gap: "4px", padding: "1rem 2rem 0", borderBottom: `1px solid ${C.border}`, overflowX: "auto" },
  tab: { padding: "8px 16px", borderRadius: "8px 8px 0 0", border: "none", background: "transparent", color: C.textFaint, cursor: "pointer", fontSize: "0.85rem", fontWeight: "500", whiteSpace: "nowrap", borderBottom: "2px solid transparent" },
  tabActive: { color: C.amber, borderBottom: `2px solid ${C.amber}` },
  content: { padding: "1.5rem 2rem", maxWidth: "1150px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem", marginBottom: "1.5rem" },
  statCard: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1.2rem" },
  statLabel: { fontSize: "0.72rem", color: C.textFaint, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" },
  statValue: { fontSize: "2rem", fontWeight: "700", color: C.text, lineHeight: "1" },
  statSub: { fontSize: "0.78rem", marginTop: "6px", color: C.textDim },
  section: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1.4rem", marginBottom: "1rem" },
  sectionTitle: { fontSize: "0.8rem", color: C.amber, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: "600", display: "flex", justifyContent: "space-between", alignItems: "center" },
  insightText: { fontSize: "0.88rem", color: C.textMute, lineHeight: "1.7" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}`, gap: "10px" },
  rowName: { fontSize: "0.88rem", color: C.text, fontWeight: "500" },
  rowSub: { fontSize: "0.78rem", color: C.textFaint, marginTop: "3px" },
  pill: { fontSize: "0.7rem", padding: "2px 8px", borderRadius: "10px", fontWeight: "600", whiteSpace: "nowrap" },
  actionItem: { display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px", borderRadius: "8px", marginBottom: "8px", border: `1px solid ${C.border}` },
  actionIcon: { width: "30px", height: "30px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 },
  actionTitle: { fontSize: "0.88rem", color: C.text, fontWeight: "600", marginBottom: "2px" },
  actionSub: { fontSize: "0.8rem", color: C.textDim },
  recItem: { display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${C.border}` },
  recNum: { background: C.amber, color: C.bg, borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: "700", flexShrink: 0, marginTop: "1px" },
  bar: { height: "8px", borderRadius: "4px", background: C.amber, minWidth: "4px" },
  barTrack: { flex: 1, height: "8px", background: C.bg, borderRadius: "4px", overflow: "hidden" },
  loadingScreen: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1.5rem" },
  spinner: { width: "48px", height: "48px", border: `3px solid ${C.border}`, borderTop: `3px solid ${C.amber}`, borderRadius: "50%", animation: "spin 1s linear infinite" },
  spinnerSm: { width: "16px", height: "16px", border: `2px solid ${C.border}`, borderTop: `2px solid ${C.amber}`, borderRadius: "50%", animation: "spin 1s linear infinite", display: "inline-block", verticalAlign: "middle", marginRight: "8px" },
  loadLabel: { color: C.textDim, fontSize: "0.9rem" },
  errorBox: { background: "#2A1215", border: "1px solid #5C1E24", borderRadius: "8px", padding: "1rem", color: C.red, fontSize: "0.85rem", marginBottom: "1rem", lineHeight: "1.6", whiteSpace: "pre-wrap" },
  refreshBtn: { background: "transparent", border: `1px solid ${C.amber}`, color: C.amber, borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "0.82rem" },
  note: { fontSize: "0.78rem", color: C.textFaint, fontStyle: "italic", marginTop: "10px", lineHeight: "1.5" },
  rangeBtn: { background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" },
  rangeBtnActive: { background: `${C.amber}22`, border: `1px solid ${C.amber}`, color: C.amber },
  bulletItem: { display: "flex", gap: "8px", padding: "6px 0", fontSize: "0.88rem", color: C.textMute, lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" },
  bulletDot: { color: C.amber, fontWeight: "700", flexShrink: 0, marginTop: "1px" },
  funnelSource: { marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${C.border}` },
};

// ─── helpers ──────────────────────────────────────────────────────────────────
function toDate(v) { if (!v) return null; const d = new Date(v); return isNaN(d.getTime()) ? null : d; }
function daysBetween(a, b) { return Math.floor((b - a) / 86400000); }
function isToday(d) { const n = new Date(); return d && d.toDateString() === n.toDateString(); }
function withinDays(d, n) { return d && (Date.now() - d.getTime()) <= n * 86400000; }
function withinRange(d, days) { return !days || !d || withinDays(d, days); }
function leadDate(c) { return toDate(c.dateAdded || c.createdAt || c.dateUpdated); }
function convDate(c) { return toDate(c.lastMessageDate || c.dateAdded); }
function fmtTime(d) { return d ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""; }
function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }

function leadSource(c) {
  const a = c.attributionSource || c.lastAttributionSource || {};
  const srcRaw = c.source || c.sourceName || "";
  const raw = (srcRaw || a.utmCampaign || a.campaign || a.medium || a.utmSource || a.source || "").toString().toLowerCase();
  const tags = Array.isArray(c.tags) ? c.tags.join(" ").toLowerCase() : "";
  const medium = (a.medium || "").toLowerCase();

  if (raw.includes("facebook") || raw.includes("fb") || raw.includes("meta") || raw.includes("instagram") ||
      medium.includes("paid") || medium.includes("cpc") || tags.includes("facebook") || tags.includes("meta")) return "Facebook / Meta";
  if (raw.includes("google") || tags.includes("google")) return "Google";
  if (raw.includes("form") || raw.includes("web") || raw.includes("landing") || raw.includes("site")) return "Website Form";
  if (raw.includes("referr") || tags.includes("referral")) return "Referral";
  if (raw.includes("phone") || raw.includes("call") || raw.includes("inbound")) return "Phone / Inbound Call";
  if (raw.includes("manual") || raw.includes("crm") || raw.includes("import")) return "Manual Entry";
  if (srcRaw) return srcRaw.charAt(0).toUpperCase() + srcRaw.slice(1);
  return "No Source";
}

function getName(obj) {
  return (obj.contactName || obj.fullName || `${obj.firstName || ""} ${obj.lastName || ""}`.trim() || "").toLowerCase().trim();
}

function nameMatch(a, b) {
  if (!a || !b) return false;
  const an = a.toLowerCase().trim(), bn = b.toLowerCase().trim();
  if (an === bn || an.includes(bn) || bn.includes(an)) return true;
  const aw = an.split(/\s+/).filter(w => w.length > 2);
  const bw = bn.split(/\s+/).filter(w => w.length > 2);
  return aw.some(w => bw.includes(w));
}

function isCall(type) { return type === "TYPE_CALL" || type === "TYPE_PHONE"; }
function parseCall(body = "") {
  const b = body.toLowerCase();
  const durationMatch = body.match(/(\d+)m(\d+)s/);
  return {
    inbound: b.includes("inbound"),
    answered: b.includes("answered"),
    voicemail: b.includes("voicemail"),
    missed: b.includes("no answer") || (b.includes("missed") && !b.includes("voicemail")),
    duration: durationMatch ? parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2]) : 0,
    aiHandled: b.includes(" ai ") || b.includes("bot") || b.includes("receptionist"),
    bookedInCall: b.includes("booked") || b.includes("appointment scheduled"),
    tookDetails: b.includes("details") || b.includes("captured") || b.includes("address"),
  };
}

function buildFunnel(contacts, convos, events) {
  const smsConvos = convos.filter(c => c.type === "TYPE_SMS");
  const sources = {};
  contacts.forEach(c => {
    const src = leadSource(c);
    if (!sources[src]) sources[src] = { leads: 0, smsStarted: 0, replied: 0, booked: 0 };
    const d = sources[src];
    d.leads++;
    const cid = c.id;
    const cname = getName(c);
    // prefer contactId match (reliable); fall back to name match
    const matched = smsConvos.find(cv =>
      (cid && cv.contactId && cv.contactId === cid) || nameMatch(getName(cv), cname)
    );
    if (matched) {
      d.smsStarted++;
      if ((matched.unreadCount || 0) > 0) d.replied++;
    }
    const hasAppt = events.some(e =>
      (cid && e.contactId && e.contactId === cid) || nameMatch(e.title || "", cname)
    );
    if (hasAppt) d.booked++;
  });
  return Object.entries(sources).sort((a, b) => b[1].leads - a[1].leads);
}

// ─── demo data ────────────────────────────────────────────────────────────────
const _now = Date.now();
const _h = (h) => new Date(_now + h * 3600000).toISOString();
const _d = (d) => new Date(_now - d * 86400000).toISOString();
const DEMO = {
  contacts: { contacts: [
    { contactName: "Maria Delgado", phone: "(512) 555-0142", source: "facebook", attributionSource: { medium: "paid", utmCampaign: "Spring Rodent Promo" }, dateAdded: _d(0) },
    { contactName: "James Okafor", phone: "(512) 555-0198", source: "facebook", attributionSource: { medium: "paid", utmCampaign: "Attic Rats Lookalike" }, dateAdded: _d(0) },
    { contactName: "Priya Nair", phone: "(512) 555-0177", source: "website form", dateAdded: _d(0) },
    { contactName: "Tyler Brooks", phone: "(737) 555-0110", source: "facebook", attributionSource: { medium: "paid" }, dateAdded: _d(1) },
    { contactName: "Sofia Russo", phone: "(512) 555-0166", source: "google", dateAdded: _d(1) },
    { contactName: "Aaron Webb", phone: "(512) 555-0123", source: "referral", dateAdded: _d(2) },
    { contactName: "Lena Fischer", phone: "(737) 555-0188", source: "facebook", attributionSource: { medium: "paid", utmCampaign: "Spring Rodent Promo" }, dateAdded: _d(2) },
    { contactName: "Marcus Hale", phone: "(512) 555-0144", source: "google", dateAdded: _d(3) },
    { contactName: "Dana Cole", phone: "(512) 555-0155", source: "website form", dateAdded: _d(4) },
    { contactName: "Omar Haddad", phone: "(737) 555-0133", source: "facebook", attributionSource: { medium: "paid", utmCampaign: "Attic Rats Lookalike" }, dateAdded: _d(5) },
    { contactName: "Grace Lin", phone: "(512) 555-0190", source: "referral", dateAdded: _d(6) },
    { contactName: "Ethan Pratt", phone: "(512) 555-0101", source: "google", dateAdded: _d(8) },
    { contactName: "Carmen Ruiz", phone: "(512) 555-0200", source: "phone", dateAdded: _d(1) },
    { contactName: "Derek Nash", phone: "(737) 555-0211", source: "phone", dateAdded: _d(3) },
  ] },
  conversations: { conversations: [
    { contactName: "Maria Delgado", type: "TYPE_SMS", lastMessageBody: "Hi, do you handle roof rats? Saw your ad.", unreadCount: 2, lastMessageDate: _d(0) },
    { contactName: "James Okafor", type: "TYPE_SMS", lastMessageBody: "Can someone come out this week?", unreadCount: 1, lastMessageDate: _d(0) },
    { contactName: "Priya Nair", type: "TYPE_CALL", lastMessageBody: "Inbound call · 2m14s · answered", unreadCount: 0, lastMessageDate: _d(0) },
    { contactName: "Tyler Brooks", type: "TYPE_SMS", lastMessageBody: "Thanks, see you Thursday!", unreadCount: 0, lastMessageDate: _d(1) },
    { contactName: "Sofia Russo", type: "TYPE_EMAIL", lastMessageBody: "Re: Quote for attic treatment", unreadCount: 1, lastMessageDate: _d(1) },
    { contactName: "Aaron Webb", type: "TYPE_CALL", lastMessageBody: "Outbound call · no answer · voicemail", unreadCount: 0, lastMessageDate: _d(2) },
    { contactName: "Lena Fischer", type: "TYPE_SMS", lastMessageBody: "What's your pricing for a single visit?", unreadCount: 3, lastMessageDate: _d(2) },
    { contactName: "Marcus Hale", type: "TYPE_CALL", lastMessageBody: "Inbound call · 4m02s · answered", unreadCount: 0, lastMessageDate: _d(3) },
    { contactName: "Dana Cole", type: "TYPE_SMS", lastMessageBody: "Confirmed for Tuesday, thank you", unreadCount: 0, lastMessageDate: _d(4) },
    { contactName: "Omar Haddad", type: "TYPE_SMS", lastMessageBody: "Still seeing droppings, can you re-treat?", unreadCount: 1, lastMessageDate: _d(5) },
    { contactName: "Carmen Ruiz", type: "TYPE_CALL", lastMessageBody: "Inbound call · 3m30s · answered", unreadCount: 0, lastMessageDate: _d(1) },
    { contactName: "Derek Nash", type: "TYPE_CALL", lastMessageBody: "Inbound call · 1m15s · answered", unreadCount: 0, lastMessageDate: _d(3) },
    { contactName: "Grace Lin", type: "TYPE_SMS", lastMessageBody: "Do you service North Austin?", unreadCount: 1, lastMessageDate: _d(6) },
  ] },
  appointments: { events: [
    { title: "Inspection · Maria Delgado", startTime: _h(20), appointmentStatus: "new", assignedUserId: "Tech A" },
    { title: "Treatment · Tyler Brooks", startTime: _h(28), appointmentStatus: "new", assignedUserId: "Tech B" },
    { title: "Inspection · Priya Nair", startTime: _h(46), appointmentStatus: "confirmed", assignedUserId: "Tech A" },
    { title: "Re-treat · Omar Haddad", startTime: _h(54), appointmentStatus: "new", assignedUserId: "Tech B" },
    { title: "Treatment · Dana Cole", startTime: _h(72), appointmentStatus: "confirmed", assignedUserId: "Tech A" },
    { title: "Inspection · Sofia Russo", startTime: _h(96), appointmentStatus: "confirmed", assignedUserId: "Tech B" },
    { title: "Treatment · Marcus Hale", startTime: _h(-24), appointmentStatus: "confirmed", assignedUserId: "Tech A" },
    { title: "Inspection · Aaron Webb", startTime: _h(-48), appointmentStatus: "showed", assignedUserId: "Tech B" },
    { title: "Consultation · Carmen Ruiz", startTime: _h(32), appointmentStatus: "confirmed", assignedUserId: "Tech A" },
  ] },
};

// ─── shared components ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color: accent || C.text }}>{value}</div>
      {sub && <div style={{ ...styles.statSub, color: accent === C.red ? C.red : C.textDim }}>{sub}</div>}
    </div>
  );
}

function BarRow({ label, value, max, accent }) {
  const p = max ? Math.max(4, (value / max) * 100) : 4;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0" }}>
      <div style={{ width: "130px", fontSize: "0.82rem", color: C.textMute }}>{label}</div>
      <div style={styles.barTrack}><div style={{ ...styles.bar, width: `${p}%`, background: accent || C.amber }} /></div>
      <div style={{ width: "36px", textAlign: "right", fontSize: "0.85rem", color: C.text, fontWeight: "600" }}>{value}</div>
    </div>
  );
}

function FunnelStage({ label, count, base, accent }) {
  const p = base ? Math.round((count / base) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0" }}>
      <div style={{ width: "160px", fontSize: "0.8rem", color: C.textMute, flexShrink: 0 }}>{label}</div>
      <div style={styles.barTrack}>
        <div style={{ ...styles.bar, width: `${Math.max(p, 3)}%`, background: accent || C.amber }} />
      </div>
      <div style={{ minWidth: "90px", textAlign: "right", fontSize: "0.82rem", color: C.text }}>
        {count} <span style={{ color: C.textFaint, fontWeight: "400" }}>({p}%)</span>
      </div>
    </div>
  );
}

function TimeRangePicker({ value, onChange }) {
  const opts = [{ label: "7D", days: 7 }, { label: "30D", days: 30 }, { label: "90D", days: 90 }, { label: "All", days: 0 }];
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <span style={{ fontSize: "0.72rem", color: C.textFaint, marginRight: "2px" }}>Range:</span>
      {opts.map(o => (
        <button key={o.days} onClick={() => onChange(o.days)}
          style={{ ...styles.rangeBtn, ...(value === o.days ? styles.rangeBtnActive : {}) }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function BulletList({ items, accent }) {
  if (!items) return null;
  const arr = Array.isArray(items) ? items : [items];
  return (
    <div>
      {arr.map((item, i) => (
        <div key={i} style={styles.bulletItem}>
          <span style={{ ...styles.bulletDot, color: accent || C.amber }}>▸</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function AnalyzePrompt({ onAnalyze, analyzing }) {
  return (
    <div>
      <p style={styles.insightText}>Generate an on-demand AI review of the account. This is the only feature that uses API credits — every metric above is computed live and free.</p>
      <button style={{ ...styles.aiBtn, ...(analyzing ? styles.aiBtnDisabled : {}) }} disabled={analyzing} onClick={() => onAnalyze(false)}>
        {analyzing ? <><span style={styles.spinnerSm} />Analyzing…</> : "✨ Get AI Analysis"}
      </button>
    </div>
  );
}

// ─── tabs ─────────────────────────────────────────────────────────────────────

function CommandCenter({ analysis, data, onAnalyze, analyzing, analyzedAt, timeRange }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const newToday = contacts.filter(c => isToday(leadDate(c))).length;
  const needsReply = convos.filter(c => (c.unreadCount || 0) > 0);
  const upcoming = events.filter(e => { const d = toDate(e.startTime); return d && d.getTime() >= Date.now(); });
  const unconfirmed = upcoming.filter(e => withinDays(toDate(e.startTime), 2) && e.appointmentStatus !== "confirmed");
  const calls = convos.filter(c => isCall(c.type));
  const answeredCalls = calls.filter(c => parseCall(c.lastMessageBody).answered);
  const smsThreads = convos.filter(c => c.type === "TYPE_SMS");
  const bookRate = contacts.length ? Math.round((events.length / contacts.length) * 100) : 0;
  const rangeLabel = timeRange === 7 ? "7 days" : timeRange === 30 ? "30 days" : timeRange === 90 ? "90 days" : "all time";

  const queue = [];
  if (needsReply.length) queue.push({ icon: "💬", color: C.blue, title: `${needsReply.length} conversation${needsReply.length > 1 ? "s" : ""} awaiting reply`, sub: needsReply.slice(0, 3).map(c => c.contactName || "Unknown").join(", ") + (needsReply.length > 3 ? "…" : "") });
  if (unconfirmed.length) queue.push({ icon: "📅", color: C.amber, title: `${unconfirmed.length} appointment${unconfirmed.length > 1 ? "s" : ""} unconfirmed in next 48h`, sub: "Send confirmation texts to reduce no-shows" });
  if (newToday) queue.push({ icon: "🎯", color: C.green, title: `${newToday} new lead${newToday > 1 ? "s" : ""} today`, sub: "Aim to make first contact within 5 minutes" });
  if (!queue.length) queue.push({ icon: "✓", color: C.green, title: "All clear", sub: "No urgent items in the queue right now" });

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="New Leads Today" value={newToday} sub={`${contacts.length} in ${rangeLabel}`} accent={C.green} />
        <StatCard label="Awaiting Reply" value={needsReply.length} sub={`${smsThreads.length} SMS threads total`} accent={needsReply.length ? C.red : C.text} />
        <StatCard label="Calls Answered" value={answeredCalls.length} sub={`of ${calls.length} calls — ${pct(answeredCalls.length, calls.length)}% rate`} accent={C.green} />
        <StatCard label="Upcoming Appts" value={upcoming.length} sub={`${unconfirmed.length} unconfirmed`} accent={C.amber} />
        <StatCard label="Booking Rate" value={`${bookRate}%`} sub={`${events.length} appts / ${contacts.length} leads`} />
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>⚡ Action Queue</div>
        {queue.map((q, i) => (
          <div key={i} style={styles.actionItem}>
            <div style={{ ...styles.actionIcon, background: `${q.color}22`, color: q.color }}>{q.icon}</div>
            <div><div style={styles.actionTitle}>{q.title}</div><div style={styles.actionSub}>{q.sub}</div></div>
          </div>
        ))}
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <span>AI Account Health</span>
          {analysis && !analyzing && <button style={styles.linkBtn} onClick={() => onAnalyze(true)}>↻ Re-run</button>}
        </div>
        {analyzing && <p style={styles.insightText}><span style={styles.spinnerSm} />Claude is reviewing the account…</p>}
        {!analyzing && analysis?.summary && (
          <>
            <p style={styles.insightText}>{analysis.summary}</p>
            {analyzedAt && <div style={styles.note}>Last analyzed {fmtTime(analyzedAt)} · open AI Insights tab for the full breakdown</div>}
          </>
        )}
        {!analyzing && !analysis && <AnalyzePrompt onAnalyze={onAnalyze} analyzing={analyzing} />}
      </div>
    </div>
  );
}

function LeadFunnel({ analysis, data }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const funnel = buildFunnel(contacts, convos, events);
  const total = contacts.length || 1;

  const callConvos = convos.filter(c => isCall(c.type));
  const parsedCalls = callConvos.map(c => ({ ...c, ...parseCall(c.lastMessageBody) }));
  const inboundCalls = parsedCalls.filter(c => c.inbound);
  const answeredCalls = parsedCalls.filter(c => c.answered);
  const missedCalls = parsedCalls.filter(c => c.missed || c.voicemail);
  const callsBooked = parsedCalls.filter(c => {
    const cid = c.contactId;
    const n = getName(c);
    return events.some(e =>
      (cid && e.contactId && e.contactId === cid) || nameMatch(e.title || "", n)
    );
  });

  const sourceColors = { "Facebook / Meta": C.blue, "Google": C.green, "Website Form": C.purple };

  return (
    <div>
      {analysis?.leadInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>AI Insights — Lead Intake</div>
          <BulletList items={analysis.leadInsights} />
        </div>
      )}

      <div style={styles.section}>
        <div style={styles.sectionTitle}>SMS Lead Funnel by Source</div>
        <div style={{ fontSize: "0.76rem", color: C.textFaint, marginBottom: "14px" }}>
          % shown relative to each prior stage. "Replied" = active unread thread from lead. Booking matched by contact name.
        </div>
        {funnel.filter(([src]) => !src.toLowerCase().includes("phone")).map(([src, d]) => {
          const accent = sourceColors[src] || C.amber;
          return (
            <div key={src} style={styles.funnelSource}>
              <div style={{ fontSize: "0.88rem", color: C.text, fontWeight: "600", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: accent, fontSize: "10px" }}>◆</span> {src}
                <span style={{ ...styles.pill, background: `${accent}22`, color: accent, marginLeft: "4px" }}>{d.leads} leads</span>
              </div>
              <FunnelStage label="Leads" count={d.leads} base={total} accent={C.textDim} />
              <FunnelStage label="↳ SMS Started" count={d.smsStarted} base={d.leads} accent={accent} />
              <FunnelStage label="  ↳ Lead Replied" count={d.replied} base={d.smsStarted || 1} accent={C.green} />
              <FunnelStage label="  ↳ Appt Booked" count={d.booked} base={d.leads} accent={C.amber} />
            </div>
          );
        })}
        {funnel.filter(([src]) => !src.toLowerCase().includes("phone")).length === 0 && (
          <div style={styles.insightText}>No lead data in the selected time range.</div>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>📞 Voice Call Funnel</div>
        <div style={styles.grid}>
          <StatCard label="Total Calls" value={callConvos.length} />
          <StatCard label="Inbound" value={inboundCalls.length} sub={`${pct(inboundCalls.length, callConvos.length)}% of all calls`} accent={C.blue} />
          <StatCard label="Answered" value={answeredCalls.length} sub={`${pct(answeredCalls.length, callConvos.length)}% answer rate`} accent={C.green} />
          <StatCard label="Missed / VM" value={missedCalls.length} sub={`${pct(missedCalls.length, callConvos.length)}% missed`} accent={missedCalls.length ? C.red : C.textDim} />
          <StatCard label="Appt Booked" value={callsBooked.length} sub="booked from a call" accent={C.amber} />
        </div>
        {parsedCalls.length > 0 && (
          <>
            <div style={{ marginTop: "4px", marginBottom: "8px", fontSize: "0.76rem", color: C.textFaint }}>Call Log</div>
            {parsedCalls.slice(0, 20).map((c, i) => {
              const booked = callsBooked.some(b => getName(b) === getName(c));
              const dMin = Math.floor(c.duration / 60), dSec = c.duration % 60;
              return (
                <div key={i} style={styles.row}>
                  <div>
                    <div style={styles.rowName}>{c.contactName || c.fullName || "Unknown"}</div>
                    <div style={styles.rowSub}>
                      {c.inbound ? "Inbound" : "Outbound"}
                      {c.answered ? ` · Answered · ${dMin}m${dSec}s` : c.voicemail ? " · Voicemail" : " · Missed"}
                      {c.aiHandled ? " · AI handled" : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {c.answered && <span style={{ ...styles.pill, background: "#0D2E1A", color: C.green }}>Answered</span>}
                    {c.voicemail && <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>VM</span>}
                    {c.missed && !c.voicemail && <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>Missed</span>}
                    {c.bookedInCall && <span style={{ ...styles.pill, background: `${C.amber}22`, color: C.amber }}>Booked in call</span>}
                    {booked && !c.bookedInCall && <span style={{ ...styles.pill, background: `${C.amber}22`, color: C.amber }}>Booked</span>}
                    {c.tookDetails && <span style={{ ...styles.pill, background: `${C.blue}22`, color: C.blue }}>Details taken</span>}
                  </div>
                </div>
              );
            })}
          </>
        )}
        {callConvos.length === 0 && <div style={styles.insightText}>No call data in the selected time range.</div>}
        <p style={styles.note}>Voice AI call summaries (what the AI said, fields captured, booking confirmation) require GHL AI Receptionist call log integration — connect that source to expand this section.</p>
      </div>
    </div>
  );
}

function Campaigns({ analysis, data }) {
  const contacts = data?.contacts?.contacts || [];
  const events = data?.appointments?.events || [];
  const bySource = {};
  contacts.forEach(c => {
    const s = leadSource(c);
    if (!bySource[s]) bySource[s] = { leads: 0 };
    bySource[s].leads++;
  });
  const arr = Object.entries(bySource).sort((a, b) => b[1].leads - a[1].leads);
  const maxLeads = arr[0]?.[1].leads || 1;
  const fbLeads = bySource["Facebook / Meta"]?.leads || 0;
  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Facebook Leads" value={fbLeads} sub="attributed to Meta" accent={C.blue} />
        <StatCard label="Total Sources" value={arr.length} sub="active channels" />
        <StatCard label="Appointments" value={events.length} sub="booked in range" accent={C.amber} />
      </div>
      {analysis?.campaignInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>AI Insights — Campaign Quality</div>
          <BulletList items={analysis.campaignInsights} />
        </div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Lead Volume by Channel</div>
        {arr.length === 0 && <div style={styles.insightText}>No attribution data in the selected range.</div>}
        {arr.map(([s, v]) => <BarRow key={s} label={s} value={v.leads} max={maxLeads} accent={s.includes("Facebook") ? C.blue : C.amber} />)}
        <p style={styles.note}>Ad spend, CPL, and ROAS live in the Meta Ads API — connect that source to surface true cost-per-lead here.</p>
      </div>
    </div>
  );
}

function Conversations({ analysis, data }) {
  const convos = data?.conversations?.conversations || [];
  const smsThreads = convos.filter(c => c.type === "TYPE_SMS");
  const emailThreads = convos.filter(c => c.type === "TYPE_EMAIL");
  const callThreads = convos.filter(c => isCall(c.type));
  const smsWithReply = smsThreads.filter(c => (c.unreadCount || 0) > 0);
  const smsNoReply = smsThreads.filter(c => (c.unreadCount || 0) === 0);
  const allUnread = convos.filter(c => (c.unreadCount || 0) > 0);

  const typeMeta = {
    TYPE_CALL:  { bg: "#0D2E1A", color: C.green, label: "Call" },
    TYPE_PHONE: { bg: "#0D2E1A", color: C.green, label: "Call" },
    TYPE_SMS:   { bg: "#0D1E3A", color: C.blue,  label: "SMS"  },
    TYPE_EMAIL: { bg: "#2A1B0D", color: C.amber, label: "Email" },
  };

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="SMS Threads" value={smsThreads.length} />
        <StatCard label="Lead Replied (unread)" value={smsWithReply.length} sub={`${pct(smsWithReply.length, smsThreads.length)}% reply rate`} accent={smsWithReply.length ? C.green : C.textDim} />
        <StatCard label="No Active Reply" value={smsNoReply.length} sub="handled or no response" accent={smsNoReply.length > smsWithReply.length ? C.red : C.textDim} />
        <StatCard label="Email Threads" value={emailThreads.length} accent={C.amber} />
        <StatCard label="Total Unread" value={allUnread.length} sub="across all channels" accent={allUnread.length ? C.red : C.text} />
      </div>
      {analysis?.conversationInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>AI Insights — Response SLA</div>
          <BulletList items={analysis.conversationInsights} />
        </div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recent Conversations</div>
        {convos.length === 0 && <div style={styles.insightText}>No conversation data in the selected range.</div>}
        {convos.slice(0, 25).map((c, i) => {
          const meta = typeMeta[c.type] || { bg: C.border, color: C.textDim, label: (c.type || "").replace("TYPE_", "") };
          const hasReply = (c.unreadCount || 0) > 0;
          return (
            <div key={i} style={styles.row}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={styles.rowName}>{c.contactName || c.fullName || "Unknown"}</div>
                <div style={{ ...styles.rowSub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{c.lastMessageBody || "No preview"}</div>
              </div>
              <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                <span style={{ ...styles.pill, background: meta.bg, color: meta.color }}>{meta.label}</span>
                {hasReply
                  ? <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>{c.unreadCount} unread</span>
                  : c.type === "TYPE_SMS" && <span style={{ ...styles.pill, background: C.bg, color: C.textFaint }}>No reply</span>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Appointments({ analysis, data }) {
  const events = data?.appointments?.events || [];
  const sorted = [...events].sort((a, b) => (toDate(a.startTime)?.getTime() || 0) - (toDate(b.startTime)?.getTime() || 0));
  const upcoming = sorted.filter(e => (toDate(e.startTime)?.getTime() || 0) >= Date.now());
  const past = sorted.filter(e => (toDate(e.startTime)?.getTime() || 0) < Date.now());
  const confirmed = upcoming.filter(e => e.appointmentStatus === "confirmed").length;
  const showed = past.filter(e => e.appointmentStatus === "showed").length;
  const showRate = past.length ? pct(showed, past.length) : null;

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Upcoming" value={upcoming.length} accent={C.amber} />
        <StatCard label="Confirmed" value={confirmed} sub={`of ${upcoming.length} upcoming`} accent={C.green} />
        <StatCard label="At Risk" value={upcoming.length - confirmed} sub="unconfirmed upcoming" accent={(upcoming.length - confirmed) ? C.red : C.textDim} />
        {showRate !== null && <StatCard label="Show Rate" value={`${showRate}%`} sub={`${showed} showed / ${past.length} past`} accent={C.blue} />}
      </div>
      {analysis?.appointmentInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>AI Insights — Booking & No-Show Risk</div>
          <BulletList items={analysis.appointmentInsights} />
        </div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Schedule ({events.length})</div>
        {events.length === 0 && <div style={styles.insightText}>No appointments in the selected range.</div>}
        {sorted.slice(0, 30).map((e, i) => {
          const d = toDate(e.startTime);
          const isPast = d && d.getTime() < Date.now();
          const conf = e.appointmentStatus === "confirmed";
          const didShow = e.appointmentStatus === "showed";
          return (
            <div key={i} style={styles.row}>
              <div>
                <div style={{ ...styles.rowName, color: isPast ? C.textDim : C.text }}>{e.title || e.name || "Appointment"}</div>
                <div style={styles.rowSub}>{d ? d.toLocaleString() : "—"}{e.assignedUserId ? ` · ${e.assignedUserId}` : ""}</div>
              </div>
              <span style={{ ...styles.pill, background: (conf || didShow) ? "#0D2E1A" : C.bg, color: (conf || didShow) ? C.green : C.textDim }}>
                {e.appointmentStatus || "scheduled"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIInsights({ analysis, analyzing, analyzedAt, onAnalyze }) {
  if (analyzing) return (
    <div style={styles.section}><div style={styles.insightText}><span style={styles.spinnerSm} />Claude is reviewing the account…</div></div>
  );
  if (!analysis) return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>AI Insights</div>
      <AnalyzePrompt onAnalyze={onAnalyze} analyzing={analyzing} />
    </div>
  );
  const recs = Array.isArray(analysis.recommendations) ? analysis.recommendations : analysis.recommendations ? [analysis.recommendations] : [];
  const flags = Array.isArray(analysis.redFlags) ? analysis.redFlags : analysis.redFlags ? [analysis.redFlags] : [];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "0.78rem", color: C.textFaint }}>{analyzedAt ? `Last analyzed ${fmtTime(analyzedAt)}` : ""}</span>
        <button style={styles.linkBtn} onClick={() => onAnalyze(true)}>↻ Re-run analysis</button>
      </div>
      {analysis.summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Account Health Summary</div>
          <p style={styles.insightText}>{analysis.summary}</p>
        </div>
      )}
      {analysis.leadInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Lead Intake</div>
          <BulletList items={analysis.leadInsights} />
        </div>
      )}
      {analysis.campaignInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Campaigns</div>
          <BulletList items={analysis.campaignInsights} />
        </div>
      )}
      {analysis.conversationInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Conversations & Response SLA</div>
          <BulletList items={analysis.conversationInsights} />
        </div>
      )}
      {analysis.appointmentInsights && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Appointments</div>
          <BulletList items={analysis.appointmentInsights} />
        </div>
      )}
      {flags.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>⚠ Red Flags</div>
          <BulletList items={flags} accent="#F39C12" />
        </div>
      )}
      {recs.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Team Recommendations</div>
          {recs.map((r, i) => (
            <div key={i} style={styles.recItem}>
              <div style={styles.recNum}>{i + 1}</div>
              <div style={styles.insightText}>{r}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("loading");
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedAt, setAnalyzedAt] = useState(null);
  const [loadMsg, setLoadMsg] = useState("Connecting to the account...");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("command");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeRange, setTimeRange] = useState(30);

  const rawContacts = data?.contacts?.contacts || [];
  const rawConvos = data?.conversations?.conversations || [];
  const rawEvents = data?.appointments?.events || [];

  const fContacts = timeRange ? rawContacts.filter(c => withinRange(leadDate(c), timeRange)) : rawContacts;
  const fConvos = timeRange ? rawConvos.filter(c => withinRange(convDate(c), timeRange)) : rawConvos;
  const fEvents = rawEvents.filter(e => {
    const d = toDate(e.startTime);
    if (!d) return false;
    if (d.getTime() >= Date.now()) return true;
    return !timeRange || withinDays(d, timeRange);
  });

  const filteredData = {
    contacts: { contacts: fContacts },
    conversations: { conversations: fConvos },
    appointments: { events: fEvents },
  };

  const runAnalysis = async (d, force = false) => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversations: d.conversations?.conversations || [],
        contacts: d.contacts?.contacts || [],
        appointments: d.appointments?.events || [],
        force,
      }),
    });
    return await res.json();
  };

  const getAnalysis = async (force = false) => {
    if (!data || analyzing) return;
    setAnalyzing(true);
    try {
      const ai = await runAnalysis(data, force);
      setAnalysis(ai);
      setAnalyzedAt(new Date());
    } catch {
      setAnalysis({ summary: "AI analysis unavailable — metrics are still computed from live data. Try again." });
    } finally {
      setAnalyzing(false);
    }
  };

  const load = async (force = false) => {
    setStep("loading");
    setError(null);
    try {
      setLoadMsg(force ? "Forcing a fresh pull from GHL..." : "Fetching account data from GHL...");
      const res = await fetch(`/api/ghl${force ? "?refresh=1" : ""}`);
      if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
      const raw = await res.json();
      if (raw.error) throw new Error(raw.detail ? `${raw.error}: ${raw.detail}` : raw.error);
      setData({
        conversations: raw.conversations || { conversations: [] },
        contacts: raw.contacts || { contacts: [] },
        appointments: raw.appointments || { events: [] },
      });
      setAnalysis(null);
      setAnalyzedAt(null);
      setLastUpdated(new Date());
      setStep("dashboard");
    } catch (err) {
      setError(err.message || "Unknown error");
      setStep("error");
    }
  };

  const loadDemo = () => {
    setData(DEMO);
    setAnalysis(null);
    setAnalyzedAt(null);
    setLastUpdated(new Date());
    setStep("dashboard");
  };

  useEffect(() => { load(); }, []);

  const tabs = [
    { id: "command", label: "Command Center" },
    { id: "funnel", label: "Lead Funnel" },
    { id: "campaigns", label: "Campaigns" },
    { id: "conversations", label: "Conversations" },
    { id: "appointments", label: "Appointments" },
    { id: "ai", label: "AI Insights" },
  ];

  if (step === "loading") return (
    <div style={{ ...styles.app, ...styles.loadingScreen }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } body { margin: 0; }`}</style>
      <div style={styles.spinner} />
      <div style={styles.loadLabel}>{loadMsg}</div>
    </div>
  );

  if (step === "error") return (
    <div style={{ ...styles.app, ...styles.setup }}>
      <style>{`* { box-sizing: border-box; } body { margin: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🐀</div>
          <div><div style={styles.logoText}>360 Rodent Control</div><div style={styles.logoSub}>Team Admin Dashboard</div></div>
        </div>
        <div style={styles.errorBox}>{error}</div>
        <button style={styles.btn} onClick={() => load(false)}>Retry Live Connection</button>
        <button style={styles.btnGhost} onClick={loadDemo}>Load Demo Data Instead</button>
        <p style={styles.hint}>A live error usually means a missing env var (GHL_TOKEN, GHL_LOCATION_ID) or a token scope. Check the Vercel function logs for the exact GHL response.</p>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <style>{`* { box-sizing: border-box; } body { margin: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoIcon}>🐀</div>
          <div>
            <div style={{ ...styles.logoText, fontSize: "1rem" }}>360 Rodent Control</div>
            <div style={{ fontSize: "0.72rem", color: C.textFaint }}>Account Operations · Team Admin</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <TimeRangePicker value={timeRange} onChange={setTimeRange} />
          {lastUpdated && <span style={{ fontSize: "0.72rem", color: C.textFaint }}>Updated {fmtTime(lastUpdated)}</span>}
          <span style={styles.badge}>● Live</span>
          <button style={styles.refreshBtn} onClick={() => load(true)}>↻ Refresh</button>
        </div>
      </div>
      <div style={styles.tabs}>
        {tabs.map(t => (
          <button key={t.id} style={{ ...styles.tab, ...(activeTab === t.id ? styles.tabActive : {}) }} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>
      <div style={styles.content}>
        {activeTab === "command" && <CommandCenter analysis={analysis} data={filteredData} onAnalyze={getAnalysis} analyzing={analyzing} analyzedAt={analyzedAt} timeRange={timeRange} />}
        {activeTab === "funnel" && <LeadFunnel analysis={analysis} data={filteredData} />}
        {activeTab === "campaigns" && <Campaigns analysis={analysis} data={filteredData} />}
        {activeTab === "conversations" && <Conversations analysis={analysis} data={filteredData} />}
        {activeTab === "appointments" && <Appointments analysis={analysis} data={filteredData} />}
        {activeTab === "ai" && <AIInsights analysis={analysis} analyzing={analyzing} analyzedAt={analyzedAt} onAnalyze={getAnalysis} />}
      </div>
    </div>
  );
}
