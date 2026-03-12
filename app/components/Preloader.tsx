"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real app, you might wait for fonts, images, or data to load.
        // For this portfolio, we simulate a premium loading delay of 2 seconds.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* A simple, elegant loading text reveal */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-bold tracking-tighter"
                        >
                            Mindx.
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-[1px] bg-white/30 mt-8 relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
