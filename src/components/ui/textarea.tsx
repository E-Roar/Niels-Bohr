import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full rounded-2xl border-0 bg-background px-4 py-3 text-base shadow-neo-inset transition-all duration-300 placeholder:text-muted-foreground focus:shadow-glow-purple focus:outline-none focus:ring-2 focus:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
