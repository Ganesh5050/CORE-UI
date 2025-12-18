import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import MagicBento from '../components/effects/MagicBento';

const MagicBentoPage = () => {
  const [glowColor, setGlowColor] = useState('132, 0, 255');
  const [spotlightRadius, setSpotlightRadius] = useState(300);
  const [particleCount, setParticleCount] = useState(12);
  const [enableTilt, setEnableTilt] = useState(true);
  const [enableStars, setEnableStars] = useState(true);
  const [enableSpotlight, setEnableSpotlight] = useState(true);
  const [enableBorderGlow, setEnableBorderGlow] = useState(true);
  const [enableMagnetism, setEnableMagnetism] = useState(true);

  // Helper to convert hex to rgb string for the component
  const handleColorChange = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setGlowColor(`${r}, ${g}, ${b}`);
  };

  // Helper to convert rgb string back to hex for input
  const getHexColor = (rgbStr: string) => {
    const [r, g, b] = rgbStr.split(',').map(n => parseInt(n.trim()));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const preview = (
    <div className="min-h-[600px] w-full relative bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
      <MagicBento
        glowColor={glowColor}
        spotlightRadius={spotlightRadius}
        particleCount={particleCount}
        enableTilt={enableTilt}
        enableStars={enableStars}
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        enableMagnetism={enableMagnetism}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Glow Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={getHexColor(glowColor)}
              onChange={(e) => handleColorChange(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{glowColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Spotlight Radius ({spotlightRadius}px)</label>
          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={spotlightRadius}
            onChange={(e) => setSpotlightRadius(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Particle Count ({particleCount})</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={particleCount}
            onChange={(e) => setParticleCount(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Tilt</label>
          <input
            type="checkbox"
            checked={enableTilt}
            onChange={(e) => setEnableTilt(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Stars</label>
          <input
            type="checkbox"
            checked={enableStars}
            onChange={(e) => setEnableStars(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Spotlight</label>
          <input
            type="checkbox"
            checked={enableSpotlight}
            onChange={(e) => setEnableSpotlight(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Border Glow</label>
          <input
            type="checkbox"
            checked={enableBorderGlow}
            onChange={(e) => setEnableBorderGlow(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Enable Magnetism</label>
          <input
            type="checkbox"
            checked={enableMagnetism}
            onChange={(e) => setEnableMagnetism(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import MagicBento from './MagicBento';

<MagicBento
  glowColor="${glowColor}"
  spotlightRadius={${spotlightRadius}}
  particleCount={${particleCount}}
  enableTilt={${enableTilt}}
  enableStars={${enableStars}}
  enableSpotlight={${enableSpotlight}}
  enableBorderGlow={${enableBorderGlow}}
  enableMagnetism={${enableMagnetism}}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: gsap

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'glowColor',
      type: 'string',
      default: "'132, 0, 255'",
      description: 'RGB color string for the glow effect',
    },
    {
      name: 'spotlightRadius',
      type: 'number',
      default: '300',
      description: 'Radius of the spotlight effect',
    },
    {
      name: 'particleCount',
      type: 'number',
      default: '12',
      description: 'Number of particles per card',
    },
    {
      name: 'enableTilt',
      type: 'boolean',
      default: 'true',
      description: 'Enable 3D tilt effect on hover',
    },
    {
      name: 'enableStars',
      type: 'boolean',
      default: 'true',
      description: 'Enable particle stars effect',
    },
    {
      name: 'enableSpotlight',
      type: 'boolean',
      default: 'true',
      description: 'Enable global spotlight effect',
    },
    {
      name: 'enableBorderGlow',
      type: 'boolean',
      default: 'true',
      description: 'Enable border glow effect',
    },
    {
      name: 'enableMagnetism',
      type: 'boolean',
      default: 'true',
      description: 'Enable magnetic effect on hover',
    },
  ];

  return (
    <ComponentDetail
      title="Magic Bento"
      description="A bento grid layout with interactive hover effects, particles, and spotlight."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap']}
    />
  );
};

export default MagicBentoPage;
