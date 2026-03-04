"use client";

import { BellOff } from "lucide-react";
import { markQueryAsUnread } from "@/actions/queries";

interface Props {
  queryId: string;
  projectId: string;
}

export function MarkUnreadButton({ queryId, projectId }: Props) {
  return (
    <button
      type="button"
      title="Oznacz jako nieprzeczytane"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await markQueryAsUnread(queryId, projectId);
      }}
      className="shrink-0 p-1 rounded-sm text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
    >
      <BellOff size={14} />
    </button>
  );
}
