import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import StaggeredMenu from '../components/effects/StaggeredMenu';

const StaggeredMenuPage = () => {
  const [position, setPosition] = useState<'left' | 'right'>('right');
  const [displaySocials, setDisplaySocials] = useState(true);
  const [displayItemNumbering, setDisplayItemNumbering] = useState(true);
  const [menuButtonColor, setMenuButtonColor] = useState('#ffffff');
  const [openMenuButtonColor, setOpenMenuButtonColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#5227FF');
  const [changeMenuColorOnOpen, setChangeMenuColorOnOpen] = useState(true);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#' },
    { label: 'Services', ariaLabel: 'View our services', link: '#' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#' }
  ];

  const socialItems = [
    { label: 'Twitter', link: '#' },
    { label: 'GitHub', link: '#' },
    { label: 'LinkedIn', link: '#' }
  ];

  const preview = (
    <div className="h-[600px] w-full relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-white/10">CONTENT</h1>
      </div>
      <StaggeredMenu
        position={position}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={displaySocials}
        displayItemNumbering={displayItemNumbering}
        menuButtonColor={menuButtonColor}
        openMenuButtonColor={openMenuButtonColor}
        changeMenuColorOnOpen={changeMenuColorOnOpen}
        colors={['#B19EEF', '#5227FF']}
        accentColor={accentColor}
        isFixed={false}
        closeOnClickAway={true}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as 'left' | 'right')}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Accent Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{accentColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Menu Button Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={menuButtonColor}
              onChange={(e) => setMenuButtonColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{menuButtonColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Open Button Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={openMenuButtonColor}
              onChange={(e) => setOpenMenuButtonColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{openMenuButtonColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Display Socials</label>
          <input
            type="checkbox"
            checked={displaySocials}
            onChange={(e) => setDisplaySocials(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Display Numbering</label>
          <input
            type="checkbox"
            checked={displayItemNumbering}
            onChange={(e) => setDisplayItemNumbering(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Change Color on Open</label>
          <input
            type="checkbox"
            checked={changeMenuColorOnOpen}
            onChange={(e) => setChangeMenuColorOnOpen(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import StaggeredMenu from './StaggeredMenu';

<StaggeredMenu
  position="${position}"
  displaySocials={${displaySocials}}
  displayItemNumbering={${displayItemNumbering}}
  menuButtonColor="${menuButtonColor}"
  openMenuButtonColor="${openMenuButtonColor}"
  changeMenuColorOnOpen={${changeMenuColorOnOpen}}
  accentColor="${accentColor}"
  items={[
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    // ...
  ]}
  socialItems={[
    { label: 'Twitter', link: '#' },
    // ...
  ]}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: gsap

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'position',
      type: "'left' | 'right'",
      default: "'right'",
      description: 'Position of the menu panel',
    },
    {
      name: 'items',
      type: 'StaggeredMenuItem[]',
      default: '[]',
      description: 'Array of menu items',
    },
    {
      name: 'socialItems',
      type: 'StaggeredMenuSocialItem[]',
      default: '[]',
      description: 'Array of social links',
    },
    {
      name: 'displaySocials',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show social links',
    },
    {
      name: 'displayItemNumbering',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show numbers next to menu items',
    },
    {
      name: 'menuButtonColor',
      type: 'string',
      default: "'#fff'",
      description: 'Color of the menu button when closed',
    },
    {
      name: 'openMenuButtonColor',
      type: 'string',
      default: "'#fff'",
      description: 'Color of the menu button when open',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: "'#5227FF'",
      description: 'Accent color for hover states and numbering',
    },
    {
      name: 'changeMenuColorOnOpen',
      type: 'boolean',
      default: 'true',
      description: 'Whether to change the button color when opening',
    },
  ];

  return (
    <ComponentDetail
      title="Staggered Menu"
      description="A full-screen menu with staggered reveal animations for items and social links."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap']}
    />
  );
};

export default StaggeredMenuPage;