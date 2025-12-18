import { useState, useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import AnimatedContentComponent from '../components/effects/AnimatedContent';
import Slider from '../components/Slider';

const AnimatedContentPreview = ({
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.6,
  scale = 1
}: {
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  scale?: number;
}) => {
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-8">
      <div
        ref={containerRef}
        className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-black/20 rounded-lg border border-white/10"
      >
        <AnimatedContentComponent
          key={key}
          container={containerRef.current}
          distance={distance}
          direction={direction}
          reverse={reverse}
          duration={duration}
          scale={scale}
          threshold={0.1}
          animateOpacity={true}
          initialOpacity={0}
        >
          <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">Animated Content</h3>
            <p className="text-gray-400">This content animates on view using GSAP</p>
          </div>
        </AnimatedContentComponent>
      </div>

      <button
        onClick={handleReplay}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
      >
        Replay Animation
      </button>
    </div>
  );
};

const codeExample = `import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget: Element | string | null = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: \`top \${startPct}%\`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={\`invisible \${className}\`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to be animated',
  },
  {
    name: 'distance',
    type: 'number',
    default: '100',
    description: 'Distance to move during animation',
  },
  {
    name: 'direction',
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
    description: 'Direction of movement',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Reverse the direction of movement',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.8',
    description: 'Animation duration in seconds',
  },
  {
    name: 'scale',
    type: 'number',
    default: '1',
    description: 'Initial scale value',
  },
  {
    name: 'threshold',
    type: 'number',
    default: '0.1',
    description: 'Scroll threshold to trigger animation (0-1)',
  },
];

export default function AnimatedContent() {
  const [distance, setDistance] = useState(100);
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');
  const [reverse, setReverse] = useState(false);
  const [duration, setDuration] = useState(0.8);
  const [scale, setScale] = useState(1);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Distance"
        value={distance}
        min={0}
        max={500}
        step={10}
        onChange={setDistance}
        unit="px"
      />

      <Slider
        label="Duration"
        value={duration}
        min={0.1}
        max={2}
        step={0.1}
        onChange={setDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />

      <Slider
        label="Initial Scale"
        value={scale}
        min={0}
        max={2}
        step={0.1}
        onChange={setScale}
        formatValue={(v) => v.toFixed(1)}
      />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Direction</label>
        <div className="flex gap-2">
          <button
            onClick={() => setDirection('vertical')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${direction === 'vertical' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
          >
            Vertical
          </button>
          <button
            onClick={() => setDirection('horizontal')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${direction === 'horizontal' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
          >
            Horizontal
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Reverse Direction</label>
        <button
          onClick={() => setReverse(!reverse)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${reverse ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {reverse ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Animated Content"
      description="Smoothly animate content on scroll using GSAP"
      preview={<AnimatedContentPreview
        distance={distance}
        direction={direction}
        reverse={reverse}
        duration={duration}
        scale={scale}
      />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['gsap']}
    />
  );
}
