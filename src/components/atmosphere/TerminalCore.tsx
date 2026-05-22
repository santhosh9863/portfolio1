"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

type Channel = "frontend" | "backend" | "deploy" | "system";

interface Entry {
  id: number;
  time: string;
  channel: Channel;
  text: string;
  ok: boolean;
}

interface TerminalCoreProps {
  className?: string;
  idle?: boolean;
  activeSection?: string | null;
}

const CHANNELS: Channel[] = ["frontend", "backend", "deploy", "system"];

const POOLS: Record<Channel, { text: string; ok: boolean }[]> = {
  frontend: [
    { text: "build pipeline idle", ok: true },
    { text: "responsive layout validated", ok: true },
    { text: "component tree stable", ok: false },
    { text: "static assets optimized", ok: true },
  ],
  backend: [
    { text: "firestore connection active", ok: true },
    { text: "authentication service ready", ok: true },
    { text: "realtime listener attached", ok: false },
    { text: "collection sync verified", ok: true },
  ],
  deploy: [
    { text: "production build completed", ok: true },
    { text: "edge network propagated", ok: true },
    { text: "cdn cache primed", ok: false },
    { text: "release artifacts finalized", ok: true },
  ],
  system: [
    { text: "all services operational", ok: true },
    { text: "runtime diagnostics nominal", ok: true },
    { text: "process tree healthy", ok: true },
    { text: "system clock synchronized", ok: true },
  ],
};

const CONTEXTUAL_LOGS: Record<string, { channel: Channel; text: string; ok: boolean }[]> = {
  profile: [
    { channel: "system", text: "profile loaded", ok: true },
  ],
  modules: [
    { channel: "frontend", text: "project modules initialized", ok: true },
    { channel: "backend", text: "service status verified", ok: true },
  ],
  matrix: [
    { channel: "system", text: "technology map loaded", ok: true },
  ],
  history: [
    { channel: "system", text: "activity log attached", ok: true },
  ],
  communication: [
    { channel: "system", text: "connection channels available", ok: true },
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function timestamp(): string {
  const d = new Date();
  return [
    d.getHours().toString().padStart(2, "0"),
    d.getMinutes().toString().padStart(2, "0"),
    d.getSeconds().toString().padStart(2, "0"),
  ].join(":");
}

const BURST: { channel: Channel; text: string; ok: boolean }[] = [
  { channel: "frontend", text: "pulse frontend initialized", ok: true },
  { channel: "backend", text: "firestore connection established", ok: true },
  { channel: "deploy", text: "production build verified", ok: true },
  { channel: "system", text: "all services operational", ok: true },
  { channel: "frontend", text: "component architecture stable", ok: false },
];

export function TerminalCore({ className, idle = false, activeSection }: TerminalCoreProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [prompt, setPrompt] = useState("~ $ ");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const prevSectionRef = useRef<string | null | undefined>(undefined);

  const add = useCallback((channel: Channel, text: string, ok: boolean) => {
    setEntries((prev) => {
      const entry: Entry = { id: idRef.current++, time: timestamp(), channel, text, ok };
      return [...prev.slice(-20), entry];
    });
  }, []);

  /* — Context-aware logging when section focus changes — */
  useEffect(() => {
    if (!activeSection || activeSection === prevSectionRef.current) return;
    prevSectionRef.current = activeSection;
    const logs = CONTEXTUAL_LOGS[activeSection];
    if (!logs) return;
    const t = setTimeout(() => {
      setPrompt("~ $ ");
      logs.forEach((log, i) => {
        setTimeout(() => {
          add(log.channel, log.text, log.ok);
        }, i * 400 + Math.random() * 300);
      });
    }, 300);
    return () => clearTimeout(t);
  }, [activeSection, add]);

  useEffect(() => {
    let alive = true;
    let timer: NodeJS.Timeout;

    const burst = () => {
      let i = 0;
      const next = () => {
        if (!alive) return;
        if (i >= BURST.length) { ambient(); return; }
        const e = BURST[i++];
        add(e.channel, e.text, e.ok);
        timer = setTimeout(next, 400 + Math.random() * 400);
      };
      next();
    };

    const idleFactor = idle ? 2.5 : 1;

    const ambient = () => {
      if (!alive) return;
      const channel = pick(CHANNELS);
      const log = pick(POOLS[channel]);
      timer = setTimeout(() => {
        if (!alive) return;
        add(channel, log.text, log.ok);
        setPrompt("~ $ ");
        const pause = (4000 + Math.random() * 4000) * idleFactor;
        timer = setTimeout(ambient, pause);
      }, (500 + Math.random() * 400) * idleFactor);
    };

    const kick = setTimeout(burst, 400 * idleFactor);

    return () => { alive = false; clearTimeout(timer); clearTimeout(kick); };
  }, [add, idle]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className={cn("surface-cavity--deeper flex flex-col", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-mono-sm text-muted opacity-40">Terminal</span>
        <span className="flex items-center gap-2 text-mono-sm text-muted opacity-30">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00b894] shadow-[0_0_4px_rgba(0,184,148,0.35)] animate-[led-pulse_4s_ease-in-out_infinite]" />
          listening
        </span>
      </div>

      <div ref={scrollRef} className="flex min-h-[120px] sm:min-h-[160px] max-h-[160px] sm:max-h-[200px] flex-col gap-1 overflow-y-auto overflow-x-hidden px-4 py-2" aria-live="polite" aria-label="System activity log">
        {entries.map((e) => (
          <div key={e.id} className="flex flex-wrap items-baseline gap-x-1.5 text-mono-sm leading-snug opacity-70">
            <span className="text-muted opacity-30">[{e.time}]</span>
            <span className={e.ok ? "text-correct opacity-50" : "text-foreground opacity-50"}>
              {e.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-2">
        <span className="text-mono-sm text-muted opacity-40">{prompt}</span>
        <span className="cursor-blink inline-block h-[1em] w-2 bg-[var(--typro-text)] opacity-30" />
      </div>
    </div>
  );
}
