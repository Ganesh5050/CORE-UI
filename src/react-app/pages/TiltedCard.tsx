import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import TiltedCard from '../components/effects/TiltedCard';

const TiltedCardPage = () => {
  const [rotateAmplitude, setRotateAmplitude] = useState(12);
  const [scaleOnHover, setScaleOnHover] = useState(1.2);
  const [showTooltip, setShowTooltip] = useState(true);
  const [displayOverlayContent, setDisplayOverlayContent] = useState(true);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  const preview = (
    <div className="h-[600px] w-full flex items-center justify-center bg-[#0d0d0d] rounded-lg overflow-hidden">
      <TiltedCard
        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={rotateAmplitude}
        scaleOnHover={scaleOnHover}
        showMobileWarning={showMobileWarning}
        showTooltip={showTooltip}
        displayOverlayContent={displayOverlayContent}
        overlayContent={
          <p className="tilted-card-demo-text text-white font-bold text-lg absolute bottom-4 left-4 z-10">
            Kendrick Lamar - GNX
          </p>
        }
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Rotate Amplitude ({rotateAmplitude}deg)</label>
          <input
            type="range"
            min="0"
            max="45"
            step="1"
            value={rotateAmplitude}
            onChange={(e) => setRotateAmplitude(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Scale on Hover ({scaleOnHover})</label>
          <input
            type="range"
            min="1"
            max="1.5"
            step="0.05"
            value={scaleOnHover}
            onChange={(e) => setScaleOnHover(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Show Tooltip</label>
          <input
            type="checkbox"
            checked={showTooltip}
            onChange={(e) => setShowTooltip(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Display Overlay Content</label>
          <input
            type="checkbox"
            checked={displayOverlayContent}
            onChange={(e) => setDisplayOverlayContent(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Show Mobile Warning</label>
          <input
            type="checkbox"
            checked={showMobileWarning}
            onChange={(e) => setShowMobileWarning(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import TiltedCard from './TiltedCard';

<TiltedCard
  imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Kendrick Lamar - GNX"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={${rotateAmplitude}}
  scaleOnHover={${scaleOnHover}}
  showMobileWarning={${showMobileWarning}}
  showTooltip={${showTooltip}}
  displayOverlayContent={${displayOverlayContent}}
  overlayContent={
    <p className="tilted-card-demo-text">
      Kendrick Lamar - GNX
    </p>
  }
/>`;

  const codeExample = `import type { SpringOptions } from 'framer-motion';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltedCardProps {
    imageSrc: React.ComponentProps<'img'>['src'];
    altText?: string;
    captionText?: string;
    containerHeight?: React.CSSProperties['height'];
    containerWidth?: React.CSSProperties['width'];
    imageHeight?: React.CSSProperties['height'];
    imageWidth?: React.CSSProperties['width'];
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

export default function TiltedCard({
    imageSrc,
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '300px',
    containerWidth = '100%',
    imageHeight = '300px',
    imageWidth = '300px',
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });

    const [lastY, setLastY] = useState(0);

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d]"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}`;

  const props = [
    {
      name: 'imageSrc',
      type: 'string',
      default: '-',
      description: 'Source URL for the card image',
    },
    {
      name: 'altText',
      type: 'string',
      default: "'Tilted card image'",
      description: 'Alt text for the image',
    },
    {
      name: 'captionText',
      type: 'string',
      default: "''",
      description: 'Text to show in the tooltip',
    },
    {
      name: 'rotateAmplitude',
      type: 'number',
      default: '14',
      description: 'Maximum rotation angle in degrees',
    },
    {
      name: 'scaleOnHover',
      type: 'number',
      default: '1.1',
      description: 'Scale factor when hovering',
    },
    {
      name: 'showTooltip',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the tooltip cursor',
    },
    {
      name: 'displayOverlayContent',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show the overlay content',
    },
    {
      name: 'overlayContent',
      type: 'ReactNode',
      default: 'null',
      description: 'Content to render on top of the image',
    },
  ];

  return (
    <ComponentDetail
      title="Tilted Card"
      description="A 3D tilted card effect that responds to mouse movement, creating a depth perception."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['framer-motion']}
    />
  );
};

export default TiltedCardPage;
