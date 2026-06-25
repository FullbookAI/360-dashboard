import { useState, useEffect, useMemo } from "react";

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

// ─── Lead Intelligence tab ────────────────────────────────────────────────────
const LI = {
  paper:"#F7F6F2", ink:"#1E2A26", soft:"#5B6A63", ever:"#16352B",
  signal:"#3FB984", signalD:"#2A8C63", amber:"#E0A458", amberD:"#C0883C",
  clay:"#B5654B", na:"#9AA59E", line:"#E3E0D7", line2:"#D5D2C7", card:"#FFFFFF",
};
const SERIF = "'Fraunces', serif";
const MONO  = "'IBM Plex Mono', monospace";
const QDIMS = [
  { key:"own", lab:"Homeowner",    vals:[["yes","Yes"],["no","No"]] },
  { key:"prs", lab:"Owner present",vals:[["yes","Yes"],["no","No"]] },
  { key:"loc", lab:"Pest location",vals:[["inside","Inside"],["outside","Outside"],["both","Both"]] },
  { key:"pt",  lab:"Property type",vals:[["single_family","Single family"],["commercial","Commercial"],["other","Other"]] },
  { key:"rc",  lab:"Use",          vals:[["residential","Residential"],["commercial","Commercial"]] },
];
const MON_ABB = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function LISeg({ options, value, onChange }) {
  return (
    <div style={{ display:"inline-flex", background:"#ECEAE2", border:`1px solid ${LI.line2}`, borderRadius:"9px", padding:"3px", gap:"2px" }}>
      {options.map(([v,label]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          fontFamily:"Inter,sans-serif", fontSize:"12.5px", fontWeight:"500",
          color: value===v ? "#fff" : LI.soft,
          background: value===v ? LI.ever : "transparent",
          border:0, padding:"6px 12px", borderRadius:"6px", cursor:"pointer",
          boxShadow: value===v ? "0 1px 3px rgba(0,0,0,.12)" : "none",
        }}>{label}</button>
      ))}
    </div>
  );
}

function LeadIntelligence({ data, onAnalyze, analyzing, analysis, analyzedAt, lastUpdated, onRefresh }) {
  const contacts = data?.contacts?.contacts || [];
  const events   = data?.appointments?.events || [];

  const [range, setRange] = useState("all");
  const [src,   setSrc]   = useState("all");
  const [ch,    setCh]    = useState("all");
  const [qual,  setQual]  = useState({ own:null, prs:null, loc:null, pt:null, rc:null });

  // Build a fast contactId → boolean booked lookup
  const bookedIds = useMemo(() => new Set(events.filter(e => e.contactId).map(e => e.contactId)), [events]);

  // Map contactId → appointment source so we read the booking's source, not the contact's intake source
  const apptSrcMap = useMemo(() => {
    const m = new Map();
    events.forEach(e => { if (e.contactId) m.set(e.contactId, (e.source || e.sourceName || e.appSource || "").toLowerCase()); });
    return m;
  }, [events]);

  // Convert each contact to a flat row matching the HTML's DATA.rows schema
  const allRows = useMemo(() => contacts.map(c => {
    const tags = Array.isArray(c.tags) ? c.tags : [];
    const isFB = leadSource(c) === "Facebook / Meta" || tags.some(t => t === "fb-lead-form" || t === "fb-number");
    const rowSrc = isFB ? "fb" : "call";
    const appt = bookedIds.has(c.id) ? 1 : 0;
    let rowCh = "na";
    if (appt) {
      const as = apptSrcMap.get(c.id) || "";
      if (as.includes("conversations ai") || as.includes("conversations_ai")) rowCh = "sms";
      else if (as.includes("third party") || as.includes("third_party") || as.includes("voice ai")) rowCh = "voice";
      else rowCh = "voice"; // untagged booked → Voice AI (confirmed pattern)
    }

    const ownRaw = getCFValue(c, CF.isHomeowner).toLowerCase();
    const own = ownRaw === "yes" ? "yes" : ownRaw === "no" ? "no" : null;
    const prsRaw = getCFValue(c, CF.homeownerPresent).toLowerCase();
    const prs = prsRaw === "yes" ? "yes" : prsRaw === "no" ? "no" : null;
    const locRaw = getCFValue(c, CF.pestLocation).toLowerCase();
    const loc = locRaw || null;
    const ptRaw = getCFValue(c, CF.propertyType).toLowerCase();
    let pt = null;
    if (ptRaw) {
      if (ptRaw.includes("single") || (ptRaw.includes("home") && !ptRaw.includes("commercial"))) pt = "single_family";
      else if (ptRaw.includes("commercial")) pt = "commercial";
      else pt = "other";
    }
    const rcRaw = getCFValue(c, CF.propertyClass).toLowerCase();
    const rc = rcRaw.includes("residential") ? "residential" : rcRaw.includes("commercial") ? "commercial" : null;
    const d = (leadDate(c) || new Date()).toISOString().slice(0, 10);
    return { d, src:rowSrc, ch:rowCh, appt, own, prs, loc, pt, rc,
             nq: tags.includes("not_qualified") ? 1 : 0,
             opt: tags.some(t => t === "optout") ? 1 : 0,
             hh: tags.includes("human_handover") ? 1 : 0 };
  }), [contacts, bookedIds, apptSrcMap]);

  const anchor  = allRows.reduce((mx, r) => r.d > mx ? r.d : mx, "2020-01-01");

  function daysBefore(n) {
    const d = new Date(anchor + "T00:00:00"); d.setDate(d.getDate() - n); return d.toISOString().slice(0,10);
  }
  const lo = range === "all" ? null : daysBefore(+range);

  function passBase(r, exceptDim) {
    if (lo && r.d < lo) return false;
    if (src !== "all" && r.src !== src) return false;
    if (ch  !== "all" && r.ch  !== ch)  return false;
    for (const k in qual) { if (k === exceptDim) continue; if (qual[k] !== null && r[k] !== qual[k]) return false; }
    return true;
  }

  const rows      = allRows.filter(r => passBase(r, null));
  const n         = rows.length;
  const liPct     = (a, b) => b ? Math.round(a / b * 100) : 0;
  const apptCount = rows.filter(r => r.appt).length;
  const engCount  = rows.filter(r => r.own || r.prs || r.loc || r.pt || r.rc).length;
  const ownCount  = rows.filter(r => r.own === "yes").length;
  const nqCount   = rows.filter(r => r.nq).length;
  const optCount  = rows.filter(r => r.opt).length;
  const hhCount   = rows.filter(r => r.hh).length;
  const chCounts  = { voice:0, sms:0 };
  rows.filter(r => r.appt).forEach(r => { if (r.ch === "voice") chCounts.voice++; if (r.ch === "sms") chCounts.sms++; });
  const aiShare   = apptCount ? Math.round((chCounts.voice + chCounts.sms) / apptCount * 100) : 0;
  const chMax     = Math.max(chCounts.voice, chCounts.sms, 1);

  // Trend by month
  const trend = {};
  rows.forEach(r => {
    const k = r.d.slice(0, 7);
    if (!trend[k]) trend[k] = { call:0, fb:0, appt:0 };
    if (r.src === "fb") trend[k].fb++; else trend[k].call++;
    if (r.appt) trend[k].appt++;
  });
  const trendKeys = Object.keys(trend).sort();

  function TrendChart() {
    if (!trendKeys.length) return <div style={{ padding:"40px", textAlign:"center", color:LI.na }}>No data in range.</div>;
    const W=960,H=300,PL=46,PR=trendKeys.length>1?46:24,PT=24,PB=46;
    const pw=W-PL-PR, ph=H-PT-PB, base=PT+ph;
    const maxL = Math.max(...trendKeys.map(k => (trend[k].call||0)+(trend[k].fb||0)), 1);
    const maxA = Math.max(...trendKeys.map(k => trend[k].appt||0), 1);
    const slot  = pw/trendKeys.length, barw = Math.min(46, slot*0.5);
    const sL=ph/maxL, sA=ph/maxA;
    const els=[], pts=[];
    // grid
    for (let i=0;i<=4;i++) {
      const y=PT+ph*i/4, val=Math.round(maxL*(1-i/4));
      els.push(<line key={`g${i}`} x1={PL} y1={y} x2={W-PR} y2={y} stroke={i===4?"#D9D6CC":"#EEECE4"}/>);
      els.push(<text key={`t${i}`} x={PL-8} y={y+4} textAnchor="end" fontFamily={MONO} fontSize="10.5" fill={LI.na}>{val}</text>);
    }
    for (let i=0;i<2;i++) {
      const v=Math.round(maxA*(1-i)), y=PT+ph*i;
      els.push(<text key={`ra${i}`} x={W-PR+8} y={y+4} textAnchor="start" fontFamily={MONO} fontSize="10.5" fill={LI.ever}>{v}</text>);
    }
    trendKeys.forEach((k,i) => {
      const cx=PL+slot*i+slot/2, x=cx-barw/2;
      const callH=(trend[k].call||0)*sL, fbH=(trend[k].fb||0)*sL;
      const cy=base-callH, fy=cy-fbH;
      if (trend[k].call) els.push(<rect key={`c${k}`} x={x} y={cy} width={barw} height={callH} fill={LI.ever} opacity="0.85"/>);
      if (trend[k].fb)   els.push(<rect key={`f${k}`} x={x} y={fy} width={barw} height={fbH} rx="2" fill={LI.amber}/>);
      pts.push([cx, base-(trend[k].appt||0)*sA, trend[k].appt||0]);
      els.push(<text key={`lbl${k}`} x={cx} y={base+18} textAnchor="middle" fontFamily={MONO} fontSize="11" fill={LI.soft}>{MON_ABB[(+k.slice(5))-1]}</text>);
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", display:"block" }}>
        {els}
        {pts.length>1 && <polyline points={pts.map(p=>`${p[0]},${p[1]}`).join(" ")} fill="none" stroke={LI.ever} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>}
        {pts.map(([cx,cy,v],i) => <g key={`pt${i}`}>
          <circle cx={cx} cy={cy} r="4.5" fill="#fff" stroke={LI.ever} strokeWidth="2.5"/>
          <text x={cx} y={cy-10} textAnchor="middle" fontFamily={SERIF} fontWeight="600" fontSize="13" fill={LI.ever}>{v}</text>
        </g>)}
      </svg>
    );
  }

  const SH = (txt) => <span style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:".11em", textTransform:"uppercase", color:LI.soft }}>{txt}</span>;
  const dot = (col) => <span style={{ width:"10px", height:"10px", borderRadius:"3px", background:col, display:"inline-block", flexShrink:0 }}/>;

  return (
    <div style={{ background:LI.paper, margin:"-1rem", padding:"0 28px 60px", fontFamily:"Inter,sans-serif", color:LI.ink, lineHeight:"1.45" }}>

      {/* Masthead */}
      <div style={{ padding:"34px 0 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"20px", borderBottom:`1px solid ${LI.line2}`, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontFamily:MONO, fontSize:"11px", letterSpacing:".18em", textTransform:"uppercase", color:LI.soft }}>Lead Intelligence Dashboard</div>
          <div style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"33px", lineHeight:"1.05", margin:"7px 0 0", letterSpacing:"-.01em" }}>360 Rodent Control</div>
          <div style={{ fontSize:"14px", color:LI.soft, marginTop:"2px" }}>AI capture · qualification · appointment booking</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px" }}>
          <div style={{ fontFamily:MONO, fontSize:"12px", color:LI.ever, textAlign:"right" }}>
            SHOWING <b style={{ fontSize:"15px", color:LI.signalD }}>{n.toLocaleString()}</b> OF {allRows.length.toLocaleString()} LEADS<br/>
            <span style={{ color:LI.soft }}>{range==="all" ? "All time" : `Last ${range} days`} · {src==="all" ? "all sources" : src==="fb" ? "Facebook" : "incoming calls"}</span>
          </div>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            {lastUpdated && <span style={{ fontFamily:MONO, fontSize:"10.5px", color:LI.na }}>Updated {lastUpdated.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span>}
            <span style={{ fontFamily:MONO, fontSize:"10.5px", color:LI.signalD, display:"flex", alignItems:"center", gap:"4px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:LI.signal, display:"inline-block" }}/>LIVE
            </span>
            <button onClick={onRefresh} style={{ fontFamily:MONO, fontSize:"11px", color:LI.ever, background:"transparent", border:`1px solid ${LI.line2}`, borderRadius:"7px", padding:"6px 12px", cursor:"pointer" }}>↻ Refresh</button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:LI.paper, padding:"16px 0 14px", marginBottom:"6px", borderBottom:`1px solid ${LI.line}` }}>
        <div style={{ display:"flex", gap:"26px", flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>Period</span>
            <LISeg options={[["30","30d"],["60","60d"],["90","90d"],["all","All time"]]} value={range} onChange={setRange}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>Source</span>
            <LISeg options={[["all","All"],["fb","Facebook"],["call","Incoming calls"]]} value={src} onChange={setSrc}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft }}>Booking channel</span>
            <LISeg options={[["all","All"],["voice","Voice AI"],["sms","SMS AI"]]} value={ch} onChange={setCh}/>
          </div>
          <button onClick={() => { setRange("all"); setSrc("all"); setCh("all"); setQual({own:null,prs:null,loc:null,pt:null,rc:null}); }}
            style={{ marginLeft:"auto", fontFamily:MONO, fontSize:"11px", color:LI.soft, background:"transparent", border:`1px solid ${LI.line2}`, borderRadius:"7px", padding:"7px 12px", cursor:"pointer" }}>
            ✕ Reset all
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:LI.line, border:`1px solid ${LI.line}`, borderRadius:"13px", overflow:"hidden", marginTop:"22px" }}>
        {[
          { lab:"Leads handled",          val:n,         sub:"in view",                    col:LI.ink },
          { lab:"Appointments booked",    val:apptCount, sub:`${liPct(apptCount,n)}% booking rate`, col:LI.signalD },
          { lab:"Confirmed homeowners",   val:ownCount,  sub:`${liPct(ownCount,n)}% of leads`,      col:LI.signalD },
          { lab:"Opted out",              val:optCount,  sub:`${liPct(optCount,n)}% of leads`,      col:LI.clay },
        ].map(({lab,val,sub,col}) => (
          <div key={lab} style={{ background:LI.card, padding:"20px" }}>
            {SH(lab)}
            <div style={{ fontFamily:SERIF, fontWeight:"600", fontSize:"36px", lineHeight:1, marginTop:"11px", letterSpacing:"-.02em", color:col }}>{val.toLocaleString()}</div>
            <div style={{ fontSize:"12px", color:LI.soft, marginTop:"6px" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* 01 — Funnel + Channels */}
      <div style={{ paddingTop:"40px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:"13px", marginBottom:"18px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:MONO, fontSize:"12px", color:LI.signalD }}>01</span>
          <span style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"21px", letterSpacing:"-.01em" }}>Qualification funnel &amp; booking channels</span>
          <span style={{ fontSize:"12.5px", color:LI.soft, marginLeft:"auto" }}>Every stage reflects the filters above.</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1.15fr 1fr", gap:"20px" }}>
          <div style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"24px" }}>
            <h3 style={{ margin:"0 0 3px", fontSize:"13.5px", fontWeight:"600" }}>From lead to booked appointment</h3>
            <p style={{ fontSize:"12px", color:LI.soft, margin:"0 0 20px" }}>How leads move through capture, qualification, and booking.</p>
            {[
              { name:"Leads captured",            v:n,         col:LI.ever },
              { name:"Engaged in qualification",  v:engCount,  col:LI.signalD },
              { name:"Confirmed homeowner",        v:ownCount,  col:LI.signal },
              { name:"Appointment booked",         v:apptCount, col:LI.amberD },
            ].map((s,i,arr) => {
              const w = n ? Math.max((s.v/n)*100, 2) : 2;
              const prev = i>0 ? arr[i-1].v : null;
              const conv = prev!=null && prev>0 ? Math.round((s.v/prev)*100) : null;
              return (
                <div key={s.name} style={{ marginBottom:"13px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6px" }}>
                    <span style={{ fontSize:"13px", fontWeight:"600", display:"flex", alignItems:"center", gap:"8px" }}>
                      {dot(s.col)}{s.name}
                    </span>
                    <span style={{ fontFamily:MONO, fontSize:"11.5px", color:LI.soft }}>
                      <span style={{ fontFamily:SERIF, fontSize:"18px", fontWeight:"600", color:LI.ink }}>{s.v.toLocaleString()}</span>
                      {conv!=null ? ` · ${conv}% of prev` : ""}
                    </span>
                  </div>
                  <div style={{ height:"30px", borderRadius:"7px", background:"#EFEDE5", overflow:"hidden" }}>
                    <div style={{ width:`${w}%`, height:"100%", borderRadius:"7px", background:s.col, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:"10px" }}>
                      <span style={{ color:"#fff", fontFamily:MONO, fontSize:"11px" }}>{liPct(s.v,n)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"24px" }}>
            <h3 style={{ margin:"0 0 3px", fontSize:"13.5px", fontWeight:"600" }}>Who booked the appointment</h3>
            <p style={{ fontSize:"12px", color:LI.soft, margin:"0 0 20px" }}>Appointments in view, by the channel that closed them.</p>
            {[["voice","Voice AI",LI.signal],["sms","SMS AI",LI.signalD]].map(([k,lab,col]) => (
              <div key={k} style={{ marginBottom:"17px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6px" }}>
                  <span style={{ fontSize:"13px", fontWeight:"600", display:"flex", alignItems:"center", gap:"8px" }}>{dot(col)}{lab}</span>
                  <span style={{ fontFamily:MONO, fontSize:"11.5px", color:LI.soft }}>
                    <span style={{ fontFamily:SERIF, fontSize:"17px", fontWeight:"600", color:LI.ink }}>{chCounts[k]}</span> / {apptCount}
                  </span>
                </div>
                <div style={{ height:"12px", borderRadius:"6px", background:"#EFEDE5", overflow:"hidden" }}>
                  <div style={{ width:`${(chCounts[k]/chMax)*100}%`, height:"100%", borderRadius:"6px", background:col }}/>
                </div>
              </div>
            ))}
            <div style={{ marginTop:"14px", paddingTop:"14px", borderTop:`1px solid ${LI.line}`, fontSize:"11.5px", color:LI.soft, lineHeight:"1.6" }}>
              <span style={{ fontFamily:SERIF, fontSize:"20px", fontWeight:"600", color:LI.signalD }}>{aiShare}%</span>
              {" "}of booked appointments handled by AI agents (Voice + SMS).<br/>
              <span style={{ marginTop:"6px", display:"block" }}>Voice AI includes bookings GHL didn't tag with a separate source — attributed correctly so every appointment is accounted for.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 02 — Qualification answers */}
      <div style={{ paddingTop:"40px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:"13px", marginBottom:"18px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:MONO, fontSize:"12px", color:LI.signalD }}>02</span>
          <span style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"21px", letterSpacing:"-.01em" }}>Qualification answers — click to filter</span>
          <span style={{ fontSize:"12.5px", color:LI.soft, marginLeft:"auto" }}>Tap any answer to slice the whole dashboard by it.</span>
        </div>
        <div style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"18px" }}>
            {QDIMS.map(dim => {
              const sub = allRows.filter(r => passBase(r, dim.key));
              const counts = {}; let max = 1;
              dim.vals.forEach(([v]) => { counts[v] = sub.filter(r => r[dim.key]===v).length; if (counts[v]>max) max=counts[v]; });
              return (
                <div key={dim.key}>
                  <div style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".08em", textTransform:"uppercase", color:LI.soft, marginBottom:"9px" }}>{dim.lab}</div>
                  {dim.vals.map(([v,lab]) => {
                    const on = qual[dim.key]===v;
                    return (
                      <button key={v} onClick={() => setQual(q => ({...q,[dim.key]:q[dim.key]===v?null:v}))}
                        style={{ display:"flex", alignItems:"center", gap:"9px", width:"100%", textAlign:"left",
                          background:on?"#EAF6F0":LI.card, border:`1px solid ${on?LI.signalD:LI.line2}`,
                          borderRadius:"9px", padding:"9px 11px", marginBottom:"7px", cursor:"pointer", fontFamily:"inherit" }}>
                        <span style={{ fontSize:"12.5px", fontWeight:"500", flexShrink:0, minWidth:"90px" }}>{lab}</span>
                        <span style={{ flex:1, height:"7px", borderRadius:"4px", background:"#ECEAE2", overflow:"hidden" }}>
                          <span style={{ display:"block", height:"100%", width:`${max?(counts[v]/max)*100:0}%`, background:on?LI.signalD:LI.signal, borderRadius:"4px" }}/>
                        </span>
                        <span style={{ fontFamily:MONO, fontSize:"11.5px", color:LI.soft, flexShrink:0, minWidth:"30px", textAlign:"right" }}>{counts[v]}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 03 — Drop-off */}
      <div style={{ paddingTop:"40px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:"13px", marginBottom:"18px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:MONO, fontSize:"12px", color:LI.signalD }}>03</span>
          <span style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"21px", letterSpacing:"-.01em" }}>Filtering &amp; drop-off</span>
          <span style={{ fontSize:"12.5px", color:LI.soft, marginLeft:"auto" }}>Work the system absorbed so staff didn't have to.</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
          {[
            { lab:"Engaged in qualification", val:engCount, col:LI.signalD, desc:"answered at least one qualifying question before any staff involvement." },
            { lab:"Auto-filtered · not qualified", val:nqCount, col:LI.clay, desc:"flagged not qualified automatically, keeping the calendar clean." },
            { lab:"Handed to a human",         val:hhCount, col:LI.ink,    desc:"escalated to staff when the case genuinely needed a person." },
          ].map(({lab,val,col,desc}) => (
            <div key={lab} style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"22px" }}>
              <div style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".09em", textTransform:"uppercase", color:LI.soft }}>{lab}</div>
              <div style={{ fontFamily:SERIF, fontWeight:"600", fontSize:"34px", lineHeight:1, margin:"12px 0 7px", letterSpacing:"-.02em", color:col }}>{val.toLocaleString()}</div>
              <div style={{ fontSize:"12.5px", color:LI.soft }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 — Trend */}
      <div style={{ paddingTop:"40px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:"13px", marginBottom:"18px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:MONO, fontSize:"12px", color:LI.signalD }}>04</span>
          <span style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"21px", letterSpacing:"-.01em" }}>Activity over time</span>
          <span style={{ fontSize:"12.5px", color:LI.soft, marginLeft:"auto" }}>Bars = leads (dark inbound, amber Facebook). Line = appointments.</span>
        </div>
        <div style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"24px" }}>
          <div style={{ display:"flex", gap:"18px", flexWrap:"wrap", fontSize:"12px", color:LI.soft, marginBottom:"12px" }}>
            {[[LI.ever,"Incoming calls"],[LI.amber,"Facebook"]].map(([col,lab]) => (
              <span key={lab} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                <span style={{ width:"12px", height:"12px", borderRadius:"3px", background:col, display:"inline-block" }}/>{lab}
              </span>
            ))}
            <span style={{ display:"flex", alignItems:"center", gap:"7px" }}>
              <span style={{ width:"17px", height:"3px", borderRadius:"2px", background:LI.ever, display:"inline-block" }}/>Appointments
            </span>
          </div>
          <TrendChart/>
        </div>
      </div>

      {/* 05 — AI Analysis */}
      <div style={{ paddingTop:"40px" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:"13px", marginBottom:"18px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:MONO, fontSize:"12px", color:LI.signalD }}>05</span>
          <span style={{ fontFamily:SERIF, fontWeight:"500", fontSize:"21px", letterSpacing:"-.01em" }}>AI analysis</span>
          {analyzedAt && <span style={{ fontSize:"12px", color:LI.soft }}>Last run {analyzedAt.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span>}
          {analyzedAt && <button onClick={() => onAnalyze(true)} disabled={analyzing} style={{ marginLeft:"auto", fontFamily:MONO, fontSize:"11px", color:LI.soft, background:"transparent", border:`1px solid ${LI.line2}`, borderRadius:"7px", padding:"6px 12px", cursor:"pointer" }}>↻ Re-run</button>}
        </div>
        <div style={{ background:LI.card, border:`1px solid ${LI.line}`, borderRadius:"13px", padding:"28px" }}>
          {analyzing ? (
            <div style={{ display:"flex", alignItems:"center", gap:"12px", color:LI.soft, fontFamily:"Inter,sans-serif", fontSize:"13.5px" }}>
              <span style={{ width:"18px", height:"18px", border:`2px solid ${LI.line2}`, borderTopColor:LI.signalD, borderRadius:"50%", display:"inline-block", animation:"spin .8s linear infinite", flexShrink:0 }}/>
              Claude is reviewing the account data…
            </div>
          ) : !analysis ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontFamily:SERIF, fontSize:"18px", fontWeight:"500", color:LI.ink, marginBottom:"10px" }}>Get an AI read on this data</div>
              <div style={{ fontSize:"13px", color:LI.soft, marginBottom:"22px" }}>Claude reviews your leads, appointments, and qualification patterns and returns a plain-English summary with specific recommendations.</div>
              <button onClick={() => onAnalyze(false)} style={{ fontFamily:MONO, fontSize:"12.5px", fontWeight:"500", color:"#fff", background:LI.ever, border:"none", borderRadius:"9px", padding:"13px 28px", cursor:"pointer", letterSpacing:".04em" }}>
                GENERATE ANALYSIS
              </button>
            </div>
          ) : (
            <div style={{ fontFamily:"Inter,sans-serif" }}>
              {analysis.summary && <p style={{ fontSize:"14px", lineHeight:"1.7", color:LI.ink, marginTop:0 }}>{analysis.summary}</p>}
              {[
                ["Lead Intake", analysis.leadInsights],
                ["Campaigns", analysis.campaignInsights],
                ["Conversations", analysis.conversationInsights],
                ["Appointments", analysis.appointmentInsights],
              ].filter(([,v]) => v).map(([title, items]) => (
                <div key={title} style={{ marginTop:"18px" }}>
                  <div style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.soft, marginBottom:"8px" }}>{title}</div>
                  {(Array.isArray(items) ? items : [items]).map((it, i) => (
                    <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"6px" }}>
                      <span style={{ color:LI.signalD, flexShrink:0, marginTop:"2px" }}>▸</span>
                      <span style={{ fontSize:"13.5px", color:LI.ink, lineHeight:"1.6" }}>{it}</span>
                    </div>
                  ))}
                </div>
              ))}
              {(Array.isArray(analysis.redFlags) ? analysis.redFlags : analysis.redFlags ? [analysis.redFlags] : []).length > 0 && (
                <div style={{ marginTop:"18px" }}>
                  <div style={{ fontFamily:MONO, fontSize:"10.5px", letterSpacing:".1em", textTransform:"uppercase", color:LI.clay, marginBottom:"8px" }}>⚠ Red Flags</div>
                  {(Array.isArray(analysis.redFlags) ? analysis.redFlags : [analysis.redFlags]).map((it, i) => (
                    <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"6px" }}>
                      <span style={{ color:LI.clay, flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:"13.5px", color:LI.ink, lineHeight:"1.6" }}>{it}</span>
                    </div>
                  ))}
                </div>
              )}
              {(Array.isArray(analysis.recommendations) ? analysis.recommendations : analysis.recommendations ? [analysis.recommendations] : []).map((r, i) => (
                <div key={i} style={{ display:"flex", gap:"12px", marginTop:"10px", padding:"12px 14px", background:LI.paper, borderRadius:"9px", border:`1px solid ${LI.line}` }}>
                  <span style={{ fontFamily:SERIF, fontWeight:"600", fontSize:"18px", color:LI.signalD, flexShrink:0, lineHeight:1 }}>{i+1}</span>
                  <span style={{ fontSize:"13.5px", color:LI.ink, lineHeight:"1.6" }}>{r}</span>
                </div>
              ))}
              {!analyzedAt && null}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop:"46px", paddingTop:"22px", borderTop:`1px solid ${LI.line2}`, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", fontSize:"11.5px", color:LI.soft, fontFamily:MONO }}>
        <span>360 RODENT CONTROL · LEAD INTELLIGENCE</span>
        <span>SOURCE: GHL LIVE API</span>
      </div>
    </div>
  );
}

// ─── Exported Data tab ────────────────────────────────────────────────────────
// CSV snapshot hardcoded from June 24, 2026 GHL export (1,229 contacts)
const CSV_SNAP = {
  date: "Jun 24, 2026",
  total: 1229,
  withName: 507,
  withEmail: 316,
  facebook: 216,        // is FB = 1
  voiceAI: 41,          // App Source = Third Party, not FB
  convAI: 9,            // App Source = Conversations Ai, not FB
  unattributed: 963,    // no App Source, not FB
  booked: 95,
  bookedVoiceAI: 45,
  bookedConvAI: 23,
  bookedOther: 27,
};

function ExportedData() {
  const Bar = ({ label, val, total, color }) => {
    const p = total ? Math.round((val / total) * 100) : 0;
    return (
      <div style={{ marginBottom: "13px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <span style={{ fontSize: "0.8rem", color: C.textMute }}>{label}</span>
          <span style={{ fontSize: "0.8rem", color: C.text }}>{val.toLocaleString()} <span style={{ color: C.textFaint, fontSize: "0.72rem" }}>({p}%)</span></span>
        </div>
        <div style={{ height: "5px", background: C.panelDark, borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ width: `${p}%`, height: "100%", background: color, borderRadius: "3px" }} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ fontSize: "0.72rem", color: C.textFaint, marginBottom: "14px" }}>
        GHL export · {CSV_SNAP.date} · {CSV_SNAP.total.toLocaleString()} contacts
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "12px" }}>
        {[
          { label: "Total Contacts", val: CSV_SNAP.total, accent: C.text },
          { label: "Have a Name",    val: CSV_SNAP.withName, accent: C.amber },
          { label: "Have an Email",  val: CSV_SNAP.withEmail, accent: C.blue },
        ].map(({ label, val, accent }) => (
          <div key={label} style={{ ...styles.section, padding: "1rem", marginBottom: 0 }}>
            <div style={{ fontSize: "0.7rem", color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>{label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "700", color: accent }}>{val.toLocaleString()}</div>
            <div style={{ fontSize: "0.7rem", color: C.textFaint, marginTop: "2px" }}>
              {Math.round((val / CSV_SNAP.total) * 100)}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Source + Booking side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Initial Source</div>
          <Bar label="Facebook"              val={CSV_SNAP.facebook}    total={CSV_SNAP.total} color={C.blue} />
          <Bar label="Voice AI (inbound phone)" val={CSV_SNAP.voiceAI} total={CSV_SNAP.total} color={C.green} />
          <Bar label="Conversation AI"       val={CSV_SNAP.convAI}     total={CSV_SNAP.total} color={C.purple} />
          <Bar label="Unattributed / Other"  val={CSV_SNAP.unattributed} total={CSV_SNAP.total} color={C.textFaint} />
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>Booking Channel</span>
            <span style={{ fontSize: "0.72rem", fontWeight: "400", textTransform: "none", color: C.textFaint }}>{CSV_SNAP.booked} booked</span>
          </div>
          <Bar label="Via Voice AI (phone)"      val={CSV_SNAP.bookedVoiceAI} total={CSV_SNAP.booked} color={C.green} />
          <Bar label="Via Conversation AI / SMS" val={CSV_SNAP.bookedConvAI}  total={CSV_SNAP.booked} color={C.purple} />
          <Bar label="Other / Manual"            val={CSV_SNAP.bookedOther}   total={CSV_SNAP.booked} color={C.textFaint} />
        </div>
      </div>

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
  const [lastUpdated, setLastUpdated] = useState(null);

  const getAnalysis = async (force = false) => {
    if (!data || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversations: data.conversations?.conversations || [],
          contacts: data.contacts?.contacts || [],
          appointments: data.appointments?.events || [],
          force,
        }),
      });
      setAnalysis(await res.json());
      setAnalyzedAt(new Date());
    } catch {
      setAnalysis({ summary: "AI analysis unavailable — metrics are still live. Try again." });
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
          <div><div style={styles.logoText}>360 Rodent Control</div><div style={styles.logoSub}>Lead Intelligence Dashboard</div></div>
        </div>
        <div style={styles.errorBox}>{error}</div>
        <button style={styles.btn} onClick={() => load(false)}>Retry Live Connection</button>
        <button style={styles.btnGhost} onClick={loadDemo}>Load Demo Data Instead</button>
        <p style={styles.hint}>A live error usually means a missing env var (GHL_TOKEN, GHL_LOCATION_ID) or a token scope. Check the Vercel function logs for the exact GHL response.</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: LI.paper, minHeight: "100vh" }}>
      <style>{`* { box-sizing: border-box; } body { margin: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <LeadIntelligence
        data={data}
        onAnalyze={getAnalysis}
        analyzing={analyzing}
        analysis={analysis}
        analyzedAt={analyzedAt}
        lastUpdated={lastUpdated}
        onRefresh={() => load(true)}
      />
    </div>
  );
}
