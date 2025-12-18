import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Counter from '../components/effects/Counter';
import { Minus, Plus } from 'lucide-react';

const CounterPage = () => {
  const [value, setValue] = useState(0);
  const [fontSize, setFontSize] = useState(80);
  const [padding, setPadding] = useState(5);
  const [gap, setGap] = useState(10);
  const [textColor, setTextColor] = useState('#ffffff');
  const [gradientHeight, setGradientHeight] = useState(16);

  const preview = (
    <div className="h-[400px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex flex-col items-center justify-center gap-12">
      <Counter
        value={value}
        places={[100, 10, 1]}
        fontSize={fontSize}
        padding={padding}
        gap={gap}
        textColor={textColor}
        fontWeight={900}
        gradientHeight={gradientHeight}
        gradientFrom="#060010"
        gradientTo="transparent"
      />

      <div className="flex gap-4">
        <button
          onClick={() => setValue(v => Math.max(0, v - 1))}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={() => setValue(v => Math.min(999, v + 1))}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Value ({value})</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Font Size ({fontSize}px)</label>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Padding ({padding}px)</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={padding}
            onChange={(e) => setPadding(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Gap ({gap}px)</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={gap}
            onChange={(e) => setGap(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Gradient Height ({gradientHeight}px)</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={gradientHeight}
            onChange={(e) => setGradientHeight(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import Counter from './Counter';

<Counter
  value={${value}}
  places={[100, 10, 1]}
  fontSize={${fontSize}}
  padding={${padding}}
  gap={${gap}}
  textColor="${textColor}"
  fontWeight={900}
  gradientHeight={${gradientHeight}}
  gradientFrom="#060010"
  gradientTo="transparent"
/>`;

  const codeExample = `import { MotionValue, motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

interface NumberProps {
    mv: MotionValue<number>;
    number: number;
    height: number;
}

function Number({ mv, number, height }: NumberProps) {
    let y = useTransform(mv, latest => {
        let placeValue = latest % 10;
        let offset = (10 + number - placeValue) % 10;
        let memo = offset * height;
        if (offset > 5) {
            memo -= 10 * height;
        }
        return memo;
    });

    const style: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return <motion.span style={{ ...style, y }}>{number}</motion.span>;
}

interface DigitProps {
    place: number;
    value: number;
    height: number;
    digitStyle?: React.CSSProperties;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
    let valueRoundedToPlace = Math.floor(value / place);
    let animatedValue = useSpring(valueRoundedToPlace);

    useEffect(() => {
        animatedValue.set(valueRoundedToPlace);
    }, [animatedValue, valueRoundedToPlace]);

    const defaultStyle: React.CSSProperties = {
        height,
        position: 'relative',
        width: '1ch',
        fontVariantNumeric: 'tabular-nums'
    };

    return (
        <div style={{ ...defaultStyle, ...digitStyle }}>
            {Array.from({ length: 10 }, (_, i) => (
                <Number key={i} mv={animatedValue} number={i} height={height} />
            ))}
        </div>
    );
}

interface CounterProps {
    value: number;
    fontSize?: number;
    padding?: number;
    places?: number[];
    gap?: number;
    borderRadius?: number;
    horizontalPadding?: number;
    textColor?: string;
    fontWeight?: React.CSSProperties['fontWeight'];
    containerStyle?: React.CSSProperties;
    counterStyle?: React.CSSProperties;
    digitStyle?: React.CSSProperties;
    gradientHeight?: number;
    gradientFrom?: string;
    gradientTo?: string;
    topGradientStyle?: React.CSSProperties;
    bottomGradientStyle?: React.CSSProperties;
}

export default function Counter({
    value,
    fontSize = 100,
    padding = 0,
    places = [100, 10, 1],
    gap = 8,
    borderRadius = 4,
    horizontalPadding = 8,
    textColor = 'white',
    fontWeight = 'bold',
    containerStyle,
    counterStyle,
    digitStyle,
    gradientHeight = 16,
    gradientFrom = 'black',
    gradientTo = 'transparent',
    topGradientStyle,
    bottomGradientStyle
}: CounterProps) {
    const height = fontSize + padding;

    const defaultContainerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block'
    };

    const defaultCounterStyle: React.CSSProperties = {
        fontSize,
        display: 'flex',
        gap: gap,
        overflow: 'hidden',
        borderRadius: borderRadius,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        lineHeight: 1,
        color: textColor,
        fontWeight: fontWeight
    };

    const gradientContainerStyle: React.CSSProperties = {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    const defaultTopGradientStyle: React.CSSProperties = {
        height: gradientHeight,
        background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`
    };

    const defaultBottomGradientStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: gradientHeight,
        background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`
    };

    return (
        <div style={{ ...defaultContainerStyle, ...containerStyle }}>
            <div style={{ ...defaultCounterStyle, ...counterStyle }}>
                {places.map(place => (
                    <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />
                ))}
            </div>
            <div style={gradientContainerStyle}>
                <div style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle} />
                <div style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle} />
            </div>
        </div>
    );
}`;

  const props = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'The number to display',
    },
    {
      name: 'places',
      type: 'number[]',
      default: '[100, 10, 1]',
      description: 'Array of place values (e.g. [100, 10, 1] for 3 digits)',
    },
    {
      name: 'fontSize',
      type: 'number',
      default: '100',
      description: 'Font size in pixels',
    },
    {
      name: 'padding',
      type: 'number',
      default: '0',
      description: 'Vertical padding',
    },
    {
      name: 'gap',
      type: 'number',
      default: '8',
      description: 'Gap between digits',
    },
    {
      name: 'textColor',
      type: 'string',
      default: "'white'",
      description: 'Color of the text',
    },
    {
      name: 'gradientHeight',
      type: 'number',
      default: '16',
      description: 'Height of the fade gradient at top/bottom',
    },
  ];

  return (
    <ComponentDetail
      title="Counter"
      description="A smooth rolling counter animation inspired by mechanical counters."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['motion']}
    />
  );
};

export default CounterPage;