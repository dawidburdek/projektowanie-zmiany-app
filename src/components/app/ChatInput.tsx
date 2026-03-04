"use client";

import { useRef, useState, useTransition } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sendMessage } from "@/actions/queries";
import { compressImage } from "@/lib/compress-image";

interface ChatInputProps {
  queryId: string;
  projectId: string;
}

export function ChatInput({ queryId, projectId }: ChatInputProps) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<{ url: string; file: File }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const compressed = await Promise.all(files.map((f) => compressImage(f)));
    const newImages = compressed.map((file) => ({ url: URL.createObjectURL(file), file }));
    setImages((prev) => [...prev, ...newImages]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleClearImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    const formData = new FormData();
    formData.set("content", content);
    images.forEach((img, i) => formData.set(`image_${i}`, img.file));

    startTransition(async () => {
      try {
        const result = await sendMessage(queryId, projectId, formData);
        if (result?.error) {
          setError(result.error);
        } else {
          setContent("");
          images.forEach((img) => URL.revokeObjectURL(img.url));
          setImages([]);
          setError(null);
        }
      } catch {
        setError("Błąd wysyłania — sprawdź rozmiar pliku (max 5MB łącznie)");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border bg-bg-primary p-3 flex flex-col gap-2"
    >
      {images.length > 0 && (
        <div className={`grid gap-2 ${images.length > 1 ? "grid-cols-3" : "grid-cols-1 w-20"}`}>
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-sm overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={`Podgląd ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleClearImage(i)}
                className="absolute top-1 right-1 bg-bg-primary rounded-sm p-0.5 border border-border"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-caption text-error">{error}</p>}
      <div className="flex items-end gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          id="chat-image-upload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="chat-image-upload"
          className="shrink-0 p-2 rounded-sm text-text-muted hover:bg-bg-secondary hover:text-text-primary cursor-pointer transition-colors"
        >
          <ImagePlus size={18} />
        </label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Wpisz wiadomość..."
          className="flex-1 bg-bg-primary border border-border rounded-sm text-small text-text-primary
            placeholder:text-text-muted px-3 py-2 resize-none min-h-[3rem] md:min-h-[3.9rem]
            focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20
            transition-colors duration-150"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent);
            }
          }}
        />
        <Button
          type="submit"
          variant="icon"
          size="md"
          disabled={isPending || (!content.trim() && images.length === 0)}
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
}
