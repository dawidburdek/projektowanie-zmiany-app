"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { markQueryAsUnread } from "@/actions/queries";

interface Props {
  queryId: string;
  projectId: string;
}

export function MarkUnreadButton({ queryId, projectId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      size="sm"
      title="Oznacz jako nieprzeczytane"
      disabled={isPending}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await markQueryAsUnread(queryId, projectId);
        startTransition(() => router.refresh());
      }}
    >
      <MessageSquare size={14} />
    </Button>
  );
}
