import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import CardSwap, { Card } from '../components/effects/CardSwap';

const CardSwapPage = () => {
  const [cardDistance, setCardDistance] = useState(60);
  const [verticalDistance, setVerticalDistance] = useState(70);
  const [delay, setDelay] = useState(3000);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [skewAmount, setSkewAmount] = useState(6);
  const [easing, setEasing] = useState<'linear' | 'elastic'>('elastic');

  const preview = (
    <div className="h-[600px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <CardSwap
          width={300}
          height={400}
          cardDistance={cardDistance}
          verticalDistance={verticalDistance}
          delay={delay}
          pauseOnHover={pauseOnHover}
          skewAmount={skewAmount}
          easing={easing}
        >
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Card 1</h3>
            <p className="text-center text-white/80">Interactive card swapping animation powered by GSAP.</p>
          </Card>
          <Card className="bg-gradient-to-br from-pink-600 to-rose-600 flex flex-col items-center justify-center p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Card 2</h3>
            <p className="text-center text-white/80">Customizable timing, easing, and spacing.</p>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 flex flex-col items-center justify-center p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Card 3</h3>
            <p className="text-center text-white/80">Pause on hover and click interactions supported.</p>
          </Card>
          <Card className="bg-gradient-to-br from-orange-600 to-amber-600 flex flex-col items-center justify-center p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Card 4</h3>
            <p className="text-center text-white/80">Smooth 3D transforms and z-index management.</p>
          </Card>
        </CardSwap>
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Card Distance ({cardDistance}px)</label>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={cardDistance}
            onChange={(e) => setCardDistance(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Vertical Distance ({verticalDistance}px)</label>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={verticalDistance}
            onChange={(e) => setVerticalDistance(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Delay ({delay}ms)</label>
          <input
            type="range"
            min="1000"
            max="8000"
            step="500"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Skew Amount ({skewAmount}deg)</label>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={skewAmount}
            onChange={(e) => setSkewAmount(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Easing</label>
          <select
            value={easing}
            onChange={(e) => setEasing(e.target.value as 'linear' | 'elastic')}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="elastic">Elastic</option>
            <option value="linear">Linear</option>
          </select>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Pause on Hover</label>
          <input
            type="checkbox"
            checked={pauseOnHover}
            onChange={(e) => setPauseOnHover(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import CardSwap, { Card } from './CardSwap';

<CardSwap
  cardDistance={${cardDistance}}
  verticalDistance={${verticalDistance}}
  delay={${delay}}
  pauseOnHover={${pauseOnHover}}
  skewAmount={${skewAmount}}
  easing="${easing}"
>
  <Card className="bg-purple-600 p-6 text-white">
    <h3>Card 1</h3>
  </Card>
  <Card className="bg-pink-600 p-6 text-white">
    <h3>Card 2</h3>
  </Card>
  <Card className="bg-emerald-600 p-6 text-white">
    <h3>Card 3</h3>
  </Card>
</CardSwap>`;

  const codeExample = `import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    RefObject,
    useEffect,
    useMemo,
    useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (idx: number) => void;
    skewAmount?: number;
    easing?: 'linear' | 'elastic';
    children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={\`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] \${customClass ?? ''} \${rest.className ?? ''}\`.trim()}
    />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
    x: number;
    y: number;
    z: number;
    zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

const CardSwap: React.FC<CardSwapProps> = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = 'elastic',
    children
}) => {
    const config =
        easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            };

    const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
    const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

    const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>(0);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

        const swap = () => {
            if (order.current.length < 2) return;

            const [front, ...rest] = order.current;
            const elFront = refs[front].current!;
            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.to(elFront, {
                y: '+=500',
                duration: config.durDrop,
                ease: config.ease
            });

            tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);
            rest.forEach((idx, i) => {
                const el = refs[idx].current!;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                tl.set(el, { zIndex: slot.zIndex }, 'promote');
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: config.durMove,
                        ease: config.ease
                    },
                    \`promote+=\${i * 0.15}\`
                );
            });

            const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
            tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);
            tl.call(
                () => {
                    gsap.set(elFront, { zIndex: backSlot.zIndex });
                },
                undefined,
                'return'
            );
            tl.to(
                elFront,
                {
                    x: backSlot.x,
                    y: backSlot.y,
                    z: backSlot.z,
                    duration: config.durReturn,
                    ease: config.ease
                },
                'return'
            );

            tl.call(() => {
                order.current = [...rest, front];
            });
        };

        swap();
        intervalRef.current = window.setInterval(swap, delay);

        if (pauseOnHover) {
            const node = container.current!;
            const pause = () => {
                tlRef.current?.pause();
                clearInterval(intervalRef.current);
            };
            const resume = () => {
                tlRef.current?.play();
                intervalRef.current = window.setInterval(swap, delay);
            };
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }
        return () => clearInterval(intervalRef.current);
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

    const rendered = childArr.map((child, i) =>
        isValidElement<CardProps>(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: e => {
                    child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                    onCardClick?.(i);
                }
            } as CardProps & React.RefAttributes<HTMLDivElement>)
            : child
    );

    return (
        <div
            ref={container}
            className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
            style={{ width, height }}
        >
            {rendered}
        </div>
    );
};

export default CardSwap;
`;

  const props = [
    {
      name: 'cardDistance',
      type: 'number',
      default: '60',
      description: 'Horizontal distance between cards',
    },
    {
      name: 'verticalDistance',
      type: 'number',
      default: '70',
      description: 'Vertical distance between cards',
    },
    {
      name: 'delay',
      type: 'number',
      default: '5000',
      description: 'Time between swaps in ms',
    },
    {
      name: 'pauseOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Pause animation on hover',
    },
    {
      name: 'skewAmount',
      type: 'number',
      default: '6',
      description: 'Skew angle in degrees',
    },
    {
      name: 'easing',
      type: "'linear' | 'elastic'",
      default: "'elastic'",
      description: 'Animation easing function',
    },
  ];

  return (
    <ComponentDetail
      title="Card Swap"
      description="A stack of cards that automatically swaps the front card to the back with a 3D animation."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap']}
    />
  );
};

export default CardSwapPage;