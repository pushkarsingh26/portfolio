import Navbar from '@/components/Navbar';
import Academics from '@/components/Academics';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';

export default function AcademicsPage() {
    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <ParticleBackground />
            <CursorGlow />
            <ScrollProgress />
            <Navbar />
            <Academics />
        </main>
    );
}
