import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import GlassIcons from '../components/effects/GlassIcons';
import { FileText, Book, Heart, Cloud, Edit, BarChart2, Github, Twitter, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';

const GlassIconsPage = () => {
  const [iconSet, setIconSet] = useState<'default' | 'social'>('default');

  const defaultItems = [
    { icon: <FileText size="100%" />, color: 'blue', label: 'Files' },
    { icon: <Book size="100%" />, color: 'purple', label: 'Books' },
    { icon: <Heart size="100%" />, color: 'red', label: 'Health' },
    { icon: <Cloud size="100%" />, color: 'indigo', label: 'Weather' },
    { icon: <Edit size="100%" />, color: 'orange', label: 'Notes' },
    { icon: <BarChart2 size="100%" />, color: 'green', label: 'Stats' },
  ];

  const socialItems = [
    { icon: <Github size="100%" />, color: '#333', label: 'GitHub' },
    { icon: <Twitter size="100%" />, color: '#1DA1F2', label: 'Twitter' },
    { icon: <Instagram size="100%" />, color: '#E1306C', label: 'Instagram' },
    { icon: <Linkedin size="100%" />, color: '#0077B5', label: 'LinkedIn' },
    { icon: <Facebook size="100%" />, color: '#1877F2', label: 'Facebook' },
    { icon: <Youtube size="100%" />, color: '#FF0000', label: 'YouTube' },
  ];

  const items = iconSet === 'default' ? defaultItems : socialItems;

  const preview = (
    <div className="h-[500px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <GlassIcons items={items} />
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Icon Set</label>
          <select
            value={iconSet}
            onChange={(e) => setIconSet(e.target.value as 'default' | 'social')}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          >
            <option value="default">Default (Gradients)</option>
            <option value="social">Social (Solid Colors)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const usageCode = `import GlassIcons from './GlassIcons';
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi';

const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

<GlassIcons items={items} />`;

  const codeExample = `// Full component code available in the repository
// Requires: React

import React from 'react';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

// ... (rest of the implementation)
`;

  const props = [
    {
      name: 'items',
      type: 'GlassIconsItem[]',
      default: '[]',
      description: 'Array of items to display',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Custom CSS class for the container',
    },
  ];

  return (
    <ComponentDetail
      title="Glass Icons"
      description="A grid of glassmorphic icons with 3D hover effects and gradients."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={[]}
    />
  );
};

export default GlassIconsPage;