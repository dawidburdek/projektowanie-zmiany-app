import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { QueryEditForm } from "@/components/app/QueryEditForm";

const ADMIN_EMAILS = ["burdekd@gmail.com", "mbalak@tabell.eu"];

interface Props {
  params: Promise<{ projectId: string; queryId: string }>;
}

export default async function EditQueryPage({ params }: Props) {
  const { projectId, queryId } = await params;
  const supabase = await createClient();

  const [{ data: query }, { data: { user } }] = await Promise.all([
    supabase.from("queries").select("*").eq("id", queryId).single(),
    supabase.auth.getUser(),
  ]);

  if (!query) notFound();

  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  return (
    <div className="p-6 max-w-md mx-auto">
      <Link
        href={`/projects/${projectId}/queries/${queryId}`}
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Powrót do zapytania
      </Link>
      <h1 className="text-h4 font-semibold text-text-primary mb-6">Edytuj zapytanie</h1>
      <QueryEditForm
        queryId={queryId}
        projectId={projectId}
        defaultName={query.name}
        defaultDescription={query.description}
        defaultVisibility={query.visibility ?? "all"}
        isAdmin={isAdmin}
      />
    </div>
  );
}
