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
  flagItem: { display: "flex", gap: "10px", padding: "8px 0", fontSize: "0.88rem", color: "#F39C12", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" },
  bar: { height: "8px", borderRadius: "4px", background: C.amber, minWidth: "4px" },
  barTrack: { flex: 1, height: "8px", background: C.bg, borderRadius: "4px", overflow: "hidden" },
  loadingScreen: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1.5rem" },
  spinner: { width: "48px", height: "48px", border: `3px solid ${C.border}`, borderTop: `3px solid ${C.amber}`, borderRadius: "50%", animation: "spin 1s linear infinite" },
  loadLabel: { color: C.textDim, fontSize: "0.9rem" },
  errorBox: { background: "#2A1215", border: "1px solid #5C1E24", borderRadius: "8px", padding: "1rem", color: C.red, fontSize: "0.85rem", marginBottom: "1rem", lineHeight: "1.6", whiteSpace: "pre-wrap" },
  refreshBtn: { background: "transparent", border: `1px solid ${C.amber}`, color: C.amber, borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "0.82rem" },
  note: { fontSize: "0.78rem", color: C.textFaint, fontStyle: "italic", marginTop: "10px", lineHeight: "1.5" },
};

// ---------- helpers ----------
function toDate(v) { if (!v) return null; const d = new Date(v); return isNaN(d.getTime()) ? null : d; }
function daysBetween(a, b) { return Math.floor((b - a) / 86400000); }
function isToday(d) { const n = new Date(); return d && d.toDateString() === n.toDateString(); }
function withinDays(d, n) { return d && (Date.now() - d.getTime()) <= n * 86400000 && d.getTime() <= Date.now() + n * 86400000; }
function leadDate(c) { return toDate(c.dateAdded || c.createdAt || c.dateUpdated); }
function leadSource(c) {
  const a = c.attributionSource || c.lastAttributionSource || {};
  const raw = (c.source || a.utmCampaign || a.campaign || a.medium || a.source || "").toString().toLowerCase();
  if (raw.includes("facebook") || raw.includes("fb") || raw.includes("meta") || raw.includes("instagram") || a.medium?.toLowerCase()?.includes("paid")) return "Facebook / Meta";
  if (raw.includes("google")) return "Google";
  if (raw.includes("form") || raw.includes("web")) return "Website Form";
  if (raw.includes("referr")) return "Referral";
  if (raw.includes("manual")) return "Manual Entry";
  return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Unknown";
}

// ---------- demo data (fallback only) ----------
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
  ] },
  conversations: { conversations: [
    { contactName: "Maria Delgado", type: "TYPE_SMS", lastMessageBody: "Hi, do you handle roof rats? Saw your ad.", unreadCount: 2 },
    { contactName: "James Okafor", type: "TYPE_SMS", lastMessageBody: "Can someone come out this week?", unreadCount: 1 },
    { contactName: "Priya Nair", type: "TYPE_CALL", lastMessageBody: "Inbound call · 2m14s · answered" },
    { contactName: "Tyler Brooks", type: "TYPE_SMS", lastMessageBody: "Thanks, see you Thursday!", unreadCount: 0 },
    { contactName: "Sofia Russo", type: "TYPE_EMAIL", lastMessageBody: "Re: Quote for attic treatment", unreadCount: 1 },
    { contactName: "Aaron Webb", type: "TYPE_CALL", lastMessageBody: "Outbound call · no answer · voicemail" },
    { contactName: "Lena Fischer", type: "TYPE_SMS", lastMessageBody: "What's your pricing for a single visit?", unreadCount: 3 },
    { contactName: "Marcus Hale", type: "TYPE_CALL", lastMessageBody: "Inbound call · 4m02s · answered" },
    { contactName: "Dana Cole", type: "TYPE_SMS", lastMessageBody: "Confirmed for Tuesday, thank you", unreadCount: 0 },
    { contactName: "Omar Haddad", type: "TYPE_SMS", lastMessageBody: "Still seeing droppings, can you re-treat?", unreadCount: 1 },
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
  ] },
};

// ---------- shared bits ----------
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
  const pct = max ? Math.max(4, (value / max) * 100) : 4;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0" }}>
      <div style={{ width: "130px", fontSize: "0.82rem", color: C.textMute }}>{label}</div>
      <div style={styles.barTrack}><div style={{ ...styles.bar, width: `${pct}%`, background: accent || C.amber }} /></div>
      <div style={{ width: "36px", textAlign: "right", fontSize: "0.85rem", color: C.text, fontWeight: "600" }}>{value}</div>
    </div>
  );
}

// ---------- tabs ----------
function CommandCenter({ analysis, data }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const newToday = contacts.filter(c => isToday(leadDate(c))).length;
  const newWeek = contacts.filter(c => { const d = leadDate(c); return d && Date.now() - d.getTime() <= 7 * 86400000; }).length;
  const needsReply = convos.filter(c => (c.unreadCount || 0) > 0);
  const upcoming = events.filter(e => { const d = toDate(e.startTime); return d && d.getTime() >= Date.now(); });
  const unconfirmed = upcoming.filter(e => withinDays(toDate(e.startTime), 2) && e.appointmentStatus !== "confirmed");
  const bookRate = contacts.length ? Math.round((events.length / contacts.length) * 100) : 0;

  const queue = [];
  if (needsReply.length) queue.push({ icon: "💬", color: C.blue, title: `${needsReply.length} conversation${needsReply.length > 1 ? "s" : ""} awaiting reply`, sub: needsReply.slice(0, 3).map(c => c.contactName || c.fullName || "Unknown").join(", ") + (needsReply.length > 3 ? "…" : "") });
  if (unconfirmed.length) queue.push({ icon: "📅", color: C.amber, title: `${unconfirmed.length} appointment${unconfirmed.length > 1 ? "s" : ""} unconfirmed in next 48h`, sub: "Send confirmation texts to reduce no-shows" });
  if (newToday) queue.push({ icon: "🎯", color: C.green, title: `${newToday} new lead${newToday > 1 ? "s" : ""} today`, sub: "Aim to make first contact within 5 minutes" });
  if (!queue.length) queue.push({ icon: "✓", color: C.green, title: "All clear", sub: "No urgent items in the queue right now" });

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="New Leads Today" value={newToday} sub={`${newWeek} this week`} accent={C.green} />
        <StatCard label="Awaiting Reply" value={needsReply.length || 0} sub="unread conversations" accent={needsReply.length ? C.red : C.text} />
        <StatCard label="Upcoming Appts" value={upcoming.length} sub={`${unconfirmed.length} unconfirmed`} accent={C.amber} />
        <StatCard label="Booking Rate" value={`${bookRate}%`} sub="appts ÷ contacts" />
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
      {analysis?.summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>AI Account Health</div>
          <p style={styles.insightText}>{analysis.summary}</p>
        </div>
      )}
    </div>
  );
}

function LeadIntake({ analysis, data }) {
  const contacts = data?.contacts?.contacts || [];
  const sorted = [...contacts].sort((a, b) => (leadDate(b)?.getTime() || 0) - (leadDate(a)?.getTime() || 0));
  const bySource = {};
  contacts.forEach(c => { const s = leadSource(c); bySource[s] = (bySource[s] || 0) + 1; });
  const sourceArr = Object.entries(bySource).sort((a, b) => b[1] - a[1]);
  const maxSrc = sourceArr[0]?.[1] || 1;
  return (
    <div>
      {analysis?.leadInsights && (
        <div style={styles.section}><div style={styles.sectionTitle}>AI Insights — Lead Intake</div><p style={styles.insightText}>{analysis.leadInsights}</p></div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Leads by Source</div>
        {sourceArr.length === 0 && <div style={styles.insightText}>No contact data loaded.</div>}
        {sourceArr.map(([s, n]) => <BarRow key={s} label={s} value={n} max={maxSrc} accent={s.includes("Facebook") ? C.blue : C.amber} />)}
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recent Leads ({contacts.length})</div>
        {sorted.slice(0, 25).map((c, i) => {
          const d = leadDate(c); const age = d ? daysBetween(d, new Date()) : null; const fresh = age === 0;
          return (
            <div key={i} style={styles.row}>
              <div>
                <div style={styles.rowName}>{c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown"}</div>
                <div style={styles.rowSub}>{leadSource(c)}{c.phone ? ` · ${c.phone}` : ""}</div>
              </div>
              <span style={{ ...styles.pill, background: fresh ? "#0D2E1A" : C.bg, color: fresh ? C.green : C.textDim }}>{d ? (fresh ? "Today" : `${age}d ago`) : "—"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Campaigns({ analysis, data }) {
  const contacts = data?.contacts?.contacts || [];
  const events = data?.appointments?.events || [];
  const bySource = {};
  contacts.forEach(c => { const s = leadSource(c); if (!bySource[s]) bySource[s] = { leads: 0 }; bySource[s].leads++; });
  const arr = Object.entries(bySource).sort((a, b) => b[1].leads - a[1].leads);
  const maxLeads = arr[0]?.[1].leads || 1;
  const fbLeads = (bySource["Facebook / Meta"]?.leads) || 0;
  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Facebook Leads" value={fbLeads} sub="attributed to Meta" accent={C.blue} />
        <StatCard label="Total Sources" value={arr.length} sub="active channels" />
        <StatCard label="Appointments" value={events.length} sub="booked overall" accent={C.amber} />
      </div>
      {analysis?.campaignInsights && (
        <div style={styles.section}><div style={styles.sectionTitle}>AI Insights — Campaign Quality</div><p style={styles.insightText}>{analysis.campaignInsights}</p></div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Lead Volume by Channel</div>
        {arr.length === 0 && <div style={styles.insightText}>No attribution data loaded.</div>}
        {arr.map(([s, v]) => <BarRow key={s} label={s} value={v.leads} max={maxLeads} accent={s.includes("Facebook") ? C.blue : C.amber} />)}
        <p style={styles.note}>Lead counts come from GHL attribution data. Ad spend, impressions, and true cost-per-lead live in the Meta Ads API — connect that as a fourth data source to surface CPL and ROAS here.</p>
      </div>
    </div>
  );
}

function Conversations({ analysis, data }) {
  const convos = data?.conversations?.conversations || [];
  const typeMeta = {
    TYPE_CALL: { bg: "#0D2E1A", color: C.green, label: "Call" },
    TYPE_SMS: { bg: "#0D1E3A", color: C.blue, label: "SMS" },
    TYPE_EMAIL: { bg: "#2A1B0D", color: C.amber, label: "Email" },
  };
  const unread = convos.filter(c => (c.unreadCount || 0) > 0);
  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Total Threads" value={convos.length} />
        <StatCard label="Awaiting Reply" value={unread.length} sub="needs team response" accent={unread.length ? C.red : C.text} />
        <StatCard label="Calls" value={convos.filter(c => c.type === "TYPE_CALL").length} accent={C.green} />
      </div>
      {analysis?.conversationInsights && (
        <div style={styles.section}><div style={styles.sectionTitle}>AI Insights — Response SLA</div><p style={styles.insightText}>{analysis.conversationInsights}</p></div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recent Conversations</div>
        {convos.length === 0 && <div style={styles.insightText}>No conversation data loaded.</div>}
        {convos.slice(0, 25).map((c, i) => {
          const meta = typeMeta[c.type] || { bg: C.border, color: C.textDim, label: (c.type || "").replace("TYPE_", "") };
          return (
            <div key={i} style={styles.row}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={styles.rowName}>{c.contactName || c.fullName || "Unknown"}</div>
                <div style={{ ...styles.rowSub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{c.lastMessageBody || c.lastMessage || "No preview"}</div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ ...styles.pill, background: meta.bg, color: meta.color }}>{meta.label}</span>
                {(c.unreadCount || 0) > 0 && <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>{c.unreadCount}</span>}
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
  const confirmed = upcoming.filter(e => e.appointmentStatus === "confirmed").length;
  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Upcoming" value={upcoming.length} accent={C.amber} />
        <StatCard label="Confirmed" value={confirmed} sub="of upcoming" accent={C.green} />
        <StatCard label="At Risk" value={upcoming.length - confirmed} sub="unconfirmed" accent={C.red} />
      </div>
      {analysis?.appointmentInsights && (
        <div style={styles.section}><div style={styles.sectionTitle}>AI Insights — Booking & No-Show Risk</div><p style={styles.insightText}>{analysis.appointmentInsights}</p></div>
      )}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Schedule ({events.length})</div>
        {events.length === 0 && <div style={styles.insightText}>No appointment data loaded.</div>}
        {sorted.slice(0, 25).map((e, i) => {
          const d = toDate(e.startTime); const past = d && d.getTime() < Date.now(); const conf = e.appointmentStatus === "confirmed";
          return (
            <div key={i} style={styles.row}>
              <div>
                <div style={{ ...styles.rowName, color: past ? C.textDim : C.text }}>{e.title || e.name || "Appointment"}</div>
                <div style={styles.rowSub}>{d ? d.toLocaleString() : "—"}{e.assignedUserId ? ` · Tech: ${e.assignedUserId}` : ""}</div>
              </div>
              <span style={{ ...styles.pill, background: conf ? "#0D2E1A" : C.bg, color: conf ? C.green : C.textDim }}>{e.appointmentStatus || "scheduled"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIInsights({ analysis }) {
  if (!analysis) return <div style={styles.section}><div style={styles.insightText}>No analysis available.</div></div>;
  const recs = analysis.recommendations ? (Array.isArray(analysis.recommendations) ? analysis.recommendations : [analysis.recommendations]) : [];
  const flags = analysis.redFlags ? (Array.isArray(analysis.redFlags) ? analysis.redFlags : [analysis.redFlags]) : [];
  return (
    <div>
      {analysis.summary && (
        <div style={styles.section}><div style={styles.sectionTitle}>Account Health Summary</div><p style={styles.insightText}>{analysis.summary}</p></div>
      )}
      {recs.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Team Recommendations</div>
          {recs.map((r, i) => <div key={i} style={styles.recItem}><div style={styles.recNum}>{i + 1}</div><div style={styles.insightText}>{r}</div></div>)}
        </div>
      )}
      {flags.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>⚠ Red Flags</div>
          {flags.map((f, i) => <div key={i} style={styles.flagItem}><span>▸</span><span>{f}</span></div>)}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("loading");
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loadMsg, setLoadMsg] = useState("Connecting to the account...");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("command");

  // Calls our OWN serverless function — credentials live in Vercel env vars, never the browser.
  const runAnalysis = async (d) => {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversations: d.conversations?.conversations || [],
          contacts: d.contacts?.contacts || [],
          appointments: d.appointments?.events || [],
        }),
      });
      return await res.json();
    } catch {
      return { summary: "AI analysis unavailable — metrics below are still computed from live data." };
    }
  };

  const load = async () => {
    setStep("loading");
    setError(null);
    try {
      setLoadMsg("Fetching account data from GHL...");
      const res = await fetch("/api/ghl");
      if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
      const raw = await res.json();
      if (raw.error) throw new Error(raw.detail ? `${raw.error}: ${raw.detail}` : raw.error);
      const d = {
        conversations: raw.conversations || { conversations: [] },
        contacts: raw.contacts || { contacts: [] },
        appointments: raw.appointments || { events: [] },
      };
      setData(d);
      setLoadMsg("Claude is reviewing the account...");
      setAnalysis(await runAnalysis(d));
      setStep("dashboard");
    } catch (err) {
      setError(err.message || "Unknown error");
      setStep("error");
    }
  };

  const loadDemo = async () => {
    setStep("loading");
    setError(null);
    setData(DEMO);
    setLoadMsg("Loading demo account...");
    setAnalysis(await runAnalysis(DEMO));
    setStep("dashboard");
  };

  useEffect(() => { load(); }, []);

  const tabs = [
    { id: "command", label: "Command Center" },
    { id: "leads", label: "Lead Intake" },
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
      <style>{`body { margin: 0; }`}</style>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🐀</div>
          <div><div style={styles.logoText}>360 Rodent Control</div><div style={styles.logoSub}>Team Admin Dashboard</div></div>
        </div>
        <div style={styles.errorBox}>{error}</div>
        <button style={styles.btn} onClick={load}>Retry Live Connection</button>
        <button style={styles.btnGhost} onClick={loadDemo}>Load Demo Data Instead</button>
        <p style={styles.hint}>
          A live error usually means a missing env var (GHL_TOKEN, GHL_LOCATION_ID) or a token scope.
          Check the Vercel function logs for the exact GHL response.
        </p>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <style>{`* { box-sizing: border-box; } body { margin: 0; }`}</style>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoIcon}>🐀</div>
          <div>
            <div style={{ ...styles.logoText, fontSize: "1rem" }}>360 Rodent Control</div>
            <div style={{ fontSize: "0.72rem", color: C.textFaint }}>Account Operations · Team Admin</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={styles.badge}>● Live</span>
          <button style={styles.refreshBtn} onClick={load}>↻ Refresh</button>
        </div>
      </div>
      <div style={styles.tabs}>
        {tabs.map(t => (
          <button key={t.id} style={{ ...styles.tab, ...(activeTab === t.id ? styles.tabActive : {}) }} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>
      <div style={styles.content}>
        {activeTab === "command" && <CommandCenter analysis={analysis} data={data} />}
        {activeTab === "leads" && <LeadIntake analysis={analysis} data={data} />}
        {activeTab === "campaigns" && <Campaigns analysis={analysis} data={data} />}
        {activeTab === "conversations" && <Conversations analysis={analysis} data={data} />}
        {activeTab === "appointments" && <Appointments analysis={analysis} data={data} />}
        {activeTab === "ai" && <AIInsights analysis={analysis} />}
      </div>
    </div>
  );
}