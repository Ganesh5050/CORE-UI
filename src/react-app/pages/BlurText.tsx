import { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';
import Slider from '../components/Slider';

const BlurTextPreview = ({ 
  delay = 0.05,
  duration = 0.8
}: {
  delay?: number;
  duration?: number;
}) => {
  const text = "Hello, you!";
  const characters = text.split('');

  return (
    <div className="text-center">
      <h2 className="text-6xl font-bold">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ 
              duration: duration, 
              delay: i * delay,
              ease: 'easeOut'
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
};

const codeExample = `import { motion } from 'framer-motion';

export default function BlurText({ 
  text,
  delay = 0.05,
  duration = 0.8
}: {
  text: string;
  delay?: number;
  duration?: number;
}) {
  const characters = text.split('');

  return (
    <h2 className="text-6xl font-bold">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ 
            duration: duration, 
            delay: i * delay,
            ease: 'easeOut'
          }}
          className="inline-block"
        >
          {char === ' ' ? '\\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  );
}`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text content to be animated',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0.05',
    description: 'Delay between each character animation in seconds',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.8',
    description: 'Duration of each character animation in seconds',
  },
];

export default function BlurText() {
  const [delay, setDelay] = useState(0.05);
  const [duration, setDuration] = useState(0.8);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Animation Delay"
        value={delay}
        min={0}
        max={0.2}
        step={0.01}
        onChange={setDelay}
        unit="s"
        formatValue={(v) => v.toFixed(2)}
      />

      <Slider
        label="Animation Duration"
        value={duration}
        min={0.1}
        max={2}
        step={0.1}
        onChange={setDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  const usageExample = `import BlurText from './BlurText';

<BlurText 
  text="Hello, you!"
  delay={0.05}
  duration={0.8}
/>`;

  return (
    <ComponentDetail
      title="Blur Text"
      description="Animate text with a blur-in effect on each character"
      preview={<BlurTextPreview delay={delay} duration={duration} />}
      code={codeExample}
      usage={usageExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
