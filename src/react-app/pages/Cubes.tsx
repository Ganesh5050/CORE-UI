import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import CubesComponent from '../components/effects/Cubes';
import Slider from '../components/Slider';

const CubesPreview = ({
  gridSize = 8,
  maxAngle = 60,
  radius = 4,
  faceColor = '#1a1a2e',
  rippleColor = '#ff6b6b',
  rippleSpeed = 1.5,
  autoAnimate = true,
  rippleOnClick = true
}: {
  gridSize?: number;
  maxAngle?: number;
  radius?: number;
  faceColor?: string;
  rippleColor?: string;
  rippleSpeed?: number;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
}) => {
  return (
    <div className="h-[600px] w-full bg-black flex items-center justify-center overflow-hidden rounded-lg border border-gray-800">
      <CubesComponent
        gridSize={gridSize}
        cubeSize={undefined}
        cellGap="5%"
        maxAngle={maxAngle}
        radius={radius}
        borderStyle="2px dashed #5227FF"
        faceColor={faceColor}
        rippleColor={rippleColor}
        rippleSpeed={rippleSpeed}
        autoAnimate={autoAnimate}
        rippleOnClick={rippleOnClick}
      />
    </div>
  );
};

const codeExample = `// See the full Cubes component implementation in src/react-app/components/effects/Cubes.tsx
// This component uses GSAP for 3D cube animations with mouse interaction and ripple effects.

import Cubes from './Cubes';

<Cubes
  gridSize={10}
  maxAngle={45}
  radius={3}
  faceColor="#060010"
  rippleColor="#fff"
  rippleSpeed={2}
  autoAnimate={true}
  rippleOnClick={true}
/>`;

const cssCode = `:root {
  --col-gap: 5%;
  --row-gap: 5%;
  --cube-perspective: 99999999px;
  --cube-face-border: 1px solid #fff;
  --cube-face-bg: #060010;
}

.default-animation {
  position: relative;
  width: 50%;
  aspect-ratio: 1 / 1;
  height: auto;
}

.default-animation--scene {
  display: grid;
  width: 100%;
  height: 100%;
  column-gap: var(--col-gap);
  row-gap: var(--row-gap);
  perspective: var(--cube-perspective);
  grid-auto-rows: 1fr;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  transform-style: preserve-3d;
}

.cube::before {
  content: '';
  position: absolute;
  top: -36px;
  right: -36px;
  bottom: -36px;
  left: -36px;
}

.default-animation .cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cube-face-bg);
  border: var(--cube-face-border);
  opacity: 1;
}

.default-animation .cube-face--top {
  transform: translateY(-50%) rotateX(90deg);
}

.default-animation .cube-face--bottom {
  transform: translateY(50%) rotateX(-90deg);
}

.default-animation .cube-face--left {
  transform: translateX(-50%) rotateY(-90deg);
}

.default-animation .cube-face--right {
  transform: translateX(50%) rotateY(90deg);
}

.default-animation .cube-face--back,
.default-animation .cube-face--front {
  transform: rotateY(-90deg) translateX(50%) rotateY(90deg);
}

@media (max-width: 768px) {
  .default-animation {
    width: 90%;
  }
}`;

const props = [
  {
    name: 'gridSize',
    type: 'number',
    default: '10',
    description: 'Number of cubes per row/column',
  },
  {
    name: 'maxAngle',
    type: 'number',
    default: '45',
    description: 'Maximum rotation angle in degrees',
  },
  {
    name: 'radius',
    type: 'number',
    default: '3',
    description: 'Radius of effect influence',
  },
  {
    name: 'faceColor',
    type: 'string',
    default: "'#060010'",
    description: 'Color of the cube faces',
  },
  {
    name: 'rippleColor',
    type: 'string',
    default: "'#fff'",
    description: 'Color of the ripple effect',
  },
  {
    name: 'rippleSpeed',
    type: 'number',
    default: '2',
    description: 'Speed of the ripple animation',
  },
  {
    name: 'autoAnimate',
    type: 'boolean',
    default: 'true',
    description: 'Whether to animate automatically',
  },
  {
    name: 'rippleOnClick',
    type: 'boolean',
    default: 'true',
    description: 'Trigger ripple on click',
  },
];

export default function CubesPage() {
  const [gridSize, setGridSize] = useState(8);
  const [maxAngle, setMaxAngle] = useState(60);
  const [radius, setRadius] = useState(4);
  const [faceColor, setFaceColor] = useState('#1a1a2e');
  const [rippleColor, setRippleColor] = useState('#ff6b6b');
  const [rippleSpeed, setRippleSpeed] = useState(1.5);
  const [autoAnimate, setAutoAnimate] = useState(true);
  const [rippleOnClick, setRippleOnClick] = useState(true);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Grid Size"
        value={gridSize}
        onChange={setGridSize}
        min={4}
        max={15}
        step={1}
      />

      <Slider
        label="Max Angle"
        value={maxAngle}
        onChange={setMaxAngle}
        min={10}
        max={90}
        step={5}
        unit="°"
      />

      <Slider
        label="Radius"
        value={radius}
        onChange={setRadius}
        min={1}
        max={10}
        step={0.5}
      />

      <Slider
        label="Ripple Speed"
        value={rippleSpeed}
        onChange={setRippleSpeed}
        min={0.5}
        max={5}
        step={0.1}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Face Color</label>
        <input
          type="color"
          value={faceColor}
          onChange={(e) => setFaceColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Ripple Color</label>
        <input
          type="color"
          value={rippleColor}
          onChange={(e) => setRippleColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-400">Auto Animate</label>
        <input
          type="checkbox"
          checked={autoAnimate}
          onChange={(e) => setAutoAnimate(e.target.checked)}
          className="toggle"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-400">Ripple On Click</label>
        <input
          type="checkbox"
          checked={rippleOnClick}
          onChange={(e) => setRippleOnClick(e.target.checked)}
          className="toggle"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Cubes"
      description="Interactive 3D cubes grid with ripple effects and mouse interaction"
      preview={
        <CubesPreview
          gridSize={gridSize}
          maxAngle={maxAngle}
          radius={radius}
          faceColor={faceColor}
          rippleColor={rippleColor}
          rippleSpeed={rippleSpeed}
          autoAnimate={autoAnimate}
          rippleOnClick={rippleOnClick}
        />
      }
      code={codeExample}
      cssCode={cssCode}
      props={props}
      customization={customization}
      dependencies={['gsap']}
    />
  );
}
