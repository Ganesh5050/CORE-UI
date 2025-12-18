import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Ribbons from '../components/effects/Ribbons';

const RibbonsPage = () => {
  const [baseThickness, setBaseThickness] = useState(30);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.6);
  const [maxAge, setMaxAge] = useState(500);
  const [enableFade, setEnableFade] = useState(false);
  const [enableShaderEffect, setEnableShaderEffect] = useState(true);

  const preview = (
    <div className="h-[500px] w-full bg-black relative overflow-hidden rounded-lg border border-gray-800">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-4xl font-bold text-white tracking-wider opacity-50">
          MOVE MOUSE
        </h1>
      </div>
      <Ribbons
        baseThickness={baseThickness}
        colors={['#ff9346', '#7cff67', '#ffee51', '#5227FF', '#ff00ff']}
        speedMultiplier={speedMultiplier}
        maxAge={maxAge}
        enableFade={enableFade}
        enableShaderEffect={enableShaderEffect}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Thickness ({baseThickness})</label>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={baseThickness}
            onChange={(e) => setBaseThickness(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Speed Multiplier ({speedMultiplier})</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Max Age ({maxAge})</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="10"
            value={maxAge}
            onChange={(e) => setMaxAge(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Fade</label>
          <input
            type="checkbox"
            checked={enableFade}
            onChange={(e) => setEnableFade(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Shader Effect</label>
          <input
            type="checkbox"
            checked={enableShaderEffect}
            onChange={(e) => setEnableShaderEffect(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const codeExample = `import Ribbons from './Ribbons';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <Ribbons
    baseThickness={${baseThickness}}
    colors={['#ff9346', '#7cff67', '#ffee51', '#5227FF', '#ff00ff']}
    speedMultiplier={${speedMultiplier}}
    maxAge={${maxAge}}
    enableFade={${enableFade}}
    enableShaderEffect={${enableShaderEffect}}
  />
</div>`;

  const props = [
    {
      name: 'colors',
      type: 'string[]',
      default: "['#ff9346', '#7cff67', '#ffee51', '#5227FF']",
      description: 'Array of hex colors for the ribbons',
    },
    {
      name: 'baseThickness',
      type: 'number',
      default: '30',
      description: 'Base thickness of the ribbons',
    },
    {
      name: 'baseSpring',
      type: 'number',
      default: '0.03',
      description: 'Spring strength for movement',
    },
    {
      name: 'baseFriction',
      type: 'number',
      default: '0.9',
      description: 'Friction for movement',
    },
    {
      name: 'maxAge',
      type: 'number',
      default: '500',
      description: 'Maximum age of ribbon segments',
    },
    {
      name: 'pointCount',
      type: 'number',
      default: '50',
      description: 'Number of points in each ribbon',
    },
    {
      name: 'speedMultiplier',
      type: 'number',
      default: '0.6',
      description: 'Speed multiplier for the animation',
    },
    {
      name: 'enableFade',
      type: 'boolean',
      default: 'false',
      description: 'Whether to fade the ribbons at the end',
    },
    {
      name: 'enableShaderEffect',
      type: 'boolean',
      default: 'false',
      description: 'Enable custom shader wave effect',
    },
    {
      name: 'effectAmplitude',
      type: 'number',
      default: '2',
      description: 'Amplitude of the shader wave effect',
    },
    {
      name: 'backgroundColor',
      type: 'number[]',
      default: '[0, 0, 0, 0]',
      description: 'Background color (RGBA)',
    },
  ];

  return (
    <ComponentDetail
      title="Ribbons"
      description="Interactive flowing ribbons that follow the mouse cursor, built with OGL."
      preview={preview}
      customization={customization}
      code={codeExample}
      props={props}
      dependencies={['ogl']}
    />
  );
};

export default RibbonsPage;
