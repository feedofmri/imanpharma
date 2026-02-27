import { MapPin, MessageCircle } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0F172A]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-50 dark:bg-primary-900/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                Open 7 Days a Week
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              Your Trusted{' '}
              <span className="text-primary-600 dark:text-primary-400">Health Partner</span>{' '}
              in Ullapara
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              M/S Iman Pharmacy provides 100% authentic medicines, expert pharmaceutical advice, and
              reliable health solutions for the entire Ullapara community.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#location"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-600/20 transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                Find Location
              </a>
              <a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                <svg
                  className="w-16 h-16 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Pharmacy Storefront Image</span>
                <span className="text-xs mt-1">Recommended: 800×600px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
