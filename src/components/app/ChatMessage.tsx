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
  const imageUrl = message.image_path
    ? getImageUrl("chat-images", message.image_path)
    : null;

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
        {imageUrl && (
          <div className="relative w-48 aspect-video mb-2 rounded-sm overflow-hidden">
            <ImageLightbox src={imageUrl} alt="Zdjęcie" className="w-full h-full" />
          </div>
        )}
        {message.content && <p>{message.content}</p>}
      </div>
    </div>
  );
}
