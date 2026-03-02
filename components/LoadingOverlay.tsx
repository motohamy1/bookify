"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  progressItems?: {
    label: string;
    status: "pending" | "in-progress" | "completed";
  }[];
}

const LoadingOverlay = ({
  isVisible,
  title = "Processing your book...",
  progressItems = [],
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
          <h3 className="loading-title">{title}</h3>
          {progressItems.length > 0 && (
            <div className="loading-progress">
              {progressItems.map((item, index) => (
                <div key={index} className="loading-progress-item">
                  {item.status === "completed" && (
                    <span className="loading-progress-status" />
                  )}
                  {item.status === "in-progress" && (
                    <span className="loading-progress-status animate-pulse" />
                  )}
                  {item.status === "pending" && (
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                  <span className="text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
