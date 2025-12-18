import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ComponentDetail from './ComponentDetail';

gsap.registerPlugin(useGSAP);

const SplitTextPreview = ({ 
  delay = 100,
  duration = 0.6,
  splitType = 'chars'
}: {
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
}) => {
  const text = "Hello, you!";
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useGSAP(() => {
    if (!ref.current) return;
    
    const elements = ref.current.querySelectorAll('.split-element');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power3.out',
        stagger: delay / 1000
      }
    );
  }, { scope: ref, dependencies: [delay, duration, splitType, key] });

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [delay, duration, splitType]);

  const renderSplitText = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-element inline-block mr-3">
          {word}
        </span>
      ));
    } else {
      return text.split('').map((char, i) => (
        <span 
          key={i} 
          className="split-element inline-block" 
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div className="text-center min-h-[200px] flex items-center justify-center">
      <div ref={ref} className="text-6xl font-bold">
        {renderSplitText()}
      </div>
    </div>
  );
};

const codeExample = `import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function SplitText({ 
  text,
  delay = 100,
  duration = 0.6,
  splitType = 'chars'
}: {
  text: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const elements = ref.current.querySelectorAll('.split-element');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power3.out',
        stagger: delay / 1000
      }
    );
  }, { scope: ref, dependencies: [delay, duration, splitType] });

  const renderSplitText = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-element inline-block mr-3">
          {word}
        </span>
      ));
    } else {
      return text.split('').map((char, i) => (
        <span key={i} className="split-element inline-block">
          {char === ' ' ? '\\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div ref={ref} className="text-6xl font-bold">
      {renderSplitText()}
    </div>
  );
}`;

const props = [
  {
    name: 'text',
    type: 'string',
    default: '-',
    description: 'The text content to be split and animated',
  },
  {
    name: 'delay',
    type: 'number',
    default: '100',
    description: 'Stagger delay between elements in milliseconds',
  },
  {
    name: 'duration',
    type: 'number',
    default: '0.6',
    description: 'Duration of each element animation in seconds',
  },
  {
    name: 'splitType',
    type: "'chars' | 'words'",
    default: "'chars'",
    description: 'Split text by characters or words',
  },
];

export default function SplitText() {
  const [delay, setDelay] = useState(100);
  const [duration, setDuration] = useState(0.6);
  const [splitType, setSplitType] = useState<'chars' | 'words'>('chars');

  const customization = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Split Type</label>
        <select 
          value={splitType}
          onChange={(e) => setSplitType(e.target.value as 'chars' | 'words')}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer hover:bg-white/10"
        >
          <option value="chars">Characters</option>
          <option value="words">Words</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Stagger Delay</label>
          <span className="text-sm text-purple-400 font-mono">{delay}ms</span>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          step="10"
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Animation Duration</label>
          <span className="text-sm text-purple-400 font-mono">{duration}s</span>
        </div>
        <input
          type="range"
          min="0.2"
          max="2"
          step="0.1"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  const usageExample = `import SplitText from './SplitText';

<SplitText 
  text="Hello, you!"
  delay={100}
  duration={0.6}
  splitType="chars"
/>`;

  return (
    <ComponentDetail
      title="Split Text"
      description="Animate text by splitting it into characters or words using GSAP"
      preview={<SplitTextPreview delay={delay} duration={duration} splitType={splitType} />}
      code={codeExample}
      usage={usageExample}
      props={props}
      customization={customization}
      dependencies={['gsap', '@gsap/react']}
    />
  );
}
