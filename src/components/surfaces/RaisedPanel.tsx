"use client";

import { cn } from "@/lib/utils";

interface RaisedPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function RaisedPanel({
  children,
  className,
  as: Tag = "div",
}: RaisedPanelProps) {
  return (
    <Tag
      className={cn(
        "surface-raised rounded-xl transition-all duration-40 ease-out",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
