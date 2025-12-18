import { ReactNode, useEffect } from 'react';
import ComponentSidebar from './ComponentSidebar';
import { Search, Moon } from 'lucide-react';
import GlassyButton from './GlassyButton';

interface ComponentLayoutProps {
  children: ReactNode;
}

export default function ComponentLayout({ children }: ComponentLayoutProps) {
  useEffect(() => {
    // Prevent browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
      <ComponentSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="border-b border-white/10 bg-[#0a0118]/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Components..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <GlassyButton variant="glass" size="sm" className="!p-2 rounded-lg">
                <Moon className="w-5 h-5" />
              </GlassyButton>
              <GlassyButton variant="primary" size="sm">
                Star On GitHub
              </GlassyButton>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
