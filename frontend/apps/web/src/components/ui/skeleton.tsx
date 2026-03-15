import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-[calc(var(--radius)-4px)] bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
