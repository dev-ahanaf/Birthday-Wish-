"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "@/lib/validators";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { User, Calendar, Heart, ArrowRight } from "lucide-react";

interface Step1Props {
  initialData: Partial<Step1FormData>;
  onNext: (data: Step1FormData) => void;
}

const RELATIONSHIP_OPTIONS = [
  { label: "Friend", value: "friend" },
  { label: "Partner / Lover", value: "partner" },
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
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      recipient_name: initialData.recipient_name || "",
      relationship: initialData.relationship || "friend",
      birthday_date: initialData.birthday_date || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Who is this Birthday Wish for?</h2>
        <p className="text-sm text-slate-400">Tell us about the star of the celebration!</p>
      </div>

      <div className="space-y-5">
        <Input
          label="Recipient's Full Name *"
          placeholder="e.g. Sophia Martinez"
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
            label="Birthday Date (Optional)"
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
