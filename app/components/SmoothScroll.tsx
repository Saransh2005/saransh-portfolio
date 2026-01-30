"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // Higher = "Heavier" / Slower stop
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // The physics curve
      // smoothWheel: true, // (Default is true)
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // It renders nothing visually, just adds physics
}