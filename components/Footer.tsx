"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Linkedin, Github, Twitter, ArrowUp, Heart } from "lucide-react";
import { useState } from "react";

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-white/10 py-16 px-6 mt-24 overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#7C3AED]/10 to-transparent rounded-full blur-3xl opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
                            <motion.div
                                className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#F59E0B] rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg relative overflow-hidden"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <span className="relative z-10">S</span>
                            </motion.div>
                            <div>
                                <div className="text-xl font-bold text-[#EDEDED] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text transition-all leading-tight">
                                    Saloni Saki
                                </div>
                                <div className="text-xs text-[#EDEDED]/60 font-medium">BBA Finance</div>
                            </div>
                        </Link>
                        <p className="text-[#EDEDED]/60 text-sm leading-relaxed max-w-sm mb-6">
                            Business-minded designer crafting experiences that drive results.
                            Combining aesthetic excellence with data-driven methodology.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {[
                                { href: "mailto:hello@designer.com", icon: Mail, label: "Email", color: "#7C3AED" },
                                { href: "https://linkedin.com/in/yourprofile", icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
                                { href: "https://github.com/yourprofile", icon: Github, label: "GitHub", color: "#EDEDED" },
                                { href: "https://twitter.com/yourprofile", icon: Twitter, label: "Twitter", color: "#1DA1F2" },
                            ].map((social) => (
                                <SocialIcon key={social.label} {...social} />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[#EDEDED] text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-3 text-sm">
                            {["Home", "About", "Projects", "Contact"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                                        className="text-[#EDEDED]/60 hover:text-[#7C3AED] transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-[#7C3AED] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[#EDEDED] text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-3 text-sm">
                            {["UI/UX Design", "Product Strategy", "User Research", "Design Systems"].map((service) => (
                                <li key={service} className="text-[#EDEDED]/60">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <motion.p
                        className="text-sm text-[#EDEDED]/50 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        © {new Date().getFullYear()} Saloni Saki. Made with{" "}
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </motion.span>{" "}
                        by Antigravity AI
                    </motion.p>

                    <div className="flex items-center gap-6 text-sm text-[#EDEDED]/50">
                        <Link href="/privacy" className="hover:text-[#7C3AED] transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-[#7C3AED] transition-colors">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full flex items-center justify-center text-white shadow-lg z-50 group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
            )}
        </footer>
    );
}

function SocialIcon({ href, icon: Icon, label, color }: any) {
    return (
        <motion.a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all group"
            aria-label={label}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Icon className="w-4 h-4 text-[#EDEDED]/70 group-hover:text-[#EDEDED]" style={{ color }} />
        </motion.a>
    );
}
