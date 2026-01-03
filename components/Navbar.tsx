"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Academics", href: "/academics" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 shadow-lg backdrop-blur-xl bg-black/80"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="w-full px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo/Brand on Left */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#F59E0B] rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg relative overflow-hidden"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image 
                                src="/photo.jpeg" 
                                alt="Saloni Saki" 
                                width={48} 
                                height={48}
                                className="w-full h-full object-cover rounded-xl relative z-10"
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#EC4899] to-[#F59E0B]"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                        <div className="hidden sm:block">
                            <div className="text-[#EDEDED] font-bold text-lg leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text transition-all duration-300">
                                Saloni Saki
                            </div>
                            <div className="text-[#EDEDED]/60 text-xs font-medium">
                                BBA Finance
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Right Side */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Nav Links */}
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <MagneticLink
                                    key={link.name}
                                    link={link}
                                    isActive={pathname === link.href}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-[#EDEDED] w-10 h-10 flex items-center justify-center rounded-lg glass-hover"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden glass border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col px-6 py-4 space-y-3">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`py-3 px-4 text-[15px] font-medium transition-all rounded-lg block ${pathname === link.href
                                        ? "text-[#7C3AED] bg-white/5"
                                        : "text-[#EDEDED]/80 hover:text-[#EDEDED] hover:bg-white/5"
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                        >
                            <Link
                                href="/contact"
                                className="py-3 px-6 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold rounded-xl text-center block"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Let's Build
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}

function MagneticLink({ link, isActive }: { link: { name: string; href: string }; isActive: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link
            ref={ref}
            href={link.href}
            className={`text-[15px] font-medium transition-all relative group ${isActive
                ? "text-[#7C3AED]"
                : "text-[#EDEDED]/80 hover:text-[#EDEDED]"
                }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.span
                style={{ x: springX, y: springY }}
                className="block"
            >
                {link.name}
            </motion.span>
            <motion.span
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                transition={{ duration: 0.3 }}
            />
        </Link>
    );
}
