import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Home, User, Mail, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

// Floating Navbar Component
function FloatingNavbar() {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      if (currentScrollY < 50) {
        setVisible(false);
      } else {
        if (currentScrollY < lastScrollY) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div id="scroll-container" className="relative w-full h-96 overflow-y-auto pointer-events-auto" style={{ backgroundColor: 'rgb(10, 10, 20)' }}>
      <nav
        className="sticky top-4 left-1/2 -translate-x-1/2 mx-auto transition-all duration-300 z-50 w-fit"
        style={{
          transform: `translate(-50%, ${visible ? '0' : '-120px'})`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="flex items-center gap-1 px-8 py-2 rounded-full border"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)'
          }}
        >
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
          <button
            className="relative px-4 py-2 text-sm font-medium rounded-full border"
            style={{
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: 'rgb(0, 0, 0)'
            }}
          >
            Login
            <span
              className="absolute inset-x-0 -bottom-px h-px mx-auto w-1/2"
              style={{
                background: 'linear-gradient(to right, transparent, rgb(59, 130, 246), transparent)'
              }}
            />
          </button>
        </div>
      </nav>

      <div className="p-8 space-y-4">
        <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center">
          <p className="text-white text-sm">Scroll down to hide navbar</p>
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-lg" />
        ))}
        <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center">
          <p className="text-white text-sm font-bold">Scroll back up to reveal navbar</p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Nav Component for navbar-6
function SidebarNav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Profile', icon: <User className="w-5 h-5" /> },
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Logout', icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div
      className="flex flex-col py-4 px-4 transition-all duration-300"
      style={{
        width: open ? '240px' : '60px',
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
  );
}

const navbarsData = {
  'navbar-1': {
    id: 'navbar-1',
    name: 'Glassmorphism Navbar',
    category: 'Navbars',
    description: 'A modern navbar with glassmorphism effect, backdrop blur, and smooth transitions.',
    preview: (
      <nav
        className="w-full px-6 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-white">Brand</div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Services</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Contact</a>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white'
            }}
          >
            Get Started
          </button>
        </div>
      </nav>
    ),
    code: `<nav 
  className="w-full px-6 py-4" 
  style={{ 
    background: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(10px)', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    borderRadius: '12px' 
  }}
>
  <div className="flex items-center justify-between">
    <div className="text-lg font-bold text-white">Brand</div>
    <div className="flex items-center gap-6">
      <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Home</a>
      <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">About</a>
      <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Services</a>
      <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors">Contact</a>
    </div>
    <button 
      className="px-4 py-2 rounded-lg text-sm font-medium" 
      style={{ 
        background: 'rgba(255, 255, 255, 0.2)', 
        border: '1px solid rgba(255, 255, 255, 0.3)', 
        color: 'white' 
      }}
    >
      Get Started
    </button>
  </div>
</nav>`,
    usage: `<nav className="glassmorphism-navbar">...</nav>`,
    darkPreview: true,
  },
  'navbar-2': {
    id: 'navbar-2',
    name: 'Minimal Dark Navbar',
    category: 'Navbars',
    description: 'A clean, minimal navbar with dark background and subtle border.',
    preview: (
      <nav
        className="w-full px-6 py-4 border-b"
        style={{
          backgroundColor: 'rgb(10, 10, 20)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-lg font-bold text-white">Logo</div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Products</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Solutions</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Sign In
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium text-black"
              style={{ backgroundColor: 'rgb(255, 255, 255)' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    ),
    code: `<nav 
  className="w-full px-6 py-4 border-b" 
  style={{ 
    backgroundColor: 'rgb(10, 10, 20)', 
    borderColor: 'rgba(255, 255, 255, 0.1)' 
  }}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-8">
      <div className="text-lg font-bold text-white">Logo</div>
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Products</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Solutions</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
        Sign In
      </button>
      <button 
        className="px-4 py-2 rounded-lg text-sm font-medium text-black" 
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      >
        Sign Up
      </button>
    </div>
  </div>
</nav>`,
    usage: `<nav className="minimal-dark-navbar">...</nav>`,
    darkPreview: true,
  },
  'navbar-3': {
    id: 'navbar-3',
    name: 'Gradient Border Navbar',
    category: 'Navbars',
    description: 'A navbar with animated gradient border and centered navigation.',
    preview: (
      <nav className="relative w-full p-6 rounded-xl overflow-hidden" style={{ backgroundColor: 'rgb(10, 10, 20)' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgb(255, 0, 150), rgb(0, 204, 255))',
            padding: '2px'
          }}
        >
          <div className="w-full h-full rounded-xl" style={{ backgroundColor: 'rgb(10, 10, 20)' }} />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="text-lg font-bold text-white">Brand</div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Features</a>
            <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Blog</a>
          </div>
          <button
            className="px-6 py-2 rounded-lg text-sm font-medium text-white"
            style={{
              background: 'linear-gradient(90deg, rgb(255, 0, 150), rgb(0, 204, 255))'
            }}
          >
            Contact Us
          </button>
        </div>
      </nav>
    ),
    code: `<nav 
  className="relative w-full p-6 rounded-xl overflow-hidden" 
  style={{ backgroundColor: 'rgb(10, 10, 20)' }}
>
  <div 
    className="absolute inset-0" 
    style={{ 
      background: 'linear-gradient(90deg, rgb(255, 0, 150), rgb(0, 204, 255))', 
      padding: '2px' 
    }}
  >
    <div className="w-full h-full rounded-xl" style={{ backgroundColor: 'rgb(10, 10, 20)' }} />
  </div>
  <div className="relative z-10 flex items-center justify-between">
    <div className="text-lg font-bold text-white">Brand</div>
    <div className="flex items-center gap-8">
      <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Features</a>
      <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Pricing</a>
      <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">About</a>
      <a href="#" className="text-sm text-white hover:text-purple-400 transition-colors">Blog</a>
    </div>
    <button 
      className="px-6 py-2 rounded-lg text-sm font-medium text-white" 
      style={{ 
        background: 'linear-gradient(90deg, rgb(255, 0, 150), rgb(0, 204, 255))' 
      }}
    >
      Contact Us
    </button>
  </div>
</nav>`,
    usage: `<nav className="gradient-border-navbar">...</nav>`,
    darkPreview: true,
  },
  'navbar-4': {
    id: 'navbar-4',
    name: 'Floating Navbar',
    category: 'Navbars',
    description: 'A sticky navbar that hides on scroll down and reveals when scrolling up.',
    preview: <FloatingNavbar />,
    code: `// Floating Navbar Component
function FloatingNavbar() {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setVisible(false);
      } else {
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setVisible(true);
        } else {
          // Scrolling down
          setVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className="fixed top-4 left-1/2 -translate-x-1/2 transition-all duration-300 z-50"
      style={{
        transform: \`translate(-50%, \${visible ? '0' : '-120px'})\`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div 
        className="flex items-center gap-1 px-8 py-2 rounded-full border"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 2px 3px -1px rgba(0,0,0,0.1)'
        }}
      >
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          <User className="w-4 h-4" />
          <span>About</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </a>
        <button className="relative px-4 py-2 text-sm font-medium rounded-full border">
          Login
          <span className="absolute inset-x-0 -bottom-px h-px mx-auto w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </button>
      </div>
    </nav>
  );
}`,
    usage: `<FloatingNavbar />`,
    darkPreview: true,
  },
  'navbar-5': {
    id: 'navbar-5',
    name: 'Navbar Menu',
    category: 'Navbars',
    description: 'A navbar with animated dropdown mega menu that expands on hover.',
    preview: (
      <div className="relative w-full pointer-events-auto">
        <nav className="rounded-full border bg-white px-8 py-6 flex justify-center gap-4" style={{ borderColor: 'rgba(0, 0, 0, 0.1)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div className="relative group">
            <button className="text-sm font-medium text-black hover:opacity-70 transition-opacity">
              Services
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
              <div className="bg-white rounded-2xl border p-4 shadow-xl min-w-[200px]" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Web Development</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Interface Design</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">SEO</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Branding</a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium text-black hover:opacity-70 transition-opacity">
              Products
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
              <div className="bg-white rounded-2xl border p-4 shadow-xl" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                <div className="grid grid-cols-2 gap-4 min-w-[400px]">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-black">Product 1</h4>
                      <p className="text-xs text-gray-600">Amazing product</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-black">Product 2</h4>
                      <p className="text-xs text-gray-600">Great solution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium text-black hover:opacity-70 transition-opacity">
              Pricing
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
              <div className="bg-white rounded-2xl border p-4 shadow-xl min-w-[150px]" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Hobby</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Individual</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Team</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">Enterprise</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    ),
    code: `// Navbar Menu Component
function NavbarMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav 
      onMouseLeave={() => setActive(null)}
      className="rounded-full border bg-white px-8 py-6 flex justify-center gap-4"
    >
      {/* Services Menu */}
      <div className="relative" onMouseEnter={() => setActive('services')}>
        <button className="text-sm font-medium text-black hover:opacity-70">
          Services
        </button>
        {active === 'services' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
            <div className="bg-white rounded-2xl border p-4 shadow-xl min-w-[200px]">
              <div className="flex flex-col gap-2">
                <a href="#" className="text-sm text-gray-700 hover:text-black">Web Development</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">Interface Design</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">SEO</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">Branding</a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Menu */}
      <div className="relative" onMouseEnter={() => setActive('products')}>
        <button className="text-sm font-medium text-black hover:opacity-70">
          Products
        </button>
        {active === 'products' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
            <div className="bg-white rounded-2xl border p-4 shadow-xl">
              <div className="grid grid-cols-2 gap-4 min-w-[400px]">
                {/* Product items */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Menu */}
      <div className="relative" onMouseEnter={() => setActive('pricing')}>
        <button className="text-sm font-medium text-black hover:opacity-70">
          Pricing
        </button>
        {active === 'pricing' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
            <div className="bg-white rounded-2xl border p-4 shadow-xl min-w-[150px]">
              <div className="flex flex-col gap-2">
                <a href="#" className="text-sm text-gray-700 hover:text-black">Hobby</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">Individual</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">Team</a>
                <a href="#" className="text-sm text-gray-700 hover:text-black">Enterprise</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}`,
    usage: `<NavbarMenu />`,
    darkPreview: false,
  },
  'navbar-6': {
    id: 'navbar-6',
    name: 'Sidebar Menu',
    category: 'Navbars',
    description: 'An expandable sidebar navigation that expands on hover, with dashboard layout.',
    preview: (
      <div className="flex w-full h-96 border rounded-md overflow-hidden pointer-events-auto" style={{ backgroundColor: 'rgb(245, 245, 245)', borderColor: 'rgb(229, 229, 229)' }}>
        <SidebarNav />
        <div className="flex-1 flex flex-col gap-2 p-2 md:p-6 border-l rounded-tl-2xl" style={{ backgroundColor: 'rgb(255, 255, 255)', borderColor: 'rgb(229, 229, 229)' }}>
          <div className="flex gap-2">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-16 w-full rounded-lg animate-pulse" style={{ backgroundColor: 'rgb(245, 245, 245)' }} />
            ))}
          </div>
          <div className="flex flex-1 gap-2">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="h-full w-full rounded-lg animate-pulse" style={{ backgroundColor: 'rgb(245, 245, 245)' }} />
            ))}
          </div>
        </div>
      </div>
    ),
    code: `// Sidebar Menu Component
function SidebarMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Profile', icon: <User className="w-5 h-5" /> },
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Logout', icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen border overflow-hidden">
      {/* Sidebar */}
      <div 
        className="flex flex-col py-4 px-4 transition-all duration-300 bg-neutral-100"
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
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
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
    usage: `<SidebarMenu />`,
    darkPreview: false,
  },
};

function NavbarsGridView() {
  const navigate = useNavigate();
  const navbarsList = Object.values(navbarsData);

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
              <h1 className="text-5xl font-bold mb-4">Navbars</h1>
              <p className="text-xl text-gray-400">Click on any navbar to view its code and documentation</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
              {navbarsList.map((navbar) => (
                <div key={navbar.id} onClick={() => navigate(`/ others / navbars / ${navbar.id}`)} className="group text-left cursor-pointer">
                  <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                    <div className="p-6 pb-4">
                      <h3 className="text-xl font-semibold mb-1 text-white">{navbar.name}</h3>
                      <p className="text-sm text-gray-400">{navbar.category}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <div className={`rounded - xl p - 8 flex items - center justify - center min - h - [150px] pointer - events - none ${navbar.darkPreview ? 'bg-black' : 'bg-white'} `}>
                        {navbar.preview}
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

function NavbarDetailView({ navbarId }: { navbarId: string }) {
  const navigate = useNavigate();
  const navbar = navbarsData[navbarId as keyof typeof navbarsData];

  if (!navbar) {
    return (
      <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
        <ComponentSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Navbar Not Found</h1>
            <button onClick={() => navigate('/others/navbars')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Navbars
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ComponentDetail
      title={navbar.name}
      description={navbar.description}
      preview={
        <div>
          <button onClick={() => navigate('/others/navbars')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to all navbars
          </button>
          <div className={`rounded-xl p-12 flex items-center justify-center min-h-[200px] ${navbar.darkPreview ? 'bg-black' : 'bg-white'}`}>
            {navbar.preview}
          </div>
        </div>
      }
      code={navbar.code}
      usage={navbar.usage}
      props={[]}
      dependencies={[]}
    />
  );
}

export default function Navbars() {
  const { navbarId } = useParams();

  if (navbarId) {
    return <NavbarDetailView navbarId={navbarId} />;
  }

  return <NavbarsGridView />;
}
