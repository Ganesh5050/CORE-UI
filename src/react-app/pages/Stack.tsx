import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Stack from '../components/effects/Stack';

const StackPage = () => {
  const [randomRotation, setRandomRotation] = useState(false);
  const [sensitivity, setSensitivity] = useState(180);
  const [sendToBackOnClick, setSendToBackOnClick] = useState(false);
  const [cardWidth, setCardWidth] = useState(200);
  const [cardHeight, setCardHeight] = useState(200);
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(20);

  const images = [
    { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
    { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
    { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
    { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
  ];

  const preview = (
    <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
      <Stack
        randomRotation={randomRotation}
        sensitivity={sensitivity}
        sendToBackOnClick={sendToBackOnClick}
        cardDimensions={{ width: cardWidth, height: cardHeight }}
        cardsData={images}
        animationConfig={{ stiffness, damping }}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Sensitivity ({sensitivity})</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Card Width ({cardWidth}px)</label>
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={cardWidth}
            onChange={(e) => setCardWidth(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Card Height ({cardHeight}px)</label>
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={cardHeight}
            onChange={(e) => setCardHeight(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stiffness ({stiffness})</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={stiffness}
            onChange={(e) => setStiffness(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Damping ({damping})</label>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={damping}
            onChange={(e) => setDamping(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Random Rotation</label>
          <input
            type="checkbox"
            checked={randomRotation}
            onChange={(e) => setRandomRotation(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Send to Back on Click</label>
          <input
            type="checkbox"
            checked={sendToBackOnClick}
            onChange={(e) => setSendToBackOnClick(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import Stack from './Stack'

const images = [
  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
];
  
<Stack
  randomRotation={${randomRotation}}
  sensitivity={${sensitivity}}
  sendToBackOnClick={${sendToBackOnClick}}
  cardDimensions={{ width: ${cardWidth}, height: ${cardHeight} }}
  cardsData={images}
  animationConfig={{ stiffness: ${stiffness}, damping: ${damping} }}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: framer-motion

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'randomRotation',
      type: 'boolean',
      default: 'false',
      description: 'Whether to apply random rotation to cards',
    },
    {
      name: 'sensitivity',
      type: 'number',
      default: '200',
      description: 'Drag distance threshold to trigger send to back',
    },
    {
      name: 'cardDimensions',
      type: '{ width: number, height: number }',
      default: '{ width: 208, height: 208 }',
      description: 'Dimensions of the cards',
    },
    {
      name: 'sendToBackOnClick',
      type: 'boolean',
      default: 'false',
      description: 'Whether clicking a card sends it to the back',
    },
    {
      name: 'cardsData',
      type: 'Array<{ id: number, img: string }>',
      default: '[]',
      description: 'Array of card data objects',
    },
    {
      name: 'animationConfig',
      type: '{ stiffness: number, damping: number }',
      default: '{ stiffness: 260, damping: 20 }',
      description: 'Spring animation configuration',
    },
  ];

  return (
    <ComponentDetail
      title="Stack"
      description="A stack of cards that can be dragged or clicked to cycle through them, with spring physics."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['framer-motion']}
    />
  );
};

export default StackPage;
