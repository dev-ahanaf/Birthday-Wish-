"use client";

import React, { useState } from "react";
import { 
  RotateCcw, 
  Share2, 
  Flag, 
  Copy, 
  Check, 
  X, 
  MessageCircle, 
  Facebook, 
  Mail 
} from "lucide-react";
import { Button } from "../ui/Button";

interface WishActionsProps {
  slug: string;
  recipientName: string;
  senderName: string;
  onReplay: () => void;
}

export function WishActions({ slug, recipientName, senderName, onReplay }: WishActionsProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [copied, setCopied] = useState(false);

  const getFullShareUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/wish/${slug}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 Check out this special animated birthday surprise for ${recipientName}! ${getFullShareUrl()}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(getFullShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(`🎉 Birthday Surprise for ${recipientName}`);
    const body = encodeURIComponent(
      `Hi ${recipientName},\n\nCheck out your birthday surprise:\n${getFullShareUrl()}\n\nWith love,\n${senderName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const submitReport = () => {
    setReported(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReported(false);
    }, 2000);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 pb-16 pt-6 flex flex-wrap items-center justify-center gap-4 relative z-30">
        <Button variant="gradient" size="lg" onClick={onReplay} className="shadow-xl">
          <RotateCcw className="w-5 h-5 mr-2" />
          Replay Animation
        </Button>

        <Button variant="secondary" size="lg" onClick={() => setShareModalOpen(true)}>
          <Share2 className="w-5 h-5 mr-2 text-pink-400" />
          Share Wish
        </Button>

        <button
          type="button"
          onClick={() => setReportModalOpen(true)}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1"
        >
          <Flag className="w-3.5 h-3.5" />
          Report Content
        </button>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-pink-400" /> Share This Birthday Surprise
            </h3>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={getFullShareUrl()}
                className="w-full bg-transparent text-xs font-mono text-pink-300 truncate focus:outline-none"
              />
              <Button size="sm" variant="gradient" onClick={handleCopy}>
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={shareWhatsApp} className="text-emerald-400 border-emerald-500/30">
                <MessageCircle className="w-4 h-4 mr-1 fill-current" /> WhatsApp
              </Button>
              <Button variant="secondary" size="sm" onClick={shareFacebook} className="text-blue-400 border-blue-500/30">
                <Facebook className="w-4 h-4 mr-1 fill-current" /> Facebook
              </Button>
              <Button variant="secondary" size="sm" onClick={shareEmail} className="text-purple-400 border-purple-500/30">
                <Mail className="w-4 h-4 mr-1" /> Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Report Content Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-500" /> Report Inappropriate Content
            </h3>

            {reported ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-sm text-center font-medium">
                Thank you. Your report has been submitted for administrative review.
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  If this birthday page contains objectionable material, offensive text, or copyright violations, please notify our moderation team.
                </p>
                <textarea
                  placeholder="Describe the issue..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                  rows={3}
                />
                <Button variant="danger" size="md" className="w-full" onClick={submitReport}>
                  Submit Moderation Report
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
