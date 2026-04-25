"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

interface HomeClientProps {
  featuredProjects: Project[];
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--gold-500)_0%,transparent_50%)] opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800/50 border border-gold-500/20 rounded-full text-sm text-gold-500 mb-8">
              <Sparkles size={14} />
              Digital Identity & Innovation Hub
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Building the
            <span className="text-gold-500"> Future</span>
            <br />
            One Project at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10"
          >
            Full-stack developer crafting high-performance digital experiences.
            From concept to deployment — every line of code tells a story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="/projects" variant="primary">
              View Projects <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button href="/about" variant="outline">
              About Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border-2 border-neutral-700 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-gold-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <Section className="bg-navy-800/50">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">
                Featured Work
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Selected Projects</h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-300 transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
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

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-300 transition-colors"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* About Preview */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">About</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              More Than a Developer
            </h2>
            <p className="text-neutral-200 mb-6 leading-relaxed">
              I don&apos;t just write code — I architect digital experiences. With a passion for
              clean design and robust engineering, I transform complex problems into
              elegant solutions that perform at scale.
            </p>
            <p className="text-neutral-200 mb-8 leading-relaxed">
              Every project is an opportunity to push boundaries, challenge conventions,
              and deliver something that truly matters.
            </p>
            <Button href="/about" variant="outline">
              Read My Story <ArrowRight size={16} className="ml-2" />
            </Button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "10+", label: "Projects Delivered" },
                { number: "99%", label: "Client Satisfaction" },
                { number: "24/7", label: "Dedication" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-800 border border-neutral-700/20 rounded-lg p-6 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gold-500 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-neutral-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-navy-800/50">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Something
              <span className="text-gold-500"> Extraordinary</span>?
            </h2>
            <p className="text-neutral-200 mb-8">
              Let&apos;s turn your vision into reality. Whether it&apos;s a new project or an
              existing one that needs a fresh perspective — I&apos;m here to help.
            </p>
            <Button href="/contact" variant="primary">
              Start a Conversation <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
