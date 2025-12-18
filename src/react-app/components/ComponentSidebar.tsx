import { Link, useLocation } from 'react-router';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ComponentCategory {
  title: string;
  items: { name: string; path: string; badge?: string }[];
}

const categories: ComponentCategory[] = [
  {
    title: 'Get Started',
    items: [
      { name: 'Introduction', path: '/get-started/index' },
      { name: 'Installation', path: '/get-started/installation' },
      { name: 'MCP', path: '/get-started/mcp' },
    ],
  },
  {
    title: 'Others',
    items: [
      { name: 'Buttons', path: '/others/buttons' },
      { name: 'Cards', path: '/others/cards' },
      { name: 'Navbars', path: '/others/navbars' },
      { name: 'Overlays', path: '/others/overlays' },
      { name: 'Preloaders', path: '/others/preloaders' },
    ],
  },
  {
    title: 'Text Animations',
    items: [
      { name: 'Split Text', path: '/text-animations/split-text' },
      { name: 'Blur Text', path: '/text-animations/blur-text' },
      { name: 'Circular Text', path: '/text-animations/circular-text' },
      { name: 'Text Type', path: '/text-animations/text-type' },
      { name: 'Shuffle', path: '/text-animations/shuffle', badge: 'New' },
      { name: 'Shiny Text', path: '/text-animations/shiny-text' },
      { name: 'Text Pressure', path: '/text-animations/text-pressure' },
      { name: 'Curved Loop', path: '/text-animations/curved-loop' },
      { name: 'Fuzzy Text', path: '/text-animations/fuzzy-text' },
      { name: 'Gradient Text', path: '/text-animations/gradient-text' },
      { name: 'Falling Text', path: '/text-animations/falling-text' },
      { name: 'Text Cursor', path: '/text-animations/text-cursor' },
      { name: 'Decrypted Text', path: '/text-animations/decrypted-text' },
      { name: 'True Focus', path: '/text-animations/true-focus' },
      { name: 'Scroll Float', path: '/text-animations/scroll-float' },
      { name: 'Scroll Reveal', path: '/text-animations/scroll-reveal' },
      { name: 'ASCII Text', path: '/text-animations/ascii-text' },
      { name: 'Scrambled Text', path: '/text-animations/scrambled-text' },
      { name: 'Rotating Text', path: '/text-animations/rotating-text' },
      { name: 'Glitch Text', path: '/text-animations/glitch-text' },
      { name: 'Scroll Velocity', path: '/text-animations/scroll-velocity' },
      { name: 'Variable Proximity', path: '/text-animations/variable-proximity' },
      { name: 'Count Up', path: '/text-animations/count-up' },
    ],
  },
  {
    title: 'Animations',
    items: [
      { name: 'Animated Content', path: '/animations/animated-content' },
      { name: 'Fade Content', path: '/animations/fade-content' },
      { name: 'Electric Border', path: '/animations/electric-border' },
      { name: 'Pixel Transition', path: '/animations/pixel-transition' },
      { name: 'Glare Hover', path: '/animations/glare-hover' },
      { name: 'Logo Loop', path: '/animations/logo-loop', badge: 'Updated' },
      { name: 'Target Cursor', path: '/animations/target-cursor' },
      { name: 'Laser Flow', path: '/animations/laser-flow', badge: 'New' },
      { name: 'Magnet Lines', path: '/animations/magnet-lines' },
      { name: 'Gradual Blur', path: '/animations/gradual-blur' },
      { name: 'Click Spark', path: '/animations/click-spark' },
      { name: 'Magnet', path: '/animations/magnet' },
      { name: 'Sticker Peel', path: '/animations/sticker-peel' },
      { name: 'Pixel Trail', path: '/animations/pixel-trail' },
      { name: 'Cubes', path: '/animations/cubes' },
      { name: 'Metallic Paint', path: '/animations/metallic-paint' },
      { name: 'Noise', path: '/animations/noise' },
      { name: 'Shape Blur', path: '/animations/shape-blur' },
      { name: 'Crosshair', path: '/animations/crosshair' },
      { name: 'Image Trail', path: '/animations/image-trail' },
      { name: 'Ribbons', path: '/animations/ribbons' },
      { name: 'Splash Cursor', path: '/animations/splash-cursor' },
      { name: 'Meta Balls', path: '/animations/meta-balls' },
      { name: 'Star Border', path: '/animations/star-border' },
    ],
  },
  {
    title: 'Components',
    items: [
      { name: 'Animated List', path: '/components/animated-list' },
      { name: 'Bubble Menu', path: '/components/bubble-menu' },
      { name: 'Magic Bento', path: '/components/magic-bento' },
      { name: 'Circular Gallery', path: '/components/circular-gallery' },
      { name: 'Card Nav', path: '/components/card-nav' },
      { name: 'Stack', path: '/components/stack' },
      { name: 'Pill Nav', path: '/components/pill-nav' },
      { name: 'Tilted Card', path: '/components/tilted-card' },
      { name: 'Masonry', path: '/components/masonry' },
      { name: 'Glass Surface', path: '/components/glass-surface' },
      { name: 'Dome Gallery', path: '/components/dome-gallery' },
      { name: 'Chroma Grid', path: '/components/chroma-grid' },
      { name: 'Folder', path: '/components/folder' },
      { name: 'Staggered Menu', path: '/components/staggered-menu' },
      { name: 'Model Viewer', path: '/components/model-viewer' },
      { name: 'Lanyard', path: '/components/lanyard' },
      { name: 'Dock', path: '/components/dock' },
      { name: 'Gooey Nav', path: '/components/gooey-nav' },
      { name: 'Pixel Card', path: '/components/pixel-card' },
      { name: 'Carousel', path: '/components/carousel' },
      { name: 'Card Swap', path: '/components/card-swap' },
      { name: 'Glass Icons', path: '/components/glass-icons' },
      { name: 'Elastic Slider', path: '/components/elastic-slider' },
      { name: 'Counter', path: '/components/counter' },
      { name: 'Stepper', path: '/components/stepper' },
    ],
  },
  {
    title: 'Backgrounds',
    items: [
      { name: 'Dark Veil', path: '/backgrounds/dark-veil' },
      { name: 'Light Rays', path: '/backgrounds/light-rays' },
      { name: 'Pixel Blast', path: '/backgrounds/pixel-blast', badge: 'New' },
      { name: 'Plasma', path: '/backgrounds/plasma' },
      { name: 'Particles', path: '/backgrounds/particles' },
      { name: 'Lightning', path: '/backgrounds/lightning' },
      { name: 'Dot Grid', path: '/backgrounds/dot-grid' },
      { name: 'Threads', path: '/backgrounds/threads' },
      { name: 'Grid Distortion', path: '/backgrounds/grid-distortion' },
      { name: 'Ballpit', path: '/backgrounds/ballpit' },
      { name: 'Orb', path: '/backgrounds/orb' },
      { name: 'Squares', path: '/backgrounds/squares' },
    ],
  },
];

export default function ComponentSidebar() {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Get Started',
    'Others',
    'Text Animations',
    'Animations',
    'Components',
    'Backgrounds',
  ]);

  // Store scroll position before navigation
  const storeScrollPosition = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem('sidebarScrollPosition', sidebarRef.current.scrollTop.toString());
    }
  };

  // Restore scroll position after component mounts or location changes
  const restoreScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('sidebarScrollPosition');
    if (sidebarRef.current && scrollPosition) {
      setTimeout(() => {
        sidebarRef.current!.scrollTop = parseInt(scrollPosition, 10);
      }, 0);
    }
  };

  useEffect(() => {
    restoreScrollPosition();
  }, [location.pathname]);

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title) ? prev.filter((cat) => cat !== title) : [...prev, title]
    );
  };

  return (
    <aside className="w-72 bg-[#0a0118] border-r border-white/10 flex flex-col h-screen overflow-hidden flex-shrink-0">
      {/* Fixed Header with Logo */}
      <div className="p-6 pb-4 flex-shrink-0 z-20 bg-[#0a0118] border-none">
        <Link to="/" onClick={storeScrollPosition} className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            alt="Core UI Logo"
            className="w-11 h-11 object-contain transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
          />
          <span className="text-sm font-semibold text-white">Core UI</span>
        </Link>
      </div>

      {/* Scrollable Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Top Fade */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0a0118] to-transparent z-10 pointer-events-none" />

        {/* Scroll Container */}
        <div
          ref={sidebarRef}
          className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-4 pb-20 pt-2"
        >
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <div key={category.title} className="mb-2">
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="flex items-center justify-between w-full text-xs font-bold text-white uppercase tracking-wider mb-2 hover:text-gray-300 transition-colors py-2 px-2"
                >
                  {category.title}
                  {expandedCategories.includes(category.title) ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>

                {expandedCategories.includes(category.title) && (
                  <div className="flex flex-col">
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.path;

                      return (
                        <div key={item.path} className="flex flex-col">
                          {/* Ruler Ticks before item to create density */}
                          <span className="block h-[1px] w-[24px] bg-white/5 ml-[2px] mb-1"></span>
                          <span className="block h-[1px] w-[24px] bg-white/5 ml-[2px] mb-1"></span>

                          <Link
                            to={item.path}
                            onClick={storeScrollPosition}
                            className="group flex items-center gap-3 py-1"
                          >
                            {/* Ruler Line */}
                            <span
                              className={`
                                inline-block h-[1px] transition-all duration-300 ease-out
                                ${isActive ? 'w-[48px] bg-orange-500' : 'w-[32px] bg-white/20 group-hover:bg-orange-400 group-hover:w-[40px]'}
                              `}
                            />

                            {/* Text */}
                            <span className={`
                              text-sm whitespace-nowrap transition-all duration-300
                              ${isActive
                                ? 'text-orange-400 font-medium translate-x-1 opacity-100'
                                : 'text-gray-400 opacity-60 group-hover:text-orange-300 group-hover:opacity-100 group-hover:translate-x-1'
                              }
                            `}>
                              {item.name}
                              {item.badge && (
                                <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-orange-500/20 text-orange-300' : 'bg-white/10 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-orange-300'}`}>
                                  {item.badge}
                                </span>
                              )}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0118] via-[#0a0118]/80 to-transparent z-10 pointer-events-none" />
      </div>
    </aside>
  );
}
