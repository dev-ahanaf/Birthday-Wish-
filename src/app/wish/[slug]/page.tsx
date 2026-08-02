"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BirthdayWish } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SurpriseIntro } from "@/components/wish/SurpriseIntro";
import { ThemeContainer } from "@/components/wish/ThemeContainer";
import { BirthdayHeader } from "@/components/wish/BirthdayHeader";
import { MessageCard } from "@/components/wish/MessageCard";
import { PhotoSlideshow } from "@/components/wish/PhotoSlideshow";
import { AudioPlayer } from "@/components/wish/AudioPlayer";
import { FloatingEffects } from "@/components/wish/FloatingEffects";
import { WishActions } from "@/components/wish/WishActions";
import { Sparkles, AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function WishPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [wish, setWish] = useState<BirthdayWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadWishFromDatabase() {
      setLoading(true);
      setDbError(null);

      const supabase = createClient();

      console.log("[Verification Debug] Fetching Wish by Slug:", {
        slugRequested: slug,
        supabaseConfigured: isSupabaseConfigured,
      });

      try {
        const { data, error } = await supabase
          .from("birthday_wishes")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        console.log("[Verification Debug] Fetch Result:", {
          slugRequested: slug,
          found: Boolean(data),
          error: error ? error.message : null,
          data,
        });

        if (error) {
          console.error("[Database Query Error]:", error);
          setDbError(`${error.message} (${error.code || "DB_FETCH_ERROR"})`);
          setWish(null);
        } else if (data) {
          // Normalize photo_urls array into WishPhoto array
          const rawPhotoUrls = (data.photo_urls as string[]) || [];
          const normalizedPhotos = rawPhotoUrls.map((url, idx) => ({
            id: `photo_${idx}`,
            image_url: url,
            display_order: idx,
          }));

          const normalizedWish: BirthdayWish = {
            id: data.id,
            slug: data.slug,
            recipient_name: data.recipient_name,
            sender_name: data.sender_name,
            title: data.title || "Happy Birthday! 🎉",
            message: data.message,
            quote: data.quote,
            relationship: data.relationship,
            birthday_date: data.birthday_date,
            theme: data.theme || "romantic",
            music_url: data.music_url || "synth-celebration",
            effects: data.effects || ["confetti", "balloons"],
            photo_urls: rawPhotoUrls,
            photos: normalizedPhotos,
            is_public: data.is_public ?? true,
            view_count: data.view_count || 0,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };

          setWish(normalizedWish);

          // Increment view count asynchronously
          try {
            await supabase
              .from("birthday_wishes")
              .update({ view_count: (data.view_count || 0) + 1 })
              .eq("slug", slug);
          } catch {
            // Ignore view count increment errors
          }
        } else {
          // Genuinely missing record
          setWish(null);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Network error fetching wish data.";
        console.error("[Fetch Exception]:", err);
        setDbError(message);
        setWish(null);
      } finally {
        setLoading(false);
      }
    }

    loadWishFromDatabase();
  }, [slug]);

  const handleStartSurprise = () => {
    setHasStarted(true);
    setTriggerConfetti(true);
  };

  const handleReplay = () => {
    setHasStarted(false);
    setTriggerConfetti(false);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
        <p className="text-pink-300 font-semibold text-sm animate-pulse flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-400" /> Fetching birthday surprise from cloud...
        </p>
      </div>
    );
  }

  // 2. Database/Network Connection Error
  if (dbError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-rose-500/40 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Database Connection Error</h1>
            <p className="text-xs text-rose-300">{dbError}</p>
            <p className="text-xs text-slate-400 mt-2">
              Please ensure your Supabase environment variables <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> are configured in your deployment settings.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // 3. Genuinely Missing Record (404)
  if (!wish) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">404 - LINK NOT FOUND</span>
            <h1 className="text-3xl font-extrabold text-white">Birthday Wish Link Not Found</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This birthday surprise link doesn't exist, was deleted, or was entered incorrectly.
            </p>
          </div>
          <Link
            href="/create"
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30"
          >
            Create a New Birthday Wish
          </Link>
        </div>
      </div>
    );
  }

  // 4. Valid Wish Record Render
  return (
    <>
      {/* Intro Overlay Trigger ("Tap to Open") */}
      {!hasStarted && (
        <SurpriseIntro
          recipientName={wish.recipient_name}
          onStart={handleStartSurprise}
        />
      )}

      {/* Main Full-Screen Birthday Experience */}
      <ThemeContainer themeId={wish.theme}>
        <FloatingEffects
          effects={wish.effects || ["confetti", "balloons"]}
          confettiEnabled={true}
          triggerPop={triggerConfetti}
        />

        <AudioPlayer
          trackId={wish.music_url || "synth-celebration"}
          enabled={true}
          autoStartTriggered={hasStarted}
        />

        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          <BirthdayHeader
            recipientName={wish.recipient_name}
            relationship={wish.relationship || "friend"}
            birthdayDate={wish.birthday_date}
            themeId={wish.theme}
          />

          <MessageCard
            title={wish.title || "Happy Birthday! 🎉"}
            message={wish.message}
            quote={wish.quote}
            senderName={wish.sender_name}
            themeId={wish.theme}
          />

          {wish.photos && wish.photos.length > 0 && (
            <PhotoSlideshow photos={wish.photos} />
          )}

          <WishActions
            slug={wish.slug}
            recipientName={wish.recipient_name}
            senderName={wish.sender_name}
            onReplay={handleReplay}
          />
        </div>
      </ThemeContainer>
    </>
  );
}
