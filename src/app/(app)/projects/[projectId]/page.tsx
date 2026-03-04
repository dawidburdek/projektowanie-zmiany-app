import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { QueryCard } from "@/components/app/QueryCard";
import { ProjectStatusSelect } from "@/components/app/ProjectStatusSelect";
import { deleteProject } from "@/actions/projects";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [{ data: project }, { data: queries }, { data: recentMessages }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", projectId).single(),
    supabase
      .from("queries")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
    supabase
      .from("messages")
      .select("query_id")
      .gte("created_at", since24h),
  ]);

  if (!project) notFound();

  const activeQueryIds = new Set((recentMessages ?? []).map((m) => m.query_id));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Projekty
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-h4 font-semibold text-text-primary truncate">{project.name}</h1>
          <p className="text-caption text-text-muted mt-0.5">
            {new Date(project.created_at).toLocaleDateString("pl-PL")}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={project.status} />
          <ProjectStatusSelect projectId={projectId} currentStatus={project.status} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-small font-semibold text-text-secondary">Zapytania</h2>
        <Link href={`/projects/${projectId}/queries/new`}>
          <Button size="sm">
            <Plus size={14} />
            Nowe zapytanie
          </Button>
        </Link>
      </div>

      {queries && queries.length > 0 ? (
        <div className="flex flex-col gap-3">
          {queries.map((query) => (
            <QueryCard
              key={query.id}
              query={query}
              projectId={projectId}
              hasActivity={activeQueryIds.has(query.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-text-muted">
          <p className="text-small">Brak zapytań. Utwórz pierwsze!</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        <form
          action={async () => {
            "use server";
            await deleteProject(projectId);
          }}
        >
          <Button type="submit" variant="danger" size="sm">
            <Trash2 size={14} />
            Usuń projekt
          </Button>
        </form>
      </div>
    </div>
  );
}
