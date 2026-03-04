import type { Message } from "@/lib/types";
import { ImageLightbox } from "./ImageLightbox";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getImageUrl(bucket: string, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

interface Props {
  message: Message;
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: Props) {
  const imageUrls = (message.image_paths ?? []).map((p) => getImageUrl("chat-images", p));

  return (
    <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
      <span className="text-caption text-text-muted px-1">
        {isOwn ? "Ty" : message.user_email} · {formatTime(message.created_at)}
      </span>
      <div
        className={`max-w-xs rounded-sm px-3 py-2 text-small ${
          isOwn
            ? "bg-accent-primary text-white"
            : "bg-bg-card border border-border text-text-primary"
        }`}
      >
        {imageUrls.length > 0 && (
          <div className={`grid gap-1 mb-2 ${imageUrls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {imageUrls.map((url, i) => (
              <div key={i} className="relative w-full aspect-video rounded-sm overflow-hidden">
                <ImageLightbox src={url} alt={`Zdjęcie ${i + 1}`} className="w-full h-full" />
              </div>
            ))}
          </div>
        )}
        {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
      </div>
    </div>
  );
}
