import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, LayoutDashboard, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

// Expandable Sidebar Component
function ExpandableSidebar() {
    const [open, setOpen] = useState(false);

    const links = [
        { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { label: 'Profile', icon: <User className="w-5 h-5" /> },
        { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
        { label: 'Logout', icon: <LogOut className="w-5 h-5" /> },
    ];

    return (
        <div className="flex w-full h-96 border rounded-md overflow-hidden pointer-events-auto" style={{ backgroundColor: 'rgb(245, 245, 245)', borderColor: 'rgb(229, 229, 229)' }}>
            {/* Desktop Sidebar */}
            <div
                className="hidden md:flex flex-col py-4 px-4 transition-all duration-300"
                style={{
                    width: open ? '300px' : '60px',
                    backgroundColor: 'rgb(245, 245, 245)'
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <div className="flex-1 flex flex-col gap-10">
                    <div className="flex flex-col overflow-hidden">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2 py-1">
                            <div className="w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm flex-shrink-0" />
                            {open && (
                                <span className="font-medium text-black whitespace-nowrap">Acet Labs</span>
                            )}
                        </a>

                        {/* Links */}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="flex items-center gap-2 py-2 text-gray-700 hover:translate-x-1 transition-transform duration-150"
                                >
                                    {link.icon}
                                    {open && (
                                        <span className="text-sm whitespace-nowrap">{link.label}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User */}
                <div>
                    <a href="#" className="flex items-center gap-2 py-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
                        {open && (
                            <span className="text-sm text-black whitespace-nowrap">Manu Arora</span>
                        )}
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-2 p-2 md:p-10 border-l rounded-tl-2xl" style={{ backgroundColor: 'rgb(255, 255, 255)', borderColor: 'rgb(229, 229, 229)' }}>
                <div className="flex gap-2">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="h-20 w-full rounded-lg animate-pulse" style={{ backgroundColor: 'rgb(245, 245, 245)' }} />
                    ))}
                </div>
                <div className="flex flex-1 gap-2">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="h-full w-full rounded-lg animate-pulse" style={{ backgroundColor: 'rgb(245, 245, 245)' }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const sidebarsData = {
    'sidebar-1': {
        id: 'sidebar-1',
        name: 'Expandable Sidebar',
        category: 'Sidebars',
        description: 'An expandable sidebar that expands on hover, with mobile responsive design and dark mode support.',
        preview: <ExpandableSidebar />,
        code: `// Expandable Sidebar Component
function ExpandableSidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Profile', icon: <User className="w-5 h-5" /> },
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Logout', icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen border overflow-hidden">
      {/* Desktop Sidebar */}
      <div 
        className="hidden md:flex flex-col py-4 px-4 transition-all duration-300 bg-neutral-100"
        style={{ width: open ? '300px' : '60px' }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col overflow-hidden">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 py-1">
              <div className="w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm" />
              {open && <span className="font-medium text-black">Acet Labs</span>}
            </a>
            
            {/* Links */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="flex items-center gap-2 py-2 text-gray-700 hover:translate-x-1 transition-transform"
                >
                  {link.icon}
                  {open && <span className="text-sm">{link.label}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* User */}
        <div>
          <a href="#" className="flex items-center gap-2 py-2">
            <img src="/avatar.png" className="w-7 h-7 rounded-full" alt="Avatar" />
            {open && <span className="text-sm text-black">Manu Arora</span>}
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2 p-10 bg-white">
        {/* Dashboard content */}
      </div>
    </div>
  );
}`,
        usage: `<ExpandableSidebar />`,
        darkPreview: false,
    },
};

function SidebarsGridView() {
    const navigate = useNavigate();
    const sidebarsList = Object.values(sidebarsData);

    return (
        <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
            <ComponentSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="border-b border-white/10 bg-[#0a0118]/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4 flex-1 max-w-2xl">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Search Components..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="px-6 py-12">
                        <div className="max-w-7xl mx-auto mb-12">
                            <h1 className="text-5xl font-bold mb-4">Sidebars</h1>
                            <p className="text-xl text-gray-400">Click on any sidebar to view its code and documentation</p>
                        </div>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
                            {sidebarsList.map((sidebar) => (
                                <div key={sidebar.id} onClick={() => navigate(`/others/sidebars/${sidebar.id}`)} className="group text-left cursor-pointer">
                                    <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                                        <div className="p-6 pb-4">
                                            <h3 className="text-xl font-semibold mb-1 text-white">{sidebar.name}</h3>
                                            <p className="text-sm text-gray-400">{sidebar.category}</p>
                                        </div>
                                        <div className="px-6 pb-6">
                                            <div className={`rounded-xl p-8 flex items-center justify-center min-h-[400px] pointer-events-none ${sidebar.darkPreview ? 'bg-black' : 'bg-white'}`}>
                                                {sidebar.preview}
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarDetailView({ sidebarId }: { sidebarId: string }) {
    const navigate = useNavigate();
    const sidebar = sidebarsData[sidebarId as keyof typeof sidebarsData];

    if (!sidebar) {
        return (
            <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
                <ComponentSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Sidebar Not Found</h1>
                        <button onClick={() => navigate('/others/sidebars')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Sidebars
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ComponentDetail
            title={sidebar.name}
            description={sidebar.description}
            preview={
                <div>
                    <button onClick={() => navigate('/others/sidebars')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all sidebars
                    </button>
                    <div className={`rounded-xl p-12 flex items-center justify-center min-h-[400px] ${sidebar.darkPreview ? 'bg-black' : 'bg-white'}`}>
                        {sidebar.preview}
                    </div>
                </div>
            }
            code={sidebar.code}
            usage={sidebar.usage}
            props={[]}
            dependencies={[]}
        />
    );
}

export default function Sidebars() {
    const { sidebarId } = useParams();

    if (sidebarId) {
        return <SidebarDetailView sidebarId={sidebarId} />;
    }

    return <SidebarsGridView />;
}
