"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BirthdayWish } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { THEMES } from "@/lib/themes";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  Sparkles, 
  Eye, 
  Gift, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  PlusCircle, 
  Calendar,
  AlertTriangle
} from "lucide-react";

export default function DashboardPage() {
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserWishes() {
      setLoading(true);
      setErrorMsg(null);
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("birthday_wishes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("[Dashboard Fetch Error]:", error);
          setErrorMsg(error.message);
        } else if (data) {
          const formatted: BirthdayWish[] = data.map((d) => ({
            id: d.id,
            slug: d.slug,
            recipient_name: d.recipient_name,
            sender_name: d.sender_name,
            title: d.title || "Happy Birthday! 🎉",
            message: d.message,
            quote: d.quote,
            relationship: d.relationship,
            birthday_date: d.birthday_date,
            theme: d.theme || "romantic",
            music_url: d.music_url,
            effects: d.effects || [],
            photo_urls: d.photo_urls || [],
            is_public: d.is_public ?? true,
            view_count: d.view_count || 0,
            created_at: d.created_at,
            updated_at: d.updated_at,
          }));
          setWishes(formatted);
        }
      } catch (err) {
        console.error("[Dashboard Exception]:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserWishes();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    const supabase = createClient();
    try {
      await supabase.from("birthday_wishes").delete().eq("slug", slug);
      setWishes((prev) => prev.filter((w) => w.slug !== slug));
    } catch (err) {
      alert("Failed to delete wish from database.");
    }
  };

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/wish/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const totalViews = wishes.reduce((sum, w) => sum + (w.view_count || 0), 0);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-[500px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Wish Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Manage published birthday surprises in Supabase database.</p>
          </div>
          <Link href="/create">
            <Button variant="gradient" size="lg" className="shadow-lg shadow-pink-500/20">
              <PlusCircle className="w-5 h-5 mr-1.5" />
              Create New Wish
            </Button>
          </Link>
        </div>

        {/* Database Status Banner */}
        {!isSupabaseConfigured && (
          <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <strong>Database Configuration Warning:</strong> Supabase environment variables are missing. Please add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to enable cloud persistence.
            </div>
          </div>
        )}

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card variant="glass" className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Wishes</span>
              <h3 className="text-2xl font-bold text-white">{wishes.length}</h3>
            </div>
          </Card>

          <Card variant="glass" className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Views</span>
              <h3 className="text-2xl font-bold text-white">{totalViews}</h3>
            </div>
          </Card>

          <Card variant="glass" className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Cloud Storage</span>
              <h3 className="text-2xl font-bold text-emerald-400">
                {isSupabaseConfigured ? "Connected" : "Disconnected"}
              </h3>
            </div>
          </Card>
        </div>

        {/* Wishes List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-pink-400" /> Database Wishes
          </h2>

          {loading ? (
            <div className="p-12 text-center text-slate-400 animate-pulse">Querying Supabase database...</div>
          ) : errorMsg ? (
            <Card variant="glass" className="p-8 text-center text-rose-300">
              Database error: {errorMsg}
            </Card>
          ) : wishes.length === 0 ? (
            <Card variant="glass" className="p-12 text-center space-y-4">
              <Gift className="w-12 h-12 text-pink-500/40 mx-auto" />
              <h3 className="text-xl font-bold text-white">No birthday wishes found in database</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Create a wish to publish your first surprise page to the cloud!
              </p>
              <Link href="/create">
                <Button variant="gradient" size="md">
                  Create First Wish
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishes.map((w) => {
                const theme = THEMES[w.theme] || THEMES.romantic;
                return (
                  <Card key={w.id} variant="glass" className="p-6 space-y-4 hover:border-pink-500/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="pink" className="mb-2 text-[10px]">
                          THEME: {theme.name.toUpperCase()}
                        </Badge>
                        <h3 className="text-xl font-bold text-white">{w.recipient_name}</h3>
                        <span className="text-xs text-slate-400">
                          Relationship: <strong className="capitalize">{w.relationship || "friend"}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        <span>{w.view_count || 0} views</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 font-serif italic">
                      "{w.message}"
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(w.created_at).toLocaleDateString()}
                      </span>
                      <span>From: <strong>{w.sender_name}</strong></span>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      <Link href={`/wish/${w.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> Open Wish
                        </Button>
                      </Link>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopyLink(w.slug)}
                      >
                        {copiedSlug === w.slug ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedSlug === w.slug ? "Copied" : "Copy Link"}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(w.slug)}
                        className="text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
