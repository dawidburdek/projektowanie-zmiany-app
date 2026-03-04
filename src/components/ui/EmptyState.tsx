import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 text-text-muted">{icon}</div>}
      <h3 className="text-h5 font-semibold text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-small text-text-muted max-w-sm mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export { EmptyState };
