import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';

const LogoLoopPreview = () => {
  const logos = ['React', 'Vue', 'Angular', 'Svelte', 'Next', 'Nuxt'];

  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-16"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-2xl font-bold">{logo}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const codeExample = `import { motion } from 'framer-motion';

export default function LogoLoop({ 
  logos,
  duration = 20
}: { 
  logos: string[];
  duration?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-16"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear',
          },
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-shrink-0">
            <img src={logo} alt="Logo" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}`;

const props = [
  {
    name: 'logos',
    type: 'string[]',
    default: '-',
    description: 'Array of logo URLs to display',
  },
  {
    name: 'duration',
    type: 'number',
    default: '20',
    description: 'Duration of one complete loop in seconds',
  },
];

export default function LogoLoop() {
  return (
    <ComponentDetail
      title="Logo Loop"
      description="Infinite scrolling logo carousel"
      preview={<LogoLoopPreview />}
      code={codeExample}
      props={props}
    />
  );
}
