import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import PixelCard from '../components/effects/PixelCard';

const PixelCardPage = () => {
  const [variant, setVariant] = useState<'default' | 'blue' | 'yellow' | 'pink'>('default');
  const [gap, setGap] = useState(5);
  const [speed, setSpeed] = useState(35);
  const [colors, setColors] = useState('#f8fafc,#f1f5f9,#cbd5e1');
  const [noFocus, setNoFocus] = useState(false);

  const preview = (
    <div className="h-[500px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <PixelCard
        variant={variant}
        gap={gap}
        speed={speed}
        colors={colors}
        noFocus={noFocus}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-2xl pointer-events-none">
          Hover Me
        </div>
      </PixelCard>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Variant</label>
          <select
            value={variant}
            onChange={(e) => {
              const v = e.target.value as any;
              setVariant(v);
              // Update defaults based on variant
              if (v === 'default') {
                setGap(5); setSpeed(35); setColors('#f8fafc,#f1f5f9,#cbd5e1');
              } else if (v === 'blue') {
                setGap(10); setSpeed(25); setColors('#e0f2fe,#7dd3fc,#0ea5e9');
              } else if (v === 'yellow') {
                setGap(3); setSpeed(20); setColors('#fef08a,#fde047,#eab308');
              } else if (v === 'pink') {
                setGap(6); setSpeed(80); setColors('#fecdd3,#fda4af,#e11d48');
              }
            }}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="default">Default</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Gap ({gap}px)</label>
          <input
            type="range"
            min="2"
            max="20"
            step="1"
            value={gap}
            onChange={(e) => setGap(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Speed ({speed})</label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Colors (comma separated)</label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Disable Focus Interaction</label>
          <input
            type="checkbox"
            checked={noFocus}
            onChange={(e) => setNoFocus(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import PixelCard from './PixelCard';

<PixelCard
  variant="${variant}"
  gap={${gap}}
  speed={${speed}}
  colors="${colors}"
  noFocus={${noFocus}}
>
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '24px', pointerEvents: 'none' }}>
    Hover Me
  </div>
</PixelCard>`;

  const codeExample = `import { useEffect, useRef } from 'react';
import { JSX } from 'react';

class Pixel {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    speed: number;
    size: number;
    sizeStep: number;
    minSize: number;
    maxSizeInteger: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        color: string,
        speed: number,
        delay: number
    ) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
    }

    getRandomValue(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }

    appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }
        if (this.size >= this.maxSize) {
            this.isShimmer = true;
        }
        if (this.isShimmer) {
            this.shimmer();
        } else {
            this.size += this.sizeStep;
        }
        this.draw();
    }

    disappear() {
        this.isShimmer = false;
        this.counter = 0;
        if (this.size <= 0) {
            this.isIdle = true;
            return;
        } else {
            this.size -= 0.1;
        }
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }
        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
    }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
    const min = 0;
    const max = 100;
    const throttle = 0.001;

    if (value <= min || reducedMotion) {
        return min;
    } else if (value >= max) {
        return max * throttle;
    } else {
        return value * throttle;
    }
}

const VARIANTS = {
    default: {
        activeColor: null,
        gap: 5,
        speed: 35,
        colors: '#f8fafc,#f1f5f9,#cbd5e1',
        noFocus: false
    },
    blue: {
        activeColor: '#e0f2fe',
        gap: 10,
        speed: 25,
        colors: '#e0f2fe,#7dd3fc,#0ea5e9',
        noFocus: false
    },
    yellow: {
        activeColor: '#fef08a',
        gap: 3,
        speed: 20,
        colors: '#fef08a,#fde047,#eab308',
        noFocus: false
    },
    pink: {
        activeColor: '#fecdd3',
        gap: 6,
        speed: 80,
        colors: '#fecdd3,#fda4af,#e11d48',
        noFocus: true
    }
};

interface PixelCardProps {
    variant?: 'default' | 'blue' | 'yellow' | 'pink';
    gap?: number;
    speed?: number;
    colors?: string;
    noFocus?: boolean;
    className?: string;
    children: React.ReactNode;
}

interface VariantConfig {
    activeColor: string | null;
    gap: number;
    speed: number;
    colors: string;
    noFocus: boolean;
}

export default function PixelCard({
    variant = 'default',
    gap,
    speed,
    colors,
    noFocus,
    className = '',
    children
}: PixelCardProps): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
    const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
    const timePreviousRef = useRef(performance.now());
    const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

    const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;
    const finalGap = gap ?? variantCfg.gap;
    const finalSpeed = speed ?? variantCfg.speed;
    const finalColors = colors ?? variantCfg.colors;
    const finalNoFocus = noFocus ?? variantCfg.noFocus;

    const initPixels = () => {
        if (!containerRef.current || !canvasRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);
        const ctx = canvasRef.current.getContext('2d');

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = \`\${width}px\`;
        canvasRef.current.style.height = \`\${height}px\`;

        const colorsArray = finalColors.split(',');
        const pxs = [];
        for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {
            for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {
                const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

                const dx = x - width / 2;
                const dy = y - height / 2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const delay = reducedMotion ? 0 : distance;
                if (!ctx) return;
                pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));
            }
        }
        pixelsRef.current = pxs;
    };

    const doAnimate = (fnName: keyof Pixel) => {
        animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
        const timeNow = performance.now();
        const timePassed = timeNow - timePreviousRef.current;
        const timeInterval = 1000 / 60;

        if (timePassed < timeInterval) return;
        timePreviousRef.current = timeNow - (timePassed % timeInterval);

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        let allIdle = true;
        for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            // @ts-ignore
            pixel[fnName]();
            if (!pixel.isIdle) {
                allIdle = false;
            }
        }
        if (allIdle) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleAnimation = (name: keyof Pixel) => {
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = requestAnimationFrame(() => doAnimate(name));
    };

    const onMouseEnter = () => handleAnimation('appear');
    const onMouseLeave = () => handleAnimation('disappear');
    const onFocus: React.FocusEventHandler<HTMLDivElement> = e => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation('appear');
    };
    const onBlur: React.FocusEventHandler<HTMLDivElement> = e => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation('disappear');
    };

    useEffect(() => {
        initPixels();
        const observer = new ResizeObserver(() => {
            initPixels();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => {
            observer.disconnect();
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

    return (
        <div
            ref={containerRef}
            className={\`h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none \${className}\`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={finalNoFocus ? undefined : onFocus}
            onBlur={finalNoFocus ? undefined : onBlur}
            tabIndex={finalNoFocus ? -1 : 0}
        >
            <canvas className="w-full h-full block" ref={canvasRef} />
            {children}
        </div>
    );
}
`;

  const props = [
    {
      name: 'variant',
      type: "'default' | 'blue' | 'yellow' | 'pink'",
      default: "'default'",
      description: 'Predefined style variant',
    },
    {
      name: 'gap',
      type: 'number',
      default: '5',
      description: 'Gap between pixels',
    },
    {
      name: 'speed',
      type: 'number',
      default: '35',
      description: 'Animation speed',
    },
    {
      name: 'colors',
      type: 'string',
      default: "'#f8fafc,#f1f5f9,#cbd5e1'",
      description: 'Comma separated hex colors for pixels',
    },
    {
      name: 'noFocus',
      type: 'boolean',
      default: 'false',
      description: 'Disable animation on focus',
    },
  ];

  return (
    <ComponentDetail
      title="Pixel Card"
      description="A card component with a pixelated reveal effect on hover, using HTML Canvas."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={[]}
    />
  );
};

export default PixelCardPage;