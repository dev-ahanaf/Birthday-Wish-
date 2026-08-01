"use client";

import React from "react";
import { Check } from "lucide-react";

interface WizardStepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const STEP_LABELS = [
  "Recipient",
  "Message",
  "Photos",
  "Theme",
  "Music & FX",
  "Preview & Share",
];

export function WizardStepper({ currentStep, totalSteps, onStepClick }: WizardStepperProps) {
  return (
    <div className="w-full py-4 mb-8">
      {/* Mobile Stepper Text */}
      <div className="flex items-center justify-between sm:hidden mb-3">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold text-slate-200">
          {STEP_LABELS[currentStep - 1]}
        </span>
      </div>

      {/* Progress Bar (Mobile) */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden sm:hidden">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:flex items-center justify-between relative max-w-4xl mx-auto">
        {/* Connecting Track Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={label}
              onClick={() => isCompleted && onStepClick && onStepClick(stepNum)}
              className={`relative z-10 flex flex-col items-center group ${
                isCompleted ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-600/40"
                    : isCurrent
                    ? "bg-slate-900 border-2 border-pink-500 text-pink-400 shadow-lg shadow-pink-500/20 ring-4 ring-pink-500/20"
                    : "bg-slate-900 border-2 border-slate-700 text-slate-500"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
              </div>

              <span
                className={`mt-2 text-xs font-semibold tracking-wide transition-colors ${
                  isCurrent
                    ? "text-pink-300 font-bold"
                    : isCompleted
                    ? "text-slate-200"
                    : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
