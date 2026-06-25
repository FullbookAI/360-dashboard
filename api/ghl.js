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
  for (let page = 0; page < 15; page++) {
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

  // Fetch page 1 first — use total count to parallelise the rest if available
  const first = await ghlFetch(
    `${GHL_BASE}/conversations/search?locationId=${locationId}&limit=100&page=1`,
    token
  );
  if (first.error || !Array.isArray(first.conversations) || first.conversations.length === 0) {
    return { conversations: [] };
  }
  all.push(...first.conversations);
  if (first.conversations.length < 100) return { conversations: all };

  const total = first.total ?? first.meta?.total ?? null;
  const totalPages = total ? Math.ceil(total / 100) : null;

  if (totalPages && totalPages > 1) {
    // Parallel fetch in batches of 5 to avoid hammering rate limits
    const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    const BATCH = 5;
    for (let i = 0; i < pages.length; i += BATCH) {
      const batch = pages.slice(i, i + BATCH);
      const results = await Promise.all(
        batch.map(p => ghlFetch(
          `${GHL_BASE}/conversations/search?locationId=${locationId}&limit=100&page=${p}`,
          token
        ))
      );
      for (const r of results) {
        if (r.error || !Array.isArray(r.conversations)) break;
        all.push(...r.conversations);
      }
    }
  } else {
    // No total in response — fall back to sequential pagination until last page
    for (let page = 2; page <= 200; page++) {
      const result = await ghlFetch(
        `${GHL_BASE}/conversations/search?locationId=${locationId}&limit=100&page=${page}`,
        token
      );
      if (result.error || !Array.isArray(result.conversations) || result.conversations.length === 0) break;
      all.push(...result.conversations);
      if (result.conversations.length < 100) break;
    }
  }

  return { conversations: all };
}

// Fetch messages for recent call conversations to surface AI Receptionist summaries.
// Batched in parallel groups of 5 to stay within GHL rate limits.
async function fetchCallDetails(conversations, token) {
  const CALL_RE = /inbound call|outbound call|voicemail|missed call|\d+m\d+s/i;
  const callConvos = conversations
    .filter(c => CALL_RE.test(c.lastMessageBody || ""))
    .slice(0, 30);

  if (!callConvos.length) return [];

  const BATCH = 5;
  const enriched = [];
  for (let i = 0; i < callConvos.length; i += BATCH) {
    const batch = callConvos.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(c =>
        ghlFetch(`${GHL_BASE}/conversations/${c.id}/messages?limit=20`, token)
      )
    );
    batch.forEach((c, j) => {
      const r = results[j];
      // GHL nests messages under messages.messages in some versions
      const msgs = r?.messages?.messages ?? r?.messages ?? [];
      enriched.push({
        id: c.id,
        contactId: c.contactId,
        contactName: c.contactName || c.fullName || "",
        lastMessageBody: c.lastMessageBody || "",
        lastMessageDate: c.lastMessageDate || "",
        messages: Array.isArray(msgs) ? msgs : [],
        _error: r?.error || null,
      });
    });
  }
  return enriched;
}

// ─── data-quality filters ─────────────────────────────────────────────────────

const SPAM_NAME_RE = /transfer.{0,4}of.{0,4}fund|graph\.org|top.{0,2}up|\busdt\b|\busdc\b|payment\s+\d|balance[-\s]|💰|phish|bit.?coin|crypto.?wallet/i;

function cleanContacts(contacts) {
  return contacts.filter(c => {
    const name = (c.contactName || c.fullName || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "").trim();
    if (SPAM_NAME_RE.test(name)) return false;
    const digits = (c.phone || "").replace(/\D/g, "");
    if (digits.length > 11) return false;
    return true;
  });
}

function cleanEvents(events) {
  const seen = new Set();
  return events.filter(e => {
    const title = (e.title || e.name || "").trim();
    // Extract contact-name portion after common separators
    const m = title.match(/(?:·|—|-|for)\s*(.+)$/i);
    const contactPart = (m ? m[1] : title).trim();
    if (!contactPart || /^null$/i.test(contactPart)) return false;
    const key = `${contactPart.toLowerCase()}|${e.startTime || ""}|${e.calendarId || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchCustomFieldDefs(locationId, token, contacts) {
  const tryExtract = (r) =>
    Array.isArray(r?.customFields) ? r.customFields :
    Array.isArray(r?.fields) ? r.fields :
    Array.isArray(r) ? r : [];

  // Try primary endpoint
  let fields = tryExtract(await ghlFetch(`${GHL_BASE}/contacts/custom-fields?locationId=${locationId}`, token));

  // Try alternative GHL path
  if (fields.length === 0) {
    fields = tryExtract(await ghlFetch(`${GHL_BASE}/custom-fields/?locationId=${locationId}`, token));
  }

  // Fallback: fetch one contact's full record — GHL often includes fieldKey/name there
  if (fields.length === 0 && Array.isArray(contacts) && contacts.length > 0) {
    const seed = contacts.find(c => Array.isArray(c.customFields) && c.customFields.length > 0);
    if (seed) {
      const detail = await ghlFetch(`${GHL_BASE}/contacts/${seed.id}`, token);
      const raw = detail?.contact?.customFields || detail?.customFields || [];
      if (raw.some(f => f.fieldKey || f.name)) {
        fields = raw.map(f => ({
          id: f.id,
          name: f.name || (f.fieldKey || "")
            .replace(/^contact\./, "")
            .replace(/_/g, " ")
            .replace(/\b\w/g, ch => ch.toUpperCase()),
          fieldKey: f.fieldKey || "",
        }));
      }
    }
  }

  return fields;
}

async function fetchAppointments(locationId, token, start, end) {
  const calendarList = await ghlFetch(`${GHL_BASE}/calendars/?locationId=${locationId}`, token);

  const allCalendars = Array.isArray(calendarList?.calendars) ? calendarList.calendars : [];

  // Skip purely personal calendars that have no business keyword in their name
  const bizKeywords = ["inspection", "rodent", "treatment", "360", "offer", "pest", "control"];
  const calendars = allCalendars.filter(cal => {
    const name = (cal.name || "").toLowerCase();
    const isPersonal = name.includes("personal calendar");
    const hasBizKeyword = bizKeywords.some(k => name.includes(k));
    return !isPersonal || hasBizKeyword;
  });

  if (calendarList?.error) {
    return { events: [], error: `${calendarList.error}${calendarList.detail ? `: ${calendarList.detail}` : ""}` };
  }

  if (calendars.length === 0) {
    return { events: [], error: "no_business_calendars_found" };
  }

  const results = await Promise.all(
    calendars.map((cal) =>
      ghlFetch(
        `${GHL_BASE}/calendars/events?locationId=${locationId}&calendarId=${cal.id}&startTime=${start}&endTime=${end}`,
        token
      )
    )
  );

  const events = results.flatMap((r) => (Array.isArray(r?.events) ? r.events : []));
  return { events };
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
    const start = now - 730 * 24 * 60 * 60 * 1000;  // 2 years back for full appointment history
    const end   = now + 90 * 24 * 60 * 60 * 1000;

    const [contacts, conversations, appointments] = await Promise.all([
      fetchAllContacts(locationId, token),
      fetchAllConversations(locationId, token),
      fetchAppointments(locationId, token, start, end),
    ]);

    // callDetails depends on conversations; customFieldDefs may need a contact as fallback
    const [callDetails, customFieldDefs] = await Promise.all([
      fetchCallDetails(conversations.conversations || [], token),
      fetchCustomFieldDefs(locationId, token, contacts.contacts || []),
    ]);

    // Clean data before returning so every consumer (tabs + AI) sees the same numbers
    const rawContactCount  = contacts.contacts?.length ?? 0;
    const rawEventCount    = appointments.events?.length ?? 0;
    contacts.contacts      = cleanContacts(contacts.contacts || []);
    appointments.events    = cleanEvents(appointments.events || []);

    res.setHeader("Cache-Control", bypass ? "no-store" : "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      conversations,
      contacts,
      appointments,
      callDetails,
      customFieldDefs,
      _counts: {
        contacts: contacts.contacts.length,
        contactsRemoved: rawContactCount - contacts.contacts.length,
        conversations: conversations.conversations?.length ?? 0,
        events: appointments.events.length,
        eventsRemoved: rawEventCount - appointments.events.length,
        callDetails: callDetails.length,
      },
    });
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ error: "proxy_failure", detail: err.message });
  }
}
