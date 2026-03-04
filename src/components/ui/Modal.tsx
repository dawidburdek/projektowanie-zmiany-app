"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

function Modal({ open, onClose, title, size = "md", className, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handler = () => onClose();
    dialog.addEventListener("close", handler);
    return () => dialog.removeEventListener("close", handler);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "w-full m-auto p-0 rounded-sm border border-border bg-bg-primary shadow-elevated",
        "backdrop:bg-black/40 backdrop:backdrop-blur-sm",
        sizeStyles[size],
        className
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        {title && (
          <h2 className="text-h6 font-semibold text-text-primary">{title}</h2>
        )}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="ml-auto p-1 hover:bg-bg-secondary rounded-sm text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-5 py-5">{children}</div>
    </dialog>
  );
}

export { Modal };
