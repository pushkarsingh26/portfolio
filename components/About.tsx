"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import styles from "./About.module.css";

const ResumeScroll = dynamic(() => import("./ResumeScroll"), {
    ssr: false,
});

const Certificates = dynamic(() => import("./Certificates"), {
    ssr: false,
});

export default function About() {
    const [openSection, setOpenSection] = useState<'about' | 'resume' | 'certificates' | null>(null);

    return (
        <>
            <section className={styles.aboutSection}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {/* Section Header with Toggle */}<br />
                        <div 
                            onClick={() => setOpenSection(openSection === 'about' ? null : 'about')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <Sparkles className={styles.sparkleIcon} />
                                    <h2 className={styles.title}>About Me</h2>
                                </div>
                                <p className={styles.subtitle}>Click to {openSection === 'about' ? 'hide' : 'view'}</p>
                            </div>
                        </div>

                        {/* Content Cards */}
                        <AnimatePresence>
                            {openSection === 'about' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className={styles.contentWrapper}
                                >
                                    <div className={styles.cardsContainer}>
                            {/* Education */}
                            <div className={`${styles.card} ${styles.cardPurple}`}>
                                <p className={styles.cardText}>
                                    I am a <span className={styles.highlightPurple}>BBA (Finance)</span> student graduating in 2026, 
                                    with a strong interest in finance operations, reporting, and basic financial analysis.
                                </p>
                            </div>

                            {/* Experience */}
                            <div className={`${styles.card} ${styles.cardPurple}`}>
                                <p className={styles.cardText}>
                                    During my internships and academic projects, I have assisted in financial documentation, 
                                    basic profit and loss preparation, data validation, financial reconciliation support, 
                                    and Excel-based MIS reporting. My work involved checking data accuracy, matching records, 
                                    preparing summaries, and supporting operational finance activities.
                                </p>
                            </div>

                            {/* Career Goals */}
                            <div className={`${styles.card} ${styles.cardPink}`}>
                                <p className={styles.cardText}>
                                    I am currently seeking an <span className={styles.highlightPink}>entry-level finance role</span> where 
                                    I can apply my accounting and finance fundamentals, strengthen analytical skills, 
                                    and grow within a structured corporate environment.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Resume Scroll Section */}
            <ResumeScroll 
                isOpen={openSection === 'resume'} 
                onToggle={() => setOpenSection(openSection === 'resume' ? null : 'resume')} 
            />

            {/* Certificates Section */}
            <Certificates 
                openSection={openSection} 
                onToggle={(section) => setOpenSection(openSection === section ? null : section)} 
            />
        </>
    );
}
