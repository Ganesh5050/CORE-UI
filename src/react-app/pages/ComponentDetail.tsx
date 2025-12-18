import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import ComponentLayout from '@/react-app/components/ComponentLayout';

interface ComponentDetailProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  usage?: string;
  props?: { name: string; type: string; default: string; description: string }[];
  customization?: React.ReactNode;
  dependencies?: string[];
}

export default function ComponentDetail({
  title,
  description,
  preview,
  code,
  usage,
  props,
  customization,
  dependencies = ['framer-motion']
}: ComponentDetailProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [installTab, setInstallTab] = useState<'cli' | 'manual' | 'pnpm' | 'npm' | 'yarn' | 'bun'>('cli');
  const [codeTab, setCodeTab] = useState<'ts' | 'js'>('ts');
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCopy = (text: string, type: 'code' | 'install' | 'usage') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const installCommand = dependencies.map(dep => dep).join(' ');

  return (
    <ComponentLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3">{title}</h1>
          <p className="text-gray-400 text-lg">{description}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'code'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            Code
          </button>
        </div>

        {activeTab === 'preview' ? (
          <>
            {/* Preview Box */}
            <div className="bg-[#0d0520] border border-white/10 rounded-xl overflow-hidden mb-8">
              <div className="relative">
                <button
                  onClick={handleRefresh}
                  className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all z-10 group"
                  title="Refresh preview"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </button>
                <div key={refreshKey} className="p-16 flex items-center justify-center min-h-[400px] bg-black/20">
                  {preview}
                </div>
              </div>
            </div>

            {/* Customization */}
            {customization && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Customization</h2>
                <div className="bg-[#0d0520] border border-white/10 rounded-xl p-6">
                  {customization}
                </div>
              </div>
            )}

            {/* Props Table */}
            {props && props.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Props</h2>
                <div className="bg-[#0d0520] border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Property</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Default</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.map((prop, index) => (
                        <tr key={index} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-purple-400">{prop.name}</td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-400">{prop.type}</td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-400">{prop.default}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dependencies */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Dependencies</h2>
              <div className="flex flex-wrap gap-2">
                {dependencies.map((dep, index) => (
                  <span key={index} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Install Section */}
            {dependencies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Install</h2>
                <div className="bg-[#0d0520] border border-white/10 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 p-4 border-b border-white/10 flex-wrap">
                    <button
                      onClick={() => setInstallTab('cli')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'cli'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      CLI
                    </button>
                    <button
                      onClick={() => setInstallTab('manual')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'manual'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      Manual
                    </button>
                    <button
                      onClick={() => setInstallTab('pnpm')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'pnpm'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      pnpm
                    </button>
                    <button
                      onClick={() => setInstallTab('npm')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'npm'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      npm
                    </button>
                    <button
                      onClick={() => setInstallTab('yarn')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'yarn'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      yarn
                    </button>
                    <button
                      onClick={() => setInstallTab('bun')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${installTab === 'bun'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      bun
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => {
                        let command = '';
                        switch (installTab) {
                          case 'cli':
                            command = `npx shadcn@latest add ${installCommand}`;
                            break;
                          case 'manual':
                            command = `npm install ${installCommand}`;
                            break;
                          case 'pnpm':
                            command = `pnpm install ${installCommand}`;
                            break;
                          case 'npm':
                            command = `npm install ${installCommand}`;
                            break;
                          case 'yarn':
                            command = `yarn add ${installCommand}`;
                            break;
                          case 'bun':
                            command = `bun add ${installCommand}`;
                            break;
                        }
                        handleCopy(command, 'install');
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors z-10"
                    >
                      {copiedInstall ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-300">
                        {installTab === 'cli' && `npx shadcn@latest add ${installCommand}`}
                        {installTab === 'manual' && `npm install ${installCommand}`}
                        {installTab === 'pnpm' && `pnpm install ${installCommand}`}
                        {installTab === 'npm' && `npm install ${installCommand}`}
                        {installTab === 'yarn' && `yarn add ${installCommand}`}
                        {installTab === 'bun' && `bun add ${installCommand}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Section */}
            {usage && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Usage</h2>
                <div className="bg-[#0d0520] border border-white/10 rounded-xl overflow-hidden">
                  <div className="relative">
                    <button
                      onClick={() => handleCopy(usage, 'usage')}
                      className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors z-10"
                    >
                      {copiedUsage ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                      <code className="text-gray-300">{usage}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Code Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Code</h2>
              <div className="bg-[#0d0520] border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 p-4 border-b border-white/10">
                  <button
                    onClick={() => setCodeTab('ts')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${codeTab === 'ts'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    TS TypeScript
                  </button>
                  <button
                    onClick={() => setCodeTab('js')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${codeTab === 'js'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    JS JavaScript
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleCopy(code, 'code')}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors z-10"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="p-6 overflow-x-auto text-sm leading-relaxed max-h-[600px]">
                    <code className="text-gray-300">{code}</code>
                  </pre>
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </ComponentLayout>
  );
}
