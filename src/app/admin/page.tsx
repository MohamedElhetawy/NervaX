import { supabaseAdmin } from "@/lib/supabase-server";
import { supabase } from "@/lib/supabase";
import AdminClient from "./AdminClient";
import type { Message } from "@/lib/types";

export const metadata = {
  title: "Admin Dashboard | NervaX",
};

export const dynamic = "force-dynamic";

async function getMessages(): Promise<Message[]> {
  // Prefer service role client, fallback to anon client
  const client = supabaseAdmin || supabase;
  if (!client) return [];

  const { data, error } = await client
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Message[];
}

export default async function AdminPage() {
  const messages = await getMessages();
  return <AdminClient initialMessages={messages} />;
}
