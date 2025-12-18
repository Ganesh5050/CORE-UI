import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import GlassyButton from './GlassyButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* New Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 backdrop-blur-sm"
        >
          <span className="px-2.5 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-xs font-bold flex items-center gap-1">
            New <Sparkles className="w-3 h-3" />
          </span>
          <span className="text-sm font-medium">Grid Scan</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="block">React Components</span>
            <span className="block">For Creative Developers</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Highly customizable animated components that make your React projects truly stand out
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <GlassyButton
            variant="primary"
            size="lg"
            href="/get-started/index"
            className="rounded-full"
          >
            Browse Components
          </GlassyButton>
        </motion.div>
      </div>
    </section>
  );
}
