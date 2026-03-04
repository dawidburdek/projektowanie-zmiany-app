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

  let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (!isAdmin) query = query.eq("visibility", "all");
  const { data: projects } = await query;

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
            <ProjectCard key={project.id} project={project} />
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
