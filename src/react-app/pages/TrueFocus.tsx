import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocusPreview = ({ 
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  blurAmount = 5
}: {
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  blurAmount?: number;
}) => {
  const sentence = "Hello, you!";
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentIndex(prev => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000
    );
    return () => clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex]);

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap min-h-[200px]"
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className="relative text-6xl font-black"
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] border-r-0 border-b-0 border-purple-500"
          style={{ 
            filter: 'drop-shadow(0 0 6px rgb(168 85 247))',
            top: '-6px',
            left: '-6px'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] border-l-0 border-b-0 border-purple-500"
          style={{ 
            filter: 'drop-shadow(0 0 6px rgb(168 85 247))',
            top: '-6px',
            right: '-6px'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] border-r-0 border-t-0 border-purple-500"
          style={{ 
            filter: 'drop-shadow(0 0 6px rgb(168 85 247))',
            bottom: '-6px',
            left: '-6px'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] border-l-0 border-t-0 border-purple-500"
          style={{ 
            filter: 'drop-shadow(0 0 6px rgb(168 85 247))',
            bottom: '-6px',
            right: '-6px'
          }}
        />
      </motion.div>
    </div>
  );
};

const codeExample = `import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TrueFocus({ 
  sentence = 'True Focus',
  blurAmount = 5,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}: {
  sentence?: string;
  blurAmount?: number;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();
    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="relative flex gap-4 justify-center items-center">
      {words.map((word, index) => (
        <span
          key={index}
          ref={el => { wordRefs.current[index] = el; }}
          className="text-6xl font-black"
          style={{
            filter: index === currentIndex ? 'blur(0px)' : \`blur(\${blurAmount}px)\`,
            transition: \`filter \${animationDuration}s ease\`
          }}
        >
          {word}
        </span>
      ))}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ x: focusRect.x, y: focusRect.y, width: focusRect.width, height: focusRect.height }}
        transition={{ duration: animationDuration }}
      >
        {/* Corner brackets */}
        <span className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0 border-green-500" />
        <span className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0 border-green-500" />
        <span className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0 border-green-500" />
        <span className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0 border-green-500" />
      </motion.div>
    </div>
  );
}`;

const props = [
  {
    name: 'sentence',
    type: 'string',
    default: 'True Focus',
    description: 'The text content to display',
  },
  {
    name: 'blurAmount',
    type: 'number',
    default: '5',
    description: 'Amount of blur for unfocused words',
  },
  {
    name: 'animationDuration',
    type: 'number',
    default: '0.5',
    description: 'Duration of focus transition in seconds',
  },
  {
    name: 'pauseBetweenAnimations',
    type: 'number',
    default: '1',
    description: 'Pause between word transitions in seconds',
  },
];

export default function TrueFocus() {
  const [animationDuration, setAnimationDuration] = useState(0.5);
  const [pauseBetweenAnimations, setPauseBetweenAnimations] = useState(1);
  const [blurAmount, setBlurAmount] = useState(5);

  const customization = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Animation Duration</label>
          <span className="text-sm text-purple-400 font-mono">{animationDuration}s</span>
        </div>
        <input
          type="range"
          min="0.2"
          max="2"
          step="0.1"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Pause Between</label>
          <span className="text-sm text-purple-400 font-mono">{pauseBetweenAnimations}s</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={pauseBetweenAnimations}
          onChange={(e) => setPauseBetweenAnimations(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Blur Amount</label>
          <span className="text-sm text-purple-400 font-mono">{blurAmount}px</span>
        </div>
        <input
          type="range"
          min="2"
          max="10"
          step="1"
          value={blurAmount}
          onChange={(e) => setBlurAmount(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="True Focus"
      description="Text that cycles focus between words with animated corner brackets"
      preview={<TrueFocusPreview animationDuration={animationDuration} pauseBetweenAnimations={pauseBetweenAnimations} blurAmount={blurAmount} />}
      code={codeExample}
      props={props}
      customization={customization}
    />
  );
}
