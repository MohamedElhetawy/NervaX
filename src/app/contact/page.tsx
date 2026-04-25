"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Clock, Briefcase, Handshake, Lightbulb, MoreHorizontal, Rocket, Phone } from "lucide-react";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

const messageTypes = [
  { value: "job" as const, label: "Job Opportunity", icon: Briefcase, description: "Hire me for a role or project" },
  { value: "collab" as const, label: "Collaboration", icon: Handshake, description: "Let's work on something together" },
  { value: "consult" as const, label: "Consulting", icon: Lightbulb, description: "Need technical advice or guidance" },
  { value: "other" as const, label: "Other", icon: MoreHorizontal, description: "Something else entirely" },
];

export default function ContactPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "job" as "job" | "collab" | "consult" | "other",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [otherClickCount, setOtherClickCount] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", message: "", type: "job" });
        setToast({ message: "Message sent successfully!", type: "success" });
      } else {
        setToast({ message: result.error || "Something went wrong.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-100 px-6 py-3 rounded-lg shadow-lg border ${
              toast.type === "success"
                ? "bg-navy-800 border-gold-500/30 text-gold-500"
                : "bg-navy-800 border-red-500/30 text-red-400"
            }`}
          >
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-linear-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800/50 border border-gold-500/20 rounded-full text-sm text-gold-500 mb-6">
              <Rocket size={14} />
              Let&apos;s Create
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Build
              <span className="text-gold-500"> Something</span>
            </h1>
            <p className="text-lg text-neutral-200 max-w-2xl">
              Not just a message — the start of something great. Whether you need a developer,
              a partner, or a fresh perspective, this is where it begins.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-2">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-6">Reach Out</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-800 border border-neutral-700/20 rounded-lg">
                    <Mail size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Email</h3>
                    <a href="mailto:medoalhetawy123@gmail.com" className="text-sm text-neutral-200 hover:text-gold-500 transition-colors">medoalhetawy123@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-800 border border-neutral-700/20 rounded-lg">
                    <Phone size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Phone</h3>
                    <a href="tel:+201020335023" className="text-sm text-neutral-200 hover:text-gold-500 transition-colors" dir="ltr">+20 102 033 5023</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-800 border border-neutral-700/20 rounded-lg">
                    <MapPin size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Location</h3>
                    <p className="text-sm text-neutral-200">Available Worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-800 border border-neutral-700/20 rounded-lg">
                    <Clock size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Response Time</h3>
                    <p className="text-sm text-neutral-200">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-navy-800 border border-neutral-700/20 rounded-lg">
                <h3 className="text-sm font-semibold text-gold-500 mb-3">
                  What We Can Build
                </h3>
                <ul className="space-y-2">
                  {[
                    "Full-Stack Web Applications",
                    "UI/UX Design & Implementation",
                    "Performance Optimization",
                    "Technical Architecture",
                    "API Design & Integration",
                    "DevOps & Infrastructure",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-200">
                      <div className="w-1 h-1 bg-gold-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.2}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-navy-800 border border-gold-500/20 rounded-lg p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <Rocket size={28} className="text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-neutral-200 mb-2">
                    Thank you for reaching out. I&apos;ll review your message and
                    get back to you within 24 hours.
                  </p>
                  <p className="text-sm text-neutral-700 mb-8">
                    Every message is read personally — no bots, no templates.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-gold-500 hover:text-gold-300 transition-colors"
                  >
                    Send Another Message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Message Type Selector */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      What brings you here?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {messageTypes.map((mt) => (
                        <button
                          key={mt.value}
                          type="button"
                          onClick={() => {
                            setFormState({ ...formState, type: mt.value });
                            if (mt.value === "other") {
                              const newCount = otherClickCount + 1;
                              setOtherClickCount(newCount);
                              if (newCount === 5) {
                                setOtherClickCount(0);
                                localStorage.setItem("nervax_admin_access", "true");
                                router.push("/admin/login");
                              }
                            } else {
                              setOtherClickCount(0);
                            }
                          }}
                          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                            formState.type === mt.value
                              ? "border-gold-500 bg-gold-500/5"
                              : "border-neutral-700/20 bg-navy-800 hover:border-neutral-700/40"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <mt.icon
                              size={16}
                              className={
                                formState.type === mt.value
                                  ? "text-gold-500"
                                  : "text-neutral-200"
                              }
                            />
                            <span
                              className={`text-sm font-semibold ${
                                formState.type === mt.value
                                  ? "text-gold-500"
                                  : "text-neutral-200"
                              }`}
                            >
                              {mt.label}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-700">{mt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-navy-800 border border-neutral-700/20 rounded text-neutral-50 text-sm placeholder:text-neutral-700 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-navy-800 border border-neutral-700/20 rounded text-neutral-50 text-sm placeholder:text-neutral-700 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-navy-800 border border-neutral-700/20 rounded text-neutral-50 text-sm placeholder:text-neutral-700 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      minLength={6}
                      maxLength={2000}
                      rows={6}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-navy-800 border border-neutral-700/20 rounded text-neutral-50 text-sm placeholder:text-neutral-700 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Tell me about your project, idea, or opportunity..."
                    />
                    <p className="text-xs text-neutral-700 mt-1">
                      {formState.message.length}/2000 characters
                    </p>
                  </div>

                  {/* Honeypot - hidden from users, bots will fill it */}
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Let&apos;s Build <Send size={14} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
