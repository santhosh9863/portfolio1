"use client";

import { cn } from "@/lib/utils";

interface InsetPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function InsetPanel({
  children,
  className,
  as: Tag = "div",
}: InsetPanelProps) {
  return (
    <Tag className={cn("well-typro", className)}>
      {children}
    </Tag>
  );
}
