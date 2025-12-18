import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import ComponentDetail from '../ComponentDetail';
import ComponentSidebar from '../../components/ComponentSidebar';

const cardsData = {
    'card-1': {
        id: 'card-1',
        name: 'Glassmorphism Card',
        category: 'Cards',
        description: 'A beautiful glassmorphism card with frosted glass effect, backdrop blur, and subtle shadows.',
        preview: (
            <div className="w-full max-w-sm p-6 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
                <h3 className="text-xl font-bold mb-2 text-white">Glassmorphism</h3>
                <p className="text-sm text-gray-300 mb-4">A modern card design with frosted glass effect and backdrop blur for a premium look.</p>
                <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white' }}>Learn More</button>
            </div>
        ),
        code: `<div 
  className="w-full max-w-sm p-6 rounded-2xl" 
  style={{ 
    background: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(10px)', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' 
  }}
>
  <h3 className="text-xl font-bold mb-2 text-white">Glassmorphism</h3>
  <p className="text-sm text-gray-300 mb-4">
    A modern card design with frosted glass effect and backdrop blur for a premium look.
  </p>
  <button 
    className="px-4 py-2 rounded-lg text-sm font-medium" 
    style={{ 
      background: 'rgba(255, 255, 255, 0.2)', 
      border: '1px solid rgba(255, 255, 255, 0.3)', 
      color: 'white' 
    }}
  >
    Learn More
  </button>
</div>`,
        usage: `<div className="glassmorphism-card">...</div>`,
        darkPreview: true,
    },
    'card-2': {
        id: 'card-2',
        name: 'Neumorphism Card',
        category: 'Cards',
        description: 'A soft UI card with neumorphic design featuring inset and outset shadows.',
        preview: (
            <div className="w-full max-w-sm p-6 rounded-2xl" style={{ backgroundColor: 'rgb(236, 237, 241)', boxShadow: '-5px -5px 10px rgb(250, 251, 255), 5px 5px 10px rgba(166, 171, 189, 0.5)' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(20, 20, 20)' }}>Neumorphism</h3>
                <p className="text-sm mb-4" style={{ color: 'rgb(100, 100, 100)' }}>A soft UI design with subtle shadows creating a 3D embossed effect.</p>
                <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgb(109, 122, 255)', color: 'white', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>Get Started</button>
            </div>
        ),
        code: `<div 
  className="w-full max-w-sm p-6 rounded-2xl" 
  style={{ 
    backgroundColor: 'rgb(236, 237, 241)', 
    boxShadow: '-5px -5px 10px rgb(250, 251, 255), 5px 5px 10px rgba(166, 171, 189, 0.5)' 
  }}
>
  <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(20, 20, 20)' }}>
    Neumorphism
  </h3>
  <p className="text-sm mb-4" style={{ color: 'rgb(100, 100, 100)' }}>
    A soft UI design with subtle shadows creating a 3D embossed effect.
  </p>
  <button 
    className="px-4 py-2 rounded-lg text-sm font-medium" 
    style={{ 
      backgroundColor: 'rgb(109, 122, 255)', 
      color: 'white', 
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' 
    }}
  >
    Get Started
  </button>
</div>`,
        usage: `<div className="neumorphism-card">...</div>`,
        darkPreview: false,
    },
    'card-3': {
        id: 'card-3',
        name: 'Gradient Border Card',
        category: 'Cards',
        description: 'A modern card with animated gradient border and dark background.',
        preview: (
            <div className="relative w-full max-w-sm p-6 rounded-2xl overflow-hidden group" style={{ backgroundColor: 'rgb(10, 10, 20)' }}>
                <div className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(45deg, rgb(255, 0, 150), rgb(0, 204, 255))', padding: '2px' }}>
                    <div className="w-full h-full rounded-2xl" style={{ backgroundColor: 'rgb(10, 10, 20)' }} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">Gradient Border</h3>
                    <p className="text-sm text-gray-400 mb-4">A sleek card with an animated gradient border that intensifies on hover.</p>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-black">Explore</button>
                </div>
            </div>
        ),
        code: `<div 
  className="relative w-full max-w-sm p-6 rounded-2xl overflow-hidden group" 
  style={{ backgroundColor: 'rgb(10, 10, 20)' }}
>
  <div 
    className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" 
    style={{ 
      background: 'linear-gradient(45deg, rgb(255, 0, 150), rgb(0, 204, 255))', 
      padding: '2px' 
    }}
  >
    <div className="w-full h-full rounded-2xl" style={{ backgroundColor: 'rgb(10, 10, 20)' }} />
  </div>
  <div className="relative z-10">
    <h3 className="text-xl font-bold mb-2 text-white">Gradient Border</h3>
    <p className="text-sm text-gray-400 mb-4">
      A sleek card with an animated gradient border that intensifies on hover.
    </p>
    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-black">
      Explore
    </button>
  </div>
</div>`,
        usage: `<div className="gradient-border-card">...</div>`,
        darkPreview: true,
    },
    'card-4': {
        id: 'card-4',
        name: 'Animated Task Stack Card',
        category: 'Cards',
        description: 'A sophisticated card with stacked animated task items, glowing icon box, and corner decorations that appear on hover.',
        preview: (
            <div className="group relative w-full max-w-md p-8 rounded-2xl border pointer-events-auto" style={{ backgroundColor: 'rgb(1, 1, 13)', borderColor: 'rgb(24, 24, 37)' }}>
                <div className="relative mb-6" style={{ height: '180px' }}>
                    <div className="absolute inset-x-0 top-0 p-3 rounded-xl border" style={{ backgroundColor: 'rgb(1, 1, 13)', borderColor: 'rgb(24, 24, 37)', filter: 'blur(1px)', transform: 'translateY(-8px)', opacity: 0.5 }}>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border" style={{ borderColor: 'rgb(240, 240, 255)' }} />
                            <span className="text-xs" style={{ color: 'rgb(240, 240, 255)' }}>Cost Management</span>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 p-3 rounded-xl border" style={{ backgroundColor: 'rgb(1, 1, 13)', borderColor: 'rgb(24, 24, 37)', top: '15px', transform: 'scale(1.03)' }}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: 'rgb(240, 240, 255)' }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5L4 7L8 2" stroke="rgb(240, 240, 255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium" style={{ color: 'rgb(240, 240, 255)' }}>Payment reminder</span>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgb(240, 240, 255)' }} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'rgb(1, 1, 13)', borderColor: 'rgb(24, 24, 37)' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgb(240, 240, 255)" strokeWidth="1.5">
                            <path d="M7 9l2 2L17 3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 10v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="absolute inset-0 rounded-xl" style={{ background: 'radial-gradient(circle, rgba(240, 240, 255, 0.2) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2 text-white">Automate Repetitive Tasks</h4>
                    <p className="text-xs opacity-60" style={{ color: 'rgb(240, 240, 255)' }}>
                        Eliminate busywork and let AI handle the routine so your team can focus on what matters.
                    </p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                <div className="absolute top-3 left-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute top-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute bottom-3 left-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
                <div className="absolute bottom-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
            </div>
        ),
        code: `<div 
  className="group relative w-full max-w-md p-8 rounded-2xl border" 
  style={{ 
    backgroundColor: 'rgb(1, 1, 13)', 
    borderColor: 'rgb(24, 24, 37)' 
  }}
>
  {/* Stacked task items */}
  <div className="relative mb-6" style={{ height: '180px' }}>
    {/* Background task - blurred */}
    <div 
      className="absolute inset-x-0 top-0 p-3 rounded-xl border" 
      style={{ 
        backgroundColor: 'rgb(1, 1, 13)', 
        borderColor: 'rgb(24, 24, 37)', 
        filter: 'blur(1px)', 
        transform: 'translateY(-8px)', 
        opacity: 0.5 
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded border" style={{ borderColor: 'rgb(240, 240, 255)' }} />
        <span className="text-xs" style={{ color: 'rgb(240, 240, 255)' }}>Cost Management</span>
      </div>
    </div>
    
    {/* Active task - focused */}
    <div 
      className="absolute inset-x-0 p-3 rounded-xl border" 
      style={{ 
        backgroundColor: 'rgb(1, 1, 13)', 
        borderColor: 'rgb(24, 24, 37)', 
        top: '15px', 
        transform: 'scale(1.03)' 
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: 'rgb(240, 240, 255)' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4 7L8 2" stroke="rgb(240, 240, 255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xs font-medium" style={{ color: 'rgb(240, 240, 255)' }}>Payment reminder</span>
        </div>
      </div>
    </div>
    
    {/* Icon box with glow */}
    <div 
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl border flex items-center justify-center" 
      style={{ 
        backgroundColor: 'rgb(1, 1, 13)', 
        borderColor: 'rgb(24, 24, 37)' 
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgb(240, 240, 255)" strokeWidth="1.5">
        <path d="M7 9l2 2L17 3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div 
        className="absolute inset-0 rounded-xl" 
        style={{ 
          background: 'radial-gradient(circle, rgba(240, 240, 255, 0.2) 0%, transparent 70%)', 
          filter: 'blur(6px)' 
        }} 
      />
    </div>
  </div>
  
  {/* Text content */}
  <div className="mb-4">
    <h4 className="text-lg font-bold mb-2 text-white">Automate Repetitive Tasks</h4>
    <p className="text-xs opacity-60" style={{ color: 'rgb(240, 240, 255)' }}>
      Eliminate busywork and let AI handle the routine so your team can focus on what matters.
    </p>
  </div>
  
  {/* Corner decorations - appear on hover */}
  <div className="absolute top-3 left-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute top-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderTop: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute bottom-3 left-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderLeft: '2px solid rgb(240, 240, 255)' }} />
  <div className="absolute bottom-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderBottom: '2px solid rgb(240, 240, 255)', borderRight: '2px solid rgb(240, 240, 255)' }} />
</div>`,
        usage: `<div className="task-stack-card">...</div>`,
        darkPreview: true,
    },
};

function CardsGridView() {
    const navigate = useNavigate();
    const cardsList = Object.values(cardsData);

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
                            <h1 className="text-5xl font-bold mb-4">Cards</h1>
                            <p className="text-xl text-gray-400">Click on any card to view its code and documentation</p>
                        </div>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cardsList.map((card) => (
                                <div key={card.id} onClick={() => navigate(`/others/cards/${card.id}`)} className="group text-left cursor-pointer">
                                    <div className="relative bg-[#0d0520] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 h-full">
                                        <div className="p-6 pb-4">
                                            <h3 className="text-xl font-semibold mb-1 text-white">{card.name}</h3>
                                            <p className="text-sm text-gray-400">{card.category}</p>
                                        </div>
                                        <div className="px-6 pb-6">
                                            <div className={`rounded-xl p-12 flex items-center justify-center min-h-[250px] pointer-events-none ${card.darkPreview ? 'bg-black' : 'bg-white'}`}>
                                                {card.preview}
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

function CardDetailView({ cardId }: { cardId: string }) {
    const navigate = useNavigate();
    const card = cardsData[cardId as keyof typeof cardsData];

    if (!card) {
        return (
            <div className="min-h-screen bg-[#0a0118] flex overflow-hidden">
                <ComponentSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Card Not Found</h1>
                        <button onClick={() => navigate('/others/cards')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Cards
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ComponentDetail
            title={card.name}
            description={card.description}
            preview={
                <div>
                    <button onClick={() => navigate('/others/cards')} className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all cards
                    </button>
                    <div className={`rounded-xl p-12 flex items-center justify-center min-h-[300px] ${card.darkPreview ? 'bg-black' : 'bg-white'}`}>
                        {card.preview}
                    </div>
                </div>
            }
            code={card.code}
            usage={card.usage}
            props={[]}
            dependencies={[]}
        />
    );
}

export default function Cards() {
    const { cardId } = useParams();

    if (cardId) {
        return <CardDetailView cardId={cardId} />;
    }

    return <CardsGridView />;
}
