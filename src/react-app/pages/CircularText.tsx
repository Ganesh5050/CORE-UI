import { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';
import Slider from '../components/Slider';

const CircularTextPreview = ({ 
  spinDuration = 20,
  onHover = 'speedUp'
}: {
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
}) => {
  const text = "REACT*BITS*COMPONENTS*";
  const letters = Array.from(text);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-[200px] h-[200px] rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: spinDuration,
          repeat: Infinity,
          ease: "linear"
        }}
        whileHover={
          onHover === 'speedUp' ? { transition: { duration: spinDuration / 4 } } :
          onHover === 'slowDown' ? { transition: { duration: spinDuration * 2 } } :
          onHover === 'pause' ? { rotate: 0 } :
          onHover === 'goBonkers' ? { scale: 0.8, transition: { duration: spinDuration / 20 } } :
          {}
        }
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const factor = Math.PI / letters.length;
          const x = factor * i;
          const y = factor * i;
          
          return (
            <span
              key={i}
              className="absolute inset-0 text-2xl font-black"
              style={{
                transform: `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

const codeExample = `import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = ''
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center cursor-pointer origin-center \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;`;

const usageExample = `import CircularText from './CircularText';

<CircularText 
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text to display in circular pattern',
  },
  {
    name: 'spinDuration',
    type: 'number',
    default: '20',
    description: 'Duration of one full rotation in seconds',
  },
  {
    name: 'onHover',
    type: "'slowDown' | 'speedUp' | 'pause' | 'goBonkers'",
    default: "'speedUp'",
    description: 'Hover behavior for the circular text',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function CircularText() {
  const [spinDuration, setSpinDuration] = useState(20);
  const [onHover, setOnHover] = useState<'slowDown' | 'speedUp' | 'pause' | 'goBonkers'>('speedUp');

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Hover Behavior</label>
        <select 
          value={onHover}
          onChange={(e) => setOnHover(e.target.value as any)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer hover:bg-white/10"
        >
          <option value="speedUp">Speed Up</option>
          <option value="slowDown">Slow Down</option>
          <option value="pause">Pause</option>
          <option value="goBonkers">Go Bonkers</option>
        </select>
      </div>

      <Slider
        label="Spin Duration"
        value={spinDuration}
        min={5}
        max={40}
        step={5}
        onChange={setSpinDuration}
        unit="s"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Circular Text"
      description="Display text arranged in a circular pattern with smooth rotation animation"
      preview={<CircularTextPreview spinDuration={spinDuration} onHover={onHover} />}
      code={codeExample}
      usage={usageExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
