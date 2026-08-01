"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, MessageSquareHeart, Palette, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

const steps = [
  {
    step: "01",
    title: "Enter Recipient Details",
    description: "Specify recipient's name, relationship (friend, partner, parent, colleague), and optional birthday date.",
    icon: UserCheck,
    color: "from-pink-500 to-rose-500",
  },
  {
    step: "02",
    title: "Personalize Message & Photos",
    description: "Write your custom message, title, and upload up to 10 favorite memory photos.",
    icon: MessageSquareHeart,
    color: "from-purple-500 to-indigo-500",
  },
  {
    step: "03",
    title: "Pick Theme & Background Audio",
    description: "Select from 5 artistic themes, background music, and floating particle effects.",
    icon: Palette,
    color: "from-amber-400 to-rose-500",
  },
  {
    step: "04",
    title: "Publish & Share Link",
    description: "Get a unique shareable link to send via WhatsApp, Messenger, Email, or SMS.",
    icon: Send,
    color: "from-cyan-400 to-blue-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Easy 4-Step Process</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How WishBloom Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Create and send a beautiful, emotional birthday animation in less than two minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-pink-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group">
                  
                  {/* Step Number Backdrop */}
                  <span className="absolute top-3 right-4 text-6xl font-black text-slate-800/40 select-none group-hover:text-pink-500/10 transition-colors">
                    {item.step}
                  </span>

                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center shadow-lg mb-6 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center text-xs font-semibold text-pink-400">
                    <span>Step {item.step}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/create">
            <Button variant="gradient" size="lg" className="shadow-xl shadow-pink-500/25">
              Start Creating Your Wish Now
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
