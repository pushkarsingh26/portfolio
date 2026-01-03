"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                // Reset after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                }, 3000);
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="w-full flex justify-center">
                <div className="max-w-5xl mx-auto w-full">
                    {/* Header */}
                    <motion.div
                        className="mb-16 text-center flex flex-col items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#7C3AED]/30 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                            <span className="text-sm text-[#EDEDED]/70">Get in Touch</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#EDEDED] text-center">
                            Let's work{" "}
                            <span className="gradient-text-animated">together</span>
                        </h2>
                        <p className="text-[#EDEDED]/70 text-base md:text-lg text-center mb-12">
                            Actively seeking full-time, entry-level finance roles; aspiring Financial Analyst.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12 mt-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FloatingLabelInput
                                    id="name"
                                    label="Your Name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    focused={focusedField === "name"}
                                    onFocus={() => setFocusedField("name")}
                                    onBlur={() => setFocusedField(null)}
                                />

                                <FloatingLabelInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    focused={focusedField === "email"}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                />

                                <FloatingLabelTextarea
                                    id="message"
                                    label="Message"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    focused={focusedField === "message"}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                />

                                <motion.button
                                    type="submit"
                                    className={`${styles.sendButton} group`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting || isSubmitted}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Sending...
                                            </>
                                        ) : isSubmitted ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Sent Successfully!
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </span>

                                    <div className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.connectBox}>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <h3 className={styles.boxTitle}>Connect With Me</h3>
                                <div className={styles.contactLinks}>
                                    <ContactLink
                                        href="mailto:salonisaki2028@gmail.com"
                                        icon={Mail}
                                        label="Email"
                                        value="salonisaki2028@gmail.com"
                                        color="#7C3AED"
                                    />

                                    <ContactLink
                                        href="mailto:salonineemaa04@gmail.com"
                                        icon={Mail}
                                        label="Email"
                                        value="salonineemaa04@gmail.com"
                                        color="#7C3AED"
                                    />

                                    <ContactLink
                                        href="https://www.linkedin.com/in/salonisaki"
                                        icon={Linkedin}
                                        label="LinkedIn"
                                        value="Connect with me"
                                        color="#0A66C2"
                                        external
                                    />

                                    <ContactLink
                                        href="tel:+918120019883"
                                        icon={Phone}
                                        label="Phone"
                                        value="+91 8120019883"
                                        color="#10B981"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Availability - Centered */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.div
                            className={styles.availabilityBox}
                            style={{ maxWidth: '600px', width: '100%' }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className={styles.availabilityContent}>
                                <motion.div
                                    className="w-3 h-3 bg-green-500 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <div>
                                    <h4 className={styles.availabilityTitle}>Available for</h4>
                                    <p className={styles.availabilityText}>
                                        Jobs in entry - level  finance related roles.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FloatingLabelInput({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    focused,
    onFocus,
    onBlur,
}: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
}) {
    return (
        <div className="relative">
            <motion.label
                htmlFor={id}
                className={`absolute left-5 transition-all pointer-events-none ${focused || value
                        ? "-top-2.5 text-xs bg-[#0B0B0F] px-2 text-[#7C3AED]"
                        : "top-4 text-sm text-[#EDEDED]/50"
                    }`}
                animate={{
                    y: focused || value ? 0 : 0,
                    scale: focused || value ? 1 : 1,
                }}
            >
                {label}
            </motion.label>
            <motion.input
                type={type}
                id={id}
                className="w-full px-5 py-4 glass rounded-xl focus:border-[#7C3AED] outline-none transition-all text-[#EDEDED] min-h-[56px]"
                placeholder={focused ? placeholder : ""}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                whileFocus={{ scale: 1.01 }}
            />
        </div>
    );
}

function FloatingLabelTextarea({
    id,
    label,
    placeholder,
    value,
    onChange,
    focused,
    onFocus,
    onBlur,
}: {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
}) {
    return (
        <div className="relative">
            <motion.label
                htmlFor={id}
                className={`absolute left-5 transition-all pointer-events-none ${focused || value
                        ? "-top-2.5 text-xs bg-[#0B0B0F] px-2 text-[#7C3AED]"
                        : "top-4 text-sm text-[#EDEDED]/50"
                    }`}
            >
                {label}
            </motion.label>
            <motion.textarea
                id={id}
                rows={8}
                className="w-full px-5 py-4 glass rounded-xl focus:border-[#7C3AED] outline-none transition-all resize-none text-[#EDEDED] min-h-[220px]"
                placeholder={focused ? placeholder : ""}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                whileFocus={{ scale: 1.01 }}
            />
        </div>
    );
}

function ContactLink({ href, icon: Icon, label, value, color, external }: {
    href: string;
    icon: any;
    label: string;
    value: string;
    color: string;
    external?: boolean;
}) {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 text-[#EDEDED]/70 hover:text-[#EDEDED] transition-colors group"
            whileHover={{ x: 5 }}
        >
            <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center glass group-hover:scale-110 transition-all border border-white/5"
                style={{ background: `${color}20` }}
                whileHover={{ boxShadow: `0 0 20px ${color}40`, borderColor: `${color}60` }}
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </motion.div>
            <div>
                <p className="text-xs text-[#EDEDED]/50 mb-1">{label}</p>
                <p className="font-medium text-sm">{value}</p>
            </div>
        </motion.a>
    );
}
