import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "./StatusBadge";
import { MarkUnreadButton } from "./MarkUnreadButton";
import type { Query } from "@/lib/types";

interface Props {
  query: Query;
  projectId: string;
  hasActivity?: boolean;
}

export function QueryCard({ query, projectId, hasActivity }: Props) {
  return (
    <Card hover className="flex items-center justify-between gap-4">
      <Link
        href={`/projects/${projectId}/queries/${query.id}`}
        className="flex items-center gap-2 min-w-0 flex-1"
      >
        {hasActivity && (
          <span className="shrink-0 w-2 h-2 rounded-full bg-success" title="Nowa aktywność" />
        )}
        <div className="min-w-0">
          <p className="text-small font-medium text-text-primary truncate">{query.name}</p>
          {query.description && (
            <p className="text-caption text-text-muted mt-0.5 truncate">{query.description}</p>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-2 shrink-0">
        {query.visibility === "admin_only" && (
          <Badge variant="outline">Tylko admini</Badge>
        )}
        <MarkUnreadButton queryId={query.id} projectId={projectId} />
        <StatusBadge status={query.status} />
      </div>
    </Card>
  );
}
