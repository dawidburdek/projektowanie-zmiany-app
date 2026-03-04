"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { updateProject } from "@/actions/projects";

const initialState = { error: undefined as string | undefined };

interface Props {
  projectId: string;
  defaultName: string;
  defaultVisibility?: string;
  isAdmin?: boolean;
}

export function ProjectEditForm({ projectId, defaultName, defaultVisibility = "all", isAdmin }: Props) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await updateProject(projectId, formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="name"
        label="Nazwa projektu"
        defaultValue={defaultName}
        required
      />
      {isAdmin ? (
        <Select name="visibility" label="Widoczność" defaultValue={defaultVisibility}>
          <option value="all">Dla wszystkich</option>
          <option value="admin_only">Tylko admini</option>
        </Select>
      ) : (
        <input type="hidden" name="visibility" value={defaultVisibility} />
      )}
      {state?.error && (
        <p className="text-caption text-error">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Zapisywanie..." : "Zapisz zmiany"}
      </Button>
    </form>
  );
}
