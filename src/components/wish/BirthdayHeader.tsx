"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Badge } from "../ui/Badge";

interface BirthdayHeaderProps {
  recipientName: string;
  relationship: string;
  birthdayDate?: string;
  themeId: string;
}

export function BirthdayHeader({ recipientName, relationship, birthdayDate }: BirthdayHeaderProps) {
  return (
    <div className="text-center space-y-4 pt-12 pb-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2"
      >
        <Badge variant="pink" className="px-4 py-1 text-xs uppercase tracking-widest border-pink-400/40">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-pink-300 animate-spin" />
          Happy Birthday Celebration
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
      >
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
          {recipientName}! 🎉
        </span>
      </motion.h1>

      {birthdayDate && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm font-medium text-pink-200/90 tracking-wide"
        >
          Special Day: {(() => {
            try {
              const d = new Date(birthdayDate + "T00:00:00");
              return isNaN(d.getTime()) ? birthdayDate : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            } catch {
              return birthdayDate;
            }
          })()}
        </motion.p>
      )}
    </div>
  );
}
