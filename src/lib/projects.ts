/**
 * Project data fetching from Supabase.
 * Falls back to empty arrays if Supabase is not configured.
 */

import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Projects] Fetch error:", error);
    return [];
  }

  return data || [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Projects] Featured fetch error:", error);
    return [];
  }

  return data || [];
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[Projects] Slug fetch error:", error);
    return null;
  }

  return data;
}
