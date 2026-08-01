"use client";

import React from "react";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/lib/types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

interface Step4Props {
  selectedTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Theme({ selectedTheme, onSelectTheme, onNext, onBack }: Step4Props) {
  const themeList = Object.values(THEMES);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Select Birthday Theme</h2>
        <p className="text-sm text-slate-400">Choose the atmosphere and visual style for your birthday surprise page.</p>
      </div>

      {/* Theme Cards Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {themeList.map((t) => {
          const isSelected = selectedTheme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? "bg-slate-900 border-pink-500 ring-2 ring-pink-500/50 shadow-2xl shadow-pink-500/20"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg z-10">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative">
                  <img src={t.previewImage} alt={t.name} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${t.bgGradient} opacity-60`} />
                </div>

                <div className="space-y-1.5 flex-1">
                  <Badge variant="pink" className={`text-[10px] ${t.badgeColor}`}>
                    {t.name}
                  </Badge>
                  <h3 className="text-lg font-bold text-white leading-snug">{t.subtitle}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 flex items-center justify-between gap-4">
        <Button variant="secondary" size="lg" type="button" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button variant="gradient" size="lg" type="button" onClick={onNext}>
          Next: Music & Effects
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
