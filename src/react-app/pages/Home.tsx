import Navigation from '@/react-app/components/Navigation';
import Hero from '@/react-app/components/Hero';
import Stats from '@/react-app/components/Stats';
import Testimonials from '@/react-app/components/Testimonials';
import FinalCTA from '@/react-app/components/FinalCTA';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0118] relative overflow-hidden">
      {/* Background gradient effects - more vibrant and colorful */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left purple/pink gradient */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-transparent rounded-full blur-3xl"></div>

        {/* Center right cyan/teal gradient */}
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl"></div>

        {/* Bottom left purple gradient */}
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-700/20 via-violet-600/15 to-transparent rounded-full blur-3xl"></div>

        {/* Bottom right pink gradient */}
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-pink-600/25 via-rose-600/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Stats />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
