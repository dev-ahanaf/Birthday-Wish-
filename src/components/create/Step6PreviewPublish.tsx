"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WishFormData, BirthdayWish } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { uploadPhotoToSupabase } from "@/lib/supabase/storage";
import { generateSlug } from "@/lib/slug";
import { THEMES } from "@/lib/themes";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Edit, 
  Send, 
  ExternalLink, 
  ArrowLeft,
  MessageCircle,
  Mail,
  Facebook,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

interface Step6Props {
  formData: WishFormData;
  onEditStep: (step: number) => void;
}

export function Step6PreviewPublish({ formData, onEditStep }: Step6Props) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedWish, setPublishedWish] = useState<BirthdayWish | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const themeConfig = THEMES[formData.theme] || THEMES.romantic;

  const handlePublish = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    setPublishError(null);

    const supabase = createClient();
    const slug = generateSlug();

    console.log("[Verification Debug] Publishing Wish:", {
      supabaseConfigured: isSupabaseConfigured,
      generatedSlug: slug,
      recipient: formData.recipient_name,
    });

    try {
      // 1. Upload photos to Supabase Storage wish-photos bucket
      const uploadedPhotoUrls: string[] = [];
      if (formData.photos && formData.photos.length > 0) {
        for (let i = 0; i < formData.photos.length; i++) {
          const photo = formData.photos[i];
          try {
            const publicUrl = await uploadPhotoToSupabase(
              photo.file || photo.url,
              slug,
              i
            );
            uploadedPhotoUrls.push(publicUrl);
          } catch (uploadErr) {
            console.warn(`[Photo Upload Warning] Failed uploading photo #${i}:`, uploadErr);
            // Fall back to image URL if it's http/https
            if (photo.url && photo.url.startsWith("http")) {
              uploadedPhotoUrls.push(photo.url);
            }
          }
        }
      }

      // 2. Insert record into birthday_wishes table using .insert().select().single()
      const { data: savedWish, error } = await supabase
        .from("birthday_wishes")
        .insert({
          slug,
          event_type: formData.event_type,
          recipient_name: formData.recipient_name.trim(),
          sender_name: formData.sender_name.trim(),
          sign_off_phrase: formData.sign_off_phrase || "With All Our Love",
          title: formData.title ? formData.title.trim() : null,
          message: formData.message.trim(),
          quote: formData.quote ? formData.quote.trim() : null,
          relationship: formData.relationship,
          birthday_date: formData.birthday_date || null,
          theme: formData.theme,
          music_url: formData.music_track,
          effects: formData.effects,
          photo_urls: uploadedPhotoUrls,
          is_public: true,
        })
        .select()
        .single();

      console.log("[Verification Debug] Supabase Insert Result:", {
        success: !error,
        returnedSlug: savedWish?.slug,
        error: error ? error.message : null,
      });

      if (error || !savedWish) {
        const errorDetails = error ? `${error.message} (${error.code || "DB_ERROR"})` : "Failed to retrieve saved record";
        console.error("[Supabase Insert Error]:", error);
        setPublishError(`Database error: ${errorDetails}`);
        setIsPublishing(false);
        return;
      }

      // 3. Success: Clear temporary form draft
      if (typeof window !== "undefined") {
        localStorage.removeItem("wishbloom-draft");
      }

      setPublishedWish(savedWish as BirthdayWish);

      // 4. Redirect after confirmed database insert
      setTimeout(() => {
        router.push(`/wish/${savedWish.slug}`);
      }, 1200);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected network error occurred.";
      console.error("[Publish Exception]:", err);
      setPublishError(message);
      setIsPublishing(false);
    }
  };

  const getFullShareUrl = () => {
    if (!publishedWish) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/wish/${publishedWish.slug}`;
  };

  const handleCopyLink = () => {
    const url = getFullShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const url = getFullShareUrl();
    const text = encodeURIComponent(
      `🎉 I created a special animated birthday surprise for ${publishedWish?.recipient_name}! Open your surprise here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(getFullShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareEmail = () => {
    const url = getFullShareUrl();
    const subject = encodeURIComponent(`🎉 A Birthday Surprise for ${publishedWish?.recipient_name}!`);
    const body = encodeURIComponent(
      `Hi ${publishedWish?.recipient_name},\n\nSomeone special created an animated birthday wish page for you!\n\nOpen your surprise here:\n${url}\n\nWith love,\n${publishedWish?.sender_name}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className="space-y-8">
      {/* Published Success Screen */}
      {publishedWish ? (
        <Card variant="glowing" className="p-8 text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center mx-auto shadow-xl">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <Badge variant="pink" className="px-3 py-1">SAVED TO CLOUD DATABASE</Badge>
            <h2 className="text-3xl font-extrabold text-white">Your Wish Page is Published!</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Redirecting to <strong>/wish/{publishedWish.slug}</strong>...
            </p>
          </div>

          {/* Share Link Box */}
          <div className="max-w-xl mx-auto p-2 bg-slate-950 border border-pink-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-inner">
            <input
              type="text"
              readOnly
              value={getFullShareUrl()}
              className="w-full px-3 py-2 bg-transparent text-pink-300 text-xs sm:text-sm font-mono focus:outline-none truncate"
            />
            <Button
              variant="gradient"
              size="md"
              onClick={handleCopyLink}
              className="w-full sm:w-auto whitespace-nowrap rounded-xl"
            >
              {copied ? <Check className="w-4 h-4 mr-1 text-emerald-300" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied Link!" : "Copy Link"}
            </Button>
          </div>

          {/* Social Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={shareWhatsApp}
              className="bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 fill-current" /> WhatsApp
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={shareFacebook}
              className="bg-blue-600/20 border-blue-500/40 text-blue-300 hover:bg-blue-600/30"
            >
              <Facebook className="w-4 h-4 mr-1.5 fill-current" /> Facebook
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={shareEmail}
              className="bg-purple-600/20 border-purple-500/40 text-purple-300 hover:bg-purple-600/30"
            >
              <Mail className="w-4 h-4 mr-1.5" /> Email
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-center gap-4">
            <Link href={`/wish/${publishedWish.slug}`}>
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" /> View Wish Page Now
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* Summary & Publish Trigger */
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Preview Your Birthday Page</h2>
            <p className="text-sm text-slate-400">Review your settings before saving to the cloud database.</p>
          </div>

          {/* Config Status Banner */}
          {!isSupabaseConfigured && (
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
              <div>
                <strong>Supabase Environment Variables Missing:</strong> Please add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in Vercel project settings to insert wish records.
              </div>
            </div>
          )}

          {/* Database Error Banner */}
          {publishError && (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-200 text-sm flex items-center gap-3 animate-in shake">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <div>
                <strong>Publish Failed:</strong> {publishError}
              </div>
            </div>
          )}

          {/* Live Preview Card */}
          <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${themeConfig.bgGradient} border border-white/20 shadow-2xl space-y-6 relative overflow-hidden`}>
            <div className="flex items-center justify-between">
              <Badge variant="pink" className="px-3 py-1">
                THEME: {themeConfig.name.toUpperCase()}
              </Badge>
              <span className="text-xs text-white/80 font-medium">
                Relationship: <strong className="capitalize">{formData.relationship}</strong>
              </span>
            </div>

            <div className="space-y-1 text-center">
              <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">Special Surprise For</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{formData.recipient_name}</h3>
              {formData.birthday_date && (
                <p className="text-xs text-pink-200">Date: {formData.birthday_date}</p>
              )}
            </div>

            {formData.photos.length > 0 && (
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
                {formData.photos.map((p, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-white/30 flex-shrink-0">
                    <img src={p.url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div className="bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md space-y-3">
              <h4 className="text-lg font-bold text-white">{formData.title}</h4>
              <p className="text-sm text-slate-200 leading-relaxed font-serif italic">{formData.message}</p>
              {formData.quote && (
                <p className="text-xs text-pink-300 font-medium">"{formData.quote}"</p>
              )}
              <div className="text-right text-xs text-slate-300 pt-2 border-t border-white/10">
                — Sent with love by <strong>{formData.sender_name}</strong>
              </div>
            </div>
          </div>

          {/* Quick Edit Step Buttons */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Need to make changes?</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1"
              >
                <Edit className="w-3 h-3" /> Edit Recipient
              </button>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1"
              >
                <Edit className="w-3 h-3" /> Edit Message
              </button>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1"
              >
                <Edit className="w-3 h-3" /> Edit Photos
              </button>
            </div>
          </div>

          {/* Publish Button */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <Button variant="secondary" size="lg" type="button" onClick={() => onEditStep(5)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              variant="gradient"
              size="xl"
              type="button"
              isLoading={isPublishing}
              disabled={isPublishing}
              onClick={handlePublish}
              className="shadow-2xl shadow-pink-500/40"
            >
              <Send className="w-5 h-5 mr-2" />
              Publish to Database & Get Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
