"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Code } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

export default function ProjectCard({
  slug,
  title,
  description,
  techStack,
  image,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-navy-800 border border-neutral-700/20 rounded-lg overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/projects/nervax-platform.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gold-500 text-navy-900 rounded-full hover:bg-gold-300 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gold-500 text-navy-900 rounded-full hover:bg-gold-300 transition-colors"
              aria-label="GitHub repository"
            >
              <Code size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-neutral-50 mb-2">{title}</h3>
        <p className="text-sm text-neutral-200 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-navy-700 text-gold-500 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${slug}`}
          className="text-sm text-gold-500 hover:text-gold-300 transition-colors duration-200"
        >
          View Case Study →
        </Link>
      </div>
    </motion.article>
  );
}
