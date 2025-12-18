import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ClickSparkComponent from '../components/effects/ClickSpark';
import Slider from '../components/Slider';

const ClickSparkPreview = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out'
}: {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}) => {
  return (
    <div className="h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <ClickSparkComponent
        sparkColor={sparkColor}
        sparkSize={sparkSize}
        sparkRadius={sparkRadius}
        sparkCount={sparkCount}
        duration={duration}
        easing={easing}
        extraScale={1.0}
      >
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">Click anywhere to create sparks!</p>
            <p className="text-gray-500 text-sm">Try clicking multiple times</p>
          </div>
        </div>
      </ClickSparkComponent>
    </div>
  );
};

const codeExample = `import React, { useRef, useEffect, useCallback } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {children}
    </div>
  );
};

export default ClickSpark;`;

const props = [
  {
    name: 'sparkColor',
    type: 'string',
    default: '#fff',
    description: 'Color of the spark lines',
  },
  {
    name: 'sparkSize',
    type: 'number',
    default: '10',
    description: 'Length of each spark line',
  },
  {
    name: 'sparkRadius',
    type: 'number',
    default: '15',
    description: 'Distance sparks travel from center',
  },
  {
    name: 'sparkCount',
    type: 'number',
    default: '8',
    description: 'Number of sparks per click',
  },
  {
    name: 'duration',
    type: 'number',
    default: '400',
    description: 'Animation duration in milliseconds',
  },
  {
    name: 'easing',
    type: "'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'",
    default: 'ease-out',
    description: 'Easing function for animation',
  },
  {
    name: 'extraScale',
    type: 'number',
    default: '1.0',
    description: 'Scale multiplier for spark radius',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to wrap with click spark effect',
  },
];

export default function ClickSpark() {
  const [sparkColor, setSparkColor] = useState('#ffffff');
  const [sparkSize, setSparkSize] = useState(10);
  const [sparkRadius, setSparkRadius] = useState(15);
  const [sparkCount, setSparkCount] = useState(8);
  const [duration, setDuration] = useState(400);
  const [easing, setEasing] = useState<'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'>('ease-out');

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Spark Color</label>
        <input
          type="color"
          value={sparkColor}
          onChange={(e) => setSparkColor(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer bg-white/5 border border-white/10"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Easing</label>
        <select
          value={easing}
          onChange={(e) => setEasing(e.target.value as any)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
        </select>
      </div>

      <Slider
        label="Spark Size"
        value={sparkSize}
        onChange={setSparkSize}
        min={5}
        max={30}
        step={1}
        unit="px"
      />

      <Slider
        label="Spark Radius"
        value={sparkRadius}
        onChange={setSparkRadius}
        min={10}
        max={50}
        step={5}
        unit="px"
      />

      <Slider
        label="Spark Count"
        value={sparkCount}
        onChange={setSparkCount}
        min={4}
        max={16}
        step={1}
      />

      <Slider
        label="Duration"
        value={duration}
        onChange={setDuration}
        min={200}
        max={1000}
        step={50}
        unit="ms"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Click Spark"
      description="Canvas-based spark animation effect triggered on click with customizable appearance and easing"
      preview={
        <ClickSparkPreview
          sparkColor={sparkColor}
          sparkSize={sparkSize}
          sparkRadius={sparkRadius}
          sparkCount={sparkCount}
          duration={duration}
          easing={easing}
        />
      }
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
