"use client";

import { cn } from "@/lib/utils";

interface HeaderBarProps {
  title: string;
  className?: string;
  statusRail?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeaderBar({
  title,
  className,
  statusRail,
  children,
}: HeaderBarProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-body-sm font-semibold text-foreground">{title}</span>
        <div className="flex items-center gap-3">
          {children}
        </div>
      </div>
      {statusRail && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-mono-sm text-muted">
            {statusRail}
          </div>
        </div>
      )}
    </div>
  );
}
