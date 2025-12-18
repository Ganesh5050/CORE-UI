import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ScrollVelocityComponent from '../components/text/ScrollVelocity';

const ScrollVelocityPreview = ({
  velocity = 100
}: {
  velocity?: number;
}) => {
  return (
    <div className="h-96 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-purple-500/10 to-transparent">
      <ScrollVelocityComponent
        texts={['Core UI', 'Scroll Down']}
        velocity={velocity}
        className="text-white/80"
      />
    </div>
  );
};

const installCode = `npx shadcn@latest add @react-bits/ScrollVelocity-TS-TW`;

const usageCode = `import ScrollVelocity from './ScrollVelocity';

<ScrollVelocity
  texts={['React Bits', 'Scroll Down']}
  velocity={100}
  className="custom-scroll-text"
/>`;

const codeExample = `import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return \`\${wrap(-copyWidth, 0, v)}px\`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span className={\`flex-shrink-0 \${className}\`} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>
      );
    }

    return (
      <div className={\`\${parallaxClassName} relative overflow-hidden\`} style={parallaxStyle}>
        <motion.div
          className={\`\${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]\`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;`;

const props = [
  {
    name: 'texts',
    type: 'string[]',
    default: '-',
    description: 'Array of text strings to display',
  },
  {
    name: 'velocity',
    type: 'number',
    default: '100',
    description: 'Base scroll velocity',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
  {
    name: 'damping',
    type: 'number',
    default: '50',
    description: 'Spring damping value',
  },
  {
    name: 'stiffness',
    type: 'number',
    default: '400',
    description: 'Spring stiffness value',
  },
  {
    name: 'numCopies',
    type: 'number',
    default: '6',
    description: 'Number of text copies to render',
  },
];

export default function ScrollVelocity() {
  const [velocity, setVelocity] = useState(100);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Velocity</label>
          <span className="text-sm text-purple-400 font-mono">{velocity}</span>
        </div>
        <input
          type="range"
          min="50"
          max="200"
          step="10"
          value={velocity}
          onChange={(e) => setVelocity(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Scroll Velocity"
      description="Infinite scrolling text that responds to scroll velocity"
      preview={<ScrollVelocityPreview velocity={velocity} />}
      installCode={installCode}
      usageCode={usageCode}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
