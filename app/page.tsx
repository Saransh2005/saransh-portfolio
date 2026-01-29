"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
// IMPORT THE CORRECT NAVBAR HERE
import Navbar from "./components/Navbar";

// --- Components ---

// (Keep FadeIn, ProjectCard, AccordionItem as they are)
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
      
      {/* This now uses the shared component with correct links */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            I transform data <br className="hidden md:block" />
            into insights and <br className="hidden md:block" />
            help businesses make <br className="hidden md:block" />
            data-driven decisions.
          </h1>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <FadeIn delay={0.2}>
             <div className="aspect-square bg-neutral-900 rounded-lg relative overflow-hidden border border-white/5">
                 <Image 
                    src="/saransh.jpg" 
                    alt="Saransh" 
                    fill 
                    className="object-cover" 
                />
             </div>
          </FadeIn>
          <div className="flex flex-col justify-between">
            <FadeIn delay={0.4}>
              <h2 className="text-3xl font-bold mb-6">Hi, I am Saransh</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                I’m a Data Analyst and UI/UX & Web Designer who transforms raw data into meaningful insights.
                I specialize in <span className="text-white font-semibold">Python, SQL, Power BI, Excel, Tableau, Pandas, NumPy, EDA, and Dashboard Automation.</span>
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                  Download Resume
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12">Selected Work</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          <ProjectCard title="Shaping Urban Icons" category="Architecture" year="2024" image="/p1.avif" />
          <ProjectCard title="Windows to the World" category="Campaign" year="2024" image="/p2.jpg" />
          <ProjectCard title="Refreshing Moments" category="Campaign" year="2023" image="/p3.jpg" />
          <ProjectCard title="Effortless Elegance" category="Fashion" year="2023" image="/p4.jpg" />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
                <h2 className="text-4xl font-bold sticky top-24">Process</h2>
            </div>
            <div className="md:col-span-2 space-y-20">
                {[
                    { number: "01", title: "Research", desc: "We start by understanding your market, audience, and goals. This includes competitor analysis and brand audits." },
                    { number: "02", title: "Strategy", desc: "We define the core of your brand — positioning, messaging, and tone of voice. This becomes the foundation." },
                    { number: "03", title: "Design", desc: "We bring the strategy to life through a full visual identity system. That includes logo, typography, color, and imagery." }
                ].map((step, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                        <span className="text-sm font-mono text-gray-500 block mb-4">{step.number}</span>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
                        <div className="h-64 bg-neutral-900 mt-8 rounded-sm border border-white/5"></div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* Q&A / Expertise */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-neutral-900 rounded-2xl mb-20">
        <div className="grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-4xl font-bold mb-8">Q&A</h2>
                <div className="space-y-2">
                    <AccordionItem question="Who do you typically work with?" answer="We collaborate with brands, agencies, and creatives who want to push boundaries." />
                    <AccordionItem question="What’s your creative process like?" answer="We start by listening—really listening. From there, we dive into research, build concepts, storyboard, shoot, and polish." />
                    <AccordionItem question="How long does a project take?" answer="It depends on the scope, but most projects take anywhere from 2 to 8 weeks." />
                </div>
            </div>
            <div>
                 <h2 className="text-4xl font-bold mb-8">Expertise</h2>
                 <p className="text-gray-400 leading-relaxed mb-6">
                    We pride ourselves on our versatility and expertise across various mediums. From striking commercials that capture attention to dynamic ads that drive engagement.
                 </p>
                 <a href="#about" className="text-white font-semibold hover:opacity-50 transition">Read more &rarr;</a>
            </div>
        </div>
      </section>

      {/* Footer has been removed from here (it is now in layout.tsx) */}
      
    </main>
  );
}