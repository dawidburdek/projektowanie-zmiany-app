"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface Props {
  action: () => Promise<void>;
  label: string;
  description: string;
}

export function DeleteConfirmButton({ action, label, description }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await action();
      setOpen(false);
    });
  }

  return (
    <>
      <Button type="button" variant="danger" size="sm" onClick={() => setOpen(true)}>
        <Trash2 size={14} />
        {label}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Potwierdź usunięcie" size="sm">
        <p className="text-small text-text-secondary mb-6">{description}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
            Anuluj
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Usuwanie..." : "Usuń"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
