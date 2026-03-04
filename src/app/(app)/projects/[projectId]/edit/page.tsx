import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectEditForm } from "@/components/app/ProjectEditForm";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (!project) notFound();

  return (
    <div className="p-6 max-w-md mx-auto">
      <Link
        href={`/projects/${projectId}`}
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Powrót do projektu
      </Link>
      <h1 className="text-h4 font-semibold text-text-primary mb-6">Edytuj projekt</h1>
      <ProjectEditForm projectId={projectId} defaultName={project.name} />
    </div>
  );
}
