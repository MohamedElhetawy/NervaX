// Shared TypeScript types for NervaX

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  images: string[];
  live_url?: string | null;
  github_url?: string | null;
  created_at: string;
  problem?: string;
  thinking?: string;
  execution?: string;
  challenges?: string;
  result?: string;
  featured?: boolean;
  status?: "in-progress" | "completed" | "planning" | "coming-soon";
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "job" | "collab" | "consult" | "other";
}
