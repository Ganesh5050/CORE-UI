import { useState, useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import VariableProximityComponent from '../components/text/VariableProximity';
import Slider from '../components/Slider';

const VariableProximityPreview = ({
  radius = 100,
  falloff = 'linear'
}: {
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
      `}</style>
      <div
        ref={containerRef}
        className="relative flex items-center justify-center min-h-[200px] py-8"
      >
        <VariableProximityComponent
          label="Hover me! And then star Core UI on GitHub, or else..."
          className="text-4xl text-center"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={radius}
          falloff={falloff}
        />
      </div>
    </>
  );
};

const codeExample = `import { forwardRef, useMemo, useRef, useEffect, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };
    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      );

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return \`'\${axis}' \${interpolatedValue}\`;
        })
        .join(', ');

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;`;

const props = [
  {
    name: 'label',
    type: 'string',
    default: '-',
    description: 'The text content to display',
  },
  {
    name: 'fromFontVariationSettings',
    type: 'string',
    default: '-',
    description: 'Starting font variation settings',
  },
  {
    name: 'toFontVariationSettings',
    type: 'string',
    default: '-',
    description: 'Target font variation settings on proximity',
  },
  {
    name: 'containerRef',
    type: 'MutableRefObject<HTMLElement | null>',
    default: '-',
    description: 'Reference to the container element',
  },
  {
    name: 'radius',
    type: 'number',
    default: '50',
    description: 'Radius of mouse interaction area in pixels',
  },
  {
    name: 'falloff',
    type: "'linear' | 'exponential' | 'gaussian'",
    default: "'linear'",
    description: 'Falloff curve for the proximity effect',
  },
];

export default function VariableProximity() {
  const [radius, setRadius] = useState(100);
  const [falloff, setFalloff] = useState<'linear' | 'exponential' | 'gaussian'>('linear');

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Radius"
        value={radius}
        min={50}
        max={200}
        step={10}
        onChange={setRadius}
        unit="px"
      />

      <div>
        <label className="text-sm font-medium text-gray-300 mb-3 block">Falloff</label>
        <div className="flex gap-3">
          <button
            onClick={() => setFalloff('linear')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${falloff === 'linear'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            linear
          </button>
          <button
            onClick={() => setFalloff('exponential')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${falloff === 'exponential'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            exponential
          </button>
          <button
            onClick={() => setFalloff('gaussian')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${falloff === 'gaussian'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            gaussian
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Variable Proximity"
      description="Text with variable font settings that change based on mouse proximity using Roboto Flex"
      preview={<VariableProximityPreview radius={radius} falloff={falloff} />}
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['framer-motion']}
    />
  );
}
