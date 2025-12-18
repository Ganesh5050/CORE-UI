import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ScrambledTextComponent from '../components/text/ScrambledText';
import Slider from '../components/Slider';

const ScrambledTextPreview = ({
  scrambleChars = '.:',
  radius = 100,
  duration = 1.2,
  speed = 0.5
}: {
  scrambleChars?: string;
  radius?: number;
  duration?: number;
  speed?: number;
}) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] px-8">
      <ScrambledTextComponent
        key={`${scrambleChars}-${radius}-${duration}-${speed}`}
        radius={radius}
        duration={duration}
        speed={speed}
        scrambleChars={scrambleChars}
        className="text-center"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique pariatur dignissimos porro eius quam doloremque et enim velit nobis maxime.
      </ScrambledTextComponent>
    </div>
  );
};

const codeExample = `// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'chars',
      charsClass: 'inline-block will-change-transform'
    });

    split.chars.forEach(el => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { 'data-content': c.innerHTML } });
    });

    const handleMove = (e: PointerEvent) => {
      split.chars.forEach(el => {
        const c = el as HTMLElement;
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed
            },
            ease: 'none'
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={\`max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white \${className}\`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'The text content to scramble on hover',
  },
  {
    name: 'radius',
    type: 'number',
    default: '100',
    description: 'Radius of mouse interaction area in pixels',
  },
  {
    name: 'duration',
    type: 'number',
    default: '1.2',
    description: 'Duration of scramble animation in seconds',
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.5',
    description: 'Speed of character scrambling',
  },
  {
    name: 'scrambleChars',
    type: 'string',
    default: '.:',
    description: 'Characters to use for scrambling effect',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function ScrambledText() {
  const [scrambleChars, setScrambleChars] = useState('.:');
  const [radius, setRadius] = useState(100);
  const [duration, setDuration] = useState(1.2);
  const [speed, setSpeed] = useState(0.5);

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Scramble Characters</label>
        <input
          type="text"
          value={scrambleChars}
          onChange={(e) => setScrambleChars(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 font-mono"
          placeholder=".:!@#$%"
        />
      </div>

      <Slider
        label="Radius"
        value={radius}
        min={50}
        max={200}
        step={10}
        onChange={setRadius}
        unit="px"
      />

      <Slider
        label="Duration"
        value={duration}
        min={0.5}
        max={3}
        step={0.1}
        onChange={setDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />

      <Slider
        label="Speed"
        value={speed}
        min={0.1}
        max={1}
        step={0.1}
        onChange={setSpeed}
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Scrambled Text"
      description="Text that scrambles characters on mouse hover using GSAP ScrambleTextPlugin - move your mouse over the text"
      preview={<ScrambledTextPreview scrambleChars={scrambleChars} radius={radius} duration={duration} speed={speed} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['gsap', '@gsap/react']}
    />
  );
}
