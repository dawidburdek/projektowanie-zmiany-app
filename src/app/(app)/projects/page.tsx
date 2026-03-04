import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/app/ProjectCard";

const ADMIN_EMAILS = ["burdekd@gmail.com", "mbalak@tabell.eu"];

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  let projectsQuery = supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (!isAdmin) projectsQuery = projectsQuery.eq("visibility", "all");
  const { data: projects } = await projectsQuery;

  // Wyznaczanie projektów z nieprzeczytanymi zapytaniami
  const projectIds = (projects ?? []).map((p) => p.id);
  const unreadProjectIds = new Set<string>();

  if (projectIds.length > 0 && user) {
    const { data: allQueries } = await supabase
      .from("queries")
      .select("id, project_id")
      .in("project_id", projectIds);

    const allQueryIds = (allQueries ?? []).map((q) => q.id);

    if (allQueryIds.length > 0) {
      const [{ data: allMessages }, { data: allReads }] = await Promise.all([
        supabase.from("messages").select("query_id, created_at").in("query_id", allQueryIds),
        supabase.from("query_reads").select("query_id, last_read_at").eq("user_id", user.id).in("query_id", allQueryIds),
      ]);

      const readMap = new Map((allReads ?? []).map((r) => [r.query_id, r.last_read_at]));
      const latestMsgMap = new Map<string, string>();
      for (const msg of allMessages ?? []) {
        const cur = latestMsgMap.get(msg.query_id);
        if (!cur || msg.created_at > cur) latestMsgMap.set(msg.query_id, msg.created_at);
      }

      for (const query of allQueries ?? []) {
        const latestAt = latestMsgMap.get(query.id);
        if (!latestAt) continue;
        const lastRead = readMap.get(query.id);
        if (!lastRead || latestAt > lastRead) unreadProjectIds.add(query.project_id);
      }
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h4 font-semibold text-text-primary">Projekty</h1>
        <Link href="/projects/new">
          <Button size="sm">
            <Plus size={14} />
            Nowy projekt
          </Button>
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} hasUnread={unreadProjectIds.has(project.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-muted">
          <p className="text-small">Brak projektów. Utwórz pierwszy!</p>
        </div>
      )}
    </div>
  );
}
