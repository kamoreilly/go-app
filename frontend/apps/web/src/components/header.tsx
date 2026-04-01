import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-base font-extrabold tracking-tight">CannaTrack</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#features" className="rounded-lg px-3 py-2 transition-colors hover:bg-muted hover:text-foreground">
            Features
          </a>
          <a href="/#how-it-works" className="rounded-lg px-3 py-2 transition-colors hover:bg-muted hover:text-foreground">
            How it works
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "hidden text-sm font-medium sm:inline-flex",
            })}
          >
            Log in
          </Link>
          <Link
            to="/login"
            className={buttonVariants({
              size: "sm",
              className: "rounded-lg px-4 text-sm font-semibold shadow-sm shadow-primary/20",
            })}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
