import crypto from "crypto";

// Module-level cache. Survives across "warm" invocations of the same function instance.
let CACHE = { key: null, value: null, at: 0 };
const TTL = 60 * 60 * 1000; // 60-min safety refresh even if data is unchanged

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ summary: "ANTHROPIC_API_KEY not set — metrics still computed from live data." });

  const { conversations = [], contacts = [], appointments = [], force = false } = req.body || {};

  const hash = crypto.createHash("sha1")
    .update(JSON.stringify({ conversations, contacts, appointments }))
    .digest("hex");

  const fresh = CACHE.value && CACHE.key === hash && (Date.now() - CACHE.at) < TTL;
  if (fresh && !force) {
    return res.status(200).json({ ...CACHE.value, _cached: true });
  }

  const prompt = `You are the operations analyst for a marketing agency that MANAGES the GoHighLevel account, Facebook lead campaigns, lead intake, and appointment booking for a client: 360 Rodent Control (a rodent pest control company).

Your audience is the AGENCY TEAM, not the client. Be direct and action-oriented. Focus on: speed-to-lead, response SLAs, which lead sources convert, appointment confirmation / no-show prevention, and pipeline leaks. No filler words.

Conversations: ${JSON.stringify(conversations.slice(0, 15))}
Contacts/Leads: ${JSON.stringify(contacts.slice(0, 15))}
Appointments: ${JSON.stringify(appointments.slice(0, 15))}

Return ONLY raw JSON, no markdown. Every insight field must be an array of short bullet strings (one idea per bullet, max 15 words each):
{"summary":"2-3 sentence account health assessment","leadInsights":["bullet","bullet","bullet"],"campaignInsights":["bullet","bullet"],"conversationInsights":["bullet","bullet","bullet"],"appointmentInsights":["bullet","bullet"],"redFlags":["flag","flag"],"recommendations":["specific action 1","specific action 2","specific action 3"]}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1200, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await r.json();
    const text = data.content?.[0]?.text || "{}";
    let parsed; try { parsed = JSON.parse(text.replace(/```json|```/g, "").trim()); } catch { parsed = { summary: text }; }
    CACHE = { key: hash, value: parsed, at: Date.now() };
    return res.status(200).json({ ...parsed, _cached: false });
  } catch (err) {
    return res.status(200).json({ summary: `AI analysis unavailable: ${err.message}` });
  }
}