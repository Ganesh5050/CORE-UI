import { Link } from 'react-router';

export default function FinalCTA() {
  return (
    <section className="relative z-20 bg-[#0a0118] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Orange gradient card - matches theme */}
        <div
          className="relative rounded-3xl p-16 text-center overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)' }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Start Exploring
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Animations, Components, Backgrounds - One Click Away
            </p>

            <Link
              to="/get-started/index"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white rounded-full transition-transform hover:scale-105"
            >
              <span style={{ color: '#c2410c', fontWeight: 600 }}>Browse Components</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
