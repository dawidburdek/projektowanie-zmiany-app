import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "./StatusBadge";
import type { Query } from "@/lib/types";

export function QueryCard({ query, projectId }: { query: Query; projectId: string }) {
  return (
    <Link href={`/projects/${projectId}/queries/${query.id}`}>
      <Card hover className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-small font-medium text-text-primary truncate">{query.name}</p>
          {query.description && (
            <p className="text-caption text-text-muted mt-0.5 truncate">{query.description}</p>
          )}
        </div>
        <StatusBadge status={query.status} />
      </Card>
    </Link>
  );
}
