"use client";

import { cn } from "@/lib/utils";

interface HeaderBarProps {
  title: string;
  version?: string;
  className?: string;
  statusRail?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeaderBar({
  title,
  version,
  className,
  statusRail,
  children,
}: HeaderBarProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-label text-muted">{title}</span>
        <div className="flex items-center gap-3">
          {children}
          {version && <span className="text-mono-sm text-muted">{version}</span>}
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
