import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/app/ProjectForm";

export default function NewProjectPage() {
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
      <ProjectForm />
    </div>
  );
}
