import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current || !text) return;
    
    try {
      const words = text.split(' ');

      const newHTML = words
        .map(word => {
          const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
          return `<span
            class="inline-block mx-[2px] select-none ${isHighlighted ? 'text-cyan-500 font-bold' : ''}"
          >
            ${word}
          </span>`;
        })
        .join(' ');

      textRef.current.innerHTML = newHTML;
    } catch (err) {
      console.error('Error setting text HTML:', err);
    }
  }, [text, highlightWords]);

  useEffect(() => {
    try {
      if (trigger === 'auto') {
        setEffectStarted(true);
        return;
      }
      if (trigger === 'scroll' && containerRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setEffectStarted(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
      }
    } catch (err) {
      console.error('Error setting up trigger:', err);
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    try {
      if (!Matter) {
        console.error('Matter.js is not loaded');
        setEffectStarted(false);
        return;
      }

      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

      if (!containerRef.current || !canvasContainerRef.current) {
        console.warn('Container refs not ready');
        setEffectStarted(false);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      if (width <= 0 || height <= 0) {
        console.warn('Invalid container dimensions:', width, height);
        return;
      }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: 1
      }
    });

    // Ensure canvas has proper styling
    if (render.canvas) {
      render.canvas.style.width = '100%';
      render.canvas.style.height = '100%';
      render.canvas.style.display = 'block';
    }

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height - 10, width, 20, boundaryOptions);
    const leftWall = Bodies.rectangle(10, height / 2, 20, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    if (!textRef.current) {
      console.warn('textRef.current is null');
      return;
    }
    const wordSpans = textRef.current.querySelectorAll('span');
    if (wordSpans.length === 0) {
      console.warn('No word spans found');
      return;
    }
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.5,
        frictionAir: 0.02,
        friction: 0.5,
        density: 0.001
      });
      
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);

      return { elem, body, width: rect.width, height: rect.height };
    });

    wordBodies.forEach(({ elem }) => {
      elem.style.position = 'absolute';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let isRunning = true;

    const updateLoop = () => {
      if (!isRunning) return;
      
      wordBodies.forEach(({ body, elem, width, height }) => {
        const { x, y, angle } = body.position;
        elem.style.left = `${x - width / 2}px`;
        elem.style.top = `${y - height / 2}px`;
        elem.style.transform = `rotate(${angle}rad)`;
        elem.style.transformOrigin = 'center center';
      });
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

      return () => {
        try {
          isRunning = false;
          Render.stop(render);
          Runner.stop(runner);
          if (render.canvas && render.canvas.parentNode) {
            render.canvas.parentNode.removeChild(render.canvas);
          }
          World.clear(engine.world, false);
          Engine.clear(engine);
        } catch (err) {
          console.error('Error cleaning up Matter.js:', err);
        }
      };
    } catch (err) {
      console.error('Error initializing Matter.js:', err);
      // Reset state on error
      setEffectStarted(false);
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setEffectStarted(true);
      }, 50);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-pointer overflow-hidden bg-transparent"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{ height: '275px' }}
    >
      <div
        ref={textRef}
        className="relative z-10 pt-2 text-center w-full"
        style={{
          fontSize,
          lineHeight: 1.4,
          visibility: effectStarted ? 'visible' : 'visible'
        }}
      />

      <div 
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
        ref={canvasContainerRef}
        style={{ opacity: effectStarted ? 1 : 0 }}
      />
    </div>
  );
};

export default FallingText;
