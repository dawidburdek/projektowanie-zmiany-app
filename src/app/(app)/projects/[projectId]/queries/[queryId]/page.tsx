import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { QueryStatusSelect } from "@/components/app/QueryStatusSelect";
import { ChatFeed } from "@/components/app/ChatFeed";
import { ChatInput } from "@/components/app/ChatInput";
import { ImageLightbox } from "@/components/app/ImageLightbox";
import { DeleteConfirmButton } from "@/components/app/DeleteConfirmButton";
import { deleteQuery } from "@/actions/queries";

interface Props {
  params: Promise<{ projectId: string; queryId: string }>;
}

function getImageUrl(bucket: string, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export default async function QueryDetailPage({ params }: Props) {
  const { projectId, queryId } = await params;
  const supabase = await createClient();

  const [
    { data: query },
    { data: project },
    { data: messages },
    { data: { user } },
  ] = await Promise.all([
    supabase.from("queries").select("*").eq("id", queryId).single(),
    supabase.from("projects").select("name").eq("id", projectId).single(),
    supabase
      .from("messages")
      .select("*")
      .eq("query_id", queryId)
      .order("created_at", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  if (!query) notFound();

  const queryImageUrl = query.image_path
    ? getImageUrl("query-images", query.image_path)
    : null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-border">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-text-primary mb-3 transition-colors"
        >
          <ArrowLeft size={14} />
          {project?.name ?? "Projekt"}
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-h5 font-semibold text-text-primary truncate">{query.name}</h1>
            {query.description && (
              <p className="text-small text-text-secondary mt-1">{query.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={query.status} />
            <QueryStatusSelect
              queryId={queryId}
              projectId={projectId}
              currentStatus={query.status}
            />
          </div>
        </div>

        {queryImageUrl && (
          <div className="relative w-full max-w-sm aspect-video mt-3 rounded-sm overflow-hidden border border-border">
            <ImageLightbox src={queryImageUrl} alt={query.name} className="w-full h-full" />
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-border">
          <DeleteConfirmButton
            action={async () => {
              "use server";
              await deleteQuery(queryId, projectId);
            }}
            label="Usuń zapytanie"
            description={`Czy na pewno chcesz usunąć zapytanie "${query.name}"? Ta operacja jest nieodwracalna i usunie wszystkie wiadomości.`}
          />
        </div>
      </div>

      {/* Chat */}
      <ChatFeed
        initialMessages={messages ?? []}
        queryId={queryId}
        currentUserId={user?.id ?? ""}
      />

      <ChatInput queryId={queryId} projectId={projectId} />
    </div>
  );
}
