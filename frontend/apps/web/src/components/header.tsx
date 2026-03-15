import { Link } from "@tanstack/react-router";
import { ChevronRight, Leaf } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-accent/85 text-accent-foreground shadow-xs">
            <Leaf className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-extrabold tracking-tight sm:text-xl">CannaTrack</p>
            <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Cultivation operations platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/82 p-1.5 text-sm font-medium text-muted-foreground shadow-2xs md:flex">
          <a href="/#platform" className="rounded-full px-4 py-2 transition-colors hover:bg-muted hover:text-foreground">
            Platform
          </a>
          <a href="/#operations" className="rounded-full px-4 py-2 transition-colors hover:bg-muted hover:text-foreground">
            Operations
          </a>
          <a href="/#compliance" className="rounded-full px-4 py-2 transition-colors hover:bg-muted hover:text-foreground">
            Compliance
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={buttonVariants({
              className: "px-5 shadow-sm",
            })}
          >
            Sign In
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
