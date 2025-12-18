import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GlitchTextComponent from '../components/text/GlitchText';
import Slider from '../components/Slider';

const GlitchTextPreview = ({
  speed = 1,
  enableShadows = true,
  enableOnHover = true
}: {
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
}) => {
  return (
    <div className="text-center flex items-center justify-center min-h-[200px]">
      <GlitchTextComponent
        speed={speed}
        enableShadows={enableShadows}
        enableOnHover={enableOnHover}
      >
        React Bits
      </GlitchTextComponent>
    </div>
  );
};

const installCode = `npx shadcn@latest add @react-bits/GlitchText-TS-TW`;

const usageCode = `import GlitchText from './GlitchText';

<GlitchText
  speed={1}
  enableShadows={true}
  enableOnHover={true}
  className='custom-class'
>
  React Bits
</GlitchText>`;

const codeExample = `import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': \`\${speed * 3}s\`,
    '--before-duration': \`\${speed * 2}s\`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
  };

  const baseClasses = 'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer';

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before';

  const combinedClasses = \`\${baseClasses} \${pseudoClasses} \${className}\`;

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  );
};

export default GlitchText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         glitch: {
//           "0%": { "clip-path": "inset(20% 0 50% 0)" },
//           "5%": { "clip-path": "inset(10% 0 60% 0)" },
//           "10%": { "clip-path": "inset(15% 0 55% 0)" },
//           "15%": { "clip-path": "inset(25% 0 35% 0)" },
//           "20%": { "clip-path": "inset(30% 0 40% 0)" },
//           "25%": { "clip-path": "inset(40% 0 20% 0)" },
//           "30%": { "clip-path": "inset(10% 0 60% 0)" },
//           "35%": { "clip-path": "inset(15% 0 55% 0)" },
//           "40%": { "clip-path": "inset(25% 0 35% 0)" },
//           "45%": { "clip-path": "inset(30% 0 40% 0)" },
//           "50%": { "clip-path": "inset(20% 0 50% 0)" },
//           "55%": { "clip-path": "inset(10% 0 60% 0)" },
//           "60%": { "clip-path": "inset(15% 0 55% 0)" },
//           "65%": { "clip-path": "inset(25% 0 35% 0)" },
//           "70%": { "clip-path": "inset(30% 0 40% 0)" },
//           "75%": { "clip-path": "inset(40% 0 20% 0)" },
//           "80%": { "clip-path": "inset(20% 0 50% 0)" },
//           "85%": { "clip-path": "inset(10% 0 60% 0)" },
//           "90%": { "clip-path": "inset(15% 0 55% 0)" },
//           "95%": { "clip-path": "inset(25% 0 35% 0)" },
//           "100%": { "clip-path": "inset(30% 0 40% 0)" },
//         },
//       },
//       animation: {
//         "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",
//         "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",
//       },
//     },
//   },
//   plugins: [],
// };`;

const props = [
  {
    name: 'children',
    type: 'string',
    default: '-',
    description: 'The text content to display',
  },
  {
    name: 'speed',
    type: 'number',
    default: '0.5',
    description: 'Animation speed multiplier',
  },
  {
    name: 'enableShadows',
    type: 'boolean',
    default: 'true',
    description: 'Enable colored shadows on glitch effect',
  },
  {
    name: 'enableOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Only show glitch effect on hover',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function GlitchText() {
  const [speed, setSpeed] = useState(1);
  const [enableShadows, setEnableShadows] = useState(true);
  const [enableOnHover, setEnableOnHover] = useState(true);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Speed"
        value={speed}
        min={0.5}
        max={3}
        step={0.5}
        onChange={setSpeed}
        unit="x"
        formatValue={(v) => v.toFixed(1)}
      />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Enable Shadows</label>
        <button
          onClick={() => setEnableShadows(!enableShadows)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${enableShadows ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {enableShadows ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Enable On Hover</label>
        <button
          onClick={() => setEnableOnHover(!enableOnHover)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${enableOnHover ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {enableOnHover ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Glitch Text"
      description="Text with animated glitch effect and color shadows"
      preview={<GlitchTextPreview speed={speed} enableShadows={enableShadows} enableOnHover={enableOnHover} />}
      installCode={installCode}
      usageCode={usageCode}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
