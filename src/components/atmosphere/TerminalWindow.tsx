"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LogEntry {
  timestamp: string;
  event: string;
}

interface TerminalWindowProps {
  entries: LogEntry[];
  className?: string;
  streaming?: boolean;
}

const ambientLines = [
  "awaiting system input",
  "deployment channel active",
  "firebase runtime stable",
];

export function TerminalWindow({
  entries,
  className,
  streaming = false,
}: TerminalWindowProps) {
  const [visibleCount, setVisibleCount] = useState(streaming ? 0 : entries.length);

  useEffect(() => {
    if (!streaming) return;
    if (visibleCount >= entries.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 600);
    return () => clearTimeout(timer);
  }, [visibleCount, entries.length, streaming]);

  const done = !streaming || visibleCount >= entries.length;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {entries.map((entry, i) => (
        <div
          key={entry.timestamp}
          className={cn(
            "flex items-baseline gap-4 transition-all duration-200 ease-in-out",
            i < visibleCount
              ? "opacity-100 blur-none"
              : "opacity-0 blur-[2px]",
          )}
          style={{
            transitionDelay: streaming && i < visibleCount ? `${i * 100}ms` : "0ms",
          }}
        >
          <span className="shrink-0 text-mono-sm text-muted">
            [{entry.timestamp}]
          </span>
          <span
            className={cn(
              "text-body-sm",
              streaming && i === visibleCount - 1
                ? "text-accent"
                : "text-foreground",
            )}
          >
            {entry.event}
          </span>
        </div>
      ))}

      {done && ambientLines.map((line, i) => (
        <div
          key={`ambient-${i}`}
          className="flex items-baseline gap-4 opacity-30"
        >
          <span className="shrink-0 text-mono-sm text-muted">[·]</span>
          <span className="text-body-sm text-muted">{line}_</span>
        </div>
      ))}

      {streaming && (
        <span className="inline-block w-2 h-[1em] bg-[var(--typro-text)] animate-[blink-cursor_1s_step-end_infinite] opacity-30" />
      )}
    </div>
  );
}
