"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const hasScrolled = latest > 50;
    if (isScrolled !== hasScrolled) setIsScrolled(hasScrolled);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={{ width: "100%", y: 0, borderRadius: 0 }}
        animate={{
          width: isScrolled ? "auto" : "100%",
          y: isScrolled ? 20 : 0,
          borderRadius: isScrolled ? "99px" : "0px",
          backgroundColor: isScrolled ? "rgba(30, 30, 30, 0.9)" : "rgba(0,0,0,0)",
          padding: isScrolled ? "12px 32px" : "24px 32px",
        }}
        className="pointer-events-auto backdrop-blur-md flex items-center justify-between mx-auto z-50 overflow-hidden text-white"
        style={{ maxWidth: isScrolled ? "fit-content" : "80rem" }}
      >
        {/* 1. MindX Logo - ALWAYS links to Home */}
        <Link href="/" className="font-bold text-xl tracking-tighter hover:opacity-80 transition cursor-pointer">
          Mindx
        </Link>
        
        {/* 2. Desktop Links - ALWAYS visible */}
        <div className="hidden md:flex gap-6 ml-8 text-sm font-medium text-gray-300">
           <Link href="/#work" className="hover:text-white transition">Work</Link>
           <Link href="/about" className="hover:text-white transition">About</Link>
           <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-4 text-white p-1">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 pointer-events-auto"
          >
             <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-8 right-8 text-white bg-neutral-800 p-2 rounded-full"
             >
                <X />
             </button>
             
             {/* Mobile Links */}
             <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white">Home</Link>
             <Link href="/#work" onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white">Work</Link>
             <Link href="/about" onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white">About</Link>
             <Link href="/contact" onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};