import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center px-4 py-12">
      <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card px-5 py-3 shadow-xs">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm font-medium text-foreground">Loading workspace...</span>
      </div>
    </div>
  );
}
