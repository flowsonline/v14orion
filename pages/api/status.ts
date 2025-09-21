import type { NextApiRequest, NextApiResponse } from "next";
import { setCors } from "@/lib/cors";
import { edenStatus } from "@/lib/eden";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const id = (req.query.id as string) || "";
    if (!id) return res.status(400).json({ error: "Missing id" });

    const data = await edenStatus(id);
    return res.status(200).json(data);
  } catch (e:any) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}