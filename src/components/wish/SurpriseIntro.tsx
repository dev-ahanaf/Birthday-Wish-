"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Heart, Play } from "lucide-react";
import { Button } from "../ui/Button";

interface SurpriseIntroProps {
  recipientName: string;
  onStart: () => void;
}

export function SurpriseIntro({ recipientName, onStart }: SurpriseIntroProps) {
  const [stage, setStage] = useState<"ready" | "countdown">("ready");
  const [count, setCount] = useState<number>(3);

  const handleTap = () => {
    setStage("countdown");
    onStart(); // Triggers audio playback & canvas confetti

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCount(current);
      } else {
        clearInterval(interval);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute w-[600px] h-[600px] bg-pink-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />

      <AnimatePresence mode="wait">
        {stage === "ready" ? (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-slate-900/80 border border-pink-500/30 backdrop-blur-2xl rounded-3xl p-8 text-center space-y-6 shadow-2xl shadow-pink-900/40 relative z-10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 p-0.5 mx-auto shadow-xl shadow-pink-500/30 animate-bounce-gentle">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-pink-400">
                <Gift className="w-10 h-10 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                Special Birthday Delivery
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                A Surprise is Waiting for You!
              </h1>
              <p className="text-sm text-slate-300">
                Dear <strong className="text-pink-300">{recipientName}</strong>, turn up your volume and tap below to unlock your birthday experience.
              </p>
            </div>

            <Button
              variant="gradient"
              size="xl"
              onClick={handleTap}
              className="w-full py-4 text-lg shadow-2xl shadow-pink-500/40 rounded-2xl group"
            >
              <Play className="w-6 h-6 mr-2 fill-current group-hover:scale-110 transition-transform" />
              Tap to Start the Surprise
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-4 relative z-10"
          >
            <span className="text-sm uppercase tracking-widest text-pink-300 font-semibold">
              Get Ready, {recipientName}!
            </span>
            <div className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
              {count}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin" /> Unlocking magical surprise...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
