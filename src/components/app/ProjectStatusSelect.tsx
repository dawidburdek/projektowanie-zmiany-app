"use client";

import { useTransition } from "react";
import { Select } from "@/components/ui/Select";
import { updateProjectStatus } from "@/actions/projects";
import type { ProjectStatus } from "@/lib/types";

interface Props {
  projectId: string;
  currentStatus: ProjectStatus;
}

export function ProjectStatusSelect({ projectId, currentStatus }: Props) {
  const [, startTransition] = useTransition();

  return (
    <Select
      defaultValue={currentStatus}
      onChange={(e) => {
        const status = e.target.value as ProjectStatus;
        startTransition(async () => { await updateProjectStatus(projectId, status); });
      }}
    >
      <option value="New">Nowe</option>
      <option value="In Progress">W toku</option>
      <option value="Completed">Zakończone</option>
    </Select>
  );
}
