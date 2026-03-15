import { Link, createRouter as createTanStackRouter } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Loader from "./components/loader";
import "./index.css";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader className="items-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-border/70 bg-accent/80 text-accent-foreground shadow-xs">
            <Leaf className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl">Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm leading-7 text-muted-foreground">
            This page does not exist, or it may have been moved to a different route.
          </p>
          <Link to="/" className={buttonVariants({ className: "w-full" })}>
            Back to dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {},
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: NotFound,
    Wrap: ({ children }) => <>{children}</>,
  });
  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
