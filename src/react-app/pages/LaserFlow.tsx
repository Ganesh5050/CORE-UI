import { useRef } from 'react';
import ComponentDetail from './ComponentDetail';
import LaserFlow from '@/react-app/components/effects/LaserFlow';

const LaserFlowPreview = () => {
  return (
    <div style={{ height: '500px', position: 'relative', overflow: 'hidden', backgroundColor: '#060010', borderRadius: '12px' }}>
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#FF79C6"
      />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        zIndex: 6,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        Laser Flow Effect
      </div>
    </div>
  );
};

const usageExample = `import LaserFlow from './LaserFlow';

// Basic Usage
<div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
  <LaserFlow />
</div>

// Custom Color
<div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
  <LaserFlow
    horizontalBeamOffset={0.1}
    verticalBeamOffset={0.0}
    color="#FF79C6"
  />
</div>`;

const codeExample = `import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// NOTE: Full shader code is quite long (500+ lines)
// This is a simplified version showing the structure

const LaserFlow = ({
  className,
  style,
  wispDensity = 1,
  dpr,
  mouseSmoothTime = 0.0,
  mouseTiltStrength = 0.01,
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0.0,
  flowSpeed = 0.35,
  verticalSizing = 2.0,
  horizontalSizing = 0.5,
  fogIntensity = 0.45,
  fogScale = 0.3,
  wispSpeed = 15.0,
  wispIntensity = 5.0,
  flowStrength = 0.25,
  decay = 1.1,
  falloffStart = 1.2,
  fogFallSpeed = 0.6,
  color = '#FF79C6'
}) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });

    // Setup scene, camera, geometry
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Create shader material with custom GLSL
    const material = new THREE.RawShaderMaterial({
      vertexShader: VERT_SHADER,
      fragmentShader: FRAG_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        uColor: { value: new THREE.Vector3(1, 1, 1) },
        // ... many more uniforms for customization
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // Cleanup
    };
  }, []);

  return <div ref={mountRef} className={className} style={style} />;
};

export default LaserFlow;`;

const props = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: '{}',
    description: 'Inline styles',
  },
  {
    name: 'wispDensity',
    type: 'number',
    default: '1',
    description: 'Density of animated wisps (0-2)',
  },
  {
    name: 'dpr',
    type: 'number',
    default: 'window.devicePixelRatio',
    description: 'Device pixel ratio for rendering',
  },
  {
    name: 'mouseSmoothTime',
    type: 'number',
    default: '0.0',
    description: 'Mouse movement smoothing time',
  },
  {
    name: 'mouseTiltStrength',
    type: 'number',
    default: '0.01',
    description: 'Strength of mouse tilt effect',
  },
  {
    name: 'horizontalBeamOffset',
    type: 'number',
    default: '0.1',
    description: 'Horizontal offset of the beam',
  },
  {
    name: 'verticalBeamOffset',
    type: 'number',
    default: '0.0',
    description: 'Vertical offset of the beam',
  },
  {
    name: 'flowSpeed',
    type: 'number',
    default: '0.35',
    description: 'Speed of the flow animation',
  },
  {
    name: 'verticalSizing',
    type: 'number',
    default: '2.0',
    description: 'Vertical size of the beam',
  },
  {
    name: 'horizontalSizing',
    type: 'number',
    default: '0.5',
    description: 'Horizontal size of the beam',
  },
  {
    name: 'fogIntensity',
    type: 'number',
    default: '0.45',
    description: 'Intensity of the fog effect',
  },
  {
    name: 'fogScale',
    type: 'number',
    default: '0.3',
    description: 'Scale of the fog texture',
  },
  {
    name: 'wispSpeed',
    type: 'number',
    default: '15.0',
    description: 'Speed of wisp movement',
  },
  {
    name: 'wispIntensity',
    type: 'number',
    default: '5.0',
    description: 'Intensity of wisps',
  },
  {
    name: 'flowStrength',
    type: 'number',
    default: '0.25',
    description: 'Strength of the flow effect',
  },
  {
    name: 'decay',
    type: 'number',
    default: '1.1',
    description: 'Beam decay factor',
  },
  {
    name: 'falloffStart',
    type: 'number',
    default: '1.2',
    description: 'Start of beam falloff',
  },
  {
    name: 'fogFallSpeed',
    type: 'number',
    default: '0.6',
    description: 'Speed of fog falling',
  },
  {
    name: 'color',
    type: 'string',
    default: "'#FF79C6'",
    description: 'Hex color of the laser beam',
  },
];

export default function LaserFlowPage() {
  return (
    <ComponentDetail
      title="Laser Flow"
      description="Animated laser beam effect with volumetric fog using WebGL shaders"
      preview={<LaserFlowPreview />}
      code={codeExample}
      usage={usageExample}
      props={props}
      dependencies={['three']}
    />
  );
}
