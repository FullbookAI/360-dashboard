const GHL_BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

async function ghlFetch(url, token) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Version: VERSION, Accept: "application/json" },
    });
    const text = await res.text();
    let body;
    try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
    if (!res.ok) return { error: `HTTP ${res.status}`, detail: (body.message || text || "").toString().slice(0, 300) };
    return body;
  } catch (err) {
    return { error: "fetch_failed", detail: err.message };
  }
}

async function fetchAllContacts(locationId, token) {
  const all = [];
  let startAfter = null;
  let startAfterId = null;
  for (let page = 0; page < 10; page++) {
    let url = `${GHL_BASE}/contacts/?locationId=${locationId}&limit=100`;
    if (startAfter)   url += `&startAfter=${encodeURIComponent(startAfter)}`;
    if (startAfterId) url += `&startAfterId=${encodeURIComponent(startAfterId)}`;
    const result = await ghlFetch(url, token);
    if (result.error || !Array.isArray(result.contacts) || result.contacts.length === 0) break;
    all.push(...result.contacts);
    if (result.contacts.length < 100) break;
    startAfter   = result.meta?.startAfter   ?? null;
    startAfterId = result.meta?.startAfterId ?? null;
    if (!startAfter && !startAfterId) break;
  }
  return { contacts: all };
}

async function fetchAllConversations(locationId, token) {
  const all = [];
  for (let page = 1; page <= 5; page++) {
    const result = await ghlFetch(
      `${GHL_BASE}/conversations/search?locationId=${locationId}&limit=100&page=${page}`,
      token
    );
    if (result.error || !Array.isArray(result.conversations) || result.conversations.length === 0) break;
    all.push(...result.conversations);
    if (result.conversations.length < 100) break;
  }
  return { conversations: all };
}

// Try multiple strategies to get appointments — GHL endpoint behaviour varies by account setup.
async function fetchAppointments(locationId, token, start, end) {
  const debug = {};

  // Strategy 1: location-wide events (no calendarId required)
  const direct = await ghlFetch(
    `${GHL_BASE}/calendars/events?locationId=${locationId}&startTime=${start}&endTime=${end}`,
    token
  );
  debug.directEvents = direct.error
    ? { error: direct.error, detail: direct.detail }
    : { count: Array.isArray(direct.events) ? direct.events.length : "not-array", keys: Object.keys(direct) };

  if (!direct.error && Array.isArray(direct.events) && direct.events.length > 0) {
    return { events: direct.events, _apptDebug: debug };
  }

  // Strategy 2: enumerate calendars, then fetch per calendar
  const calendarList = await ghlFetch(`${GHL_BASE}/calendars/?locationId=${locationId}`, token);
  debug.calendarList = calendarList.error
    ? { error: calendarList.error, detail: calendarList.detail }
    : { count: Array.isArray(calendarList.calendars) ? calendarList.calendars.length : "not-array", keys: Object.keys(calendarList) };

  const allCalendars = Array.isArray(calendarList?.calendars) ? calendarList.calendars : [];
  // Keep business calendars; skip purely personal ones (no pest-control keyword in name)
  const businessKeywords = ["inspection", "rodent", "treatment", "360", "offer", "pest", "control"];
  const calendars = allCalendars.filter(cal => {
    const name = (cal.name || "").toLowerCase();
    const isPersonal = name.includes("personal calendar");
    const hasBizKeyword = businessKeywords.some(k => name.includes(k));
    return !isPersonal || hasBizKeyword;
  });
  debug.calendarFilter = {
    total: allCalendars.length,
    kept: calendars.length,
    skipped: allCalendars.filter(c => !calendars.includes(c)).map(c => c.name),
  };
  if (calendars.length > 0) {
    const results = await Promise.all(
      calendars.slice(0, 10).map((cal) =>
        ghlFetch(
          `${GHL_BASE}/calendars/events?locationId=${locationId}&calendarId=${cal.id}&startTime=${start}&endTime=${end}`,
          token
        )
      )
    );
    debug.perCalendar = results.map((r, i) => ({
      id: calendars[i].id,
      name: calendars[i].name,
      count: Array.isArray(r?.events) ? r.events.length : "not-array",
      error: r.error || null,
    }));
    const events = results.flatMap((r) => (Array.isArray(r?.events) ? r.events : []));
    return { events, _apptDebug: debug };
  }

  // Strategy 3: appointments endpoint (alternative GHL path)
  const appts = await ghlFetch(
    `${GHL_BASE}/appointments/?locationId=${locationId}&startTime=${start}&endTime=${end}`,
    token
  );
  debug.appointmentsEndpoint = appts.error
    ? { error: appts.error, detail: appts.detail }
    : { count: Array.isArray(appts.appointments) ? appts.appointments.length : "not-array", keys: Object.keys(appts) };

  if (!appts.error && Array.isArray(appts.appointments)) {
    return { events: appts.appointments, _apptDebug: debug };
  }

  return { events: [], error: "no_appointments_found", _apptDebug: debug };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const token = process.env.GHL_TOKEN || req.query.token;
  const locationId = process.env.GHL_LOCATION_ID || req.query.locationId;
  if (!token || !locationId) return res.status(400).json({ error: "Missing GHL_TOKEN or GHL_LOCATION_ID" });

  const bypass = req.query.refresh === "1" || req.query.refresh === "true";

  try {
    const now = Date.now();
    // Wide window: 90 days back, 90 days forward
    const start = now - 90 * 24 * 60 * 60 * 1000;
    const end   = now + 90 * 24 * 60 * 60 * 1000;

    const [contacts, conversations, appointments] = await Promise.all([
      fetchAllContacts(locationId, token),
      fetchAllConversations(locationId, token),
      fetchAppointments(locationId, token, start, end),
    ]);

    res.setHeader("Cache-Control", bypass ? "no-store" : "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      conversations,
      contacts,
      appointments,
      _counts: {
        contacts: contacts.contacts?.length ?? 0,
        conversations: conversations.conversations?.length ?? 0,
        events: appointments.events?.length ?? 0,
      },
      _apptDebug: appointments._apptDebug,
    });
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ error: "proxy_failure", detail: err.message });
  }
}
