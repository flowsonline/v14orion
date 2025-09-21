import type { NextApiRequest, NextApiResponse } from "next";
import { setCors } from "@/lib/cors";
import { genText } from "@/lib/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const out = await genText(prompt);
    return res.status(200).json(out);
  } catch (e:any) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}