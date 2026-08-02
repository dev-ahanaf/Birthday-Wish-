"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WishFormData, ThemeId } from "@/lib/types";
import { WizardStepper } from "@/components/create/WizardStepper";
import { Step1Recipient } from "@/components/create/Step1Recipient";
import { Step2Message } from "@/components/create/Step2Message";
import { Step3Photos } from "@/components/create/Step3Photos";
import { Step4Theme } from "@/components/create/Step4Theme";
import { Step5MusicEffects } from "@/components/create/Step5MusicEffects";
import { Step6PreviewPublish } from "@/components/create/Step6PreviewPublish";
import { Card } from "@/components/ui/Card";

function CreateWishForm() {
  const searchParams = useSearchParams();
  const initialThemeQuery = (searchParams.get("theme") as ThemeId) || "romantic";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WishFormData>({
    event_type: "birthday",
    recipient_name: "",
    relationship: "friend",
    birthday_date: "",
    title: "Happy Birthday! 🎉",
    message: "Wishing you a year ahead filled with warm smiles, unforgettable adventures, and endless joy!",
    quote: "Age is merely the number of years the world has been enjoying you!",
    sender_name: "",
    sign_off_phrase: "With All Our Love",
    theme: initialThemeQuery,
    music_track: "synth-celebration",
    music_enabled: true,
    confetti_enabled: true,
    effects: ["confetti", "balloons"],
    photos: [],
  });

  useEffect(() => {
    if (initialThemeQuery) {
      setFormData((prev) => ({ ...prev, theme: initialThemeQuery }));
    }
  }, [initialThemeQuery]);

  const updateFormData = (fields: Partial<WishFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <Card variant="glass" className="p-6 sm:p-10 border-pink-500/20 shadow-2xl">
      <WizardStepper
        currentStep={currentStep}
        totalSteps={6}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {currentStep === 1 && (
        <Step1Recipient
          initialData={{
            event_type: formData.event_type,
            recipient_name: formData.recipient_name,
            relationship: formData.relationship,
            birthday_date: formData.birthday_date,
          }}
          onNext={(data) => {
            updateFormData(data);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <Step2Message
          eventType={formData.event_type}
          initialData={{
            title: formData.title,
            message: formData.message,
            sender_name: formData.sender_name,
            sign_off_phrase: formData.sign_off_phrase,
            quote: formData.quote,
          }}
          onNext={(data) => {
            updateFormData(data);
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3Photos
          initialPhotos={formData.photos}
          onNext={(photos) => {
            updateFormData({ photos });
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <Step4Theme
          selectedTheme={formData.theme}
          onSelectTheme={(theme) => updateFormData({ theme })}
          onNext={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 5 && (
        <Step5MusicEffects
          musicTrack={formData.music_track}
          musicEnabled={formData.music_enabled}
          confettiEnabled={formData.confetti_enabled}
          effects={formData.effects}
          onChangeMusicTrack={(music_track) => updateFormData({ music_track })}
          onChangeMusicEnabled={(music_enabled) => updateFormData({ music_enabled })}
          onChangeConfettiEnabled={(confetti_enabled) => updateFormData({ confetti_enabled })}
          onChangeEffects={(effects) => updateFormData({ effects })}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 6 && (
        <Step6PreviewPublish
          formData={formData}
          onEditStep={(step) => setCurrentStep(step)}
        />
      )}
    </Card>
  );
}

export default function CreateWishPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <Suspense fallback={<div className="p-12 text-center text-pink-300">Loading Wizard...</div>}>
          <CreateWishForm />
        </Suspense>
      </div>
    </div>
  );
}

