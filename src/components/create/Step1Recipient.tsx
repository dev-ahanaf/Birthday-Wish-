"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "@/lib/validators";
import { EventType } from "@/lib/types";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { ArrowRight, Cake, Heart, Gem, Trophy, Sparkles, Gift, Baby, Star } from "lucide-react";

interface Step1Props {
  initialData: Partial<Step1FormData>;
  onNext: (data: Step1FormData) => void;
}

const EVENT_CATEGORIES: { id: EventType; name: string; icon: React.ComponentType<{ className?: string }>; emoji: string }[] = [
  { id: "birthday", name: "Birthday", icon: Cake, emoji: "🎂" },
  { id: "wedding", name: "Wedding / Marriage", icon: Heart, emoji: "💍" },
  { id: "engagement", name: "Engagement", icon: Gem, emoji: "💎" },
  { id: "success", name: "Success / Graduation", icon: Trophy, emoji: "🎓" },
  { id: "anniversary", name: "Anniversary", icon: Sparkles, emoji: "🥂" },
  { id: "baby", name: "New Baby / Shower", icon: Baby, emoji: "👶" },
  { id: "appreciation", name: "Appreciation", icon: Star, emoji: "💖" },
  { id: "custom", name: "Custom Surprise", icon: Gift, emoji: "🎉" },
];

const RELATIONSHIP_OPTIONS = [
  { label: "Friend", value: "friend" },
  { label: "Partner / Spouse / Lover", value: "partner" },
  { label: "Sibling (Brother / Sister)", value: "sibling" },
  { label: "Parent (Mom / Dad)", value: "parent" },
  { label: "Colleague / Workmate", value: "colleague" },
  { label: "Family Relative", value: "family" },
  { label: "Other Special Person", value: "other" },
];

export function Step1Recipient({ initialData, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      event_type: initialData.event_type || "birthday",
      recipient_name: initialData.recipient_name || "",
      relationship: initialData.relationship || "friend",
      birthday_date: initialData.birthday_date || "",
    },
  });

  const selectedEventType = watch("event_type");

  const getDateLabel = () => {
    switch (selectedEventType) {
      case "wedding":
        return "Wedding Date (Optional)";
      case "engagement":
        return "Engagement Date (Optional)";
      case "success":
        return "Graduation / Event Date (Optional)";
      case "anniversary":
        return "Anniversary Date (Optional)";
      case "baby":
        return "Birth / Baby Shower Date (Optional)";
      default:
        return "Celebration Date (Optional)";
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Create a Celebration Wish</h2>
        <p className="text-sm text-slate-400">Select the event category and recipient details.</p>
      </div>

      {/* Event Category Grid */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">
          Select Event Category *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EVENT_CATEGORIES.map((cat) => {
            const isSelected = selectedEventType === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setValue("event_type", cat.id)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? "bg-pink-600/20 border-pink-500 text-white ring-2 ring-pink-500/40 shadow-lg shadow-pink-900/30"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-xs font-semibold truncate">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-5 pt-2">
        <Input
          label="Recipient's Name (or Couple's Names) *"
          placeholder={selectedEventType === "wedding" ? "e.g. Alex & Sophia" : "e.g. Sophia Martinez"}
          error={errors.recipient_name?.message}
          {...register("recipient_name")}
        />

        <Select
          label="Your Relationship with Recipient *"
          options={RELATIONSHIP_OPTIONS}
          error={errors.relationship?.message}
          {...register("relationship")}
        />

        <div>
          <Input
            label={getDateLabel()}
            type="date"
            helperText="Click anywhere on the box or calendar icon to choose a date."
            error={errors.birthday_date?.message}
            {...register("birthday_date")}
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-400 font-medium">Quick Date:</span>
            <button
              type="button"
              onClick={() => {
                const today = new Date().toISOString().split("T")[0];
                setValue("birthday_date", today);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-pink-300 hover:border-pink-500 transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
                setValue("birthday_date", tomorrow);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-pink-300 hover:border-pink-500 transition-colors"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setValue("birthday_date", "")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button variant="gradient" size="lg" type="submit" className="w-full sm:w-auto">
          Next: Personal Message
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </form>
  );
}
