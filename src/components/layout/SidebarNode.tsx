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
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex-1 rounded-lg py-2 text-center text-label",
        active
          ? "surface-pressed text-secondary"
          : "btn-typro-sm text-secondary",
        className,
      )}
    >
      <span className={cn("sidebar-accent", active && "sidebar-accent--active")} />
      {label}
    </button>
  );
}
