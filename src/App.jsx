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

function leadSource(c) {
  const srcRaw = (c.source || c.sourceName || c.appSource || "").toString().trim();
  if (!srcRaw) return "No Source";
  const s = srcRaw.toLowerCase();
  if (s.includes("third party") || s === "third_party") return "Voice AI";
  if (s.includes("facebook") || s.includes("fb") || s.includes("meta") || s.includes("instagram")) return "Facebook / Meta";
  if (s.includes("google")) return "Google";
  if (s.includes("form") || s.includes("web") || s.includes("landing") || s.includes("site")) return "Website Form";
  if (s.includes("referr")) return "Referral";
  if (s.includes("phone") || s.includes("call") || s.includes("inbound")) return "Phone / Inbound Call";
  if (s.includes("manual") || s.includes("crm") || s.includes("import")) return "Manual Entry";
  return srcRaw.charAt(0).toUpperCase() + srcRaw.slice(1);
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

// ─── custom field helpers (IDs hardcoded — GHL definitions endpoint unavailable) ───
const CF = {
  pestLocation:     "nwaTYOb9vqY0BytfzLow",
  isHomeowner:      "2BhPcaLNpQACv8CVt2WC",
  homeownerPresent: "0veRRe4JOhmJwxIMUXLM",
  propertyType:     "WXW5lULpj3ZlOcFBeUPy",
  propertyClass:    "uk70xnmUw60TI4ReTgZf",
  validLead:        "1X6z3qP9tDuaGglCTl16",
  assignedTech:     "YNSiemHqclnDZpCCaXan",
  _hcpTechId:       "vsYV3ExFzPfyzQi0dlRN",
};
function getCFValue(c, ...fieldIds) {
  const cf = Array.isArray(c.customFields) ? c.customFields : [];
  for (const id of fieldIds) {
    const f = cf.find(x => x.id === id);
    const v = (f?.value ?? f?.fieldValue ?? "").toString().trim();
    if (v) return v;
  }
  return "";
}
function hasCF(c, ...fieldIds) {
  const cf = Array.isArray(c.customFields) ? c.customFields : [];
  return fieldIds.some(id => cf.some(f => f.id === id && (f.value ?? f.fieldValue ?? "").toString().trim()));
}
const NULL_NAME = /^[-–—\s]+$|^n\/?a$/i;
function hasName(c) {
  const f = (c.firstName || "").trim(), l = (c.lastName || "").trim();
  const real = (v) => v.length > 0 && !NULL_NAME.test(v);
  return real(f) || real(l);
}
function hasZip(c) { return !!(c.postalCode || c.postal_code || c.zip || "").trim(); }

// GHL LC Phone puts ALL conversations under TYPE_PHONE.
// Distinguish voice calls from SMS by inspecting lastMessageBody.
function isCallBody(body = "") {
  const b = body.toLowerCase();
  return b.includes("inbound call") || b.includes("outbound call") ||
         b.includes("voicemail") || b.includes("missed call") ||
         b.includes("answered") || b.includes("no answer") ||
         /\d+m\s*\d+s|\d+:\d+\s*(min|sec|duration)/i.test(body);
}
function convCategory(type, body = "") {
  const t = String(type ?? "").toLowerCase();
  if (t.includes("email") || t === "2") return "email";
  if (t.includes("fb") || t.includes("facebook")) return "facebook";
  if (t.includes("instagram") || t.includes("ig")) return "instagram";
  if (t.includes("gmb") || t.includes("google")) return "gmb";
  if (t.includes("chat") || t.includes("live")) return "chat";
  if (t.includes("sms") || t === "1") return "sms";
  // TYPE_CALL is an explicit voice-call record — always a call regardless of body
  if (t === "type_call" || t === "call") return "call";
  // TYPE_PHONE is ambiguous (SMS and voice on LC Phone) — inspect body
  if (t.includes("phone") || t.includes("call")) {
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

  // Pre-claim events that have a solid contactId link so name-match can't double-count them
  const claimedApptKeys = new Set();
  contacts.forEach(c => {
    if (!c.id) return;
    const appt = events.find(e => e.contactId && e.contactId === c.id);
    if (appt) claimedApptKeys.add(`${(appt.title || "").toLowerCase()}|${appt.startTime || ""}`);
  });

  contacts.forEach(c => {
    const src = leadSource(c);
    if (!sources[src]) sources[src] = { leads: 0, smsStarted: 0, replied: 0, booked: 0 };
    const d = sources[src];
    d.leads++;
    const cid = c.id;
    const cname = getName(c);
    const matched = smsConvos.find(cv =>
      (cid && cv.contactId && cv.contactId === cid) || nameMatch(getName(cv), cname)
    );
    if (matched) {
      d.smsStarted++;
      if ((matched.unreadCount || 0) > 0) d.replied++;
    }
    // contactId match first; name-match only on events not already claimed by another contact
    let appt = cid ? events.find(e => e.contactId && e.contactId === cid) : null;
    if (!appt) {
      appt = events.find(e => {
        const key = `${(e.title || "").toLowerCase()}|${e.startTime || ""}`;
        return !claimedApptKeys.has(key) && nameMatch(e.title || "", cname);
      });
    }
    if (appt) {
      claimedApptKeys.add(`${(appt.title || "").toLowerCase()}|${appt.startTime || ""}`);
      d.booked++;
    }
  });
  return Object.entries(sources).sort((a, b) => b[1].leads - a[1].leads);
}

function buildFunnelDetails(contacts, convos, events) {
  const smsConvos = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const result = {};

  const claimedApptKeys = new Set();
  contacts.forEach(c => {
    if (!c.id) return;
    const appt = events.find(e => e.contactId && e.contactId === c.id);
    if (appt) claimedApptKeys.add(`${(appt.title || "").toLowerCase()}|${appt.startTime || ""}`);
  });

  contacts.forEach(c => {
    const src = leadSource(c);
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
    let appt = cid ? events.find(e => e.contactId && e.contactId === cid) : null;
    if (!appt) {
      appt = events.find(e => {
        const key = `${(e.title || "").toLowerCase()}|${e.startTime || ""}`;
        return !claimedApptKeys.has(key) && nameMatch(e.title || "", cname);
      });
    }
    if (appt) {
      claimedApptKeys.add(`${(appt.title || "").toLowerCase()}|${appt.startTime || ""}`);
      r.booked.push(appt);
    }
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

function CommandCenter({ analysis, data, onAnalyze, analyzing, analyzedAt, onDrill }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];
  const events = data?.appointments?.events || [];

  const smsThreads = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const allReplied = convos.filter(c => (c.unreadCount || 0) > 0);
  const callThreads = convos.filter(c => isCall(c));

  const profilingStages = [
    { label: "Has Name",                 filter: (c) => hasName(c) },
    { label: "Pest Activity Location",   filter: (c) => hasCF(c, CF.pestLocation) },
    { label: "Is Homeowner",             filter: (c) => hasCF(c, CF.isHomeowner, CF.homeownerPresent) },
    { label: "Residential / Commercial", filter: (c) => hasCF(c, CF.propertyClass) },
    { label: "Property Type",            filter: (c) => hasCF(c, CF.propertyType) },
    { label: "Email",                    filter: (c) => !!(c.email || "").trim() },
    { label: "Zipcode",                  filter: (c) => hasZip(c) },
  ];

  const toContactRows = (list) => list.map(c => ({
    primary: c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown",
    secondary: `${c.phone || "No phone"} · Added ${fmtDate(leadDate(c))}`,
    badge: leadSource(c),
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

  return (
    <div>
      <div style={styles.grid}>
        <StatCard label="Total Leads" value={contacts.length} accent={C.green} onClick={contacts.length ? () => onDrill?.("Total Leads", toContactRows(contacts)) : undefined} />
        <StatCard label="SMS Conversations" value={smsThreads.length} onClick={smsThreads.length ? () => onDrill?.("SMS Conversations", toConvoRows(smsThreads)) : undefined} />
        <StatCard label="Total Replied" value={allReplied.length} accent={allReplied.length ? C.green : C.textDim} onClick={allReplied.length ? () => onDrill?.("Replied Conversations", toConvoRows(allReplied)) : undefined} />
        <StatCard label="Call Conversations" value={callThreads.length} accent={C.blue} onClick={callThreads.length ? () => onDrill?.("Call Conversations", toCallRows(callThreads)) : undefined} />
        <StatCard label="Total Bookings" value={events.length} accent={C.amber} onClick={events.length ? () => onDrill?.("All Bookings", toEventRows(events)) : undefined} />
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Profiling Fields</div>
        {profilingStages.map(stage => {
          const matched = contacts.filter(stage.filter);
          return (
            <FunnelStage key={stage.label} label={stage.label} count={matched.length} base={contacts.length}
              onClick={matched.length ? () => onDrill?.(`Profiling: ${stage.label}`, toContactRows(matched)) : undefined}
            />
          );
        })}
        {(() => {
          const knownIds = new Set(Object.values(CF));
          const cfIdSamples = {};
          contacts.forEach(c => {
            (c.customFields || []).forEach(f => {
              const val = (f.value ?? f.fieldValue ?? "").toString().trim();
              if (!val || !f.id || knownIds.has(f.id)) return;
              if (!cfIdSamples[f.id]) cfIdSamples[f.id] = new Set();
              cfIdSamples[f.id].add(val);
            });
          });
          const unknownIds = Object.keys(cfIdSamples);
          if (unknownIds.length === 0) return null;
          return (
            <div style={{ fontSize: "0.72rem", color: C.textFaint, marginTop: "8px" }}>
              <div style={{ marginBottom: "3px" }}>Unidentified field IDs (share to map remaining stages):</div>
              {unknownIds.map(id => (
                <div key={id} style={{ marginLeft: "8px", marginBottom: "2px", fontFamily: "monospace" }}>
                  {id} → {[...cfIdSamples[id]].slice(0, 3).join(", ")}
                </div>
              ))}
            </div>
          );
        })()}
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
    badge: leadSource(c),
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
        {callConvos.length === 0 && (
          <div style={styles.insightText}>
            No call data in the selected time range.
            {convos.length > 0 && (() => {
              const typeSamples = {};
              convos.forEach(c => {
                const key = `${c.type}`;
                if (!typeSamples[key]) typeSamples[key] = c.lastMessageBody?.slice(0, 60) || "(no body)";
              });
              return (
                <div style={{ fontSize: "0.72rem", color: C.textFaint, marginTop: "6px" }}>
                  Conversation types seen: {Object.entries(typeSamples).map(([t, sample]) => `${t} → "${sample}"`).join(" | ")}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

function Conversations({ data, onDrill }) {
  const contacts = data?.contacts?.contacts || [];
  const convos = data?.conversations?.conversations || [];

  const smsThreads = convos.filter(c => convCategory(c.type, c.lastMessageBody) === "sms");
  const emailThreads = convos.filter(c => convCategory(c.type) === "email");
  const callThreads = convos.filter(c => isCall(c));
  const parsedCalls = callThreads.map(c => ({ ...c, ...parseCall(c.lastMessageBody) }));
  const allReplied = convos.filter(c => (c.unreadCount || 0) > 0);
  const totalCallSec = parsedCalls.reduce((s, c) => s + (c.duration || 0), 0);
  const callH = Math.floor(totalCallSec / 3600), callM = Math.floor((totalCallSec % 3600) / 60);
  const callTimeLabel = totalCallSec ? (callH > 0 ? `${callH}h ${callM}m` : `${callM}m`) : "0m";

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
        <StatCard label="Total SMS" value={smsThreads.length} onClick={smsThreads.length ? () => onDrill?.("SMS Conversations", toConvoRows(smsThreads)) : undefined} />
        <StatCard label="Total Email" value={emailThreads.length} accent={C.amber} onClick={emailThreads.length ? () => onDrill?.("Email Conversations", toConvoRows(emailThreads)) : undefined} />
        <StatCard label="Total Replies" value={allReplied.length} accent={allReplied.length ? C.green : C.textDim} onClick={allReplied.length ? () => onDrill?.("Replied Conversations", toConvoRows(allReplied)) : undefined} />
        <StatCard label="Total Phone Calls" value={callThreads.length} accent={C.blue} onClick={callThreads.length ? () => onDrill?.("Phone Calls", toConvoRows(callThreads)) : undefined} />
        <StatCard label="Total Call Time" value={callTimeLabel} sub={`${parsedCalls.filter(c => c.answered).length} answered`} />
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>All Conversations</div>
        {convos.length === 0 && <div style={styles.insightText}>No conversation data in the selected range.</div>}
        {convos.map((c, i) => {
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
      </div>
    </div>
  );
}

function Appointments({ data }) {
  const rawEvents = data?.appointments?.events || [];

  // Defensive client-side cleaning — mirrors api/ghl.js cleanEvents
  const seen = new Set();
  const events = rawEvents.filter(e => {
    const title = (e.title || e.name || "").trim();
    const m = title.match(/(?:·|—|-|for)\s*(.+)$/i);
    const contactPart = (m ? m[1] : title).trim();
    if (!contactPart || /^null$/i.test(contactPart)) return false;
    const key = `${contactPart.toLowerCase()}|${e.startTime || ""}|${e.calendarId || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const hidden = rawEvents.length - events.length;

  const now = Date.now();
  const upcoming = events
    .filter(e => (toDate(e.startTime)?.getTime() || 0) >= now)
    .sort((a, b) => (toDate(a.startTime)?.getTime() || 0) - (toDate(b.startTime)?.getTime() || 0));
  const past = events
    .filter(e => (toDate(e.startTime)?.getTime() || 0) < now)
    .sort((a, b) => (toDate(b.startTime)?.getTime() || 0) - (toDate(a.startTime)?.getTime() || 0));

  const pastSlice = past.slice(0, Math.max(0, 60 - upcoming.length));

  const renderRow = (e, isUpcoming) => {
    const d = toDate(e.startTime);
    const conf = e.appointmentStatus === "confirmed";
    const didShow = e.appointmentStatus === "showed";
    return (
      <div key={`${e.id || e.title}|${e.startTime}`} style={styles.row}>
        <div>
          <div style={{ ...styles.rowName, color: isUpcoming ? C.text : C.textDim }}>{e.title || e.name || "Appointment"}</div>
          <div style={styles.rowSub}>{d ? d.toLocaleString() : "—"}{e.assignedUserId ? ` · ${e.assignedUserId}` : ""}</div>
        </div>
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {isUpcoming && <span style={{ ...styles.pill, background: `${C.blue}22`, color: C.blue }}>upcoming</span>}
          <span style={{ ...styles.pill, background: (conf || didShow) ? "#0D2E1A" : C.bg, color: (conf || didShow) ? C.green : C.textDim }}>
            {e.appointmentStatus || "scheduled"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.section}>
      {hidden > 0 && <p style={{ ...styles.note, marginBottom: "12px" }}>{hidden} duplicate or invalid record{hidden !== 1 ? "s" : ""} hidden.</p>}
      {events.length === 0 && <div style={styles.insightText}>No appointments in the selected range.</div>}
      {upcoming.map(e => renderRow(e, true))}
      {pastSlice.length > 0 && upcoming.length > 0 && (
        <div style={{ fontSize: "0.72rem", color: C.textFaint, padding: "10px 0 4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Past</div>
      )}
      {pastSlice.map(e => renderRow(e, false))}
      {past.length > pastSlice.length && (
        <p style={styles.note}>{past.length - pastSlice.length} older appointment{past.length - pastSlice.length !== 1 ? "s" : ""} not shown — narrow the date range to see them.</p>
      )}
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

// ─── Exported Data tab ────────────────────────────────────────────────────────
function ExportedData({ data }) {
  const contacts = data?.contacts?.contacts || [];
  const events = data?.appointments?.events || [];
  const [techFilter, setTechFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const cTags = (c) => Array.isArray(c.tags) ? c.tags : [];

  const getLastAppt = (c) => {
    const cid = c.id;
    const cname = getName(c);
    return events
      .filter(e => (cid && e.contactId === cid) || nameMatch(e.title || "", cname))
      .sort((a, b) => (new Date(b.startTime) - new Date(a.startTime)))[0] || null;
  };

  const profilingScore = (c) => {
    let s = 0;
    if (hasName(c)) s++;
    if (hasCF(c, CF.pestLocation)) s++;
    if (hasCF(c, CF.isHomeowner, CF.homeownerPresent)) s++;
    if (hasCF(c, CF.propertyType, CF.propertyClass)) s++;
    if (hasZip(c)) s++;
    return s;
  };

  const techs = [...new Set(contacts.map(c => getCFValue(c, CF.assignedTech)).filter(Boolean))].sort();

  let filtered = contacts;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c =>
      getName(c).toLowerCase().includes(q) ||
      (c.phone || "").includes(q) ||
      (c.email || "").toLowerCase().includes(q)
    );
  }
  if (techFilter !== "all") {
    filtered = techFilter === "unassigned"
      ? filtered.filter(c => !getCFValue(c, CF.assignedTech))
      : filtered.filter(c => getCFValue(c, CF.assignedTech) === techFilter);
  }
  if (statusFilter === "valid") filtered = filtered.filter(c => hasCF(c, CF.validLead));
  if (statusFilter === "not_qualified") filtered = filtered.filter(c => cTags(c).includes("not_qualified"));
  if (statusFilter === "needs_human") filtered = filtered.filter(c => cTags(c).includes("human_handover"));
  if (statusFilter === "booked") filtered = filtered.filter(c => !!getLastAppt(c));

  const validCount = filtered.filter(c => hasCF(c, CF.validLead)).length;
  const assignedCount = filtered.filter(c => getCFValue(c, CF.assignedTech)).length;
  const bookedCount = filtered.filter(c => !!getLastAppt(c)).length;

  const chip = (label, active, onClick, accent = C.amber) => (
    <button
      onClick={onClick}
      style={{
        padding: "4px 10px", borderRadius: "12px", fontSize: "0.76rem",
        border: `1px solid ${active ? accent : C.border}`,
        background: active ? `${accent}22` : "transparent",
        color: active ? accent : C.textDim,
        cursor: "pointer",
      }}
    >{label}</button>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px", alignItems: "center" }}>
        <input
          placeholder="Search name, phone, email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: C.panelDark, border: `1px solid ${C.border}`, borderRadius: "6px",
            padding: "5px 10px", color: C.text, fontSize: "0.82rem", width: "200px", outline: "none",
          }}
        />
        {techs.length > 0 && (
          <>
            <span style={{ fontSize: "0.72rem", color: C.textFaint }}>Tech:</span>
            {chip("All", techFilter === "all", () => setTechFilter("all"))}
            {techs.map(t => chip(t, techFilter === t, () => setTechFilter(techFilter === t ? "all" : t), C.blue))}
            {chip("Unassigned", techFilter === "unassigned", () => setTechFilter(techFilter === "unassigned" ? "all" : "unassigned"), C.textFaint)}
          </>
        )}
        <span style={{ fontSize: "0.72rem", color: C.textFaint, marginLeft: "4px" }}>Status:</span>
        {chip("All", statusFilter === "all", () => setStatusFilter("all"))}
        {chip("Valid Lead", statusFilter === "valid", () => setStatusFilter(statusFilter === "valid" ? "all" : "valid"), C.green)}
        {chip("Booked", statusFilter === "booked", () => setStatusFilter(statusFilter === "booked" ? "all" : "booked"), C.amber)}
        {chip("Not Qualified", statusFilter === "not_qualified", () => setStatusFilter(statusFilter === "not_qualified" ? "all" : "not_qualified"), C.red)}
        {chip("Needs Human", statusFilter === "needs_human", () => setStatusFilter(statusFilter === "needs_human" ? "all" : "needs_human"), "#a78bfa")}
      </div>

      <div style={styles.grid}>
        <StatCard label="Contacts" value={filtered.length} />
        <StatCard label="Valid Leads" value={validCount} accent={C.green} />
        <StatCard label="Assigned" value={assignedCount} accent={C.blue} />
        <StatCard label="Booked" value={bookedCount} accent={C.amber} />
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <span>Contact Database</span>
          {filtered.length !== contacts.length && (
            <span style={{ fontSize: "0.72rem", color: C.textFaint, fontWeight: "400", textTransform: "none" }}>
              {filtered.length} of {contacts.length} shown
            </span>
          )}
        </div>
        <div style={{ maxHeight: "540px", overflowY: "auto" }}>
          {filtered.slice(0, 200).map((c, i) => {
            const name = c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown";
            const tech = getCFValue(c, CF.assignedTech);
            const valid = hasCF(c, CF.validLead);
            const score = profilingScore(c);
            const appt = getLastAppt(c);
            const src = leadSource(c);
            const tags = cTags(c);
            const notQualified = tags.includes("not_qualified");
            const humanHandover = tags.includes("human_handover");
            const optout = tags.some(t => t === "optout");

            return (
              <div key={c.id || i} style={styles.row}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...styles.rowName, color: notQualified ? C.textDim : C.text }}>
                    {name}
                    {optout && <span style={{ ...styles.pill, marginLeft: "6px", background: `${C.textFaint}22`, color: C.textFaint }}>Opt Out</span>}
                  </div>
                  <div style={styles.rowSub}>
                    {c.phone || "—"}
                    {c.email ? ` · ${c.email}` : ""}
                    {` · Added ${fmtDate(leadDate(c))}`}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end", flexShrink: 0, maxWidth: "55%" }}>
                  {src !== "No Source" && <span style={{ ...styles.pill, background: C.panelDark }}>{src}</span>}
                  {tech && <span style={{ ...styles.pill, background: `${C.blue}22`, color: C.blue }}>{tech}</span>}
                  {valid && <span style={{ ...styles.pill, background: `${C.green}22`, color: C.green }}>✓ Valid</span>}
                  {notQualified && <span style={{ ...styles.pill, background: `${C.red}22`, color: C.red }}>Not Qualified</span>}
                  {humanHandover && <span style={{ ...styles.pill, background: "#a78bfa22", color: "#a78bfa" }}>Needs Human</span>}
                  <span style={{
                    ...styles.pill,
                    background: score >= 4 ? `${C.green}22` : score >= 2 ? `${C.amber}22` : C.panelDark,
                    color: score >= 4 ? C.green : score >= 2 ? C.amber : C.textFaint,
                  }}>{score}/5 profiled</span>
                  {appt && <span style={{ ...styles.pill, background: `${C.amber}22`, color: C.amber }}>
                    Booked {fmtDate(toDate(appt.startTime))}
                  </span>}
                </div>
              </div>
            );
          })}
          {filtered.length > 200 && (
            <div style={{ textAlign: "center", padding: "12px", color: C.textFaint, fontSize: "0.75rem" }}>
              Showing first 200 of {filtered.length} — use filters or search to narrow results
            </div>
          )}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px", color: C.textFaint }}>No contacts match the current filters.</div>
          )}
        </div>
      </div>
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
  const [sourceFilter, setSourceFilter] = useState(null);
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

  // Source filter applied on top of time filter
  const allSources = [...new Set(rawContacts.map(c => leadSource(c)).filter(s => s !== "No Source"))].sort();
  const sfContacts = sourceFilter ? fContacts.filter(c => leadSource(c) === sourceFilter) : fContacts;
  const sfIds = new Set(sfContacts.map(c => c.id).filter(Boolean));
  const sfNames = new Set(sfContacts.map(c => getName(c)).filter(Boolean));
  const sfConvos = sourceFilter ? fConvos.filter(c => (c.contactId && sfIds.has(c.contactId)) || sfNames.has(getName(c))) : fConvos;
  const sfEvents = sourceFilter ? fEvents.filter(e => (e.contactId && sfIds.has(e.contactId)) || sfContacts.some(c => nameMatch(e.title || "", getName(c)))) : fEvents;

  const filteredData = {
    contacts: { contacts: sfContacts },
    conversations: { conversations: sfConvos },
    appointments: { events: sfEvents },
    customFieldDefs: data?.customFieldDefs || [],
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
        customFieldDefs: raw.customFieldDefs || [],
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
    { id: "command", label: "Overview" },
    { id: "funnel", label: "Lead Funnel" },
    { id: "conversations", label: "Conversations" },
    { id: "appointments", label: "Appointments" },
    { id: "exports", label: "Exported Data" },
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
          {allSources.length > 0 && (
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", color: C.textFaint, marginRight: "2px" }}>Source:</span>
              <button onClick={() => setSourceFilter(null)} style={{ ...styles.rangeBtn, ...(sourceFilter === null ? styles.rangeBtnActive : {}) }}>All</button>
              {allSources.map(s => (
                <button key={s} onClick={() => setSourceFilter(s === sourceFilter ? null : s)}
                  style={{ ...styles.rangeBtn, ...(sourceFilter === s ? styles.rangeBtnActive : {}) }}>
                  {s.replace("Facebook / Meta", "FB").replace("Phone / Inbound Call", "Phone").replace("Website Form", "Web").replace("Manual Entry", "Manual")}
                </button>
              ))}
            </div>
          )}
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
        {activeTab === "command" && <CommandCenter analysis={analysis} data={filteredData} onAnalyze={getAnalysis} analyzing={analyzing} analyzedAt={analyzedAt} onDrill={openDrill} />}
        {activeTab === "funnel" && <LeadFunnel analysis={analysis} data={filteredData} callDetails={callDetails} onDrill={openDrill} />}
        {activeTab === "conversations" && <Conversations data={filteredData} onDrill={openDrill} />}
        {activeTab === "appointments" && <Appointments data={filteredData} />}
        {activeTab === "exports" && <ExportedData data={filteredData} />}
        {activeTab === "ai" && <AIInsights analysis={analysis} analyzing={analyzing} analyzedAt={analyzedAt} onAnalyze={getAnalysis} />}
      </div>
      <DrillDownModal modal={modal} onClose={closeDrill} />
    </div>
  );
}
