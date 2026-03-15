import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-border/75 bg-background px-4 py-2 text-sm shadow-2xs outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/60 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/12 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/12",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
