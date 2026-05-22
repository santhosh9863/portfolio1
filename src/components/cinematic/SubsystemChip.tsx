"use client";

import { cn } from "@/lib/utils";

interface SubsystemChipProps {
  children: React.ReactNode;
  className?: string;
}

export function SubsystemChip({
  children,
  className,
}: SubsystemChipProps) {
  return (
    <div
      className={cn(
        "subsystem-chip rounded-md px-3 py-1.5",
        className,
      )}
    >
      <span className="text-mono-xs font-semibold tracking-wide text-secondary">
        {children}
      </span>
    </div>
  );
}