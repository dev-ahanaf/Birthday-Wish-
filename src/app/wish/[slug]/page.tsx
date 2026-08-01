"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BirthdayWish } from "@/lib/types";
import { fetchWishBySlug, incrementWishViews } from "@/lib/supabase/client";
import { SurpriseIntro } from "@/components/wish/SurpriseIntro";
import { ThemeContainer } from "@/components/wish/ThemeContainer";
import { BirthdayHeader } from "@/components/wish/BirthdayHeader";
import { MessageCard } from "@/components/wish/MessageCard";
import { PhotoSlideshow } from "@/components/wish/PhotoSlideshow";
import { AudioPlayer } from "@/components/wish/AudioPlayer";
import { FloatingEffects } from "@/components/wish/FloatingEffects";
import { WishActions } from "@/components/wish/WishActions";
import { Sparkles } from "lucide-react";

function WishContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const encodedParam = searchParams.get("d") || undefined;

  const [wish, setWish] = useState<BirthdayWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadWish() {
      setLoading(true);
      const data = await fetchWishBySlug(slug, encodedParam);
      if (!data) {
        router.push("/not-found");
        return;
      }
      setWish(data);
      setLoading(false);
      incrementWishViews(slug).catch(() => {});
    }

    loadWish();
  }, [slug, encodedParam, router]);

  const handleStartSurprise = () => {
    setHasStarted(true);
    setTriggerConfetti(true);
  };

  const handleReplay = () => {
    setHasStarted(false);
    setTriggerConfetti(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
        <p className="text-pink-300 font-semibold text-sm animate-pulse flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-400" /> Loading magical birthday surprise...
        </p>
      </div>
    );
  }

  if (!wish) return null;

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
        {/* Floating Particle Effects */}
        <FloatingEffects
          effects={wish.effects || ["confetti", "balloons"]}
          confettiEnabled={wish.confetti_enabled}
          triggerPop={triggerConfetti}
        />

        {/* Ambient Music Player */}
        <AudioPlayer
          trackId={wish.music_track || "synth-celebration"}
          enabled={wish.music_enabled}
          autoStartTriggered={hasStarted}
        />

        {/* Wish Main Content */}
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          <BirthdayHeader
            recipientName={wish.recipient_name}
            relationship={wish.relationship}
            birthdayDate={wish.birthday_date}
            themeId={wish.theme}
          />

          <MessageCard
            title={wish.title}
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

export default function WishPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <WishContent />
    </Suspense>
  );
}

