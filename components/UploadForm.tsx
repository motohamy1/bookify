"use client";

import React, { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Image, X, FileText } from "lucide-react";
import { UploadSchema } from "@/lib/zod";
import { voiceOptions, voiceCategories, DEFAULT_VOICE } from "@/lib/constants";
import type { BookUploadFormValues } from "@/types";
import LoadingOverlay from "./LoadingOverlay";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [coverFileName, setCoverFileName] = useState<string | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors },
  } = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
    },
  });

  const selectedVoice = watch("voice");
  const pdfFile = watch("pdfFile");
  const coverImage = watch("coverImage");

  const onSubmit = async (data: BookUploadFormValues) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    // TODO: Implement actual submission logic
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handlePdfChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("pdfFile", file, { shouldValidate: true });
        setPdfFileName(file.name);
      }
    },
    [setValue],
  );

  const handleCoverChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("coverImage", file, { shouldValidate: true });
        setCoverFileName(file.name);
      }
    },
    [setValue],
  );

  const removePdf = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetField("pdfFile", { keepError: true });
    setPdfFileName(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
  };

  const removeCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetField("coverImage");
    setCoverFileName(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const progressItems = [
    { label: "Uploading PDF...", status: "completed" as const },
    { label: "Extracting text...", status: "in-progress" as const },
    { label: "Processing segments...", status: "pending" as const },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* PDF File Upload */}
        <div className="space-y-2">
          <label className="form-label">Book PDF File</label>
          <Controller
            name="pdfFile"
            control={control}
            render={({ field }) => (
              <div
                onClick={handlePdfClick}
                className={`upload-dropzone border-2 border-dashed ${
                  pdfFile
                    ? "upload-dropzone-uploaded border-[#8B7355]"
                    : "border-gray-300"
                }`}
              >
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
                {pdfFile && pdfFileName ? (
                  <div className="flex items-center gap-3 px-4">
                    <FileText className="w-8 h-8 text-[#663820]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#663820] font-medium truncate">
                        {pdfFileName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="upload-dropzone-remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">Click to upload PDF</p>
                    <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                  </>
                )}
              </div>
            )}
          />
          {errors.pdfFile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pdfFile.message}
            </p>
          )}
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="form-label">Cover Image (Optional)</label>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <div
                onClick={handleCoverClick}
                className={`upload-dropzone border-2 border-dashed ${
                  coverImage
                    ? "upload-dropzone-uploaded border-[#8B7355]"
                    : "border-gray-300"
                }`}
              >
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleCoverChange}
                  className="hidden"
                />
                {coverImage && coverFileName ? (
                  <div className="flex items-center gap-3 px-4">
                    <Image className="w-8 h-8 text-[#663820]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#663820] font-medium truncate">
                        {coverFileName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeCover}
                      className="upload-dropzone-remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Image className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">
                      Click to upload cover image
                    </p>
                    <p className="upload-dropzone-hint">
                      Leave empty to auto-generate from PDF
                    </p>
                  </>
                )}
              </div>
            )}
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="form-label">Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="ex: Rich Dad Poor Dad"
                className="form-input"
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author Input */}
        <div className="space-y-2">
          <label className="form-label">Author Name</label>
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="ex: Robert Kiyosaki"
                className="form-input"
              />
            )}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Voice Selector */}
        <div className="space-y-4">
          <label className="form-label">Choose Assistant Voice</label>

          {/* Male Voices */}
          <div>
            <p className="text-sm font-medium text-[#666] mb-3">Male Voices</p>
            <div className="grid grid-cols-3 gap-4">
              {voiceCategories.male.map((voiceKey) => {
                const voice =
                  voiceOptions[voiceKey as keyof typeof voiceOptions];
                const isSelected = selectedVoice === voiceKey;
                return (
                  <label
                    key={voiceKey}
                    className={`voice-selector-option cursor-pointer ${
                      isSelected
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    }`}
                  >
                    <input
                      type="radio"
                      value={voiceKey}
                      checked={isSelected}
                      onChange={() =>
                        setValue("voice", voiceKey, { shouldValidate: true })
                      }
                      className="sr-only"
                    />
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                          isSelected
                            ? "border-[#663820] bg-[#663820]"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#212a3b] text-sm">
                          {voice.name}
                        </p>
                        <p className="text-xs text-[#666] mt-1 leading-relaxed">
                          {voice.description}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Female Voices */}
          <div>
            <p className="text-sm font-medium text-[#666] mb-3">
              Female Voices
            </p>
            <div className="grid grid-cols-3 gap-4">
              {voiceCategories.female.map((voiceKey) => {
                const voice =
                  voiceOptions[voiceKey as keyof typeof voiceOptions];
                const isSelected = selectedVoice === voiceKey;
                return (
                  <label
                    key={voiceKey}
                    className={`voice-selector-option cursor-pointer ${
                      isSelected
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    }`}
                  >
                    <input
                      type="radio"
                      value={voiceKey}
                      checked={isSelected}
                      onChange={() =>
                        setValue("voice", voiceKey, { shouldValidate: true })
                      }
                      className="sr-only"
                    />
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                          isSelected
                            ? "border-[#663820] bg-[#663820]"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#212a3b] text-sm">
                          {voice.name}
                        </p>
                        <p className="text-xs text-[#666] mt-1 leading-relaxed">
                          {voice.description}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {errors.voice && (
            <p className="text-red-500 text-sm mt-1">{errors.voice.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-btn"
          style={{
            backgroundColor: "#663820",
            color: "white",
            fontFamily: "'IBM Plex Serif', serif",
          }}
        >
          {isSubmitting ? "Processing..." : "Begin Synthesis"}
        </button>
      </form>

      <LoadingOverlay
        isVisible={isSubmitting}
        title="Processing your book..."
        progressItems={progressItems}
      />
    </>
  );
};

export default UploadForm;
