"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Upload PDF",
    description: "Add your book file",
  },
  {
    number: 2,
    title: "AI Processing",
    description: "We analyze the content",
  },
  {
    number: 3,
    title: "Voice Chat",
    description: "Discuss with AI",
  },
];

export default function Hero() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-6 mt-4 mb-10 md:mb-16">
      <div className="max-w-7xl mx-auto">
        {/* Main beige card */}
        <div className="bg-[#F5E6D3] rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Section - Text & CTA */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Library
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Convert your books into interactive AI conversations.
                <br />
                Listen, learn, and discuss your favorite reads.
              </p>
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full px-6 py-5 text-base font-medium shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add new book
              </Button>
            </div>

            {/* Center Section - Illustration */}
            <div className="flex-1 flex justify-center">
              <Image
                src="/assets/hero-illustration.png"
                alt="Vintage books with globe and lamp"
                width={500}
                height={350}
                className="object-contain max-w-full h-auto"
                priority
              />
            </div>

            {/* Right Section - Steps Card */}
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {step.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
