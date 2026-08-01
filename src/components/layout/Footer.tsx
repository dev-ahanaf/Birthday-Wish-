import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Gift, ShieldCheck, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">WishBloom</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create emotional, animated, and personalized birthday wish pages that bring joy, tears, and unforgettable smiles.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-pink-400 transition-colors">
                  Create a Wish
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-pink-400 transition-colors">
                  Wish Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Themes & Effects</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-pink-400" /> Romantic Glow
              </li>
              <li className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-amber-400" /> Midnight Luxury
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" /> Colorful Party
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-cyan-400" /> Instant Share Links
              </li>
            </ul>
          </div>

          {/* Privacy & Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Security & Info</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All birthday pages are protected, mobile-optimized, and free of intrusive ads.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Safe & Secure Instant Links</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WishBloom. Crafted with love for special celebrations.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5 animate-pulse" />
            <span>for unforgettable birthday surprises</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
