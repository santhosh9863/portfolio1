"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useIdleDetector } from "@/hooks/useIdleDetector";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { InsetPanel } from "@/components/surfaces/InsetPanel";
import { RaisedPanel } from "@/components/surfaces/RaisedPanel";
import { ModuleBay } from "@/components/cinematic/ModuleBay";
import { SystemNode } from "@/components/cinematic/SystemNode";
import { TerminalCore } from "@/components/atmosphere/TerminalCore";
import { TactileButton } from "@/components/controls/TactileButton";
import { SidebarNode } from "@/components/layout/SidebarNode";
import { SystemClock } from "@/components/atmosphere/SystemClock";
import { BootSequence } from "@/components/atmosphere/BootSequence";
import {
  PulsePreview,
  pulseChannels,
  PulseWebPreview,
  pulseWebChannels,
  TyproPreview,
  typroChannels,
  PerfectCarePreview,
  perfectCareChannels,
} from "@/components/previews/ProductPreviews";

const primaryTech = [
  { title: "Flutter", subtitle: "Cross-platform framework", utilization: "92%", currentUse: "Pulse ecosystem" },
  { title: "Next.js", subtitle: "React metaframework", utilization: "78%", currentUse: "Web platform" },
  { title: "Firebase", subtitle: "Backend infrastructure", utilization: "85%", currentUse: "Auth + Firestore" },
];

const secondaryTech = [
  { title: "TypeScript", subtitle: "Type-safe JavaScript", utilization: "95%" },
  { title: "Tailwind CSS", subtitle: "Utility-first styling", utilization: "88%" },
  { title: "Dart", subtitle: "Compiled language", utilization: "80%" },
  { title: "React", subtitle: "UI component library", utilization: "72%" },
  { title: "Git", subtitle: "Version control", utilization: "90%" },
  { title: "Vercel", subtitle: "Edge deployment", utilization: "76%" },
];

const techNodes = [...primaryTech, ...secondaryTech] as { title: string; subtitle: string; utilization: string; currentUse?: string }[];

const sectionLabels: Record<string, string> = {
  profile: "About",
  modules: "Projects",
  matrix: "Technology",
  history: "Activity",
  communication: "Connect",
};

const navItems = ["About", "Projects", "Connect"];

export default function Home() {
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
    if (el) {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (el: Element) => void } | undefined;
      if (lenis) {
        lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    const map: Record<string, string> = { About: "profile", Projects: "modules", Connect: "communication" };
    const sectionId = map[label];
    if (sectionId) scrollToSection(sectionId);
  };

  return (
    <>
    <main className="relative mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-[max(1rem,env(safe-area-inset-bottom))] overflow-x-hidden">
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
        <div className="flex flex-col gap-0 px-4 sm:px-6 py-6">

          {/* HERO */}
          <section aria-label="Introduction" data-section="profile">
            <h1 className="text-hero-mobile sm:text-display text-foreground">
              SANTHOSH<br />KRISHNA R
            </h1>
            <p className="text-body-sm sm:text-body-lg text-secondary mt-4 max-w-2xl">
              Frontend engineer building cross-platform products with Flutter, Next.js, and Firebase. Based in Bangalore.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-8">
              {[
                { label: "GitHub", href: "https://github.com/santhosh9863" },
                { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
                { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
                { label: "Resume", href: "https://github.com/santhosh9863/resume" },
              ].map((link) => (
                <TactileButton
                  key={link.label}
                  variant="sm"
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-3 sm:py-2 text-mono-sm"
                >
                  {link.label}
                </TactileButton>
              ))}
            </div>
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* ABOUT */}
          <section aria-label="About">
            <div className="mb-5 sm:mb-6" data-section="about-inline">
              <span className="text-label text-foreground">
                About
              </span>
            </div>
            <p className="text-body-sm sm:text-body-lg text-secondary max-w-2xl leading-relaxed">
              Frontend engineer building cross-platform products with Flutter, Next.js, and Firebase. Currently focused on real-time attendance systems, responsive web platforms, and cinematic UI engineering. Based in Bangalore.
            </p>
            <div className="mt-6 sm:mt-7">
              <div className="grid grid-cols-[7.5em_1fr] gap-x-4 gap-y-3 sm:gap-y-3.5">
                <span className="text-mono-xs text-muted uppercase tracking-wider">Stack</span>
                <span className="text-body-sm sm:text-body text-foreground">Flutter / Next.js / Firebase</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Education</span>
                <span className="text-body-sm sm:text-body text-foreground">BCA — St. Francis College</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Location</span>
                <span className="text-body-sm sm:text-body text-foreground">Bangalore, India</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Languages</span>
                <span className="text-body-sm sm:text-body text-foreground">English / Kannada / Telugu / Tamil / Hindi</span>
              </div>
            </div>
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* PROJECTS */}
          <section aria-label="Projects">
            <div className="mb-5 sm:mb-6" data-section="modules">
              <span className="text-label text-foreground">
                Projects
              </span>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6">

          <ModuleBay
            name="Pulse"
            subtitle="Attendance intelligence platform"
            description="Real-time attendance analytics with subject tracking, prediction modeling, and Firebase-powered sync infrastructure."
            status="Active"
            stack="Flutter / Firebase / Dart"
            year="2026"
            components={[
              "attendance analytics",
              "attendance simulator",
              "subject tracking",
              "prediction system",
              "firebase authentication",
              "realtime synchronization",
              "apk deployment workflow",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/attendance-tracker" },
              { label: "Releases", href: "https://github.com/santhosh9863/attendance-tracker/releases" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse"}
            previewContent={<PulsePreview />}
            previewChannels={pulseChannels}
            decisions={[
              { area: "Flutter", text: "Cross-platform from single codebase", outcome: "Android + desktop" },
              { area: "Provider", text: "Lightweight state without runtime overhead", outcome: "Minimal rebuilds" },
              { area: "Firebase", text: "Real-time sync for attendance updates", outcome: "Instant across devices" },
              { area: "QR Flow", text: "3-tap attendance reduces friction", outcome: "45s → 8s marking" },
            ]}
            archFlow={[
              { name: "Flutter App", role: "presentation layer" },
              { name: "Provider State", role: "state management" },
              { name: "Firebase Auth", role: "authentication" },
              { name: "Firestore DB", role: "realtime storage" },
              { name: "Attendance Pipeline", role: "analytics & sync" },
            ]}
            story={{
              purpose: "Realtime attendance intelligence platform",
              problem: "Manual tracking is slow and hard to analyze over time",
              approach: "Flutter + Provider + Firebase for cross-platform realtime sync",
              journey: "MVP tracking via analytics, predictions, then APK pipeline",
              result: "3-tap attendance marking with live analytics dashboards",
            }}
            onOpen={() => handleModuleOpen("Pulse")}
            onClose={handleModuleClose}
          />

          <ModuleBay
            name="Pulse Web"
            subtitle="Cross-platform web dashboard"
            description="Responsive web companion for Pulse — dashboard analytics, mobile-first layout, and Vercel-optimized static delivery."
            status="Live"
            stack="Next.js / React / Tailwind CSS"
            year="2026"
            components={[
              "responsive dashboard",
              "mobile-first layout",
              "interaction system",
              "component architecture",
              "static optimization",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/pulse-web-platform" },
              { label: "Live", href: "https://pulse-web-platform.vercel.app" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse Web"}
            previewContent={<PulseWebPreview />}
            previewChannels={pulseWebChannels}
            decisions={[
              { area: "Next.js", text: "Static generation for instant page loads", outcome: "Edge CDN delivery" },
              { area: "Tailwind", text: "Utility-first responsive system", outcome: "Consistent breakpoints" },
              { area: "Architecture", text: "Modular component tree for dashboards", outcome: "Reusable views" },
              { area: "Assets", text: "Optimized static asset pipeline", outcome: "Sub-second load" },
            ]}
            archFlow={[
              { name: "Next.js Frontend", role: "static generation" },
              { name: "Tailwind UI", role: "responsive system" },
              { name: "Static Optimizer", role: "asset pipeline" },
              { name: "Vercel Edge", role: "CDN deployment" },
            ]}
            story={{
              purpose: "Responsive web dashboard for the Pulse ecosystem",
              problem: "Mobile-only access limited desktop monitoring capability",
              approach: "Next.js static generation for fast page delivery on edge",
              journey: "Dashboard layout via analytics views then edge deployment",
              result: "Sub-second loading companion dashboard with live metrics",
            }}
            onOpen={() => handleModuleOpen("Pulse Web")}
            onClose={handleModuleClose}
          />

          <ModuleBay
            name="Typro UI"
            subtitle="Neumorphic component system"
            description="Cinematic UI engine with depth-rendered shadows, mechanical interaction physics, and industrial design language — used to build this portfolio."
            status="Live"
            stack="Next.js / TypeScript / Vercel"
            year="2026"
            components={[
              "depth rendering",
              "interaction system",
              "responsive engine",
              "type-safe architecture",
              "deployment pipeline",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/typro-ui-engine" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Typro UI"}
            previewContent={<TyproPreview />}
            previewChannels={typroChannels}
            decisions={[
              { area: "Neumorphism", text: "Depth-based interaction without color", outcome: "Tactile + restrained" },
              { area: "Motion", text: "Mechanical timing system", outcome: "160ms hover, 40ms press" },
              { area: "TypeScript", text: "Strict interfaces for shadow engine", outcome: "Type-safe CSS variables" },
              { area: "Architecture", text: "CSS custom property shadow system", outcome: "Scalable across 50+ components" },
            ]}
            archFlow={[
              { name: "Next.js App", role: "component host" },
              { name: "Neumorphic Engine", role: "shadow system" },
              { name: "Motion Controller", role: "interaction timing" },
              { name: "CSS Variables", role: "theme architecture" },
              { name: "Responsive Layer", role: "viewport scaling" },
            ]}
            story={{
              purpose: "Cinematic neumorphic UI for tactile portfolio experiences",
              problem: "Most portfolios lack immersive interaction quality",
              approach: "CSS shadow engine with mechanical timing via TypeScript",
              journey: "Shadow system via interaction physics then motion refinement",
              result: "50+ component design system with depth-based interactions",
            }}
            onOpen={() => handleModuleOpen("Typro UI")}
            onClose={handleModuleClose}
          />

          <ModuleBay
            name="Perfect Care"
            subtitle="Professional service platform"
            description="Clean business frontend with responsive service presentation, optimized delivery pipeline, and cross-device layout system."
            status="Live"
            stack="Next.js / Tailwind / Vercel"
            year="2025"
            components={[
              "service presentation",
              "responsive layout",
              "frontend optimization",
              "deployment workflow",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/perfect-care-platform" },
              { label: "Live", href: "https://perfect-care-platform.vercel.app" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Perfect Care"}
            previewContent={<PerfectCarePreview />}
            previewChannels={perfectCareChannels}
            decisions={[
              { area: "Next.js", text: "Static generation for service pages", outcome: "Fast content delivery" },
              { area: "Tailwind", text: "Responsive layout utilities", outcome: "Cross-device consistency" },
              { area: "Architecture", text: "Component composition for cards", outcome: "Reusable presentation" },
            ]}
            archFlow={[
              { name: "Next.js Frontend", role: "static pages" },
              { name: "Tailwind Layout", role: "responsive grid" },
              { name: "Component System", role: "service cards" },
              { name: "Vercel Deploy", role: "edge delivery" },
            ]}
            story={{
              purpose: "Clean business frontend for professional service presentation",
              problem: "Small businesses need simple yet polished online presence",
              approach: "Next.js static generation with Tailwind responsive layout",
              journey: "Static page structure via responsive refinement then deployment",
              result: "Fast cross-device service platform with optimized delivery",
            }}
            onOpen={() => handleModuleOpen("Perfect Care")}
            onClose={handleModuleClose}
          />

          </div>

          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* TECHNOLOGY */}
          <section aria-label="Technology">
            <div className="mb-5 sm:mb-6" data-section="matrix">
              <span className="text-label text-foreground">
                Technology
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* ACTIVITY */}
          <section aria-label="Activity">
            <div className="mb-5 sm:mb-6" data-section="history">
              <span className="text-label text-foreground">
                Activity
              </span>
            </div>

            <TerminalCore idle={isIdle} activeSection={activeSection} />
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* CONNECT */}
          <section aria-label="Connect">
            <div className="mb-5 sm:mb-6" data-section="communication">
              <span className="text-label text-foreground">
                Connect
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "GitHub", href: "https://github.com/santhosh9863" },
                { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
                { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
                { label: "Resume", href: "https://github.com/santhosh9863/resume" },
              ].map((link) => (
                <TactileButton
                  key={link.label}
                  variant="sm"
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 text-mono-sm"
                >
                  {link.label}
                </TactileButton>
              ))}
            </div>
          </section>
        </div>
      </InsetPanel>

      <nav aria-label="Navigation">
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
      </nav>

      <div className="flex items-center justify-center py-2">
        <span className="text-footer opacity-20">Santhosh Krishna R</span>
      </div>
    </main>

      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}
    </>
  );
}
