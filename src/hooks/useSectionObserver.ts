"use client";

import { useState, useEffect } from "react";

export type SectionId =
  | "profile"
  | "modules"
  | "matrix"
  | "history"
  | "communication"
  | null;

export function useSectionObserver(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
        setActiveSection(best.ratio > 0 ? best.id : null);
      },
      {
        threshold: [
          0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
        ],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
