"use client";

import { useState, useEffect, useCallback } from "react";

export function CursorTracker() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: MouseEvent) => {
    setPos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(900px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.04) 0%, transparent 55%)`,
      }}
      aria-hidden="true"
    />
  );
}
