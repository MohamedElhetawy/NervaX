/**
 * Email notification service for NervaX using Resend.
 * Server-only — never import on the client.
 */

import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_TO = process.env.EMAIL_TO || "";

interface EmailPayload {
  name: string;
  email: string;
  type: string;
  message: string;
}

export async function sendContactEmail(
  payload: EmailPayload
): Promise<boolean> {
  if (!RESEND_API_KEY || !EMAIL_TO) {
    console.warn("[Email] Resend API key or recipient not configured. Skipping.");
    return false;
  }

  const resend = new Resend(RESEND_API_KEY);

  const sentAt = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Cairo",
    dateStyle: "full",
    timeStyle: "short",
  });

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; color: #1a1a1a; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .header { background: #0B1D3A; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 18px; color: #D4AF37; font-weight: 600; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }
    .message-box { background: #f9f9f9; border-left: 3px solid #D4AF37; padding: 16px 20px; margin-top: 8px; border-radius: 0 4px 4px 0; }
    .footer { padding: 20px 32px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Message — Nerva X</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(payload.name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(payload.email)}" style="color: #0B1D3A;">${escapeHtml(payload.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Type</div>
        <div class="value">${escapeHtml(payload.type)}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(payload.message).replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent at ${sentAt}
    </div>
  </div>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: "Nerva X <onboarding@resend.dev>",
      to: EMAIL_TO,
      subject: "New Message — Nerva X",
      html: htmlBody,
      replyTo: payload.email,
    });

    if (error) {
      console.error("[Email] Resend error:", error);
      return false;
    }

    console.log("[Email] Contact notification sent successfully.");
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
