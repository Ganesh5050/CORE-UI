import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import PillNav from '../components/effects/PillNav';

const PillNavPage = () => {
  const [baseColor, setBaseColor] = useState('#000000');
  const [pillColor, setPillColor] = useState('#ffffff');
  const [hoveredPillTextColor, setHoveredPillTextColor] = useState('#ffffff');
  const [pillTextColor, setPillTextColor] = useState('#000000');
  const [ease, setEase] = useState('power3.easeOut');
  const [initialLoadAnimation, setInitialLoadAnimation] = useState(true);
  const [key, setKey] = useState(0); // To force re-render for animation replay

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  const logo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';

  const preview = (
    <div className="h-[400px] w-full relative bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center justify-start pt-10">
      <PillNav
        key={key}
        logo={logo}
        logoAlt="React Logo"
        items={[
          { label: 'Home', href: '#' },
          { label: 'About', href: '#' },
          { label: 'Services', href: '#' },
          { label: 'Contact', href: '#' }
        ]}
        activeHref="#"
        baseColor={baseColor}
        pillColor={pillColor}
        hoveredPillTextColor={hoveredPillTextColor}
        pillTextColor={pillTextColor}
        ease={ease}
        initialLoadAnimation={initialLoadAnimation}
      />

      <div className="mt-20 text-center text-gray-500">
        <p>Hover over the navigation items to see the effect.</p>
        <p className="text-sm mt-2">Resize window to see mobile menu.</p>
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Base Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{baseColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Pill Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={pillColor}
              onChange={(e) => setPillColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{pillColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Pill Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={pillTextColor}
              onChange={(e) => setPillTextColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{pillTextColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hovered Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={hoveredPillTextColor}
              onChange={(e) => setHoveredPillTextColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{hoveredPillTextColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Easing</label>
          <select
            value={ease}
            onChange={(e) => setEase(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="power1.out">power1.out</option>
            <option value="power2.out">power2.out</option>
            <option value="power3.out">power3.out</option>
            <option value="power4.out">power4.out</option>
            <option value="back.out(1.7)">back.out</option>
            <option value="elastic.out(1, 0.3)">elastic.out</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Initial Load Animation</label>
          <input
            type="checkbox"
            checked={initialLoadAnimation}
            onChange={(e) => {
              setInitialLoadAnimation(e.target.checked);
              handleReplay();
            }}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <button
          onClick={handleReplay}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          Replay Animation
        </button>
      </div>
    </div>
  );

  const usageCode = `import PillNav from './PillNav';
import logo from '/path/to/logo.svg';

<PillNav
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="${ease}"
  baseColor="${baseColor}"
  pillColor="${pillColor}"
  hoveredPillTextColor="${hoveredPillTextColor}"
  pillTextColor="${pillTextColor}"
  initialLoadAnimation={${initialLoadAnimation}}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: gsap, react-router (or react-router-dom)

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'logo',
      type: 'string',
      default: '-',
      description: 'URL or path to the logo image',
    },
    {
      name: 'items',
      type: 'PillNavItem[]',
      default: '[]',
      description: 'Array of navigation items',
    },
    {
      name: 'activeHref',
      type: 'string',
      default: 'undefined',
      description: 'Currently active link href',
    },
    {
      name: 'baseColor',
      type: 'string',
      default: "'#fff'",
      description: 'Background color of the nav bar',
    },
    {
      name: 'pillColor',
      type: 'string',
      default: "'#060010'",
      description: 'Background color of the pills',
    },
    {
      name: 'hoveredPillTextColor',
      type: 'string',
      default: "'#060010'",
      description: 'Text color of the pill on hover',
    },
    {
      name: 'pillTextColor',
      type: 'string',
      default: 'undefined',
      description: 'Text color of the pills (defaults to baseColor)',
    },
  ];

  return (
    <ComponentDetail
      title="Pill Nav"
      description="A navigation bar with pill-shaped links and smooth GSAP hover animations."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap', 'react-router']}
    />
  );
};

export default PillNavPage;
