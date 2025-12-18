import { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';

const TextPressurePreview = ({ 
  pressureScale = 1.5,
  maxWeight = 900
}: {
  pressureScale?: number;
  maxWeight?: number;
}) => {
  const text = "Hello, you!";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="text-center">
      <h2 className="text-6xl font-bold flex justify-center">
        {text.split('').map((char, i) => {
          const isHovered = hoveredIndex === i;
          
          return (
            <motion.span
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: isHovered ? pressureScale : 1,
                fontVariationSettings: isHovered ? `"wght" ${maxWeight}` : `"wght" 700`,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 20 
              }}
              className="inline-block cursor-pointer select-none"
              style={{
                fontVariationSettings: '"wght" 700',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </h2>
      <p className="text-sm text-gray-400 mt-4">Hover over letters</p>
    </div>
  );
};

const codeExample = `import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TextPressure({ 
  text,
  pressureScale = 1.5,
  maxWeight = 900
}: {
  text: string;
  pressureScale?: number;
  maxWeight?: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <h2 className="text-6xl font-bold flex justify-center">
      {text.split('').map((char, i) => {
        const isHovered = hoveredIndex === i;
        
        return (
          <motion.span
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: isHovered ? pressureScale : 1,
              fontVariationSettings: isHovered ? \`"wght" \${maxWeight}\` : '"wght" 700',
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 20 
            }}
            className="inline-block cursor-pointer select-none"
            style={{
              fontVariationSettings: '"wght" 700',
            }}
          >
            {char === ' ' ? '\\u00A0' : char}
          </motion.span>
        );
      })}
    </h2>
  );
}`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text content to display',
  },
  {
    name: 'pressureScale',
    type: 'number',
    default: '1.5',
    description: 'Scale multiplier on hover',
  },
  {
    name: 'maxWeight',
    type: 'number',
    default: '900',
    description: 'Maximum font weight on hover',
  },
];

export default function TextPressure() {
  const [pressureScale, setPressureScale] = useState(1.5);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Pressure Scale</label>
          <span className="text-sm text-purple-400 font-mono">{pressureScale.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="1.2"
          max="2.5"
          step="0.1"
          value={pressureScale}
          onChange={(e) => setPressureScale(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Text Pressure"
      description="Interactive text that responds to hover with pressure-like scaling"
      preview={<TextPressurePreview pressureScale={pressureScale} />}
      code={codeExample}
      props={props}
      customization={customization}
    />
  );
}
