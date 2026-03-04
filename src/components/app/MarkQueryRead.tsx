"use client";

import { useEffect } from "react";
import { markQueryAsRead } from "@/actions/queries";
import { useManualUnread } from "./ManualUnreadContext";

export function MarkQueryRead({ queryId }: { queryId: string }) {
  const { remove } = useManualUnread();

  useEffect(() => {
    markQueryAsRead(queryId);
    remove(queryId);
  }, [queryId]);

  return null;
}
