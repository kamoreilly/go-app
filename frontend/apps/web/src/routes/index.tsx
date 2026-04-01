import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Sprout,
  Activity,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const features = [
  {
    title: "Real-time Monitoring",
    description:
      "Live telemetry across every batch, room, and stage. Catch deviations before they become costly problems.",
    icon: Activity,
  },
  {
    title: "Compliance Automation",
    description:
      "Immutable, hash-linked records built for state and federal reporting. Audit-ready, always.",
    icon: ShieldCheck,
  },
  {
    title: "Yield Intelligence",
    description:
      "AI-driven analytics that surface insights to help you maximize output and reduce waste cycle over cycle.",
    icon: BarChart3,
  },
  {
    title: "Team Operations",
    description:
      "Role-based access, task assignments, and SOPs in one unified workflow platform for your entire team.",
    icon: Users,
  },
  {
    title: "Inventory Tracking",
    description:
      "Seed-to-sale visibility with full chain-of-custody across every SKU and stage of your operation.",
    icon: Layers,
  },
  {
    title: "Performance Trends",
    description:
      "Historical analysis and forecasting to continuously refine your cultivation cycles.",
    icon: TrendingUp,
  },
];

const steps = [
  {
    step: "01",
    title: "Connect your facility",
    description:
      "Onboard your rooms, strains, and team in minutes with zero complex configuration.",
  },
  {
    step: "02",
    title: "Track every stage",
    description:
      "From seed to harvest, monitor every variable that affects your yield and quality.",
  },
  {
    step: "03",
    title: "Optimize and scale",
    description:
      "Leverage data-driven insights to refine processes and grow your operation confidently.",
  },
];

const yieldMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const yieldData = [
  { x: 0,   y: 128 },
  { x: 80,  y: 105 },
  { x: 160, y: 118 },
  { x: 240, y: 78  },
  { x: 320, y: 58  },
  { x: 400, y: 42  },
];

// Build smooth cubic bezier path from data points
function buildPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) / 2;
    const cp1y = pts[i].y;
    const cp2x = pts[i].x + (pts[i + 1].x - pts[i].x) / 2;
    const cp2y = pts[i + 1].y;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return d;
}

function YieldChart() {
  const linePath = buildPath(yieldData);
  const areaPath =
    linePath +
    ` L ${yieldData[yieldData.length - 1].x},180 L ${yieldData[0].x},180 Z`;

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-md">
      {/* Card header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Yield Overview</p>
          <p className="text-xs text-muted-foreground">Last 6 months · lbs per harvest</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          <TrendingUp className="h-3 w-3" />
          +24% vs prior period
        </span>
      </div>

      {/* SVG chart */}
      <svg
        viewBox="0 0 400 180"
        className="w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[40, 90, 140].map((y) => (
          <line
            key={y}
            x1="0" y1={y} x2="400" y2={y}
            stroke="currentColor"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#yieldGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data point dots */}
        {yieldData.map((pt) => (
          <circle
            key={pt.x}
            cx={pt.x}
            cy={pt.y}
            r="4"
            fill="var(--color-primary)"
            stroke="var(--color-card)"
            strokeWidth="2"
          />
        ))}

        {/* X-axis month labels */}
        {yieldData.map((pt, i) => (
          <text
            key={pt.x}
            x={pt.x}
            y="175"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.4"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            {yieldMonths[i]}
          </text>
        ))}
      </svg>

      {/* Bottom KPIs */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
        {[
          { label: "Avg. yield", value: "182 lbs" },
          { label: "Top strain", value: "Blue Dream" },
          { label: "Compliance", value: "100%" },
        ].map((kpi) => (
          <div key={kpi.label}>
            <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
            <p className="text-sm font-bold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeComponent() {
  return (
    <div className="bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 right-0 h-[560px] w-[560px] rounded-full bg-primary/6 blur-[120px]" />
          <div className="absolute -bottom-10 left-0 h-[400px] w-[400px] rounded-full bg-secondary/50 blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Now in Early Access
              </div>
              <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-balance md:text-6xl">
                Cultivation
                <br />
                <span className="text-primary">command center.</span>
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
                CannaTrack gives cultivators complete visibility and control — from
                live environmental monitoring to compliance-ready reporting, all in
                one platform.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/login"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "h-12 rounded-xl px-8 text-base font-semibold shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30",
                  })}
                >
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "h-12 rounded-xl border-border px-8 text-base font-semibold transition-all hover:bg-muted",
                  })}
                >
                  Book a demo
                </Link>
              </div>
            </div>

            {/* Right: yield chart card */}
            <div className="hidden lg:block">
              <YieldChart />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="container mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Platform
          </p>
          <h2 className="text-3xl font-black tracking-tight text-balance md:text-4xl">
            Everything your operation needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Purpose-built tools for cultivators who take quality, compliance, and
            scale seriously.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xs transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="border-y border-border/40 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Up and running in hours,
              <br />
              not months.
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] hidden h-px bg-border/60 md:block" />
                )}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/8 text-sm font-black text-primary">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/60">
        <div className="container mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-sm font-black uppercase tracking-tight text-primary">
                CannaTrack
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CannaTrack Systems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
