"use client";

import { cn } from "@/lib/utils";

interface ScreenFrameProps {
  className?: string;
  children?: React.ReactNode;
}

export function ScreenFrame({ className, children }: ScreenFrameProps) {
  return (
    <div className={cn("display-frame-offline", className)}>
      {children || (
        <span className="text-mono-sm text-muted opacity-25">DISPLAY OFFLINE</span>
      )}
    </div>
  );
}
