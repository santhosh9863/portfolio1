"use client";

import { cn } from "@/lib/utils";

interface SubsystemChipProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SubsystemChip({
  children,
  className,
  onClick,
}: SubsystemChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "subsystem-chip rounded-md px-2 py-1 text-mono-sm text-secondary",
        className,
      )}
    >
      {children}
    </button>
  );
}
