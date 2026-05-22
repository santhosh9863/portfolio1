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
  { title: "Flutter", subtitle: "Cross-platform framework", utilization: "92%", currentUse: "Pulse ecosystem" },
  { title: "Next.js", subtitle: "React metaframework", utilization: "78%", currentUse: "Web platform" },
  { title: "Firebase", subtitle: "Backend infrastructure", utilization: "85%", currentUse: "Auth + Firestore" },
  { title: "TypeScript", subtitle: "Type-safe JavaScript", utilization: "95%", currentUse: "Application layer" },
  { title: "Tailwind CSS", subtitle: "Utility-first styling", utilization: "88%", currentUse: "UI system" },
  { title: "Dart", subtitle: "Compiled language", utilization: "80%", currentUse: "Flutter core" },
  { title: "React", subtitle: "UI component library", utilization: "72%", currentUse: "Component architecture" },
  { title: "Git", subtitle: "Version control", utilization: "90%", currentUse: "Release workflow" },
  { title: "Vercel", subtitle: "Edge deployment", utilization: "76%", currentUse: "Production hosting" },
];

const sectionLabels: Record<string, string> = {
  profile: "About",
  modules: "Projects",
  matrix: "Technology",
  history: "Activity",
  communication: "Connect",
};

const navItems = ["About", "Projects", "Connect"];

export default function Home() {
  const runtime = useRuntimeEngine();
  const [activeNav, setActiveNav] = useState("About");
  const [bootDone, setBootDone] = useState(false);
  const activeSection = useSectionObserver();
  const isIdle = useIdleDetector(10000);
  const [activeModule, setActiveModule] = useState<string | null>(null);

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
    } else {
      delete document.documentElement.dataset.focused;
    }
  }, [activeModule]);

  useEffect(() => {
    if (isIdle) {
      document.documentElement.dataset.idle = "true";
    } else {
      delete document.documentElement.dataset.idle;
    }
  }, [isIdle]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    const map: Record<string, string> = { About: "profile", Projects: "modules", Connect: "communication" };
    const sectionId = map[label];
    if (sectionId) scrollToSection(sectionId);
  };

  return (
    <>
    <main className="relative mx-auto flex min-h-dvh max-w-xl flex-col gap-6 px-6 py-6 sm:px-8 sm:py-6 overflow-x-hidden">
      <HeaderBar
        title="Santhosh Krishna R"
        statusRail={
          <>
            {activeSection && (
              <span className="inline-flex items-center gap-1 text-mono-sm text-muted opacity-40">
                [{sectionLabels[activeSection]}]
              </span>
            )}
          </>
        }
      >
        <SystemClock />
      </HeaderBar>

      <InsetPanel className={cn("shadow-breathe-trigger animate-[shadow-breathe_8s_ease-in-out_infinite]", activeModule && "well--focused")}>
        <div className="flex flex-col gap-0 px-6 py-6">

          {/* HERO */}
          <div data-section="profile" className="mb-2">
            <h1 className="text-heading-xl sm:text-display font-black text-foreground leading-tight tracking-tight">
              SANTHOSH<br />KRISHNA R
            </h1>
            <p className="text-body-sm sm:text-body text-muted mt-2 leading-relaxed">
              Frontend systems engineer. Building cinematic cross-platform products with Flutter, Next.js, and Firebase.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {[
                { label: "GitHub", href: "https://github.com/santhosh9863" },
                { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
                { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
                { label: "Resume", href: "https://github.com/santhosh9863/resume/releases" },
              ].map((link) => (
                <TactileButton
                  key={link.label}
                  variant="sm"
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3 py-1.5 text-mono-sm"
                >
                  {link.label}
                </TactileButton>
              ))}
            </div>
          </div>

          <div className="my-6 border-t border-border" />

          {/* ABOUT */}
          <div className="mb-3" data-section="about-inline">
            <span className="text-label font-semibold tracking-wider text-foreground">
              About
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-0">
            <DataRow labelWidth="w-14" label="Stack" value="Flutter / Next.js / Firebase" />
            <DataRow labelWidth="w-14" label="Role" value="Frontend systems engineer" />
            <DataRow labelWidth="w-14" label="Education" value="BCA — St. Francis College" />
            <DataRow labelWidth="w-14" label="Location" value="Bangalore, India" />
            <DataRow labelWidth="w-14" label="Focus" value="Cross-platform applications" />
            <DataRow labelWidth="w-14" label="Languages" value="English / Kannada / Telugu / Tamil / Hindi" />
          </div>

          <div className="my-6 border-t border-border" />

          {/* PROJECTS */}
          <div className="mb-3" data-section="modules">
            <span className="text-label font-semibold tracking-wider text-foreground">
              Projects
            </span>
          </div>

          <ModuleBay
            name="Pulse"
            subtitle="Attendance intelligence platform"
            status="Active"
            stack="Flutter / Firebase / Dart"
            year="2026"
            architecture="Cross-platform Flutter with Provider state management"
            deployment="APK release pipeline"
            runtime="Realtime sync"
            database="Firestore"
            components={[
              "attendance analytics",
              "attendance simulator",
              "subject tracking",
              "prediction system",
              "firebase authentication",
              "realtime synchronization",
              "apk deployment workflow",
            ]}
            buildStatus="Live"
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/attendance-tracker" },
              { label: "Releases", href: "https://github.com/santhosh9863/attendance-tracker/releases" },
            ]}
            engineeringNotes={[
              "attendance computation and visualization pipeline",
              "subject-based analytics with prediction modeling",
              "firebase sync architecture for realtime updates",
              "responsive flutter layout system for cross-device use",
            ]}
            runtimeLogs={[
              { text: "analytics engine initialized", ok: true },
              { text: "firestore sync operational", ok: true },
              { text: "attendance pipeline verified", ok: false },
              { text: "build artifacts finalized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse"}
            onOpen={() => handleModuleOpen("Pulse")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="Provider"
            dataFlow="Realtime sync"
            auth="Firebase Auth"
          />

          <ModuleBay
            name="Pulse Web"
            subtitle="Cross-platform web dashboard"
            status="Live"
            stack="Next.js / React / Tailwind CSS"
            year="2026"
            architecture="Modern frontend with static generation"
            deployment="Vercel edge"
            runtime="Static generation"
            database="—"
            components={[
              "responsive dashboard",
              "mobile-first layout",
              "interaction system",
              "component architecture",
              "static optimization",
            ]}
            buildStatus="Live"
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/pulse-web-platform" },
              { label: "Live", href: "https://pulse-web-platform.vercel.app" },
            ]}
            engineeringNotes={[
              "responsive layout system for cross-platform access",
              "interaction hierarchy designed for operational clarity",
              "frontend rendering optimized for static delivery",
              "component architecture scaled across views",
            ]}
            runtimeLogs={[
              { text: "production build verified", ok: true },
              { text: "responsive layout validated", ok: true },
              { text: "edge network propagated", ok: false },
              { text: "static assets optimized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse Web"}
            onOpen={() => handleModuleOpen("Pulse Web")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="React state"
            dataFlow="Static generation"
            auth="—"
          />

          <ModuleBay
            name="Typro UI"
            subtitle="Neumorphic component system"
            status="Live"
            stack="Next.js / TypeScript / Vercel"
            year="2026"
            architecture="Component-driven neumorphic engine"
            deployment="Vercel edge"
            runtime="Edge optimized"
            database="—"
            components={[
              "depth rendering",
              "interaction system",
              "responsive engine",
              "type-safe architecture",
              "deployment pipeline",
            ]}
            buildStatus="Live"
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/typro-ui-engine" },
              { label: "Repo", href: "https://github.com/santhosh9863/typro-ui-engine" },
            ]}
            engineeringNotes={[
              "depth pressure system for tactile interaction feedback",
              "neumorphic lighting model with dynamic shadow physics",
              "interaction timing refined for mechanical responsiveness",
              "responsive motion architecture across viewport scales",
            ]}
            runtimeLogs={[
              { text: "depth system calibrated", ok: true },
              { text: "neumorphic model validated", ok: true },
              { text: "interaction engine stable", ok: false },
              { text: "render pipeline optimized", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Typro UI"}
            onOpen={() => handleModuleOpen("Typro UI")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="Component state"
            dataFlow="Prop driven"
            auth="—"
          />

          <ModuleBay
            name="Perfect Care"
            subtitle="Professional service platform"
            status="Live"
            stack="Next.js / Tailwind / Vercel"
            year="2025"
            architecture="Responsive business interface"
            deployment="Vercel edge"
            runtime="Static"
            database="—"
            components={[
              "service presentation",
              "responsive layout",
              "frontend optimization",
              "deployment workflow",
            ]}
            buildStatus="Live"
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/perfect-care-platform" },
              { label: "Live", href: "https://perfect-care-platform.vercel.app" },
            ]}
            engineeringNotes={[
              "frontend rendering optimized for performance",
              "responsive spacing system for cross-device clarity",
              "layout structure designed for service presentation",
              "vercel deployment pipeline configured",
            ]}
            runtimeLogs={[
              { text: "frontend pipeline idle", ok: true },
              { text: "responsive layout verified", ok: true },
              { text: "service routes active", ok: false },
              { text: "deployment configuration valid", ok: true },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Perfect Care"}
            onOpen={() => handleModuleOpen("Perfect Care")}
            onClose={handleModuleClose}
            subsystemChecks={runtime.subsystemChecks}
            lastDeployment={runtime.lastDeployment}
            stateManagement="—"
            dataFlow="Static rendering"
            auth="—"
          />

          <div className="my-6 border-t border-border" />

          {/* TECHNOLOGY */}
          <div className="mb-3" data-section="matrix">
            <span className="text-label font-semibold tracking-wider text-foreground">
              Technology
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

          <div className="my-6 border-t border-border" />

          {/* ACTIVITY */}
          <div className="mb-3" data-section="history">
            <span className="text-label font-semibold tracking-wider text-foreground">
              Activity
            </span>
          </div>

          <TerminalCore idle={isIdle} activeSection={activeSection} />

          <div className="my-6 border-t border-border" />

          {/* CONNECT */}
          <div className="mb-3" data-section="communication">
            <span className="text-label font-semibold tracking-wider text-foreground">
              Connect
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "GitHub", href: "https://github.com/santhosh9863" },
              { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
              { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
              { label: "Resume", href: "https://github.com/santhosh9863/resume/releases" },
            ].map((link) => (
              <TactileButton
                key={link.label}
                variant="sm"
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-1.5 text-mono-sm"
              >
                {link.label}
              </TactileButton>
            ))}
          </div>
        </div>
      </InsetPanel>

      <RaisedPanel className="raised-breathe-trigger flex items-center gap-2 px-4 py-2 animate-[raised-breathe_10s_ease-in-out_infinite]">
        {navItems.map((item) => (
          <SidebarNode
            key={item}
            label={item}
            active={activeNav === item}
            onClick={() => handleNavClick(item)}
          />
        ))}
      </RaisedPanel>

      <div className="flex items-center justify-center py-2">
        <span className="text-footer opacity-20">Santhosh Krishna R</span>
      </div>
    </main>

      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}
    </>
  );
}
