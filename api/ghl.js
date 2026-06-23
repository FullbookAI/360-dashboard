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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Prefer env vars; fall back to query params for ad-hoc testing.
  const token = process.env.GHL_TOKEN || req.query.token;
  const locationId = process.env.GHL_LOCATION_ID || req.query.locationId;
  if (!token || !locationId) return res.status(400).json({ error: "Missing GHL_TOKEN or GHL_LOCATION_ID" });

  try {
    const now = Date.now();
    const start = now - 30 * 24 * 60 * 60 * 1000;
    const end = now + 60 * 24 * 60 * 60 * 1000;

    const [conversations, contacts, calendarList] = await Promise.all([
      ghlFetch(`${GHL_BASE}/conversations/search?locationId=${locationId}&limit=50`, token),
      ghlFetch(`${GHL_BASE}/contacts/?locationId=${locationId}&limit=100`, token),
      ghlFetch(`${GHL_BASE}/calendars/?locationId=${locationId}`, token),
    ]);

    let events = [], appointmentsError = null;
    const calendars = Array.isArray(calendarList?.calendars) ? calendarList.calendars : [];
    if (calendars.length) {
      const results = await Promise.all(
        calendars.slice(0, 8).map((cal) =>
          ghlFetch(`${GHL_BASE}/calendars/events?locationId=${locationId}&calendarId=${cal.id}&startTime=${start}&endTime=${end}`, token)
        )
      );
      events = results.flatMap((r) => (Array.isArray(r?.events) ? r.events : []));
    } else if (calendarList?.error) {
      appointmentsError = `${calendarList.error}${calendarList.detail ? `: ${calendarList.detail}` : ""}`;
    }

    return res.status(200).json({
      conversations, contacts,
      appointments: appointmentsError ? { error: appointmentsError, events: [] } : { events },
    });
  } catch (err) {
    return res.status(200).json({ error: "proxy_failure", detail: err.message });
  }
}