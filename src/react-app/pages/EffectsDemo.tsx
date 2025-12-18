import React from 'react';
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

const EffectsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center py-8">React Bits Effects Demo</h1>

      {/* Target Cursor Demo */}
      <section className="p-8 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Target Cursor</h2>
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center gap-4">
          <TargetCursor />
          <button className="cursor-target px-6 py-3 bg-purple-600 rounded-lg">THIS</button>
          <button className="cursor-target px-6 py-3 bg-purple-600 rounded-lg">FEELS</button>
          <button className="cursor-target px-6 py-3 bg-purple-600 rounded-lg">QUITE</button>
          <button className="cursor-target px-6 py-3 bg-purple-600 rounded-lg">SNAPPY!</button>
        </div>
      </section>

      {/* Magnet Lines Demo */}
      <section className="p-8 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Magnet Lines</h2>
        <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center">
          <MagnetLines
            rows={9}
            columns={9}
            containerSize="60vmin"
            lineColor="#ffffff"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
          />
        </div>
      </section>

      {/* Click Spark Demo */}
      <section className="p-8 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Click Spark</h2>
        <div className="h-64 bg-gray-800 rounded-lg">
          <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8}>
            <div className="h-full flex items-center justify-center">
              <p className="text-xl">Click anywhere to see sparks!</p>
            </div>
          </ClickSpark>
        </div>
      </section>

      {/* Magnet Demo */}
      <section className="p-8 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Magnet</h2>
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <Magnet padding={100} magnetStrength={2}>
            <button className="px-8 py-4 bg-blue-600 rounded-lg text-xl">
              Hover Near Me!
            </button>
          </Magnet>
        </div>
      </section>

      {/* Gradual Blur Demo */}
      <section className="p-8 border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Gradual Blur</h2>
        <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-full overflow-y-auto p-8">
            <p className="mb-4">Scroll to see the blur effect at the bottom...</p>
 