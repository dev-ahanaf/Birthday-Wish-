"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart, Play, Music, Gift, ArrowRight, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function Hero() {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Gradients & Floating Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/15 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="pink" className="px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider mb-4 border-pink-500/40">
                <Sparkles className="w-4 h-4 mr-1.5 inline text-pink-400 animate-spin" />
                The #1 Animated Birthday Wish Creator
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Create a Birthday Surprise <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent">
                They Will Never Forget
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Craft full-screen animated birthday pages with personalized messages, music, photo slideshows, and interactive confetti in under 2 minutes. Share instantly via WhatsApp or social link.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/create" className="w-full sm:w-auto">
                <Button variant="gradient" size="xl" className="w-full sm:w-auto shadow-2xl shadow-pink-500/30">
                  <Gift className="w-6 h-6 mr-2" />
                  Create a Birthday Wish
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto border-slate-700/80">
                  <Play className="w-5 h-5 mr-2 text-pink-400 fill-pink-400" />
                  See How It Works
                </Button>
              </a>
            </motion.div>

            {/* Quick Proof Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-400 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Share</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Mockup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-rose-950/80 via-slate-900/90 to-purple-950/90 p-6 rounded-3xl border border-pink-500/30 backdrop-blur-2xl shadow-2xl shadow-pink-900/40 space-y-5 overflow-hidden group">
              
              {/* Card Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" /> Live Preview
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Music className="w-3.5 h-3.5 text-indigo-400" /> Audio Ready
                </span>
              </div>

              {/* Recipient Photo & Countdown Animation */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-[1.01] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                  alt="Birthday Person"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4 text-left">
                  <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">Special Surprise For</span>
                  <h3 className="text-2xl font-bold text-white tracking-wide">Sophia Martinez 🎉</h3>
                </div>

                {/* Floating Heart particles on preview */}
                <div className="absolute top-3 right-3 p-2 bg-pink-600/80 rounded-full text-white shadow-lg animate-bounce-gentle">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Wish Message Preview */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2">
                <p className="text-sm text-pink-100 font-serif italic leading-relaxed">
                  "May your birthday be filled with endless smiles, laughter, and magical moments! You mean the world to us."
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                  <span>With love from, <strong>Alex & Friends</strong></span>
                  <Share2 className="w-3.5 h-3.5 text-pink-400" />
                </div>
              </div>

              {/* Action Button Mock */}
              <div className="pt-1">
                <button
                  onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 hover:opacity-95 transition-opacity"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {isPlayingPreview ? "Pause Surprise Animation" : "Tap to Open Surprise"}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
