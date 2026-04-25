"use client";

import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import SkillBar from "@/components/SkillBar";
import Button from "@/components/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 82 },
  { name: "Tailwind CSS", level: 95 },
  { name: "PostgreSQL / Supabase", level: 85 },
  { name: "Docker / DevOps", level: 78 },
  { name: "System Design", level: 88 },
];

const timeline = [
  {
    year: "2026",
    title: "Advanced System Architecture & AI Integration",
    description: "Focused on building intelligent platforms combining AI, automation, and scalable backend systems.",
  },
  {
    year: "2025",
    title: "Full-Stack & Product Development",
    description: "Built advanced digital products and platforms with strong focus on performance, UX, and real-world impact.",
  },
  {
    year: "2024",
    title: "Full-Stack Developer",
    description: "Started working on production-level applications and system design foundations.",
  },
  {
    year: "2023",
    title: "Frontend Developer",
    description: "Built modern interfaces using React and developed strong UI/UX fundamentals.",
  },
  {
    year: "2022",
    title: "The Foundation",
    description: "Started learning web development and built core understanding of programming and problem-solving.",
  },
  {
    year: "2021",
    title: "The Beginning",
    description: "Discovered programming and started the journey from zero knowledge to building real applications.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-linear-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1 w-full">
              <FadeIn>
                <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">About</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  My Story, Not My CV
                </h1>
                <div className="text-lg text-neutral-200 space-y-4">
                  <p>My name is Mohamed Elhetawy.</p>
                  <p>
                    I don&apos;t see myself as just a developer — I see myself as a system builder
                    who turns ideas into real, scalable digital products.
                  </p>
                  <p>
                    Every project I build is intentional. It&apos;s not about finishing tasks — it&apos;s
                    about solving real problems and creating systems that actually work in the real world.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="flex-1 order-1 lg:order-2 w-full max-w-sm lg:max-w-md mx-auto">
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-700/30 shadow-2xl ring-1 ring-white/10">
                  <Image 
                    src="/profile.jpg" 
                    alt="Mohamed Elhetawy" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Who I Am</h2>
            <div className="space-y-4 text-neutral-200 leading-relaxed mb-8">
              <p>
                I&apos;m a Full-Stack Developer focused on building complete digital systems that
                combine performance, design, and scalability.
              </p>
              <p>My approach is structured and engineering-driven:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-neutral-300">
                <li>Understand the problem deeply</li>
                <li>Design a clean system architecture</li>
                <li>Build with scalability in mind</li>
                <li>Optimize for performance and user experience</li>
              </ul>
              <p>I don&apos;t just build interfaces — I build products, platforms, and ecosystems.</p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">My Philosophy</h2>
            <div className="space-y-4 text-neutral-200 leading-relaxed">
              <p>If something is worth building, it should be built properly.</p>
              <ul className="space-y-1 ml-2 text-neutral-300">
                <li>• No temporary solutions</li>
                <li>• No unclear or messy code</li>
                <li>• No compromises on quality</li>
              </ul>
              <p>Every system I build must be: Scalable, Fast, Reliable, and Purpose-driven.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-navy-800 border border-neutral-700/20 rounded-lg p-8 h-full">
              <h3 className="text-lg font-bold text-gold-500 mb-6">What Drives Me</h3>
              <ul className="space-y-4">
                {[
                  "Turning complex ideas into simple, usable systems",
                  "Building AI + IoT powered real-world applications",
                  "Designing scalable architectures, not just UI screens",
                  "Pushing performance to the highest standard",
                  "Creating solutions that work beyond theory",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-200">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Skills */}
      <Section className="bg-navy-800/50">
        <FadeIn>
          <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills & Technologies</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {skills.slice(0, 4).map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={i * 0.1}
              />
            ))}
          </div>
          <div>
            {skills.slice(4).map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={(i + 4) * 0.1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <FadeIn>
          <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">My Timeline</h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-700/30" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold-500 rounded-full -translate-x-1.5 mt-1.5 z-10" />
                  
                  <div className={`flex-1 ml-12 md:ml-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm text-gold-500 font-mono">{item.year}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-200">{item.description}</p>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-navy-800/50">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Work
              <span className="text-gold-500"> Together</span>?
            </h2>
            <div className="text-neutral-200 mb-8 space-y-3">
              <p>I&apos;m always open to collaborating on:</p>
              <p className="font-medium text-white">Real-world digital products <span className="text-gold-500">•</span> Complex system development <span className="text-gold-500">•</span> Innovative AI-driven ideas</p>
              <p className="text-neutral-400 italic">If the idea is meaningful, I can turn it into a working system.</p>
            </div>
            <Button href="/contact" variant="primary">
              Get in Touch <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
