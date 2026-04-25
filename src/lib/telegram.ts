/**
 * Telegram notification service for NervaX contact submissions.
 * Sends a formatted message to the configured Telegram chat.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

interface TelegramMessagePayload {
  name: string;
  email: string;
  type: string;
  message: string;
}

export async function sendTelegramNotification(
  payload: TelegramMessagePayload
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("[Telegram] Bot token or chat ID not configured. Skipping.");
    return false;
  }

  const text = `📩 *New message from Nerva X*

👤 *Name:* ${escapeMarkdown(payload.name)}
📧 *Email:* ${escapeMarkdown(payload.email)}
📂 *Type:* ${escapeMarkdown(payload.type)}

💬 *Message:*
${escapeMarkdown(payload.message)}

🕒 ${new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })}`;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[Telegram] API error:", res.status, errorBody);
      return false;
    }

    console.log("[Telegram] Notification sent successfully.");
    return true;
  } catch (error) {
    console.error("[Telegram] Failed to send notification:", error);
    return false;
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}
