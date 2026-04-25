"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye, Reply, Clock, Briefcase, Handshake, Lightbulb, MoreHorizontal, LogOut } from "lucide-react";
import { updateMessageStatus } from "@/app/actions";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  status: string;
  created_at: string;
}

interface AdminClientProps {
  initialMessages: Message[];
}

const typeIcons: Record<string, typeof Briefcase> = {
  job: Briefcase,
  collab: Handshake,
  consult: Lightbulb,
  other: MoreHorizontal,
};

const statusColors: Record<string, string> = {
  new: "bg-gold-500/10 text-gold-500 border-gold-500/20",
  read: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  replied: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function AdminClient({ initialMessages }: AdminClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("nervax_admin_access");
    router.push("/admin/login");
  };

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((m) => m.status === filter);

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
  };

  const handleStatusUpdate = async (id: string, status: "new" | "read" | "replied") => {
    const result = await updateMessageStatus(id, status);
    if (result.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <section className="pt-32 pb-8 bg-linear-to-b from-navy-900 to-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">Dashboard</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Messages</h1>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800 border border-neutral-700/20 text-sm text-neutral-200 rounded hover:border-red-500/30 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section className="pt-8!">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-neutral-50" },
            { label: "New", value: stats.new, color: "text-gold-500" },
            { label: "Read", value: stats.read, color: "text-blue-400" },
            { label: "Replied", value: stats.replied, color: "text-green-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-navy-800 border border-neutral-700/20 rounded-lg p-4"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-neutral-200">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "new", "read", "replied"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                filter === f
                  ? "bg-gold-500 text-navy-900"
                  : "bg-navy-800 text-neutral-200 hover:bg-navy-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && stats[f as keyof typeof stats] > 0 && (
                <span className="ml-1.5">({stats[f as keyof typeof stats]})</span>
              )}
            </button>
          ))}
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-neutral-700">
                <Mail size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const TypeIcon = typeIcons[msg.type] || MoreHorizontal;
                return (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === "new") handleStatusUpdate(msg.id, "read");
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedMessage?.id === msg.id
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-neutral-700/20 bg-navy-800 hover:border-neutral-700/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TypeIcon size={14} className="text-gold-500" />
                        <span className="text-sm font-semibold text-neutral-50">
                          {msg.name}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          statusColors[msg.status] || ""
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 truncate mb-1">{msg.email}</p>
                    <p className="text-xs text-neutral-700 truncate">{msg.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-neutral-700">
                      <Clock size={10} />
                      {formatDate(msg.created_at)}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-navy-800 border border-neutral-700/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">{selectedMessage.name}</h2>
                    <p className="text-sm text-neutral-200">{selectedMessage.email}</p>
                    {selectedMessage.phone && (
                      <p className="text-sm text-gold-500 mt-1">📞 {selectedMessage.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedMessage.id, "read")}
                      className="p-2 bg-navy-700 rounded hover:bg-navy-600 transition-colors"
                      title="Mark as Read"
                    >
                      <Eye size={14} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedMessage.id, "replied")}
                      className="p-2 bg-navy-700 rounded hover:bg-navy-600 transition-colors"
                      title="Mark as Replied"
                    >
                      <Reply size={14} className="text-green-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${
                      statusColors[selectedMessage.status] || ""
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-navy-700 text-gold-500 rounded">
                    {selectedMessage.type}
                  </span>
                  <span className="text-xs text-neutral-700">
                    {formatDate(selectedMessage.created_at)}
                  </span>
                </div>

                <div className="p-4 bg-navy-900 rounded-lg">
                  <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your message on NervaX`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-navy-900 text-sm font-semibold rounded hover:bg-gold-300 transition-colors"
                  >
                    <Reply size={14} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-navy-800 border border-neutral-700/20 rounded-lg p-12 text-center">
                <Mail size={40} className="mx-auto mb-4 text-neutral-700" />
                <p className="text-neutral-200">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
