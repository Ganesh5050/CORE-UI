import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, X, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

const overlaysData = {
    'overlay-1': {
        id: 'overlay-1',
        name: 'Glassmorphism Modal',
        category: 'Overlays',
        description: 'A modern modal with glassmorphism effect and backdrop blur.',
        preview: (
            <div className="relative w-full h-64 flex items-center justify-center">
                <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
                        backdropFilter: 'blur(10px)',
                    }}
                />
                <div
                    className="relative z-10 w-80 p-6 rounded-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Modal Title</h3>
                        <button className="text-white hover:text-gray-300 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-200 mb-4">
                        This is a beautiful glassmorphism modal with backdrop blur effect.
                    </p>
                    <div className="flex gap-2">
                        <button
                            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white"
                            style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white"
                            style={{ background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(59, 130, 246))' }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        ),
        code: `<div className="fixed inset-0 flex items-center justify-center z-50">
  <div 
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
      backdropFilter: 'blur(10px)',
    }}
  />
  <div 
    className="relative z-10 w-96 p-6 rounded-2xl"
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-white">Modal Title</h3>
      <button className="text-white hover:text-gray-300">
        <X className="w-5 h-5" />
      </button>
    </div>
    <p className="text-sm text-gray-200 mb-4">
      Modal content goes here.
    </p>
    <div className="flex gap-2">
      <button className="flex-1 px-4 py-2 rounded-lg">Cancel</button>
      <button className="flex-1 px-4 py-2 rounded-lg">Confirm</button>
    </div>
  </div>
</div>`,
        usage: `<GlassmorphismModal />`,
        darkPreview: true,
    },
    'overlay-2': {
        id: 'overlay-2',
        name: 'Tooltip Popover',
        category: 'Overlays',
        description: 'A simple tooltip popover with arrow pointer.',
        preview: (
            <div className="relative w-full h-48 flex items-center justify-center">
                <div className="relative group">
                    <button
                        className="px-6 py-3 rounded-lg font-medium text-white"
                        style={{ backgroundColor: 'rgb(59, 130, 246)' }}
                    >
                        Hover me
                    </button>
                    <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                        style={{ backgroundColor: 'rgb(31, 41, 55)' }}
                    >
                        <span className="text-sm text-white">This is a tooltip!</span>
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: '6px solid rgb(31, 41, 55)',
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        code: `<div className="relative group">
  <button className="px-6 py-3 rounded-lg bg-blue-500 text-white">
    Hover me
  </button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
    <span className="text-sm text-white">This is a tooltip!</span>
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-800" />
  </div>
</div>`,
        usage: `<Tooltip />`,
        darkPreview: false,
    },
    'overlay-3': {
        id: 'overlay-3',
        name: 'Notification Toast',
        category: 'Overlays',
        description: 'Animated notification toast with icons and auto-dismiss.',
        preview: (
            <div className="relative w-full h-48 flex items-center justify-center">
                <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-in-right"
                    style={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">Success!</h4>
                        <p className="text-xs text-gray-600">Your changes have been saved.</p>
                    </div>
                    <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ),
        code: `<div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-white border">
  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
    <CheckCircle className="w-5 h-5 text-green-600" />
  </div>
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-gray-900">Success!</h4>
    <p className="text-xs text-gray-600">Your changes have been saved.</p>
  </div>
  <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
    <X className="w-4 h-4" />
  </button>
</div>`,
        usage: `<Toast />`,
        darkPreview: false,
    },
    'overlay-4': {
        id: 'overlay-4',
        name: 'Dropdown Menu',
        category: 'Overlays',
        description: 'Animated dropdown menu with smooth transitions.',
        preview: (
            <div className="relative w-full h-64 flex items-center justify-center pointer-events-auto">
                <div className="relative group">
                    <button
                        className="px-6 py-3 rounded-lg font-medium"
                        style={{
                            backgroundColor: 'rgb(31, 41, 55)',
                            color: 'white',
                        }}
                    >
                        Open Menu
                    </button>
                    <div
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                        style={{
                            backgroundColor: 'rgb(255, 255, 255)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div className="p-2">
                            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Info className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-700">Profile</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <AlertCircle className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-700">Settings</span>
                            </a>
                            <div className="my-1 h-px bg-gray-200" />
                            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                <X className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-600">Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        ),
        code: `<div className="relative group">
  <button className="px-6 py-3 rounded-lg bg-gray-800 text-white">
    Open Menu
  </button>
  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl bg-white border opacity-0 group-hover:opacity-100 transition-all">
    <div className="p-2">
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <Info className="w-4 h-4" />
        <span className="text-sm">Profile</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">Settings</span>
      </a>
      <div className="my-1 h-px bg-gray-200" />
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50">
        <X className="w-4 h-4 text-red-600" />
        <span className="text-sm text-red-600">Logout</span>
      </a>
    </div>
  </div>
</div>`,
        usage: `<DropdownMenu />`,
        darkPreview: false,
    },
    'overlay-5': {
        id: 'overlay-5',
        name: 'Animated Modal',
        category: 'Overlays',
        description: 'A customizable compound modal component with animated transitions using motion.',
        preview: (
            <div className="relative w-full h-64 flex items-center justify-center">
                <button
                    className="px-6 py-3 rounded-lg font-medium text-white relative overflow-hidden group"
                    style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                >
                    <span className="group-hover:translate-x-40 text-center transition duration-500 inline-block">
                        Open Modal
                    </span>
                    <div className="-translate-x-40 group-hover:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ✨
                    </div>
                </button>
            </div>
        ),
        code: `// Animated Modal Component
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";

function AnimatedModalDemo() {
  return (
    <Modal>
      <ModalTrigger className="bg-black text-white flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Open Modal
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          ✨
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Modal Title
          </h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            Your modal content goes here with beautiful animations.
          </p>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button className="px-2 py-1 bg-gray-200 text-black rounded-md text-sm w-28">
            Cancel
          </button>
          <button className="bg-black text-white text-sm px-2 py-1 rounded-md w-28">
            Confirm
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}`,
        usage: `<AnimatedModal />`,
        darkPreview: false,
    },
    'overlay-6': {
        id: 'overlay-6',
        name: 'Animated Tooltip',
        category: 'Overlays',
        description: 'A cool tooltip that reveals on hover and follows mouse pointer with animations.',
        preview: (
            <div className="relative w-full h-48 flex items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative group">
                            <div
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `hsl(${item * 60}, 70%, 50%)` }}
                            >
                                {item}
                            </div>
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 rounded-md bg-black text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                <div className="font-bold">User {item}</div>
                                <div className="text-gray-400">Role {item}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        code: `// Animated Tooltip Component
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
];

function AnimatedTooltipDemo() {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}`,
        usage: `<AnimatedTooltip items={people} />`,
        darkPreview: false,
    },
};

function OverlaysGridView() {
    const navigate = useNavigate();
    const overlaysList = Object.values(overlaysData);

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
                            <h1 className="text-5xl font-bold mb-4">Overlays & Popovers</h1>
                            <p className="text-xl text-gray-400">Click on any overlay to view its code and documentation</p>
                        </div>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
                            {overlaysList.map((overlay) => (
                                <div key={overlay.id} onClick={() => navigate(`/others/overlays/${overlay.id}`)} className="group text-left cursor-pointer">
                                    <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                                        <div className="p-6 pb-4">
                                            <h3 className="text-xl font-semibold mb-1 text-white">{overlay.name}</h3>
                                            <p className="text-sm text-gray-400">{overlay.category}</p>
                                        </div>
                                        <div className="px-6 pb-6">
                                            <div className={`rounded-xl p-8 flex items-center justify-center min-h-[200px] pointer-events-none ${overlay.darkPreview ? 'bg-black' : 'bg-white'}`}>
                                                {overlay.preview}
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

function OverlayDetailView({ overlayId }: { overlayId: string }) {
    const navigate = useNavigate();
    const overlay = overlaysData[overlayId as keyof typeof overlaysData];

    if (!overlay) {
        return (
            <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
                <ComponentSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Overlay Not Found</h1>
                        <button onClick={() => navigate('/others/overlays')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Overlays
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ComponentDetail
            title={overlay.name}
            description={overlay.description}
            preview={
                <div>
                    <button onClick={() => navigate('/others/overlays')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all overlays
                    </button>
                    <div className={`rounded-xl p-12 flex items-center justify-center min-h-[300px] ${overlay.darkPreview ? 'bg-black' : 'bg-white'}`}>
                        {overlay.preview}
                    </div>
                </div>
            }
            code={overlay.code}
            usage={overlay.usage}
            props={[]}
            dependencies={[]}
        />
    );
}

export default function Overlays() {
    const { overlayId } = useParams();

    if (overlayId) {
        return <OverlayDetailView overlayId={overlayId} />;
    }

    return <OverlaysGridView />;
}
