import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Marquee({
  children,
  reverse = false,
  slow = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-mask relative w-full overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track",
          reverse ? "animate-marquee-rev" : slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
