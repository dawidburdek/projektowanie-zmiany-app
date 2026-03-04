"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useManualUnread } from "./ManualUnreadContext";

interface Props {
  queryId: string;
  projectId: string;
}

export function MarkUnreadButton({ queryId, projectId }: Props) {
  const { add } = useManualUnread();

  return (
    <Button
      variant="secondary"
      size="sm"
      title="Oznacz jako nieprzeczytane"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(queryId, projectId);
      }}
    >
      <MessageSquare size={14} />
    </Button>
  );
}
