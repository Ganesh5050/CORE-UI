import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import MagnetLinesComponent from '../components/effects/MagnetLines';
import Slider from '../components/Slider';

const MagnetLinesPreview = ({
  rows = 9,
  columns = 9,
  containerSize = 60,
  lineWidth = 0.8,
  lineHeight = 5,
  baseAngle = 0
}: {
  rows?: number;
  columns?: number;
  containerSize?: number;
  lineWidth?: number;
  lineHeight?: number;
  baseAngle?: number;
}) => {
  return (
    <div className="min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <MagnetLinesComponent
        rows={rows}
        columns={columns}
        containerSize={`${containerSize}vmin`}
        lineColor="tomato"
        lineWidth={`${lineWidth}vmin`}
        lineHeight={`${lineHeight}vmin`}
        baseAngle={baseAngle}
      />
    </div>
  );
};

const usageCode = `import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`;

const codeExample = `import React, { useRef, useEffect, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', \`\${r}deg\`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        //@ts-ignore
        '--rotate': \`\${baseAngle}deg\`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform'
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`grid place-items-center \${className}\`}
      style={{
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;`;

const props = [
  {
    name: 'rows',
    type: 'number',
    default: '9',
    description: 'Number of rows in the grid',
  },
  {
    name: 'columns',
    type: 'number',
    default: '9',
    description: 'Number of columns in the grid',
  },
  {
    name: 'containerSize',
    type: 'string',
    default: '80vmin',
    description: 'Size of the container (CSS units)',
  },
  {
    name: 'lineColor',
    type: 'string',
    default: '#efefef',
    description: 'Color of the lines',
  },
  {
    name: 'lineWidth',
    type: 'string',
    default: '1vmin',
    description: 'Width of each line',
  },
  {
    name: 'lineHeight',
    type: 'string',
    default: '6vmin',
    description: 'Height of each line',
  },
  {
    name: 'baseAngle',
    type: 'number',
    default: '-10',
    description: 'Initial rotation angle in degrees',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Inline styles',
  },
];

export default function MagnetLines() {
  const [rows, setRows] = useState(9);
  const [columns, setColumns] = useState(9);
  const [containerSize, setContainerSize] = useState(60);
  const [lineWidth, setLineWidth] = useState(0.8);
  const [lineHeight, setLineHeight] = useState(5);
  const [baseAngle, setBaseAngle] = useState(0);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Rows"
        value={rows}
        onChange={setRows}
        min={3}
        max={15}
        step={1}
      />
      <Slider
        label="Columns"
        value={columns}
        onChange={setColumns}
        min={3}
        max={15}
        step={1}
      />
      <Slider
        label="Container Size"
        value={containerSize}
        onChange={setContainerSize}
        min={30}
        max={90}
        step={5}
        unit="vmin"
      />
      <Slider
        label="Line Width"
        value={lineWidth}
        onChange={setLineWidth}
        min={0.2}
        max={2}
        step={0.1}
        unit="vmin"
      />
      <Slider
        label="Line Height"
        value={lineHeight}
        onChange={setLineHeight}
        min={2}
        max={10}
        step={0.5}
        unit="vmin"
      />
      <Slider
        label="Base Angle"
        value={baseAngle}
        onChange={setBaseAngle}
        min={-90}
        max={90}
        step={5}
        unit="°"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Magnet Lines"
      description="Grid of lines that rotate to point toward the cursor position with magnetic effect"
      preview={
        <MagnetLinesPreview
          rows={rows}
          columns={columns}
          containerSize={containerSize}
          lineWidth={lineWidth}
          lineHeight={lineHeight}
          baseAngle={baseAngle}
        />
      }
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
