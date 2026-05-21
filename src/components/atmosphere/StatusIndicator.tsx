"use client";

import { cn } from "@/lib/utils";

export type StatusState = "ONLINE" | "ACTIVE" | "SYNCING" | "PROCESSING" | "ERROR" | "IDLE" | "STABLE";

interface StatusIndicatorProps {
  status: StatusState;
  className?: string;
  led?: boolean;
}

const ledConfig: Record<StatusState, { bg: string; glow: string; anim: string }> = {
  ONLINE:    { bg: "#00b894", glow: "0 0 4px rgba(0,184,148,0.35)", anim: "animate-[led-pulse_4s_ease-in-out_infinite]" },
  ACTIVE:    { bg: "#00b894", glow: "0 0 3px rgba(0,184,148,0.25)", anim: "" },
  SYNCING:   { bg: "#0984e3", glow: "0 0 4px rgba(9,132,227,0.35)", anim: "animate-[led-breathe_6s_ease-in-out_infinite]" },
  PROCESSING:{ bg: "#74b9ff", glow: "0 0 3px rgba(116,185,255,0.25)", anim: "animate-[led-instability_2.5s_ease-in-out_infinite]" },
  ERROR:     { bg: "#d63031", glow: "0 0 5px rgba(214,48,49,0.4)", anim: "animate-[led-pulse_0.6s_ease-in-out_3]" },
  IDLE:      { bg: "#b2bec3", glow: "0 0 2px rgba(178,190,195,0.15)", anim: "" },
  STABLE:    { bg: "#00b894", glow: "0 0 3px rgba(0,184,148,0.25)", anim: "" },
};

export function StatusIndicator({ status, className, led }: StatusIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-mono-sm text-muted", className)}>
      {led && (
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full shrink-0",
            ledConfig[status].anim,
          )}
          style={{
            backgroundColor: ledConfig[status].bg,
            boxShadow: ledConfig[status].glow,
          }}
        />
      )}
      {status}
    </span>
  );
}
