import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [stars, setStars] = useState<string>('0');

  useEffect(() => {
    // Fetch GitHub stars
    fetch('https://api.github.com/repos/Ganesh5050/CORE-UI')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          const count = data.stargazers_count;
          if (count >= 1000) {
            setStars((count / 1000).toFixed(1) + 'K');
          } else {
            setStars(count.toString());
          }
        }
      })
      .catch(() => setStars('0'));
  }, []);

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
            <Link to="/" className="text-sm font-medium hover:text-orange-400 transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Home
            </Link>
            <Link to="/get-started/index" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Components
            </Link>
          </div>

          {/* GitHub Star Button */}
          <a
            href="https://github.com/Ganesh5050/CORE-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105"
          >
            <span>Star on GitHub</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/30 rounded-full">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span className="text-xs font-bold">{stars}</span>
            </div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
