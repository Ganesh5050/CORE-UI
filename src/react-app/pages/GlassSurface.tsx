import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GlassSurface from '../components/effects/GlassSurface';

const GlassSurfacePage = () => {
  const [brightness, setBrightness] = useState(50);
  const [opacity, setOpacity] = useState(0.93);
  const [blur, setBlur] = useState(11);
  const [displace, setDisplace] = useState(0);
  const [distortionScale, setDistortionScale] = useState(-180);
  const [redOffset, setRedOffset] = useState(0);
  const [greenOffset, setGreenOffset] = useState(10);
  const [blueOffset, setBlueOffset] = useState(20);
  const [mixBlendMode, setMixBlendMode] = useState<any>('difference');

  const preview = (
    <div className="h-[500px] w-full relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center rounded-lg overflow-hidden flex items-center justify-center">
      <GlassSurface
        width={300}
        height={200}
        borderRadius={24}
        brightness={brightness}
        opacity={opacity}
        blur={blur}
        displace={displace}
        distortionScale={distortionScale}
        redOffset={redOffset}
        greenOffset={greenOffset}
        blueOffset={blueOffset}
        mixBlendMode={mixBlendMode}
      >
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Glass Surface</h2>
          <p className="text-sm opacity-80">Advanced SVG Distortion</p>
        </div>
      </GlassSurface>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Brightness ({brightness}%)</label>
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Opacity ({opacity})</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Blur ({blur}px)</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={blur}
            onChange={(e) => setBlur(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Displace ({displace})</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={displace}
            onChange={(e) => setDisplace(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Distortion Scale ({distortionScale})</label>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={distortionScale}
            onChange={(e) => setDistortionScale(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">RGB Offsets (R:{redOffset}, G:{greenOffset}, B:{blueOffset})</label>
          <div className="flex gap-2">
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={redOffset}
              onChange={(e) => setRedOffset(parseFloat(e.target.value))}
              className="w-full bg-red-900/50 rounded-lg appearance-none h-2 cursor-pointer"
            />
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={greenOffset}
              onChange={(e) => setGreenOffset(parseFloat(e.target.value))}
              className="w-full bg-green-900/50 rounded-lg appearance-none h-2 cursor-pointer"
            />
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={blueOffset}
              onChange={(e) => setBlueOffset(parseFloat(e.target.value))}
              className="w-full bg-blue-900/50 rounded-lg appearance-none h-2 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Mix Blend Mode</label>
          <select
            value={mixBlendMode}
            onChange={(e) => setMixBlendMode(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="normal">normal</option>
            <option value="multiply">multiply</option>
            <option value="screen">screen</option>
            <option value="overlay">overlay</option>
            <option value="darken">darken</option>
            <option value="lighten">lighten</option>
            <option value="color-dodge">color-dodge</option>
            <option value="color-burn">color-burn</option>
            <option value="hard-light">hard-light</option>
            <option value="soft-light">soft-light</option>
            <option value="difference">difference</option>
            <option value="exclusion">exclusion</option>
            <option value="hue">hue</option>
            <option value="saturation">saturation</option>
            <option value="color">color</option>
            <option value="luminosity">luminosity</option>
          </select>
        </div>
      </div>
    </div>
  );

  const usageCode = `import GlassSurface from './GlassSurface';

<GlassSurface
  width={300}
  height={200}
  borderRadius={24}
  brightness={${brightness}}
  opacity={${opacity}}
  blur={${blur}}
  displace={${displace}}
  distortionScale={${distortionScale}}
  redOffset={${redOffset}}
  greenOffset={${greenOffset}}
  blueOffset={${blueOffset}}
  mixBlendMode="${mixBlendMode}"
>
  <h2>Glass Content</h2>
</GlassSurface>`;

  const codeExample = `// Full component code available in the repository

import React, { useEffect, useRef, useState, useId } from 'react';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'width',
      type: 'number | string',
      default: '200',
      description: 'Width of the glass surface',
    },
    {
      name: 'height',
      type: 'number | string',
      default: '80',
      description: 'Height of the glass surface',
    },
    {
      name: 'brightness',
      type: 'number',
      default: '50',
      description: 'Brightness percentage',
    },
    {
      name: 'opacity',
      type: 'number',
      default: '0.93',
      description: 'Opacity of the glass',
    },
    {
      name: 'blur',
      type: 'number',
      default: '11',
      description: 'Blur amount in pixels',
    },
    {
      name: 'displace',
      type: 'number',
      default: '0',
      description: 'Displacement amount',
    },
    {
      name: 'distortionScale',
      type: 'number',
      default: '-180',
      description: 'Scale of the distortion effect',
    },
    {
      name: 'mixBlendMode',
      type: 'string',
      default: "'difference'",
      description: 'CSS mix-blend-mode property',
    },
  ];

  return (
    <ComponentDetail
      title="Glass Surface"
      description="A glass-like surface component with advanced SVG filter distortion and chromatic aberration effects."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
    />
  );
};

export default GlassSurfacePage;
