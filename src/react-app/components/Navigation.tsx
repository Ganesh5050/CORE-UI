import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router';
import GlassyButton from './GlassyButton';

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto bg-[#0a0118]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="Core UI Logo"
              className="w-12 h-12 object-contain transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
            />
            <span className="text-lg font-semibold">Core UI</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-orange-400 transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Home
            </a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Docs
            </a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Showcase
            </a>
          </div>

          {/* CTA Button */}
          <GlassyButton variant="primary" size="sm" className="rounded-full">
            <span>Star On GitHub</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/30 rounded-full">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span className="text-xs font-bold">30.6K</span>
            </div>
          </GlassyButton>
        </div>
      </div>
    </motion.nav>
  );
}
