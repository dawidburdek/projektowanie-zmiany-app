"use client";

import { useEffect } from "react";
import { markQueryAsRead } from "@/actions/queries";

export function MarkQueryRead({ queryId }: { queryId: string }) {
  useEffect(() => {
    markQueryAsRead(queryId);
  }, [queryId]);

  return null;
}
