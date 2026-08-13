"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { InsetPanel } from "@/components/surfaces/InsetPanel";
import { RaisedPanel } from "@/components/surfaces/RaisedPanel";
import { ModuleBay } from "@/components/cinematic/ModuleBay";
import { SystemNode } from "@/components/cinematic/SystemNode";
import { TactileButton } from "@/components/controls/TactileButton";
import { SidebarNode } from "@/components/layout/SidebarNode";
import { SystemClock } from "@/components/atmosphere/SystemClock";
import { BootSequence } from "@/components/atmosphere/BootSequence";
import {
  PulsePreview,
  pulseChannels,
  PulseWebPreview,
  pulseWebChannels,
} from "@/components/previews/ProductPreviews";

const primaryTech = [
  { title: "Flutter", subtitle: "Cross-platform app framework", usage: "→ Pulse attendance platform" },
  { title: "Next.js", subtitle: "React metaframework deployment", usage: "→ Portfolio + Pulse Web" },
  { title: "Firebase", subtitle: "Realtime backend infrastructure", usage: "→ Auth + realtime sync" },
];

const secondaryTech = [
  { title: "TypeScript", subtitle: "Strict React architecture typing", usage: "→ Typed frontend systems" },
  { title: "Tailwind CSS", subtitle: "Utility-first responsive styling", usage: "→ Rapid UI iteration" },
  { title: "Dart", subtitle: "Flutter application language", usage: "→ Provider app architecture" },
  { title: "React", subtitle: "Composable frontend architecture", usage: "→ Interactive UI systems" },
  { title: "Git", subtitle: "Version control workflow", usage: "→ Releases + branching" },
  { title: "Vercel", subtitle: "Edge deployment platform", usage: "→ Production web hosting" },
];

const techNodes: { title: string; subtitle: string; usage?: string; featured?: boolean }[] = [
  { title: "Python", subtitle: "General-purpose programming language", featured: true },
  ...primaryTech,
  ...secondaryTech,
];

const sectionLabels: Record<string, string> = {
  profile: "About",
  client: "Client Work",
  modules: "Projects",
  matrix: "Technology",
  communication: "Connect",
};

const navItems = ["About", "Projects", "Connect"];

export default function Home() {
  const [activeNav, setActiveNav] = useState("About");
  const [bootDone, setBootDone] = useState(false);
  const activeSection = useSectionObserver();
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

  const scrollToSection = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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

      <InsetPanel className={cn(activeModule && "well--focused")}>
        <div className="flex flex-col gap-0 px-4 sm:px-6 py-6">

          {/* HERO */}
          <section aria-label="Introduction" data-section="profile">
            <h1 className="text-hero-mobile sm:text-display text-foreground">
              SANTHOSH<br />KRISHNA R
            </h1>
            <p className="text-body-sm sm:text-body-lg text-secondary mt-4 max-w-2xl leading-relaxed">
              BCA student building cross-platform products with Flutter, Next.js, and Firebase. Real-time systems, production apps, and clean architecture.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-8">
              {[
                { label: "GitHub", href: "https://github.com/santhosh9863" },
                { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
                { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
                { label: "Resume", href: "/santhosh_resume.html" },
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
              BCA student at St. Francis College, Bangalore. I build cross-platform applications using Flutter for mobile and Next.js for web, powered by Firebase for authentication, real-time sync, and serverless infrastructure. My work spans attendance intelligence platforms, responsive dashboards, and engineered UI systems — all shipped to production.
            </p>
            <div className="mt-6 sm:mt-7">
              <div className="grid grid-cols-[7.5em_1fr] gap-x-4 gap-y-3 sm:gap-y-3.5">
                <span className="text-mono-xs text-muted uppercase tracking-wider">Stack</span>
                <span className="text-body-sm sm:text-body text-foreground">Flutter / Next.js / Firebase / Tailwind</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Education</span>
                <span className="text-body-sm sm:text-body text-foreground">BCA — St. Francis College, Bangalore</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Location</span>
                <span className="text-body-sm sm:text-body text-foreground">Bangalore, India</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Focus</span>
                <span className="text-body-sm sm:text-body text-foreground">Cross-platform mobile + web applications</span>
                <span className="text-mono-xs text-muted uppercase tracking-wider">Languages</span>
                <span className="text-body-sm sm:text-body text-foreground">English / Kannada / Telugu / Tamil / Hindi</span>
              </div>
            </div>
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* CLIENT WORK */}
          <section aria-label="Client Work">
            <div className="mb-5 sm:mb-6" data-section="client">
              <span className="text-label text-foreground">
                Client Work
              </span>
            </div>

            <RaisedPanel className="px-4 sm:px-6 py-5 sm:py-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="module-identity min-w-0">
                    <span className="module-identity__name">
                      Raahi Global — Client Application
                    </span>
                    <span className="module-identity__blurb">
                      German learning and placement platform
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-mono-xs text-correct">
                    <span className="led-indicator inline-block h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                    Delivered / Production
                  </span>
                </div>

                <p className="text-body-sm sm:text-body text-secondary max-w-2xl leading-relaxed">
                  Cross-platform mobile application and responsive admin dashboard developed for Raahi Global, a German learning and placement platform.
                </p>

                <div className="grid grid-cols-[7.5em_1fr] gap-x-4 gap-y-3 sm:gap-y-3.5">
                  <span className="text-mono-xs text-muted uppercase tracking-wider">Role</span>
                  <span className="text-body-sm sm:text-body text-foreground">Full-Stack / Flutter Developer</span>
                  <span className="text-mono-xs text-muted uppercase tracking-wider">Platform</span>
                  <span className="text-body-sm sm:text-body text-foreground">Flutter · Firebase · Web Admin</span>
                  <span className="text-mono-xs text-muted uppercase tracking-wider">Work</span>
                  <span className="text-body-sm sm:text-body text-foreground">Mobile App · Admin Dashboard · Authentication · Notifications · Meetings</span>
                  <span className="text-mono-xs text-muted uppercase tracking-wider">Status</span>
                  <span className="text-body-sm sm:text-body text-foreground">Delivered / Production</span>
                </div>

                <p className="text-body-sm sm:text-body text-secondary max-w-2xl leading-relaxed">
                  Designed and developed the application experience, Firebase-powered backend integration, authentication flows, notifications, and responsive administration dashboard for the client.
                </p>
              </div>
            </RaisedPanel>
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
            description="Flutter-based attendance tracker with real-time Firestore sync, subject-wise analytics, and a prediction system that helps identify attendance patterns. Built with Provider for lightweight state management."
            status="Active"
            stack="Flutter / Dart / Firebase / Firestore"
            year="2026"
            components={[
              "Analytics Dashboard",
              "Subject Tracker",
              "Prediction Engine",
              "Auth Gateway",
              "Realtime Sync",
              "APK Pipeline",
              "Responsive Shell",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/safebunk" },
              { label: "Releases", href: "https://github.com/santhosh9863/safebunk/releases" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse"}
            previewContent={<PulsePreview />}
            previewChannels={pulseChannels}
            decisions={[
              { area: "Flutter", text: "Single codebase for Android and desktop", outcome: "Faster iteration, consistent UI" },
              { area: "Provider", text: "Lightweight state without runtime overhead", outcome: "Minimal rebuilds, clean separation" },
              { area: "Firebase", text: "Real-time Firestore for live attendance sync", outcome: "Instant updates across devices" },
              { area: "QR Flow", text: "3-tap attendance flow instead of manual entry", outcome: "45s → 8s per marking" },
            ]}
            archFlow={[
              { name: "Flutter App", role: "cross-platform UI layer" },
              { name: "Provider State", role: "lightweight state management" },
              { name: "Firebase Auth", role: "email + Google sign-in" },
              { name: "Cloud Firestore", role: "realtime attendance storage" },
              { name: "Analytics Pipeline", role: "subject-wise computation" },
            ]}
            story={{
              purpose: "Real-time attendance analytics for students and educators",
              problem: "Manual attendance records are slow, error-prone, and hard to analyze across subjects over time",
              approach: "Built with Flutter for cross-platform reach, Firebase for real-time sync, and Provider for clean state architecture",
              journey: "Started with basic CRUD tracking, added subject analytics, then prediction modeling, and finally a QR-based flow that reduced marking time by 80%",
              result: "3-tap attendance marking with live dashboards, subject-wise analytics, and APK distribution pipeline",
            }}
            onOpen={() => handleModuleOpen("Pulse")}
            onClose={handleModuleClose}
          />

          <ModuleBay
            name="Pulse Web"
            subtitle="Responsive analytics dashboard"
            description="Next.js web companion for Pulse — real-time attendance data visualization, mobile-first responsive layout, and static-optimized delivery via Vercel."
            status="Live"
            stack="Next.js / React / TypeScript / Tailwind CSS"
            year="2026"
            components={[
              "Analytics Dashboard",
              "Data Visualization",
              "Responsive Shell",
              "Component System",
              "Edge Delivery",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/santhosh9863/Pulse-website" },
              { label: "Live", href: "https://pulse-website-pi.vercel.app" },
            ]}
            isDimmed={activeModule !== null && activeModule !== "Pulse Web"}
            previewContent={<PulseWebPreview />}
            previewChannels={pulseWebChannels}
            decisions={[
              { area: "Next.js", text: "Static generation for fast page loads on edge", outcome: "Instant initial render via CDN" },
              { area: "Tailwind", text: "Utility-first responsive system", outcome: "Consistent breakpoints, less CSS overhead" },
              { area: "TypeScript", text: "Type-safe component interfaces", outcome: "Clean data contracts across views" },
              { area: "Vercel", text: "Edge-optimized static deployment", outcome: "Sub-second load times globally" },
            ]}
            archFlow={[
              { name: "Next.js App", role: "static site generation" },
              { name: "Tailwind UI", role: "responsive design system" },
              { name: "React Components", role: "modular dashboard views" },
              { name: "Vercel Edge", role: "CDN deployment + caching" },
            ]}
            story={{
              purpose: "Web-based analytics dashboard that extends the Pulse mobile app to desktop browsers",
              problem: "Attendance data was only accessible on mobile, limiting review and analysis on larger screens",
              approach: "Next.js static generation with Tailwind CSS for a responsive, fast-loading companion dashboard",
              journey: "Designed the dashboard layout system first, built analytics views with reusable components, then optimized for static delivery on Vercel's edge network",
              result: "A sub-second loading web companion that mirrors Pulse's attendance data with full desktop readability",
            }}
            onOpen={() => handleModuleOpen("Pulse Web")}
            onClose={handleModuleClose}
          />

          </div>

          <div className="flex flex-col gap-4 mt-6 sm:mt-8">
            <p className="text-body-sm sm:text-body text-secondary max-w-2xl leading-relaxed">
              Beyond these two, I&apos;ve built several websites with HTML and Next.js, along with Flutter mobile applications backed by Firebase. I&apos;ve also developed production ready applications for real clients.
            </p>
            <p className="text-body-sm sm:text-body text-secondary max-w-2xl leading-relaxed">
              For more of my work, visit my GitHub.
            </p>
            <div>
              <TactileButton
                variant="sm"
                as="a"
                href="https://github.com/santhosh9863"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-4 py-2 text-mono-sm"
              >
                [GitHub]
              </TactileButton>
            </div>
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
                  usage={node.usage}
                  featured={node.featured}
                />
              ))}
            </div>

            <div className="surface-cavity rounded-lg mt-4 px-4 py-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-mono-xs text-muted uppercase tracking-wider">Core</span>
              <span className="text-mono-sm text-secondary">HTML · CSS · Java</span>
              <span className="text-mono-xs text-correct font-black">3+ YEARS</span>
              <span className="text-mono-xs text-muted">·</span>
              <span className="text-mono-sm text-subtle">Technologies listed above are additional knowledge</span>
            </div>
          </section>

          <hr className="my-8 sm:my-10 border-t border-border" />

          {/* CONNECT */}
          <section aria-label="Connect">
            <div className="mb-5 sm:mb-6" data-section="communication">
              <span className="text-label text-foreground">
                Connect
              </span>
            </div>

            <p className="text-body-sm sm:text-body text-secondary max-w-xl mb-5">
              Open to internship and project collaboration opportunities. If you are working on something interesting, feel free to reach out.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "GitHub", href: "https://github.com/santhosh9863" },
                { label: "LinkedIn", href: "https://linkedin.com/in/santhosh-krishna-698638372" },
                { label: "Email", href: "mailto:santhoshkrishna.r67@gmail.com" },
                { label: "Resume", href: "/santhosh_resume.html" },
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
        <RaisedPanel className="flex items-center gap-2 px-4 py-2">
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
