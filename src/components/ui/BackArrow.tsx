import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackArrowProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

function BackArrow({ href, onClick, label = "Back", className }: BackArrowProps) {
  const baseClass = cn(
    "inline-flex items-center gap-2 text-small font-medium",
    "text-text-muted hover:text-text-primary",
    "transition-colors duration-150",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        <ArrowLeft size={16} />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
}

export { BackArrow };
