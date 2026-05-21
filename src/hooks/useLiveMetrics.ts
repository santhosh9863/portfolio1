"use client";

import { useState, useEffect } from "react";

export interface LiveMetrics {
  uptime: number;
  memory: number;
  networkState: "STABLE" | "SYNCING";
  latency: number;
}

const INITIAL: LiveMetrics = {
  uptime: 142 * 60 + 21,
  memory: 74,
  networkState: "STABLE",
  latency: 12,
};

export function useLiveMetrics(): LiveMetrics {
  const [metrics, setMetrics] = useState(INITIAL);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        uptime: prev.uptime + 1,
        memory: clamp(prev.memory + (Math.random() * 2 - 1), 68, 82),
        latency: clamp(prev.latency + (Math.random() * 4 - 2), 6, 20),
        networkState:
          prev.networkState === "STABLE" && Math.random() < 0.15
            ? "SYNCING"
            : prev.networkState === "SYNCING" && Math.random() < 0.3
              ? "STABLE"
              : prev.networkState,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}

function clamp(value: number, min: number, max: number): number {
  return Math.round(Math.max(min, Math.min(max, value)));
}
