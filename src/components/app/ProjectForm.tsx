"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { createProject } from "@/actions/projects";

const initialState = { error: undefined as string | undefined };

interface Props {
  isAdmin?: boolean;
}

export function ProjectForm({ isAdmin }: Props) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await createProject(formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="name"
        label="Nazwa projektu"
        placeholder="np. Rebranding 2025"
        required
      />
      {isAdmin ? (
        <Select name="visibility" label="Widoczność" defaultValue="all">
          <option value="all">Dla wszystkich</option>
          <option value="admin_only">Tylko admini</option>
        </Select>
      ) : (
        <input type="hidden" name="visibility" value="all" />
      )}
      {state?.error && (
        <p className="text-caption text-error">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Tworzenie..." : "Utwórz projekt"}
      </Button>
    </form>
  );
}
