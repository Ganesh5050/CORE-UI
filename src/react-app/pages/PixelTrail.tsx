import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import PixelTrail from '../components/effects/PixelTrail';
import Slider from '../components/Slider';

const PixelTrailPreview = ({
  gridSize = 50,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  color = '#ffffff',
  gooeyStrength = 0
}: {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  color?: string;
  gooeyStrength?: number;
}) => {
  return (
    <div className="h-[500px] w-full bg-black relative overflow-hidden rounded-lg border border-gray-800">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <p className="text-white text-2xl font-bold opacity-50">Move your mouse</p>
      </div>

      <PixelTrail
        gridSize={gridSize}
        trailSize={trailSize}
        maxAge={maxAge}
        interpolate={interpolate}
        color={color}
        gooeyFilter={gooeyStrength > 0 ? { id: "custom-goo-filter", strength: gooeyStrength } : undefined}
        className="w-full h-full"
      />
    </div>
  );
};

const codeExample = `/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="absolute overflow-hidden z-1">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl vertex shader */ \`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  \`,
  /* glsl fragment shader */ \`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  \`
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x)
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
        transparent={true}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={\`absolute z-1 \${className}\`}
        style={gooeyFilter ? { filter: \`url(#\${gooeyFilter.id})\` } : undefined}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
`;

const props = [
  {
    name: 'gridSize',
    type: 'number',
    default: '40',
    description: 'Size of the pixel grid',
  },
  {
    name: 'trailSize',
    type: 'number',
    default: '0.1',
    description: 'Radius of the trail',
  },
  {
    name: 'maxAge',
    type: 'number',
    default: '250',
    description: 'Duration the trail stays visible (in ms)',
  },
  {
    name: 'interpolate',
    type: 'number',
    default: '5',
    description: 'Interpolation steps for smoother trail',
  },
  {
    name: 'color',
    type: 'string',
    default: "'#ffffff'",
    description: 'Color of the pixels',
  },
  {
    name: 'gooeyFilter',
    type: '{ id: string; strength: number }',
    default: 'undefined',
    description: 'Optional gooey SVG filter configuration',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function PixelTrailPage() {
  const [gridSize, setGridSize] = useState(50);
  const [trailSize, setTrailSize] = useState(0.1);
  const [maxAge, setMaxAge] = useState(250);
  const [interpolate, setInterpolate] = useState(5);
  const [color, setColor] = useState('#ffffff');
  const [gooeyStrength, setGooeyStrength] = useState(0);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Grid Size"
        value={gridSize}
        onChange={setGridSize}
        min={10}
        max={100}
        step={5}
      />

      <Slider
        label="Trail Size"
        value={trailSize}
        onChange={setTrailSize}
        min={0.05}
        max={0.5}
        step={0.01}
      />

      <Slider
        label="Max Age (Duration)"
        value={maxAge}
        onChange={setMaxAge}
        min={100}
        max={1000}
        step={50}
        unit="ms"
      />

      <Slider
        label="Interpolate"
        value={interpolate}
        onChange={setInterpolate}
        min={0}
        max={10}
        step={1}
      />

      <Slider
        label="Gooey Strength"
        value={gooeyStrength}
        onChange={setGooeyStrength}
        min={0}
        max={5}
        step={0.5}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Pixel Trail"
      description="A pixelated trail effect that follows the cursor using Three.js shaders"
      preview={
        <PixelTrailPreview
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          color={color}
          gooeyStrength={gooeyStrength}
        />
      }
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['three', '@react-three/fiber', '@react-three/drei']}
    />
  );
}
