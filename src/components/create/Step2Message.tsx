"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2FormData } from "@/lib/validators";
import { EventType } from "@/lib/types";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Step2Props {
  eventType?: EventType;
  initialData: Partial<Step2FormData>;
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
}

const PRESET_MESSAGES: Record<string, { title: string; quote: string; messages: string[] }> = {
  birthday: {
    title: "Happy Birthday! 🎉",
    quote: "Age is merely the number of years the world has been enjoying you!",
    messages: [
      "Wishing you another year of great adventures, beautiful memories, and laughter!",
      "To the person who brings so much sunshine into my life—Happy Birthday!",
      "May your birthday be as wonderfully bright, kind, and amazing as you are!",
    ],
  },
  wedding: {
    title: "Congratulations on Your Wedding! 💍",
    quote: "True love stories never have endings.",
    messages: [
      "Wishing you both a lifetime of endless love, shared laughter, and joy together!",
      "May your marriage be blessed with deep harmony, passion, and boundless happiness!",
      "Congratulations to the perfect couple on your magical wedding day!",
    ],
  },
  engagement: {
    title: "Happy Engagement! 💎",
    quote: "Love is not about how many days you spend together, it's about how much love you share every day.",
    messages: [
      "So thrilled to celebrate your engagement! Wishing you a wonderful journey to the altar!",
      "Congratulations on finding your forever person! May your love grow stronger every day.",
      "Here's to a lifetime of love, laughter, and happily ever after!",
    ],
  },
  success: {
    title: "Congratulations on Your Success! 🎓🏆",
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    messages: [
      "So proud of your incredible achievement! Your hard work and dedication truly paid off.",
      "Congratulations on reaching this amazing milestone! Wishing you continuous victory!",
      "You dreamed big and worked hard. Here is to your well-deserved triumph!",
    ],
  },
  anniversary: {
    title: "Happy Anniversary! 🥂",
    quote: "In all the world, there is no heart for me like yours.",
    messages: [
      "Wishing you another wonderful year of loving, sharing, and growing together!",
      "Happy Anniversary to an inspiring couple! May your love shine brighter every year.",
    ],
  },
  baby: {
    title: "Welcome Precious Little One! 👶",
    quote: "A baby fills a place in your heart that you never knew was empty.",
    messages: [
      "Sending endless love to your growing family on the arrival of your sweet baby!",
      "Congratulations on your new bundle of joy! Wishing your family health and happiness.",
    ],
  },
  appreciation: {
    title: "With Heartfelt Thanks & Gratitude! 💖",
    quote: "Gratitude turns what we have into enough.",
    messages: [
      "Thank you for your kindness, support, and friendship. You mean so much to us!",
      "Sending sincere appreciation for everything you do. You are truly wonderful!",
    ],
  },
  custom: {
    title: "Warm Wishes & Congratulations! 🎉",
    quote: "Celebrate every beautiful moment in life.",
    messages: [
      "Sending you my warmest thoughts, joy, and heartfelt congratulations!",
      "May this special occasion bring you happiness, warm smiles, and sweet memories!",
    ],
  },
};

const SIGN_OFF_PRESETS = [
  "With All Our Love",
  "With Love",
  "Sending Warm Wishes",
  "Forever & Always",
  "With Heartfelt Gratitude",
  "Best Wishes",
];

export function Step2Message({ eventType = "birthday", initialData, onNext, onBack }: Step2Props) {
  const presets = PRESET_MESSAGES[eventType] || PRESET_MESSAGES.birthday;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      title: initialData.title || presets.title,
      message: initialData.message || presets.messages[0],
      sender_name: initialData.sender_name || "",
      sign_off_phrase: initialData.sign_off_phrase || "With All Our Love",
      quote: initialData.quote || presets.quote,
    },
  });

  const messageText = watch("message") || "";

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Write Your Personal Wishes</h2>
        <p className="text-sm text-slate-400">Customize the headline title, letter body, sign-off phrase, and signature.</p>
      </div>

      <div className="space-y-5">
        <Input
          label="Wish Headline / Title *"
          placeholder="e.g. Congratulations on Your Big Day! 🎉"
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <Textarea
            label="Personal Message *"
            placeholder="Write an emotional, joyful, or inspiring message..."
            maxLength={2000}
            currentLength={messageText.length}
            error={errors.message?.message}
            {...register("message")}
          />

          {/* Preset message chips */}
          <div className="mt-3 space-y-1.5">
            <span className="text-xs text-pink-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Need inspiration? Click to insert preset:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.messages.map((msg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValue("message", msg)}
                  className="text-xs bg-slate-900/90 border border-slate-700 hover:border-pink-500/50 p-2 rounded-xl text-slate-300 text-left transition-colors"
                >
                  "{msg.slice(0, 55)}..."
                </button>
              ))}
            </div>
          </div>
        </div>

        <Input
          label="Sender Name (From) *"
          placeholder="e.g. Alex & The Gang"
          error={errors.sender_name?.message}
          {...register("sender_name")}
        />

        <div>
          <Input
            label="Sign-off Line / Closing Phrase (Editable)"
            placeholder="e.g. With All Our Love, With Love, Best Wishes"
            error={errors.sign_off_phrase?.message}
            {...register("sign_off_phrase")}
          />
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">Quick Closing Presets:</span>
            {SIGN_OFF_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setValue("sign_off_phrase", preset)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-pink-300 hover:border-pink-500 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Favorite Quote or Short Wish (Optional)"
          placeholder="e.g. 'Shine like the stars today and always!'"
          error={errors.quote?.message}
          {...register("quote")}
        />
      </div>

      <div className="pt-6 flex items-center justify-between gap-4">
        <Button variant="secondary" size="lg" type="button" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button variant="gradient" size="lg" type="submit">
          Next: Add Photos
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </form>
  );
}
