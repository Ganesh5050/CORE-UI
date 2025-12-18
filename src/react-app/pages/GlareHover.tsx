import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GlareHoverComponent from '../components/effects/GlareHover';
import Slider from '../components/Slider';

const GlareHoverPreview = ({
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800
}: {
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
}) => {
  return (
    <div className="flex items-center justify-center p-8" style={{ minHeight: '400px' }}>
      <GlareHoverComponent
        width="400px"
        height="300px"
        background="#000"
        borderRadius="16px"
        borderColor="#333"
        glareColor="#ffffff"
        glareOpacity={glareOpacity}
        glareAngle={glareAngle}
        glareSize={glareSize}
        transitionDuration={transitionDuration}
        playOnce={false}
      >
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', margin: 0 }}>
          Hover Me
        </h2>
      </GlareHoverComponent>
    </div>
  );
};

const codeExample = `import React, { useRef } from 'react';

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {}
}) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;
  }

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    el.style.transition = \`\${transitionDuration}ms ease\`;
    el.style.backgroundPosition = '100% 100%, 0 0';
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = \`\${transitionDuration}ms ease\`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: \`linear-gradient(\${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        \${rgba} 70%,
        hsla(0,0%,0%,0) 100%)\`,
    backgroundSize: \`\${glareSize}% \${glareSize}%, 100% 100%\`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none'
  };

  return (
    <div
      className={\`relative grid place-items-center overflow-hidden border cursor-pointer \${className}\`}
      style={{
        width,
        height,
        background,
        borderRadius,
        borderColor,
        ...style
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to display inside the component',
  },
  {
    name: 'width',
    type: 'string',
    default: '500px',
    description: 'Width of the container',
  },
  {
    name: 'height',
    type: 'string',
    default: '500px',
    description: 'Height of the container',
  },
  {
    name: 'background',
    type: 'string',
    default: '#000',
    description: 'Background color',
  },
  {
    name: 'borderRadius',
    type: 'string',
    default: '10px',
    description: 'Border radius',
  },
  {
    name: 'glareColor',
    type: 'string',
    default: '#ffffff',
    description: 'Color of the glare effect',
  },
  {
    name: 'glareOpacity',
    type: 'number',
    default: '0.5',
    description: 'Opacity of the glare (0-1)',
  },
  {
    name: 'glareAngle',
    type: 'number',
    default: '-45',
    description: 'Angle of the glare gradient in degrees',
  },
  {
    name: 'glareSize',
    type: 'number',
    default: '250',
    description: 'Size of the glare effect in percentage',
  },
  {
    name: 'transitionDuration',
    type: 'number',
    default: '650',
    description: 'Duration of the animation in milliseconds',
  },
  {
    name: 'playOnce',
    type: 'boolean',
    default: 'false',
    description: 'If true, animation only plays once',
  },
];

export default function GlareHover() {
  const [glareOpacity, setGlareOpacity] = useState(0.3);
  const [glareAngle, setGlareAngle] = useState(-30);
  const [glareSize, setGlareSize] = useState(300);
  const [transitionDuration, setTransitionDuration] = useState(800);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Glare Opacity"
        value={glareOpacity}
        min={0}
        max={1}
        step={0.1}
        onChange={setGlareOpacity}
        formatValue={(v) => v.toFixed(1)}
      />

      <Slider
        label="Glare Angle"
        value={glareAngle}
        min={-180}
        max={180}
        step={15}
        onChange={setGlareAngle}
        unit="°"
      />

      <Slider
        label="Glare Size"
        value={glareSize}
        min={100}
        max={500}
        step={50}
        onChange={setGlareSize}
        unit="%"
      />

      <Slider
        label="Transition Duration"
        value={transitionDuration}
        min={200}
        max={2000}
        step={100}
        onChange={setTransitionDuration}
        unit="ms"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Glare Hover"
      description="Animated glare effect that sweeps across content on hover"
      preview={<GlareHoverPreview glareOpacity={glareOpacity} glareAngle={glareAngle} glareSize={glareSize} transitionDuration={transitionDuration} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
