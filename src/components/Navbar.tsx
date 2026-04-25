"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Let's Build" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Check if user unlocked the easter egg
    const hasAccess = localStorage.getItem("nervax_admin_access") === "true";
    queueMicrotask(() => setShowDashboard(hasAccess));
  }, []);

  // Add Dashboard link when easter egg is unlocked
  const navLinks = showDashboard
    ? [...baseNavLinks, { href: "/admin", label: "Dashboard" }]
    : baseNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-neutral-700/20">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.ico" alt="NervaX Logo" className="h-8 w-auto object-contain" />
          <span className="text-xl font-bold text-gold-500 tracking-tight hidden sm:block">
            Nerva<span className="text-neutral-50">X</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                link.href === "/admin"
                  ? "text-gold-500 hover:text-gold-300"
                  : "text-neutral-200 hover:text-gold-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm px-5 py-2 bg-gold-500 text-navy-900 font-semibold rounded hover:bg-gold-300 transition-colors duration-200"
          >
            Let&apos;s Talk
          </Link>
        </div>

        <button
          className="md:hidden text-neutral-200 hover:text-gold-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900/95 backdrop-blur-md border-b border-neutral-700/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors duration-200 py-2 ${
                    link.href === "/admin"
                      ? "text-gold-500 hover:text-gold-300"
                      : "text-neutral-200 hover:text-gold-500"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-sm px-5 py-2 bg-gold-500 text-navy-900 font-semibold rounded hover:bg-gold-300 transition-colors duration-200 text-center"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
