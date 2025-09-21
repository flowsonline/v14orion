import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("15s ad for a new coffee shop launch, upbeat and friendly.");
  const [resp, setResp] = useState<any>(null);

  async function call(path: string, body?: any, method: "POST"|"GET" = "POST") {
    setResp("Loading...");
    const r = await fetch(path + (method==="GET" && body?.qs ? `?${new URLSearchParams(body.qs)}` : ""), {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify(body) : undefined
    });
    setResp(await r.json());
  }

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1>Orion Studio — API Test</h1>
      <p>OpenAI for script/caption + Eden for video render (no Zapier).</p>

      <label>Prompt</label>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5} style={{width:"100%"}} />

      <div style={{ display:"flex", gap: 8, marginTop: 12, flexWrap:"wrap" }}>
        <button onClick={()=>call("/api/voiceover", { prompt })}>Generate Script + Copy</button>
        <button onClick={()=>call("/api/render", { prompt, ratio: "9:16", duration: 15 })}>Start Eden Render</button>
        <button onClick={()=> {
          const id = window.prompt("Enter Eden job id:");
          if (id) call("/api/status", { qs: { id } }, "GET");
        }}>Check Status</button>
        <button onClick={()=>call("/api/health", {}, "GET")}>Health</button>
      </div>

      <pre style={{ marginTop: 16, padding: 12, background:"#0b0b0b", color:"#d7ffd7", borderRadius:8, minHeight: 160, overflow:"auto" }}>
        {resp ? JSON.stringify(resp, null, 2) : "No response yet."}
      </pre>
    </div>
  );
}