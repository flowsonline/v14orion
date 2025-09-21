type StartPayload = {
  prompt: string;
  ratio?: "9:16" | "1:1" | "16:9";
  duration?: number;
};

export async function edenStartVideo(payload: StartPayload) {
  const key = process.env.EDEN_API_KEY!;
  if (!key) throw new Error("EDEN_API_KEY missing");

  const resp = await fetch("https://api.edenai.run/v2/video/generation", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: payload.prompt,
      resolution: payload.ratio === "9:16" ? "1080x1920" :
                  payload.ratio === "1:1"  ? "1080x1080" : "1920x1080"
    })
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Eden ${resp.status}: ${t}`);
  }
  return await resp.json();
}

export async function edenStatus(id: string) {
  const key = process.env.EDEN_API_KEY!;
  if (!key) throw new Error("EDEN_API_KEY missing");

  const url = `https://api.edenai.run/v2/video/generation/${encodeURIComponent(id)}`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
  if (!resp.ok) throw new Error(`Eden status ${resp.status}`);
  return await resp.json();
}