import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects | NervaX",
  description: "Browse through my portfolio of projects and case studies.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-linear-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
            <p className="text-lg text-neutral-200 max-w-2xl">
              Each project is a case study in problem-solving. Browse through my work
              and see how ideas become reality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <Section>
        {projects.length === 0 ? (
          <FadeIn>
            <p className="text-center text-neutral-200">No projects found.</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  techStack={project.tech_stack}
                  image={project.image}
                  liveUrl={project.live_url}
                  githubUrl={project.github_url}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
