import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import BubbleMenu from '../components/effects/BubbleMenu';

const BubbleMenuPage = () => {
  const [menuBg, setMenuBg] = useState('#ffffff');
  const [menuContentColor, setMenuContentColor] = useState('#111111');
  const [animationEase, setAnimationEase] = useState('back.out(1.5)');
  const [animationDuration, setAnimationDuration] = useState(0.5);
  const [staggerDelay, setStaggerDelay] = useState(0.12);

  const items = [
    {
      label: 'home',
      href: '#',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
      label: 'about',
      href: '#',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
      label: 'projects',
      href: '#',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
      label: 'blog',
      href: '#',
      ariaLabel: 'Blog',
      rotation: 8,
      hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    }
  ];

  const preview = (
    <div className="relative h-[600px] w-full bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
      <BubbleMenu
        logo={<span style={{ fontWeight: 700, fontSize: '1.5rem' }}>RB</span>}
        items={items}
        menuAriaLabel="Toggle navigation"
        menuBg={menuBg}
        menuContentColor={menuContentColor}
        useFixedPosition={false}
        animationEase={animationEase}
        animationDuration={animationDuration}
        staggerDelay={staggerDelay}
      />
      <div className="absolute bottom-10 left-0 right-0 text-center text-gray-500 pointer-events-none">
        Click the menu button to see the animation
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Menu Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={menuBg}
              onChange={(e) => setMenuBg(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{menuBg}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Content Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={menuContentColor}
              onChange={(e) => setMenuContentColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{menuContentColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Animation Duration ({animationDuration}s)</label>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stagger Delay ({staggerDelay}s)</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={staggerDelay}
            onChange={(e) => setStaggerDelay(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Easing</label>
          <select
            value={animationEase}
            onChange={(e) => setAnimationEase(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="back.out(1.5)">back.out(1.5)</option>
            <option value="power1.out">power1.out</option>
            <option value="power2.out">power2.out</option>
            <option value="power3.out">power3.out</option>
            <option value="elastic.out(1, 0.3)">elastic.out</option>
            <option value="bounce.out">bounce.out</option>
          </select>
        </div>
      </div>
    </div>
  );

  const usageCode = `import BubbleMenu from './BubbleMenu'

const items = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  // ... more items
];

<BubbleMenu
  logo={<span style={{ fontWeight: 700 }}>RB</span>}
  items={items}
  menuBg="${menuBg}"
  menuContentColor="${menuContentColor}"
  animationEase="${animationEase}"
  animationDuration={${animationDuration}}
  staggerDelay={${staggerDelay}}
/>`;

  const codeExample = `import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type MenuItem = {
    label: string;
    href: string;
    ariaLabel?: string;
    rotation?: number;
    hoverStyles?: {
        bgColor?: string;
        textColor?: string;
    };
};

export type BubbleMenuProps = {
    logo: ReactNode | string;
    onMenuClick?: (open: boolean) => void;
    className?: string;
    style?: CSSProperties;
    menuAriaLabel?: string;
    menuBg?: string;
    menuContentColor?: string;
    useFixedPosition?: boolean;
    items?: MenuItem[];
    animationEase?: string;
    animationDuration?: number;
    staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
    {
        label: 'home',
        href: '#',
        ariaLabel: 'Home',
        rotation: -8,
        hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
        label: 'about',
        href: '#',
        ariaLabel: 'About',
        rotation: 8,
        hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
        label: 'projects',
        href: '#',
        ariaLabel: 'Documentation',
        rotation: 8,
        hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
        label: 'blog',
        href: '#',
        ariaLabel: 'Blog',
        rotation: 8,
        hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
    },
    {
        label: 'contact',
        href: '#',
        ariaLabel: 'Contact',
        rotation: -8,
        hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    }
];

export default function BubbleMenu({
    logo,
    onMenuClick,
    className,
    style,
    menuAriaLabel = 'Toggle menu',
    menuBg = '#fff',
    menuContentColor = '#111',
    useFixedPosition = false,
    items,
    animationEase = 'back.out(1.5)',
    animationDuration = 0.5,
    staggerDelay = 0.12
}: BubbleMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<HTMLAnchorElement[]>([]);
    const labelRefs = useRef<HTMLSpanElement[]>([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;

    const containerClassName = [
        'bubble-menu',
        useFixedPosition ? 'fixed' : 'absolute',
        'left-0 right-0 top-8',
        'flex items-center justify-between',
        'gap-4 px-8',
        'pointer-events-none',
        'z-[1001]',
        className
    ]
        .filter(Boolean)
        .join(' ');

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.set(overlay, { display: 'flex' });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 24, autoAlpha: 0 });

            bubbles.forEach((bubble, i) => {
                const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
                const tl = gsap.timeline({ delay });
                tl.to(bubble, {
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase
                });
                if (labels[i]) {
                    tl.to(
                        labels[i],
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: animationDuration,
                            ease: 'power3.out'
                        },
                        '-=' + animationDuration * 0.9
                    );
                }
            });
        } else if (showOverlay) {
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.to(labels, {
                y: 24,
                autoAlpha: 0,
                duration: 0.2,
                ease: 'power3.in'
            });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.2,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    setShowOverlay(false);
                }
            });
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                const bubbles = bubblesRef.current.filter(Boolean);
                const isDesktop = window.innerWidth >= 900;
                bubbles.forEach((bubble, i) => {
                    const item = menuItems[i];
                    if (bubble && item) {
                        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
                        gsap.set(bubble, { rotation });
                    }
                });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen, menuItems]);

    return (
        <>
            {/* Workaround for silly Tailwind capabilities */}
            <style>{\`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      \`}</style>

            <nav className={containerClassName} style={style} aria-label="Main navigation">
                <div
                    className={[
                        'bubble logo-bubble',
                        'inline-flex items-center justify-center',
                        'rounded-full',
                        'bg-white',
                        'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
                        'pointer-events-auto',
                        'h-12 md:h-14',
                        'px-4 md:px-8',
                        'gap-2',
                        'will-change-transform'
                    ].join(' ')}
                    aria-label="Logo"
                    style={{
                        background: menuBg,
                        minHeight: '48px',
                        borderRadius: '9999px'
                    }}
                >
                    <span
                        className={['logo-content', 'inline-flex items-center justify-center', 'w-[120px] h-full'].join(' ')}
                        style={
                            {
                                ['--logo-max-height']: '60%',
                                ['--logo-max-width']: '100%'
                            } as CSSProperties
                        }
                    >
                        {typeof logo === 'string' ? (
                            <img src={logo} alt="Logo" className="bubble-logo max-h-[60%] max-w-full object-contain block" />
                        ) : (
                            logo
                        )}
                    </span>
                </div>

                <button
                    type="button"
                    className={[
                        'bubble toggle-bubble menu-btn',
                        isMenuOpen ? 'open' : '',
                        'inline-flex flex-col items-center justify-center',
                        'rounded-full',
                        'bg-white',
                        'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
                        'pointer-events-auto',
                        'w-12 h-12 md:w-14 md:h-14',
                        'border-0 cursor-pointer p-0',
                        'will-change-transform'
                    ].join(' ')}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{ background: menuBg }}
                >
                    <span
                        className="menu-line block mx-auto rounded-[2px]"
                        style={{
                            width: 26,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
                        }}
                    />
                    <span
                        className="menu-line short block mx-auto rounded-[2px]"
                        style={{
                            marginTop: '6px',
                            width: 26,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
                        }}
                    />
                </button>
            </nav>

            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={[
                        'bubble-menu-items',
                        useFixedPosition ? 'fixed' : 'absolute',
                        'inset-0',
                        'flex items-center justify-center',
                        'pointer-events-none',
                        'z-[1000]'
                    ].join(' ')}
                    aria-hidden={!isMenuOpen}
                >
                    <ul
                        className={[
                            'pill-list',
                            'list-none m-0 px-6',
                            'w-full max-w-[1600px] mx-auto',
                            'flex flex-wrap',
                            'gap-x-0 gap-y-1',
                            'pointer-events-auto'
                        ].join(' ')}
                        role="menu"
                        aria-label="Menu links"
                    >
                        {menuItems.map((item, idx) => (
                            <li
                                key={idx}
                                role="none"
                                className={[
                                    'pill-col',
                                    'flex justify-center items-stretch',
                                    '[flex:0_0_calc(100%/3)]',
                                    'box-border'
                                ].join(' ')}
                            >
                                <a
                                    role="menuitem"
                                    href={item.href}
                                    aria-label={item.ariaLabel || item.label}
                                    className={[
                                        'pill-link',
                                        'w-full',
                                        'rounded-[999px]',
                                        'no-underline',
                                        'bg-white',
                                        'text-inherit',
                                        'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',
                                        'flex items-center justify-center',
                                        'relative',
                                        'transition-[background,color] duration-300 ease-in-out',
                                        'box-border',
                                        'whitespace-nowrap overflow-hidden'
                                    ].join(' ')}
                                    style={
                                        {
                                            ['--item-rot']: \`\${item.rotation ?? 0}deg\`,
                                            ['--pill-bg']: menuBg,
                                            ['--pill-color']: menuContentColor,
                                            ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                                            ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                                            background: 'var(--pill-bg)',
                                            color: 'var(--pill-color)',
                                            minHeight: 'var(--pill-min-h, 160px)',
                                            padding: 'clamp(1.5rem, 3vw, 8rem) 0',
                                            fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                                            fontWeight: 400,
                                            lineHeight: 0,
                                            willChange: 'transform',
                                            height: 10
                                        } as CSSProperties
                                    }
                                    ref={el => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                                    <span
                                        className="pill-label inline-block"
                                        style={{
                                            willChange: 'transform, opacity',
                                            height: '1.2em',
                                            lineHeight: 1.2
                                        }}
                                        ref={el => {
                                            if (el) labelRefs.current[idx] = el;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
`;

  const props = [
    {
      name: 'logo',
      type: 'ReactNode | string',
      default: '-',
      description: 'Logo to display (can be an image URL or React component)',
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      default: 'DEFAULT_ITEMS',
      description: 'Array of menu items with labels, links, and hover styles',
    },
    {
      name: 'menuBg',
      type: 'string',
      default: "'#fff'",
      description: 'Background color for menu bubbles',
    },
    {
      name: 'menuContentColor',
      type: 'string',
      default: "'#111'",
      description: 'Text color for menu content',
    },
    {
      name: 'animationEase',
      type: 'string',
      default: "'back.out(1.5)'",
      description: 'GSAP easing function for animations',
    },
    {
      name: 'animationDuration',
      type: 'number',
      default: '0.5',
      description: 'Duration of bubble animations in seconds',
    },
    {
      name: 'staggerDelay',
      type: 'number',
      default: '0.12',
      description: 'Delay between each bubble animation',
    },
  ];

  return (
    <ComponentDetail
      title="Bubble Menu"
      description="Interactive bubble-style navigation menu with GSAP animations and pill-shaped links"
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['gsap']}
    />
  );
};

export default BubbleMenuPage;
