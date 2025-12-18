import { useState, useRef, useEffect } from 'react';
import ComponentDetail from './ComponentDetail';

// DotGrid Component
interface DotGridProps {
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  hoverColor?: string;
  hoverRadius?: number;
  animated?: boolean;
}

const DotGrid = ({
  dotSize = 2,
  dotSpacing = 20,
  dotColor = 'rgba(255, 255, 255, 0.2)',
  hoverColor = '#8b5cf6',
  hoverRadius = 100,
  animated = true,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const dotsRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initDots();
      }
    };

    const initDots = () => {
      dotsRef.current = [];
      const cols = Math.ceil(canvas.width / dotSpacing) + 1;
      const rows = Math.ceil(canvas.height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          dotsRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        const dx = mousePos.current.x - dot.x;
        const dy = mousePos.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (animated && distance < hoverRadius) {
          const force = (hoverRadius - distance) / hoverRadius;
          const angle = Math.atan2(dy, dx);
          const repelX = -Math.cos(angle) * force * 15;
          const repelY = -Math.sin(angle) * force * 15;

          dot.vx += (repelX - dot.vx) * 0.1;
          dot.vy += (repelY - dot.vy) * 0.1;
        }

        // Spring back to original position
        dot.vx += (dot.baseX - dot.x) * 0.05;
        dot.vy += (dot.baseY - dot.y) * 0.05;

        // Apply velocity with damping
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Calculate color based on distance
        let color = dotColor;
        let size = dotSize;

        if (distance < hoverRadius) {
          const intensity = 1 - distance / hoverRadius;
          color = hoverColor;
          size = dotSize + intensity * 3;
          ctx.globalAlpha = 0.3 + intensity * 0.7;
        } else {
          ctx.globalAlpha = 0.3;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [dotSize, dotSpacing, dotColor, hoverColor, hoverRadius, animated]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

const DotGridPage = () => {
  const [dotSize, setDotSize] = useState(2);
  const [dotSpacing, setDotSpacing] = useState(25);
  const [hoverRadius, setHoverRadius] = useState(100);
  const [hoverColor, setHoverColor] = useState('#8b5cf6');
  const [animated, setAnimated] = useState(true);

  const preview = (
    <div className="h-[500px] w-full bg-[#060010] rounded-lg overflow-hidden border border-gray-800">
      <DotGrid
        dotSize={dotSize}
        dotSpacing={dotSpacing}
        hoverColor={hoverColor}
        hoverRadius={hoverRadius}
        animated={animated}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Dot Size ({dotSize}px)</label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={dotSize}
            onChange={(e) => setDotSize(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer accent-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Dot Spacing ({dotSpacing}px)</label>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={dotSpacing}
            onChange={(e) => setDotSpacing(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer accent-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hover Radius ({hoverRadius}px)</label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={hoverRadius}
            onChange={(e) => setHoverRadius(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hover Color</label>
          <input
            type="color"
            value={hoverColor}
            onChange={(e) => setHoverColor(e.target.value)}
            className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer border border-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Animated Repel</label>
          <input
            type="checkbox"
            checked={animated}
            onChange={(e) => setAnimated(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import DotGrid from './DotGrid'

<div style={{ width: '100%', height: '500px' }}>
  <DotGrid 
    dotSize={${dotSize}}
    dotSpacing={${dotSpacing}}
    hoverColor="${hoverColor}"
    hoverRadius={${hoverRadius}}
    animated={${animated}}
  />
</div>`;

  const codeExample = `import { useState, useRef, useEffect } from 'react';

interface DotGridProps {
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  hoverColor?: string;
  hoverRadius?: number;
  animated?: boolean;
}

const DotGrid = ({
  dotSize = 2,
  dotSpacing = 20,
  dotColor = 'rgba(255, 255, 255, 0.2)',
  hoverColor = '#8b5cf6',
  hoverRadius = 100,
  animated = true,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const dotsRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initDots();
      }
    };

    const initDots = () => {
      dotsRef.current = [];
      const cols = Math.ceil(canvas.width / dotSpacing) + 1;
      const rows = Math.ceil(canvas.height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          dotsRef.current.push({
            x, y, baseX: x, baseY: y, vx: 0, vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        const dx = mousePos.current.x - dot.x;
        const dy = mousePos.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (animated && distance < hoverRadius) {
          const force = (hoverRadius - distance) / hoverRadius;
          const angle = Math.atan2(dy, dx);
          dot.vx += (-Math.cos(angle) * force * 15 - dot.vx) * 0.1;
          dot.vy += (-Math.sin(angle) * force * 15 - dot.vy) * 0.1;
        }

        // Spring back to original position
        dot.vx += (dot.baseX - dot.x) * 0.05;
        dot.vy += (dot.baseY - dot.y) * 0.05;
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        let color = distance < hoverRadius ? hoverColor : dotColor;
        let size = distance < hoverRadius 
          ? dotSize + (1 - distance / hoverRadius) * 3 
          : dotSize;

        ctx.globalAlpha = distance < hoverRadius 
          ? 0.3 + (1 - distance / hoverRadius) * 0.7 
          : 0.3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [dotSize, dotSpacing, dotColor, hoverColor, hoverRadius, animated]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default DotGrid;`;

  const props = [
    {
      name: 'dotSize',
      type: 'number',
      default: '2',
      description: 'Size of each dot in pixels',
    },
    {
      name: 'dotSpacing',
      type: 'number',
      default: '20',
      description: 'Spacing between dots in pixels',
    },
    {
      name: 'dotColor',
      type: 'string',
      default: "'rgba(255, 255, 255, 0.2)'",
      description: 'Default color of dots',
    },
    {
      name: 'hoverColor',
      type: 'string',
      default: "'#8b5cf6'",
      description: 'Color of dots when hovered',
    },
    {
      name: 'hoverRadius',
      type: 'number',
      default: '100',
      description: 'Radius of hover effect in pixels',
    },
    {
      name: 'animated',
      type: 'boolean',
      default: 'true',
      description: 'Enable dot repel animation on hover',
    },
  ];

  return (
    <ComponentDetail
      title="Dot Grid"
      description="An interactive animated dot grid background with mouse-responsive hover effects."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={[]}
    />
  );
};

export default DotGridPage;