import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '@/react-app/hooks/useCountUp';

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  index: number;
}

function StatCard({ value, label, description, index }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Determine if this is a numeric value and extract the number
  const isNumeric = /^\d+/.test(value);
  const numericValue = isNumeric ? parseInt(value.match(/\d+/)?.[0] || '0') : 0;
  const suffix = isNumeric ? value.replace(/^\d+/, '') : '';
  
  const count = useCountUp(numericValue, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/[0.02] ${
        index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className="text-5xl sm:text-6xl font-bold text-gradient mb-3">
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="text-lg font-semibold mb-1">{label}</div>
      {description && (
        <div className="text-sm text-gray-400">{description}</div>
      )}
    </motion.div>
  );
}

const stats = [
  {
    value: '100%',
    label: 'Free & Open Source',
    description: 'Copy, use, and customize at will',
  },
  {
    value: '4',
    label: 'Component Variants',
    description: 'Pick your favourite technologies',
  },
  {
    value: '110+',
    label: 'Creative Components',
    description: 'Growing weekly & only getting better',
  },
];

export default function Stats() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
