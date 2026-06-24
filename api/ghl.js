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

// Paginate contacts using GHL cursor pagination (startAfter / startAfterId).
// GHL max per page is 100; we fetch up to 10 pages (1000 contacts).
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
    if (result.contacts.length < 100) break; // last page

    // GHL returns next-page cursors in meta
    startAfter   = result.meta?.startAfter   ?? null;
    startAfterId = result.meta?.startAfterId ?? null;
    if (!startAfter && !startAfterId) break;
  }

  return { contacts: all };
}

// Fetch up to 500 conversations (5 pages × 100).
// GHL conversations/search uses page-based pagination.
async function fetchAllConversations(locationId, token) {
  const all = [];

  for (let page = 1; page <= 5; page++) {
    const result = await ghlFetch(
      `${GHL_BASE}/conversations/search?locationId=${locationId}&limit=100&page=${page}`,
      token
    );
    if (result.error || !Array.isArray(result.conversations) || result.conversations.length === 0) break;

    all.push(...result.conversations);
    if (result.conversations.length < 100) break; // last page
  }

  return { conversations: all };
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
    const start = now - 30 * 24 * 60 * 60 * 1000;
    const end   = now + 60 * 24 * 60 * 60 * 1000;

    // Contacts and conversations fetched with pagination; calendars fetched in parallel.
    const [contacts, conversations, calendarList] = await Promise.all([
      fetchAllContacts(locationId, token),
      fetchAllConversations(locationId, token),
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

    res.setHeader("Cache-Control", bypass
      ? "no-store"
      : "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      conversations,
      contacts,
      appointments: appointmentsError ? { error: appointmentsError, events: [] } : { events },
      _counts: {
        contacts: contacts.contacts?.length ?? 0,
        conversations: conversations.conversations?.length ?? 0,
        events: events.length,
      },
    });
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ error: "proxy_failure", detail: err.message });
  }
}
