'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import styles from './Academics.module.css';

const Academics = () => {
    const academics = [
        {
            degree: "Bachelor of Business Administration (BBA)",
            major: "Finance",
            institution: "Acropolis Institute of Management Studies and Research, Indore",
            period: "2023 - 2026",
            cgpa: "8.90",
            icon: GraduationCap,
            description: "DAVV University Topper | Focused on Financial Analysis, Investment Management, and Corporate Finance",
            achievement: "DAVV University Topper"
        },
        {
            degree: "Higher Secondary (12th)",

            institution: "New Eklavya English Higher Secondary School, Suwasara",
            period: "2023",
            cgpa: "88%",
            icon: BookOpen,
            description: "Top 5 in Class 12th",
            achievement: "Top 5 in Class"
        },
        {
            degree: "Secondary (10th)",
            major: "",
            institution: "JJ English Higher Secondary School, Suwasara",
            period: "2021",
            cgpa: "81%",
            icon: Award,
            description: "Top 4 in Class 10th",
            achievement: "Top 4 in Class"
        }
    ];

    const skills = [
        "Financial Statement Preparation (basic P&L)",
        "MIS Reporting & Data Organization",
        "Microsoft Excel (Pivot Tables, VLOOKUP/XLOOKUP)",
        "Data Reconciliation & Accuracy Checks",
        "Documentation & Reporting",
        "Tally ERP 9 (basic)"
    ];

    const achievements = [
        {
            title: "DAVV University Topper",
            description: "Achieved top rank in DAVV University for BBA Finance",
            icon: Award
        },
        {
            title: "Consistent Academic Excellence",
            description: "Maintained top 5 performance throughout school and college",
            icon: GraduationCap
        }
    ];

    return (
        <section id="academics" className="relative min-h-screen pt-48 pb-20 px-6" style={{ zIndex: 1 }}>
            <div className="w-full flex justify-center">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <br /><br /><br />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="gradient-text-animated">Academics</span>
                        </h1>
                        <p className="text-[#EDEDED]/70 text-base md:text-lg mx-auto text-center">
                            Education & Achievements
                        </p><br />
                    </motion.div>

                    {/* Education Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12"
                    >
                        {academics.map((edu, index) => {
                            const Icon = edu.icon;
                            return (
                                <div key={index} className={`glass ${styles.educationCard} mb-6`}>
                                    <div className="flex items-start gap-4">
                                        <div className={styles.iconBox}>
                                            <Icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-2">{edu.degree}</h2>
                                            {edu.major && <p className="text-lg text-purple-400 mb-2">Major: {edu.major}</p>}
                                            <p className="text-gray-400 mb-1">{edu.institution}</p>
                                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{edu.period}</span>
                                            </div>
                                            <p className="text-gray-300">{edu.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400 mb-1">Score</p>
                                            <p className="text-xl md:text-2xl font-bold text-blue-400">{edu.cgpa}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12"
                    ><br />
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            <span className="gradient-text-animated">Skills</span>
                        </h2><br />
                        <div className={`glass ${styles.courseworkContainer}`}>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                        className={styles.courseCard}
                                    >
                                        <p className={styles.courseText}>{skill}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    ><br />
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            <span className="gradient-text-animated">Achievements & Activities</span>
                        </h2><br />
                        <div className="grid md:grid-cols-2 gap-6">
                            {achievements.map((achievement, index) => {
                                const Icon = achievement.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                        className={`glass ${styles.achievementCard}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={styles.achievementIconBox}>
                                                <Icon className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                                <p className="text-gray-400">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div><br /><br /><br /><br />
                </div>            </div>        </section>
    );
};

export default Academics;
