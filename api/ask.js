export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ answer: "ANTHROPIC_API_KEY not set — can't answer questions right now." });

  const { question = "", contacts = [], conversations = [], appointments = [], filterSummary = "" } = req.body || {};
  if (!question.trim()) return res.status(400).json({ error: "question is required" });

  const prompt = `You are the operations analyst for a marketing agency that MANAGES the GoHighLevel account, Facebook lead campaigns, lead intake, and appointment booking for a client: 360 Rodent Control (a rodent pest control company).

Your audience is the AGENCY TEAM, not the client. Answer the team's question directly and specifically, citing concrete numbers or names from the data below when relevant. If the data doesn't contain the answer, say so plainly — don't guess. Keep the answer under 150 words, plain text, no markdown headers or bullet formatting.

Currently viewing: ${filterSummary || "all data"}

Contacts/Leads (${contacts.length} in view): ${JSON.stringify(contacts.slice(0, 40))}
Conversations (${conversations.length} in view): ${JSON.stringify(conversations.slice(0, 40))}
Appointments (${appointments.length} in view): ${JSON.stringify(appointments.slice(0, 40))}

Question: ${question}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await r.json();
    const text = data.content?.[0]?.text?.trim() || "No answer returned.";
    return res.status(200).json({ answer: text });
  } catch (err) {
    return res.status(200).json({ answer: `Couldn't get an answer: ${err.message}` });
  }
}
