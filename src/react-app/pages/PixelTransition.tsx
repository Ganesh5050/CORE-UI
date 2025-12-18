import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import PixelTransitionComponent from '../components/effects/PixelTransition';
import Slider from '../components/Slider';

const PixelTransitionPreview = ({
  gridSize = 12,
  animationStepDuration = 0.4
}: {
  gridSize?: number;
  animationStepDuration?: number;
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelTransitionComponent
        firstContent={
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
            alt="A cute cat"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        secondContent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#111"
            }}
          >
            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
          </div>
        }
        gridSize={gridSize}
        pixelColor="#ffffff"
        once={false}
        animationStepDuration={animationStepDuration}
        className="custom-pixel-card"
      />
    </div>
  );
};

const codeExample = `import PixelTransition from './PixelTransition';

<PixelTransition
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor="#ffffff"
  once={false}
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>`;

const props = [
  {
    name: 'firstContent',
    type: 'ReactNode | string',
    default: '-',
    description: 'Initial content to display',
  },
  {
    name: 'secondContent',
    type: 'ReactNode | string',
    default: '-',
    description: 'Content to transition to',
  },
  {
    name: 'gridSize',
    type: 'number',
    default: '7',
    description: 'Number of pixels in the grid (gridSize x gridSize)',
  },
  {
    name: 'pixelColor',
    type: 'string',
    default: 'currentColor',
    description: 'Color of the transition pixels',
  },
  {
    name: 'animationStepDuration',
    type: 'number',
    default: '0.3',
    description: 'Duration of the transition animation in seconds',
  },
  {
    name: 'once',
    type: 'boolean',
    default: 'false',
    description: 'If true, transition only happens once',
  },
  {
    name: 'aspectRatio',
    type: 'string',
    default: '100%',
    description: 'Aspect ratio of the container',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function PixelTransition() {
  const [gridSize, setGridSize] = useState(12);
  const [animationStepDuration, setAnimationStepDuration] = useState(0.4);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Grid Size"
        value={gridSize}
        min={5}
        max={20}
        step={1}
        onChange={setGridSize}
      />

      <Slider
        label="Animation Duration"
        value={animationStepDuration}
        min={0.1}
        max={1}
        step={0.1}
        onChange={setAnimationStepDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Pixel Transition"
      description="Pixelated transition effect between two content states using GSAP - hover to see the effect"
      preview={<PixelTransitionPreview gridSize={gridSize} animationStepDuration={animationStepDuration} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['gsap']}
    />
  );
}
