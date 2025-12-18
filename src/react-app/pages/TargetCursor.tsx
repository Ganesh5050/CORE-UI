import ComponentDetail from './ComponentDetail';
import TargetCursorComponent from '../components/effects/TargetCursor';

const TargetCursorPreview = () => {
  return (
    <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      <TargetCursorComponent
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.2}
        parallaxOn={true}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
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
  );
};

const codeExample = `import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}`;

export default function TargetCursor() {
  return (
    <ComponentDetail
      title="Target Cursor"
      description="Custom cursor with crosshair target design that tracks and targets hoverable elements"
      preview={<TargetCursorPreview />}
      code={codeExample}
      props={[
        {
          name: 'targetSelector',
          type: 'string',
          default: '.cursor-target',
          description: 'CSS selector for elements to target'
        },
        {
          name: 'spinDuration',
          type: 'number',
          default: '2',
          description: 'Duration of cursor spin animation in seconds'
        },
        {
          name: 'hideDefaultCursor',
          type: 'boolean',
          default: 'true',
          description: 'Whether to hide the default cursor'
        },
        {
          name: 'hoverDuration',
          type: 'number',
          default: '0.2',
          description: 'Duration of hover transition in seconds'
        },
        {
          name: 'parallaxOn',
          type: 'boolean',
          default: 'true',
          description: 'Enable parallax effect on corners'
        }
      ]}
      dependencies={['gsap']}
    />
  );
}
