export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  images: string[];
  live_url?: string;
  github_url?: string;
  created_at: string;
  problem?: string;
  thinking?: string;
  execution?: string;
  challenges?: string;
  result?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "nervax-platform",
    title: "NervaX Platform",
    description:
      "A full-stack digital identity platform showcasing innovation and technical excellence. Built with modern web technologies for optimal performance and user experience.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    images: ["/projects/nervax-platform.jpg"],
    live_url: "https://nervax.com",
    github_url: "https://github.com/nervax/platform",
    created_at: "2024-01-15",
    problem: "The need for a digital presence that goes beyond a typical portfolio — something that serves as a proof of capability, tech showcase, and personal brand all in one.",
    thinking: "The approach was to treat the website itself as a product. Every interaction, animation, and design decision needed to reflect the same quality standard expected in professional projects.",
    execution: "Built with Next.js App Router for SSR and SEO, Tailwind CSS for a consistent design system, Framer Motion for purposeful animations, and Supabase for backend services.",
    challenges: "Balancing visual impact with performance. Ensuring animations enhance rather than distract, and maintaining sub-1.5s load times while delivering a rich experience.",
    result: "A high-performance portfolio with Lighthouse score >90, custom cursor interactions, and a design system that communicates luxury tech minimalism.",
    featured: true,
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description:
      "Real-time analytics dashboard powered by AI insights. Processes large datasets and presents actionable intelligence through intuitive visualizations.",
    tech_stack: ["React", "Python", "FastAPI", "PostgreSQL", "D3.js"],
    images: ["/projects/ai-dashboard.jpg"],
    live_url: "https://ai-dashboard.demo.com",
    github_url: "https://github.com/nervax/ai-dashboard",
    created_at: "2024-03-20",
    problem: "Organizations struggle to extract meaningful insights from their data in real-time. Traditional dashboards show numbers but lack the intelligence to highlight what matters.",
    thinking: "Instead of just visualizing data, the dashboard needed to actively analyze patterns and surface insights. The UI had to make complex AI outputs understandable at a glance.",
    execution: "FastAPI backend for real-time data processing, React frontend with D3.js for custom visualizations, PostgreSQL for efficient data storage, and ML models for pattern detection.",
    challenges: "Handling real-time data streams without UI jank. Making AI-generated insights explainable and trustworthy. Designing visualizations that work across different data types.",
    result: "A dashboard that reduces insight discovery time by 60%, with real-time processing of 10K+ events/second and intuitive AI-powered recommendations.",
    featured: true,
  },
  {
    id: "ecommerce-engine",
    title: "E-Commerce Engine",
    description:
      "Scalable e-commerce platform with advanced inventory management, real-time order tracking, and seamless payment integration.",
    tech_stack: ["Next.js", "Node.js", "Stripe", "Redis", "MongoDB"],
    images: ["/projects/ecommerce-engine.jpg"],
    live_url: "https://ecommerce.demo.com",
    created_at: "2024-06-10",
    problem: "Small to medium businesses need enterprise-grade e-commerce capabilities without the enterprise price tag. Existing solutions are either too simple or too expensive.",
    thinking: "Build a modular system where businesses can start with basics and progressively enable advanced features. The architecture must handle flash sales and seasonal spikes gracefully.",
    execution: "Next.js for the storefront, Node.js microservices for order processing, Stripe for payments, Redis for caching and rate limiting, MongoDB for flexible product catalogs.",
    challenges: "Ensuring zero-downtime during high-traffic events. Maintaining data consistency across microservices. Building a checkout flow that minimizes cart abandonment.",
    result: "Platform handling 50K+ concurrent users, 99.99% uptime during peak events, and an average checkout completion rate 23% above industry standard.",
    featured: true,
  },
  {
    id: "devops-pipeline",
    title: "DevOps Automation Pipeline",
    description:
      "End-to-end CI/CD pipeline with automated testing, deployment, and monitoring. Reduces deployment time from hours to minutes.",
    tech_stack: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Prometheus"],
    images: ["/projects/devops-pipeline.jpg"],
    github_url: "https://github.com/nervax/devops-pipeline",
    created_at: "2024-08-05",
    problem: "Manual deployment processes are slow, error-prone, and create bottlenecks. Teams waste hours on repetitive tasks instead of building features.",
    thinking: "Automation should cover the entire lifecycle — from code push to production monitoring. The pipeline needs to be self-healing and provide clear visibility at every stage.",
    execution: "Docker for containerization, Kubernetes for orchestration, GitHub Actions for CI/CD, Terraform for infrastructure as code, Prometheus + Grafana for monitoring.",
    challenges: "Creating rollback mechanisms that work reliably. Balancing pipeline speed with thorough testing. Making the system observable without information overload.",
    result: "Deployment time reduced from 4 hours to 12 minutes. Zero-downtime deployments. 95% reduction in deployment-related incidents.",
    featured: false,
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
