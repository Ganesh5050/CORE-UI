import React, { useState } from 'react';
import {
  TargetCursor,
  MagnetLines,
  ClickSpark,
  Magnet,
  GradualBlur,
  LaserFlow,
  StickerPeel,
  Cubes,
  ShapeBlur,
  Crosshair,
  Noise
} from '../components/effects';

const ComponentPreview: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('target-cursor');

  const components = [
    { id: 'target-cursor', name: 'Target Cursor', badge: null },
    { id: 'magnet-lines', name: 'Magnet Lines', badge: null },
    { id: 'click-spark', name: 'Click Spark', badge: null },
    { id: 'magnet', name: 'Magnet', badge: null },
    { id: 'gradual-blur', name: 'Gradual Blur', badge: null },
    { id: 'laser-flow', name: 'Laser Flow', badge: 'New' },
    { id: 'sticker-peel', name: 'Sticker Peel', badge: null },
    { id: 'cubes', name: 'Cubes', badge: 'Popular' },
    { id: 'shape-blur', name: 'Shape Blur', badge: null },
    { id: 'crosshair', name: 'Crosshair', badge: null },
    { id: 'noise', name: 'Noise', badge: null }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#13131a] border-r border-gray-800 min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Core UI</h2>
            <p className="text-sm text-gray-400">Component Library</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs uppercase text-gray-500 mb-2 px-2">Effects</h3>
            {components.map(comp => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${activeComponent === comp.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                  }`}
              >
                <span>{comp.name}</span>
                {comp.badge && (
                  <span className="text-xs bg-purple-500 px-2 py-0.5 rounded">{comp.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Target Cursor Preview */}
            {activeComponent === 'target-cursor' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Target Cursor</h1>
                <p className="text-gray-400 mb-8">Custom cursor with crosshair target design</p>

                <div className="bg-[#13131a] rounded-xl p-8 border border-gray-800 relative overflow-hidden">
                  <TargetCursor />
                  <div className="text-center py-20">
                    <h2 className="text-3xl font-bold mb-8 text-gray-300">Hover Below.</h2>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <button className="cursor-target px-8 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        THIS
                      </button>
                      <button className="cursor-target px-8 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        FEELS
                      </button>
                      <button className="cursor-target px-8 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        QUITE
                      </button>
                    </div>
                    <button className="cursor-target mt-4 px-16 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      SNAPPY!
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Magnet Lines Preview */}
            {activeComponent === 'magnet-lines' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Magnet Lines</h1>
                <p className="text-gray-400 mb-8">Grid of lines that rotate to follow mouse movement</p>

                <div className="bg-[#13131a] rounded-xl p-8 border border-gray-800 flex items-center justify-center min-h-[600px]">
                  <MagnetLines
                    rows={9}
                    columns={9}
                    containerSize="60vmin"
                    lineColor="#8b5cf6"
                    lineWidth="0.8vmin"
                    lineHeight="5vmin"
                    baseAngle={0}
                  />
                </div>
              </div>
            )}

            {/* Click Spark Preview */}
            {activeComponent === 'click-spark' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Click Spark</h1>
                <p className="text-gray-400 mb-8">Canvas-based spark animation on click events</p>

                <div className="bg-[#13131a] rounded-xl border border-gray-800 overflow-hidden">
                  <ClickSpark
                    sparkColor="#8b5cf6"
                    sparkSize={10}
                    sparkRadius={15}
                    sparkCount={8}
                    duration={400}
                  >
                    <div className="p-20 text-center">
                      <h2 className="text-2xl font-bold mb-4">Click anywhere!</h2>
                      <p className="text-gray-400">Click to create spark effects</p>
                    </div>
                  </ClickSpark>
                </div>
              </div>
            )}

            {/* Magnet Preview */}
            {activeComponent === 'magnet' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Magnet</h1>
                <p className="text-gray-400 mb-8">Magnetic attraction effect for elements</p>

                <div className="bg-[#13131a] rounded-xl p-20 border border-gray-800 flex items-center justify-center gap-8">
                  <Magnet padding={100} magnetStrength={2}>
                    <button className="px-8 py-4 bg-purple-600 rounded-lg font-semibold">
                      Hover Me
                    </button>
                  </Magnet>
                  <Magnet padding={100} magnetStrength={3}>
                    <div className="px-8 py-4 bg-blue-600 rounded-lg font-semibold">
                      Or Me
                    </div>
                  </Magnet>
                </div>
              </div>
            )}

            {/* Gradual Blur Preview */}
            {activeComponent === 'gradual-blur' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Gradual Blur</h1>
                <p className="text-gray-400 mb-8">Backdrop blur effect with customizable gradients</p>

                <div className="bg-[#13131a] rounded-xl border border-gray-800 relative overflow-hidden" style={{ height: '500px' }}>
                  <div className="h-full overflow-y-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Scroll to see the blur effect</h2>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i} className="mb-4 text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    ))}
                  </div>
                  <GradualBlur
                    target="parent"
                    position="bottom"
                    height="6rem"
                    strength={2}
                    divCount={5}
                    curve="bezier"
                    exponential={true}
                    opacity={1}
                  />
                </div>
              </div>
            )}

            {/* Laser Flow Preview */}
            {activeComponent === 'laser-flow' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Laser Flow</h1>
                <p className="text-gray-400 mb-8">WebGL shader-based laser beam effect</p>

                <div className="bg-[#13131a] rounded-xl border border-gray-800 overflow-hidden" style={{ height: '500px' }}>
                  <LaserFlow
                    horizontalBeamOffset={0.1}
                    verticalBeamOffset={0.0}
                    color="#FF79C6"
                  />
                </div>
              </div>
            )}

            {/* Cubes Preview */}
            {activeComponent === 'cubes' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Cubes</h1>
                <p className="text-gray-400 mb-8">3D cube grid with tilt effects and ripple animations</p>

                <div className="bg-[#13131a] rounded-xl p-8 border border-gray-800 flex items-center justify-center min-h-[600px]">
                  <Cubes
                    gridSize={8}
                    maxAngle={60}
                    radius={4}
                    borderStyle="2px dashed #8b5cf6"
                    faceColor="#1a1a2e"
                    rippleColor="#8b5cf6"
                    rippleSpeed={1.5}
                    autoAnimate={true}
                    rippleOnClick={true}
                  />
                </div>
              </div>
            )}

            {/* Shape Blur Preview */}
            {activeComponent === 'shape-blur' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Shape Blur</h1>
                <p className="text-gray-400 mb-8">Three.js shader-based shape blur effect</p>

                <div className="bg-[#13131a] rounded-xl border border-gray-800 overflow-hidden" style={{ height: '500px' }}>
                  <ShapeBlur
                    variation={0}
                    pixelRatioProp={window.devicePixelRatio || 1}
                    shapeSize={0.5}
                    roundness={0.5}
                    borderSize={0.05}
                    circleSize={0.5}
                    circleEdge={1}
                  />
                </div>
              </div>
            )}

            {/* Crosshair Preview */}
            {activeComponent === 'crosshair' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Crosshair</h1>
                <p className="text-gray-400 mb-8">Animated crosshair cursor with distortion effects</p>

                <div className="bg-[#13131a] rounded-xl p-8 border border-gray-800 relative" style={{ height: '500px' }}>
                  <Crosshair color="#8b5cf6" />
                  <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Move your mouse</h2>
                    <p className="text-gray-400 mb-8">Hover over links to see distortion</p>
                    <div className="space-x-4">
                      <a href="#" className="text-purple-400 underline">Link One</a>
                      <a href="#" className="text-purple-400 underline">Link Two</a>
                      <a href="#" className="text-purple-400 underline">Link Three</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Noise Preview */}
            {activeComponent === 'noise' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Noise</h1>
                <p className="text-gray-400 mb-8">Animated grain/noise overlay effect</p>

                <div className="bg-[#13131a] rounded-xl border border-gray-800 relative overflow-hidden" style={{ height: '500px' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />
                  <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={15}
                  />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <h2 className="text-3xl font-bold">Grain Effect Overlay</h2>
                  </div>
                </div>
              </div>
            )}

            {/* Sticker Peel - Note: Requires image */}
            {activeComponent === 'sticker-peel' && (
              <div>
                <h1 className="text-4xl font-bold mb-4">Sticker Peel</h1>
                <p className="text-gray-400 mb-8">Draggable sticker with peel effect (requires image)</p>

                <div className="bg-[#13131a] rounded-xl p-8 border border-gray-800 relative" style={{ height: '500px' }}>
                  <p className="text-center text-gray-400 py-20">
                    This component requires an image source to display.
                    <br />
                    Add an image to see the sticker peel effect.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
