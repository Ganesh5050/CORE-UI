import ComponentLayout from '@/react-app/components/ComponentLayout';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import GlassyButton from '@/react-app/components/GlassyButton';

export default function GetStarted() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ComponentLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Get Started</h1>
          <p className="text-xl text-gray-400">
            Start building beautiful interfaces with Core UI components
          </p>
        </div>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-400 mb-4">
              Core UI is a collection of high-quality, animated, and fully customizable React components
              designed to help you build stunning user interfaces quickly and efficiently.
            </p>
            <p className="text-gray-400">
              All components are built with modern web technologies including React, TypeScript, Tailwind CSS,
              and Framer Motion for smooth animations.
            </p>
          </section>

          {/* Installation */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Installation</h2>
            <p className="text-gray-400 mb-4">
              Install the required dependencies to get started:
            </p>

            <div className="bg-[#0d0520] border border-white/10 rounded-xl p-4 mb-4 relative">
              <button
                onClick={() => handleCopy('npm install framer-motion')}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-sm text-gray-300">
                <code>npm install framer-motion</code>
              </pre>
            </div>

            <p className="text-gray-400">
              Each component is designed to be copy-pasted directly into your project. Simply browse
              the component library, find what you need, and copy the code.
            </p>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Usage</h2>
            <ol className="space-y-4 text-gray-400">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <strong className="text-white">Browse Components:</strong> Explore our component library
                  to find the perfect components for your project.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <strong className="text-white">Copy Code:</strong> Click the "Code" tab and copy the
                  component code to your clipboard.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <strong className="text-white">Customize:</strong> Paste into your project and customize
                  the component to match your design needs.
                </div>
              </li>
            </ol>
          </section>

          {/* Next Steps */}
          <section className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to start building?</h2>
            <p className="text-gray-300 mb-6">
              Browse our collection of 110+ components and start creating amazing user experiences.
            </p>
            <GlassyButton
              variant="secondary"
              size="md"
              icon={<ArrowRight className="w-5 h-5" />}
              className="rounded-full bg-white text-black hover:bg-white/90"
            >
              Browse Components
            </GlassyButton>
          </section>
        </div>
      </div>
    </ComponentLayout>
  );
}
