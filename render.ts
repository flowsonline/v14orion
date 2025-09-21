import type { NextApiRequest, NextApiResponse } from "next";
import { setCors } from "@/lib/cors";
import { edenStartVideo } from "@/lib/eden";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, ratio = "9:16", duration = 15 } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const job = await edenStartVideo({ prompt, ratio, duration });
    return res.status(200).json(job);
  } catch (e:any) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}