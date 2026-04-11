import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb, initDb } from "./_db";
import { verifyToken } from "./_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initDb();
    const sql = getDb();

    if (req.method === "POST") {
      const { accidentType, timeframe, fault, name, phone, email } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({ error: "Name, Telefon und E-Mail sind Pflichtfelder" });
      }

      await sql`
        INSERT INTO leads (accident_type, timeframe, fault, name, phone, email)
        VALUES (${accidentType}, ${timeframe}, ${fault}, ${name}, ${phone}, ${email})
      `;

      return res.status(201).json({ success: true });
    }

    if (req.method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        return res.status(401).json({ error: "Nicht autorisiert" });
      }

      const leads = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
      return res.status(200).json(leads);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Serverfehler", details: err.message });
  }
}
