"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Sparkles, Heart, Star, Flame, Flower2, ArrowRight } from "lucide-react";

export function ThemeCards() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("romantic");
  const themeList = Object.values(THEMES);

  const getEffectIcon = (effect: string) => {
    switch (effect) {
      case "hearts":
        return <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />;
      case "stars":
        return <Star className="w-4 h-4 text-amber-400 fill-amber-400" />;
      case "confetti":
        return <Sparkles className="w-4 h-4 text-fuchsia-400" />;
      case "flowers":
        return <Flower2 className="w-4 h-4 text-pink-400" />;
      case "fireworks":
        return <Flame className="w-4 h-4 text-cyan-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-400" />;
    }
  };

  return (
    <section className="py-24 relative bg-slate-950/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Customizable Aesthetics</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore 5 Unique Themes
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Each theme includes custom typography, background gradients, card styles, and animations.
          </p>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {themeList.map((t) => {
            const isSelected = selectedTheme === t.id;
            return (
              <motion.div
                key={t.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedTheme(t.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 border-pink-500 shadow-xl shadow-pink-500/20 ring-2 ring-pink-500/40"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Theme Thumbnail */}
                  <div className="relative h-36 rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src={t.previewImage}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${t.bgGradient} opacity-60`} />
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md">
                      {getEffectIcon(t.defaultEffect)}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{t.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{t.subtitle}</p>
                </div>

                <div>
                  <Badge variant="pink" className={`text-[10px] w-full justify-center ${t.badgeColor}`}>
                    {t.defaultEffect.toUpperCase()} EFFECT
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Theme Detailed Banner */}
        <motion.div
          key={selectedTheme}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-12 p-8 rounded-3xl bg-gradient-to-r ${THEMES[selectedTheme].bgGradient} border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6`}
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs uppercase tracking-widest text-pink-300 font-bold">Active Selection</span>
              {getEffectIcon(THEMES[selectedTheme].defaultEffect)}
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
              {THEMES[selectedTheme].name}
            </h4>
            <p className="text-slate-200 text-sm max-w-xl">
              {THEMES[selectedTheme].description}
            </p>
          </div>

          <Link href={`/create?theme=${selectedTheme}`}>
            <Button variant="gradient" size="lg" className="shadow-lg whitespace-nowrap">
              Use {THEMES[selectedTheme].name} Theme
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
