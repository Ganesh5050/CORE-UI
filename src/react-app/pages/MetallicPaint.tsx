import { useState, useEffect } from 'react';
import ComponentDetail from './ComponentDetail';
import MetallicPaint, { parseLogoImage } from '../components/effects/MetallicPaint';
import Slider from '../components/Slider';

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDMwMCIgd2lkdGg9IjEwMDAiIGhlaWdodD0iMzAwIj4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIwIiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSJibGFjayIgbGV0dGVyLXNwYWNpbmc9Ii0yIj5BbmltYXRlZCBQYWludDwvdGV4dD4KPC9zdmc+";

const MetallicPaintPreview = ({
  edge = 0.2,
  patternBlur = 0.005,
  patternScale = 2,
  refraction = 0.015,
  speed = 0.3,
  liquid = 0.02
}: {
  edge?: number;
  patternBlur?: number;
  patternScale?: number;
  refraction?: number;
  speed?: number;
  liquid?: number;
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logoSrc);
        const blob = await response.blob();
        const file = new File([blob], "default.svg", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);

      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div className="h-[500px] w-full bg-black flex items-center justify-center overflow-hidden rounded-lg border border-gray-800">
      {imageData ? (
        <div style={{ width: '100%', height: '100%' }}>
          <MetallicPaint
            imageData={imageData}
            params={{ edge, patternBlur, patternScale, refraction, speed, liquid }}
          />
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

const codeExample = `import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { useState, useEffect } from 'react';
import logo from './logo.svg'; // Your black-filled SVG

const Component = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);

      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MetallicPaint 
        imageData={imageData ?? new ImageData(1, 1)} 
        params={{ 
          edge: 2, 
          patternBlur: 0.005, 
          patternScale: 2, 
          refraction: 0.015, 
          speed: 0.3, 
          liquid: 0.07 
        }} 
      />
    </div>
  );
}`;

const props = [
  {
    name: 'imageData',
    type: 'ImageData',
    default: '-',
    description: 'Parsed image data from parseLogoImage utility',
  },
  {
    name: 'params',
    type: 'object',
    default: 'defaultParams',
    description: 'Configuration object for the shader',
  },
];

export default function MetallicPaintPage() {
  const [edge, setEdge] = useState(0.2);
  const [patternBlur, setPatternBlur] = useState(0.005);
  const [patternScale, setPatternScale] = useState(2);
  const [refraction, setRefraction] = useState(0.015);
  const [speed, setSpeed] = useState(0.3);
  const [liquid, setLiquid] = useState(0.02);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Edge"
        value={edge}
        onChange={setEdge}
        min={0}
        max={10}
        step={0.1}
      />

      <Slider
        label="Pattern Blur"
        value={patternBlur}
        onChange={setPatternBlur}
        min={0}
        max={0.1}
        step={0.001}
      />

      <Slider
        label="Pattern Scale"
        value={patternScale}
        onChange={setPatternScale}
        min={0.1}
        max={10}
        step={0.1}
      />

      <Slider
        label="Refraction"
        value={refraction}
        onChange={setRefraction}
        min={0}
        max={0.1}
        step={0.001}
      />

      <Slider
        label="Speed"
        value={speed}
        onChange={setSpeed}
        min={0}
        max={2}
        step={0.1}
      />

      <Slider
        label="Liquid"
        value={liquid}
        onChange={setLiquid}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Metallic Paint"
      description="A WebGL shader effect that creates a metallic liquid animation within a shape"
      preview={
        <MetallicPaintPreview
          edge={edge}
          patternBlur={patternBlur}
          patternScale={patternScale}
          refraction={refraction}
          speed={speed}
          liquid={liquid}
        />
      }
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={[]}
    />
  );
}
