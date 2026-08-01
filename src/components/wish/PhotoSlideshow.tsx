"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WishPhoto } from "@/lib/types";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";

interface PhotoSlideshowProps {
  photos: WishPhoto[];
}

export function PhotoSlideshow({ photos }: PhotoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, photos.length]);

  if (!photos || photos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 my-10 space-y-4">
      {/* Main Slideshow Frame */}
      <div className="relative h-[350px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto.image_url}
            src={currentPhoto.image_url}
            alt={`Birthday Memory ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/60 text-xs font-semibold text-white backdrop-blur-md">
              {currentIndex + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setFullscreenImage(currentPhoto.image_url)}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-pink-600 backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-pink-600 backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails strip */}
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
          {photos.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                idx === currentIndex
                  ? "border-pink-500 ring-2 ring-pink-500/40 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={p.image_url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen Memory"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
