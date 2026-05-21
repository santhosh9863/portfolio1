"use client";

import { useState, useEffect } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const initLines = [
  { text: "INITIALIZING SANthosh OS...", at: 150 },
  { text: "LOADING CORE MODULES...", at: 350 },
  { text: "VERIFYING RUNTIME...", at: 550 },
  { text: "ESTABLISHING NETWORK...", at: 750 },
  { text: "SYSTEM STABLE.", at: 950 },
];

const moduleActivations = [
  { module: "PULSE SYSTEM", status: "ONLINE", at: 1050 },
  { module: "FIREBASE CHANNEL", status: "ACTIVE", at: 1200 },
  { module: "DEPLOYMENT CORE", status: "STABLE", at: 1350 },
  { module: "ANALYTICS", status: "SYNCHRONIZED", at: 1500 },
];

const finalLines = [
  { text: "SESSION ESTABLISHED.", at: 1650 },
  { text: "SYSTEM STATUS: OPERATIONAL", at: 1800 },
];

const FADE_START = 1950;
const FADE_DURATION = 400;
const TOTAL_DURATION = FADE_START + FADE_DURATION + 50;

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [show, setShow] = useState<number>(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const all = [...initLines, ...moduleActivations, ...finalLines, { text: "", at: FADE_START }];
    const timers: NodeJS.Timeout[] = [];

    for (const item of all) {
      timers.push(setTimeout(() => setShow(item.at), item.at));
    }

    timers.push(setTimeout(() => setFading(true), FADE_START));
    timers.push(setTimeout(() => { setShow(TOTAL_DURATION); onComplete(); }, TOTAL_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (show >= TOTAL_DURATION) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--typro-bg)]"
      style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
    >
      <div className="flex flex-col gap-1.5">
        {initLines.map(
          (l) =>
            show >= l.at && (
              <span key={l.text} className="text-mono-sm text-muted">
                {l.text}
              </span>
            ),
        )}

        {show >= moduleActivations[0].at && <div className="my-1" />}

        {moduleActivations.map(
          (m) =>
            show >= m.at && (
              <span key={m.module} className="flex items-center gap-2 text-mono-sm">
                <span className="text-muted">[{m.module}]</span>
                <span className="text-correct">{m.status}</span>
              </span>
            ),
        )}

        {show >= finalLines[0].at && <div className="my-1" />}

        {finalLines.map(
          (l) =>
            show >= l.at && (
              <span key={l.text} className="text-mono-sm text-muted">
                {l.text}
              </span>
            ),
        )}
      </div>
    </div>
  );
}
