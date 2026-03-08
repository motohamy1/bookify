"use client";

import React from "react";
import { voiceOptions, voiceCategories, DEFAULT_VOICE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { User, Volume2 } from "lucide-react";

interface VoiceSelectorProps {
  value?: string;
  onChange: (voiceId: string) => void;
  disabled?: boolean;
  className?: string;
}

const VoiceSelector = ({
  value = DEFAULT_VOICE,
  onChange,
  disabled = false,
  className,
}: VoiceSelectorProps) => {
  const maleVoices = voiceCategories.male.map(
    (key) => voiceOptions[key as keyof typeof voiceOptions],
  );
  const femaleVoices = voiceCategories.female.map(
    (key) => voiceOptions[key as keyof typeof voiceOptions],
  );

  const renderVoiceGroup = (voices: typeof maleVoices, label: string) => (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {voices.map((voice) => {
          const isSelected = value === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(voice.id)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left",
                isSelected
                  ? "border-[#212a3b] bg-[#212a3b]/5"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-full",
                  isSelected ? "bg-[#212a3b]" : "bg-gray-200",
                )}
              >
                {isSelected ? (
                  <Volume2 className="w-3 h-3 text-white" />
                ) : (
                  <User className="w-3 h-3 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isSelected ? "text-[#212a3b]" : "text-gray-900",
                  )}
                >
                  {voice.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {voice.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {renderVoiceGroup(maleVoices, "Male Voices")}
      {renderVoiceGroup(femaleVoices, "Female Voices")}
    </div>
  );
};

export default VoiceSelector;
