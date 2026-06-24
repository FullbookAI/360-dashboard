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
function fmtDate(d) { return d ? d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }) : "—"; }
function fmtDateTime(d) { return d ? d.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—"; }

function leadSource(c, convos = []) {
  const tags = Array.isArray(c.tags) ? c.tags.join(" ").toLowerCase() : "";

  // 1. Explicit source field set in GHL (manual or workflow) — highest priority, never overridden by UTM
  const srcRaw = (c.source || c.sourceName || "").toString().trim();
  if (srcRaw) {
    const s = srcRaw.toLowerCase();
    if (s.includes("facebook") || s.includes("fb") || s.includes("meta") || s.includes("instagram")) return "Facebook / Meta";
    if (s.includes("google")) return "Google";
    if (s.includes("form") || s.includes("web") || s.includes("landing") || s.includes("site")) return "Website Form";
    if (s.includes("referr")) return "Referral";
    if (s.includes("phone") || s.includes("call") || s.includes("inbound")) return "Phone / Inbound Call";
    if (s.includes("manual") || s.includes("crm") || s.includes("import")) return "Manual Entry";
    return srcRaw.charAt(0).toUpperCase() + srcRaw.slice(1);
  }

  // 2. Tags (secondary manual signal)
  if (tags.includes("facebook") || tags.includes("meta") || tags.includes("instagram")) return "Facebook / Meta";
  if (tags.includes("google")) return "Google";
  if (tags.includes("referral")) return "Referral";
  if (tags.includes("phone") || tags.includes("call") || tags.includes("inbound")) return "Phone / Inbound Call";

  // 3. UTM attribution (only if no explicit source or tags)
  const a = c.attributionSource || c.lastAttributionSource || {};
  const utm = (a.utmCampaign || a.campaign || a.utmSource || a.source || "").toString().toLowerCase();
  const medium = (a.medium || "").toLowerCase();
  if (utm.includes("facebook") || utm.includes("fb") || utm.includes("meta") || utm.includes("instagram") ||
      medium.includes("paid") || medium.includes("cpc")) return "Facebook / Meta";
  if (utm.includes("google")) return "Google";
  if (utm.includes("form") || utm.includes("web") || utm.includes("landing") || utm.includes("site")) return "Website Form";
  if (utm.includes("referr")) return "Referral";
  if (utm.includes("phone") || utm.includes("call") || utm.includes("inbound")) return "Phone / Inbound Call";
  if (utm.includes("manual") || utm.includes("crm") || utm.includes("import")) return "Manual Entry";

  // 4. Inbound call conversation fallback
  if (convos.length) {
    const cid = c.id;
    const cname = getName(c);
    const hasInboundCall = convos.some(cv =>
      ((cid && cv.contactId && cv.contactId === cid) || nameMatch(getName(cv), cname)) &&
      parseCall(cv.lastMessageBody || "").inbound
    );
    if (hasInboundCall) return "Phone / Inbound Call";
  }

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

// GHL LC Phone puts ALL conversations under TYPE_PHONE.
// Distinguish voice calls from SMS by inspecting lastMessageBody.
function isCallBody(body = "") {
  const b = body.toLowerCase();
  return b.includes("inbound call") || b.includes("outbound call") ||
         b.includes("voicemail") || b.includes("missed call") ||
         /\d+m\d+s/.test(body);
}
function convCategory(type, body = "") {
  const t = String(type ?? "").toLowerCase();
  if (t.includes("email") || t === "2") return "email";
  if (t.includes("fb") || t.includes("facebook")) return "facebook";
  if (t.includes("instagram") || t.includes("ig")) return "instagram";
  if (t.includes("gmb") || t.includes("google")) return "gmb";
  if (t.includes("chat") || t.includes("live")) return "chat";
  if (t.includes("sms") || t === "1") return "sms";
  // TYPE_PHONE covers both SMS and voice — use message body to tell them apart
  if (t.includes("phone") || t.includes("call") || t === "3") {
    return isCallBody(body) ? "call" : "sms";
  }
  return "other";
}
function isCall(c) { return convCategory(c.type, c.lastMessageBody) === "call"; }
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
  const smsConvos = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const sources = {};
  contacts.forEach(c => {
    const src = leadSource(c, convos);
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

function buildFunnelDetails(contacts, convos, events) {
  const smsConvos = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const result = {};
  contacts.forEach(c => {
    const src = leadSource(c, convos);
    if (!result[src]) result[src] = { leads: [], smsStarted: [], replied: [], booked: [] };
    const r = result[src];
    r.leads.push(c);
    const cid = c.id;
    const cname = getName(c);
    const matched = smsConvos.find(cv =>
      (cid && cv.contactId && cv.contactId === cid) || nameMatch(getName(cv), cname)
    );
    if (matched) {
      r.smsStarted.push(matched);
      if ((matched.unreadCount || 0) > 0) r.replied.push(matched);
    }
    const appt = events.find(e =>
      (cid && e.contactId && e.contactId === cid) || nameMatch(e.title || "", cname)
    );
    if (appt) r.booked.push(appt);
  });
  return result;
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
function StatCard({ label, value, sub, accent, onClick }) {
  return (
    <div
      style={{ ...styles.statCard, ...(onClick ? { cursor: "pointer", borderColor: C.blue + "55" } : {}) }}
      onClick={onClick}
      title={onClick ? "Click to see details" : undefined}
    >
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color: accent || C.text, ...(onClick ? { textDecoration: "underline dotted", textUnderlineOffset: "3px" } : {}) }}>{value}</div>
      {sub && <div style={{ ...styles.statSub, color: accent === C.red ? C.red : C.textDim }}>{sub}</div>}
    </div>
  );
}

function BarRow({ label, value, max, accent, onClick }) {
  const p = max ? Math.max(4, (value / max) * 100) : 4;
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
      title={onClick ? "Click to see details" : undefined}
    >
      <div style={{ width: "130px", fontSize: "0.82rem", color: C.textMute }}>{label}</div>
      <div style={styles.barTrack}><div style={{ ...styles.bar, width: `${p}%`, background: accent || C.amber }} /></div>
      <div style={{ width: "36px", textAlign: "right", fontSize: "0.85rem", color: C.text, fontWeight: "600", ...(onClick ? { textDecoration: "underline dotted", textUnderlineOffset: "3px" } : {}) }}>{value}</div>
    </div>
  );
}

function FunnelStage({ label, count, base, accent, onClick }) {
  const p = base ? Math.round((count / base) * 100) : 0;
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0", cursor: onClick && count > 0 ? "pointer" : "default" }}
      onClick={onClick && count > 0 ? onClick : undefined}
      title={onClick && count > 0 ? "Click to see details" : undefined}
    >
      <div style={{ width: "160px", fontSize: "0.8rem", color: C.textMute, flexShrink: 0 }}>{label}</div>
      <div style={styles.barTrack}>
        <div style={{ ...styles.bar, width: `${Math.max(p, 3)}%`, background: accent || C.amber }} />
      </div>
      <div style={{ minWidth: "90px", textAlign: "right", fontSize: "0.82rem", color: C.text }}>
        <span style={onClick && count > 0 ? { textDecoration: "underline dotted", textUnderlineOffset: "3px" } : {}}>{count}</span>
        {" "}<span style={{ color: C.textFaint, fontWeight: "400" }}>({p}%)</span>
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

function DrillDownModal({ modal, onClose }) {
  useEffect(() => {
    if (!modal) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modal, onClose]);

  if (!modal) return null;
  const { title, rows } = modal;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={onClose}
    >
      <div
        style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: "12px", width: "100%", maxWidth: "680px", maxHeight: "82vh", display: "flex", flexDirection: "column" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.2rem", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700", color: C.text }}>{title}</div>
            <div style={{ fontSize: "0.74rem", color: C.textFaint, marginTop: "2px" }}>{rows.length} record{rows.length !== 1 ? "s" : ""}</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: C.textDim, cursor: "pointer", fontSize: "1.2rem", padding: "4px 8px", lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {rows.length === 0 && <div style={{ padding: "2rem", color: C.textFaint, fontSize: "0.88rem", textAlign: "center" }}>No records found.</div>}
          {rows.map((row, i) => (
            <div key={i} style={{ padding: "0.8rem 1.2rem", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.88rem", fontWeight: "600", color: C.text, marginBottom: "3px" }}>{row.primary}</div>
                <div style={{ fontSize: "0.78rem", color: C.textDim, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{row.secondary}</div>
              </div>
              <div style={{ display: "flex", gap: "5px", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end", marginTop: "1px" }}>
                {row.badge && (
                  <span style={{ ...styles.pill, background: (row.badgeAccent || C.amber) + "22", color: row.badgeAccent || C.amber }}>{row.badge}</span>
                )}
                {row.badge2 && (
                  <span style={{ ...styles.pill, background: (row.badge2Accent || C.red) + "22", color: row.badge2Accent || C.red }}>{row.badge2}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── tabs ─────────────────────────────────────────────────────────────────────

function CommandCenter({ analysis, data, onAnalyze, analyzing, analyzedAt, timeRange, onDrill }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const newTodayList = contacts.filter(c => isToday(leadDate(c)));
  const needsReply = convos.filter(c => (c.unreadCount || 0) > 0);
  const upcoming = events.filter(e => { const d = toDate(e.startTime); return d && d.getTime() >= Date.now(); });
  const unconfirmed = upcoming.filter(e => withinDays(toDate(e.startTime), 2) && e.appointmentStatus !== "confirmed");
  const calls = convos.filter(c => isCall(c));
  const answeredCalls = calls.filter(c => parseCall(c.lastMessageBody).answered);
  const smsThreads = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const bookRate = contacts.length ? Math.round((events.length / contacts.length) * 100) : 0;
  const rangeLabel = timeRange === 7 ? "7 days" : timeRange === 30 ? "30 days" : timeRange === 90 ? "90 days" : "all time";

  const toContactRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown",
    secondary: `${c.phone || "No phone"} · Added ${fmtDate(leadDate(c))}`,
    badge: leadSource(c, convos),
    badgeAccent: C.amber,
  }));

  const toConvoRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || "Unknown",
    secondary: `${(c.lastMessageBody || "No preview").slice(0, 80)} · ${fmtDate(convDate(c))}`,
    badge: c.unreadCount > 0 ? `${c.unreadCount} unread` : undefined,
    badgeAccent: C.red,
  }));

  const toCallRows = (list) => list.map(c => {
    const p = parseCall(c.lastMessageBody);
    const dMin = Math.floor(p.duration / 60), dSec = p.duration % 60;
    return {
      primary: c.contactName || c.fullName || "Unknown",
      secondary: `${p.inbound ? "Inbound" : "Outbound"} · ${fmtDate(convDate(c))}`,
      badge: p.answered ? `Answered ${dMin}m${dSec}s` : p.voicemail ? "Voicemail" : "Missed",
      badgeAccent: p.answered ? C.green : C.red,
    };
  });

  const toEventRows = (list) => list.map(e => ({
    primary: e.title || e.name || "Appointment",
    secondary: `${fmtDateTime(toDate(e.startTime))}${e.assignedUserId ? ` · ${e.assignedUserId}` : ""}`,
    badge: e.appointmentStatus || "scheduled",
    badgeAccent: (e.appointmentStatus === "confirmed" || e.appointmentStatus === "showed") ? C.green : C.textDim,
  }));

  const queue = [];
  if (needsReply.length) queue.push({ icon: "💬", color: C.blue, title: `${needsReply.length} conversation${needsReply.length > 1 ? "s" : ""} awaiting reply`, sub: needsReply.slice(0, 3).map(c => c.contactName || "Unknown").join(", ") + (needsReply.length > 3 ? "…" : "") });
  if (unconfirmed.length) queue.push({ icon: "📅", color: C.amber, title: `${unconfirmed.length} appointment${unconfirmed.length > 1 ? "s" : ""} unconfirmed in next 48h`, sub: "Send confirmation texts to reduce no-shows" });
  if (newTodayList.length) queue.push({ icon: "🎯", color: C.green, title: `${newTodayList.length} new lead${newTodayList.length > 1 ? "s" : ""} today`, sub: "Aim to make first contact within 5 minutes" });
  if (!queue.length) queue.push({ icon: "✓", color: C.green, title: "All clear", sub: "No urgent items in the queue right now" });

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="New Leads Today" value={newTodayList.length} sub={`${contacts.length} in ${rangeLabel}`} accent={C.green} onClick={newTodayList.length ? () => onDrill?.("New Leads Today", toContactRows(newTodayList)) : undefined} />
        <StatCard label="Awaiting Reply" value={needsReply.length} sub={`${smsThreads.length} SMS threads total`} accent={needsReply.length ? C.red : C.text} onClick={needsReply.length ? () => onDrill?.("Awaiting Reply", toConvoRows(needsReply)) : undefined} />
        <StatCard label="Calls Answered" value={answeredCalls.length} sub={`of ${calls.length} calls — ${pct(answeredCalls.length, calls.length)}% rate`} accent={C.green} onClick={answeredCalls.length ? () => onDrill?.("Answered Calls", toCallRows(answeredCalls)) : undefined} />
        <StatCard label="Upcoming Appts" value={upcoming.length} sub={`${unconfirmed.length} unconfirmed`} accent={C.amber} onClick={upcoming.length ? () => onDrill?.("Upcoming Appointments", toEventRows(upcoming)) : undefined} />
        <StatCard label="Booking Rate" value={`${bookRate}%`} sub={`${events.length} appts / ${contacts.length} leads`} onClick={events.length ? () => onDrill?.("All Appointments", toEventRows(events)) : undefined} />
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

function parseAiMessages(messages = []) {
  // GHL AI Receptionist adds a summary message after the call.
  // These are longer text messages that are not the short call-log entry.
  const CALL_LOG_RE = /^(inbound|outbound) call/i;
  const summary = messages
    .filter(m => {
      const body = (m.body || m.text || m.content || "").toString().trim();
      return body.length > 60 && !CALL_LOG_RE.test(body);
    })
    .map(m => (m.body || m.text || m.content || "").toString().trim())
    .join("\n\n");

  const lower = summary.toLowerCase();
  return {
    summary: summary || null,
    bookedInSummary: lower.includes("book") || lower.includes("appointment") || lower.includes("scheduled"),
    detailsCaptured: lower.includes("address") || lower.includes("name") || lower.includes("email") || lower.includes("pest") || lower.includes("issue"),
    noAnswer: !summary && messages.length === 0,
  };
}

function LeadFunnel({ analysis, data, callDetails = [], onDrill }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const funnel = buildFunnel(contacts, convos, events);
  const funnelDetails = buildFunnelDetails(contacts, convos, events);
  const total = contacts.length || 1;

  const callConvos = convos.filter(c => isCall(c));
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

  const toContactRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown",
    secondary: `${c.phone || "No phone"} · Added ${fmtDate(leadDate(c))}`,
    badge: leadSource(c, convos),
    badgeAccent: C.amber,
  }));

  const toConvoRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || "Unknown",
    secondary: `${(c.lastMessageBody || "No preview").slice(0, 80)} · ${fmtDate(convDate(c))}`,
    badge: c.unreadCount > 0 ? `${c.unreadCount} unread` : undefined,
    badgeAccent: C.red,
  }));

  const toEventRows = (list) => list.map(e => ({
    primary: e.title || e.name || "Appointment",
    secondary: `${fmtDateTime(toDate(e.startTime))}${e.assignedUserId ? ` · ${e.assignedUserId}` : ""}`,
    badge: e.appointmentStatus || "scheduled",
    badgeAccent: (e.appointmentStatus === "confirmed" || e.appointmentStatus === "showed") ? C.green : C.textDim,
  }));

  const toCallRows = (list) => list.map(c => {
    const dMin = Math.floor((c.duration || 0) / 60), dSec = (c.duration || 0) % 60;
    return {
      primary: c.contactName || c.fullName || "Unknown",
      secondary: `${c.inbound ? "Inbound" : "Outbound"} · ${fmtDate(convDate(c))}`,
      badge: c.answered ? `Answered ${dMin}m${dSec}s` : c.voicemail ? "Voicemail" : "Missed",
      badgeAccent: c.answered ? C.green : C.red,
    };
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
        {funnel.map(([src, d]) => {
          const accent = sourceColors[src] || C.amber;
          return (
            <div key={src} style={styles.funnelSource}>
              <div style={{ fontSize: "0.88rem", color: C.text, fontWeight: "600", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: accent, fontSize: "10px" }}>◆</span> {src}
                <span style={{ ...styles.pill, background: `${accent}22`, color: accent, marginLeft: "4px" }}>{d.leads} leads</span>
              </div>
              <FunnelStage label="Leads" count={d.leads} base={total} accent={C.textDim} onClick={() => onDrill?.(`${src} — Leads`, toContactRows(funnelDetails[src]?.leads || []))} />
              <FunnelStage label="↳ SMS Started" count={d.smsStarted} base={d.leads} accent={accent} onClick={() => onDrill?.(`${src} — SMS Started`, toConvoRows(funnelDetails[src]?.smsStarted || []))} />
              <FunnelStage label="  ↳ Lead Replied" count={d.replied} base={d.smsStarted || 1} accent={C.green} onClick={() => onDrill?.(`${src} — Lead Replied`, toConvoRows(funnelDetails[src]?.replied || []))} />
              <FunnelStage label="  ↳ Appt Booked" count={d.booked} base={d.leads} accent={C.amber} onClick={() => onDrill?.(`${src} — Appt Booked`, toEventRows(funnelDetails[src]?.booked || []))} />
            </div>
          );
        })}
        {funnel.length === 0 && (
          <div style={styles.insightText}>No lead data in the selected time range.</div>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>📞 Voice Call Funnel</div>
        <div style={styles.grid}>
          <StatCard label="Total Calls" value={callConvos.length} onClick={callConvos.length ? () => onDrill?.("All Calls", toCallRows(parsedCalls)) : undefined} />
          <StatCard label="Inbound" value={inboundCalls.length} sub={`${pct(inboundCalls.length, callConvos.length)}% of all calls`} accent={C.blue} onClick={inboundCalls.length ? () => onDrill?.("Inbound Calls", toCallRows(inboundCalls)) : undefined} />
          <StatCard label="Answered" value={answeredCalls.length} sub={`${pct(answeredCalls.length, callConvos.length)}% answer rate`} accent={C.green} onClick={answeredCalls.length ? () => onDrill?.("Answered Calls", toCallRows(answeredCalls)) : undefined} />
          <StatCard label="Missed / VM" value={missedCalls.length} sub={`${pct(missedCalls.length, callConvos.length)}% missed`} accent={missedCalls.length ? C.red : C.textDim} onClick={missedCalls.length ? () => onDrill?.("Missed / Voicemail Calls", toCallRows(missedCalls)) : undefined} />
          <StatCard label="Appt Booked" value={callsBooked.length} sub="booked from a call" accent={C.amber} onClick={callsBooked.length ? () => onDrill?.("Calls That Led to Booking", toCallRows(callsBooked)) : undefined} />
        </div>
        {parsedCalls.length > 0 && (
          <>
            <div style={{ marginTop: "4px", marginBottom: "8px", fontSize: "0.76rem", color: C.textFaint }}>Call Log</div>
            {parsedCalls.slice(0, 20).map((c, i) => {
              const booked = callsBooked.some(b => getName(b) === getName(c));
              const dMin = Math.floor(c.duration / 60), dSec = c.duration % 60;
              const detail = callDetails.find(d => d.id === c.id);
              const ai = detail ? parseAiMessages(detail.messages) : null;
              return (
                <div key={i} style={{ ...styles.row, flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-start", gap: "10px" }}>
                    <div>
                      <div style={styles.rowName}>{c.contactName || c.fullName || "Unknown"}</div>
                      <div style={styles.rowSub}>
                        {c.inbound ? "Inbound" : "Outbound"}
                        {c.answered ? ` · Answered · ${dMin}m${dSec}s` : c.voicemail ? " · Voicemail" : " · Missed"}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end", flexShrink: 0 }}>
                      {c.answered && <span style={{ ...styles.pill, background: "#0D2E1A", color: C.green }}>Answered</span>}
                      {c.voicemail && <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>VM</span>}
                      {c.missed && !c.voicemail && <span style={{ ...styles.pill, background: "#2A1215", color: C.red }}>Missed</span>}
                      {(c.bookedInCall || ai?.bookedInSummary) && <span style={{ ...styles.pill, background: `${C.amber}22`, color: C.amber }}>Booked</span>}
                      {booked && !c.bookedInCall && !ai?.bookedInSummary && <span style={{ ...styles.pill, background: `${C.amber}22`, color: C.amber }}>Appt booked</span>}
                      {ai?.detailsCaptured && <span style={{ ...styles.pill, background: `${C.blue}22`, color: C.blue }}>Details captured</span>}
                    </div>
                  </div>
                  {ai?.summary && (
                    <div style={{ fontSize: "0.8rem", color: C.textMute, lineHeight: "1.55", background: C.panelDark, borderRadius: "6px", padding: "8px 10px", width: "100%", whiteSpace: "pre-wrap" }}>
                      {ai.summary}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
        {callConvos.length === 0 && <div style={styles.insightText}>No call data in the selected time range.</div>}
      </div>
    </div>
  );
}

function Campaigns({ analysis, data, onDrill }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];
  const bySource = {};
  contacts.forEach(c => {
    const s = leadSource(c, convos);
    if (!bySource[s]) bySource[s] = { leads: 0, contacts: [] };
    bySource[s].leads++;
    bySource[s].contacts.push(c);
  });
  const arr = Object.entries(bySource).sort((a, b) => b[1].leads - a[1].leads);
  const maxLeads = arr[0]?.[1].leads || 1;
  const fbLeads = bySource["Facebook / Meta"]?.leads || 0;

  const toContactRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown",
    secondary: `${c.phone || "No phone"} · Added ${fmtDate(leadDate(c))}`,
    badge: (c.attributionSource?.utmCampaign || c.attributionSource?.campaign) || undefined,
    badgeAccent: C.blue,
  }));

  const toEventRows = (list) => list.map(e => ({
    primary: e.title || e.name || "Appointment",
    secondary: `${fmtDateTime(toDate(e.startTime))}${e.assignedUserId ? ` · ${e.assignedUserId}` : ""}`,
    badge: e.appointmentStatus || "scheduled",
    badgeAccent: (e.appointmentStatus === "confirmed" || e.appointmentStatus === "showed") ? C.green : C.textDim,
  }));

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Facebook Leads" value={fbLeads} sub="attributed to Meta" accent={C.blue} onClick={fbLeads ? () => onDrill?.("Facebook / Meta Leads", toContactRows(bySource["Facebook / Meta"]?.contacts || [])) : undefined} />
        <StatCard label="Total Sources" value={arr.length} sub="active channels" />
        <StatCard label="Appointments" value={events.length} sub="booked in range" accent={C.amber} onClick={events.length ? () => onDrill?.("Appointments", toEventRows(events)) : undefined} />
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
        {arr.map(([s, v]) => <BarRow key={s} label={s} value={v.leads} max={maxLeads} accent={s.includes("Facebook") ? C.blue : C.amber} onClick={() => onDrill?.(`${s} — Leads`, toContactRows(v.contacts))} />)}
        <p style={styles.note}>Ad spend, CPL, and ROAS live in the Meta Ads API — connect that source to surface true cost-per-lead here.</p>
      </div>
    </div>
  );
}

function Conversations({ analysis, data, onDrill }) {
  const convos = data?.conversations?.conversations || [];
  const smsThreads = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const emailThreads = convos.filter(c => convCategory(c.type) === "email");
  const callThreads = convos.filter(c => isCall(c));
  const smsWithReply = smsThreads.filter(c => (c.unreadCount || 0) > 0);
  const smsNoReply = smsThreads.filter(c => (c.unreadCount || 0) === 0);
  const allUnread = convos.filter(c => (c.unreadCount || 0) > 0);

  const toConvoRows = (list) => list.map(c => {
    const cat = convCategory(c.type, c.lastMessageBody);
    const catColor = { sms: C.blue, call: C.green, email: C.amber, facebook: C.blue, instagram: C.purple }[cat] || C.textDim;
    return {
      primary: c.contactName || c.fullName || "Unknown",
      secondary: `${(c.lastMessageBody || "No preview").slice(0, 80)} · ${fmtDate(convDate(c))}`,
      badge: cat.toUpperCase(),
      badgeAccent: catColor,
      badge2: c.unreadCount > 0 ? `${c.unreadCount} unread` : undefined,
      badge2Accent: C.red,
    };
  });

  // Tally raw types from GHL so we can verify categorisation
  const rawTypes = {};
  convos.forEach(c => { const t = String(c.type ?? "none"); rawTypes[t] = (rawTypes[t] || 0) + 1; });

  const catMeta = {
    call:      { bg: "#0D2E1A", color: C.green, label: "Call" },
    sms:       { bg: "#0D1E3A", color: C.blue,  label: "SMS"  },
    email:     { bg: "#2A1B0D", color: C.amber, label: "Email" },
    facebook:  { bg: "#0D1A2A", color: C.blue,  label: "FB"   },
    instagram: { bg: "#2A0D1E", color: C.purple,label: "IG"   },
    gmb:       { bg: "#0D2A1A", color: C.green, label: "GMB"  },
    chat:      { bg: "#1A0D2A", color: C.purple,label: "Chat" },
    other:     { bg: C.border,  color: C.textDim,label: "Other"},
  };

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="SMS Threads" value={smsThreads.length} onClick={smsThreads.length ? () => onDrill?.("SMS Threads", toConvoRows(smsThreads)) : undefined} />
        <StatCard label="Lead Replied (unread)" value={smsWithReply.length} sub={`${pct(smsWithReply.length, smsThreads.length)}% reply rate`} accent={smsWithReply.length ? C.green : C.textDim} onClick={smsWithReply.length ? () => onDrill?.("Leads With Unread SMS", toConvoRows(smsWithReply)) : undefined} />
        <StatCard label="No Active Reply" value={smsNoReply.length} sub="handled or no response" accent={smsNoReply.length > smsWithReply.length ? C.red : C.textDim} onClick={smsNoReply.length ? () => onDrill?.("SMS — No Active Reply", toConvoRows(smsNoReply)) : undefined} />
        <StatCard label="Email Threads" value={emailThreads.length} accent={C.amber} onClick={emailThreads.length ? () => onDrill?.("Email Threads", toConvoRows(emailThreads)) : undefined} />
        <StatCard label="Total Unread" value={allUnread.length} sub="across all channels" accent={allUnread.length ? C.red : C.text} onClick={allUnread.length ? () => onDrill?.("All Unread Conversations", toConvoRows(allUnread)) : undefined} />
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
          const cat = convCategory(c.type, c.lastMessageBody);
          const meta = catMeta[cat] || catMeta.other;
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
                  : cat === "sms" && <span style={{ ...styles.pill, background: C.bg, color: C.textFaint }}>No reply</span>
                }
              </div>
            </div>
          );
        })}
        {Object.keys(rawTypes).length > 0 && (
          <p style={{ ...styles.note, marginTop: "14px" }}>
            GHL channel types in this data: {Object.entries(rawTypes).map(([t, n]) => `${t} (${n})`).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

function Appointments({ analysis, data, onDrill }) {
  const events = data?.appointments?.events || [];
  const sorted = [...events].sort((a, b) => (toDate(a.startTime)?.getTime() || 0) - (toDate(b.startTime)?.getTime() || 0));
  const upcoming = sorted.filter(e => (toDate(e.startTime)?.getTime() || 0) >= Date.now());
  const past = sorted.filter(e => (toDate(e.startTime)?.getTime() || 0) < Date.now());
  const confirmedList = upcoming.filter(e => e.appointmentStatus === "confirmed");
  const atRiskList = upcoming.filter(e => e.appointmentStatus !== "confirmed");
  const showedList = past.filter(e => e.appointmentStatus === "showed");
  const showRate = past.length ? pct(showedList.length, past.length) : null;

  const toEventRows = (list) => list.map(e => ({
    primary: e.title || e.name || "Appointment",
    secondary: `${fmtDateTime(toDate(e.startTime))}${e.assignedUserId ? ` · ${e.assignedUserId}` : ""}`,
    badge: e.appointmentStatus || "scheduled",
    badgeAccent: (e.appointmentStatus === "confirmed" || e.appointmentStatus === "showed") ? C.green : e.appointmentStatus === "cancelled" ? C.red : C.textDim,
  }));

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Upcoming" value={upcoming.length} accent={C.amber} onClick={upcoming.length ? () => onDrill?.("Upcoming Appointments", toEventRows(upcoming)) : undefined} />
        <StatCard label="Confirmed" value={confirmedList.length} sub={`of ${upcoming.length} upcoming`} accent={C.green} onClick={confirmedList.length ? () => onDrill?.("Confirmed Appointments", toEventRows(confirmedList)) : undefined} />
        <StatCard label="At Risk" value={atRiskList.length} sub="unconfirmed upcoming" accent={atRiskList.length ? C.red : C.textDim} onClick={atRiskList.length ? () => onDrill?.("Unconfirmed Appointments", toEventRows(atRiskList)) : undefined} />
        {showRate !== null && <StatCard label="Show Rate" value={`${showRate}%`} sub={`${showedList.length} showed / ${past.length} past`} accent={C.blue} onClick={past.length ? () => onDrill?.("Past Appointments", toEventRows(past)) : undefined} />}
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
  const [callDetails, setCallDetails] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedAt, setAnalyzedAt] = useState(null);
  const [loadMsg, setLoadMsg] = useState("Connecting to the account...");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("command");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeRange, setTimeRange] = useState(30);
  const [modal, setModal] = useState(null);

  const openDrill = (title, rows) => setModal({ title, rows });
  const closeDrill = () => setModal(null);

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
      setCallDetails(Array.isArray(raw.callDetails) ? raw.callDetails : []);
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
        {activeTab === "command" && <CommandCenter analysis={analysis} data={filteredData} onAnalyze={getAnalysis} analyzing={analyzing} analyzedAt={analyzedAt} timeRange={timeRange} onDrill={openDrill} />}
        {activeTab === "funnel" && <LeadFunnel analysis={analysis} data={filteredData} callDetails={callDetails} onDrill={openDrill} />}
        {activeTab === "campaigns" && <Campaigns analysis={analysis} data={filteredData} onDrill={openDrill} />}
        {activeTab === "conversations" && <Conversations analysis={analysis} data={filteredData} onDrill={openDrill} />}
        {activeTab === "appointments" && <Appointments analysis={analysis} data={filteredData} onDrill={openDrill} />}
        {activeTab === "ai" && <AIInsights analysis={analysis} analyzing={analyzing} analyzedAt={analyzedAt} onAnalyze={getAnalysis} />}
      </div>
      <DrillDownModal modal={modal} onClose={closeDrill} />
    </div>
  );
}
