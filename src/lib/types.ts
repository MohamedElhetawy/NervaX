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
  slug: string;
  description: string;
  content: string;
  image: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "job" | "collab" | "consult" | "other";
}
