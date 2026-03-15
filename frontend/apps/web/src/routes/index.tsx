import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, 
  Sprout, 
  Package, 
  ClipboardCheck, 
  Users, 
  BarChart3 
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const features = [
  {
    icon: Sprout,
    title: "Cultivation Tracking",
    description: "Track your plants from seed to harvest. Monitor growth stages, watering schedules, nutrient regimens, and environmental conditions in real-time."
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Manage your seed bank, supplies, and harvested products. Track quantities, locations, and expiration dates with ease."
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Reporting",
    description: "Generate compliant reports for regulatory requirements. Stay audit-ready with automated documentation and traceability."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Assign roles and permissions to your team. Track tasks, log activities, and maintain accountability across your operation."
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Make data-driven decisions with comprehensive analytics. Track yields, costs, strain performance, and identify optimization opportunities."
  },
  {
    icon: Leaf,
    title: "Seed to Sale",
    description: "Complete visibility across your entire operation. From propagation to distribution, track every step of your product's journey."
  }
];

function HomeComponent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Trusted by licensed cultivators
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Complete Cultivation Management
              <span className="text-primary block mt-2">From Seed to Sale</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              CannaTrack is the all-in-one platform for cannabis cultivators. 
              Track every stage of your operation, stay compliant, and maximize yields 
              with powerful analytics and team collaboration tools.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need to Run Your Operation
            </h2>
            <p className="text-lg text-muted-foreground">
              Built by cultivators, for cultivators. Our platform handles the complexity 
              so you can focus on growing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-semibold">CannaTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 CannaTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
