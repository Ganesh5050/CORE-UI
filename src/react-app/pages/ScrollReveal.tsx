import { useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import ScrollReveal from '@/react-app/components/text/ScrollReveal';

const ScrollRevealPreview = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-[500px] overflow-y-auto bg-black/20 rounded-lg"
    >
      <div className="min-h-[1800px] flex flex-col items-center pt-32 space-y-96">
        <div className="text-center px-8">
          <p className="text-gray-400 mb-12 text-sm">Scroll Down ↓</p>
          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!
          </ScrollReveal>
        </div>

        <div className="text-center px-8">
          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={8}
          >
            Scroll animations make your content come alive with smooth transitions and engaging effects.
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

const usageExample = `import ScrollReveal from './ScrollReveal';

<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>`;

const codeExample = `import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | HTMLDivElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\\s+)/).map((word, index) => {
      if (word.match(/^\\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: \`blur(\${blurStrength}px)\` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={\`my-5 \${containerClassName}\`}>
      <p className={\`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold \${textClassName}\`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'The text content to animate',
  },
  {
    name: 'scrollContainerRef',
    type: 'RefObject<HTMLElement>',
    default: 'window',
    description: 'Optional ref to a scroll container element',
  },
  {
    name: 'enableBlur',
    type: 'boolean',
    default: 'true',
    description: 'Enable blur effect during animation',
  },
  {
    name: 'baseOpacity',
    type: 'number',
    default: '0.1',
    description: 'Starting opacity of words (0-1)',
  },
  {
    name: 'baseRotation',
    type: 'number',
    default: '3',
    description: 'Initial rotation angle in degrees',
  },
  {
    name: 'blurStrength',
    type: 'number',
    default: '4',
    description: 'Blur intensity in pixels',
  },
  {
    name: 'containerClassName',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the container element',
  },
  {
    name: 'textClassName',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the text element',
  },
  {
    name: 'rotationEnd',
    type: 'string',
    default: "'bottom bottom'",
    description: 'ScrollTrigger end position for rotation animation',
  },
  {
    name: 'wordAnimationEnd',
    type: 'string',
    default: "'bottom bottom'",
    description: 'ScrollTrigger end position for word animations',
  },
];

export default function ScrollRevealPage() {
  return (
    <ComponentDetail
      title="Scroll Reveal"
      description="Text that reveals word by word on scroll with blur and rotation effects"
      preview={<ScrollRevealPreview />}
      code={codeExample}
      usage={usageExample}
      props={props}
      dependencies={['gsap']}
    />
  );
}
