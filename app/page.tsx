import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Premium Background Effects */}
      <ParticleBackground />
      <ScrollProgress />
      <CursorGlow />

      {/* Main Content - Only Hero */}
      <Navbar />
      <Hero />
    </main>
  );
}
