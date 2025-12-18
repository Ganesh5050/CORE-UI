import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import CountUpComponent from '../components/text/CountUp';
import Slider from '../components/Slider';

const CountUpPreview = ({
  duration = 2
}: {
  duration?: number;
}) => {
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);
  const [key3, setKey3] = useState(0);

  return (
    <div className="space-y-12">
      {/* Default */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-4">Default</h3>
        <div className="p-8 bg-white/5 border border-white/10 rounded-lg text-center">
          <h2 className="text-6xl font-bold">
            <CountUpComponent
              key={key1}
              from={0}
              to={100}
              duration={duration}
              direction="up"
              className="inline-block"
            />
          </h2>
        </div>
      </div>

      {/* Start Programmatically */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-4">Start Programmatically</h3>
        <div className="p-8 bg-white/5 border border-white/10 rounded-lg text-center">
          <button
            onClick={() => setKey2(prev => prev + 1)}
            className="px-4 py-2 mb-6 bg-white/10 border border-white/20 rounded-lg text-sm hover:bg-white/20 transition-colors"
          >
            Count to 100
          </button>
          <h2 className="text-6xl font-bold">
            <CountUpComponent
              key={key2}
              from={0}
              to={100}
              duration={duration}
              direction="up"
              startWhen={key2 > 0}
              className="inline-block"
            />
          </h2>
        </div>
      </div>

      {/* With Gradient */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-4">With Gradient</h3>
        <p className="text-xs text-gray-500 mb-4">You can style the counter with other components such as &lt;GradientText /&gt;</p>
        <div className="p-8 bg-white/5 border border-white/10 rounded-lg text-center">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            <CountUpComponent
              key={key3}
              from={0}
              to={100}
              duration={duration}
              direction="up"
              className="inline-block"
            />
          </h2>
        </div>
      </div>
    </div>
  );
};

const codeExample = `import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}`;

const props = [
  {
    name: 'to',
    type: 'number',
    default: '-',
    description: 'The target number to count to',
  },
  {
    name: 'from',
    type: 'number',
    default: '0',
    description: 'The starting number',
  },
  {
    name: 'direction',
    type: "'up' | 'down'",
    default: "'up'",
    description: 'Count direction',
  },
  {
    name: 'duration',
    type: 'number',
    default: '2',
    description: 'Duration of the animation in seconds',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay before starting in seconds',
  },
  {
    name: 'separator',
    type: 'string',
    default: "''",
    description: 'Thousands separator character',
  },
  {
    name: 'startWhen',
    type: 'boolean',
    default: 'true',
    description: 'Whether to start the animation',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function CountUp() {
  const [duration, setDuration] = useState(2);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Duration"
        value={duration}
        min={0.5}
        max={5}
        step={0.5}
        onChange={setDuration}
        unit="s"
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Count Up"
      description="Animated number counter using Framer Motion spring physics with scroll detection"
      preview={<CountUpPreview duration={duration} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
