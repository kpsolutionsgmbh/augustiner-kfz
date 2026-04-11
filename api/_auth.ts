import jwt from "jsonwebtoken";
import type { VercelRequest } from "@vercel/node";

const JWT_SECRET = process.env.JWT_SECRET || "augustiner-kfz-admin-secret-change-me";

export function signToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET) as { username: string };
    return decoded.username;
  } catch {
    return null;
  }
}
