import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden px-4 py-8 sm:py-10 lg:py-12">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8faf7_0%,#f3f5f1_38%,#eef3ed_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(0,98,57,0.15),transparent_58%)]" />
      <div className="absolute left-[-6rem] top-20 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,229,221,0.85),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-0 right-[-4rem] -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(229,220,194,0.75),transparent_72%)] blur-2xl" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,98,57,0.08),transparent_66%)] blur-3xl" />

      <div className="container mx-auto flex min-h-[calc(100svh-11rem)] max-w-7xl items-center justify-center">
        <section className="relative w-full max-w-md">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,98,57,0.11),transparent_64%)] blur-3xl" />
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to overview
          </Link>

          <Card className="mx-auto w-full rounded-[2rem] border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,247,0.94))] py-0 shadow-[0_34px_64px_-34px_rgba(23,49,38,0.35)] backdrop-blur-sm">
            <CardHeader className="space-y-4 border-b border-border/60 px-6 py-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-border/70 bg-accent/85 text-accent-foreground shadow-xs">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight">Sign in</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6">
                    Enter your email and password to continue.
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 px-6 py-6">
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
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="h-12 bg-background/90 pr-12"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setShowPassword((currentValue) => !currentValue)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <div className="border-t border-border/60 px-6 py-6">
                  <Button type="submit" size="lg" className="h-12 w-full rounded-[1rem]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Need access? <span className="font-medium text-foreground">Contact your administrator.</span>
                  </p>
                </div>
              </form>
          </Card>
        </section>
      </div>
    </div>
  );
}
