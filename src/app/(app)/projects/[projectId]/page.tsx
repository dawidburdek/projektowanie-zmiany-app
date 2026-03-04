import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { QueryCard } from "@/components/app/QueryCard";
import { ProjectStatusSelect } from "@/components/app/ProjectStatusSelect";
import { deleteProject } from "@/actions/projects";
import { DeleteConfirmButton } from "@/components/app/DeleteConfirmButton";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();

  const [{ data: project }, { data: queries }, { data: { user } }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", projectId).single(),
    supabase.from("queries").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);

  if (!project) notFound();

  const queryIds = (queries ?? []).map((q) => q.id);

  const [{ data: messages }, { data: reads }] = await Promise.all([
    queryIds.length > 0
      ? supabase.from("messages").select("query_id, created_at").in("query_id", queryIds)
      : Promise.resolve({ data: [] as { query_id: string; created_at: string }[] }),
    queryIds.length > 0 && user
      ? supabase.from("query_reads").select("query_id, last_read_at").eq("user_id", user.id).in("query_id", queryIds)
      : Promise.resolve({ data: [] as { query_id: string; last_read_at: string }[] }),
  ]);

  const readMap = new Map((reads ?? []).map((r) => [r.query_id, r.last_read_at]));
  const latestMessageMap = new Map<string, string>();
  for (const msg of messages ?? []) {
    const current = latestMessageMap.get(msg.query_id);
    if (!current || msg.created_at > current) latestMessageMap.set(msg.query_id, msg.created_at);
  }
  const unreadQueryIds = new Set(
    [...latestMessageMap.entries()]
      .filter(([qId, latestAt]) => {
        const lastRead = readMap.get(qId);
        return !lastRead || latestAt > lastRead;
      })
      .map(([qId]) => qId)
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Projekty
      </Link>

      <div className="mb-6">
        <StatusBadge status={project.status} />
        <h1 className="text-h4 font-semibold text-text-primary truncate mt-3">{project.name}</h1>
        <p className="text-caption text-text-muted mt-0.5">
          {new Date(project.created_at).toLocaleDateString("pl-PL")}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <ProjectStatusSelect projectId={projectId} currentStatus={project.status} />
          <Link href={`/projects/${projectId}/edit`}>
            <Button variant="ghost" size="sm">
              <Pencil size={13} />
              Edytuj
            </Button>
          </Link>
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
              hasActivity={unreadQueryIds.has(query.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-text-muted">
          <p className="text-small">Brak zapytań. Utwórz pierwsze!</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        <DeleteConfirmButton
          action={async () => {
            "use server";
            await deleteProject(projectId);
          }}
          label="Usuń projekt"
          description={`Czy na pewno chcesz usunąć projekt "${project.name}"? Ta operacja jest nieodwracalna i usunie wszystkie zapytania oraz wiadomości.`}
        />
      </div>
    </div>
  );
}
