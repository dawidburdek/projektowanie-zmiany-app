"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { ImageUpload } from "./ImageUpload";
import { createQuery } from "@/actions/queries";

const initialState = { error: undefined as string | undefined };

interface Props {
  projectId: string;
  isAdmin?: boolean;
}

export function QueryForm({ projectId, isAdmin }: Props) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await createQuery(projectId, formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="name"
        label="Nazwa zapytania"
        placeholder="np. Dobór kolorystyki"
        required
      />
      <Textarea
        name="description"
        label="Opis (opcjonalny)"
        placeholder="Opisz zapytanie..."
        rows={3}
      />
      {isAdmin ? (
        <Select name="visibility" label="Widoczność" defaultValue="all">
          <option value="all">Dla wszystkich</option>
          <option value="admin_only">Tylko admini</option>
        </Select>
      ) : (
        <input type="hidden" name="visibility" value="all" />
      )}
      <div>
        <p className="text-small font-medium text-text-secondary mb-1.5">
          Zdjęcie (opcjonalne)
        </p>
        <ImageUpload name="image" multiple />
      </div>
      {state?.error && (
        <p className="text-caption text-error">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Tworzenie..." : "Utwórz zapytanie"}
      </Button>
    </form>
  );
}
