import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Masonry from '../components/effects/Masonry';

const MasonryPage = () => {
  const [stagger, setStagger] = useState(0.05);
  const [duration, setDuration] = useState(0.6);
  const [animateFrom, setAnimateFrom] = useState<'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'>('bottom');
  const [scaleOnHover, setScaleOnHover] = useState(true);
  const [hoverScale, setHoverScale] = useState(0.95);
  const [blurToFocus, setBlurToFocus] = useState(true);
  const [colorShiftOnHover, setColorShiftOnHover] = useState(false);
  const [key, setKey] = useState(0); // To force re-render for animation replay

  const items = [
    { id: "1", img: "https://picsum.photos/id/1015/600/900?grayscale", url: "#", height: 400 },
    { id: "2", img: "https://picsum.photos/id/1011/600/750?grayscale", url: "#", height: 250 },
    { id: "3", img: "https://picsum.photos/id/1020/600/800?grayscale", url: "#", height: 600 },
    { id: "4", img: "https://picsum.photos/id/1025/600/400?grayscale", url: "#", height: 300 },
    { id: "5", img: "https://picsum.photos/id/1027/600/600?grayscale", url: "#", height: 400 },
    { id: "6", img: "https://picsum.photos/id/1035/600/800?grayscale", url: "#", height: 500 },
    { id: "7", img: "https://picsum.photos/id/1040/600/400?grayscale", url: "#", height: 200 },
    { id: "8", img: "https://picsum.photos/id/1045/600/600?grayscale", url: "#", height: 400 }
  ];

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  const preview = (
    <div className="h-[600px] w-full relative bg-gray-100 rounded-lg overflow-y-auto overflow-x-hidden p-4">
      <Masonry
        key={key}
        items={items}
        ease="power3.out"
        duration={duration}
        stagger={stagger}
        animateFrom={animateFrom}
        scaleOnHover={scaleOnHover}
        hoverScale={hoverScale}
        blurToFocus={blurToFocus}
        colorShiftOnHover={colorShiftOnHover}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stagger ({stagger}s)</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={stagger}
            onChange={(e) => setStagger(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Duration ({duration}s)</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hover Scale ({hoverScale})</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={hoverScale}
            onChange={(e) => setHoverScale(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Animate From</label>
          <select
            value={animateFrom}
            onChange={(e) => {
              setAnimateFrom(e.target.value as any);
              handleReplay();
            }}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="random">Random</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Scale on Hover</label>
          <input
            type="checkbox"
            checked={scaleOnHover}
            onChange={(e) => setScaleOnHover(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Blur to Focus</label>
          <input
            type="checkbox"
            checked={blurToFocus}
            onChange={(e) => {
              setBlurToFocus(e.target.checked);
              handleReplay();
            }}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Color Shift on Hover</label>
          <input
            type="checkbox"
            checked={colorShiftOnHover}
            onChange={(e) => setColorShiftOnHover(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <button
          onClick={handleReplay}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          Replay Animation
        </button>
      </div>
    </div>
  );

  const usageCode = `import Masonry from './Masonry';

const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    // ... more items
];

<Masonry
  items={items}
  ease="power3.out"
  duration={${duration}}
  stagger={${stagger}}
  animateFrom="${animateFrom}"
  scaleOnHover={${scaleOnHover}}
  hoverScale={${hoverScale}}
  blurToFocus={${blurToFocus}}
  colorShiftOnHover={${colorShiftOnHover}}
/>`;

  const codeExample = `import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState<number>(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    }, [queries]);

    return value;
};

const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            src =>
                new Promise<void>(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

interface Item {
    id: string;
    img: string;
    url: string;
    height: number;
}

interface GridItem extends Item {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MasonryProps {
    items: Item[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
    items,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false
}) => {
    const columns = useMedia(
        ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);

    const getInitialPosition = (item: GridItem) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return { x: item.x, y: item.y };

        let direction = animateFrom;
        if (animateFrom === 'random') {
            const dirs = ['top', 'bottom', 'left', 'right'];
            direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
        }

        switch (direction) {
            case 'top':
                return { x: item.x, y: -200 };
            case 'bottom':
                return { x: item.x, y: window.innerHeight + 200 };
            case 'left':
                return { x: -200, y: item.y };
            case 'right':
                return { x: window.innerWidth + 200, y: item.y };
            case 'center':
                return {
                    x: containerRect.width / 2 - item.w / 2,
                    y: containerRect.height / 2 - item.h / 2
                };
            default:
                return { x: item.x, y: item.y + 100 };
        }
    };

    useEffect(() => {
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    const grid = useMemo<GridItem[]>(() => {
        if (!width) return [];
        const colHeights = new Array(columns).fill(0);
        const gap = 16;
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        return items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const height = child.height / 2;
            const y = colHeights[col];

            colHeights[col] += height + gap;
            return { ...child, x, y, w: columnWidth, h: height };
        });
    }, [columns, items, width]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady) return;

        grid.forEach((item, index) => {
            const selector = \`[data-key="\${item.id}"]\`;
            const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

            if (!hasMounted.current) {
                const start = getInitialPosition(item);
                gsap.fromTo(
                    selector,
                    {
                        opacity: 0,
                        x: start.x,
                        y: start.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(10px)' })
                    },
                    {
                        opacity: 1,
                        ...animProps,
                        ...(blurToFocus && { filter: 'blur(0px)' }),
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                gsap.to(selector, {
                    ...animProps,
                    duration,
                    ease,
                    overwrite: 'auto'
                });
            }
        });

        hasMounted.current = true;
    }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

    const handleMouseEnter = (id: string, element: HTMLElement) => {
        if (scaleOnHover) {
            gsap.to(\`[data-key="\${id}"]\`, {
                scale: hoverScale,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay') as HTMLElement;
            if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
        }
    };

    const handleMouseLeave = (id: string, element: HTMLElement) => {
        if (scaleOnHover) {
            gsap.to(\`[data-key="\${id}"]\`, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay') as HTMLElement;
            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {grid.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="absolute box-content cursor-pointer"
                    style={{ willChange: 'transform, width, height, opacity' }}
                    onClick={() => window.open(item.url, '_blank', 'noopener')}
                    onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
                >
                    <div
                        className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
                        style={{ backgroundImage: \`url(\${item.img})\` }}
                    >
                        {colorShiftOnHover && (
                            <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Masonry;
`;

  const props = [
    {
      name: 'items',
      type: 'Item[]',
      default: '[]',
      description: 'Array of items with id, img, url, and height',
    },
    {
      name: 'ease',
      type: 'string',
      default: "'power3.out'",
      description: 'GSAP easing function',
    },
    {
      name: 'duration',
      type: 'number',
      default: '0.6',
      description: 'Animation duration in seconds',
    },
    {
      name: 'stagger',
      type: 'number',
      default: '0.05',
      description: 'Stagger delay between items',
    },
    {
      name: 'animateFrom',
      type: "'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'",
      default: "'bottom'",
      description: 'Direction from which items animate in',
    },
    {
      name: 'scaleOnHover',
      type: 'boolean',
      default: 'true',
      description: 'Whether to scale items on hover',
    },
    {
      name: 'hoverScale',
      type: 'number',
      default: '0.95',
      description: 'Scale factor when hovering',
    },
    {
      name: 'blurToFocus',
      type: 'boolean',
      default: 'true',
      description: 'Whether to apply blur effect during animation',
    },
    {
      name: 'colorShiftOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show a color overlay on hover',
    },
  ];

  return (
    <ComponentDetail
      title="Masonry"
      description="A responsive masonry grid layout with smooth GSAP entrance animations and hover effects."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap']}
    />
  );
};

export default MasonryPage;
