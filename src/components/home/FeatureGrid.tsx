"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Palette, 
  Music, 
  Camera, 
  Share2, 
  Smartphone, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { Card } from "../ui/Card";

const features = [
  {
    icon: Palette,
    title: "5 Visual Themes",
    description: "Choose between Romantic Glow, Midnight Luxury, Colorful Party, Cute Pastel, or Minimal Dark modes.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Camera,
    title: "Photo Slideshow",
    description: "Upload up to 10 photos with automatic image compression and interactive reordering.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Music,
    title: "Background Music",
    description: "Select royalty-free birthday soundtracks or built-in synthesizer melodies that play on open.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Floating Particle Effects",
    description: "Toggle interactive confetti, floating balloons, glittering stars, hearts, fireworks, or flowers.",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: Share2,
    title: "Instant Social Sharing",
    description: "Generates a unique short link that formats perfectly with preview cards on WhatsApp, Messenger & Email.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    icon: Smartphone,
    title: "100% Mobile Optimized",
    description: "Flawless full-screen animated experience engineered to run smooth on any iOS or Android browser.",
    color: "from-fuchsia-500 to-pink-500",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-pink-400 font-bold">Everything You Need</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Packed with Features to Make <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Birthdays Truly Magical
            </span>
          </h3>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Designed to transform standard text wishes into unforgettable visual stories with zero technical hassle.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card variant="glass" className="p-8 h-full hover:border-pink-500/40 transition-all duration-300 group hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2.5 group-hover:text-pink-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
