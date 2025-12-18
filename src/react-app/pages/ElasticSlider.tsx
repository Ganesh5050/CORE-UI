import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ElasticSlider from '../components/effects/ElasticSlider';
import { Volume1, Volume2, Minus, Plus, Circle, Square } from 'lucide-react';

const ElasticSliderPage = () => {
  const [defaultValue, setDefaultValue] = useState(50);
  const [maxValue, setMaxValue] = useState(100);
  const [isStepped, setIsStepped] = useState(false);
  const [stepSize, setStepSize] = useState(10);

  const preview = (
    <div className="h-[600px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex flex-col items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-2 w-full">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Default</h3>
        <ElasticSlider />
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Steps</h3>
        <ElasticSlider
          isStepped={true}
          stepSize={10}
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Playground</h3>
        <ElasticSlider
          defaultValue={defaultValue}
          maxValue={maxValue}
          isStepped={isStepped}
          stepSize={stepSize}
          leftIcon={<Minus className="w-4 h-4" />}
          rightIcon={<Plus className="w-4 h-4" />}
        />
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Default Value ({defaultValue})</label>
          <input
            type="range"
            min="0"
            max={maxValue}
            step="1"
            value={defaultValue}
            onChange={(e) => setDefaultValue(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Max Value ({maxValue})</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={maxValue}
            onChange={(e) => setMaxValue(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Step Size ({stepSize})</label>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={stepSize}
            onChange={(e) => setStepSize(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Stepped</label>
          <input
            type="checkbox"
            checked={isStepped}
            onChange={(e) => setIsStepped(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import ElasticSlider from './ElasticSlider';

// Default
<ElasticSlider />

// Stepped
<ElasticSlider
  isStepped
  stepSize={10}
/>

// Custom / Playground
<ElasticSlider
  defaultValue={${defaultValue}}
  maxValue={${maxValue}}
  isStepped={${isStepped}}
  stepSize={${stepSize}}
  leftIcon={<Minus />}
  rightIcon={<Plus />}
/>`;

  const codeExample = `import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
    defaultValue?: number;
    startingValue?: number;
    maxValue?: number;
    className?: string;
    isStepped?: boolean;
    stepSize?: number;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const ElasticSlider: React.FC<ElasticSliderProps> = ({
    defaultValue = 50,
    startingValue = 0,
    maxValue = 100,
    className = '',
    isStepped = false,
    stepSize = 1,
    leftIcon = <>-</>,
    rightIcon = <>+</>
}) => {
    return (
        <div className={\`flex flex-col items-center justify-center gap-4 w-48 \${className}\`}>
            <Slider
                defaultValue={defaultValue}
                startingValue={startingValue}
                maxValue={maxValue}
                isStepped={isStepped}
                stepSize={stepSize}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
            />
        </div>
    );
};

interface SliderProps {
    defaultValue: number;
    startingValue: number;
    maxValue: number;
    isStepped: boolean;
    stepSize: number;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({
    defaultValue,
    startingValue,
    maxValue,
    isStepped,
    stepSize,
    leftIcon,
    rightIcon
}) => {
    const [value, setValue] = useState<number>(defaultValue);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');
    const clientX = useMotionValue(0);
    const overflow = useMotionValue(0);
    const scale = useMotionValue(1);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useMotionValueEvent(clientX, 'change', (latest: number) => {
        if (sliderRef.current) {
            const { left, right } = sliderRef.current.getBoundingClientRect();
            let newValue: number;
            if (latest < left) {
                setRegion('left');
                newValue = left - latest;
            } else if (latest > right) {
                setRegion('right');
                newValue = latest - right;
            } else {
                setRegion('middle');
                newValue = 0;
            }
            overflow.jump(decay(newValue, MAX_OVERFLOW));
        }
    });

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.buttons > 0 && sliderRef.current) {
            const { left, width } = sliderRef.current.getBoundingClientRect();
            let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);
            if (isStepped) {
                newValue = Math.round(newValue / stepSize) * stepSize;
            }
            newValue = Math.min(Math.max(newValue, startingValue), maxValue);
            setValue(newValue);
            clientX.jump(e.clientX);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        handlePointerMove(e);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = () => {
        animate(overflow, 0, { type: 'spring', bounce: 0.5 });
    };

    const getRangePercentage = (): number => {
        const totalRange = maxValue - startingValue;
        if (totalRange === 0) return 0;
        return ((value - startingValue) / totalRange) * 100;
    };

    return (
        <>
            <motion.div
                onHoverStart={() => animate(scale, 1.2)}
                onHoverEnd={() => animate(scale, 1)}
                onTouchStart={() => animate(scale, 1.2)}
                onTouchEnd={() => animate(scale, 1)}
                style={{
                    scale,
                    opacity: useTransform(scale, [1, 1.2], [0.7, 1])
                }}
                className="flex w-full touch-none select-none items-center justify-center gap-4"
            >
                <motion.div
                    animate={{
                        scale: region === 'left' ? [1, 1.4, 1] : 1,
                        transition: { duration: 0.25 }
                    }}
                    style={{
                        x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
                    }}
                >
                    {leftIcon}
                </motion.div>

                <div
                    ref={sliderRef}
                    className="relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center py-4"
                    onPointerMove={handlePointerMove}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                >
                    <motion.div
                        style={{
                            scaleX: useTransform(() => {
                                if (sliderRef.current) {
                                    const { width } = sliderRef.current.getBoundingClientRect();
                                    return 1 + overflow.get() / width;
                                }
                                return 1;
                            }),
                            scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
                            transformOrigin: useTransform(() => {
                                if (sliderRef.current) {
                                    const { left, width } = sliderRef.current.getBoundingClientRect();
                                    return clientX.get() < left + width / 2 ? 'right' : 'left';
                                }
                                return 'center';
                            }),
                            height: useTransform(scale, [1, 1.2], [6, 12]),
                            marginTop: useTransform(scale, [1, 1.2], [0, -3]),
                            marginBottom: useTransform(scale, [1, 1.2], [0, -3])
                        }}
                        className="flex flex-grow"
                    >
                        <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">
                            <div className="absolute h-full bg-gray-500 rounded-full" style={{ width: \`\${getRangePercentage()}%\` }} />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{
                        scale: region === 'right' ? [1, 1.4, 1] : 1,
                        transition: { duration: 0.25 }
                    }}
                    style={{
                        x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
                    }}
                >
                    {rightIcon}
                </motion.div>
            </motion.div>
            <p className="absolute text-gray-400 transform -translate-y-4 text-xs font-medium tracking-wide">
                {Math.round(value)}
            </p>
        </>
    );
};

function decay(value: number, max: number): number {
    if (max === 0) {
        return 0;
    }
    const entry = value / max;
    const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
    return sigmoid * max;
}

export default ElasticSlider;`;

  const props = [
    {
      name: 'defaultValue',
      type: 'number',
      default: '50',
      description: 'Initial value of the slider',
    },
    {
      name: 'startingValue',
      type: 'number',
      default: '0',
      description: 'Minimum value of the slider',
    },
    {
      name: 'maxValue',
      type: 'number',
      default: '100',
      description: 'Maximum value of the slider',
    },
    {
      name: 'isStepped',
      type: 'boolean',
      default: 'false',
      description: 'Enable stepped movement',
    },
    {
      name: 'stepSize',
      type: 'number',
      default: '1',
      description: 'Size of each step',
    },
    {
      name: 'leftIcon',
      type: 'ReactNode',
      default: '<>-</>',
      description: 'Icon to display on the left',
    },
    {
      name: 'rightIcon',
      type: 'ReactNode',
      default: '<>+</>',
      description: 'Icon to display on the right',
    },
  ];

  return (
    <ComponentDetail
      title="Elastic Slider"
      description="A slider with elastic physics feedback and overflow animations."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['motion']}
    />
  );
};

export default ElasticSliderPage;