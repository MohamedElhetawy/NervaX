"use server";

import { supabase } from "@/lib/supabase";

export interface SubmitMessageInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "job" | "collab" | "consult" | "other";
}

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
  // Easter egg exception - allow the secret code
  if (message.trim() === "000000") return false;

  const spamPatterns = [
    /https?:\/\/[^\s]+/gi,
    /(casino|crypto|bitcoin|loan|viagra|pharmacy)/i,
    /(.)\1{4,}/,
  ];
  const urlCount = (message.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) return true;
  return spamPatterns.some((pattern) => pattern.test(message));
}

export async function submitMessage(
  input: SubmitMessageInput,
  clientIp: string = "unknown"
): Promise<{ success: boolean; error?: string }> {
  // Easter egg: unlock dev mode immediately - bypass ALL checks
  if (input.type === "other" && input.message.trim() === "000000") {
    return { success: true };
  }

  if (isRateLimited(clientIp)) {
    return { success: false, error: "Too many messages. Please wait a minute." };
  }

  const name = sanitize(input.name);
  const email = sanitize(input.email);
  const phone = input.phone ? sanitize(input.phone) : null;
  const message = sanitize(input.message);
  const type = input.type;

  if (!name || name.length < 2 || name.length > 100) {
    return { success: false, error: "Name must be between 2 and 100 characters." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!message || message.length < 6 || message.length > 2000) {
    return { success: false, error: "Message must be between 6 and 2000 characters." };
  }

  if (isSpam(message)) {
    return { success: false, error: "Message flagged as spam." };
  }

  if (!supabase) {
    return { success: false, error: "Database not configured. Please try again later." };
  }

  const { error } = await supabase.from("messages").insert({
    name,
    email,
    phone,
    message,
    type,
    status: "new",
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true };
}

export async function getMessages(): Promise<
  { id: string; name: string; email: string; phone?: string; message: string; type: string; status: string; created_at: string }[]
> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function updateMessageStatus(
  id: string,
  status: "new" | "read" | "replied"
): Promise<{ success: boolean }> {
  if (!supabase) return { success: false };

  const { error } = await supabase.from("messages").update({ status }).eq("id", id);
  return { success: !error };
}
