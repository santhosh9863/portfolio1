"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SystemClockProps {
  className?: string;
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

const TZ = "IST";

export function SystemClock({ className }: SystemClockProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setTime(new Date()), 0);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => { clearTimeout(id); clearInterval(interval); };
  }, []);

  if (!time) return null;

  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  const ss = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className={cn("flex flex-col items-end leading-none", className)}>
      <span className="text-mono-sm text-muted tracking-wider">
        {hh}:{mm}:{ss}
      </span>
      <span className="text-mono-sm text-muted opacity-40 mt-0.5">
        {MONTHS[time.getMonth()]} {time.getDate().toString().padStart(2, "0")} {time.getFullYear()}
      </span>
      <span className="text-mono-xs text-muted opacity-25 mt-px">
        {TZ}
      </span>
    </div>
  );
}
