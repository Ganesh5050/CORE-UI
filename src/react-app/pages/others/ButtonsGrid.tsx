import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ButtonVariant {
    id: string;
    name: string;
    category: string;
    component: React.ReactNode;
}

// Button variants data - you can add more buttons here
const buttonVariants: ButtonVariant[] = [
    {
        id: 'button-1',
        name: 'Glassmorphism Button',
        category: 'Buttons',
        component: (
            <a
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200"
                href="#"
                style={{
                    backgroundColor: 'rgb(245, 245, 245)',
                    borderRadius: '10px',
                    boxShadow: `rgba(158, 158, 158, 0.69) 0px 0.706592px 0.706592px -0.583333px, 
                      rgba(158, 158, 158, 0.68) 0px 1.80656px 1.80656px -1.16667px, 
                      rgba(158, 158, 158, 0.65) 0px 3.62176px 3.62176px -1.75px, 
                      rgba(158, 158, 158, 0.61) 0px 6.8656px 6.8656px -2.33333px, 
                      rgba(158, 158, 158, 0.52) 0px 13.6468px 13.6468px -2.91667px, 
                      rgba(158, 158, 158, 0.3) 0px 30px 30px -3.5px, 
                      rgb(255, 255, 255) 0px 3px 1px 0px inset`,
                    color: 'rgb(0, 0, 0)',
                }}
            >
                See Our Services
            </a>
        ),
    },
    // Add more button variants here following the same structure
];

export default function ButtonsGrid() {
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
                    <h1 className="text-4xl font-bold mb-2">Buttons</h1>
                    <p className="text-gray-400">
                        A collection of beautiful, interactive button components
                    </p>
                </div>

                {/* Grid of Button Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buttonVariants.map((button) => (
                        <Link
                            key={button.id}
                            to={`/others/buttons/${button.id}`}
                            className="group"
                        >
                            <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(button.id);
                                    }}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(button.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-white'
                                            }`}
                                    />
                                </button>

                                {/* Card Header */}
                                <div className="p-6 pb-4">
                                    <h3 className="text-xl font-semibold mb-1">{button.name}</h3>
                                    <p className="text-sm text-gray-400">{button.category}</p>
                                </div>

                                {/* Preview Area - WHITE BACKGROUND FOR BUTTONS */}
                                <div className="px-6 pb-6">
                                    <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[200px]">
                                        {button.component}
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {buttonVariants.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No buttons available yet.</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Add button variants to the buttonVariants array.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
