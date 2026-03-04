"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { compressImage } from "@/lib/compress-image";

interface ImageUploadProps {
  name: string;
  multiple?: boolean;
  className?: string;
}

export function ImageUpload({ name, multiple = false, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const compressed = await Promise.all(files.map((f) => compressImage(f)));
    const newPreviews = compressed.map((file) => ({ url: URL.createObjectURL(file), file }));
    setPreviews((prev) => (multiple ? [...prev, ...newPreviews] : newPreviews));

    if (inputRef.current) inputRef.current.value = "";
  }

  function handleClear(index: number) {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden inputs for each file */}
      {previews.map((item, i) => {
        const dt = new DataTransfer();
        dt.items.add(item.file);
        return (
          <input
            key={i}
            type="file"
            name={`${name}_${i}`}
            className="sr-only"
            aria-hidden
            readOnly
            tabIndex={-1}
            ref={(el) => {
              if (el) {
                el.files = dt.files;
              }
            }}
          />
        );
      })}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        onChange={handleChange}
        id={`image-upload-${name}`}
      />

      {previews.length > 0 && (
        <div className={cn("grid gap-2 mb-2", previews.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
          {previews.map((item, i) => (
            <div key={i} className="relative aspect-video rounded-sm overflow-hidden border border-border">
              <Image src={item.url} alt={`Podgląd ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleClear(i)}
                className="absolute top-2 right-2 bg-bg-primary rounded-sm p-1 hover:bg-bg-secondary border border-border"
              >
                <X size={14} className="text-text-secondary" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor={`image-upload-${name}`}
        className={cn(
          "flex flex-col items-center justify-center gap-2 w-full h-32",
          "border border-dashed border-border rounded-sm cursor-pointer",
          "hover:border-border-hover hover:bg-bg-secondary transition-colors duration-150"
        )}
      >
        <ImagePlus size={20} className="text-text-muted" />
        <span className="text-caption text-text-muted">
          {multiple ? "Kliknij aby dodać zdjęcia" : "Kliknij aby dodać zdjęcie"}
        </span>
      </label>
    </div>
  );
}
