import { useParams, Link } from 'react-router';
import { ArrowLeft, Copy, Heart } from 'lucide-react';
import { useState } from 'react';

interface ButtonData {
    id: string;
    name: string;
    category: string;
    description: string;
    code: string;
    preview: React.ReactNode;
}

// Button data - matches the ButtonsGrid data
const buttonsData: Record<string, ButtonData> = {
    'button-1': {
        id: 'button-1',
        name: 'Glassmorphism Button',
        category: 'Buttons',
        description: 'A beautiful glassmorphism button with layered shadows and inset highlights.',
        code: `<a
  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200"
  href="#"
  style={{
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: '10px',
    boxShadow: \`rgba(158, 158, 158, 0.69) 0px 0.706592px 0.706592px -0.583333px, 
                rgba(158, 158, 158, 0.68) 0px 1.80656px 1.80656px -1.16667px, 
                rgba(158, 158, 158, 0.65) 0px 3.62176px 3.62176px -1.75px, 
                rgba(158, 158, 158, 0.61) 0px 6.8656px 6.8656px -2.33333px, 
                rgba(158, 158, 158, 0.52) 0px 13.6468px 13.6468px -2.91667px, 
                rgba(158, 158, 158, 0.3) 0px 30px 30px -3.5px, 
                rgb(255, 255, 255) 0px 3px 1px 0px inset\`,
    color: 'rgb(0, 0, 0)',
  }}
>
  See Our Services
</a>`,
        preview: (
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
    // Add more button data here
};

export default function ButtonDetail() {
    const { buttonId } = useParams();
    const [copied, setCopied] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const button = buttonId ? buttonsData[buttonId] : null;

    const copyCode = () => {
        if (button) {
            navigator.clipboard.writeText(button.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!button) {
        return (
            <div className="min-h-screen bg-[#0a0118] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Button Not Found</h1>
                    <Link
                        to="/others/buttons"
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Buttons
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0118] text-white">
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/others/buttons"
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Buttons
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{button.name}</h1>
                            <p className="text-gray-400">{button.description}</p>
                        </div>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Heart
                                className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[300px]">
                        {button.preview}
                    </div>
                </div>

                {/* Code Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Code</h2>
                        <button
                            onClick={copyCode}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                    <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                        <pre className="p-6 overflow-x-auto">
                            <code className="text-sm text-gray-300">{button.code}</code>
                        </pre>
                    </div>
                </div>

                {/* Usage Section */}
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 p-6">
                    <h3 className="text-xl font-semibold mb-3">Usage</h3>
                    <p className="text-gray-400 mb-4">
                        Simply copy the code above and paste it into your React component. Make sure to adjust the styles and content to match your design needs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                            React
                        </span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                            Tailwind CSS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
