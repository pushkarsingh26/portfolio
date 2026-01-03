"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const tools = [
    "Figma",
    "Notion",
    "Miro",
    "Jira",
    "Framer",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Adobe XD",
    "Sketch",
    "Photoshop",
    "Illustrator",
];

export default function SkillsTicker() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.7;

        const animate = () => {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }
            scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Duplicate the tools array for seamless loop
    const duplicatedTools = [...tools, ...tools, ...tools];

    return (
        <section className="py-24 overflow-hidden relative">
            {/* Gradient borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899] to-transparent" />

            {/* Side gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B0F] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B0F] to-transparent z-10" />

            <div className="relative">
                <motion.p
                    className="text-center text-[#7C3AED] text-sm tracking-wider uppercase mb-12 font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Tools & Technologies
                </motion.p>

                <div className="overflow-hidden">
                    <div ref={scrollRef} className="flex whitespace-nowrap">
                        {duplicatedTools.map((tool, index) => (
                            <motion.div
                                key={index}
                                className="inline-flex items-center mx-10"
                                whileHover={{ scale: 1.1 }}
                            >
                                <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/[0.08] hover:text-transparent hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#EC4899] hover:bg-clip-text transition-all duration-300 cursor-default">
                                    {tool}
                                </span>
                                <span className="mx-10 text-2xl text-[#7C3AED]/30">•</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
