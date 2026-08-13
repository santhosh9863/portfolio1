"use client";

import { cn } from "@/lib/utils";

interface SystemNodeProps {
  title: string;
  subtitle: string;
  usage?: string;
  featured?: boolean;
  className?: string;
}

export function SystemNode({
  title,
  subtitle,
  usage,
  featured,
  className,
}: SystemNodeProps) {
  return (
    <div
      className={cn(
        "rounded-lg px-3 py-3 flex flex-col items-center justify-center gap-1 system-node",
        featured && "system-node--featured",
        className,
      )}
    >
      <span className="block text-mono-sm font-black text-foreground leading-snug break-words">
        {title}
      </span>
      <span className="block text-mono-xs text-secondary leading-snug break-words max-w-[22ch]">
        {subtitle}
      </span>
      {usage && (
        <span className="block text-mono-xs text-muted opacity-35 tracking-wider leading-none mt-0.5">
          {usage}
        </span>
      )}
    </div>
  );
}
