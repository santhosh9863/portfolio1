"use client";

import { cn } from "@/lib/utils";

interface DataRowProps {
  label: string;
  value: string;
  labelWidth?: string;
  className?: string;
  mono?: boolean;
}

export function DataRow({
  label,
  value,
  labelWidth = "w-20",
  className,
  mono,
}: DataRowProps) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      <span
        className={cn(
          "shrink-0 text-mono-sm text-muted",
          labelWidth,
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          mono ? "text-mono-sm" : "text-body-sm",
          "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
