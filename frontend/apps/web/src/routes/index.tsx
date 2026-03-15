import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BadgeCheck, ClipboardCheck, Leaf, Package, ShieldCheck, Sparkles, Sprout, Users } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const platformHighlights = [
  {
    icon: Sprout,
    title: "Cultivation oversight",
    description:
      "Track rooms, plant batches, feeding programs, and environmental tasks from propagation through harvest.",
  },
  {
    icon: Package,
    title: "Inventory control",
    description:
      "Manage inputs, finished goods, storage locations, and movement history with less spreadsheet friction.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance readiness",
    description:
      "Keep audit trails, documentation, and reporting workflows organized so teams stay inspection ready.",
  },
  {
    icon: Users,
    title: "Team accountability",
    description:
      "Assign work clearly, track completion, and give operators the right context for each daily task.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Plan each room with clarity",
    description:
      "Build repeatable room schedules, assign owners, and keep production targets visible before work starts.",
  },
  {
    step: "02",
    title: "Capture work as it happens",
    description:
      "Operators log watering, movements, counts, and issues in one place so records stay current and dependable.",
  },
  {
    step: "03",
    title: "Review performance quickly",
    description:
      "Supervisors can scan exceptions, labor status, and output trends without chasing updates across teams.",
  },
];

const trustItems = [
  "Multi-room cultivation visibility",
  "Inventory and lot traceability",
  "Audit-ready records",
  "Role-based team workflows",
];

function HomeComponent() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(0,98,57,0.14),transparent_58%)]" />
      <div className="absolute left-[-8rem] top-32 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(209,221,213,0.7),transparent_72%)] blur-2xl" />
      <div className="absolute right-[-6rem] top-64 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(229,220,194,0.65),transparent_72%)] blur-2xl" />

      <section className="border-b border-border/60 px-4 pb-18 pt-12 sm:pb-24 lg:pt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/88 px-4 py-2 text-sm font-medium text-muted-foreground shadow-xs backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Built for regulated cultivation operations
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                A cleaner command center for cultivation, compliance, and daily execution.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                CannaTrack gives operators, managers, and compliance teams a shared operational view of
                rooms, inventory, workflows, and reporting so the business runs with more control and less noise.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className={buttonVariants({ size: "lg", className: "min-w-44" })}>
                  Access Platform
                </Link>
                <a
                  href="#platform"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "min-w-44 bg-background/80 backdrop-blur-sm",
                  })}
                >
                  Explore Platform
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">98.6%</p>
                  <p className="mt-1 text-sm text-muted-foreground">task completion visibility across active rooms</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">24/7</p>
                  <p className="mt-1 text-sm text-muted-foreground">operational reporting for leads and compliance teams</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">1 system</p>
                  <p className="mt-1 text-sm text-muted-foreground">for plant lifecycle, inventory, and accountability</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-border/45 bg-secondary/50" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 p-5 shadow-lg backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,248,246,0.92))] p-4 shadow-xs sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Operations snapshot
                      </p>
                      <p className="mt-2 text-2xl font-extrabold tracking-tight">North facility overview</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                      <BadgeCheck className="h-4 w-4" />
                      Audit ready
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="gap-3 border-border/60 bg-background/80 py-4 shadow-2xs">
                      <CardHeader className="px-4">
                        <CardDescription>Active rooms</CardDescription>
                        <CardTitle className="text-3xl">47</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="gap-3 border-border/60 bg-background/80 py-4 shadow-2xs">
                      <CardHeader className="px-4">
                        <CardDescription>Open tasks</CardDescription>
                        <CardTitle className="text-3xl">18</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="gap-3 border-border/60 bg-primary py-4 text-primary-foreground shadow-sm">
                      <CardHeader className="px-4">
                        <CardDescription className="text-primary-foreground/80">Compliance score</CardDescription>
                        <CardTitle className="text-3xl text-primary-foreground">98%</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[1.5rem] border border-border/60 bg-background/75 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Room performance</p>
                          <p className="text-lg font-bold">Weekly production trend</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="mt-6 flex h-36 items-end gap-3">
                        {[48, 66, 54, 72, 61, 78, 84].map((value, index) => (
                          <div key={index} className="flex flex-1 flex-col items-center gap-2">
                            <div
                              className="w-full rounded-t-2xl bg-[linear-gradient(180deg,rgba(0,98,57,0.92),rgba(82,139,106,0.72))]"
                              style={{ height: `${value}%` }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border/60 bg-secondary/45 p-4">
                      <p className="text-sm font-medium text-muted-foreground">Critical tasks</p>
                      <div className="mt-4 space-y-3">
                        {[
                          ["Flower Room 3", "Nutrient verification due", "09:30"],
                          ["Vault", "Lot reconciliation pending", "11:00"],
                          ["Drying", "Humidity threshold alert", "13:15"],
                        ].map(([area, task, time]) => (
                          <div
                            key={area}
                            className="rounded-2xl border border-border/60 bg-card/85 px-4 py-3 shadow-2xs"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-semibold">{area}</p>
                                <p className="text-sm text-muted-foreground">{task}</p>
                              </div>
                              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                                {time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 px-4 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/82 p-6 shadow-xs backdrop-blur-sm lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Why operators switch
              </p>
              <p className="mt-2 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
                Structured software for facilities that need accuracy, speed, and trust in every handoff.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/75 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="px-4 py-18 lg:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Platform</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Well-structured workflows that make the operation easier to run.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Every screen is designed to reduce uncertainty for the people doing the work and improve visibility for the people responsible for outcomes.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {platformHighlights.map((item) => (
              <Card
                key={item.title}
                className="rounded-[1.75rem] border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,247,244,0.92))] py-6 shadow-xs transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="px-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-accent/55 text-primary shadow-2xs">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="operations" className="border-y border-border/60 bg-secondary/22 px-4 py-18 lg:py-24">
        <div className="container mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Operations flow</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Give every team a clearer way to move work forward.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              From morning checks to end-of-day reporting, the platform keeps responsibilities visible and records connected.
            </p>

            <div className="mt-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Used across the day for</p>
              <div className="mt-4 space-y-3">
                {[
                  "Room walkthroughs and issue logging",
                  "Inventory movement and lot traceability",
                  "Supervisor review and exception management",
                  "Compliance documentation and export prep",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <Card key={step.step} className="rounded-[2rem] border-border/70 bg-card py-6 shadow-xs">
                <CardHeader className="grid gap-5 px-6 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-2xs">
                    {step.step}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                    <CardDescription className="mt-3 text-base leading-7">{step.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="px-4 py-18 lg:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <Card className="rounded-[2rem] border-border/70 bg-[linear-gradient(135deg,rgba(0,98,57,0.98),rgba(38,92,67,0.94))] py-6 text-primary-foreground shadow-lg">
              <CardHeader className="px-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Decision support</p>
                <CardTitle className="max-w-xl text-4xl font-extrabold leading-tight text-primary-foreground">
                  Turn daily operational records into a system leaders can actually manage from.
                </CardTitle>
                <CardDescription className="max-w-xl pt-2 text-base leading-7 text-primary-foreground/80">
                  See production, task execution, and compliance health in one place so managers can respond faster and with better context.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Yield variance", "-12% to +4% by room"],
                    ["Documentation lag", "Down to same-day completion"],
                    ["Escalations", "Flagged before shift close"],
                    ["Leadership visibility", "Snapshot available anytime"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                      <p className="text-sm text-primary-foreground/70">{label}</p>
                      <p className="mt-2 text-xl font-bold text-primary-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="rounded-[2rem] border-border/70 bg-card py-6 shadow-xs">
                <CardHeader className="px-6">
                  <CardTitle className="text-2xl">Compliance stays close to the work</CardTitle>
                  <CardDescription className="pt-2 text-base leading-7">
                    Documentation, checklists, and movement history live alongside operational activity instead of being patched together later.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="rounded-[2rem] border-border/70 bg-card py-6 shadow-xs">
                <CardHeader className="px-6">
                  <CardTitle className="text-2xl">A calmer experience for operators</CardTitle>
                  <CardDescription className="pt-2 text-base leading-7">
                    Clear structure, less hunting for information, and fewer handoff mistakes during busy production windows.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-18 pt-4 lg:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[2.25rem] border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(232,239,234,0.9))] p-8 shadow-md sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Get started</p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                Bring your cultivation operation into one professional system.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Give your team a cleaner workspace for daily execution and give leadership a more dependable picture of performance.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <Link to="/login" className={buttonVariants({ size: "lg", className: "min-w-44" })}>
                Sign In
              </Link>
              <Button variant="outline" size="lg" className="min-w-44 bg-background/80" disabled>
                Live Demo Soon
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-secondary/28 px-4 py-10">
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-accent/85 text-accent-foreground shadow-2xs">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-bold tracking-tight">CannaTrack</p>
              <p className="text-sm text-muted-foreground">Cultivation operations management</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CannaTrack. Designed for structured, compliant operations.</p>
        </div>
      </footer>
    </div>
  );
}
