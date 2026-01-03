import About from "@/components/About";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

export default function AboutPage() {
    return (
        <main className="min-h-screen relative">
            {/* Premium Background Effects */}
            <ParticleBackground />
            <ScrollProgress />
            <CursorGlow />

            {/* Main Content */}
            <Navbar />
            <About />
        </main>
    );
}
