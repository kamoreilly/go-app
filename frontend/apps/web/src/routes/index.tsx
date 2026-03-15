import { Link, createFileRoute } from "@tanstack/react-router";
import { 
  ArrowRight, 
  BadgeCheck,
  BarChart3, 
  Bell,
  ClipboardCheck, 
  Clock,
  Fingerprint,
  Leaf, 
  Lock,
  Package,
  Search,
  ShieldCheck, 
  Sparkles, 
  Sprout, 
  Activity,
  TrendingUp,
  Users,
  Layers,
  CheckCircle2,
  PieChart,
  Zap,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const lifecycleStages = [
  {
    title: "Genetic Selection",
    detail: "Choose the high-performing phenotype before a room ever opens.",
    icon: Search,
    angle: 0,
  },
  {
    title: "Propagation",
    detail: "Clone and root with standardized recipes and checkpoints.",
    icon: Sprout,
    angle: 72,
  },
  {
    title: "Vegetative",
    detail: "Track canopy, feed, and environmental signals in one pass.",
    icon: Leaf,
    angle: 144,
  },
  {
    title: "Flowering",
    detail: "Surface deviations early while yield potential is still recoverable.",
    icon: Sparkles,
    angle: 216,
  },
  {
    title: "Harvest",
    detail: "Hand off ready lots with live labor and compliance context attached.",
    icon: Package,
    angle: 288,
  },
];

const complianceEvents = [
  {
    title: "Identity Verification",
    detail: "Every operator, room, and batch interaction is attested before work begins.",
    hash: "0x2f1a",
    icon: Fingerprint,
  },
  {
    title: "Batch Signing",
    detail: "Plant actions inherit the verified identity and append secure event metadata.",
    hash: "0x6b74",
    icon: BadgeCheck,
  },
  {
    title: "Transfer Lock",
    detail: "Inventory moves stay hash-linked across rooms, operators, and timestamps.",
    hash: "0xc913",
    icon: Lock,
  },
  {
    title: "Audit Recording",
    detail: "Final records land as a tamper-evident trail ready for inspection.",
    hash: "0xff2c",
    icon: ClipboardCheck,
  },
];

const workforceMetrics = [
  {
    title: "Transplant queue",
    value: "102% Goal Speed",
    width: "100%",
  },
  {
    title: "Flower room reset",
    value: "87% On Track",
    width: "87%",
  },
  {
    title: "Packaging handoff",
    value: "94% Completion",
    width: "94%",
  },
  {
    title: "QA exception sweep",
    value: "71% Resolved",
    width: "71%",
  },
];

const activeOperators = [
  {
    name: "Avery Stone",
    role: "Propagation Lead",
    status: "Live in Room A3",
    detail: "Humidity recovery checklist synced 12s ago.",
  },
  {
    name: "Jordan Hale",
    role: "Flower Supervisor",
    status: "Pacing harvest block",
    detail: "Crew speed is pacing 6.4 minutes ahead of plan.",
  },
  {
    name: "Mika Torres",
    role: "Compliance Operator",
    status: "Resolving exception",
    detail: "Two batch signatures pending final witness confirmation.",
  },
];

function MockDashboard() {
  return (
    <div className="relative rounded-2xl border border-border/50 bg-card/50 p-6 shadow-2xl backdrop-blur-md overflow-hidden group transition-all duration-500 hover:shadow-primary/10 hover:border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
              <Activity className="h-4 w-4 animate-pulse" />
              Live Operations
            </h3>
            <div className="h-1.5 w-32 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3 animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3].map((seedValue) => (
              <div key={seedValue} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden ring-2 ring-primary/10">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${seedValue}`} alt="User" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-background/60 border-border/40 p-4 space-y-2 relative overflow-hidden group-hover:bg-background/80 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sprout className="h-5 w-5" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Active Batches</p>
              <p className="text-2xl font-black italic">128</p>
            </div>
          </Card>
          <Card className="bg-background/60 border-border/40 p-4 space-y-2 relative overflow-hidden group-hover:bg-background/80 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs font-black text-blue-500">+12%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Team Flow</p>
              <p className="text-2xl font-black italic">94%</p>
            </div>
          </Card>
        </div>

        {/* Graph Visual */}
        <div className="space-y-4 rounded-xl bg-muted/30 p-4 border border-border/20">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-2"><BarChart3 className="h-3 w-3" /> Production Cycle</span>
            <span className="text-primary tracking-tighter">Est. Yield: 92.4%</span>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 85].map((height, index) => (
              <div 
                key={`${height}-${index}`} 
                className="flex-1 bg-primary/20 hover:bg-primary transition-all duration-500 rounded-t-md cursor-pointer group/bar relative" 
                style={{ height: `${height}%` }}
              >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg border border-border">
                  {height}%
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task List Reveal (Simulated Tasks) */}
        <div className="space-y-3 opacity-80">
          {[1, 2].map((placeholderIndex) => (
            <div key={placeholderIndex} className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/10 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Skeleton className="h-6 w-6 rounded-sm" />
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/4" />
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Floating Element */}
      <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-1000" />
    </div>
  );
}

function AnimatedFlow() {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,98,57,0.08),transparent_70%)] -z-10" />
      
      <div className="flex items-center gap-6 md:gap-16">
        {/* Step 1 */}
        <div className="relative flex flex-col items-center group scale-90 md:scale-100">
           <div className="p-5 rounded-3xl bg-card border-2 border-border shadow-xl z-10 relative transition-transform group-hover:-translate-y-2">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <span className="mt-4 text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Intake</span>
          <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
        </div>
        
        {/* Connector 1 */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 md:w-24 h-1 bg-muted rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_1.5s_infinite_linear] bg-[length:200%_100%]" />
          </div>
        </div>

        {/* Step 2 (Centerpiece) */}
        <div className="relative flex flex-col items-center group scale-110 md:scale-125">
          <div className="p-7 rounded-[2rem] bg-primary shadow-[0_20px_50px_rgba(var(--primary),0.3)] z-10 relative transition-all group-hover:scale-105">
            <Layers className="h-10 w-10 text-primary-foreground" />
          </div>
          <span className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary animate-pulse">Curation flow</span>
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-[40px] animate-pulse -z-10" />
        </div>

        {/* Connector 2 */}
        <div className="flex flex-col items-center justify-center">
           <div className="w-12 md:w-24 h-1 bg-muted rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_1.5s_infinite_linear] bg-[length:200%_100%] [animation-direction:reverse]" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center group scale-90 md:scale-100">
          <div className="p-5 rounded-3xl bg-card border-2 border-border shadow-xl z-10 relative transition-transform group-hover:-translate-y-2">
            <PieChart className="h-8 w-8 text-primary" />
          </div>
          <span className="mt-4 text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Insight</span>
          <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
        </div>
      </div>
    </div>
  );
}

function CultivationOrbit() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/70 p-6 shadow-2xl backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,98,57,0.1),transparent_62%)]" />
      <div className="absolute inset-[12%] rounded-full border border-primary/15 border-dashed" />
      <div className="absolute inset-[22%] rounded-full border border-primary/10" />
      <div className="absolute inset-[34%] rounded-full border border-primary/10 border-dashed" />

      <div className="animate-orbit-spin absolute inset-[14%]">
        {lifecycleStages.map((stage) => {
          const StageIcon = stage.icon;

          return (
            <div
              key={stage.title}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${stage.angle}deg) translateY(calc(-1 * clamp(7.25rem, 18vw, 12rem)))` }}
            >
              <div
                className="animate-orbit-counter w-36 rounded-[1.5rem] border border-border/60 bg-background/85 p-4 text-center shadow-lg backdrop-blur-sm md:w-40"
                style={{ animationDelay: `${stage.angle * -0.04}s` }}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                  <StageIcon className="h-5 w-5" />
                </div>
                <p className="text-sm font-black leading-tight tracking-tight">{stage.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border border-primary/20 bg-background/85 text-center shadow-[0_0_0_10px_rgba(0,98,57,0.05)] backdrop-blur-sm">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_40px_rgba(0,98,57,0.3)]">
          <Sprout className="h-9 w-9" />
        </div>
        <p className="relative mt-4 text-xs font-black uppercase tracking-[0.22em] text-primary">Biological Cycle</p>
      </div>
    </div>
  );
}

function ComplianceTimeline() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/75 p-6 shadow-xl backdrop-blur-sm md:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Secure Event Timeline</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight">Hash-linked records from first touch to final audit.</h3>
        </div>
        <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary md:block">
          Immutable Chain of Custody
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3">
        {complianceEvents.map((event, eventIndex) => {
          const EventIcon = event.icon;
          const isLast = eventIndex === complianceEvents.length - 1;

          return (
            <div key={event.title} className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:gap-3">
              <div className="group relative flex-1 overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/80 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <EventIcon className="h-5 w-5" />
                  </div>
                  <div className="rounded-full border border-border/60 bg-card px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                    {event.hash}
                  </div>
                </div>
                <p className="text-lg font-black tracking-tight">{event.title}</p>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">{event.detail}</p>
              </div>

              {!isLast ? (
                <div className="flex items-center justify-center px-2 md:w-20 md:px-0">
                  <div className="relative h-8 w-full md:h-1 md:w-full">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-border md:left-0 md:top-1/2 md:h-1 md:w-full md:-translate-y-1/2 md:translate-x-0" />
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 overflow-hidden rounded-full md:left-0 md:top-1/2 md:h-1 md:w-full md:-translate-y-1/2 md:translate-x-0">
                      <div className="h-full w-full animate-[shimmer_1.8s_infinite_linear] bg-[length:200%_100%] bg-gradient-to-b from-transparent via-primary to-transparent md:bg-gradient-to-r" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamFlowDashboard() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="overflow-hidden border-border/60 bg-card/75 shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-3 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Flow Metrics</p>
              <CardTitle className="mt-2 text-2xl font-black tracking-tight">Synchronization Dashboard</CardTitle>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              Live Pulse
            </div>
          </div>
          <p className="text-sm font-medium leading-6 text-muted-foreground">
            Watch the room-level workload shift in real time, then route people where throughput needs help most.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 p-6 pt-0 md:p-8 md:pt-0">
          {workforceMetrics.map((metric) => (
            <div key={metric.title} className="rounded-[1.5rem] border border-border/60 bg-background/85 p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-muted-foreground">{metric.title}</p>
                <p className="text-sm font-black text-primary">{metric.value}</p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted/90">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(0,98,57,0.7),rgba(0,98,57,1),rgba(111,184,138,0.9))] shadow-[0_0_18px_rgba(0,98,57,0.28)]"
                  style={{ width: metric.width }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border/60 bg-card/75 shadow-xl backdrop-blur-sm">
        <CardHeader className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Active Operator Grid</p>
              <CardTitle className="mt-2 text-2xl font-black tracking-tight">Workforce orchestration in motion.</CardTitle>
            </div>
            <Users className="h-6 w-6 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 pt-0 md:p-8 md:pt-0">
          {activeOperators.map((operator) => (
            <div key={operator.name} className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/85 p-5 shadow-sm">
              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                Synced
              </div>
              <p className="text-lg font-black tracking-tight">{operator.name}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">{operator.role}</p>
              <div className="mt-5 flex items-center gap-3 text-sm font-bold text-foreground">
                <Bell className="h-4 w-4 text-primary" />
                {operator.status}
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">{operator.detail}</p>
              <div className="mt-5 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Live Queue
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Action
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function HomeComponent() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      {/* Immersive Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      <main className="container mx-auto px-6 pt-16 pb-32">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center mb-40">
          <div className="space-y-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-[0.2em] shadow-sm">
                <Zap className="h-4 w-4 fill-primary" />
                The New Operational Standard
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-balance">
              Master the <span className="text-primary italic relative">
                Pulse
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span> of your Production.
            </h1>
            
            <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground font-bold leading-tight mx-auto lg:mx-0">
              Stop fighting spreadsheets. Start orchestrating yield. The command center built for the high-stakes world of modern cultivation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
              <Link to="/login" className={buttonVariants({ size: "lg", className: "h-16 px-10 text-xl font-black rounded-[1.25rem] shadow-2xl shadow-primary/30 hover:scale-105 transition-transform" })}>
                Launch Platform <ArrowRight className="ml-3 h-6 w-6 stroke-[3px]" />
              </Link>
              <a
                href="#platform"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-16 px-10 text-xl font-black rounded-[1.25rem] border-2 bg-background/50 backdrop-blur-sm hover:bg-background",
                })}
              >
                See Feature Visuals
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((seedValue) => (
                  <div key={seedValue} className="h-12 w-12 rounded-2xl border-4 border-background bg-card overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=p${seedValue}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-lg font-black italic">500+ Operations</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Optimized Monthly</p>
              </div>
            </div>
          </div>

          <div className="relative isolate">
             <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-90 animate-pulse -z-10" />
             <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2.5rem] blur opacity-50 -z-10" />
             <MockDashboard />
          </div>
        </section>

        {/* Dynamic Process Flow */}
        <section id="platform" className="mb-40 relative scroll-mt-28">
          <div className="max-w-xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Unified Intelligence Layer</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground text-lg font-bold">Bridging the gap between physical soil and digital decisions with real-time feedback loops.</p>
          </div>
          <AnimatedFlow />
        </section>

        <section id="operations" className="mb-36 grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-center scroll-mt-28">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Sprout className="h-4 w-4" />
              Sovereign Lifecycle Control
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl font-black tracking-tighter md:text-5xl">A circular command model for the full cultivation lifecycle.</h2>
              <p className="max-w-2xl text-lg font-medium leading-8 text-muted-foreground">
                The operating layer follows the biology of the plant, not the limitations of spreadsheets. Every stage stays connected to the same rotating system of labor, environment, and inventory intelligence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Central Orbit</p>
                <p className="mt-3 text-lg font-black tracking-tight">A pulsing sprout anchors every room transition.</p>
              </div>
              <div className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Stage Awareness</p>
                <p className="mt-3 text-lg font-black tracking-tight">Genetics, propagation, growth, flower, and harvest stay in one loop.</p>
              </div>
            </div>
          </div>

          <CultivationOrbit />
        </section>

        <section id="compliance" className="mb-36 scroll-mt-28">
          <div className="mb-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <ShieldCheck className="h-4 w-4" />
              Immutable Chain of Custody
            </div>
            <h2 className="text-4xl font-black tracking-tighter md:text-5xl">Compliance becomes a visible event stream instead of a cleanup task.</h2>
            <p className="text-lg font-medium leading-8 text-muted-foreground">
              Each checkpoint advances with secure, hash-linked progress indicators so identity verification, transfers, and audit recording remain legible to operators and defensible to regulators.
            </p>
          </div>
          <ComplianceTimeline />
        </section>

        <section className="mb-36">
          <div className="mb-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Users className="h-4 w-4" />
              Workforce Orchestration
            </div>
            <h2 className="text-4xl font-black tracking-tighter md:text-5xl">A team flow view with the real pulse of the floor.</h2>
            <p className="text-lg font-medium leading-8 text-muted-foreground">
              Live flow metrics stay next to active operator cards so supervisors can understand pace, blockers, and verified actions without switching context.
            </p>
          </div>
          <TeamFlowDashboard />
        </section>

        <section className="pb-10">
          <Link
            to="/login"
            className="integration-strike group relative block overflow-hidden rounded-full border border-primary/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(233,239,234,0.92))] p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-1 md:p-12"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(0,98,57,0.12),transparent_68%)] opacity-80" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  <Layers className="h-4 w-4" />
                  Massive Integration Strike
                </div>
                <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Connect the entire grow, then move straight into the login experience.</h2>
                <p className="max-w-2xl text-lg font-medium leading-8 text-muted-foreground">
                  Operations, compliance, and workforce execution converge into one system of record. Enter the platform where the live data already knows what needs to happen next.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4 self-start rounded-full border border-primary/20 bg-background/80 px-5 py-4 shadow-lg backdrop-blur-sm md:px-7">
                <span className="text-sm font-black uppercase tracking-[0.18em] text-primary">Enter Platform</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_30px_rgba(0,98,57,0.35)] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
