"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.5,
      touchMultiplier: 0.35,
      autoResize: true,
    });

    (window as unknown as Record<string, unknown>).__lenis = lenis;

    const root = document.documentElement;
    let scrollTimer: ReturnType<typeof setTimeout>;
    lenis.on("scroll", () => {
      root.dataset.scrolling = "true";
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        delete root.dataset.scrolling;
      }, 200);
    });

    let rafId: number;

    const raf = (time: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(raf);
        return;
      }
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      clearTimeout(scrollTimer);
    };
  }, []);

  return children;
}
