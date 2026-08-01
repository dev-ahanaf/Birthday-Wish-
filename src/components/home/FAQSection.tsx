"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Do recipients need an account or app to open the wish?",
    a: "No! The recipient simply taps the unique link you share with them on WhatsApp, Messenger, or any browser. It opens immediately on iOS, Android, or Desktop with full animations.",
  },
  {
    q: "How does background music autoplay work on mobile browsers?",
    a: "Modern mobile browsers require a user interaction to play audio. WishBloom gracefully presents a charming 'Tap to Open Your Surprise' button that instantly initiates music playback and the full countdown animation sequence.",
  },
  {
    q: "How many photos can I upload per birthday wish?",
    a: "You can upload up to 10 high-resolution photos per wish. WishBloom automatically compresses and optimizes the images right in your browser so pages load lightning-fast.",
  },
  {
    q: "Can I edit or delete my created birthday wish later?",
    a: "Yes! You can view all your created wishes on the Dashboard, copy shareable links, preview them, or delete them whenever you want.",
  },
  {
    q: "Is WishBloom completely free to use?",
    a: "Yes! WishBloom is 100% free with no hidden charges, payment paywalls, or intrusive video advertisements.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative bg-slate-950/90 overflow-hidden border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Got Questions?</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about creating and sharing WishBloom surprises.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-white hover:text-pink-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-pink-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/50"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
