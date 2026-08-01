"use client";

import React, { useState, useEffect } from "react";
import { MUSIC_TRACKS, synthPlayer } from "@/lib/audio";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";

interface AudioPlayerProps {
  trackId: string;
  enabled: boolean;
  autoStartTriggered: boolean;
}

export function AudioPlayer({ trackId, enabled, autoStartTriggered }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElem, setAudioElem] = useState<HTMLAudioElement | null>(null);

  const track = MUSIC_TRACKS.find((t) => t.id === trackId) || MUSIC_TRACKS[0];

  useEffect(() => {
    if (!enabled || !autoStartTriggered || !track.url) return;

    if (track.url === "synth") {
      synthPlayer.start();
      setIsPlaying(true);
    } else {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      setAudioElem(audio);
    }

    return () => {
      synthPlayer.stop();
      if (audioElem) audioElem.pause();
    };
  }, [autoStartTriggered, enabled, track.id]);

  const togglePlay = () => {
    if (track.url === "synth") {
      if (isPlaying) {
        synthPlayer.stop();
        setIsPlaying(false);
      } else {
        synthPlayer.start();
        setIsPlaying(true);
      }
    } else if (audioElem) {
      if (isPlaying) {
        audioElem.pause();
        setIsPlaying(false);
      } else {
        audioElem.play();
        setIsPlaying(true);
      }
    }
  };

  if (!enabled || !track.url) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="bg-slate-950/80 border border-pink-500/30 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 text-white text-xs">
        <button
          type="button"
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center shadow-lg transition-transform active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <div className="hidden sm:flex flex-col pr-2">
          <span className="font-semibold text-pink-300 truncate max-w-[140px]">{track.name}</span>
          <span className="text-[10px] text-slate-400">Background Audio</span>
        </div>

        {isPlaying ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
      </div>
    </div>
  );
}
