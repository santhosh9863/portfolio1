"use client";

import type { DisplayChannelDef } from "@/components/cinematic/DisplayMonitor";

/* ── PULSE — Attendance Intelligence Platform ── */

function PulseMain() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Attendance Dashboard</span>
        <span className="preview-status">● LIVE</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="preview-stat__label">Today</span>
        <span className="preview-stat__value">
          45<span className="preview-stat__value--correct"> /48</span>
        </span>
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Present</span>
        <span className="preview-stat__value">42</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--correct" style={{ width: "87%" }} />
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Absent</span>
        <span className="preview-stat__value">3</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--accent" style={{ width: "6%" }} />
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Leave</span>
        <span className="preview-stat__value">3</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill" style={{ width: "6%" }} />
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Mathematics</span>
        <span className="preview-footer__dot" />
        <span className="preview-footer__label">93%</span>
      </div>
    </div>
  );
}

function PulseAnalytics() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Analytics</span>
        <span className="preview-status">SYNC: ACTIVE</span>
      </div>
      <div className="preview-grid">
        <div>
          <span className="preview-stat__label">Total</span>
          <div className="preview-stat__value">1,247</div>
        </div>
        <div>
          <span className="preview-stat__label">This Week</span>
          <div className="preview-stat__value preview-stat__value--correct">+12%</div>
        </div>
        <div>
          <span className="preview-stat__label">Avg Daily</span>
          <div className="preview-stat__value">48</div>
        </div>
        <div>
          <span className="preview-stat__label">Trend</span>
          <div className="preview-stat__value preview-stat__value--accent">↑ 8%</div>
        </div>
      </div>
      <div className="preview-divider" />
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Subject Tracking</span>
        <span className="preview-row__value">6 active</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Prediction Model</span>
        <span className="preview-row__value">94% accuracy</span>
      </div>
    </div>
  );
}

function PulseMobile() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Mobile Interface</span>
        <span className="preview-status">v2.1.0</span>
      </div>
      <div className="flex flex-col items-center gap-1.5 py-1">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-0.5 rounded bg-[rgba(0,0,0,0.02)] px-2 py-1">
            <span className="preview-stat__label">Mark</span>
            <span className="preview-stat__value">42</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 rounded bg-[rgba(0,0,0,0.02)] px-2 py-1">
            <span className="preview-stat__label">Scan</span>
            <span className="preview-stat__value">●</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 rounded bg-[rgba(0,0,0,0.02)] px-2 py-1">
            <span className="preview-stat__label">Report</span>
            <span className="preview-stat__value">PDF</span>
          </div>
        </div>
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Flutter</span>
        <span className="preview-footer__dot" />
        <span className="preview-footer__label">Provider</span>
        <span className="preview-footer__dot" />
        <span className="preview-footer__label">Firestore</span>
      </div>
    </div>
  );
}

export const pulseChannels: DisplayChannelDef[] = [
  { id: "dashboard", label: "DASHBOARD", content: <PulseMain /> },
  { id: "analytics", label: "ANALYTICS", content: <PulseAnalytics /> },
  { id: "mobile", label: "MOBILE", content: <PulseMobile /> },
];

export function PulsePreview() {
  return <PulseMain />;
}

/* ── PULSE WEB — Cross-platform Dashboard ── */

function PulseWebAnalytics() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Analytics</span>
        <span className="preview-status">REALTIME</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Page Views</span>
        <span className="preview-row__value">342</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--idle" />
        <span className="preview-row__label">API Calls</span>
        <span className="preview-row__value">89</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Static Assets</span>
        <span className="preview-row__value">28</span>
      </div>
      <div className="preview-divider" />
      <div className="flex items-center justify-between">
        <span className="preview-stat__label">Load Time</span>
        <span className="preview-stat__value">0.8s</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--accent" style={{ width: "24%" }} />
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Static Generation</span>
      </div>
    </div>
  );
}

export const pulseWebChannels: DisplayChannelDef[] = [
  { id: "analytics", label: "ANALYTICS", content: <PulseWebAnalytics /> },
];

export function PulseWebPreview() {
  return <PulseWebAnalytics />;
}

/* ── TYPRO UI — Neumorphic Component System ── */

function TyproMain() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Neumorphic Engine</span>
        <span className="preview-status">● ONLINE</span>
      </div>
      <div className="flex items-center justify-center gap-3 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e0e5ec] shadow-[3px_3px_6px_rgba(163,177,198,0.58),-3px_-3px_6px_rgba(255,255,255,0.85)] text-[0.5rem] text-[rgba(45,52,54,0.4)]">
          A
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d1d9e6] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.58),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] text-[0.5rem] text-[rgba(45,52,54,0.55)]">
          B
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e0e5ec] shadow-[3px_3px_6px_rgba(163,177,198,0.58),-3px_-3px_6px_rgba(255,255,255,0.85)] text-[0.5rem] text-[rgba(45,52,54,0.4)]">
          C
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d1d9e6] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.58),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] text-[0.5rem] text-[rgba(45,52,54,0.55)]">
          D
        </div>
      </div>
      <div className="preview-divider" />
      <div className="preview-stat">
        <span className="preview-stat__label">Raised Sm</span>
        <span className="preview-stat__value">3px/6px</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--accent" style={{ width: "58%" }} />
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Inset Nd</span>
        <span className="preview-stat__value">2px/4px</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill" style={{ width: "42%" }} />
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Depth System Active</span>
      </div>
    </div>
  );
}

function TyproInteraction() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Interaction Demo</span>
        <span className="preview-status">160ms HOVER</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 py-1">
        <div className="rounded bg-[#e0e5ec] px-1.5 py-0.5 shadow-[2px_2px_4px_rgba(163,177,198,0.45),-2px_-2px_4px_rgba(255,255,255,0.75)] text-[0.4375rem] text-[rgba(45,52,54,0.35)]">
          Press
        </div>
        <div className="rounded bg-[#d1d9e6] px-1.5 py-0.5 shadow-[inset_1.5px_1.5px_3px_rgba(163,177,198,0.5),inset_-1.5px_-1.5px_3px_rgba(255,255,255,0.8)] text-[0.4375rem] text-[rgba(45,52,54,0.5)]">
          Hold
        </div>
        <div className="rounded bg-[#e0e5ec] px-1.5 py-0.5 shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.8)] text-[0.4375rem] text-[rgba(45,52,54,0.35)]">
          Lift
        </div>
      </div>
      <div className="preview-divider" />
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Mechanical Easing</span>
        <span className="preview-row__value">cubic-bezier</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Shadow Physics</span>
        <span className="preview-row__value">validated</span>
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">40ms Press Response</span>
      </div>
    </div>
  );
}

function TyproLayout() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Responsive Engine</span>
        <span className="preview-status">ACTIVE</span>
      </div>
      <div className="flex items-center justify-center gap-3 py-2">
        <div className="flex flex-col gap-0.5">
          <div className="h-6 w-4 rounded bg-[rgba(0,0,0,0.03)]" />
          <span className="text-center text-[0.375rem] text-[rgba(45,52,54,0.2)]">SM</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="h-8 w-8 rounded bg-[rgba(0,0,0,0.03)]" />
          <span className="text-center text-[0.375rem] text-[rgba(45,52,54,0.2)]">MD</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="h-10 w-16 rounded bg-[rgba(0,0,0,0.03)]" />
          <span className="text-center text-[0.375rem] text-[rgba(45,52,54,0.2)]">LG</span>
        </div>
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Tailwind · Responsive</span>
      </div>
    </div>
  );
}

export const typroChannels: DisplayChannelDef[] = [
  { id: "engine", label: "ENGINE", content: <TyproMain /> },
  { id: "interaction", label: "INTERACTION", content: <TyproInteraction /> },
  { id: "layout", label: "LAYOUT", content: <TyproLayout /> },
];

export function TyproPreview() {
  return <TyproMain />;
}

/* ── PERFECT CARE — Professional Service Platform ── */

function PerfectCareMain() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Service Platform</span>
        <span className="preview-status">● ONLINE</span>
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Hair Styling</span>
        <span className="preview-stat__value">$45</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--correct" style={{ width: "100%" }} />
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Facial Care</span>
        <span className="preview-stat__value">$60</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--correct" style={{ width: "100%" }} />
      </div>
      <div className="preview-stat">
        <span className="preview-stat__label">Manicure</span>
        <span className="preview-stat__value">$35</span>
      </div>
      <div className="preview-bar">
        <div className="preview-bar__fill--accent" style={{ width: "80%" }} />
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Booking Open</span>
        <span className="preview-footer__dot" />
        <span className="preview-footer__label">4 Services</span>
      </div>
    </div>
  );
}

function PerfectCareBooking() {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Booking</span>
        <span className="preview-status">AVAILABLE</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Today</span>
        <span className="preview-row__value">6 slots</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--active" />
        <span className="preview-row__label">Tomorrow</span>
        <span className="preview-row__value">12 slots</span>
      </div>
      <div className="preview-row">
        <span className="preview-row__indicator--idle" />
        <span className="preview-row__label">This Week</span>
        <span className="preview-row__value">34 slots</span>
      </div>
      <div className="preview-divider" />
      <div className="flex items-center justify-between">
        <span className="preview-stat__label">Next Available</span>
        <span className="preview-stat__value preview-stat__value--correct">Today 2pm</span>
      </div>
      <div className="preview-footer">
        <span className="preview-footer__label">Responsive Layout</span>
      </div>
    </div>
  );
}

export const perfectCareChannels: DisplayChannelDef[] = [
  { id: "services", label: "SERVICES", content: <PerfectCareMain /> },
  { id: "booking", label: "BOOKING", content: <PerfectCareBooking /> },
];

export function PerfectCarePreview() {
  return <PerfectCareMain />;
}
