import { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentDetail from './ComponentDetail';

const MagnetPreview = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center p-16">
      <motion.div
        className="relative px-8 py-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        <span className="text-lg font-bold">Magnetic Button</span>
      </motion.div>
    </div>
  );
};

const codeExample = `import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnet({ 
  children,
  strength = 0.3
}: { 
  children: React.ReactNode;
  strength?: number;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}`;

const props = [
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Content to apply magnetic effect to',
  },
  {
    name: 'strength',
    type: 'number',
    default: '0.3',
    description: 'Strength of the magnetic pull (0-1)',
  },
];

export default function Magnet() {
  return (
    <ComponentDetail
      title="Magnet"
      description="Element that magnetically follows cursor movement"
      preview={<MagnetPreview />}
      code={codeExample}
      props={props}
    />
  );
}
