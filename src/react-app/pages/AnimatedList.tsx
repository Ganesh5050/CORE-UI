import { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';
import Slider from '../components/Slider';

const AnimatedListPreview = ({
  staggerDelay = 0.1,
  duration = 0.4
}: {
  staggerDelay?: number;
  duration?: number;
}) => {
  const items = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

  return (
    <div className="space-y-3 w-full max-w-md">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: duration, delay: index * staggerDelay }}
          className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

const codeExample = `import { motion } from 'framer-motion';

export default function AnimatedList({ 
  items,
  staggerDelay = 0.1,
  duration = 0.4
}: { 
  items: string[];
  staggerDelay?: number;
  duration?: number;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: duration, delay: index * staggerDelay }}
          className="p-4 bg-white/5 border border-white/10 rounded-lg"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}`;

const props = [
  {
    name: 'items',
    type: 'string[]',
    default: '-',
    description: 'Array of items to display in the list',
  },
  {
    name: 'staggerDelay',
    type: 'number',
    default: '0.1',
    description: 'Delay between each item animation in seconds',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.4',
    description: 'Duration of each item animation in seconds',
  },
];

export default function AnimatedList() {
  const [staggerDelay, setStaggerDelay] = useState(0.1);
  const [duration, setDuration] = useState(0.4);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Stagger Delay"
        value={staggerDelay}
        min={0}
        max={0.5}
        step={0.05}
        onChange={setStaggerDelay}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />

      <Slider
        label="Animation Duration"
        value={duration}
        min={0.1}
        max={1}
        step={0.1}
        onChange={setDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Animated List"
      description="Stagger animate list items with smooth transitions"
      preview={<AnimatedListPreview staggerDelay={staggerDelay} duration={duration} />}
      code={codeExample}
      props={props}
      customization={customization}
    />
  );
}
