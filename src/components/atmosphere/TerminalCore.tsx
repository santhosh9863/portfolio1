"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

type Channel = "FLUTTER" | "FIREBASE" | "NEXTJS" | "DEPLOYMENT" | "GIT" | "UI" | "SYSTEM";

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

const CHANNELS: Channel[] = ["FLUTTER", "FIREBASE", "NEXTJS", "DEPLOYMENT", "GIT", "UI", "SYSTEM"];

const POOLS: Record<Channel, { text: string; ok: boolean }[]> = {
  FLUTTER: [
    { text: "responsive widget tree stabilized", ok: true },
    { text: "cross-platform build verified", ok: true },
    { text: "widget lifecycle optimized", ok: false },
    { text: "hot reload ready", ok: true },
    { text: "dart runtime initialized", ok: true },
  ],
  FIREBASE: [
    { text: "realtime listener attached", ok: true },
    { text: "firestore operational", ok: true },
    { text: "authentication service active", ok: false },
    { text: "collection sync verified", ok: true },
    { text: "security rules validated", ok: false },
  ],
  NEXTJS: [
    { text: "hydration completed successfully", ok: true },
    { text: "edge network propagated", ok: false },
    { text: "production build verified", ok: true },
    { text: "static assets optimized", ok: true },
    { text: "api routes active", ok: false },
  ],
  DEPLOYMENT: [
    { text: "release artifact uploaded", ok: true },
    { text: "apk build finalized", ok: false },
    { text: "vercel deployment stable", ok: true },
    { text: "cdn cache primed", ok: true },
    { text: "pipeline configuration valid", ok: false },
  ],
  GIT: [
    { text: "main branch up-to-date", ok: true },
    { text: "release tag pushed", ok: false },
    { text: "worktree clean", ok: true },
    { text: "remote origin reachable", ok: true },
    { text: "dependency lock verified", ok: false },
  ],
  UI: [
    { text: "neumorphic render system calibrated", ok: true },
    { text: "depth pressure system stable", ok: false },
    { text: "interaction timing refined", ok: true },
    { text: "responsive layout stabilized", ok: true },
    { text: "component scaling verified", ok: false },
  ],
  SYSTEM: [
    { text: "all subsystems operational", ok: true },
    { text: "runtime diagnostics stable", ok: true },
    { text: "process tree healthy", ok: false },
    { text: "disk usage nominal", ok: true },
    { text: "system clock synchronized", ok: true },
  ],
};

const CONTEXTUAL_LOGS: Record<string, { channel: Channel; text: string; ok: boolean }[]> = {
  profile: [
    { channel: "SYSTEM", text: "system profile initialized", ok: true },
    { channel: "FLUTTER", text: "user session active", ok: true },
  ],
  modules: [
    { channel: "FLUTTER", text: "pulse system runtime initialized", ok: true },
    { channel: "FIREBASE", text: "attendance engine synchronized", ok: true },
    { channel: "NEXTJS", text: "web platform build verified", ok: true },
    { channel: "UI", text: "typro render system calibrated", ok: false },
  ],
  matrix: [
    { channel: "SYSTEM", text: "technology matrix loaded", ok: true },
    { channel: "NEXTJS", text: "frontend architecture verified", ok: true },
    { channel: "GIT", text: "remote repositories reachable", ok: true },
  ],
  history: [
    { channel: "SYSTEM", text: "operational log buffer attached", ok: true },
    { channel: "GIT", text: "worktree clean", ok: true },
    { channel: "DEPLOYMENT", text: "release history indexed", ok: false },
  ],
  communication: [
    { channel: "SYSTEM", text: "communication channels available", ok: true },
    { channel: "GIT", text: "external links verified", ok: true },
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
  { channel: "FLUTTER", text: "responsive widget tree stabilized", ok: true },
  { channel: "FIREBASE", text: "realtime listener attached", ok: true },
  { channel: "NEXTJS", text: "hydration completed successfully", ok: true },
  { channel: "DEPLOYMENT", text: "vercel deployment stable", ok: true },
  { channel: "FIREBASE", text: "firestore operational", ok: true },
  { channel: "GIT", text: "main branch up-to-date", ok: true },
  { channel: "SYSTEM", text: "all subsystems operational", ok: true },
  { channel: "UI", text: "neumorphic render system calibrated", ok: false },
];

export function TerminalCore({ className, idle = false, activeSection }: TerminalCoreProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [prompt, setPrompt] = useState("system@santhosh-os:~$ ");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const prevSectionRef = useRef<string | null | undefined>(undefined);

  const add = useCallback((channel: Channel, text: string, ok: boolean) => {
    setEntries((prev) => {
      const entry: Entry = { id: idRef.current++, time: timestamp(), channel, text, ok };
      return [...prev.slice(-39), entry];
    });
  }, []);

  /* — Context-aware logging when section focus changes — */
  useEffect(() => {
    if (!activeSection || activeSection === prevSectionRef.current) return;
    prevSectionRef.current = activeSection;
    const logs = CONTEXTUAL_LOGS[activeSection];
    if (!logs) return;
    const t = setTimeout(() => {
      setPrompt("synchronizing...");
      logs.forEach((log, i) => {
        setTimeout(() => {
          add(log.channel, log.text, log.ok);
          if (i === logs.length - 1) {
            setPrompt("system@santhosh-os:~$ ");
          }
        }, i * 600 + Math.random() * 500);
      });
    }, 400);
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
        timer = setTimeout(next, 500 + Math.random() * 500);
      };
      next();
    };

    const idleFactor = idle ? 2.5 : 1;

    const ambient = () => {
      if (!alive) return;
      const channel = pick(CHANNELS);
      const log = pick(POOLS[channel]);
      setPrompt("synchronizing...");
      timer = setTimeout(() => {
        if (!alive) return;
        add(channel, log.text, log.ok);
        setPrompt("system@santhosh-os:~$ ");
        const longPause = Math.random() < 0.15;
        const base = longPause ? 10000 : 2500;
        const jitter = longPause ? 8000 : 4000;
        const pause = (base + Math.random() * jitter) * idleFactor;
        timer = setTimeout(ambient, pause);
      }, (600 + Math.random() * 500) * idleFactor);
    };

    const kick = setTimeout(burst, 600 * idleFactor);

    return () => { alive = false; clearTimeout(timer); clearTimeout(kick); };
  }, [add, idle]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className={cn("surface-cavity flex flex-col", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-label text-muted">TERMINAL CORE</span>
        <div className="flex items-center gap-4 text-mono-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00b894] shadow-[0_0_4px_rgba(0,184,148,0.35)] animate-[led-pulse_4s_ease-in-out_infinite]" />
            CHANNEL ACTIVE
          </span>
          <span className="opacity-60">SESSION: CONNECTED</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex min-h-[240px] max-h-[320px] flex-col gap-1.5 overflow-y-auto px-4 py-3">
        {entries.map((e) => (
          <div key={e.id} className="flex items-baseline gap-3 text-mono-sm leading-relaxed">
            <span className="w-[4.5em] shrink-0 text-muted opacity-40">[{e.time}]</span>
            <span className="w-[7em] shrink-0 text-muted opacity-50">[{e.channel}]</span>
            <span className={e.ok ? "text-correct" : "text-foreground"}>
              {e.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-2">
        <span className="text-mono-sm text-muted">{prompt}</span>
        <span className="cursor-blink inline-block h-[1em] w-2 bg-[var(--typro-text)] opacity-40" />
      </div>
    </div>
  );
}
