/**
 * Project data fetching.
 * Uses local data from data.ts
 */

import { projects as localProjects } from "@/lib/data";
import type { Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  return localProjects.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return localProjects
    .filter((p) => p.featured === true)
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  // Slugs are derived from IDs by replacing underscores with hyphens
  const project = localProjects.find(
    (p) => p.id.replace(/_/g, "-") === slug
  );
  return project || null;
}
