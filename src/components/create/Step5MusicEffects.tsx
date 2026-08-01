"use client";

import React, { useState } from "react";
import { MUSIC_TRACKS, synthPlayer } from "@/lib/audio";
import { EffectType } from "@/lib/types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart, 
  Star, 
  Flame, 
  Flower2, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Square
} from "lucide-react";

interface Step5Props {
  musicTrack: string;
  musicEnabled: boolean;
  confettiEnabled: boolean;
  effects: EffectType[];
  onChangeMusicTrack: (track: string) => void;
  onChangeMusicEnabled: (enabled: boolean) => void;
  onChangeConfettiEnabled: (enabled: boolean) => void;
  onChangeEffects: (effects: EffectType[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const ALL_EFFECTS: { id: EffectType; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "confetti", name: "Confetti Burst", icon: Sparkles },
  { id: "balloons", name: "Floating Balloons", icon: Star },
  { id: "hearts", name: "Floating Hearts", icon: Heart },
  { id: "stars", name: "Night Stars", icon: Star },
  { id: "fireworks", name: "Fireworks Sparkle", icon: Flame },
  { id: "flowers", name: "Petal Blossoms", icon: Flower2 },
];

export function Step5MusicEffects({
  musicTrack,
  musicEnabled,
  confettiEnabled,
  effects,
  onChangeMusicTrack,
  onChangeMusicEnabled,
  onChangeConfettiEnabled,
  onChangeEffects,
  onNext,
  onBack,
}: Step5Props) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [audioElem, setAudioElem] = useState<HTMLAudioElement | null>(null);

  const toggleTrackAudioPreview = (trackId: string, url: string) => {
    if (playingTrackId === trackId) {
      if (audioElem) {
        audioElem.pause();
        setAudioElem(null);
      }
      synthPlayer.stop();
      setPlayingTrackId(null);
      return;
    }

    if (audioElem) audioElem.pause();
    synthPlayer.stop();

    if (url === "synth") {
      synthPlayer.start();
      setPlayingTrackId(trackId);
    } else if (url) {
      const audio = new Audio(url);
      audio.play().catch(() => {});
      setAudioElem(audio);
      setPlayingTrackId(trackId);
    } else {
      setPlayingTrackId(null);
    }
  };

  const toggleEffect = (effectId: EffectType) => {
    if (effects.includes(effectId)) {
      onChangeEffects(effects.filter((e) => e !== effectId));
    } else {
      onChangeEffects([...effects, effectId]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Music & Visual Effects</h2>
        <p className="text-sm text-slate-400">Choose background soundtracks and animated particle effects for the surprise.</p>
      </div>

      {/* Music Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-base font-bold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-pink-400" />
            Background Soundtrack
          </label>
          <button
            type="button"
            onClick={() => onChangeMusicEnabled(!musicEnabled)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              musicEnabled
                ? "bg-pink-600/20 text-pink-300 border-pink-500/40"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {musicEnabled ? "Audio Enabled" : "Audio Muted"}
          </button>
        </div>

        {musicEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MUSIC_TRACKS.map((t) => {
              const isSelected = musicTrack === t.id;
              const isPlaying = playingTrackId === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => onChangeMusicTrack(t.id)}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-pink-500 ring-2 ring-pink-500/30 text-white"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs text-pink-400 font-semibold">{t.category}</span>
                    <h4 className="text-sm font-bold truncate max-w-[200px]">{t.name}</h4>
                  </div>

                  {t.url && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTrackAudioPreview(t.id, t.url);
                      }}
                      className="p-2 rounded-full bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white transition-colors"
                    >
                      {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Animation Particles Toggles */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <label className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Active Visual Particle Effects
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ALL_EFFECTS.map((eff) => {
            const isActive = effects.includes(eff.id);
            const Icon = eff.icon;

            return (
              <button
                key={eff.id}
                type="button"
                onClick={() => toggleEffect(eff.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3 text-left ${
                  isActive
                    ? "bg-purple-950/60 border-purple-500 text-purple-200 shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/40"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">{eff.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between gap-4">
        <Button variant="secondary" size="lg" type="button" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button variant="gradient" size="lg" type="button" onClick={onNext}>
          Next: Preview & Publish
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
