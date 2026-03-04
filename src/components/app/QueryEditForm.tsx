"use client";

import { useRef, useState, useTransition } from "react";
import { X, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { updateQuery } from "@/actions/queries";
import { compressImage } from "@/lib/compress-image";

interface Props {
  queryId: string;
  projectId: string;
  defaultName: string;
  defaultDescription: string | null;
  defaultVisibility?: string;
  defaultImagePaths?: string[];
  isAdmin?: boolean;
}

function getImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/query-images/${path}`;
}

export function QueryEditForm({
  queryId,
  projectId,
  defaultName,
  defaultDescription,
  defaultVisibility = "all",
  defaultImagePaths = [],
  isAdmin,
}: Props) {
  const [existingPaths, setExistingPaths] = useState<string[]>(defaultImagePaths);
  const [newImages, setNewImages] = useState<{ url: string; file: File }[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const visibilityRef = useRef<HTMLSelectElement>(null);

  async function handleImageAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const compressed = await Promise.all(files.map(compressImage));
    setNewImages((prev) => [...prev, ...compressed.map((f) => ({ url: URL.createObjectURL(f), file: f }))]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeExisting(path: string) {
    setExistingPaths((prev) => prev.filter((p) => p !== path));
  }

  function removeNew(index: number) {
    setNewImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", nameRef.current?.value ?? "");
    formData.set("description", descRef.current?.value ?? "");
    formData.set("visibility", visibilityRef.current?.value ?? defaultVisibility);
    formData.set("images_to_keep", JSON.stringify(existingPaths));
    newImages.forEach((img, i) => formData.set(`image_${i}`, img.file));

    startTransition(async () => {
      try {
        const result = await updateQuery(queryId, projectId, formData);
        if (result?.error) setError(result.error);
      } catch {
        setError("Wystąpił błąd podczas zapisywania");
      }
    });
  }

  const allImages = [
    ...existingPaths.map((path) => ({ type: "existing" as const, path, url: getImageUrl(path) })),
    ...newImages.map((img, i) => ({ type: "new" as const, index: i, url: img.url })),
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        ref={nameRef}
        name="name"
        label="Nazwa zapytania"
        defaultValue={defaultName}
        required
      />
      <Textarea
        ref={descRef}
        name="description"
        label="Opis (opcjonalny)"
        defaultValue={defaultDescription ?? ""}
        rows={3}
      />
      {isAdmin ? (
        <Select ref={visibilityRef} name="visibility" label="Widoczność" defaultValue={defaultVisibility}>
          <option value="all">Dla wszystkich</option>
          <option value="admin_only">Tylko admini</option>
        </Select>
      ) : null}

      {/* Zarządzanie zdjęciami */}
      <div>
        <p className="text-small font-medium text-text-secondary mb-1.5">Zdjęcia</p>
        {allImages.length > 0 && (
          <div className={`grid gap-2 mb-2 ${allImages.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {allImages.map((img) => (
              <div
                key={img.url}
                className="relative aspect-video rounded-sm overflow-hidden border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="Zdjęcie" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    img.type === "existing"
                      ? removeExisting(img.path)
                      : removeNew(img.index)
                  }
                  className="absolute top-1 right-1 bg-bg-primary rounded-sm p-0.5 border border-border hover:bg-bg-secondary"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          id="edit-image-upload"
          onChange={handleImageAdd}
        />
        <label
          htmlFor="edit-image-upload"
          className="flex items-center justify-center gap-2 w-full h-16 border border-dashed border-border rounded-sm cursor-pointer hover:border-border-hover hover:bg-bg-secondary transition-colors text-text-muted text-small"
        >
          <ImagePlus size={16} />
          Dodaj zdjęcie
        </label>
      </div>

      {error && <p className="text-caption text-error">{error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
      </Button>
    </form>
  );
}
