import ComponentDetail from './ComponentDetail';

const DecayCardPreview = () => {
  return (
    <div className="h-[600px] w-full bg-gradient-to-b from-gray-900 to-black rounded-lg flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Decay Card</h3>
        <p className="text-gray-400">Component preview will appear here</p>
        <p className="text-gray-500 text-sm mt-2">Scroll down for documentation</p>
      </div>
    </div>
  );
};

const usageCode = `import DecayCard from './DecayCard'

<DecayCard />`; 

const codeExample = `// Component code will be added here

import React from 'react';

// Component implementation coming soon...
`;

const props = [
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

export default function DecayCardPage() {
  return (
    <ComponentDetail
      title="Decay Card"
      description="Card with decay/glitch effect"
      preview={<DecayCardPreview />}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['framer-motion']}
    />
  );
}