import { useState } from 'react';
import ComponentDetail from './ComponentDetail';

const CurvedLoopPreview = ({ 
  duration = 10
}: {
  duration?: number;
}) => {
  const text = "Hello, you! • Hello, you! • Hello, you! • ";
  
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg 
        viewBox="0 0 500 150" 
        className="w-full max-w-3xl"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <path
            id="curvedPath"
            d="M 50,100 Q 125,30 250,100 T 450,100"
            fill="none"
            stroke="transparent"
          />
        </defs>
        <text 
          className="fill-white font-semibold tracking-wide" 
          style={{ fontSize: '24px', letterSpacing: '0.05em' }}
        >
          <textPath href="#curvedPath" startOffset="0%">
            <animate
              attributeName="startOffset"
              from="0%"
              to="100%"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

const codeExample = `export default function CurvedLoop({ 
  text,
  duration = 10
}: {
  text: string;
  duration?: number;
}) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg 
        viewBox="0 0 500 150" 
        className="w-full max-w-3xl"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <path
            id="curvedPath"
            d="M 50,100 Q 125,30 250,100 T 450,100"
            fill="none"
            stroke="transparent"
          />
        </defs>
        <text 
          className="fill-white font-semibold tracking-wide" 
          style={{ fontSize: '24px', letterSpacing: '0.05em' }}
        >
          <textPath href="#curvedPath" startOffset="0%">
            <animate
              attributeName="startOffset"
              from="0%"
              to="100%"
              dur={\`\${duration}s\`}
              repeatCount="indefinite"
            />
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text to loop along the curve',
  },
  {
    name: 'duration',
    type: 'number',
    default: '10',
    description: 'Duration of one loop cycle in seconds',
  },
];

export default function CurvedLoop() {
  const [duration, setDuration] = useState(10);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Animation Duration</label>
          <span className="text-sm text-purple-400 font-mono">{duration}s</span>
        </div>
        <input
          type="range"
          min="5"
          max="20"
          step="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Curved Loop"
      description="Text that flows along a curved path in an infinite loop"
      preview={<CurvedLoopPreview duration={duration} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
