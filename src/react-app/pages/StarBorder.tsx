import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import StarBorderComponent from '../components/effects/StarBorder';
import Slider from '../components/Slider';

const StarBorderPreview = ({
  color = 'cyan',
  speed = '5s',
  thickness = 1
}: {
  color?: string;
  speed?: string;
  thickness?: number;
}) => {
  return (
    <div className="flex items-center justify-center p-16">
      <StarBorderComponent
        as="button"
        color={color}
        speed={speed}
        thickness={thickness}
        className="cursor-pointer hover:scale-105 transition-transform"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold mb-1">Star Border</h3>
          <p className="text-gray-400 text-sm">Animated glowing border effect</p>
        </div>
      </StarBorderComponent>
    </div>
  );
};

const codeExample = `import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={\`relative inline-block overflow-hidden rounded-[20px] \${className}\`}
      {...(rest as any)}
      style={{
        padding: \`\${thickness}px 0\`,
        ...(rest as any).style
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
          animationDuration: speed
        }}
      ></div>
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }`;

const props = [
  {
    name: 'as',
    type: 'React.ElementType',
    default: "'button'",
    description: 'The element type to render as (button, div, etc.)',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to display inside the border',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
  {
    name: 'color',
    type: 'string',
    default: "'white'",
    description: 'Color of the animated border glow',
  },
  {
    name: 'speed',
    type: 'string',
    default: "'6s'",
    description: 'Animation duration (CSS time value)',
  },
  {
    name: 'thickness',
    type: 'number',
    default: '1',
    description: 'Border thickness in pixels',
  },
];

export default function StarBorder() {
  const [color, setColor] = useState('cyan');
  const [speed, setSpeed] = useState(5);
  const [thickness, setThickness] = useState(1);

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Border Color</label>
        <div className="flex gap-2">
          {['cyan', 'magenta', 'yellow', 'lime', 'orange'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${color === c ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Slider
        label="Animation Speed"
        value={speed}
        min={1}
        max={10}
        step={1}
        onChange={setSpeed}
        unit="s"
      />

      <Slider
        label="Border Thickness"
        value={thickness}
        min={1}
        max={5}
        step={1}
        onChange={setThickness}
        unit="px"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Star Border"
      description="Animated glowing border effect with radial gradient movement"
      preview={<StarBorderPreview color={color} speed={`${speed}s`} thickness={thickness} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
