import { Resend } from "resend";

const FROM = "Augustiner KFZ Website <can@glowandgrowth.net>";
const TO = "unfall@augustiner-kfz.de";

export interface LeadMail {
  name: string;
  phone: string;
  email: string;
  accidentType?: string;
  timeframe?: string;
  fault?: string;
}

const LABELS: Record<string, string> = {
  auffahrunfall: "Auffahrunfall",
  "seitenanstoß": "Seitenkollision",
  kreuzung: "Kreuzungsunfall",
  parkschaden: "Parkschaden",
  totalschaden: "Totalschaden",
  sonstiges: "Sonstiges",
  heute: "Heute",
  "diese-woche": "Diese Woche",
  "diesen-monat": "Diesen Monat",
  laenger: "Länger als 1 Monat her",
  gegner: "Der Unfallgegner (unverschuldet)",
  teilschuld: "Teilschuld",
  unklar: "Noch unklar",
};

function label(value?: string) {
  if (!value) return "–";
  return LABELS[value] ?? value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadMail(lead: LeadMail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing, lead mail skipped");
    return;
  }

  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Telefon", lead.phone],
    ["E-Mail", lead.email],
    ["Unfallart", label(lead.accidentType)],
    ["Zeitraum", label(lead.timeframe)],
    ["Schuldfrage", label(lead.fault)],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#0D0D0D">
      <h2 style="margin:0 0 16px">Neuer Lead über augustiner-kfz.de</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;padding-right:16px">${k}</td><td>${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:20px">
        <a href="tel:${encodeURIComponent(lead.phone)}">Anrufen</a> ·
        <a href="mailto:${encodeURIComponent(lead.email)}">E-Mail schreiben</a>
      </p>
    </div>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: lead.email,
    subject: "Website Lead",
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }
}
