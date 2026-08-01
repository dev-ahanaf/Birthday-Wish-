"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Quote } from "lucide-react";
import { Card } from "../ui/Card";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Created for Her Best Friend",
    comment: "My best friend literally cried when she opened the link on WhatsApp! The music starting right as her photos popped up was unforgettable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Created for His Wife",
    comment: "WishBloom made me look like an absolute creative genius. It took 3 minutes to set up the photos and Midnight Luxury theme. Worth every second!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Created for Her Mom",
    comment: "Sending a plain text message just didn't feel enough for mom's 60th birthday. The animated hearts and photo slideshow brought tears to her eyes.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Loved by Thousands</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by Surprise Creators Worldwide
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how WishBloom helps people deliver emotional birthday surprises across the globe.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card variant="glass" className="p-8 h-full flex flex-col justify-between relative hover:border-pink-500/30 transition-all duration-300">
                <Quote className="w-10 h-10 text-pink-500/20 absolute top-6 right-6 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-pink-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-pink-400/80">{t.role}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
