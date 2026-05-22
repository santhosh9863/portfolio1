"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { DisplayMonitor, type DisplayChannelDef } from "@/components/cinematic/DisplayMonitor";
import { SubsystemChip } from "@/components/cinematic/SubsystemChip";
import { TactileButton } from "@/components/controls/TactileButton";

interface LinkItem {
  label: string;
  href: string;
}

interface LogEntry {
  text: string;
  ok: boolean;
}

interface ModuleBayProps {
  name: string;
  subtitle?: string;
  status: string;
  stack: string;
  year: string;
  architecture: string;
  components: string[];
  buildStatus: string;
  className?: string;
  deployment?: string;
  runtime?: string;
  database?: string;
  links?: LinkItem[];
  engineeringNotes?: string[];
  runtimeLogs?: LogEntry[];
  isDimmed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  runtimeHealth?: string;
  subsystemChecks?: { name: string; status: string }[];
  lastDeployment?: string;
  stateManagement?: string;
  dataFlow?: string;
  auth?: string;
}

type Phase = "idle" | "pressed" | "opening" | "open" | "closing";
type Tab = "overview" | "display" | "deployment";

const NOTES_POOL: Record<string, string[]> = {
  PULSE: [
    "attendance computation stabilized",
    "firestore sync optimized",
    "dashboard render latency reduced",
    "production runtime verified",
    "analytic pipeline configured",
    "realtime listener attached",
  ],
  WEB: [
    "responsive layout pipeline stabilized",
    "interaction hierarchy optimized",
    "frontend rendering structure improved",
    "component scaling architecture refined",
    "landing experience finalized",
  ],
  TYPRO: [
    "depth pressure system calibrated",
    "neumorphic lighting stabilized",
    "interaction timing refined",
    "responsive motion architecture improved",
    "shadow physics system validated",
  ],
  PCARE: [
    "frontend rendering optimized",
    "responsive spacing refined",
    "layout structure stabilized",
    "vercel deployment finalized",
    "service presentation system complete",
  ],
};

const RUNTIME_POOL: Record<string, LogEntry[]> = {
  PULSE: [
    { text: "realtime listener attached", ok: true },
    { text: "firestore operational", ok: true },
    { text: "production pipeline verified", ok: true },
    { text: "sync interval adjusted", ok: false },
    { text: "cache layer primed", ok: true },
  ],
  WEB: [
    { text: "production build verified", ok: true },
    { text: "edge network propagated", ok: true },
    { text: "static assets compiled", ok: false },
    { text: "api routes active", ok: true },
    { text: "cdn cache primed", ok: true },
  ],
  TYPRO: [
    { text: "depth system calibrated", ok: true },
    { text: "interaction engine verified", ok: true },
    { text: "lighting model stable", ok: false },
    { text: "motion timing refined", ok: true },
    { text: "build artifacts verified", ok: true },
  ],
  PCARE: [
    { text: "frontend pipeline idle", ok: true },
    { text: "responsive layout verified", ok: true },
    { text: "service routes active", ok: false },
    { text: "deployment configuration valid", ok: true },
    { text: "optimization complete", ok: true },
  ],
};

export function ModuleBay({
  name,
  subtitle,
  status,
  stack,
  year,
  architecture,
  components,
  buildStatus,
  className,
  deployment = "VERCEL PRODUCTION",
  runtime = "ACTIVE",
  database = "FIRESTORE ONLINE",
  links,
  engineeringNotes,
  runtimeLogs,
  isDimmed = false,
  onOpen,
  onClose,
  runtimeHealth,
  subsystemChecks,
  lastDeployment,
  stateManagement,
  dataFlow,
  auth,
}: ModuleBayProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [tab, setTab] = useState<Tab>("overview");
  const [liveLogs, setLiveLogs] = useState<LogEntry[]>([]);
  const [pulseCount, setPulseCount] = useState(0);
  const isOpenRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const modulePrefix = name.includes("PULSE SYSTEM") ? "PULSE" : name.includes("TYPRO") ? "TYPRO" : name.includes("PERFECT") ? "PCARE" : "WEB";
  const notes = engineeringNotes ?? NOTES_POOL[modulePrefix as keyof typeof NOTES_POOL] ?? [];
  const isExpanded = phase === "opening" || phase === "open";

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const schedule = useCallback(
    (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    },
    [],
  );

  const handleToggle = useCallback(() => {
    const prefix = name.includes("PULSE SYSTEM") ? "PULSE" : name.includes("TYPRO") ? "TYPRO" : name.includes("PERFECT") ? "PCARE" : "WEB";
    const currentLogs = runtimeLogs ?? RUNTIME_POOL[prefix as keyof typeof RUNTIME_POOL] ?? [];

    clearTimers();

    if (!isOpenRef.current) {
      isOpenRef.current = true;

      schedule(() => setPhase("pressed"), 0);

      schedule(() => setPhase("opening"), 40);

      schedule(() => {
        setPhase("open");
        setLiveLogs(currentLogs.slice(0, 2));
        setPulseCount((c) => c + 1);
        onOpen?.();
      }, 440);

      schedule(() => {
        setLiveLogs(currentLogs);
        setPulseCount((c) => c + 1);
      }, 800);
    } else {
      isOpenRef.current = false;
      setPhase("closing");
      setLiveLogs([]);

      schedule(() => {
        setPhase("idle");
        onClose?.();
      }, 200);
    }
  }, [clearTimers, schedule, runtimeLogs, name, onOpen, onClose]);

  const staggerDelay = (index: number) => `${80 + index * 80}ms`;

  const sectionsVisible = phase === "open";

  return (
    <div
      className={cn(
        "flex flex-col",
        isDimmed && "module-dimmed",
        className,
      )}
    >
      {/* === TRIGGER BUTTON === */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "btn-typro flex items-center justify-between rounded-lg px-4 py-2 text-left transition-all duration-40 ease-out",
          (phase === "pressed" || isExpanded) && "module-trigger--depressed",
          phase === "opening" && "module-trigger--softened",
        )}
      >
        <div className="min-w-0 flex items-baseline gap-2 sm:gap-4">
          <span className="shrink-0 text-mono-sm sm:text-body-sm font-black mobile-operational-text sm:tracking-widest text-foreground">
            {name}
          </span>
          <span className="shrink-0 text-mono-sm text-muted">
            STATUS: {status}
          </span>
          <span className="hidden sm:inline text-mono-sm text-muted">
            STACK: {stack}
          </span>
          <span className="hidden sm:inline text-mono-sm text-muted">
            BUILD: {year}
          </span>
        </div>
        <span
          className={cn(
            "shrink-0 text-mono-sm text-muted transition-transform duration-150",
            isExpanded && "rotate-180",
          )}
        >
          ▼
        </span>
      </button>

      {/* === GRID EXPANSION === */}
      <div
        className={cn(
          "grid transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        style={{ transitionDelay: isExpanded ? "40ms" : "0ms" }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "module-cavity flex flex-col gap-0 px-4 pb-4 pt-3",
            )}
          >
            {/* === TAB NAVIGATION (HARDWARE MODE SELECTORS) === */}
            <div className="module-content-section flex items-center gap-1.5 border-b border-border pb-2.5"
              style={{
                transitionDelay: sectionsVisible ? staggerDelay(0) : "0ms",
                transitionDuration: "250ms",
              }}
            >
              {(["overview", "display", "deployment"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "module-tab rounded-md px-2.5 py-1 text-mono-sm",
                    tab === t ? "module-tab--active font-black" : "text-muted",
                  )}
                  style={{ transitionDelay: "0ms" }}
                >
                  {t === "overview"
                    ? "OVERVIEW"
                    : t === "display"
                      ? "DISPLAY"
                      : "DEPLOYMENT"}
                </button>
              ))}
            </div>

            {/* === TAB: OVERVIEW === */}
            {tab === "overview" && (
              <div className="flex flex-col gap-3 pt-3">
                {/* SYSTEM HEADER + STATUS STRIP */}
                <div
                  className={cn(
                    "module-content-section flex items-center justify-between",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(1) : "0ms",
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body-sm font-black tracking-widest text-foreground">
                      {name}
                    </span>
                    {subtitle && (
                      <span className="text-mono-sm text-muted">
                        {subtitle}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-mono-sm text-correct">
                    <span className="led-indicator inline-block h-1.5 w-1.5 rounded-full bg-[#00b894] shadow-[0_0_4px_rgba(0,184,148,0.35)]" />
                    {buildStatus}
                  </span>
                </div>

                {/* SYSTEM DIAGNOSTICS */}
                {subsystemChecks && subsystemChecks.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(2) : "0ms",
                    }}
                  >
                    <span className="text-mono-sm text-muted">SUBSYSTEM STATUS</span>
                    <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1">
                      {subsystemChecks.map((s) => (
                        <span key={s.name} className="inline-flex items-center gap-2 text-mono-sm text-muted opacity-60">
                          <span className="inline-block h-1 w-1 rounded-full bg-[#00b894]" />
                          {s.name}: {s.status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ARCHITECTURE PANEL */}
                <div
                  className={cn(
                    "module-content-section flex flex-col gap-1.5",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(3) : "0ms",
                  }}
                >
                  <span className="text-mono-sm text-muted">ARCHITECTURE</span>
                  <div className="flex items-baseline gap-3">
                    <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                      FRAMEWORK
                    </span>
                    <span className="text-mono-sm text-foreground">
                      {architecture}
                    </span>
                  </div>
                  {stateManagement && (
                    <div className="flex items-baseline gap-3">
                      <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                        STATE MGMT
                      </span>
                      <span className="text-mono-sm text-foreground">
                        {stateManagement}
                      </span>
                    </div>
                  )}
                  {dataFlow && (
                    <div className="flex items-baseline gap-3">
                      <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                        DATA FLOW
                      </span>
                      <span className="text-mono-sm text-foreground">
                        {dataFlow}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                      DEPLOYMENT
                    </span>
                    <span className="text-mono-sm text-foreground">
                      {deployment}
                    </span>
                  </div>
                  {auth && (
                    <div className="flex items-baseline gap-3">
                      <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                        AUTH
                      </span>
                      <span className="text-mono-sm text-foreground">
                        {auth}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                      RUNTIME
                    </span>
                    <span className={cn(
                      "text-mono-sm",
                      runtimeHealth === "NOMINAL" ? "text-muted" : "text-foreground",
                    )}>
                      {runtimeHealth || runtime}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="w-[6.5em] shrink-0 text-mono-sm text-muted">
                      DATABASE
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-mono-sm text-correct">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                      {database}
                    </span>
                  </div>
                </div>

                {/* COMPONENT MATRIX */}
                <div
                  className={cn(
                    "module-content-section flex flex-col gap-1.5",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(4) : "0ms",
                  }}
                >
                  <span className="text-mono-sm text-muted">COMPONENTS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {components.map((c) => (
                      <SubsystemChip key={c}>{c}</SubsystemChip>
                    ))}
                  </div>
                </div>

                {/* DISPLAY MONITOR */}
                <div
                  className={cn(
                    "module-content-section",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(5) : "0ms",
                  }}
                >
                  <DisplayMonitor
                    active={sectionsVisible}
                    pulseKey={pulseCount}
                    statusItems={[
                      { label: "RUNTIME", value: "ONLINE" },
                      { label: "SYNC", value: "ACTIVE" },
                    ]}
                  >
                    <div className="flex flex-col items-center gap-1.5 px-4">
                      <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                        <span className="w-16 shrink-0">UPTIME</span>
                        <span>00:47:12</span>
                      </div>
                      <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                        <span className="w-16 shrink-0">MEMORY</span>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-20 rounded bg-[rgba(0,0,0,0.06)]">
                            <div className="h-full w-[64%] rounded bg-[#0984e3] opacity-30" />
                          </div>
                          <span>64%</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                        <span className="w-16 shrink-0">SIGNAL</span>
                        <span className="text-correct">● STABLE</span>
                      </div>
                    </div>
                  </DisplayMonitor>
                </div>
              </div>
            )}

            {/* === TAB: DISPLAY === */}
            {tab === "display" && (
              <div className="flex flex-col gap-3 pt-3">
                {/* SYSTEM HEADER (COMPACT) */}
                <div
                  className={cn(
                    "module-content-section flex items-center justify-between",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(1) : "0ms",
                  }}
                >
                  <span className="text-mono-sm font-black tracking-widest text-foreground">
                    {name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-mono-sm text-correct">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                    ONLINE
                  </span>
                </div>

                {/* MULTI-CHANNEL DISPLAY MONITOR */}
                <div
                  className={cn(
                    "module-content-section",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(2) : "0ms",
                  }}
                >
                  <DisplayMonitor
                    active={sectionsVisible}
                    pulseKey={pulseCount}
                    statusItems={[
                      { label: "RUNTIME", value: "ONLINE" },
                      { label: "SYNC", value: "ACTIVE" },
                      { label: "FPS", value: "STABLE" },
                    ]}
                    channels={
                      [
                        {
                          id: "overview",
                          label: "OVERVIEW",
                          content: (
                            <div className="flex w-full flex-col items-center gap-2 px-4 py-6">
                              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-1.5">
                                <div className="flex items-baseline gap-2 text-mono-xs text-muted opacity-50">
                                  <span className="w-14 shrink-0">ARCH</span>
                                  <span className="truncate">{architecture}</span>
                                </div>
                                <div className="flex items-baseline gap-2 text-mono-xs text-muted opacity-50">
                                  <span className="w-14 shrink-0">DEPLOY</span>
                                  <span className="truncate">{deployment}</span>
                                </div>
                                <div className="flex items-baseline gap-2 text-mono-xs text-muted opacity-50">
                                  <span className="w-14 shrink-0">SYNC</span>
                                  <span className="text-correct">ACTIVE</span>
                                </div>
                                <div className="flex items-baseline gap-2 text-mono-xs text-muted opacity-50">
                                  <span className="w-14 shrink-0">LOAD</span>
                                  <span>42%</span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center gap-3 text-mono-xs text-muted opacity-30">
                                <span>━━━</span>
                                <span>DIAGNOSTIC DISPLAY</span>
                                <span>━━━</span>
                              </div>
                            </div>
                          ),
                        } as DisplayChannelDef,
                        {
                          id: "analytics",
                          label: "ANALYTICS",
                          content: (
                            <div className="flex w-full flex-col gap-1.5 px-4 py-4">
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-20 shrink-0">SYNC STATE</span>
                                <span className="inline-flex items-center gap-1 text-correct">
                                  <span className="led-indicator inline-block h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                                  ACTIVE
                                </span>
                              </div>
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-20 shrink-0">EVENTS</span>
                                <span>1,247</span>
                              </div>
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-20 shrink-0">THROUGHPUT</span>
                                <span>342 req/s</span>
                              </div>
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-20 shrink-0">STABILITY</span>
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-16 rounded bg-[rgba(0,0,0,0.06)]">
                                    <div className="h-full w-[94%] rounded bg-[#00b894] opacity-40" />
                                  </div>
                                  <span>94%</span>
                                </div>
                              </div>
                            </div>
                          ),
                        } as DisplayChannelDef,
                        ...(name === "PULSE SYSTEM"
                          ? [
                              {
                                id: "dashboard",
                                label: "DASHBOARD",
                                content: (
                                  <div className="flex w-full flex-col items-center gap-2 px-4 py-4">
                                    <div className="flex items-baseline gap-3 self-start text-mono-xs text-muted opacity-50">
                                      <span className="w-20 shrink-0">
                                        REALTIME
                                      </span>
                                      <span className="text-correct">● LIVE</span>
                                    </div>
                                    <div className="grid w-full grid-cols-2 gap-2">
                                      <div className="flex flex-col gap-0.5 rounded bg-[rgba(0,0,0,0.03)] px-2 py-1.5">
                                        <span className="text-mono-xs text-muted opacity-30">
                                          MEM
                                        </span>
                                        <span className="text-mono-xs text-muted opacity-50">
                                          64%
                                        </span>
                                      </div>
                                      <div className="flex flex-col gap-0.5 rounded bg-[rgba(0,0,0,0.03)] px-2 py-1.5">
                                        <span className="text-mono-xs text-muted opacity-30">
                                          CPU
                                        </span>
                                        <span className="text-mono-xs text-muted opacity-50">
                                          28%
                                        </span>
                                      </div>
                                      <div className="flex flex-col gap-0.5 rounded bg-[rgba(0,0,0,0.03)] px-2 py-1.5">
                                        <span className="text-mono-xs text-muted opacity-30">
                                          NET
                                        </span>
                                        <span className="text-mono-xs text-muted opacity-50">
                                          342/s
                                        </span>
                                      </div>
                                      <div className="flex flex-col gap-0.5 rounded bg-[rgba(0,0,0,0.03)] px-2 py-1.5">
                                        <span className="text-mono-xs text-muted opacity-30">
                                          CACHE
                                        </span>
                                        <span className="text-mono-xs text-muted opacity-50">
                                          87%
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-1 flex items-center gap-3 text-mono-xs text-muted opacity-25">
                                      <span>━━</span>
                                      <span>RUNTIME METRICS</span>
                                      <span>━━</span>
                                    </div>
                                  </div>
                                ),
                              } as DisplayChannelDef,
                            ]
                          : []),
                      ] as DisplayChannelDef[]
                    }
                  />
                </div>

                {/* SECONDARY DISPLAY (ARCHITECTURE INSPECTION) */}
                <div
                  className={cn(
                    "module-content-section",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(3) : "0ms",
                  }}
                >
                  <DisplayMonitor
                    active={sectionsVisible}
                    pulseKey={pulseCount}
                    className="display-monitor--compact"
                    statusItems={[
                      { label: "ARCH", value: architecture },
                      { label: "STATUS", value: buildStatus },
                    ]}
                    channels={[
                      {
                        id: "runtime",
                        label: "RUNTIME",
                        content: (
                          <div className="flex w-full flex-col gap-1.5 px-4 py-3">
                            <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                              <span className="w-16 shrink-0">HEALTH</span>
                              <span className={runtimeHealth === "NOMINAL" ? "text-muted" : "text-correct"}>{runtimeHealth || runtime}</span>
                            </div>
                            <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                              <span className="w-16 shrink-0">DEPLOY</span>
                              <span>{deployment}</span>
                            </div>
                            <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                              <span className="w-16 shrink-0">DATABASE</span>
                              <span>{database}</span>
                            </div>
                            <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                              <span className="w-16 shrink-0">SYNC</span>
                              <span className="text-correct">ACTIVE</span>
                            </div>
                            {lastDeployment && (
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-16 shrink-0">LAST DEV</span>
                                <span>{lastDeployment}</span>
                              </div>
                            )}
                          </div>
                        ),
                      } as DisplayChannelDef,
                      {
                        id: "inspection",
                        label: "INSPECTION",
                        content: (
                          <div className="flex w-full flex-col gap-1.5 px-4 py-3">
                            <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                              <span className="w-16 shrink-0">FRAMEWORK</span>
                              <span>{architecture}</span>
                            </div>
                            {stateManagement && (
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-16 shrink-0">STATE</span>
                                <span>{stateManagement}</span>
                              </div>
                            )}
                            {dataFlow && (
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-16 shrink-0">FLOW</span>
                                <span>{dataFlow}</span>
                              </div>
                            )}
                            {auth && (
                              <div className="flex items-baseline gap-3 text-mono-xs text-muted opacity-50">
                                <span className="w-16 shrink-0">AUTH</span>
                                <span>{auth}</span>
                              </div>
                            )}
                            <div className="mt-1 flex items-center gap-3 text-mono-xs text-muted opacity-25">
                              <span>━━</span>
                              <span>ARCHITECTURE PANEL</span>
                              <span>━━</span>
                            </div>
                          </div>
                        ),
                      } as DisplayChannelDef,
                    ]}
                  />
                </div>
              </div>
            )}

            {/* === TAB: DEPLOYMENT === */}
            {tab === "deployment" && (
              <div className="flex flex-col gap-3 pt-3">
                {/* ENGINEERING NOTES */}
                <div
                  className={cn(
                    "module-content-section flex flex-col gap-1.5",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(1) : "0ms",
                  }}
                >
                  <span className="text-mono-sm text-muted">
                    ENGINEERING NOTES
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {notes.map((note, i) => (
                      <span
                        key={`${i}-${note}`}
                        className="text-mono-sm text-muted opacity-40"
                      >
                        › {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SUBSYSTEM DIAGNOSTICS */}
                {subsystemChecks && subsystemChecks.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section flex flex-col gap-1.5",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(2) : "0ms",
                    }}
                  >
                    <span className="text-mono-sm text-muted">SUBSYSTEMS</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                      {subsystemChecks.map((s) => (
                        <span key={s.name} className="inline-flex items-center gap-1.5 text-mono-sm text-muted opacity-60">
                          <span className="inline-block h-1 w-1 rounded-full bg-[#00b894]" />
                          {s.name}: {s.status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACCESS CONTROLS */}
                {links && links.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section flex flex-wrap gap-2",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible
                        ? staggerDelay(3)
                        : "0ms",
                    }}
                  >
                    {links.map((link) => (
                      <TactileButton
                        key={link.label}
                        variant="sm"
                        as="a"
                        href={link.href}
                        className="rounded-lg px-3 py-1.5 text-mono-sm"
                      >
                        [{link.label}]
                      </TactileButton>
                    ))}
                  </div>
                )}

                {/* RUNTIME LOGS */}
                <div
                  className={cn(
                    "module-content-section flex flex-col gap-0.5 border-t border-border pt-2",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(4) : "0ms",
                  }}
                >
                  <span className="text-mono-sm text-muted">
                    RUNTIME LOGS
                  </span>
                  {lastDeployment && (
                    <span className="text-mono-sm text-muted opacity-30">
                      LAST DEPLOY: {lastDeployment}
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5 pt-1">
                    {liveLogs.map((log, i) => (
                      <span
                        key={`${i}-${log.text}`}
                        className="text-mono-sm leading-relaxed"
                      >
                        <span className="text-muted opacity-30">[</span>
                        <span className="text-muted opacity-40">
                          {modulePrefix}
                        </span>
                        <span className="text-muted opacity-30">] </span>
                        <span
                          className={
                            log.ok ? "text-correct opacity-40" : "text-muted opacity-40"
                          }
                        >
                          {log.text}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
