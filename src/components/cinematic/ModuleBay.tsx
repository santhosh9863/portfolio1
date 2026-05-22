"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DisplayMonitor, type DisplayChannelDef } from "@/components/cinematic/DisplayMonitor";
import { SubsystemChip } from "@/components/cinematic/SubsystemChip";
import { ArchitectureFlow, type ArchFlowNode } from "@/components/cinematic/ArchitectureFlow";
import { TactileButton } from "@/components/controls/TactileButton";

interface LinkItem {
  label: string;
  href: string;
}

interface EngineeringDecision {
  area: string;
  text: string;
  outcome: string;
}

interface ProjectStory {
  purpose: string;
  problem: string;
  approach: string;
  journey: string;
  result: string;
}

interface ModuleBayProps {
  name: string;
  subtitle?: string;
  description?: string;
  status: string;
  stack: string;
  year: string;
  components: string[];
  className?: string;
  links?: LinkItem[];
  isDimmed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  previewContent?: ReactNode;
  previewChannels?: DisplayChannelDef[];
  decisions?: EngineeringDecision[];
  archFlow?: ArchFlowNode[];
  story?: ProjectStory;
}

type Phase = "idle" | "pressed" | "opening" | "open" | "closing";
type Tab = "overview" | "display" | "deployment";

export function ModuleBay({
  name,
  subtitle,
  description,
  status,
  stack,
  year,
  components,
  className,
  links,
  isDimmed = false,
  onOpen,
  onClose,
  previewContent,
  previewChannels,
  decisions,
  archFlow,
  story,
}: ModuleBayProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [tab, setTab] = useState<Tab>("overview");
  const [pulseCount, setPulseCount] = useState(0);
  const isOpenRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    clearTimers();

    if (!isOpenRef.current) {
      isOpenRef.current = true;

      schedule(() => setPhase("pressed"), 0);

      schedule(() => setPhase("opening"), 50);

      schedule(() => {
        setPhase("open");
        setPulseCount((c) => c + 1);
        onOpen?.();
      }, 440);
    } else {
      isOpenRef.current = false;
      setPhase("closing");
      schedule(() => {
        setPhase("idle");
        onClose?.();
      }, 200);
    }
  }, [clearTimers, schedule, name, onOpen, onClose]);

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
        aria-expanded={isExpanded}
        aria-controls={`module-content-${name.replace(/\s+/g, "-").toLowerCase()}`}
        className={cn(
          "btn-typro flex items-center justify-between rounded-lg px-4 py-2.5 sm:py-3 text-left",
          (phase === "pressed" || isExpanded) && "module-trigger--depressed",
          phase === "opening" && "module-trigger--softened",
        )}
      >
        <div className="min-w-0 flex items-baseline gap-2 sm:gap-5">
          <span className="shrink-0 text-[0.875rem] sm:text-[1rem] font-black text-foreground tracking-wide">
            {name}
          </span>
          {status && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-mono-xs text-correct">
              <span className="led-indicator inline-block h-1.5 w-1.5 rounded-full bg-[#00b894]" />
              {status}
            </span>
          )}
          <span className="hidden sm:inline text-mono-xs text-subtle">
            {stack}
          </span>
        </div>
        <span className="inline-flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline text-mono-xs text-subtle">
            {year}
          </span>
          <span
            className={cn(
              "shrink-0 text-[0.625rem] text-muted transition-transform duration-150",
              isExpanded && "rotate-180",
            )}
          >
            ▼
          </span>
        </span>
      </button>

      {/* === GRID EXPANSION === */}
      <div
        className={cn(
          "grid module-expansion-grid",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        style={{ transitionDelay: isExpanded ? "40ms" : "0ms" }}
      >
        <div className="overflow-hidden">
          <div
            id={`module-content-${name.replace(/\s+/g, "-").toLowerCase()}`}
            className={cn(
              "module-cavity flex flex-col gap-0 px-4 pb-4 pt-4",
            )}
          >
            {/* === TAB NAVIGATION (HARDWARE MODE SELECTORS) === */}
            <div className="module-content-section flex items-center gap-1.5 flex-wrap border-b border-border pb-4"
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
                    "module-tab rounded-md px-2 py-1 text-mono-sm",
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

            {/* === TAB: OVERVIEW — narrative-first project architecture === */}
            {tab === "overview" && (
              <div className="flex flex-col gap-5 sm:gap-7 pt-4">

                {/* LAYER 1: PROJECT IDENTITY + SUBTITLE */}
                <div
                  className={cn(
                    "module-content-section",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(1) : "0ms",
                  }}
                >
                  <div className="module-identity">
                    <span className="module-identity__name">
                      {name}
                    </span>
                    <span className="module-identity__blurb">
                      {subtitle}
                    </span>
                  </div>
                  <div className="mt-1.5 inline-flex items-baseline gap-2 text-mono-xs text-muted opacity-40">
                    <span>{stack}</span>
                    <span>·</span>
                    <span>{year}</span>
                  </div>
                </div>

                {/* LAYER 2: PROJECT STORY */}
                {story && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(2) : "0ms",
                    }}
                  >
                    <span className="text-mono-sm text-subtle tracking-wider">
                      STORY
                    </span>
                    <div className="story-block mt-2">
                      <div className="story-row">
                        <span className="story-row__label">Purpose</span>
                        <span className="story-row__text">{story.purpose}</span>
                      </div>
                      <div className="story-row">
                        <span className="story-row__label">Problem</span>
                        <span className="story-row__text">{story.problem}</span>
                      </div>
                      <div className="story-row">
                        <span className="story-row__label">Approach</span>
                        <span className="story-row__text">{story.approach}</span>
                      </div>
                      <div className="story-row">
                        <span className="story-row__label">Journey</span>
                        <span className="story-row__text">{story.journey}</span>
                      </div>
                      <div className="story-row">
                        <span className="story-row__label">Result</span>
                        <span className="story-row__text">{story.result}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAYER 3: PREVIEW */}
                <div
                  className={cn(
                    "module-section--primary",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(3) : "0ms",
                  }}
                >
                  <DisplayMonitor
                    active={sectionsVisible}
                    pulseKey={pulseCount}
                    className="display-monitor--hero"
                    statusItems={[
                      { label: "BUILD", value: status },
                      { label: "SYNC", value: "ACTIVE" },
                    ]}
                  >
                    {previewContent || (
                      <div className="flex flex-col items-center gap-2 px-4 py-2">
                        <div className="flex items-baseline gap-3 text-mono-xs text-secondary">
                          <span className="w-16 shrink-0">STACK</span>
                          <span>{stack}</span>
                        </div>
                        <div className="flex items-baseline gap-3 text-mono-xs text-secondary">
                          <span className="w-16 shrink-0">YEAR</span>
                          <span>{year}</span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-3 text-mono-xs text-secondary">
                          <span className="w-16 shrink-0">STATUS</span>
                          <span className="text-correct">● {status}</span>
                        </div>
                      </div>
                    )}
                  </DisplayMonitor>
                </div>

                {/* LAYER 4: DESCRIPTION */}
                {description && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(4) : "0ms",
                    }}
                  >
                    <p className="text-body-sm sm:text-body text-secondary max-w-prose">
                      {description}
                    </p>
                  </div>
                )}

                {/* LAYER 5: ARCHITECTURE FLOW */}
                {archFlow && archFlow.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(5) : "0ms",
                    }}
                  >
                    <span className="text-mono-sm text-subtle tracking-wider">
                      SYSTEM FLOW
                    </span>
                    <ArchitectureFlow nodes={archFlow} className="mt-2" />
                  </div>
                )}

                {/* LAYER 6: ENGINEERING DECISIONS */}
                {decisions && decisions.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(6) : "0ms",
                    }}
                  >
                    <span className="text-mono-sm text-subtle tracking-wider">
                      DECISIONS
                    </span>
                    <div className="decision-block mt-2">
                      {decisions.map((d, i) => (
                        <div key={i} className="decision-row">
                          <span className="decision-row__area">{d.area}</span>
                          <span className="decision-row__arrow">→</span>
                          <span className="decision-row__text">{d.text}</span>
                          <span className="decision-row__outcome">{d.outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LAYER 7: COMPONENT CHIPS */}
                <div
                  className={cn(
                    "module-content-section",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(7) : "0ms",
                  }}
                >
                    <span className="text-mono-sm text-subtle tracking-wider">
                      COMPONENTS
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {components.map((c) => (
                      <SubsystemChip key={c}>{c}</SubsystemChip>
                    ))}
                  </div>
                </div>

                {/* LAYER 8: ACTIONS */}
                {links && links.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(8) : "0ms",
                    }}
                  >
                    <div className="module-actions">
                      <span className="module-actions__header">
                        ─── ACCESS PORTS ───
                      </span>
                      <div className="module-actions__group">
                        {links.map((link) => (
                          <TactileButton
                            key={link.label}
                            variant="sm"
                            as="a"
                            href={link.href}
                            className="rounded-lg px-4 py-2 text-mono-sm"
                          >
                            [{link.label}]
                          </TactileButton>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* === TAB: DISPLAY === */}
            {tab === "display" && (
              <div className="flex flex-col gap-4 sm:gap-6 pt-4">
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
                    {status}
                  </span>
                </div>

                {/* MULTI-CHANNEL PREVIEW */}
                <div
                  className={cn(
                    "module-section--primary",
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
                      { label: "STATUS", value: status },
                      { label: "SYNC", value: "ACTIVE" },
                    ]}
                    channels={previewChannels || [
                      {
                        id: "overview",
                        label: "OVERVIEW",
                        content: (
                          <div className="flex w-full flex-col items-center gap-2 px-4 py-6">
                            <div className="flex items-center gap-3 text-mono-xs text-muted opacity-30">
                              <span>━━━</span>
                              <span>PROJECT OVERVIEW</span>
                              <span>━━━</span>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* === TAB: DEPLOYMENT === */}
            {tab === "deployment" && (
              <div className="flex flex-col gap-4 sm:gap-6 pt-4">
                {/* ACCESS CONTROLS */}
                {links && links.length > 0 && (
                  <div
                    className={cn(
                      "module-content-section flex flex-wrap gap-2",
                      sectionsVisible && "module-content-section--visible",
                    )}
                    style={{
                      transitionDelay: sectionsVisible ? staggerDelay(1) : "0ms",
                    }}
                  >
                    {links.map((link) => (
                      <TactileButton
                        key={link.label}
                        variant="sm"
                        as="a"
                        href={link.href}
                        className="rounded-lg px-4 py-2 text-mono-sm"
                      >
                        [{link.label}]
                      </TactileButton>
                    ))}
                  </div>
                )}

                {/* PROJECT DETAILS */}
                <div
                  className={cn(
                    "module-content-section flex flex-col gap-1",
                    sectionsVisible && "module-content-section--visible",
                  )}
                  style={{
                    transitionDelay: sectionsVisible ? staggerDelay(2) : "0ms",
                  }}
                >
                    <span className="text-mono-sm text-subtle tracking-wider">DETAILS</span>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-mono-sm text-subtle">
                      Stack: {stack}
                    </span>
                    <span className="text-mono-sm text-subtle">
                      Year: {year}
                    </span>
                    <span className="text-mono-sm text-subtle">
                      Status: {status}
                    </span>
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
