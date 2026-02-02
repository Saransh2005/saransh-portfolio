"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  // I have pasted your specific ID "xjgreobq" below
  const [state, handleSubmit] = useForm("xjgreobq"); 

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
                <a href="mailto:saransh@mindx.com" className="text-2xl font-medium hover:underline">saranshchaudhary888@gmail.com</a>
            </div>
        </motion.div>

        {/* The Big Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-neutral-900 mb-20"
        >
             <Image 
                src="/p9.avif" 
                alt="Mindx Team"
                fill
                className="object-cover opacity-100"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Contact Form Logic */}
        <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">Send a message</h2>

            {/* Success Message */}
            {state.succeeded ? (
                <div className="bg-green-900/20 border border-green-500 text-green-200 p-8 rounded-lg text-xl">
                    Thank you! Your message has been sent. We will get back to you shortly.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-gray-500 text-sm">Name</label>
                            <input 
                                id="name"
                                type="text" 
                                name="name" 
                                required
                                className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-gray-500 text-sm">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                name="email" 
                                required
                                className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors" 
                                placeholder="john@example.com" 
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-gray-500 text-sm">Message</label>
                        <textarea 
                            id="message"
                            name="message" 
                            required
                            rows={4} 
                            className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-white outline-none transition-colors resize-none" 
                            placeholder="Tell us about your project..." 
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={state.submitting}
                        className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {state.submitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            )}
        </div>
      </div>
    </main>
  );
}