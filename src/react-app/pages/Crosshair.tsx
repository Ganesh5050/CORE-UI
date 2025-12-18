import { useRef, useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Crosshair from '../components/effects/Crosshair';

const CrosshairPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('#ffffff');

  return (
    <div
      ref={containerRef}
      className="h-[500px] w-full bg-black flex items-center justify-center overflow-hidden rounded-lg border border-gray-800 relative cursor-none"
    >
      <div className="flex flex-col items-center gap-8 z-10">
        <h1 className="text-4xl font-bold text-white tracking-wider">
          CROSSHAIR CURSOR
        </h1>
        <div className="flex gap-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
            Hover Me
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
            Turbulence
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
            Effect
          </a>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setColor('#ffffff')}
            className={`w-8 h-8 rounded-full border-2 ${color === '#ffffff' ? 'border-blue-500' : 'border-transparent'}`}
            style={{ backgroundColor: '#ffffff' }}
          />
          <button
            onClick={() => setColor('#ff0000')}
            className={`w-8 h-8 rounded-full border-2 ${color === '#ff0000' ? 'border-blue-500' : 'border-transparent'}`}
            style={{ backgroundColor: '#ff0000' }}
          />
          <button
            onClick={() => setColor('#00ff00')}
            className={`w-8 h-8 rounded-full border-2 ${color === '#00ff00' ? 'border-blue-500' : 'border-transparent'}`}
            style={{ backgroundColor: '#00ff00' }}
          />
          <button
            onClick={() => setColor('#0000ff')}
            className={`w-8 h-8 rounded-full border-2 ${color === '#0000ff' ? 'border-blue-500' : 'border-transparent'}`}
            style={{ backgroundColor: '#0000ff' }}
          />
        </div>
      </div>

      <Crosshair containerRef={containerRef} color={color} />
    </div>
  );
};

const codeExample = `import React, { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const getMousePos = (e: Event, container?: HTMLElement | null): { x: number; y: number } => {
  const mouseEvent = e as MouseEvent;
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - bounds.left,
      y: mouseEvent.clientY - bounds.top
    };
  }
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement>;
}

const Crosshair: React.FC<CrosshairProps> = ({ color = 'white', containerRef = null }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  let mouse = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = (ev: Event) => {
      const mouseEvent = ev as MouseEvent;
      mouse = getMousePos(mouseEvent, containerRef?.current);
      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          mouseEvent.clientX < bounds.left ||
          mouseEvent.clientX > bounds.right ||
          mouseEvent.clientY < bounds.top ||
          mouseEvent.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 1 });
        }
      }
    };

    const target: HTMLElement | Window = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove);

    const renderedStyles: {
      [key: string]: { previous: number; current: number; amt: number };
    } = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });

    const onMouseMove = (_ev: Event) => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      requestAnimationFrame(render);

      target.removeEventListener('mousemove', onMouseMove);
    };

    target.addEventListener('mousemove', onMouseMove);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) {
            lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';
          }
          if (lineVerticalRef.current) {
            lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = 'none';
            lineVerticalRef.current.style.filter = 'none';
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0
      });

    const enter = () => tl.restart();
    const leave = () => {
      tl.progress(1).kill();
    };

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        const style = renderedStyles[key];
        style.previous = lerp(style.previous, style.current, style.amt);
      }

      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      requestAnimationFrame(render);
    };

    const links: NodeListOf<HTMLAnchorElement> = containerRef?.current
      ? containerRef.current.querySelectorAll('a')
      : document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
    });

    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mousemove', onMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      });
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className={\`\${containerRef ? 'absolute' : 'fixed'} top-0 left-0 w-full h-full pointer-events-none z-[10000]\`}
    >
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        className={\`absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2\`}
        style={{ background: color }}
      ></div>
      <div
        ref={lineVerticalRef}
        className={\`absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2\`}
        style={{ background: color }}
      ></div>
    </div>
  );
};

export default Crosshair;`;

const props = [
  {
    name: 'color',
    type: 'string',
    default: "'white'",
    description: 'Color of the crosshair lines',
  },
  {
    name: 'containerRef',
    type: 'RefObject<HTMLElement>',
    default: 'null',
    description: 'Reference to the container element. If not provided, defaults to window.',
  },
];

export default function CrosshairPage() {
  return (
    <ComponentDetail
      title="Crosshair"
      description="A custom cursor effect that displays crosshair lines following the mouse, with a turbulence distortion effect when hovering over links."
      preview={<CrosshairPreview />}
      code={codeExample}
      props={props}
      dependencies={['gsap']}
    />
  );
}
