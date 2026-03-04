import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { QueryStatusSelect } from "@/components/app/QueryStatusSelect";
import { ChatFeed } from "@/components/app/ChatFeed";
import { ChatInput } from "@/components/app/ChatInput";
import { ImageLightbox } from "@/components/app/ImageLightbox";
import { DeleteConfirmButton } from "@/components/app/DeleteConfirmButton";
import { MarkQueryRead } from "@/components/app/MarkQueryRead";
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

  const queryImageUrls = (query.image_paths ?? []).map((p: string) => getImageUrl("query-images", p));

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

        <div className="flex items-center gap-3">
          <StatusBadge status={query.status} />
          <h1 className="text-h5 font-semibold text-text-primary truncate">{query.name}</h1>
        </div>
        {query.description && (
          <p className="text-small text-text-secondary mt-1">{query.description}</p>
        )}
        <div className="mt-3">
          <QueryStatusSelect
            queryId={queryId}
            projectId={projectId}
            currentStatus={query.status}
          />
        </div>

        {queryImageUrls.length > 0 && (
          <div className={`grid gap-2 mt-3 ${queryImageUrls.length > 1 ? "grid-cols-2" : "grid-cols-1"} max-w-[192px] sm:max-w-sm`}>
            {queryImageUrls.map((url: string, i: number) => (
              <div key={i} className="relative w-full aspect-video rounded-sm overflow-hidden border border-border">
                <ImageLightbox src={url} alt={`${query.name} ${i + 1}`} className="w-full h-full" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
          <Link href={`/projects/${projectId}/queries/${queryId}/edit`}>
            <Button variant="ghost" size="sm">
              <Pencil size={13} />
              Edytuj
            </Button>
          </Link>
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
      <MarkQueryRead queryId={queryId} />
    </div>
  );
}
