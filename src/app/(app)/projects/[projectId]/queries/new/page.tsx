import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { QueryForm } from "@/components/app/QueryForm";

const ADMIN_EMAILS = ["burdekd@gmail.com", "mbalak@tabell.eu"];

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function NewQueryPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  return (
    <div className="p-6 max-w-md mx-auto">
      <Link
        href={`/projects/${projectId}`}
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Powrót do projektu
      </Link>
      <h1 className="text-h4 font-semibold text-text-primary mb-6">Nowe zapytanie</h1>
      <QueryForm projectId={projectId} isAdmin={isAdmin} />
    </div>
  );
}
