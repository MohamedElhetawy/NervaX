-- Supabase Migration: Create messages and projects tables
-- Run this in the Supabase SQL Editor

-- 1. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'other',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous inserts" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Allow reads only for authenticated users (admin)
CREATE POLICY "Allow authenticated reads" ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow updates only for authenticated users (admin)
CREATE POLICY "Allow authenticated updates" ON messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Also allow service_role full access for server-side operations
CREATE POLICY "Allow service role full access" ON messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  content TEXT DEFAULT '',
  image TEXT DEFAULT '/projects/nervax-platform.jpg',
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public reads (anyone can view projects)
CREATE POLICY "Allow public reads" ON projects
  FOR SELECT
  USING (true);

-- Allow service_role full access (for admin operations)
CREATE POLICY "Allow service role full access" ON projects
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Seed Projects Data
INSERT INTO projects (title, slug, description, content, image, tech_stack, github_url, live_url, featured, created_at)
VALUES 
(
  'Green Mind', 
  'green-mind', 
  'Advanced AI + IoT vertical farming system', 
  'Real-time environmental monitoring. Camera-based crop analysis. AI-driven disease detection. Automated response system after 15 minutes of inactivity.', 
  '/projects/nervax-platform.png', 
  ARRAY['AI APIs', 'IoT sensors', 'Next.js', 'Flutter', 'Supabase'], 
  NULL, 
  NULL, 
  true, 
  '2024-08-01T00:00:00Z'
),
(
  'EduSmart', 
  'edusmart', 
  'AI-powered learning ecosystem', 
  'Personalized learning paths. Smart scheduling & productivity system. Unified educational dashboard. Behavior-based recommendations.', 
  '/projects/ai-dashboard.png', 
  ARRAY['Next.js', 'Flutter', 'Supabase', 'AI APIs'], 
  NULL, 
  NULL, 
  true, 
  '2024-07-01T00:00:00Z'
),
(
  'Nerva X', 
  'nerva-x', 
  'Personal high-performance digital platform', 
  'Minimal luxury UI design. Project showcase system. Integrated communication system. Optimized performance architecture.', 
  '/projects/nervax-platform.png', 
  ARRAY['Next.js', 'Tailwind', 'Supabase'], 
  'https://github.com/nervax/platform', 
  'https://nervax.vercel.app', 
  true, 
  '2024-01-15T00:00:00Z'
),
(
  'El Masry App', 
  'el-masry-app', 
  'Mobile business management system', 
  'Product management interface. Clean navigation system. Backend integration with Supabase.', 
  '/projects/ecommerce-engine.png', 
  ARRAY['Flutter', 'Supabase'], 
  NULL, 
  NULL, 
  false, 
  '2024-05-01T00:00:00Z'
),
(
  'Hetawy Website', 
  'hetawy-website', 
  'Performance optimization case study', 
  'Debugging slow load issues. Improving frontend rendering. UX optimization.', 
  '/projects/devops-pipeline.png', 
  ARRAY['Next.js', 'Performance'], 
  NULL, 
  NULL, 
  false, 
  '2024-03-01T00:00:00Z'
),
(
  'Agricultural Academic Platform', 
  'agri-academic', 
  'Educational structured content system', 
  'Academic agricultural knowledge delivery. Organized learning modules.', 
  '/projects/ai-dashboard.png', 
  ARRAY['Next.js', 'Education'], 
  NULL, 
  NULL, 
  false, 
  '2024-02-01T00:00:00Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  github_url = EXCLUDED.github_url,
  live_url = EXCLUDED.live_url,
  featured = EXCLUDED.featured;
