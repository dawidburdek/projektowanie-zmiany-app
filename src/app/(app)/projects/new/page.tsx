import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/app/ProjectForm";

const ADMIN_EMAILS = ["burdekd@gmail.com", "mbalak@tabell.eu"];

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  return (
    <div className="p-6 max-w-md mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Powrót
      </Link>
      <h1 className="text-h4 font-semibold text-text-primary mb-6">Nowy projekt</h1>
      <ProjectForm isAdmin={isAdmin} />
    </div>
  );
}
