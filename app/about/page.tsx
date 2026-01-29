"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// --- Navbar (Local copy for now) ---
const Navbar = () => {
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
        <div className="font-bold text-xl tracking-tighter">Mindx</div>
        <div className="hidden md:flex gap-6 ml-8 text-sm font-medium text-gray-300">
           <a href="/" className="hover:text-white transition">Home</a>
           <a href="/#work" className="hover:text-white transition">Work</a>
           <a href="/about" className="text-white">About</a>
           <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>
      </motion.nav>
    </div>
  );
};

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section with Blur Animation */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/p2.avif" // Use a dark/moody image here (rename your file to p2.jpg or similar)
            alt="About Background"
            fill
            className="object-cover opacity-60"
          />
          {/* Gradient Overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Animated Text Overlay */}
        <div className="relative z-10 max-w-4xl px-6 text-center md:text-left md:absolute md:bottom-20 md:left-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight"
          >
            It all began in a <br /> 
            <span className="text-gray-400">small studio nestled</span> <br />
            in the heart of the city.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg text-gray-300 max-w-xl"
          >
            I’m Saransh, a Data Analyst and UI/UX Designer driven by the belief that data 
            is just a story waiting to be told.
          </motion.p>
        </div>
      </section>

      {/* Story / Text Section */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-200">The Journey</h2>
        <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
            <p>
                My journey started with a simple curiosity: how do things work? 
                That curiosity led me from the logic of Python and SQL to the creativity of 
                Framer and Web Design.
            </p>
            <p>
                Today, I sit at the intersection of these two worlds. I don't just build dashboards; 
                I build experiences. I don't just write code; I craft narratives.
            </p>
            <p>
                Whether it's automating a complex report or designing a pixel-perfect landing page, 
                my goal remains the same: clarity, beauty, and impact.
            </p>
        </div>
      </section>

    </main>
  );
}