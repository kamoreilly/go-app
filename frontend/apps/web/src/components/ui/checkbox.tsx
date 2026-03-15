import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-background text-primary-foreground shadow-2xs outline-none transition-colors after:absolute after:-inset-x-3 after:-inset-y-2 group-has-disabled/field:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary data-checked:bg-primary focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/12 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/12",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
