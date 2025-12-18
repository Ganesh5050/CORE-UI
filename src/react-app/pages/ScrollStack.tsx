import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ScrollStack, { ScrollStackItem } from '../components/effects/ScrollStack';

const ScrollStackPage = () => {
  const [itemDistance, setItemDistance] = useState(80);
  const [itemScale, setItemScale] = useState(0.05);
  const [itemStackDistance, setItemStackDistance] = useState(20);
  const [stackPosition, setStackPosition] = useState('20%');
  const [scaleEndPosition, setScaleEndPosition] = useState('10%');
  const [baseScale, setBaseScale] = useState(0.85);
  const [scaleDuration, setScaleDuration] = useState(0.5);
  const [rotationAmount, setRotationAmount] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  const preview = (
    <div className="h-[600px] w-full relative bg-black rounded-lg overflow-hidden border border-gray-800">
      <ScrollStack
        key={key}
        itemDistance={itemDistance}
        itemScale={itemScale}
        itemStackDistance={itemStackDistance}
        stackPosition={stackPosition}
        scaleEndPosition={scaleEndPosition}
        baseScale={baseScale}
        scaleDuration={scaleDuration}
        rotationAmount={rotationAmount}
        blurAmount={blurAmount}
      >
        <ScrollStackItem>
          <div className="w-full h-full bg-[#111] rounded-[30px] border border-[#222] flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white">01</span>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">Real-time data processing and visualization.</p>
            </div>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className="w-full h-full bg-[#111] rounded-[30px] border border-[#222] flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white">02</span>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Design</h3>
              <p className="text-gray-400">Crafting beautiful and intuitive user interfaces.</p>
            </div>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className="w-full h-full bg-[#111] rounded-[30px] border border-[#222] flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white">03</span>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Development</h3>
              <p className="text-gray-400">Building robust and scalable applications.</p>
            </div>
          </div>
        </ScrollStackItem>
        <ScrollStackItem>
          <div className="w-full h-full bg-[#111] rounded-[30px] border border-[#222] flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white">04</span>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Deployment</h3>
              <p className="text-gray-400">Seamless integration and continuous delivery.</p>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Item Distance ({itemDistance}px)</label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={itemDistance}
            onChange={(e) => setItemDistance(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Item Scale ({itemScale})</label>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.01"
            value={itemScale}
            onChange={(e) => setItemScale(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stack Distance ({itemStackDistance}px)</label>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={itemStackDistance}
            onChange={(e) => setItemStackDistance(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Base Scale ({baseScale})</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={baseScale}
            onChange={(e) => setBaseScale(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Rotation Amount ({rotationAmount}deg)</label>
          <input
            type="range"
            min="0"
            max="45"
            step="1"
            value={rotationAmount}
            onChange={(e) => setRotationAmount(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Blur Amount ({blurAmount}px)</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={blurAmount}
            onChange={(e) => setBlurAmount(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stack Position</label>
          <input
            type="text"
            value={stackPosition}
            onChange={(e) => setStackPosition(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Scale End Position</label>
          <input
            type="text"
            value={scaleEndPosition}
            onChange={(e) => setScaleEndPosition(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          onClick={handleReplay}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          Reset / Replay
        </button>
      </div>
    </div>
  );

  const usageCode = `import ScrollStack, { ScrollStackItem } from './ScrollStack'

<ScrollStack
  itemDistance={${itemDistance}}
  itemScale={${itemScale}}
  itemStackDistance={${itemStackDistance}}
  stackPosition="${stackPosition}"
  scaleEndPosition="${scaleEndPosition}"
  baseScale={${baseScale}}
  scaleDuration={${scaleDuration}}
  rotationAmount={${rotationAmount}}
  blurAmount={${blurAmount}}
>
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>Content here</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>Content here</p>
  </ScrollStackItem>
</ScrollStack>`;

  const codeExample = `// Full component code available in the repository
// Requires: lenis

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'ScrollStackItem components to stack',
    },
    {
      name: 'itemDistance',
      type: 'number',
      default: '100',
      description: 'Distance between cards in pixels',
    },
    {
      name: 'itemScale',
      type: 'number',
      default: '0.03',
      description: 'Scale factor for each stacked card',
    },
    {
      name: 'itemStackDistance',
      type: 'number',
      default: '30',
      description: 'Vertical offset between stacked cards',
    },
    {
      name: 'stackPosition',
      type: 'string',
      default: "'20%'",
      description: 'Position where cards start stacking',
    },
    {
      name: 'scaleEndPosition',
      type: 'string',
      default: "'10%'",
      description: 'Position where scaling animation ends',
    },
    {
      name: 'baseScale',
      type: 'number',
      default: '0.85',
      description: 'Base scale for stacked cards',
    },
    {
      name: 'rotationAmount',
      type: 'number',
      default: '0',
      description: 'Rotation angle for cards in degrees',
    },
    {
      name: 'blurAmount',
      type: 'number',
      default: '0',
      description: 'Blur amount for cards behind the stack',
    },
  ];

  return (
    <ComponentDetail
      title="Scroll Stack"
      description="Smooth scrolling card stack effect - cards scale and stack as you scroll"
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['lenis']}
    />
  );
};

export default ScrollStackPage;
