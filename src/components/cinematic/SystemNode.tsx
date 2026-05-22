"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SystemNodeProps {
  title: string;
  subtitle: string;
  utilization?: string;
  currentUse?: string;
  className?: string;
}

export function SystemNode({
  title,
  subtitle,
  utilization,
  currentUse,
  className,
}: SystemNodeProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={cn(
          "rounded-lg px-2 py-2 text-center w-full flex flex-col items-center justify-center",
          open ? "system-node--open" : "system-node",
        )}
      >
        <span className="block text-mono-sm font-black text-foreground leading-snug break-words">
          {title}
        </span>
        <span className="block text-mono-sm text-secondary leading-snug mt-1 break-words">{subtitle}</span>
      </button>

      {(utilization || currentUse) && (
        <div
          className={cn(
            "grid transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          style={{ transitionDelay: open ? "40ms" : "0ms" }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "flex flex-col gap-2 px-2 pt-2 transition-all duration-200 ease-in-out",
                open
                  ? "opacity-100 blur-none"
                  : "opacity-0 blur-[2px]",
              )}
              style={{ transitionDelay: open ? "120ms" : "0ms" }}
            >
              {utilization && (
                <div className="flex items-baseline gap-2">
                  <span className="text-mono-sm text-secondary">
                    UTILIZATION
                  </span>
                  <span className="text-mono-sm text-foreground">
                    {utilization}
                  </span>
                </div>
              )}
              {currentUse && (
                <div className="flex items-baseline gap-2">
                  <span className="text-mono-sm text-secondary">CURRENT</span>
                  <span className="text-mono-sm text-foreground">
                    {currentUse}
                  </span>
                </div>
              )}
              <span className="text-mono-xs text-muted opacity-25">
                ─── ACTIVE ───
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
