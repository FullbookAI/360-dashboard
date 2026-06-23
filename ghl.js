const GHL_BASE = "https://services.leadconnectorhq.com";

async function ghlFetch(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-04-15",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    return { error: `HTTP ${res.status}`, detail: text.slice(0, 300) };
  }
  return res.json();
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { token, locationId } = req.query;

  if (!token || !locationId) {
    return res.status(400).json({ error: "Missing token or locationId" });
  }

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const [conversations, contacts, appointments] = await Promise.all([
    ghlFetch(`${GHL_BASE}/conversations/search?locationId=${locationId}&limit=50`, token),
    ghlFetch(`${GHL_BASE}/contacts/?locationId=${locationId}&limit=100`, token),
    ghlFetch(`${GHL_BASE}/calendars/events?locationId=${locationId}&startTime=${thirtyDaysAgo}&endTime=${now}`, token),
  ]);

  return res.status(200).json({ conversations, contacts, appointments });
}