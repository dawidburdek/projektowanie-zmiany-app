"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChatMessage } from "./ChatMessage";
import type { Message } from "@/lib/types";

function getImageUrl(bucket: string, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

interface ChatFeedProps {
  initialMessages: Message[];
  queryId: string;
  currentUserId: string;
}

export function ChatFeed({ initialMessages, queryId, currentUserId }: ChatFeedProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${queryId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `query_id=eq.${queryId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {messages.length === 0 && (
        <p className="text-caption text-text-muted text-center mt-8">
          Brak wiadomości. Zacznij rozmowę!
        </p>
      )}
      {messages.map((msg) => {
        // Override image URL rendering for Realtime messages (they won't have full URLs)
        const messageForDisplay = msg;
        return (
          <ChatMessage
            key={msg.id}
            message={messageForDisplay}
            isOwn={msg.user_id === currentUserId}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
