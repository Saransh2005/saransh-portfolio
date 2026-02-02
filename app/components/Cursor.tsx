"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // We use a slightly larger size so the inversion effect is clearly visible
  const size = 32; 

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMouse);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  return (
    <motion.div
      // THE SECRET SAUCE: mix-blend-difference
      // When a white shape has this mode over a black bg, it looks white.
      // When it goes over white text, it turns black.
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ 
        width: size, 
        height: size, 
      }}
      // We offset by half the size to center the circle on the mouse pointer
      animate={{ 
        x: mousePosition.x - size / 2, 
        y: mousePosition.y - size / 2 
      }}
      // A slightly softer spring for a premium feel
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
    />
  );
}