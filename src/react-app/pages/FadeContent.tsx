import { useState, useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import FadeContentComponent from '../components/effects/FadeContent';
import Slider from '../components/Slider';

const FadeContentPreview = ({
  blur = false,
  duration = 1000,
  threshold = 0.1,
  initialOpacity = 0
}: {
  blur?: boolean;
  duration?: number;
  threshold?: number;
  initialOpacity?: number;
}) => {
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-8">
      <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-black/20 rounded-lg border border-white/10">
        <FadeContentComponent
          key={key}
          blur={blur}
          duration={duration}
          threshold={threshold}
          initialOpacity={initialOpacity}
        >
          <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">Fade Content</h3>
            <p className="text-gray-400">This content fades in when in view.</p>
          </div>
        </FadeContentComponent>
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

const codeExample = `import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to be animated',
  },
  {
    name: 'blur',
    type: 'boolean',
    default: 'false',
    description: 'Whether to apply a blur effect during fade',
  },
  {
    name: 'duration',
    type: 'number',
    default: '1000',
    description: 'Animation duration in milliseconds',
  },
  {
    name: 'easing',
    type: 'string',
    default: "'ease-out'",
    description: 'CSS transition easing function',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay before animation starts in milliseconds',
  },
  {
    name: 'threshold',
    type: 'number',
    default: '0.1',
    description: 'Intersection observer threshold (0-1)',
  },
  {
    name: 'initialOpacity',
    type: 'number',
    default: '0',
    description: 'Starting opacity value',
  },
];

export default function FadeContent() {
  const [blur, setBlur] = useState(false);
  const [duration, setDuration] = useState(1000);
  const [threshold, setThreshold] = useState(0.1);
  const [initialOpacity, setInitialOpacity] = useState(0);

  const customization = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Blur Effect</label>
        <button
          onClick={() => setBlur(!blur)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${blur ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {blur ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <Slider
        label="Duration"
        value={duration}
        min={100}
        max={3000}
        step={100}
        onChange={setDuration}
        unit="ms"
      />

      <Slider
        label="Threshold"
        value={threshold}
        min={0}
        max={1}
        step={0.1}
        onChange={setThreshold}
        formatValue={(v) => v.toFixed(1)}
      />

      <Slider
        label="Initial Opacity"
        value={initialOpacity}
        min={0}
        max={1}
        step={0.1}
        onChange={setInitialOpacity}
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Fade Content"
      description="Content that fades in when it enters the viewport, with optional blur effect."
      preview={<FadeContentPreview blur={blur} duration={duration} threshold={threshold} initialOpacity={initialOpacity} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
