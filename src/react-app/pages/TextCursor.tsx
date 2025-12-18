import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import TextCursorComponent from '../components/text/TextCursor';
import Slider from '../components/Slider';

const TextCursorPreview = ({
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  maxPoints = 5
}: {
  text?: string;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  maxPoints?: number;
}) => {
  return (
    <div className="w-full h-[400px] relative bg-white/5 rounded-lg overflow-hidden cursor-crosshair">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-500 text-sm">Move your mouse around this area</p>
      </div>
      <TextCursorComponent
        text={text}
        spacing={spacing}
        followMouseDirection={followMouseDirection}
        randomFloat={randomFloat}
        exitDuration={exitDuration}
        maxPoints={maxPoints}
      />
    </div>
  );
};

const codeExample = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextCursorProps {
  text: string;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX?: number;
  randomY?: number;
  randomRotate?: number;
}

const TextCursor: React.FC<TextCursorProps> = ({
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  removalInterval = 30,
  maxPoints = 5
}) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const idCounter = useRef<number>(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTrail(prev => {
      let newTrail = [...prev];
      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x: mouseX,
          y: mouseY,
          angle: 0,
          ...(randomFloat && {
            randomX: Math.random() * 10 - 5,
            randomY: Math.random() * 10 - 5,
            randomRotate: Math.random() * 10 - 5
          })
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        const dx = mouseX - last.x;
        const dy = mouseY - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= spacing) {
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

          rawAngle = ((rawAngle + 180) % 360) - 180;

          const computedAngle = followMouseDirection ? rawAngle : 0;
          const steps = Math.floor(distance / spacing);
          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / distance;
            const newX = last.x + dx * t;
            const newY = last.y + dy * t;
            newTrail.push({
              id: idCounter.current++,
              x: newX,
              y: newY,
              angle: computedAngle,
              ...(randomFloat && {
                randomX: Math.random() * 10 - 5,
                randomY: Math.random() * 10 - 5,
                randomRotate: Math.random() * 10 - 5
              })
            });
          }
        }
      }
      if (newTrail.length > maxPoints) {
        newTrail = newTrail.slice(newTrail.length - maxPoints);
      }
      return newTrail;
    });
    lastMoveTimeRef.current = Date.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef.current]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {trail.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 1, rotate: item.angle }}
              animate={{
                opacity: 1,
                scale: 1,
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: exitDuration, ease: 'easeOut' },
                
                ...(randomFloat && {
                  x: {
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror'
                  },
                  y: {
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror'
                  },
                  rotate: {
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror'
                  }
                })
              }}
              className="absolute select-none whitespace-nowrap text-3xl"
              style={{ left: item.x, top: item.y }}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TextCursor;`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: "'⚛️'",
    description: 'The text content to leave as a trail',
  },
  {
    name: 'spacing',
    type: 'number',
    default: '100',
    description: 'Distance between trail items',
  },
  {
    name: 'followMouseDirection',
    type: 'boolean',
    default: 'true',
    description: 'Whether text should rotate to follow mouse direction',
  },
  {
    name: 'randomFloat',
    type: 'boolean',
    default: 'true',
    description: 'Enable random floating animation',
  },
  {
    name: 'exitDuration',
    type: 'number',
    default: '0.5',
    description: 'Duration of exit animation',
  },
  {
    name: 'maxPoints',
    type: 'number',
    default: '5',
    description: 'Maximum number of trail points',
  },
];

export default function TextCursor() {
  const [text, setText] = useState('⚛️');
  const [spacing, setSpacing] = useState(100);
  const [maxPoints, setMaxPoints] = useState(5);
  const [followMouseDirection, setFollowMouseDirection] = useState(true);
  const [randomFloat, setRandomFloat] = useState(true);

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Trail Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>

      <Slider
        label="Spacing"
        value={spacing}
        min={20}
        max={200}
        step={10}
        onChange={setSpacing}
        unit="px"
      />

      <Slider
        label="Max Points"
        value={maxPoints}
        min={1}
        max={20}
        step={1}
        onChange={setMaxPoints}
      />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Follow Mouse Direction</label>
        <button
          onClick={() => setFollowMouseDirection(!followMouseDirection)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${followMouseDirection ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {followMouseDirection ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Random Float</label>
        <button
          onClick={() => setRandomFloat(!randomFloat)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${randomFloat ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {randomFloat ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Text Cursor"
      description="Interactive cursor effect that leaves a trail of text characters"
      preview={<TextCursorPreview
        text={text}
        spacing={spacing}
        maxPoints={maxPoints}
        followMouseDirection={followMouseDirection}
        randomFloat={randomFloat}
      />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
