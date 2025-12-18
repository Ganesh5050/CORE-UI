import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GooeyNav from '../components/effects/GooeyNav';

const GooeyNavPage = () => {
  const [particleCount, setParticleCount] = useState(15);
  const [particleR, setParticleR] = useState(100);
  const [animationTime, setAnimationTime] = useState(600);
  const [timeVariance, setTimeVariance] = useState(300);
  const [distanceMin, setDistanceMin] = useState(90);
  const [distanceMax, setDistanceMax] = useState(10);

  const items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const preview = (
    <div className="h-[400px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <GooeyNav
        items={items}
        particleCount={particleCount}
        particleDistances={[distanceMin, distanceMax]}
        particleR={particleR}
        animationTime={animationTime}
        timeVariance={timeVariance}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Particle Count ({particleCount})</label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Particle Radius ({particleR}px)</label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={particleR}
            onChange={(e) => setParticleR(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Animation Time ({animationTime}ms)</label>
          <input
            type="range"
            min="300"
            max="1500"
            step="50"
            value={animationTime}
            onChange={(e) => setAnimationTime(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Time Variance ({timeVariance}ms)</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={timeVariance}
            onChange={(e) => setTimeVariance(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Distance Start ({distanceMin}px)</label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={distanceMin}
            onChange={(e) => setDistanceMin(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Distance End ({distanceMax}px)</label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={distanceMax}
            onChange={(e) => setDistanceMax(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import GooeyNav from './GooeyNav';

const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

<GooeyNav
  items={items}
  particleCount={${particleCount}}
  particleDistances={[${distanceMin}, ${distanceMax}]}
  particleR={${particleR}}
  animationTime={${animationTime}}
  timeVariance={${timeVariance}}
  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: React

import React, { useRef, useEffect, useState } from 'react';

interface GooeyNavItem {
  label: string;
  href: string;
}

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'items',
      type: 'GooeyNavItem[]',
      default: '[]',
      description: 'Array of navigation items',
    },
    {
      name: 'particleCount',
      type: 'number',
      default: '15',
      description: 'Number of particles in the effect',
    },
    {
      name: 'particleDistances',
      type: '[number, number]',
      default: '[90, 10]',
      description: 'Start and end distances for particles',
    },
    {
      name: 'particleR',
      type: 'number',
      default: '100',
      description: 'Radius of particle dispersion',
    },
    {
      name: 'animationTime',
      type: 'number',
      default: '600',
      description: 'Duration of the animation in ms',
    },
    {
      name: 'timeVariance',
      type: 'number',
      default: '300',
      description: 'Variance in animation time for randomness',
    },
    {
      name: 'colors',
      type: 'number[]',
      default: '[1, 2, 3, 1, 2, 3, 1, 4]',
      description: 'Array of color indices for particles',
    },
  ];

  return (
    <ComponentDetail
      title="Gooey Nav"
      description="A navigation menu with a gooey particle effect on click, using CSS filters and animations."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={[]}
    />
  );
};

export default GooeyNavPage;