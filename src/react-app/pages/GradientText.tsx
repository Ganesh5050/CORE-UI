import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GradientTextComponent from '../components/text/GradientText';

const GradientTextPreview = ({
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 3,
  showBorder = false
}: {
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}) => {
  return (
    <div className="text-center flex items-center justify-center min-h-[200px]">
      <GradientTextComponent
        colors={colors}
        animationSpeed={animationSpeed}
        showBorder={showBorder}
        className="text-6xl font-bold px-6 py-3"
      >
        Add a splash of color!
      </GradientTextComponent>
    </div>
  );
};

const installCode = `npx shadcn@latest add @react-bits/GradientText-TS-TW`;

const usageCode = `import GradientText from './GradientText'

// For a smoother animation, the gradient should start and end with the same color

<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`;

const codeExample = `import React, { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,
    animationDuration: \`\${animationSpeed}s\`
  };

  return (
    <div
      className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${className}\`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: '300% 100%'
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '300% 100%'
        }}
      >
        {children}
      </div>
    </div>
  );
}

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradient 8s linear infinite'
//       },
//     },
//   },
//   plugins: [],
// };`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'The text content to display',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
  {
    name: 'colors',
    type: 'string[]',
    default: "['#ffaa40', '#9c40ff', '#ffaa40']",
    description: 'Array of color values for the gradient',
  },
  {
    name: 'animationSpeed',
    type: 'number',
    default: '8',
    description: 'Animation duration in seconds',
  },
  {
    name: 'showBorder',
    type: 'boolean',
    default: 'false',
    description: 'Show animated gradient border',
  },
];

export default function GradientText() {
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [showBorder, setShowBorder] = useState(false);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Animation Speed</label>
          <span className="text-sm text-purple-400 font-mono">{animationSpeed}s</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Show Border</label>
        <button
          onClick={() => setShowBorder(!showBorder)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showBorder ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {showBorder ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Gradient Text"
      description="Animated gradient text with smooth color transitions"
      preview={<GradientTextPreview animationSpeed={animationSpeed} showBorder={showBorder} />}
      installCode={installCode}
      usageCode={usageCode}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
