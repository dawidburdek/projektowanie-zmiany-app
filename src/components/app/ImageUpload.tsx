"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  name: string;
  className?: string;
}

export function ImageUpload({ name, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function handleClear() {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        id={`image-upload-${name}`}
      />
      {preview ? (
        <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-border">
          <Image src={preview} alt="Podgląd" fill className="object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-bg-primary rounded-sm p-1 hover:bg-bg-secondary border border-border"
          >
            <X size={14} className="text-text-secondary" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`image-upload-${name}`}
          className={cn(
            "flex flex-col items-center justify-center gap-2 w-full h-32",
            "border border-dashed border-border rounded-sm cursor-pointer",
            "hover:border-border-hover hover:bg-bg-secondary transition-colors duration-150"
          )}
        >
          <ImagePlus size={20} className="text-text-muted" />
          <span className="text-caption text-text-muted">Kliknij aby dodać zdjęcie</span>
        </label>
      )}
    </div>
  );
}
