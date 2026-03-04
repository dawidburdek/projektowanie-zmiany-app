import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FABPosition = "bottom-right" | "bottom-left";

interface FABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  position?: FABPosition;
  className?: string;
}

const positionStyles: Record<FABPosition, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
};

function FAB({ onClick, icon, label, position = "bottom-right", className }: FABProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label ?? "Action"}
      className={cn(
        "fixed z-50 flex items-center justify-center",
        "bg-accent-primary text-text-inverse hover:bg-accent-hover",
        "shadow-elevated transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        label
          ? "gap-2 px-5 h-12 rounded-sm text-small font-medium"
          : "h-14 w-14 rounded-sm",
        positionStyles[position],
        className
      )}
    >
      {icon ?? <Plus size={20} />}
      {label && <span>{label}</span>}
    </button>
  );
}

export { FAB };
