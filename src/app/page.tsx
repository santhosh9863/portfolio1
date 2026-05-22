"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRuntimeEngine } from "@/hooks/useRuntimeEngine";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useIdleDetector } from "@/hooks/useIdleDetector";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { InsetPanel } from "@/components/surfaces/InsetPanel";
import { RaisedPanel } from "@/components/surfaces/RaisedPanel";
import { DataRow } from "@/components/typography/DataRow";
import { ModuleBay } from "@/components/cinematic/ModuleBay";
import { SystemNode } from "@/components/cinematic/SystemNode";
import { TerminalCore } from "@/components/atmosphere/TerminalCore";
import { TactileButton } from "@/components/controls/TactileButton";
import { SidebarNode } from "@/components/layout/SidebarNode";
import { SystemClock } from "@/components/atmosphere/SystemClock";
import { BootSequence } from "@/components/atmosphere/BootSequence";

const techNodes = [
  { title: "FLUTTER", subtitle: "CROSS-PLATFORM UI", utilization: "92%", currentUse: "PULSE ECOSYSTEM" },
  { title: "NEXT.JS", subtitle: "FRONTEND ARCHITECTURE", utilization: "78%", currentUse: "WEB PLATFORM" },
  { title: "FIREBASE", subtitle: "REALTIME BACKEND", utilization: "85%", currentUse: "AUTH + FIRESTORE" },
  { title: "TAILWIND", subtitle: "UI LAYOUT SYSTEM", utilization: "88%", currentUse: "RESPONSIVE SYSTEM" },
  { title: "TYPESCRIPT", subtitle: "APPLICATION STRUCTURE", utilization: "95%", currentUse: "TYPE COVERAGE" },
  { title: "DART", subtitle: "COMPILED RUNTIME", utilization: "80%", currentUse: "FLUTTER CORE" },
  { title: "REACT", subtitle: "COMPONENT RUNTIME", utilization: "72%", currentUse: "UI COMPONENTS" },
  { title: "GITHUB", subtitle: "VERSION CONTROL", utilization: "90%", currentUse: "RELEASE WORKFLOW" },
  { title: "VERCEL", subtitle: "DEPLOYMENT NETWORK", utilization: "76%", currentUse: "EDGE INFRASTRUCTURE" },
];

const initialCommStatuses: Record<string, string> = {
  EMAIL: "CONNECTED",
  GITHUB: "ACTIVE",
  LINKEDIN: "AVAILABLE",
  APK: "DISTRIBUTION READY",
  RESUME: "ACCESSIBLE",
};

const commMeta: Record<string, string> = {
  EMAIL: "santhoshkrishna.r67@gmail.com",
  GITHUB: "/santhosh9863",
  LINKEDIN: "/in/santhosh-krishna-698638372",
  APK: "ATTENDANCE TRACKER RELEASES",
  RESUME: "RESUME ARCHIVE",
};

const navItems = ["WORK", "CRAFT", "SYSTEM"];

export default function Home() {
  const runtime = useRuntimeEngine();
  const [activeNav, setActiveNav] = useState("WORK");
  const [commStatuses, setCommStatuses] = useState(initialCommStatuses);
  const [bootDone, setBootDone] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const activeSection = useSectionObserver();
  const isIdle = useIdleDetector(10000);

  const handleModuleOpen = useCallback((name: string) => {
    setActiveModule(name);
  }, []);

  const handleModuleClose = useCallback(() => {
    setActiveModule(null);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.activeSection = activeSection || "";
  }, [activeSection]);

  useEffect(() => {
    if (activeModule) {
      document.documentElement.dataset.focused = "true";
      document.documentElement.dataset.inspection = "true";
    } else {
      delete document.documentElement.dataset.focused;
      delete document.documentElement.dataset.inspection;
    }
  }, [activeModule]);

  useEffect(() => {
    if (isIdle) {
      document.documentElement.dataset.idle = "true";
    } else {
      delete document.documentElement.dataset.idle;
    }
  }, [isIdle]);

  const sectionLabels: Record<string, string> = {
    profile: "PROFILE",
    modules: "MODULES",
    matrix: "MATRIX",
    history: "HISTORY",
    communication: "COMMS",
  };

  const commLinks: Record<string, string> = {
    EMAIL: "mailto:santhoshkrishna.r67@gmail.com",
    GITHUB: "https://github.com/santhosh9863",
    LINKEDIN: "https://linkedin.com/in/santhosh-krishna-698638372",
    APK: "https://github.com/santhosh9863/attendance-tracker/releases",
    RESUME: "https://github.com/santhosh9863/resume/releases",
  };

  const handleCommPress = (label: string) => {
    setCommStatuses((prev) => ({ ...prev, [label]: "TRANSMITTING..." }));
    setTimeout(() => {
      setCommStatuses((prev) => ({ ...prev, [label]: "LINK ESTABLISHED" }));
    }, 800);
    setTimeout(() => {
      setCommStatuses((prev) => ({ ...prev, [label]: initialCommStatuses[label] }));
    }, 2400);
  };

  return (
    <>
    <main className="relative mx-auto flex min-h-dvh max-w-xl flex-col gap-6 px-6 py-6 sm:px-8 sm:py-6">
      <HeaderBar
        title="SANTHOSH KRISHNA R"
        version="FRONTEND SYSTEMS"
        statusRail={
          <>
            {activeSection && (
              <span className="inline-flex items-center gap-1 text-mono-sm text-muted opacity-60">
                [{sectionLabels[activeSection]}]
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-mono-sm text-muted opacity-50">
              <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-[#00b894] shadow-[0_0_4px_rgba(0,184,148,0.35)]" />
              OPERATIONAL
            </span>
          </>
        }
      >
        <SystemClock />
      </HeaderBar>

      <InsetPanel className={cn("shadow-breathe-trigger animate-[shadow-breathe_8s_ease-in-out_infinite]", activeModule && "well--focused", activeModule && "well--inspection")}>
        <div className="flex flex-col gap-0 px-6 py-6">
          <div className="mt-6 mb-2" data-section="profile">
            <span className="text-label font-black tracking-widest text-foreground">
              SYSTEM PROFILE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-0">
            <DataRow labelWidth="w-16" label="USER ID" value="SANTHOSH KRISHNA R" />
            <DataRow labelWidth="w-16" label="STACK" value="FLUTTER / NEXT.JS / FIREBASE" />
            <DataRow labelWidth="w-16" label="ROLE" value="FRONTEND SYSTEMS DEVELOPER" />
            <DataRow labelWidth="w-16" label="WORKFLOW" value="GIT / VERCEL / FIREBASE" />
            <DataRow labelWidth="w-16" label="EDUCATION" value="BCA — ST. FRANCIS COLLEGE" />
            <DataRow labelWidth="w-16" label="STATUS" value="INTERNSHIP PREPARATION ACTIVE" />
            <DataRow labelWidth="w-16" label="FOCUS" value="CROSS-PLATFORM APPLICATIONS" />
            <DataRow labelWidth="w-16" label="LOCATION" value="BANGALORE, INDIA" />
            <DataRow labelWidth="w-16" label="SPECIALIZATION" value="UI SYSTEMS + FRONTEND" />
            <DataRow labelWidth="w-16" label="LANGUAGES" value="EN / KN / TE / TA / HI" />
          </div>

          <div className="my-4 border-t border-border" />

          <div className="mt-6 mb-2" data-section="modules">
            <span className="text-label font-black tracking-widest text-foreground">
              ACTIVE MODULES
            </span>
          </div>

          <ModuleBay
            name="PULSE SYSTEM"
            subtitle="ATTENDANCE INTELLIGENCE PLATFORM"
            status="ACTIVE DEVELOPMENT"
            stack="FLUTTER / FIREBASE / DART"
            year="2026"
            architecture="FLUTTER CROSS-PLATFORM UI"
            deployment="APK RELEASE PIPELINE"
            runtime="REALTIME SYNC"
            database="FIRESTORE ONLINE"
            components={[
              "attendance analytics",
              "attendance simulator",
              "subject tracking",
              "prediction system",
              "firebase authentication",
              "realtime synchronization",
              "apk deployment workflow",
            ]}
            buildStatus="ACTIVE"
            links={[
              { label: "GITHUB ACCESS", href: "https://github.com/santhosh9863/attendance-tracker" },
              { label: "APK BUILD", href: "https://github.com/santhosh9863/attendance-tracker/releases" },
            ]}
            engineeringNotes={[
              "attendance computation stabilized",
              "subject analytics optimized",
              "firebase sync architecture implemented",
              "responsive flutter layout system finalized",
            ]}
            runtimeLogs={[
              { text: "pulse runtime initialized", ok: true },
              { text: "subject analytics engine ready", ok: true },
              { text: "firestore sync attached", ok: true },
              { text: "attendance pipeline verified", ok: false },
              { text: "build artifacts finalized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "PULSE SYSTEM"}
            onOpen={() => handleModuleOpen("PULSE SYSTEM")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="PROVIDER ARCHITECTURE"
            dataFlow="REALTIME ATTENDANCE SYNC"
            auth="FIREBASE AUTH"
          />

          <ModuleBay
            name="PULSE WEB PLATFORM"
            subtitle="RESPONSIVE ECOSYSTEM INTERFACE"
            status="STABLE"
            stack="NEXT.JS / REACT / TAILWIND CSS"
            year="2026"
            architecture="MODERN FRONTEND SYSTEM"
            deployment="VERCEL EDGE"
            runtime="STATIC GENERATION"
            database="—"
            components={[
              "responsive sections",
              "mobile-first layouts",
              "animation systems",
              "frontend architecture",
              "component scaling",
            ]}
            buildStatus="STABLE"
            links={[
              { label: "GITHUB ACCESS", href: "https://github.com/santhosh9863/pulse-web-platform" },
              { label: "LIVE DEPLOYMENT", href: "https://pulse-web-platform.vercel.app" },
            ]}
            engineeringNotes={[
              "responsive layout pipeline stabilized",
              "interaction hierarchy optimized",
              "frontend rendering structure improved",
              "component scaling architecture refined",
            ]}
            runtimeLogs={[
              { text: "web platform build completed", ok: true },
              { text: "responsive layout verified", ok: true },
              { text: "edge network propagated", ok: false },
              { text: "static assets optimized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "PULSE WEB PLATFORM"}
            onOpen={() => handleModuleOpen("PULSE WEB PLATFORM")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="REACT STATE"
            dataFlow="STATIC GENERATION"
            auth="—"
          />

          <ModuleBay
            name="TYPRO UI ENGINE"
            subtitle="NEUROMORPHIC TYPING PLATFORM"
            status="STABLE"
            stack="NEXT.JS / TYPESCRIPT / VERCEL"
            year="2026"
            architecture="NEUROMORPHIC UI ENGINE"
            deployment="VERCEL PRODUCTION"
            runtime="EDGE OPTIMIZED"
            database="—"
            components={[
              "depth rendering",
              "interaction systems",
              "responsive UI engine",
              "typescript structure",
              "deployment workflow",
            ]}
            buildStatus="STABLE"
            links={[
              { label: "GITHUB ACCESS", href: "https://github.com/santhosh9863/typro-ui-engine" },
              { label: "ARCHITECTURE MAP", href: "https://github.com/santhosh9863/typro-ui-engine" },
            ]}
            engineeringNotes={[
              "depth pressure system calibrated",
              "neumorphic lighting stabilized",
              "interaction timing refined",
              "responsive motion architecture improved",
            ]}
            runtimeLogs={[
              { text: "depth system calibrated", ok: true },
              { text: "neumorphic model validated", ok: true },
              { text: "interaction engine stable", ok: false },
              { text: "render pipeline optimized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "TYPRO UI ENGINE"}
            onOpen={() => handleModuleOpen("TYPRO UI ENGINE")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="COMPONENT STATE"
            dataFlow="PROP DRIVEN"
            auth="—"
          />

          <ModuleBay
            name="PERFECT CARE PLATFORM"
            subtitle="PROFESSIONAL SERVICE WEBSITE"
            status="STABLE"
            stack="NEXT.JS / TAILWIND / VERCEL"
            year="2025"
            architecture="RESPONSIVE BUSINESS INTERFACE"
            deployment="VERCEL PRODUCTION"
            runtime="STATIC"
            database="—"
            components={[
              "service presentation",
              "responsive layouts",
              "frontend optimization",
              "deployment workflow",
            ]}
            buildStatus="STABLE"
            links={[
              { label: "GITHUB ACCESS", href: "https://github.com/santhosh9863/perfect-care-platform" },
              { label: "LIVE DEPLOYMENT", href: "https://perfect-care-platform.vercel.app" },
            ]}
            engineeringNotes={[
              "frontend rendering optimized",
              "responsive spacing refined",
              "layout structure stabilized",
              "vercel deployment finalized",
            ]}
            runtimeLogs={[
              { text: "frontend pipeline idle", ok: true },
              { text: "responsive layout verified", ok: true },
              { text: "service routes active", ok: false },
              { text: "deployment configuration valid", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "PERFECT CARE PLATFORM"}
            onOpen={() => handleModuleOpen("PERFECT CARE PLATFORM")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="—"
            dataFlow="STATIC RENDERING"
            auth="—"
          />

          <div className="my-4 border-t border-border" />

          <div className="mt-6 mb-2" data-section="matrix">
            <span className="text-label font-black tracking-widest text-foreground">
              TECHNOLOGY MATRIX
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {techNodes.map((node) => (
              <SystemNode
                key={node.title}
                title={node.title}
                subtitle={node.subtitle}
                utilization={node.utilization}
                currentUse={node.currentUse}
              />
            ))}
          </div>

          <div className="my-4 border-t border-border" />

          <div className="mt-6 mb-2" data-section="history">
            <span className="text-label font-black tracking-widest text-foreground">
              SYSTEM HISTORY
            </span>
          </div>

          <TerminalCore idle={isIdle} activeSection={activeSection} />

          <div className="my-4 border-t border-border" />

          <div className="mt-6 mb-2" data-section="communication">
            <span className="text-label font-black tracking-widest text-foreground">
              COMMUNICATION
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {Object.keys(initialCommStatuses).map((label) => {
              const isEmail = label === "EMAIL";
              return (
                <TactileButton
                  key={label}
                  variant="sm"
                  as="a"
                  href={isEmail ? commLinks[label] : undefined}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg px-4 py-2 text-left"
                  onClick={() => {
                    handleCommPress(label);
                    if (!isEmail) {
                      window.open(commLinks[label], "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <div className="flex items-baseline gap-2 sm:gap-4">
                    <span className="w-20 shrink-0 text-mono-sm font-black text-foreground">
                      {label}
                    </span>
                    <span
                      className={cn(
                        "text-mono-sm",
                        commStatuses[label] === "TRANSMITTING..."
                          ? "text-accent animate-[pulse-processing_0.8s_ease-in-out_infinite]"
                          : commStatuses[label] === "LINK ESTABLISHED"
                            ? "text-correct"
                            : "text-muted",
                      )}
                    >
                      {commStatuses[label]}
                    </span>
                  </div>
                  <span className="text-mono-sm text-muted opacity-40">
                    {commMeta[label]}
                  </span>
                </TactileButton>
              );
            })}
          </div>
        </div>
      </InsetPanel>

      <RaisedPanel className="raised-breathe-trigger flex items-center gap-2 px-4 py-2 animate-[raised-breathe_10s_ease-in-out_infinite]">
        {navItems.map((item) => (
          <SidebarNode
            key={item}
            label={item}
            active={activeNav === item}
            onClick={() => setActiveNav(item)}
          />
        ))}
      </RaisedPanel>

      <div className="flex items-center justify-center py-2">
        <span className="text-footer opacity-30">SANthosh OS</span>
      </div>
    </main>

      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}
    </>
  );
}
