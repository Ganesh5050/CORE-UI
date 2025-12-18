import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Lanyard from '../components/effects/Lanyard';

const LanyardPage = () => {
    const [gravityX, setGravityX] = useState(0);
    const [gravityY, setGravityY] = useState(-40);
    const [gravityZ, setGravityZ] = useState(0);
    const [fov, setFov] = useState(20);
    const [transparent, setTransparent] = useState(true);

    const preview = (
        <div className="h-[600px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800">
            <Lanyard
                gravity={[gravityX, gravityY, gravityZ]}
                fov={fov}
                transparent={transparent}
            />
        </div>
    );

    const customization = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Gravity X ({gravityX})</label>
                    <input
                        type="range"
                        min="-50"
                        max="50"
                        step="1"
                        value={gravityX}
                        onChange={(e) => setGravityX(parseFloat(e.target.value))}
                        className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Gravity Y ({gravityY})</label>
                    <input
                        type="range"
                        min="-100"
                        max="0"
                        step="1"
                        value={gravityY}
                        onChange={(e) => setGravityY(parseFloat(e.target.value))}
                        className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Gravity Z ({gravityZ})</label>
                    <input
                        type="range"
                        min="-50"
                        max="50"
                        step="1"
                        value={gravityZ}
                        onChange={(e) => setGravityZ(parseFloat(e.target.value))}
                        className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Field of View ({fov})</label>
                    <input
                        type="range"
                        min="10"
                        max="60"
                        step="1"
                        value={fov}
                        onChange={(e) => setFov(parseFloat(e.target.value))}
                        className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
                    />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <label className="text-sm font-medium text-gray-300">Transparent Background</label>
                    <input
                        type="checkbox"
                        checked={transparent}
                        onChange={(e) => setTransparent(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                    />
                </div>
            </div>
        </div>
    );

    const usageCode = `import Lanyard from './Lanyard';

<Lanyard
  position={[0, 0, 20]}
  gravity={[${gravityX}, ${gravityY}, ${gravityZ}]}
  fov={${fov}}
  transparent={${transparent}}
/>`;

    const codeExample = `// Full component code available in the repository
// Requires: three, meshline, @react-three/fiber, @react-three/drei, @react-three/rapier

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// ... (rest of the implementation)
`;

    const props = [
        {
            name: 'position',
            type: '[number, number, number]',
            default: '[0, 0, 30]',
            description: 'Camera position',
        },
        {
            name: 'gravity',
            type: '[number, number, number]',
            default: '[0, -40, 0]',
            description: 'Physics gravity vector',
        },
        {
            name: 'fov',
            type: 'number',
            default: '20',
            description: 'Camera field of view',
        },
        {
            name: 'transparent',
            type: 'boolean',
            default: 'true',
            description: 'Whether the canvas background is transparent',
        },
    ];

    return (
        <ComponentDetail
            title="Lanyard"
            description="An interactive physics-based lanyard simulation using Rapier physics engine. Drag the card to interact with it."
            preview={preview}
            customization={customization}
            code={codeExample}
            usage={usageCode}
            props={props}
            dependencies={['three', 'meshline', '@react-three/fiber', '@react-three/drei', '@react-three/rapier']}
        />
    );
};

export default LanyardPage;
