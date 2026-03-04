"use client";

import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { markQueryAsUnread } from "@/actions/queries";

interface Props {
  queryId: string;
  projectId: string;
}

export function MarkUnreadButton({ queryId, projectId }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      title="Oznacz jako nieprzeczytane"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await markQueryAsUnread(queryId, projectId);
        router.refresh();
      }}
      className="shrink-0 p-1 rounded-sm text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
    >
      <MessageSquare size={14} />
    </button>
  );
}
