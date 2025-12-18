import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import BlobCursorComponent from '../components/effects/BlobCursor';
import Slider from '../components/Slider';

const BlobCursorPreview = ({
  trailCount = 3,
  useFilter = true,
  blobType = 'circle'
}: {
  trailCount?: number;
  useFilter?: boolean;
  blobType?: 'circle' | 'square';
}) => {
  return (
    <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      <BlobCursorComponent
        blobType={blobType}
        fillColor="#5227FF"
        trailCount={trailCount}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={useFilter}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-400">Move your mouse to see the blob cursor</p>
      </div>
    </div>
  );
};

const usageCode = `import BlobCursor from './BlobCursor';

<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>`;

const codeExample = `'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative top-0 left-0 w-full h-full"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}`;

const props = [
  {
    name: 'blobType',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Shape of the blob cursor',
  },
  {
    name: 'fillColor',
    type: 'string',
    default: '#5227FF',
    description: 'Fill color of the blob',
  },
  {
    name: 'trailCount',
    type: 'number',
    default: '3',
    description: 'Number of trailing blobs',
  },
  {
    name: 'sizes',
    type: 'number[]',
    default: '[60, 125, 75]',
    description: 'Array of blob sizes in pixels',
  },
  {
    name: 'innerSizes',
    type: 'number[]',
    default: '[20, 35, 25]',
    description: 'Array of inner blob sizes in pixels',
  },
  {
    name: 'innerColor',
    type: 'string',
    default: 'rgba(255,255,255,0.8)',
    description: 'Color of the inner blob',
  },
  {
    name: 'opacities',
    type: 'number[]',
    default: '[0.6, 0.6, 0.6]',
    description: 'Array of opacity values for each blob',
  },
  {
    name: 'shadowColor',
    type: 'string',
    default: 'rgba(0,0,0,0.75)',
    description: 'Color of the blob shadow',
  },
  {
    name: 'shadowBlur',
    type: 'number',
    default: '5',
    description: 'Blur radius of the shadow',
  },
  {
    name: 'shadowOffsetX',
    type: 'number',
    default: '10',
    description: 'Horizontal offset of the shadow',
  },
  {
    name: 'shadowOffsetY',
    type: 'number',
    default: '10',
    description: 'Vertical offset of the shadow',
  },
  {
    name: 'filterStdDeviation',
    type: 'number',
    default: '30',
    description: 'Standard deviation for SVG Gaussian blur filter',
  },
  {
    name: 'useFilter',
    type: 'boolean',
    default: 'true',
    description: 'Whether to apply SVG filter effect',
  },
  {
    name: 'fastDuration',
    type: 'number',
    default: '0.1',
    description: 'Animation duration for lead blob in seconds',
  },
  {
    name: 'slowDuration',
    type: 'number',
    default: '0.5',
    description: 'Animation duration for trailing blobs in seconds',
  },
  {
    name: 'fastEase',
    type: 'string',
    default: 'power3.out',
    description: 'GSAP easing for lead blob',
  },
  {
    name: 'slowEase',
    type: 'string',
    default: 'power1.out',
    description: 'GSAP easing for trailing blobs',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: '100',
    description: 'Z-index of the cursor container',
  },
];

export default function BlobCursor() {
  const [trailCount, setTrailCount] = useState(3);
  const [useFilter, setUseFilter] = useState(true);
  const [blobType, setBlobType] = useState<'circle' | 'square'>('circle');

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Trail Count"
        value={trailCount}
        min={1}
        max={5}
        step={1}
        onChange={setTrailCount}
      />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Use SVG Filter</label>
        <button
          onClick={() => setUseFilter(!useFilter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${useFilter ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
        >
          {useFilter ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Blob Type</label>
        <div className="flex gap-2">
          <button
            onClick={() => setBlobType('circle')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${blobType === 'circle' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
          >
            Circle
          </button>
          <button
            onClick={() => setBlobType('square')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${blobType === 'square' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
          >
            Square
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ComponentDetail
      title="Blob Cursor"
      description="Smooth blob cursor with multiple trailing elements and SVG filter effects using GSAP"
      preview={<BlobCursorPreview trailCount={trailCount} useFilter={useFilter} blobType={blobType} />}
      code={codeExample}
      usage={usageCode}
      props={props}
      customization={customization}
      dependencies={['gsap']}
    />
  );
}
