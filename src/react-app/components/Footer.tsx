import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function Footer() {
  const letters = "CORE UI".split('');

  return (
    <div className="relative h-[500px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="fixed bottom-0 left-0 right-0 h-[500px] w-full bg-[#0a0118]">

        {/* Footer Links at top */}
        <div className="absolute top-0 left-0 right-0 pt-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo.png"
                alt="Core UI Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-medium text-sm text-gray-400">Core UI</span>
            </Link>

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Core UI</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a>
            </div>

            <p className="text-sm text-gray-400">
              A library created with ❤️ by <a href="#" className="text-purple-400 hover:text-purple-300">Core UI</a>
            </p>
          </div>
        </div>

        {/* Massive CORE UI Text with Staggered Letter Animation */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden select-none pointer-events-none">
          <motion.div
            className="flex justify-center items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {letters.map((letter, index) => (
              <div key={index} className="overflow-hidden">
                <motion.span
                  className="inline-block font-black tracking-tighter leading-none text-white/15"
                  style={{
                    fontSize: 'clamp(80px, 18vw, 350px)',
                    marginRight: letter === ' ' ? '0.15em' : '-0.02em'
                  }}
                  variants={{
                    hidden: {
                      x: '-100%',
                      opacity: 0
                    },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
