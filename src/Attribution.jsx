import { useState, useMemo } from "react";
import { LI, SERIF, MONO } from "./theme.js";
import { selfCheck, FILTERABILITY } from "./attribution.js";
// Counts only — generated from the local CSV exports by `npm run data`.
// The raw exports hold customer names and phone numbers and are gitignored;
// see scripts/build-aggregates.mjs for the PII boundary.
import agg from "./data/aggregates.json";

const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const monthLabel = m => `${MON[+m.slice(5, 7) - 1]} ${m.slice(2, 4)}`;
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const n = v => v.toLocaleString();

// ─── small shared pieces ──────────────────────────────────────────────────────

const Seg = ({ options, value, onChange }) => (
  <div style={{ display:"inline-flex", background:"#ECEAE2", border:`1px solid ${LI.line2}`, borderRadius:"9px", padding:"3px", gap:"2px" }}>
    {options.map(([v, label]) => (
      <button key={v} onClick={() => onChange(v)} style={{
        fontFamily:"Inter,sans-serif", fontSize:"12.5px", fontWeight:"500",
        color: value === v ? "#fff" : LI.soft,
        background: value === v ? LI.ever : "transparent",
        border:0, padding:"6px 12px", borderRadius:"6px", cursor:"pointer",
        boxShadow: value === v ? "0 1px 3px rgba(0,0,0,.12)" : "none",
      }}>{label}</button>
    ))}
  </div>
);

const Panel = ({ title, note, right, children }) => (
  <section style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"20px 22px", marginTop:"18px" }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"14px", flexWrap:"wrap", marginBottom: note ? "6px" : "16px" }}>
      <h3 style={{ fontFamily:SERIF, fontSize:"17px", fontWeight:"600", color:LI.ink, margin:0 }}>{title}</h3>
      {right}
    </div>
    {note && <p style={{ fontSize:"13px", color:LI.soft, margin:"0 0 16px", lineHeight:"1.55", maxWidth:"74ch" }}>{note}</p>}
    {children}
  </section>
);

const Tag = ({ children, tone = "soft" }) => {
  const tones = {
    soft: { bg:"#EFEDE6", fg:LI.soft },
    warn: { bg:"#FBF0E2", fg:"#8A5A1E" },
    good: { bg:"#E6F3EC", fg:"#1F6B4A" },
    bad:  { bg:"#F8E9E5", fg:"#8E3D28" },
  }[tone];
  return (
    <span style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:".08em", textTransform:"uppercase",
      background:tones.bg, color:tones.fg, borderRadius:"5px", padding:"3px 7px", whiteSpace:"nowrap" }}>{children}</span>
  );
};

/** Marks a panel that cannot follow the global controls, and says why.
 *  Without this, an unfilterable panel under a "2026 only" filter reads as
 *  filtered data — which is exactly how all-time figures get misquoted. */
const NotFiltered = ({ why }) => (
  <div style={{ display:"flex", gap:"9px", alignItems:"flex-start", background:"#FBF7EF",
    border:"1px solid #EADFCB", borderRadius:"8px", padding:"9px 12px", marginBottom:"15px" }}>
    <span style={{ flexShrink:0, marginTop:"1px" }}><Tag tone="warn">all time</Tag></span>
    <span style={{ fontSize:"12.5px", color:"#7A5A28", lineHeight:"1.55" }}>{why}</span>
  </div>
);

/** Floating tooltip anchored to the cursor. */
const Tip = ({ tip }) => tip ? (
  <div style={{
    // clamped so the tooltip never runs off the right edge of the viewport
    position:"fixed",
    left: Math.min(tip.x + 14, (typeof window !== "undefined" ? window.innerWidth : 1200) - 276),
    top: tip.y - 10, pointerEvents:"none", zIndex:60,
    background:LI.ever, color:"#fff", borderRadius:"8px", padding:"8px 11px",
    fontSize:"12.5px", lineHeight:"1.45", boxShadow:"0 4px 14px rgba(0,0,0,.2)", maxWidth:"260px",
  }}>
    <div style={{ fontWeight:"600" }}>{tip.title}</div>
    {tip.lines.map((l, i) => (
      <div key={i} style={{ color:"#C8DAD1", fontFamily:MONO, fontSize:"11.5px", marginTop:"2px" }}>{l}</div>
    ))}
  </div>
) : null;

// ─── charts ───────────────────────────────────────────────────────────────────

/** Horizontal category bars. Identity comes from the row label; colour is bound
 *  to the entity via `color` on each datum, never to its position. */
function BarRows({ data, total, valueFmt, onTip }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div>
      {data.map(d => {
        const w = (d.value / max) * 100;
        return (
          <div key={d.label} style={{ marginBottom:"14px" }}
            onMouseMove={e => onTip({ x:e.clientX, y:e.clientY, title:d.label,
              lines:[valueFmt(d.value), total ? `${pct(d.value, total)}% of ${n(total)}` : null].filter(Boolean) })}
            onMouseLeave={() => onTip(null)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"12px", marginBottom:"5px" }}>
              <span style={{ fontSize:"13.5px", color:LI.ink, display:"flex", alignItems:"center", gap:"7px" }}>
                <span style={{ width:"9px", height:"9px", borderRadius:"2px", background:d.color, flexShrink:0 }} />
                {d.label}
              </span>
              <span style={{ fontFamily:MONO, fontSize:"12.5px", color:LI.ink }}>
                {valueFmt(d.value)}
                {total ? <span style={{ color:LI.na }}> · {pct(d.value, total)}%</span> : null}
              </span>
            </div>
            <div style={{ height:"9px", background:"#EFEDE6", borderRadius:"4px", overflow:"hidden" }}>
              <div style={{ width:`${w}%`, height:"100%", background:d.color, borderRadius:"4px", minWidth:"3px" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Monthly column chart. Months at or past today are hatched, because
 *  "Scheduled (first job)" is a booking date — those months are still filling. */
function MonthlyBars({ monthly, onTip, measureWord }) {
  if (!monthly.length) return <div style={{ color:LI.na, padding:"30px", textAlign:"center" }}>No dated AI leads.</div>;
  const W = 720, H = 240, PL = 34, PR = 12, PT = 18, PB = 34;
  const max = Math.max(...monthly.map(m => m.value), 1);
  const step = Math.ceil(max / 4 / 10) * 10 || 1;
  const ticks = []; for (let v = 0; v <= max; v += step) ticks.push(v);
  const plotW = W - PL - PR, plotH = H - PT - PB;
  const slot = plotW / monthly.length;
  const bw = Math.max(4, Math.min(46, slot - 8));
  // Thin the labels once the columns get tight, so a longer export (say two
  // years of months) degrades into readable spacing instead of overlapping ink.
  const labelStride = Math.max(1, Math.ceil(42 / slot));
  const valueStride = Math.max(1, Math.ceil(24 / slot));
  const x = i => PL + slot * (i + 0.5);
  const y = v => PT + plotH - (v / (ticks[ticks.length - 1] || max)) * plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", display:"block" }} role="img"
      aria-label="AI-attributed customers by month of first scheduled job">
      <defs>
        <pattern id="futureHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#D8E8DF" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={LI.signalD} strokeWidth="2.5" opacity=".75" />
        </pattern>
      </defs>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={LI.line} strokeWidth="1" />
          <text x={PL - 8} y={y(t) + 4} textAnchor="end" fontFamily={MONO} fontSize="10.5" fill={LI.na}>{t}</text>
        </g>
      ))}
      {monthly.map((m, i) => {
        const h = Math.max(plotH - (y(m.value) - PT), m.value ? 2 : 0);
        const soon = m.future || m.partial;
        return (
          <g key={m.month}
            onMouseMove={e => onTip({ x:e.clientX, y:e.clientY, title:monthLabel(m.month),
              lines:[`${m.value} ${measureWord}`, soon ? "Still filling — booking date is in the future" : null].filter(Boolean) })}
            onMouseLeave={() => onTip(null)}>
            <rect x={x(i) - bw / 2 - 4} y={PT} width={bw + 8} height={plotH} fill="transparent" />
            <rect x={x(i) - bw / 2} y={y(m.value)} width={bw} height={h} rx="4"
              fill={soon ? "url(#futureHatch)" : LI.signalD} />
            {i % valueStride === 0 && m.value > 0 && (
              <text x={x(i)} y={y(m.value) - 7} textAnchor="middle" fontFamily={SERIF} fontWeight="600" fontSize="13" fill={LI.ink}>{m.value}</text>
            )}
            {i % labelStride === 0 && (
              <text x={x(i)} y={H - 12} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={LI.soft}>{monthLabel(m.month)}</text>
            )}
          </g>
        );
      })}
      <line x1={PL} x2={W - PR} y1={PT + plotH} y2={PT + plotH} stroke={LI.line2} strokeWidth="1" />
    </svg>
  );
}

/** Funnel steps with drop-off called out between them. */
function Funnel({ steps, onTip }) {
  const top = steps[0]?.value || 1;
  return (
    <div>
      {steps.map((s, i) => {
        const prev = i ? steps[i - 1].value : null;
        const lost = prev !== null ? prev - s.value : 0;
        return (
          <div key={s.step}>
            {i > 0 && (
              <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 0 5px 13px", color:LI.na, fontSize:"11.5px", fontFamily:MONO }}>
                <span style={{ color:LI.line2 }}>↓</span>
                {lost > 0 ? <span>−{n(lost)} lost ({pct(lost, prev)}% of previous step)</span> : <span>no drop-off</span>}
              </div>
            )}
            <div
              onMouseMove={e => onTip({ x:e.clientX, y:e.clientY, title:s.step,
                lines:[`${n(s.value)} contacts`, `${pct(s.value, top)}% of everyone tagged`] })}
              onMouseLeave={() => onTip(null)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"12px", marginBottom:"5px" }}>
                <span style={{ fontSize:"13.5px", color:LI.ink }}>{s.step}</span>
                <span style={{ fontFamily:MONO, fontSize:"12.5px", color:LI.ink }}>
                  {n(s.value)}<span style={{ color:LI.na }}> · {pct(s.value, top)}%</span>
                </span>
              </div>
              <div style={{ height:"9px", background:"#EFEDE6", borderRadius:"4px", overflow:"hidden" }}>
                <div style={{ width:`${(s.value / top) * 100}%`, height:"100%", background:LI.signalD, borderRadius:"4px", minWidth:"3px" }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── table view ───────────────────────────────────────────────────────────────

const Table = ({ cols, rows }) => (
  <div style={{ overflowX:"auto" }}>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:"13px" }}>
      <thead>
        <tr>{cols.map(c => (
          <th key={c} style={{ textAlign:"left", fontFamily:MONO, fontSize:"10.5px", letterSpacing:".08em",
            textTransform:"uppercase", color:LI.soft, fontWeight:"500", padding:"7px 12px 7px 0",
            borderBottom:`1px solid ${LI.line2}`, whiteSpace:"nowrap" }}>{c}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((cell, j) => (
            <td key={j} style={{ padding:"7px 12px 7px 0", borderBottom:`1px solid ${LI.line}`,
              color:j ? LI.ink : LI.ink, fontFamily:j ? MONO : "inherit", fontSize:j ? "12.5px" : "13px", whiteSpace:"nowrap" }}>{cell}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── main view ────────────────────────────────────────────────────────────────

export default function Attribution() {
  // Month flags aren't baked into the JSON — they'd go stale the moment it was
  // committed — so they're derived against today each time the view renders.
  const model = useMemo(() => {
    const nowMonth = new Date().toISOString().slice(0, 7);
    const flag = list => list.map(m => ({
      ...m,
      future:  m.month > nowMonth,
      partial: m.month === nowMonth,
    }));
    return {
      ...agg,
      scopes: Object.fromEntries(
        Object.entries(agg.scopes).map(([key, s]) => [key, { ...s, monthly: flag(s.monthly) }])
      ),
    };
  }, []);
  const checks = useMemo(() => selfCheck(model), [model]);
  const [scope,  setScope]  = useState("2026");   // 2026 | all
  const [metric, setMetric] = useState("customers");
  const [asTable, setAsTable] = useState(false);
  const [tip, setTip] = useState(null);

  // Everything below reads from the selected period's rollup, and `mv` picks the
  // selected measure. Both controls therefore drive every panel that declares
  // itself filterable in FILTERABILITY — no panel silently ignores them.
  const S  = model.scopes[scope];
  const t  = S.totals;
  const meta = model.meta;
  const mv = o => metric === "customers" ? o.customers : o.jobs;
  const measureWord = metric === "customers" ? "customers" : "jobs";

  const tiers = S.tiers;
  const scopeTotal = tiers.reduce((a, r) => a + mv(r), 0);
  const tierData = tiers
    .map(r => ({ label:r.label, value:mv(r), color:r.color }))
    .sort((a, b) => b.value - a.value);

  const monthlyData = S.monthly.map(m => ({ ...m, value: mv(m) }));

  const mixData  = S.jobMix
    .map(m => ({ label:m.cat, value:mv(m), color:LI.signalD }))
    .sort((a, b) => b.value - a.value);
  const mixTotal = S.jobMix.reduce((a, m) => a + mv(m), 0);

  const failing = checks.filter(c => !c.ok);
  const fbRate = model.fb.tagged ? model.fb.converted / model.fb.tagged : 0;

  // Averages must follow the selected period. Quoting the all-time lift while
  // telling the reader that 2026 is the fair comparison would overstate it:
  // all-time reads 4.67 vs 3.62 (+29%), but like-for-like 2026 is 4.58 vs 3.97 (+15%).
  const aiAvg   = t.aiAvgJobs;
  const baseAvg = t.baseAvgJobs;
  const aiLift  = baseAvg ? (aiAvg / baseAvg - 1) : 0;
  const scopeLabel = scope === "2026" ? "In 2026" : "Across all HCP history";

  const kpis = [
    { lab:"HCP customers", val:n(t.customers),
      sub:scope === "2026" ? "first job in 2026" : `first job ${meta.dateMin.slice(0,4)}–${meta.dateMax.slice(0,4)}`, col:LI.ink },
    { lab:"AI-attributed", val:n(t.aiCustomers),
      sub:`${pct(t.aiCustomers, t.customers)}% of customers`, col:LI.signalD },
    { lab:"Jobs from AI leads", val:n(t.aiJobs),
      sub:"total jobs, not first jobs", col:LI.signalD },
    { lab:"Jobs per AI customer", val:aiAvg.toFixed(2),
      sub:`vs ${baseAvg.toFixed(2)} for untracked`, col:aiLift > 0 ? LI.signalD : LI.clay },
  ];

  return (
    <div style={{ background:LI.paper, minHeight:"100vh", padding:"0 28px 60px", fontFamily:"Inter,sans-serif", color:LI.ink, lineHeight:"1.45" }}>
      <Tip tip={tip} />

      {/* header */}
      <div style={{ padding:"34px 0 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"20px", borderBottom:`1px solid ${LI.line2}`, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontFamily:MONO, fontSize:"11px", letterSpacing:".18em", textTransform:"uppercase", color:LI.soft }}>Job Attribution</div>
          <h1 style={{ fontFamily:SERIF, fontSize:"30px", fontWeight:"600", margin:"4px 0 0", letterSpacing:"-0.01em" }}>GHL contacts → Housecall Pro jobs</h1>
          <div style={{ fontSize:"14px", color:LI.soft, marginTop:"2px" }}>Which leads turn into paying work, and which never do</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:MONO, fontSize:"12px", color:LI.ever }}>
            SHOWING <b style={{ fontSize:"15px", color:LI.signalD }}>{n(t.customers)}</b> OF {n(model.scopes.all.totals.customers)} HCP CUSTOMERS
          </div>
          <div style={{ fontFamily:MONO, fontSize:"10.5px", color:LI.soft, marginTop:"3px" }}>
            {scope === "2026" ? "2026 only" : "all time"} · counting {measureWord}
          </div>
          <div style={{ fontFamily:MONO, fontSize:"10.5px", color:LI.na, marginTop:"3px" }}>
            STATIC EXPORT · NOT LIVE
          </div>
        </div>
      </div>

      {/* provenance */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center", padding:"14px 0" }}>
        <Tag>source: 360 Attribution Scan (Google Sheets)</Tag>
        <Tag>{`first jobs ${meta.dateMin.slice(0,10)} → ${meta.dateMax.slice(0,10)}`}</Tag>
        <Tag tone={failing.length ? "bad" : "good"}>
          {failing.length ? `${failing.length} pivot check${failing.length > 1 ? "s" : ""} failing` : "matches sheet pivots"}
        </Tag>
      </div>

      {/* controls */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:LI.paper, padding:"12px 0 14px", borderBottom:`1px solid ${LI.line}`, display:"flex", gap:"22px", alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>Period</span>
          <Seg options={[["2026","2026 only"],["all","All time"]]} value={scope} onChange={setScope} />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
          <span style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>Count</span>
          <Seg options={[["customers","Customers"],["jobs","Jobs"]]} value={metric} onChange={setMetric} />
        </div>
        <button onClick={() => setAsTable(v => !v)}
          style={{ marginLeft:"auto", fontFamily:MONO, fontSize:"11px", color:LI.soft, background:"transparent",
            border:`1px solid ${LI.line2}`, borderRadius:"7px", padding:"7px 12px", cursor:"pointer" }}>
          {asTable ? "◧ Show charts" : "▤ Show tables"}
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"1px", background:LI.line, border:`1px solid ${LI.line}`, borderRadius:"13px", overflow:"hidden", marginTop:"22px" }}>
        {kpis.map(k => (
          <div key={k.lab} style={{ background:LI.card, padding:"18px 20px" }}>
            <div style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>{k.lab}</div>
            <div style={{ fontFamily:SERIF, fontSize:"32px", fontWeight:"600", color:k.col, lineHeight:"1.15", marginTop:"6px" }}>{k.val}</div>
            <div style={{ fontSize:"12.5px", color:LI.na, marginTop:"2px" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* the headline finding */}
      <div style={{ background:"#F0F5F2", border:`1px solid #D6E5DC`, borderRadius:"13px", padding:"18px 22px", marginTop:"18px" }}>
        <div style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:".1em", textTransform:"uppercase", color:LI.signalD, marginBottom:"7px" }}>What the data says</div>
        <p style={{ margin:"0 0 9px", fontSize:"14.5px", lineHeight:"1.6", color:LI.ink, maxWidth:"80ch" }}>
          {scopeLabel}, AI-attributed customers book <b>{aiAvg.toFixed(2)} jobs each</b> versus <b>{baseAvg.toFixed(2)}</b> for customers with no GHL record
          {aiLift > 0 ? <> — <b>{Math.round(aiLift * 100)}% more repeat work per customer</b>.</> : "."} They account
          for {pct(t.aiCustomers, t.customers)}% of {scope === "2026" ? "all new HCP customers this year" : "every HCP customer on record"}.
        </p>
        <p style={{ margin:0, fontSize:"14.5px", lineHeight:"1.6", color:LI.ink, maxWidth:"80ch" }}>
          The Facebook lead form is the weak link: <b>{n(model.fb.tagged)} contacts</b> carry the tag,
          but only <b>{n(model.fb.withJobs)}</b> ever appear as a paying HCP job — a <b>{(fbRate * 100).toFixed(1)}% conversion rate</b>.
          <span style={{ color:LI.soft }}> (All-time — the tag report carries no dates, so this figure ignores the period filter.)</span>
        </p>
      </div>

      {/* attribution coverage */}
      <Panel
        title={`Attribution coverage — ${scope === "2026" ? "2026" : "all time"}`}
        note={`Every Housecall Pro customer, bucketed by whether they could be traced back to a GHL contact. Counting ${metric === "customers" ? "customers (one per phone number)" : "jobs delivered (summed across each customer's history)"}.`}
        right={<span style={{ fontFamily:MONO, fontSize:"11px", color:LI.na }}>{n(scopeTotal)} total</span>}
      >
        {asTable
          ? <Table cols={["Tier","Customers","Jobs","Jobs per customer",`Share of ${measureWord}`]}
              rows={tiers.map(r => [r.label, n(r.customers), n(r.jobs), r.avgJobs.toFixed(2), `${pct(mv(r), scopeTotal)}%`])} />
          : <BarRows data={tierData} total={scopeTotal} valueFmt={n} onTip={setTip} />}
        {scope === "all" && (
          <p style={{ fontSize:"12.5px", color:LI.soft, marginTop:"14px", lineHeight:"1.55", fontStyle:"italic" }}>
            All-time understates the AI badly — Housecall Pro history runs back to {meta.dateMin.slice(0, 4)}, years before any GHL tracking existed.
            Switch to 2026 for a like-for-like comparison.
          </p>
        )}
      </Panel>

      {/* monthly trend */}
      <Panel
        title={`AI-attributed ${measureWord} by month`}
        note={`Counted by the month of the customer's first scheduled job${scope === "all" ? ", back to the earliest record" : ", within 2026"}. Months with no AI leads are shown as gaps rather than skipped, so the spacing stays honest. Hatched columns are at or beyond today — "Scheduled (first job)" is a booking date, so those months are still filling and should not be read as a decline.`}
        right={<span style={{ fontFamily:MONO, fontSize:"11px", color:LI.na }}>{n(monthlyData.reduce((a, m) => a + m.value, 0))} total</span>}
      >
        {asTable
          ? <Table cols={["Month", metric === "customers" ? "AI-attributed customers" : "Jobs from AI leads", "Status"]}
              rows={monthlyData.map(m => [monthLabel(m.month), n(m.value), m.future ? "future bookings" : m.partial ? "current month, partial" : "complete"])} />
          : <>
              <MonthlyBars monthly={monthlyData} onTip={setTip} measureWord={metric === "customers" ? "AI-attributed customers" : "jobs from AI leads"} />
              <div style={{ display:"flex", gap:"18px", marginTop:"12px", fontSize:"12.5px", color:LI.soft, flexWrap:"wrap" }}>
                <span style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <span style={{ width:"11px", height:"11px", borderRadius:"2px", background:LI.signalD }} /> Complete months
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <span style={{ width:"11px", height:"11px", borderRadius:"2px", background:"#D8E8DF", border:`1px solid ${LI.signalD}` }} /> Still filling (booked ahead)
                </span>
              </div>
            </>}
      </Panel>

      {/* job mix */}
      <Panel
        title="What AI leads actually book"
        note={`First job description for each AI-attributed customer, normalised into buckets. Showing ${measureWord} for ${scope === "2026" ? "2026" : "all time"}.`}
        right={<span style={{ fontFamily:MONO, fontSize:"11px", color:LI.na }}>{n(mixTotal)} total</span>}
      >
        {asTable
          ? <Table cols={["Job type","Customers","Jobs",`Share of ${measureWord}`]}
              rows={S.jobMix.map(m => [m.cat, n(m.customers), n(m.jobs), `${pct(mv(m), mixTotal)}%`])} />
          : <BarRows data={mixData} total={mixTotal} valueFmt={n} onTip={setTip} />}
      </Panel>

      {/* facebook funnel */}
      <Panel
        title="Facebook lead form → paying job"
        note="Every GHL contact carrying the Facebook lead-form tag, followed through to Housecall Pro. Each step is a strict subset of the one above it."
      >
        <NotFiltered why={FILTERABILITY.facebook.why} />
        {asTable
          ? <Table cols={["Step","Contacts","Share of tagged"]}
              rows={model.fbFunnel.map(s => [s.step, n(s.value), `${pct(s.value, model.fb.tagged)}%`])} />
          : <Funnel steps={model.fbFunnel} onTip={setTip} />}
        <p style={{ fontSize:"13px", color:LI.soft, marginTop:"16px", lineHeight:"1.6", maxWidth:"78ch" }}>
          {n(model.fb.tagged - model.fb.inHcp)} of {n(model.fb.tagged)} tagged contacts ({pct(model.fb.tagged - model.fb.inHcp, model.fb.tagged)}%)
          have no phone match in Housecall Pro at all — they never became a customer under that number.
          Between them, the {n(model.fb.withJobs)} that did convert account for {n(model.fb.jobsTotal)} jobs.
        </p>
      </Panel>

      {/* data quality */}
      <Panel
        title="Before you quote these numbers"
        note="Caveats that materially change how the figures above should be read."
      >
        <NotFiltered why={FILTERABILITY.quality.why} />
        {model.quality.map((q, i) => (
          <div key={i} style={{ display:"flex", gap:"11px", alignItems:"flex-start", padding:"11px 0", borderBottom: i < model.quality.length - 1 ? `1px solid ${LI.line}` : "none" }}>
            <span style={{ marginTop:"1px" }}><Tag tone={q.level === "warn" ? "warn" : "soft"}>{q.level === "warn" ? "caution" : "note"}</Tag></span>
            <span style={{ fontSize:"13.5px", color:LI.ink, lineHeight:"1.6" }}>{q.text}</span>
          </div>
        ))}
      </Panel>

      {/* self-check */}
      <Panel
        title="Cross-check against the source workbook"
        note="The same Google Sheet ships two summary pivots. This dashboard re-derives those numbers from the raw rows and compares. A mismatch means the export changed and something here needs revisiting."
      >
        <NotFiltered why={FILTERABILITY.pivots.why} />
        <Table
          cols={["Check","This dashboard","Sheet pivot",""]}
          rows={checks.map(c => [c.label, n(c.ours), n(c.theirs), c.ok ? "match" : "MISMATCH"])}
        />
      </Panel>

      <p style={{ fontFamily:MONO, fontSize:"10.5px", color:LI.na, marginTop:"26px", lineHeight:"1.7" }}>
        360 RODENT CONTROL · JOB ATTRIBUTION · SOURCE: STATIC CSV EXPORT, NOT A LIVE FEED<br />
        Re-export from Google Sheets and replace the files in src/data/ to refresh.
      </p>
    </div>
  );
}
