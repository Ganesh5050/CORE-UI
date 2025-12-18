import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComponentDetail from './ComponentDetail';

const RotatingTextPreview = ({ 
  interval = 2000
}: {
  interval?: number;
}) => {
  const words = ["Hello", "Bonjour", "Hola", "Ciao"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="text-center h-32 flex items-center justify-center">
      <h2 className="text-6xl font-bold">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
        , you!
      </h2>
    </div>
  );
};

const codeExample = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatingText({ 
  words,
  interval = 2000
}: {
  words: string[];
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <h2 className="text-6xl font-bold">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </h2>
  );
}`;

const props = [
  {
    name: 'words',
    type: 'string[]',
    default: '-',
    description: 'Array of words to rotate through',
  },
  {
    name: 'interval',
    type: 'number',
    default: '2000',
    description: 'Time between rotations in milliseconds',
  },
];

export default function RotatingText() {
  const [interval, setInterval] = useState(2000);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Rotation Interval</label>
          <span className="text-sm text-purple-400 font-mono">{interval}ms</span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="500"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Rotating Text"
      description="Text that rotates through different words with 3D effect"
      preview={<RotatingTextPreview interval={interval} />}
      code={codeExample}
      props={props}
      customization={customization}
    />
  );
}
