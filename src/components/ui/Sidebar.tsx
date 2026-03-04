"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  logo?: React.ReactNode;
  className?: string;
}

function Sidebar({ items, logo, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-border bg-bg-primary h-full",
        "transition-all duration-200",
        collapsed ? "w-14" : "w-60",
        className
      )}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-border">
        {!collapsed && logo && <div className="flex-1 overflow-hidden">{logo}</div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 hover:bg-bg-secondary rounded-sm text-text-muted hover:text-text-primary",
            "transition-colors duration-150",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-small font-medium rounded-sm",
              "transition-colors duration-150",
              item.active
                ? "bg-accent-subtle text-accent-primary"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export { Sidebar };
