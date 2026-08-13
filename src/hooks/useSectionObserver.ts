"use client";

import { useState, useEffect, useRef } from "react";

export type SectionId =
  | "profile"
  | "client"
  | "modules"
  | "matrix"
  | "history"
  | "communication"
  | null;

export function useSectionObserver(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!elements.length) return;

    const root = document.documentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          let best: { id: SectionId; ratio: number } = { id: null, ratio: 0 };
          for (const entry of entries) {
            const ratio = entry.intersectionRatio;
            if (ratio > best.ratio) {
              best = {
                id: (entry.target as HTMLElement).dataset
                  .section as SectionId,
                ratio,
              };
            }
          }
          const id = best.ratio > 0 ? best.id : null;
          root.dataset.activeSection = id || "";
          setActiveSection(id);
        });
      },
      { threshold: [0, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return activeSection;
}
