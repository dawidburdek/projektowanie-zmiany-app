import { Badge } from "@/components/ui/Badge";
import type { ProjectStatus, QueryStatus } from "@/lib/types";

type Status = ProjectStatus | QueryStatus;

const variantMap: Record<Status, "default" | "warning" | "success"> = {
  New: "default",
  "In Progress": "warning",
  Completed: "success",
  Resolved: "success",
};

const labelMap: Record<Status, string> = {
  New: "Nowe",
  "In Progress": "W toku",
  Completed: "Zakończone",
  Resolved: "Rozwiązane",
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={variantMap[status]} className="min-w-[6.5rem] justify-center">{labelMap[status]}</Badge>;
}
