"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [displayText, setDisplayText] = useState("");
    const [currentLine, setCurrentLine] = useState(0);
    const fullText = ["BBA (Finance) Graduate | Entry-Level Finance & Analyst Roles"];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Typewriter effect
    useEffect(() => {
        if (currentLine >= fullText.length) return;

        const currentText = fullText[currentLine];
        if (displayText.length < currentText.length) {
            const timeout = setTimeout(() => {
                setDisplayText(currentText.slice(0, displayText.length + 1));
            }, 80);
            return () => clearTimeout(timeout);
        } else if (currentLine < fullText.length - 1) {
            const timeout = setTimeout(() => {
                setDisplayText(displayText + "\n");
                setCurrentLine(currentLine + 1);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [displayText, currentLine]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const offsetX = useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-30, 30]);
    const offsetY = useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-30, 30]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-[#0B0B0F] to-[#EC4899]/10 animate-gradient" />

            {/* Floating gradient orbs with parallax */}
            <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(236,72,153,0.4) 50%, transparent 100%)",
                    x: offsetX,
                    y: offsetY,
                    top: "20%",
                    left: "10%",
                }}
            />

            <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(245,158,11,0.4) 50%, transparent 100%)",
                    x: useTransform(offsetX, (v) => -v),
                    y: useTransform(offsetY, (v) => -v),
                    bottom: "20%",
                    right: "10%",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
                <motion.div
                    className="w-full flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-3 mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
                        <span className="text-sm text-[#EDEDED]/70">Available for Work</span>
                    </motion.div>

                    {/* Headline with typewriter effect */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] text-center w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {displayText.split('\n').map((line, i) => (
                            <span key={i} className="block">
                                {i === 0 ? (
                                    <span className="text-[#EDEDED]">{line}</span>
                                ) : (
                                    <span className="gradient-text-animated">{line}</span>
                                )}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-[#EDEDED]/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        Finance graduate with hands-on exposure to financial documentation, basic analysis, Excel reporting, and operational support through {" "}
                        <span className="text-[#7C3AED] font-semibold">internships</span> and{" "}
                        <span className="text-[#EC4899] font-semibold">academic projects</span>.
                    </motion.p>

                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 2.5 },
                        y: { repeat: Infinity, duration: 2 },
                    }}
                >
                    <div className="w-6 h-10 border-2 border-[#7C3AED]/50 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1 h-2 bg-gradient-to-b from-[#7C3AED] to-[#EC4899] rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.2);
        y.set((e.clientY - centerY) * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}
