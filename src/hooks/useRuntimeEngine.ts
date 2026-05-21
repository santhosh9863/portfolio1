"use client";

import { useState, useEffect, useRef } from "react";

export interface RuntimeEngine {
  deploymentState: "STABLE" | "VERIFIED" | "DEPLOYING";
  syncStatus: "ACTIVE" | "SYNCING" | "IDLE";
  databaseHealth: "ONLINE" | "STABLE" | "MONITORING";
  edgeNetwork: "CONNECTED" | "STABLE" | "VERIFIED";
  buildStatus: "STABLE" | "VERIFIED" | "OPTIMAL";
  runtimeHealth: "OPTIMAL" | "STABLE" | "NOMINAL";
  lastDeployment: string;
  subsystemChecks: { name: string; status: string }[];
}

const INITIAL: RuntimeEngine = {
  deploymentState: "STABLE",
  syncStatus: "ACTIVE",
  databaseHealth: "ONLINE",
  edgeNetwork: "CONNECTED",
  buildStatus: "STABLE",
  runtimeHealth: "OPTIMAL",
  lastDeployment: "2H AGO",
  subsystemChecks: [
    { name: "DATABASE", status: "ONLINE" },
    { name: "SYNC", status: "ACTIVE" },
    { name: "CACHE", status: "STABLE" },
    { name: "EDGE", status: "CONNECTED" },
  ],
};

const DEPLOYMENT_OPTIONS = ["STABLE", "VERIFIED", "STABLE", "STABLE"] as const;
const BUILD_OPTIONS = ["STABLE", "VERIFIED", "STABLE", "OPTIMAL"] as const;
const HEALTH_OPTIONS = ["OPTIMAL", "STABLE", "OPTIMAL", "NOMINAL"] as const;

export function useRuntimeEngine(): RuntimeEngine {
  const [engine, setEngine] = useState(INITIAL);
  const lastDeployRef = useRef(Date.now() - 2 * 60 * 60 * 1000);

  useEffect(() => {
    const tick = () => {
      setEngine((prev) => ({
        ...prev,
        deploymentState: sample(DEPLOYMENT_OPTIONS),
        syncStatus: weightedSync(),
        databaseHealth: Math.random() < 0.85 ? "ONLINE" : "STABLE",
        edgeNetwork: Math.random() < 0.9 ? "CONNECTED" : "STABLE",
        buildStatus: sample(BUILD_OPTIONS),
        runtimeHealth: sample(HEALTH_OPTIONS),
        lastDeployment: formatRelativeTime(lastDeployRef.current),
      }));
    };

    const interval = setInterval(tick, 20000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, []);

  return engine;
}

function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedSync(): "ACTIVE" | "SYNCING" | "IDLE" {
  const r = Math.random();
  return r < 0.7 ? "ACTIVE" : r < 0.9 ? "SYNCING" : "IDLE";
}

function formatRelativeTime(past: number): string {
  const diff = Date.now() - past;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "<1H AGO";
  if (hours < 24) return `${hours}H AGO`;
  const days = Math.floor(hours / 24);
  return `${days}D ${hours % 24}H AGO`;
}
