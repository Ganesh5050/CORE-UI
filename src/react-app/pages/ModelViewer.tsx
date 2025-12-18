import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import ModelViewer from '../components/effects/ModelViewer';

const ModelViewerPage = () => {
  const [url, setUrl] = useState('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb');
  const [autoRotate, setAutoRotate] = useState(false);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.35);
  const [enableMouseParallax, setEnableMouseParallax] = useState(true);
  const [enableManualRotation, setEnableManualRotation] = useState(true);
  const [enableHoverRotation, setEnableHoverRotation] = useState(true);
  const [enableManualZoom, setEnableManualZoom] = useState(true);
  const [environmentPreset, setEnvironmentPreset] = useState<'city' | 'sunset' | 'night' | 'dawn' | 'studio' | 'apartment' | 'forest' | 'park' | 'none'>('forest');
  const [showScreenshotButton, setShowScreenshotButton] = useState(true);

  const preview = (
    <div className="h-[500px] w-full relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <ModelViewer
        url={url}
        width="100%"
        height="100%"
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableMouseParallax={enableMouseParallax}
        enableManualRotation={enableManualRotation}
        enableHoverRotation={enableHoverRotation}
        enableManualZoom={enableManualZoom}
        environmentPreset={environmentPreset}
        showScreenshotButton={showScreenshotButton}
        autoFrame={true}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Model URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Environment Preset</label>
          <select
            value={environmentPreset}
            onChange={(e) => setEnvironmentPreset(e.target.value as any)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="city">City</option>
            <option value="sunset">Sunset</option>
            <option value="night">Night</option>
            <option value="dawn">Dawn</option>
            <option value="studio">Studio</option>
            <option value="apartment">Apartment</option>
            <option value="forest">Forest</option>
            <option value="park">Park</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Auto Rotate Speed ({autoRotateSpeed})</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={autoRotateSpeed}
            onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Auto Rotate</label>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Mouse Parallax</label>
          <input
            type="checkbox"
            checked={enableMouseParallax}
            onChange={(e) => setEnableMouseParallax(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Manual Rotation</label>
          <input
            type="checkbox"
            checked={enableManualRotation}
            onChange={(e) => setEnableManualRotation(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Hover Rotation</label>
          <input
            type="checkbox"
            checked={enableHoverRotation}
            onChange={(e) => setEnableHoverRotation(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Manual Zoom</label>
          <input
            type="checkbox"
            checked={enableManualZoom}
            onChange={(e) => setEnableManualZoom(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Show Screenshot Button</label>
          <input
            type="checkbox"
            checked={showScreenshotButton}
            onChange={(e) => setShowScreenshotButton(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import ModelViewer from './ModelViewer';

<ModelViewer
  url="${url}"
  width="100%"
  height="500px"
  autoRotate={${autoRotate}}
  autoRotateSpeed={${autoRotateSpeed}}
  enableMouseParallax={${enableMouseParallax}}
  enableManualRotation={${enableManualRotation}}
  enableHoverRotation={${enableHoverRotation}}
  enableManualZoom={${enableManualZoom}}
  environmentPreset="${environmentPreset}"
  showScreenshotButton={${showScreenshotButton}}
  autoFrame={true}
/>`;

  const codeExample = `// Full component code available in the repository
// Requires: three, @react-three/fiber, @react-three/drei

import { FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'url',
      type: 'string',
      default: "''",
      description: 'URL of the 3D model (glb, gltf, fbx, obj)',
    },
    {
      name: 'width',
      type: 'number | string',
      default: '400',
      description: 'Width of the viewer',
    },
    {
      name: 'height',
      type: 'number | string',
      default: '400',
      description: 'Height of the viewer',
    },
    {
      name: 'autoRotate',
      type: 'boolean',
      default: 'false',
      description: 'Whether to auto-rotate the model',
    },
    {
      name: 'autoRotateSpeed',
      type: 'number',
      default: '0.35',
      description: 'Speed of auto-rotation',
    },
    {
      name: 'enableMouseParallax',
      type: 'boolean',
      default: 'true',
      description: 'Enable mouse parallax effect',
    },
    {
      name: 'enableManualRotation',
      type: 'boolean',
      default: 'true',
      description: 'Enable manual rotation via drag',
    },
    {
      name: 'enableHoverRotation',
      type: 'boolean',
      default: 'true',
      description: 'Enable slight rotation on hover',
    },
    {
      name: 'enableManualZoom',
      type: 'boolean',
      default: 'true',
      description: 'Enable zooming via scroll/pinch',
    },
    {
      name: 'environmentPreset',
      type: 'string',
      default: "'forest'",
      description: 'Lighting environment preset',
    },
    {
      name: 'showScreenshotButton',
      type: 'boolean',
      default: 'true',
      description: 'Show button to take screenshot',
    },
  ];

  return (
    <ComponentDetail
      title="Model Viewer"
      description="A lightweight 3D model viewer with support for GLB, GLTF, FBX, and OBJ formats, featuring auto-framing, environment lighting, and interaction controls."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['three', '@react-three/fiber', '@react-three/drei']}
    />
  );
};

export default ModelViewerPage;