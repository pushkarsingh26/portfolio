"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, X, FileText } from "lucide-react";
import styles from "./Projects.module.css";

const projects = [
    {
        id: 1,
        title: "Event Profit & Loss Statement",
        category: "GECU",
        problem: "College event finances were scattered and untracked.",
        businessGoal: "Accurately report income, expenses, and identify net profit from the event.",
        research: "Collected all event registration fees, sponsorships, bills, and receipts.",
        solution: "Prepared a consolidated P&L statement in Excel and tally, classified income and expenses, and reconciled transactions.",
        impact: "Determined a net profit of ₹61,744 from registrations and event activities, enabling precise financial reporting.",
        gridClass: "md:col-span-1",
        gradient: "from-blue-500 via-blue-600 to-cyan-500",
        color: "#3B82F6",
    },
    {
        id: 2,
        title: "Deloitte Forage Virtual Internship",
        category: "Professional Services",
        problem: "Companies face structured business problems requiring analytical and finance-based solutions.",
        businessGoal: "Practice solving real-world consulting and finance scenarios.",
        research: "Analyzed case studies, client requirements, and business data provided in the program.",
        solution: "Applied structured problem-solving, data analysis, and professional documentation for actionable recommendations.",
        impact: "Gained practical exposure to consulting and finance processes, strengthening analytical and problem-solving skills.",
        gridClass: "md:col-span-1",
        gradient: "from-purple-500 via-purple-600 to-pink-500",
        color: "#A855F7",
    },
    {
        id: 3,
        title: "Data Documentation & MIS Reporting",
        category: "IPN Internship",
        problem: "Student attendance and activity records were scattered and untracked.",
        businessGoal: "Maintain accurate student records and provide daily operational insights.",
        research: "Collected names, classes, and marks from hard copies and verified data.",
        solution: "Organized records and prepared daily MIS-style reports for school visits.",
        impact: "Enabled consistent tracking and reporting, improving operational accuracy and data visibility.",
        gridClass: "md:col-span-1",
        gradient: "from-green-500 via-green-600 to-emerald-500",
        color: "#10B981",
    },
    {
        id: 4,
        title: "Excel-Based Financial Analysis & MIS Reporting",
        category: "Self-Initiated Project",
        problem: "Sample company data lacked structured financial analysis for insights.",
        businessGoal: "Create clear financial statements and MIS-style reporting for decision-making.",
        research: "Collected, cleaned, and validated sample data for consistency and accuracy.",
        solution: "Built income statements and balance sheets in Excel, performed trend analysis, and generated MIS reports using formulas like SUM, IF, VLOOKUP/XLOOKUP.",
        impact: "Delivered organized, actionable financial insights through accurate reporting and analysis, demonstrating Excel and analytical skills.",
        gridClass: "md:col-span-1",
        gradient: "from-orange-500 via-orange-600 to-red-500",
        color: "#F97316",
    },
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="w-full flex justify-center">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="gradient-text-animated">Projects</span>
                        </h2><br/>
                        <p className="text-[#EDEDED]/70 text-base md:text-lg mx-auto text-center">
                            Real projects. Real impact. Each backed by data and business strategy.
                        </p><br/>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    isInView,
}: {
    project: typeof projects[0];
    index: number;
    isInView: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    return (
        <>
        <motion.div
            className={`${project.gridClass} ${styles.projectCard}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, borderColor: "rgba(255, 255, 255, 0.2)" }}
            onClick={() => !showReportModal && setIsExpanded(!isExpanded)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Gradient overlay */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0`}
                animate={{ opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                    background: `linear-gradient(135deg, ${project.color}40 0%, transparent 100%)`,
                }}
                animate={{
                    rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Category badge */}
                <motion.span
                    className={`inline-block px-5 py-2 rounded-full text-sm border mb-8`}
                    style={{
                        backgroundColor: `${project.color}20`,
                        borderColor: `${project.color}40`,
                        color: project.color,
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    {project.category}
                </motion.span>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text transition-all text-[#EDEDED]">
                    {project.title}
                </h3>

                {/* Compact view */}
                {!isExpanded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        <div>   
                            <h4 className="text-sm font-semibold mb-2" style={{ color: project.color }}>
                                Problem
                            </h4>
                            <p className="text-sm text-[#EDEDED]/80 leading-relaxed">{project.problem}</p>
                        </div>
                        <motion.div
                            className="flex items-center gap-2 text-sm font-semibold"
                            style={{ color: project.color }}
                            animate={{ gap: isHovered ? "12px" : "8px" }}
                        >
                            View Full Project details
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                )}

                {/* Expanded view */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 text-sm"
                    >
                        <DetailItem label="Problem" color="#7C3AED" text={project.problem} />
                        <DetailItem label="Business Goal" color="#EC4899" text={project.businessGoal} />
                        <DetailItem label="Research" color="#06B6D4" text={project.research} />
                        <DetailItem label="Design Solution" color="#10B981" text={project.solution} />

                        <motion.div
                            className="pt-4 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: "#F59E0B" }}>
                                Impact
                            </h4>
                            <p className="text-white font-semibold text-base">{project.impact}</p>
                        </motion.div>

                        {/* Show Report button for Deloitte project */}
                        {project.id === 2 && (
                            <motion.button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all"
                                style={{
                                    backgroundColor: `${project.color}20`,
                                    borderColor: `${project.color}40`,
                                    color: project.color,
                                }}
                                whileHover={{ scale: 1.05, backgroundColor: `${project.color}30` }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowReportModal(true);
                                }}
                            >
                                <FileText className="w-4 h-4" />
                                Show Report
                            </motion.button>
                        )}

                        <motion.div
                            className="flex items-center gap-2 text-sm font-semibold pt-4"
                            style={{ color: project.color }}
                        >
                            Click to Close
                            <ArrowUpRight className="w-4 h-4 rotate-180" />
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Corner glow */}
            <motion.div
                className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tl ${project.gradient} rounded-full blur-3xl`}
                animate={{
                    opacity: isHovered ? 0.3 : 0,
                    scale: isHovered ? 1.5 : 1,
                }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>

        {/* Report Modal - Rendered outside the card */}
        {showReportModal && (
            <ReportModal
                onClose={() => setShowReportModal(false)}
                projectColor={project.color}
            />
        )}
        </>
    );
}

function DetailItem({ label, color, text }: { label: string; color: string; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h4 className="font-semibold mb-1" style={{ color }}>
                {label}
            </h4>
            <p className="text-[#EDEDED]/80">{text}</p>
        </motion.div>
    );
}

function ReportModal({ onClose, projectColor }: { onClose: () => void; projectColor: string }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={onClose}
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Header */}
                <h3 className="text-2xl font-bold mb-6" style={{ color: projectColor }}>
                    Deloitte Project Reports
                </h3>

                {/* Report Images */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold mb-3 text-white">Report 1</h4>
                        <img
                            src="/report1.jpeg"
                            alt="Deloitte Report 1"
                            className="w-full rounded-lg border border-white/10"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold mb-3 text-white">Report 2</h4>
                        <img
                            src="/report2.jpeg"
                            alt="Deloitte Report 2"
                            className="w-full rounded-lg border border-white/10"
                        />
                    </motion.div>
                </div>

                {/* Close Button at Bottom */}
                <motion.button
                    className="mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    style={{
                        backgroundColor: `${projectColor}20`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: `${projectColor}40`,
                        color: projectColor,
                    }}
                    whileHover={{ scale: 1.02, backgroundColor: `${projectColor}30` }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <X className="w-5 h-5" />
                    Close
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
