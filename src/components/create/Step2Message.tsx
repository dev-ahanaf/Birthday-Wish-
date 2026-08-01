"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2FormData } from "@/lib/validators";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight, MessageSquare, Sparkles } from "lucide-react";

interface Step2Props {
  initialData: Partial<Step2FormData>;
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
}

export function Step2Message({ initialData, onNext, onBack }: Step2Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      title: initialData.title || "Happy Birthday! 🎉",
      message:
        initialData.message ||
        "Wishing you a year ahead filled with warm smiles, unforgettable adventures, and endless joy! You inspire everyone around you.",
      sender_name: initialData.sender_name || "",
      quote: initialData.quote || "Age is merely the number of years the world has been enjoying you!",
    },
  });

  const messageText = watch("message") || "";

  const sampleMessages = [
    "Wishing you another year of great adventures, beautiful memories, and laughter!",
    "To the person who brings so much sunshine into my life—Happy Birthday!",
    "May your birthday be as wonderfully bright, kind, and amazing as you are!",
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Write Your Birthday Wishes</h2>
        <p className="text-sm text-slate-400">Personalize the header title, letter body, and your signature.</p>
      </div>

      <div className="space-y-5">
        <Input
          label="Wish Headline / Title *"
          placeholder="e.g. Happy Birthday, My Dearest Friend! 🎉"
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <Textarea
            label="Personal Birthday Message *"
            placeholder="Write an emotional or funny birthday message..."
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
              {sampleMessages.map((msg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValue("message", msg)}
                  className="text-xs bg-slate-900/90 border border-slate-700 hover:border-pink-500/50 p-2 rounded-xl text-slate-300 text-left transition-colors"
                >
                  "{msg.slice(0, 50)}..."
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
