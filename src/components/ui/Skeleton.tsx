import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-bg-tertiary rounded-sm", className)}
      style={{ width, height }}
    />
  );
}

export { Skeleton };
