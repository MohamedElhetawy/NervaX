import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendContactEmail } from "@/lib/email";
import { sendTelegramNotification } from "@/lib/telegram";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_MESSAGES_PER_WINDOW = 3;
const messageTimestamps: Map<string, number[]> = new Map();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = messageTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recent.length >= MAX_MESSAGES_PER_WINDOW) return true;

  recent.push(now);
  messageTimestamps.set(ip, recent);
  return false;
}

function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSpam(message: string): boolean {
  const spamPatterns = [
    /https?:\/\/[^\s]+/gi,
    /(casino|crypto|bitcoin|loan|viagra|pharmacy)/i,
    /(.)\\1{4,}/,
  ];
  const urlCount = (message.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) return true;
  return spamPatterns.some((pattern) => pattern.test(message));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many messages. Please wait a minute." },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Sanitize
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = phone ? sanitize(phone) : null;
    const cleanMessage = sanitize(message);

    // Validate
    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 6 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Message must be between 6 and 2000 characters." },
        { status: 400 }
      );
    }

    if (!["job", "collab", "consult", "other"].includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid message type." },
        { status: 400 }
      );
    }

    if (isSpam(cleanMessage)) {
      return NextResponse.json(
        { success: false, error: "Message flagged as spam." },
        { status: 400 }
      );
    }

    // Insert into Supabase
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database not configured." },
        { status: 500 }
      );
    }

    const { error: dbError } = await supabase.from("messages").insert({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      type,
      status: "new",
    });

    if (dbError) {
      console.error("[Contact API] DB insert error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save message." },
        { status: 500 }
      );
    }

    // Send notifications (non-blocking — don't fail the request)
    const typeLabels: Record<string, string> = {
      job: "Job Opportunity",
      collab: "Collaboration",
      consult: "Consulting",
      other: "Other",
    };

    const notificationPayload = {
      name: cleanName,
      email: cleanEmail,
      type: typeLabels[type] || type,
      message: cleanMessage,
    };

    // Fire and forget — don't await both
    Promise.allSettled([
      sendContactEmail(notificationPayload),
      sendTelegramNotification(notificationPayload),
    ]).then((results) => {
      results.forEach((result, i) => {
        const service = i === 0 ? "Email" : "Telegram";
        if (result.status === "rejected") {
          console.error(`[Contact API] ${service} notification failed:`, result.reason);
        }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
