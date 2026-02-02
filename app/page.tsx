"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar";

// --- Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const ProjectCard = ({ title, category, year, image }: { title: string, category: string, year: string, image: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900 mb-4 rounded-sm border border-white/5">
       <Image 
        src={image} 
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
    <div className="flex justify-between items-start text-sm">
      <div>
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <p className="text-gray-500">{category}</p>
      </div>
      <span className="text-gray-500">{year}</span>
    </div>
  </motion.div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* SECTION 1: Agency Video Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <FadeIn>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white mix-blend-overlay mb-6">
                    WE BUILD <br /> THE FUTURE.
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                    Mindx is a digital powerhouse fusing Artificial Intelligence, Design, and Engineering.
                </p>
            </FadeIn>
        </div>
      </section>

      {/* SECTION 2: Mindx Agency Intro & Services */}
      <section className="w-full bg-black">
        <div className="grid md:grid-cols-2 min-h-[700px]">
            
            {/* LEFT: Who We Are & Services */}
            <div className="p-12 md:p-24 flex flex-col justify-center border-r border-white/10">
                <FadeIn>
                    <span className="text-sm font-mono text-gray-500 mb-4 block">WHO WE ARE</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display tracking-tight">
                        We are Mindx.
                    </h2>
                    
                    <p className="text-lg text-gray-400 leading-relaxed mb-10">
                        We are a collective of developers, designers, and strategists. 
                        We don't just build software; we craft digital ecosystems that define brands.
                        From complex <strong>Machine Learning</strong> models to stunning <strong>Mobile Apps</strong>, we handle it all.
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                        <div>
                            <h4 className="text-white font-bold mb-2">Development</h4>
                            <ul className="text-gray-500 space-y-1 text-sm">
                                <li>• Machine Learning (ML)</li>
                                <li>• Android Studio / App Dev</li>
                                <li>• Web Development</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-2">Design & Strategy</h4>
                            <ul className="text-gray-500 space-y-1 text-sm">
                                <li>• UI/UX (Figma)</li>
                                <li>• Personal Branding</li>
                                <li>• Brand Identity</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8">
                      <a 
                        href="/resume.pdf" 
                        download="resume.pdf" 
                        className="text-white font-medium tracking-widest uppercase text-sm hover:text-gray-400 transition border-b border-white/0 hover:border-white pb-1"
                      > 
                        DOWNLOAD RESUME
                      </a>
</div>
                </FadeIn>
            </div>

            {/* RIGHT: Team/Founder Image */}
            <div className="relative h-[500px] md:h-auto bg-neutral-900 overflow-hidden group">
                <Image 
                    src="/saransh.jpg" 
                    alt="Mindx Team" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <p className="text-xs font-mono text-white">Saransh Singh</p>
                    <p className="text-xs font-mono text-white">Founder & Lead Engineer</p>
                </div>
            </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12 font-display">Selected Projects</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          <ProjectCard title="Nexus AI Prediction Engine" category="Machine Learning & Python" year="2025" image="/p1.jpeg" />
          <ProjectCard title="VitalSense Health App" category="Android / Kotlin / Firebase" year="2025" image="/p2.png" />
          <ProjectCard title="Lumina E-Commerce" category="Web Design & Next.js" year="2024" image="/p3.png" />
          <ProjectCard title="Aura Brand Identity" category="Personal Branding & Figma" year="2024" image="/p4.jpeg" />
        </div>
      </section>

      {/* Process Section - UPDATED WITH 3 IMAGES */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
                <h2 className="text-4xl font-bold sticky top-24 font-display">Our Process</h2>
            </div>
            <div className="md:col-span-2 space-y-20">
                {[
                    // Added unique images for each step below
                    { number: "01", title: "Discovery", desc: "We dive deep into your business goals, user needs, and market competition.", image: "/p5.avif" }, 
                    { number: "02", title: "Engineering", desc: "Our ML and Dev teams build scalable, robust architectures using Python and Java.", image: "/p6.avif" },
                    { number: "03", title: "Design", desc: "We use Figma to craft intuitive, pixel-perfect interfaces that users love.", image: "/p7.avif" }
                ].map((step, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                        <span className="text-sm font-mono text-gray-500 block mb-4">{step.number}</span>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
                        
                        {/* Always render the image container now that every step has an image */}
                        <div className="relative h-64 mt-8 rounded-sm border border-white/5 overflow-hidden group">
                            <Image 
                                src={step.image}
                                alt={`${step.title} Process`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                            />
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-neutral-900 rounded-2xl mb-20 border border-white/5">
        <div className="grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-4xl font-bold mb-8 font-display">FAQ</h2>
                <div className="space-y-2">
                    <AccordionItem question="Do you work with startups?" answer="Yes, we specialize in helping startups scale with MVP development and branding." />
                    <AccordionItem question="What tech stack do you use?" answer="We use Python for ML, Kotlin/Java for Android, React/Next.js for Web, and Figma for Design." />
                    <AccordionItem question="Can you handle full branding?" answer="Absolutely. We do everything from Logo Design to complete Personal Branding guidelines." />
                </div>
            </div>
            <div>
                 <h2 className="text-4xl font-bold mb-8 font-display">Let's Build</h2>
                 <p className="text-gray-400 leading-relaxed mb-6">
                    Ready to take your project to the next level? Mindx is ready to partner with you.
                 </p>
                 <a href="/contact" className="text-white font-semibold hover:opacity-50 transition">Book a Consultation &rarr;</a>
            </div>
        </div>
      </section>
      
    </main>
  );
}

