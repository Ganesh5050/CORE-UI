import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Squares from '../components/effects/Squares';

const SquaresPage = () => {
  const [direction, setDirection] = useState<'diagonal' | 'up' | 'right' | 'down' | 'left'>('diagonal');
  const [speed, setSpeed] = useState(0.5);
  const [squareSize, setSquareSize] = useState(40);
  const [borderColor, setBorderColor] = useState('#333333');
  const [hoverFillColor, setHoverFillColor] = useState('#222222');

  const preview = (
    <div className="h-[500px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <div className="w-full h-full absolute inset-0">
        <Squares
          direction={direction}
          speed={speed}
          squareSize={squareSize}
          borderColor={borderColor}
          hoverFillColor={hoverFillColor}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-black text-white mix-blend-overlay opacity-80 tracking-tighter">SQUARES</h1>
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as any)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="diagonal">Diagonal</option>
            <option value="up">Up</option>
            <option value="down">Down</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Speed ({speed})</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Square Size ({squareSize})</label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={squareSize}
            onChange={(e) => setSquareSize(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-1">Border Color</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-1">Hover Fill Color</label>
            <input
              type="color"
              value={hoverFillColor}
              onChange={(e) => setHoverFillColor(e.target.value)}
              className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const usageCode = `import Squares from './Squares';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Squares
    direction="${direction}"
    speed={${speed}}
    squareSize={${squareSize}}
    borderColor="${borderColor}"
    hoverFillColor="${hoverFillColor}"
  />
</div>`;

  const codeExample = `import React, { useRef, useEffect } from 'react';

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, '#060010');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Squares;`;

  const props = [
    {
      name: 'direction',
      type: "'diagonal' | 'up' | 'right' | 'down' | 'left'",
      default: "'right'",
      description: 'Direction of the grid movement',
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Animation speed',
    },
    {
      name: 'squareSize',
      type: 'number',
      default: '40',
      description: 'Size of each square in pixels',
    },
    {
      name: 'borderColor',
      type: 'string',
      default: "'#999'",
      description: 'Color of the grid lines',
    },
    {
      name: 'hoverFillColor',
      type: 'string',
      default: "'#222'",
      description: 'Background color of hovered square',
    },
  ];

  return (
    <ComponentDetail
      title="Squares"
      description="An animated background grid with moving squares and hover interaction."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={[]}
    />
  );
};

export default SquaresPage;