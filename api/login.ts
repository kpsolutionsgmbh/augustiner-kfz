import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { getDb, initDb } from "./_db.js";
import { signToken } from "./_auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await initDb();
    const sql = getDb();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Benutzername und Passwort erforderlich" });
    }

    // Check if any admin exists, if not create default
    const admins = await sql`SELECT COUNT(*) as count FROM admin_users`;
    if (Number(admins[0].count) === 0) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "augustiner2026";
      const hash = await bcrypt.hash(defaultPassword, 10);
      await sql`INSERT INTO admin_users (username, password_hash) VALUES ('admin', ${hash})`;
    }

    // Find user
    const users = await sql`SELECT * FROM admin_users WHERE username = ${username}`;
    if (users.length === 0) {
      return res.status(401).json({ error: "Ungültige Anmeldedaten" });
    }

    const valid = await bcrypt.compare(password, users[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Ungültige Anmeldedaten" });
    }

    const token = signToken(username);
    return res.status(200).json({ token, username });
  } catch (err: any) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Serverfehler", details: err.message });
  }
}
