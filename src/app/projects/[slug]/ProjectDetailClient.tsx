"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import Button from "@/components/Button";
import type { Project } from "@/lib/types";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
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
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-navy-900 text-sm font-semibold rounded hover:bg-gold-300 transition-colors"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-500/30 text-gray-400 text-sm font-semibold rounded cursor-not-allowed"
                  title="قريبا"
                >
                  <Clock size={14} /> قريبا
                </button>
              )}
              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-500 text-gold-500 text-sm font-semibold rounded hover:bg-gold-500 hover:text-navy-900 transition-colors"
                >
                  <Code size={14} /> Source Code
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-500/30 text-gray-400 text-sm font-semibold rounded cursor-not-allowed"
                  title="قريبا"
                >
                  <Code size={14} /> Source Code
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cover Image */}
      {project.images && project.images.length > 0 && (
        <Section className="py-0">
          <FadeIn>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-700/20">
              <Image
                src={project.images[0]}
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

      {/* Case Study Sections */}
      <Section>
        <div className="space-y-16">
          {project.problem && (
            <FadeIn>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                المشكلة / The Problem
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {typeof project.problem === "string" ? project.problem.split("\n")[0] : project.problem}
              </h2>
              <p className="text-neutral-200 leading-relaxed text-lg">
                {project.problem}
              </p>
            </FadeIn>
          )}

          {project.thinking && (
            <FadeIn delay={0.1}>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                الرؤية / The Thinking
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {typeof project.thinking === "string" ? project.thinking.split("\n")[0] : project.thinking}
              </h2>
              <p className="text-neutral-200 leading-relaxed text-lg">
                {project.thinking}
              </p>
            </FadeIn>
          )}

          {project.execution && (
            <FadeIn delay={0.2}>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                التنفيذ / The Execution
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {typeof project.execution === "string" ? project.execution.split("\n")[0] : project.execution}
              </h2>
              <p className="text-neutral-200 leading-relaxed text-lg">
                {project.execution}
              </p>
            </FadeIn>
          )}

          {project.challenges && (
            <FadeIn delay={0.3}>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                التحديات / The Challenges
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {typeof project.challenges === "string" ? project.challenges.split("\n")[0] : project.challenges}
              </h2>
              <p className="text-neutral-200 leading-relaxed text-lg">
                {project.challenges}
              </p>
            </FadeIn>
          )}

          {project.result && (
            <FadeIn delay={0.4}>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                النتيجة / The Result
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {typeof project.result === "string" ? project.result.split("\n")[0] : project.result}
              </h2>
              <p className="text-neutral-200 leading-relaxed text-lg">
                {project.result}
              </p>
            </FadeIn>
          )}
        </div>
      </Section>

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
