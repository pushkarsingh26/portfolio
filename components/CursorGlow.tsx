"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Hide on mobile/touch devices
        if ('ontouchstart' in window) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed pointer-events-none z-50 mix-blend-screen"
            style={{
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div className="w-96 h-96 bg-gradient-radial from-[#7C3AED]/20 via-[#EC4899]/10 to-transparent rounded-full blur-3xl" />
        </div>
    );
}
