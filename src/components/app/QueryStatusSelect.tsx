"use client";

import { useTransition } from "react";
import { Select } from "@/components/ui/Select";
import { updateQueryStatus } from "@/actions/queries";
import type { QueryStatus } from "@/lib/types";

interface Props {
  queryId: string;
  projectId: string;
  currentStatus: QueryStatus;
}

export function QueryStatusSelect({ queryId, projectId, currentStatus }: Props) {
  const [, startTransition] = useTransition();

  return (
    <Select
      defaultValue={currentStatus}
      onChange={(e) => {
        const status = e.target.value as QueryStatus;
        startTransition(async () => { await updateQueryStatus(queryId, projectId, status); });
      }}
    >
      <option value="New">Nowe</option>
      <option value="In Progress">W toku</option>
      <option value="Resolved">Rozwiązane</option>
    </Select>
  );
}
