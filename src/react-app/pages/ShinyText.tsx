import { useState } from 'react';
import ComponentDetail from './ComponentDetail';

const ShinyTextPreview = ({ 
  speed = 3,
  disabled = false
}: {
  speed?: number;
  disabled?: boolean;
}) => {
  return (
    <div className="text-center">
      <div
        className={`text-6xl font-bold text-[#b5b5b5a4] bg-clip-text inline-block ${!disabled ? 'animate-shine' : ''}`}
        style={{
          backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          animationDuration: `${speed}s`
        }}
      >
        Just some shiny text!
      </div>
      <style>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: -100%; }
        }
        .animate-shine {
          animation: shine 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

const codeExample = `import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = '' 
}) => {
  const animationDuration = \`\${speed}s\`;

  return (
    <div
      className={\`text-[#b5b5b5a4] bg-clip-text inline-block \${disabled ? '' : 'animate-shine'} \${className}\`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// Add to tailwind.config.js:
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
// };`;

const usageExample = `import ShinyText from './ShinyText';

<ShinyText 
  text="Just some shiny text!"
  disabled={false}
  speed={3}
  className='custom-class'
/>`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text content to display',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable the shine animation',
  },
  {
    name: 'speed',
    type: 'number',
    default: '5',
    description: 'Animation speed in seconds',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function ShinyText() {
  const [speed, setSpeed] = useState(3);
  const [disabled, setDisabled] = useState(false);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Animation Speed</label>
          <span className="text-sm text-purple-400 font-mono">{speed}s</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Disabled</label>
        <button
          onClick={() => setDisabled(!disabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            disabled ? 'bg-white/10' : 'bg-purple-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              disabled ? 'translate-x-1' : 'translate-x-6'
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Shiny Text"
      description="Text with an animated shine effect that sweeps across"
      preview={<ShinyTextPreview speed={speed} disabled={disabled} />}
      code={codeExample}
      usage={usageExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
