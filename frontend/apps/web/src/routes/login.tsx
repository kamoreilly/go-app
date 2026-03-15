import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Leaf, Loader2, LockKeyhole, ShieldCheck, Sprout } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden px-4 py-8 sm:py-10 lg:py-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(0,98,57,0.12),transparent_55%)]" />
      <div className="absolute left-[-6rem] top-20 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,229,221,0.85),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-0 right-[-4rem] -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(229,220,194,0.75),transparent_72%)] blur-2xl" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <section className="relative overflow-hidden rounded-[2.25rem] border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(240,245,241,0.92))] p-7 shadow-md sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-14 -translate-y-12 rounded-full bg-[radial-gradient(circle,rgba(229,220,194,0.9),transparent_68%)]" />
            <div className="relative max-w-2xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to overview
              </Link>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-2 text-sm font-medium text-muted-foreground shadow-2xs">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure access for operators and leadership
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Sign in to the system that keeps the operation aligned.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                Access cultivation workflows, inventory visibility, compliance records, and team activity from one dependable workspace.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border/60 bg-card/80 p-5 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Sprout className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">Daily cultivation workflows</p>
                      <p className="text-sm text-muted-foreground">Rooms, tasks, counts, and operational logs</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/60 bg-card/80 p-5 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/80 text-accent-foreground">
                      <BadgeCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">Audit-ready documentation</p>
                      <p className="text-sm text-muted-foreground">Traceable records connected to real work</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-border/60 bg-secondary/35 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Session security</p>
                    <p className="mt-1 text-xl font-bold tracking-tight">Protected access for every role</p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-primary shadow-2xs">
                    <LockKeyhole className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Role-aware access", "Secure entry for each team member"],
                    ["Centralized activity", "Key actions stay connected"],
                    ["Operational continuity", "Information available when shifts change"],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-2xl border border-border/60 bg-background/80 p-4">
                      <p className="font-semibold">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative lg:pl-4">
            <Card className="mx-auto w-full max-w-md rounded-[2rem] border-border/70 bg-card/96 py-6 shadow-lg backdrop-blur-sm">
              <CardHeader className="space-y-5 px-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border/70 bg-accent/85 text-accent-foreground shadow-xs">
                  <Leaf className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Welcome back</CardTitle>
                  <CardDescription className="mt-2 text-base leading-7">
                    Sign in to access your CannaTrack workspace and continue today&apos;s operations.
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 px-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      className="h-12 bg-background/90"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="h-12 bg-background/90"
                    />
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-secondary/28 px-4 py-3 text-sm text-muted-foreground">
                    Use your assigned workspace credentials to access cultivation, inventory, and compliance records.
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 px-6 pt-5">
                  <Button type="submit" size="lg" className="h-12 w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Need access for a new facility? <span className="font-medium text-foreground">Contact your administrator.</span>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
