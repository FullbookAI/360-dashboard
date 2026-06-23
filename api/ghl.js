const GHL_BASE = "https://services.leadconnectorhq.com";
// v2 API standard version header. (Your old code used 2021-04-15, which fails.)
const VERSION = "2021-07-28";

async function ghlFetch(url, token) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: VERSION,
        Accept: "application/json",
      },
    });
    const text = await res.text();
    let body;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = { raw: text };
    }
    if (!res.ok) {
      return {
        error: `HTTP ${res.status}`,
        detail: (body.message || text || "").toString().slice(0, 300),
      };
    }
    return body;
  } catch (err) {
    // Network-level failure (DNS, timeout, etc.) — contained so it can't crash Promise.all.
    return { error: "fetch_failed", detail: err.message };
  }
}

export default async function handler(req, res) {
  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { token, locationId } = req.query;
  if (!token || !locationId) {
    return res.status(400).json({ error: "Missing token or locationId" });
  }

  try {
    const now = Date.now();
    const start = now - 30 * 24 * 60 * 60 * 1000; // 30 days back: recent history + no-shows
    const end = now + 60 * 24 * 60 * 60 * 1000;   // 60 days ahead: upcoming bookings

    // Conversations + contacts can fire immediately.
    // Calendar EVENTS require a calendarId, so we fetch the calendar LIST in this batch first.
    const [conversations, contacts, calendarList] = await Promise.all([
      ghlFetch(`${GHL_BASE}/conversations/search?locationId=${locationId}&limit=50`, token),
      ghlFetch(`${GHL_BASE}/contacts/?locationId=${locationId}&limit=100`, token),
      ghlFetch(`${GHL_BASE}/calendars/?locationId=${locationId}`, token),
    ]);

    // Pull events for each calendar in the location, then flatten into one events array.
    let events = [];
    let appointmentsError = null;
    const calendars = Array.isArray(calendarList?.calendars) ? calendarList.calendars : [];

    if (calendars.length) {
      const results = await Promise.all(
        calendars.map((cal) =>
          ghlFetch(
            `${GHL_BASE}/calendars/events?locationId=${locationId}&calendarId=${cal.id}&startTime=${start}&endTime=${end}`,
            token
          )
        )
      );
      events = results.flatMap((r) => (Array.isArray(r?.events) ? r.events : []));
    } else if (calendarList?.error) {
      // Surface the calendar-list error instead of silently returning zero appointments.
      appointmentsError = `${calendarList.error}${calendarList.detail ? `: ${calendarList.detail}` : ""}`;
    }

    return res.status(200).json({
      conversations,
      contacts,
      appointments: appointmentsError
        ? { error: appointmentsError, events: [] }
        : { events },
    });
  } catch (err) {
    // Last-resort guard: still returns JSON *with* CORS headers (set above) so the
    // browser sees a real response instead of a bare "failed to fetch."
    return res.status(200).json({ error: "proxy_failure", detail: err.message });
  }
}