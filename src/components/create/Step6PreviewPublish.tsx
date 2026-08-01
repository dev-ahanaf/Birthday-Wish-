"use client";

import React, { useState } from "react";
import { WishFormData, BirthdayWish } from "@/lib/types";
import { createWishInDatabase, encodeWishToUrl } from "@/lib/supabase/client";
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
  Heart,
  MessageCircle,
  Mail,
  Facebook
} from "lucide-react";
import Link from "next/link";

interface Step6Props {
  formData: WishFormData;
  onEditStep: (step: number) => void;
}

export function Step6PreviewPublish({ formData, onEditStep }: Step6Props) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedWish, setPublishedWish] = useState<BirthdayWish | null>(null);
  const [copied, setCopied] = useState(false);

  const themeConfig = THEMES[formData.theme] || THEMES.romantic;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const created = await createWishInDatabase(formData);
      setPublishedWish(created);
    } catch {
      alert("Failed to save wish. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const getFullShareUrl = () => {
    if (!publishedWish) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const encoded = encodeWishToUrl(publishedWish);
    return `${origin}/wish/${publishedWish.slug}${encoded ? `?d=${encoded}` : ""}`;
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
      {/* State A: Published Success Screen */}
      {publishedWish ? (
        <Card variant="glowing" className="p-8 text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center mx-auto shadow-xl">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <Badge variant="pink" className="px-3 py-1">SURPRISE READY TO SHARE</Badge>
            <h2 className="text-3xl font-extrabold text-white">Your Wish Page is Published!</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Send this link to <strong>{publishedWish.recipient_name}</strong>. They will see the animated full-screen reveal!
            </p>
          </div>

          {/* Share Link Input Box */}
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

          {/* Social Share Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={shareWhatsApp}
              className="bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 fill-current" />
              WhatsApp
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={shareFacebook}
              className="bg-blue-600/20 border-blue-500/40 text-blue-300 hover:bg-blue-600/30"
            >
              <Facebook className="w-4 h-4 mr-1.5 fill-current" />
              Facebook
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={shareEmail}
              className="bg-purple-600/20 border-purple-500/40 text-purple-300 hover:bg-purple-600/30"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              Email
            </Button>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/wish/${publishedWish.slug}`} target="_blank">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Wish Page Live
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* State B: Live Summary & Preview before Publishing */
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Preview Your Birthday Page</h2>
            <p className="text-sm text-slate-400">Review your settings before generating your unique share link.</p>
          </div>

          {/* Live Preview Screen Card */}
          <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${themeConfig.bgGradient} border border-white/20 shadow-2xl space-y-6 relative overflow-hidden`}>
            
            {/* Header info */}
            <div className="flex items-center justify-between">
              <Badge variant="pink" className="px-3 py-1">
                THEME: {themeConfig.name.toUpperCase()}
              </Badge>
              <span className="text-xs text-white/80 font-medium">
                Relationship: <strong className="capitalize">{formData.relationship}</strong>
              </span>
            </div>

            {/* Recipient Title */}
            <div className="space-y-1 text-center">
              <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">Special Surprise For</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{formData.recipient_name}</h3>
              {formData.birthday_date && (
                <p className="text-xs text-pink-200">Date: {formData.birthday_date}</p>
              )}
            </div>

            {/* Photo preview carousel strip */}
            {formData.photos.length > 0 && (
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
                {formData.photos.map((p, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-white/30 flex-shrink-0">
                    <img src={p.url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Wish Text Summary Box */}
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

            {/* Effects badges */}
            <div className="flex flex-wrap items-center gap-2 justify-center text-xs text-white/80">
              <span>Effects:</span>
              {formData.effects.map((eff) => (
                <span key={eff} className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 capitalize">
                  {eff}
                </span>
              ))}
              <span>Audio: {formData.music_enabled ? "Enabled" : "Muted"}</span>
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

          {/* Publish Trigger */}
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
              onClick={handlePublish}
              className="shadow-2xl shadow-pink-500/40"
            >
              <Send className="w-5 h-5 mr-2" />
              Publish & Get Share Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
