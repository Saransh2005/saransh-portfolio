"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; 

// Reusable Fact Card Component
const FactCard = ({ number, label, desc }: { number: string, label: string, desc: string }) => (
  <div className="bg-neutral-900 p-8 md:p-12 flex flex-col justify-between h-[300px] border border-white/5 rounded-sm hover:bg-neutral-800 transition-colors">
      <div>
          <h3 className="text-5xl md:text-6xl font-bold mb-2 text-white">{number}</h3>
          <p className="text-xl text-gray-300">{label}</p>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed border-t border-white/10 pt-6 mt-6">
          {desc}
      </p>
  </div>
);

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/p8.avif" 
            alt="About Mindx"
            fill
            className="object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center md:text-left md:absolute md:bottom-24 md:left-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8"
          >
            We bridge the gap <br /> 
            <span className="text-gray-400">between Intelligence</span> <br />
            and Imagination.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Mindx isn't just a dev shop. We are a digital collective fusing 
            <strong> Python-powered Logic</strong> with <strong>World-class Design</strong>.
          </motion.p>
        </div>
      </section>

      {/* Story / Mission Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">The Mission</h2>
        
        <div className="space-y-12 text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            <p>
                <span className="text-white font-semibold">The digital world is divided.</span> On one side, you have powerful backend engineers who speak in algorithms. On the other, creative designers who speak in emotions.
            </p>
            <p>
                At Mindx, we speak both.
            </p>
            <p>
                Our foundation is built on deep technical expertise—<strong>Machine Learning, Android Development, and Data Science.</strong> But we believe that even the smartest code is useless if it doesn't feel human.
            </p>
        </div>
      </section>

      {/* NEW: Facts Section (from screenshot) */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold font-display">Facts</h2>
            <p className="max-w-xl text-gray-400 text-lg leading-relaxed">
                Founded with a vision for transformative creativity, Mindx has rapidly grown into a premier digital lab. Our commitment to clean code and stunning design drives us to deliver impactful solutions.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-20">
            <FactCard 
                number="20+" 
                label="Projects" 
                desc="Since our inception, we have successfully shipped over 20 tailored digital products." 
            />
            <FactCard 
                number="3" 
                label="Countries" 
                desc="With a digital footprint across continents, our operations exemplify global reach." 
            />
            <FactCard 
                number="5" 
                label="Collaborators" 
                desc="A dedicated team of developers and designers ensuring flawless execution." 
            />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 pt-24 border-t border-white/10">
            <div>
                <h3 className="text-white font-bold text-3xl mb-6">Engineering</h3>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        Machine Learning & AI
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        Android App Development (Kotlin)
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        Complex Backend Systems
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-white font-bold text-3xl mb-6">Design</h3>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        UI/UX & Prototyping (Figma)
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        Personal Branding
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        Web Experiences
                    </li>
                </ul>
            </div>
        </div>
      </section>

    </main>
  );
}