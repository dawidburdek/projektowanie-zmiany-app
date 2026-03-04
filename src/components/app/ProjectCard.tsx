import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "./StatusBadge";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
  hasUnread?: boolean;
}

export function ProjectCard({ project, hasUnread }: Props) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card hover className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          {hasUnread && (
            <span className="shrink-0 w-2 h-2 rounded-full bg-success" title="Nieprzeczytane wiadomości" />
          )}
          <div className="min-w-0">
            <p className="text-small font-medium text-text-primary truncate">{project.name}</p>
            <p className="text-caption text-text-muted mt-0.5">
              {new Date(project.created_at).toLocaleDateString("pl-PL")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {project.visibility === "admin_only" && (
            <Badge variant="outline">Tylko admini</Badge>
          )}
          <StatusBadge status={project.status} />
        </div>
      </Card>
    </Link>
  );
}
