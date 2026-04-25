"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid password.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-navy-900 to-navy-800/50">
      <FadeIn>
        <div className="w-full max-w-sm mx-auto px-6">
          <div className="bg-navy-800 border border-neutral-700/20 rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gold-500/10 rounded-full">
                <Lock size={24} className="text-gold-500" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-center mb-2">Admin Access</h1>
            <p className="text-sm text-neutral-200 text-center mb-8">
              Enter your password to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-navy-900 border border-neutral-700/20 rounded text-neutral-50 text-sm placeholder:text-neutral-700 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-5 py-3 bg-gold-500 text-navy-900 text-sm font-semibold rounded hover:bg-gold-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Authenticating..." : "Enter Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
