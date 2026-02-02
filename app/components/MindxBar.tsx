"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, User, Bot } from "lucide-react";

// Define what a message looks like
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MindxBar() {
  const [query, setQuery] = useState("");
  // 1. CHANGED: Now we store a LIST of messages, not just one string
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); 
  // Ref to auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Focus Input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Video Speed Control
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; 
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery(""); // Clear input immediately

    // 2. ADD USER MESSAGE TO HISTORY
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      
      const data = await res.json();
      const aiReply = (!res.ok || data.error) 
        ? `Error: ${data.error || "Server Issue"}` 
        : data.text;

      // 3. ADD AI RESPONSE TO HISTORY
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);

    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "System Offline. Check terminal." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ============================================== */}
      {/* 1. THE VIDEO ORB                               */}
      {/* ============================================== */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
            {!isOpen && (
                <motion.button 
                    layoutId="mindx-bar"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(true)}
                    className="relative group w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                >
                    <div className="absolute inset-[-8px] rounded-full overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover mix-blend-screen scale-125"
                        >
                            <source src="/mindx-orb.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-sm" />
                </motion.button>
            )}
        </AnimatePresence>
      </div>


      {/* ============================================== */}
      {/* 2. THE CHAT WINDOW                             */}
      {/* ============================================== */}
      <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                
                <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                <motion.div 
                    layoutId="mindx-bar"
                    className="relative w-full max-w-lg bg-[#050505] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-900/20 overflow-hidden flex flex-col max-h-[600px] h-[80vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/40">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-black">
                                <video autoPlay loop muted playsInline className="w-full h-full object-cover mix-blend-screen scale-150">
                                     <source src="/mindx-orb.mp4" type="video/mp4" />
                                </video>
                            </div>
                            <span className="text-sm font-medium text-white">Mindx Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat History Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[300px] bg-neutral-950/50 scrollbar-thin scrollbar-thumb-cyan-900/30 scrollbar-track-transparent">
                        
                        {/* Welcome Message (Only shows if no messages yet) */}
                        {messages.length === 0 && (
                             <div className="text-center mt-10 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="inline-block p-4 rounded-full bg-cyan-900/10 border border-cyan-500/20 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <MessageSquare size={24} className="text-cyan-400" />
                                </div>
                                <h3 className="text-white font-medium">System Online</h3>
                                <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
                                    Ask me about Saransh's portfolio, skills, or contact info.
                                </p>
                             </div>
                        )}

                        {/* Message List */}
                        {messages.map((msg, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                    msg.role === "user" 
                                    ? "bg-cyan-900/30 border border-cyan-500/30 text-white rounded-tr-none" 
                                    : "bg-[#111] border border-white/10 text-gray-200 rounded-tl-none shadow-lg"
                                }`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start animate-in slide-in-from-left-4">
                                <div className="bg-neutral-800/50 border border-white/10 text-cyan-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm flex gap-2 items-center">
                                    <Bot size={14} />
                                    <span>Thinking</span>
                                    <span className="animate-bounce delay-0">.</span>
                                    <span className="animate-bounce delay-150">.</span>
                                    <span className="animate-bounce delay-300">.</span>
                                </div>
                            </div>
                        )}
                        
                        {/* Invisible element to auto-scroll to */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSearch} className="p-4 bg-black/80 border-t border-white/5">
                        <div className="relative flex items-center group">
                            <input 
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-500"
                            />
                            <button 
                                type="submit" 
                                disabled={!query.trim() || isLoading}
                                className="absolute right-2 p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:bg-cyan-500"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </form>

                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
}