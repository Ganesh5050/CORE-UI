import { useState } from 'react';
import ComponentDetail from './ComponentDetail';

const LiquidEtherPreview = ({
  intensity = 0.3
}: {
  intensity?: number;
}) => {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500" 
        style={{ opacity: intensity }}
      ></div>
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 animate-pulse" 
        style={{ opacity: intensity * 0.67 }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-3xl font-bold">Liquid Ether</h3>
      </div>
    </div>
  );
};

const codeExample = `export default function LiquidEther({ 
  children,
  intensity = 0.3
}: {
  children?: React.ReactNode;
  intensity?: number;
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500" 
        style={{ opacity: intensity }}
      ></div>
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 animate-pulse" 
        style={{ opacity: intensity * 0.67 }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to display over the background',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '0.3',
    description: 'Opacity intensity of the gradient layers (0-1)',
  },
];

export default function LiquidEther() {
  const [intensity, setIntensity] = useState(0.3);

  const customization = (
    <div className="space-y-6">
      {/* Intensity */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Intensity</label>
          <span className="text-sm text-purple-400 font-mono">{intensity.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.6"
          step="0.05"
          value={intensity}
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Liquid Ether"
      description="Create mesmerizing liquid gradient backgrounds with blur effects"
      preview={<LiquidEtherPreview intensity={intensity} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
