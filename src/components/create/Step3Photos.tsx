"use client";

import React, { useState } from "react";
import { compressImage } from "@/lib/imageUtils";
import { Button } from "../ui/Button";
import { 
  UploadCloud, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";

interface Step3Props {
  initialPhotos: { url: string; order: number }[];
  onNext: (photos: { url: string; order: number }[]) => void;
  onBack: () => void;
}

const SAMPLE_MEMORIES = [
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80",
];

export function Step3Photos({ initialPhotos, onNext, onBack }: Step3Props) {
  const [photos, setPhotos] = useState<{ url: string; order: number }[]>(
    initialPhotos.length > 0 ? initialPhotos : []
  );
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 10) {
      alert("You can upload a maximum of 10 photos.");
      return;
    }

    setIsCompressing(true);
    try {
      const newPhotoPromises = Array.from(files).map(async (file) => {
        const compressedUrl = await compressImage(file);
        return compressedUrl;
      });

      const compressedUrls = await Promise.all(newPhotoPromises);
      const updated = [
        ...photos,
        ...compressedUrls.map((url, idx) => ({
          url,
          order: photos.length + idx,
        })),
      ];
      setPhotos(updated);
    } catch {
      alert("Failed to compress image. Please try another file.");
    } finally {
      setIsCompressing(false);
    }
  };

  const addSamplePhoto = (url: string) => {
    if (photos.length >= 10) return;
    setPhotos([...photos, { url, order: photos.length }]);
  };

  const removePhoto = (index: number) => {
    const filtered = photos.filter((_, idx) => idx !== index);
    setPhotos(filtered.map((p, idx) => ({ ...p, order: idx })));
  };

  const movePhoto = (index: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= photos.length) return;

    const copy = [...photos];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    setPhotos(copy.map((p, idx) => ({ ...p, order: idx })));
  };

  const handleNext = () => {
    onNext(photos);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Upload Birthday Memories</h2>
        <p className="text-sm text-slate-400">Add up to 10 photos to create an animated birthday slideshow (Compressed automatically).</p>
      </div>

      {/* Upload Drop Area */}
      <div className="relative border-2 border-dashed border-pink-500/30 hover:border-pink-500/60 rounded-3xl p-8 text-center bg-slate-900/60 backdrop-blur-xl transition-all">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          disabled={isCompressing || photos.length >= 10}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isCompressing ? "Compressing & Processing Images..." : "Click or Drag & Drop Photos Here"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, WEBP. Max 10 photos. ({photos.length}/10 uploaded)
            </p>
          </div>
        </div>
      </div>

      {/* Preset samples shortcut if user has no photos ready */}
      {photos.length === 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4" /> Don't have photos ready? Try sample celebration graphics:
          </div>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {SAMPLE_MEMORIES.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addSamplePhoto(url)}
                className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700 hover:border-pink-500 relative group"
              >
                <img src={url} alt={`Sample ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-pink-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                  + Add
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">Your Photo Slideshow Queue ({photos.length} items):</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {photos.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 group h-36"
              >
                <img src={item.url} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-pink-600 text-white rounded-full">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="p-1 rounded-lg bg-rose-600/80 text-white hover:bg-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reorder controls */}
                  <div className="flex justify-between gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => movePhoto(idx, "left")}
                      className="p-1 rounded bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === photos.length - 1}
                      onClick={() => movePhoto(idx, "right")}
                      className="p-1 rounded bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 flex items-center justify-between gap-4">
        <Button variant="secondary" size="lg" type="button" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button variant="gradient" size="lg" type="button" onClick={handleNext}>
          Next: Choose Theme
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
