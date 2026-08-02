"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/lib/types";

interface MessageCardProps {
  title: string;
  message: string;
  quote?: string;
  senderName: string;
  signOffPhrase?: string;
  themeId: ThemeId;
}

export function MessageCard({ title, message, quote, senderName, signOffPhrase, themeId }: MessageCardProps) {
  const theme = THEMES[themeId] || THEMES.romantic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-2xl mx-auto px-4 my-8"
    >
      <div className={`p-8 sm:p-10 rounded-3xl ${theme.cardStyle} border shadow-2xl relative overflow-hidden space-y-6 text-center sm:text-left`}>
        {/* Quote decoration icon */}
        <Quote className="w-16 h-16 text-pink-500/10 absolute top-4 right-4 pointer-events-none" />

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto sm:mx-0" />
        </div>

        <p className="text-base sm:text-lg leading-relaxed font-serif text-slate-100 whitespace-pre-line">
          {message}
        </p>

        {quote && (
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 italic text-sm text-pink-200">
            "{quote}"
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            {signOffPhrase || "With All Our Love"}
          </span>
          <div className="flex items-center gap-1.5 font-bold text-pink-300">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            <span>{senderName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
