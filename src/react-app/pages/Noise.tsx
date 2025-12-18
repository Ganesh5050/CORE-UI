import { useEffect, useRef } from 'react';
import ComponentDetail from './ComponentDetail';

const NoisePreview = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 50;
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative h-96 bg-black rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={384}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h3 className="text-3xl font-bold mix-blend-difference text-white">Noise Effect</h3>
      </div>
    </div>
  );
};

const codeExample = `import { useEffect, useRef } from 'react';

export default function Noise({ 
  opacity = 50 
}: { 
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = opacity;
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}`;

const props = [
  {
    name: 'opacity',
    type: 'number',
    default: '50',
    description: 'Opacity of noise effect (0-255)',
  },
];

export default function Noise() {
  return (
    <ComponentDetail
      title="Noise"
      description="Animated static noise effect"
      preview={<NoisePreview />}
      code={codeExample}
      props={props}
      dependencies={[]}
    />
  );
}
