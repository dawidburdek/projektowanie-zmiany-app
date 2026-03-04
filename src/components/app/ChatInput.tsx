"use client";

import { useRef, useState, useTransition } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sendMessage } from "@/actions/queries";

interface ChatInputProps {
  queryId: string;
  projectId: string;
}

export function ChatInput({ queryId, projectId }: ChatInputProps) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  }

  function handleClearImage() {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    const formData = new FormData(formRef.current!);

    startTransition(async () => {
      const result = await sendMessage(queryId, projectId, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setContent("");
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = "";
        setError(null);
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border-t border-border bg-bg-primary p-3 flex flex-col gap-2"
    >
      {imagePreview && (
        <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePreview} alt="Podgląd" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClearImage}
            className="absolute top-1 right-1 bg-bg-primary rounded-sm p-0.5 border border-border"
          >
            <X size={10} />
          </button>
        </div>
      )}
      {error && <p className="text-caption text-error">{error}</p>}
      <div className="flex items-end gap-2">
        <input
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
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
          rows={1}
          className="flex-1 bg-bg-primary border border-border rounded-sm text-small text-text-primary
            placeholder:text-text-muted px-3 py-2 resize-none
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
          disabled={isPending || (!content.trim() && !imagePreview)}
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
}
