"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-small font-medium transition-colors duration-150",
              "border-b-2 -mb-px",
              active === tab.id
                ? "text-accent-primary border-accent-primary"
                : "text-text-muted border-transparent hover:text-text-secondary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) =>
        tab.id === active && tab.content ? (
          <div key={tab.id} className="pt-4">
            {tab.content}
          </div>
        ) : null
      )}
    </div>
  );
}

export { Tabs };
