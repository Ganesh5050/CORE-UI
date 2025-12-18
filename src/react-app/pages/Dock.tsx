import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Dock from '../components/effects/Dock';
import { Home, Archive, User, Settings, Mail, Calendar, Music, Camera } from 'lucide-react';

const DockPage = () => {
  const [panelHeight, setPanelHeight] = useState(68);
  const [baseItemSize, setBaseItemSize] = useState(50);
  const [magnification, setMagnification] = useState(70);
  const [distance, setDistance] = useState(200);
  const [mass, setMass] = useState(0.1);
  const [stiffness, setStiffness] = useState(150);
  const [damping, setDamping] = useState(12);

  const items = [
    { icon: <Home size={18} color="#fff" />, label: 'Home', onClick: () => { } },
    { icon: <Archive size={18} color="#fff" />, label: 'Archive', onClick: () => { } },
    { icon: <User size={18} color="#fff" />, label: 'Profile', onClick: () => { } },
    { icon: <Mail size={18} color="#fff" />, label: 'Mail', onClick: () => { } },
    { icon: <Calendar size={18} color="#fff" />, label: 'Calendar', onClick: () => { } },
    { icon: <Music size={18} color="#fff" />, label: 'Music', onClick: () => { } },
    { icon: <Camera size={18} color="#fff" />, label: 'Camera', onClick: () => { } },
    { icon: <Settings size={18} color="#fff" />, label: 'Settings', onClick: () => { } },
  ];

  const preview = (
    <div className="h-[400px] w-full relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex items-end justify-center pb-10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <Dock
        items={items}
        panelHeight={panelHeight}
        baseItemSize={baseItemSize}
        magnification={magnification}
        distance={distance}
        spring={{ mass, stiffness, damping }}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Panel Height ({panelHeight}px)</label>
          <input
            type="range"
            min="40"
            max="100"
            step="1"
            value={panelHeight}
            onChange={(e) => setPanelHeight(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Base Item Size ({baseItemSize}px)</label>
          <input
            type="range"
            min="30"
            max="80"
            step="1"
            value={baseItemSize}
            onChange={(e) => setBaseItemSize(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Magnification ({magnification}px)</label>
          <input
            type="range"
            min="50"
            max="150"
            step="1"
            value={magnification}
            onChange={(e) => setMagnification(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Distance ({distance}px)</label>
          <input
            type="range"
            min="50"
            max="400"
            step="10"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-2">Spring Physics</h4>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Mass ({mass})</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stiffness ({stiffness})</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={stiffness}
            onChange={(e) => setStiffness(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Damping ({damping})</label>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={damping}
            onChange={(e) => setDamping(parseInt(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import Dock from './Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';

const items = [
  { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
];

<Dock 
  items={items}
  panelHeight={${panelHeight}}
  baseItemSize={${baseItemSize}}
  magnification={${magnification}}
  distance={${distance}}
  spring={{ mass: ${mass}, stiffness: ${stiffness}, damping: ${damping} }}
/>`;

  const codeExample = `'use client';

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
    distance?: number;
    panelHeight?: number;
    baseItemSize?: number;
    dockHeight?: number;
    magnification?: number;
    spring?: SpringOptions;
};

type DockItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    mouseX: MotionValue<number>;
    spring: SpringOptions;
    distance: number;
    baseItemSize: number;
    magnification: number;
};

function DockItem({
    children,
    className = '',
    onClick,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize
}: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={\`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md \${className}\`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child =>
                React.isValidElement(child)
                    ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
                    : child
            )}
        </motion.div>
    );
}

type DockLabelProps = {
    className?: string;
    children: React.ReactNode;
    isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={\`\${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white\`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

type DockIconProps = {
    className?: string;
    children: React.ReactNode;
    isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
    return <div className={\`flex items-center justify-center \${className}\`}>{children}</div>;
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 64,
    dockHeight = 256,
    baseItemSize = 50
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification]);
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={\`\${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4\`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
`;

  const props = [
    {
      name: 'items',
      type: 'DockItemData[]',
      default: '[]',
      description: 'Array of items to display in the dock',
    },
    {
      name: 'panelHeight',
      type: 'number',
      default: '64',
      description: 'Height of the dock panel',
    },
    {
      name: 'baseItemSize',
      type: 'number',
      default: '50',
      description: 'Size of items when not hovered',
    },
    {
      name: 'magnification',
      type: 'number',
      default: '70',
      description: 'Size of items when fully magnified',
    },
    {
      name: 'distance',
      type: 'number',
      default: '200',
      description: 'Distance of influence for magnification',
    },
    {
      name: 'spring',
      type: 'SpringOptions',
      default: '{ mass: 0.1, stiffness: 150, damping: 12 }',
      description: 'Spring physics configuration',
    },
  ];

  return (
    <ComponentDetail
      title="Dock"
      description="A macOS-style dock with magnification effect on hover, built with Motion."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['motion']}
    />
  );
};

export default DockPage;