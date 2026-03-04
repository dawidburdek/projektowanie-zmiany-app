import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "bg-bg-primary border-t border-border",
        "grid h-16",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-caption font-medium",
            "transition-colors duration-150",
            item.active
              ? "text-accent-primary"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export { BottomNav };
