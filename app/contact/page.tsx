"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

// --- Navbar (We reuse this here or you can make it a component) ---
// For now, I will include it directly to ensure it works on this page too.
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
           <a href="/contact" className="text-white">Contact</a>
        </div>
      </motion.nav>
    </div>
  );
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Text */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                Let's start <br /> a project.
            </h1>
            <div className="text-right">
                <p className="text-gray-400 text-lg mb-2">Email</p>
                <a href="mailto:info@vence.com" className="text-2xl font-medium hover:underline">saranshchaudhary888@gmail.com</a>
            </div>
        </motion.div>

        {/* The Big Image from your screenshot */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-neutral-900 mb-20"
        >
             {/* Replace this with your actual image file like '/contact-hero.jpg' */}
             <Image 
                src="/p9.avif" 
                alt="Team"
                fill
                className="object-cover opacity-100"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Contact Form */}
        <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">Send a message</h2>
            <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-gray-500 text-sm">Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-gray-500 text-sm">Email</label>
                        <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-gray-500 text-sm">Message</label>
                    <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors resize-none" placeholder="Tell me about your project..." />
                </div>
                <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </main>
  );
}