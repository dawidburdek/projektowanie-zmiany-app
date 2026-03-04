"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { updateQuery } from "@/actions/queries";

const initialState = { error: undefined as string | undefined };

interface Props {
  queryId: string;
  projectId: string;
  defaultName: string;
  defaultDescription: string | null;
}

export function QueryEditForm({ queryId, projectId, defaultName, defaultDescription }: Props) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await updateQuery(queryId, projectId, formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="name"
        label="Nazwa zapytania"
        defaultValue={defaultName}
        required
      />
      <Textarea
        name="description"
        label="Opis (opcjonalny)"
        defaultValue={defaultDescription ?? ""}
        rows={3}
      />
      {state?.error && (
        <p className="text-caption text-error">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Zapisywanie..." : "Zapisz zmiany"}
      </Button>
    </form>
  );
}
