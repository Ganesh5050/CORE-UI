import { useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import ScrollFloat from '@/react-app/components/text/ScrollFloat';

const ScrollFloatPreview = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-[500px] overflow-y-auto bg-black/20 rounded-lg"
    >
      <div className="min-h-[1800px] flex flex-col items-center pt-32 space-y-96">
        <div className="text-center">
          <p className="text-gray-400 mb-12 text-sm">Scroll Down ↓</p>
          <ScrollFloat
            scrollContainerRef={scrollContainerRef}
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='top bottom'
            scrollEnd='bottom top'
            stagger={0.03}
          >
            Hello World
          </ScrollFloat>
        </div>

        <div className="text-center">
          <ScrollFloat
            scrollContainerRef={scrollContainerRef}
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='top bottom'
            scrollEnd='bottom top'
            stagger={0.03}
            textClassName="text-[clamp(1.2rem,3vw,2rem)]"
          >
            You can see this is the scroller
          </ScrollFloat>
        </div>
      </div>
    </div>
  );
};

const usageExample = `import ScrollFloat from './ScrollFloat';

<ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  React Bits
</ScrollFloat>`;

const codeExample = `import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | HTMLDivElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="inline-block word" key={index}>
        {char === ' ' ? '\\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.inline-block');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={\`my-5 overflow-hidden \${containerClassName}\`}>
      <span className={\`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] \${textClassName}\`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;`;

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
    name: 'containerClassName',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the container element',
  },
  {
    name: 'textClassName',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes for the text span',
  },
  {
    name: 'animationDuration',
    type: 'number',
    default: '1',
    description: 'Duration of the animation in seconds',
  },
  {
    name: 'ease',
    type: 'string',
    default: "'back.inOut(2)'",
    description: 'GSAP easing function for the animation',
  },
  {
    name: 'scrollStart',
    type: 'string',
    default: "'center bottom+=50%'",
    description: 'ScrollTrigger start position',
  },
  {
    name: 'scrollEnd',
    type: 'string',
    default: "'bottom bottom-=40%'",
    description: 'ScrollTrigger end position',
  },
  {
    name: 'stagger',
    type: 'number',
    default: '0.03',
    description: 'Stagger delay between each character animation',
  },
];

export default function ScrollFloatPage() {
  return (
    <ComponentDetail
      title="Scroll Float"
      description="Text that animates character by character on scroll with a floating effect"
      preview={<ScrollFloatPreview />}
      code={codeExample}
      usage={usageExample}
      props={props}
      dependencies={['gsap']}
    />
  );
}
