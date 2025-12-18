import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Folder from '../components/effects/Folder';

const FolderPage = () => {
  const [size, setSize] = useState(2);
  const [color, setColor] = useState('#5227FF');

  const items = [
    <div key="1" className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">DOCS</div>,
    <div key="2" className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">IMAGES</div>,
    <div key="3" className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">WORK</div>
  ];

  const preview = (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <Folder
        size={size}
        color={color}
        items={items}
      />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Size ({size}x)</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={size}
            onChange={(e) => setSize(parseFloat(e.target.value))}
            className="w-full bg-gray-800 rounded-lg appearance-none h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Folder Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-transparent w-8 h-8 cursor-pointer border-none"
            />
            <span className="text-sm text-gray-300 font-mono">{color}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const usageCode = `import Folder from './Folder';

<Folder
  size={${size}}
  color="${color}"
  items={[
    <div>Item 1</div>,
    <div>Item 2</div>,
    <div>Item 3</div>
  ]}
/>`;

  const codeExample = `// Full component code available in the repository

import React, { useState } from 'react';

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'color',
      type: 'string',
      default: "'#5227FF'",
      description: 'Main color of the folder',
    },
    {
      name: 'size',
      type: 'number',
      default: '1',
      description: 'Scale factor of the folder',
    },
    {
      name: 'items',
      type: 'React.ReactNode[]',
      default: '[]',
      description: 'Array of elements to display inside the folder',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes',
    },
  ];

  return (
    <ComponentDetail
      title="Folder"
      description="An interactive folder component that opens to reveal its contents with a smooth animation."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
    />
  );
};

export default FolderPage;