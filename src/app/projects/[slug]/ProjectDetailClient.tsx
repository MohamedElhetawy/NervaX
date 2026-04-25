"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import Button from "@/components/Button";
import type { Project } from "@/lib/types";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  // Parse content into case study sections if available
  const contentSections = project.content
    ? project.content.split("\n").filter((line) => line.trim())
    : [];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-linear-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-gold-500 transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-neutral-200 max-w-3xl mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-navy-700 text-gold-500 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-navy-900 text-sm font-semibold rounded hover:bg-gold-300 transition-colors"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-500 text-gold-500 text-sm font-semibold rounded hover:bg-gold-500 hover:text-navy-900 transition-colors"
                >
                  <Code size={14} /> Source Code
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cover Image */}
      {project.image && (
        <Section className="py-0!">
          <FadeIn>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-700/20">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </FadeIn>
        </Section>
      )}

      {/* Content / Case Study */}
      {contentSections.length > 0 && (
        <Section>
          <FadeIn>
            <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
              Case Study
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              How It Was Built
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {contentSections.map((line, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <p className="text-neutral-200 leading-relaxed">{line}</p>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-navy-800/50">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in This Project?
            </h2>
            <p className="text-neutral-200 mb-8">
              Want to discuss the technical details or explore how similar solutions
              can work for your business?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary">
                Start a Conversation
              </Button>
              <Button href="/projects" variant="outline">
                View All Projects
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
