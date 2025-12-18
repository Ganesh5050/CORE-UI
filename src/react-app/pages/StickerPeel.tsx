import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import StickerPeelComponent from '../components/effects/StickerPeel';
import Slider from '../components/Slider';

const StickerPeelPreview = ({
  rotate = 30,
  peelBackHoverPct = 20,
  peelBackActivePct = 40,
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  peelDirection = 0
}: {
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  peelDirection?: number;
}) => {
  return (
    <div className="h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 flex items-center justify-center">
      <div className="text-center mb-8">
        <p className="text-gray-400 text-lg mb-2">Drag the sticker • Hover to peel</p>
      </div>

      <StickerPeelComponent
        imageSrc={stickerSrc}
        width={width}
        rotate={rotate}
        peelBackHoverPct={peelBackHoverPct}
        peelBackActivePct={peelBackActivePct}
        shadowIntensity={shadowIntensity}
        lightingIntensity={lightingIntensity}
        initialPosition="center"
        peelDirection={peelDirection}
      />
    </div>
  );
};

const stickerSrc = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5NSIgZmlsbD0iIzhiNWNmNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxMCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5BbmltYXRpb24gVGlja2VyPC90ZXh0Pgo8L3N2Zz4=";

const codeExample = `// First, install GSAP:
// npm install gsap

import StickerPeel from './StickerPeel'
import logo from './assets/sticker.png'

// Basic usage
<StickerPeel
  imageSrc={logo}
  width={200}
  rotate={30}
  peelBackHoverPct={20}
  peelBackActivePct={40}
  shadowIntensity={0.6}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
/>

// With different peel direction
<StickerPeel
  imageSrc={logo}
  width={150}
  rotate={-15}
  peelDirection={45}
  peelBackHoverPct={30}
  peelBackActivePct={50}
/>`;

const props = [
  {
    name: 'imageSrc',
    type: 'string',
    default: '-',
    description: 'Image source URL for the sticker',
  },
  {
    name: 'rotate',
    type: 'number',
    default: '30',
    description: 'Rotation angle of the sticker in degrees',
  },
  {
    name: 'peelBackHoverPct',
    type: 'number',
    default: '30',
    description: 'Percentage of peel on hover (0-100)',
  },
  {
    name: 'peelBackActivePct',
    type: 'number',
    default: '40',
    description: 'Percentage of peel when active/dragging (0-100)',
  },
  {
    name: 'peelEasing',
    type: 'string',
    default: 'power3.out',
    description: 'GSAP easing function for peel animation',
  },
  {
    name: 'peelHoverEasing',
    type: 'string',
    default: 'power2.out',
    description: 'GSAP easing function for hover peel',
  },
  {
    name: 'width',
    type: 'number',
    default: '200',
    description: 'Width of the sticker in pixels',
  },
  {
    name: 'shadowIntensity',
    type: 'number',
    default: '0.6',
    description: 'Intensity of drop shadow (0-1)',
  },
  {
    name: 'lightingIntensity',
    type: 'number',
    default: '0.1',
    description: 'Intensity of lighting effect (0-1)',
  },
  {
    name: 'initialPosition',
    type: "'center' | 'random' | { x: number; y: number }",
    default: 'center',
    description: 'Initial position of the sticker',
  },
  {
    name: 'peelDirection',
    type: 'number',
    default: '0',
    description: 'Direction of peel in degrees (0-360)',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function StickerPeel() {
  const [rotate, setRotate] = useState(30);
  const [peelBackHoverPct, setPeelBackHoverPct] = useState(20);
  const [peelBackActivePct, setPeelBackActivePct] = useState(40);
  const [width, setWidth] = useState(200);
  const [shadowIntensity, setShadowIntensity] = useState(0.6);
  const [lightingIntensity, setLightingIntensity] = useState(0.1);
  const [peelDirection, setPeelDirection] = useState(0);

  const customization = (
    <div className="space-y-6">
      <Slider
        label="Rotation"
        value={rotate}
        onChange={setRotate}
        min={-180}
        max={180}
        step={5}
        unit="°"
      />

      <Slider
        label="Peel on Hover"
        value={peelBackHoverPct}
        onChange={setPeelBackHoverPct}
        min={0}
        max={50}
        step={5}
        unit="%"
      />

      <Slider
        label="Peel on Active"
        value={peelBackActivePct}
        onChange={setPeelBackActivePct}
        min={0}
        max={60}
        step={5}
        unit="%"
      />

      <Slider
        label="Width"
        value={width}
        onChange={setWidth}
        min={100}
        max={300}
        step={10}
        unit="px"
      />

      <Slider
        label="Shadow Intensity"
        value={shadowIntensity}
        onChange={setShadowIntensity}
        min={0}
        max={1}
        step={0.1}
      />

      <Slider
        label="Lighting Intensity"
        value={lightingIntensity}
        onChange={setLightingIntensity}
        min={0}
        max={0.5}
        step={0.05}
      />

      <Slider
        label="Peel Direction"
        value={peelDirection}
        onChange={setPeelDirection}
        min={0}
        max={360}
        step={15}
        unit="°"
      />
    </div>
  );

  return (
    <ComponentDetail
      title="Sticker Peel"
      description="Draggable sticker with realistic peel effect using GSAP Draggable and SVG filters for lighting and shadows"
      preview={
        <StickerPeelPreview
          rotate={rotate}
          peelBackHoverPct={peelBackHoverPct}
          peelBackActivePct={peelBackActivePct}
          width={width}
          shadowIntensity={shadowIntensity}
          lightingIntensity={lightingIntensity}
          peelDirection={peelDirection}
        />
      }
      code={codeExample}
      props={props}
      customization={customization}
      dependencies={['gsap']}
    />
  );
}
