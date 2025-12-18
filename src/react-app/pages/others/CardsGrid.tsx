import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface CardVariant {
    id: string;
    name: string;
    category: string;
    component: React.ReactNode;
}

// Card variants data - you can add more cards here
const cardVariants: CardVariant[] = [
    // Add card variants here following the same structure as buttons
    // Example:
    // {
    //   id: 'card-1',
    //   name: 'Glassmorphism Card',
    //   category: 'Cards',
    //   component: <YourCardComponent />
    // },
];

export default function CardsGrid() {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0118] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Cards</h1>
                    <p className="text-gray-400">
                        A collection of beautiful, interactive card components
                    </p>
                </div>

                {/* Grid of Card Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardVariants.map((card) => (
                        <Link
                            key={card.id}
                            to={`/others/cards/${card.id}`}
                            className="group"
                        >
                            <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(card.id);
                                    }}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(card.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-white'
                                            }`}
                                    />
                                </button>

                                {/* Card Header */}
                                <div className="p-6 pb-4">
                                    <h3 className="text-xl font-semibold mb-1">{card.name}</h3>
                                    <p className="text-sm text-gray-400">{card.category}</p>
                                </div>

                                {/* Preview Area */}
                                <div className="px-6 pb-6">
                                    <div className="bg-black/40 rounded-xl p-8 flex items-center justify-center min-h-[200px] border border-white/5">
                                        {card.component}
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {cardVariants.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No cards available yet.</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Add card variants to the cardVariants array.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
