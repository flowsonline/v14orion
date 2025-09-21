export async function genText(prompt: string) {
  const key = process.env.OPENAI_API_KEY!;
  if (!key) throw new Error("OPENAI_API_KEY missing");

  const sys = `You write short social ad scripts (15–45s) and IG captions. Return JSON with fields:
{ "script": "...", "caption": "...", "hashtags": ["#..."] }`;

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: prompt }
      ],
      temperature: 0.8
    })
  });
  if (!resp.ok) throw new Error(`OpenAI ${resp.status}`);
  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  try { return JSON.parse(content); } catch { return { script: content, caption: content, hashtags: [] }; }
}