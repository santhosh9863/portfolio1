"use client";

import { cn } from "@/lib/utils";

interface SidebarNodeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SidebarNode({
  label,
  active,
  onClick,
  className,
}: SidebarNodeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex-1 rounded-lg py-2 text-center text-label transition-all duration-40 ease-out",
        active
          ? "bg-[var(--typro-bg-secondary)] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] text-muted"
          : "btn-typro-sm text-muted hover:shadow-[4px_4px_8px_rgba(163,177,198,0.65),-4px_-4px_8px_rgba(255,255,255,0.95)]",
        className,
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-accent" />
      )}
      {label}
    </button>
  );
}
