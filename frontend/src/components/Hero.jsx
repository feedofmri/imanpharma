import { MapPin, MessageCircle, Upload, CheckCircle2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Navigate to order details page, passing the file info in state
      navigate('/order-details', { state: { fileName: file.name } });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
                {t('home.hero.open')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              {t('home.hero.title_1')}{' '}
              <span className="text-primary-600 dark:text-primary-400">{t('home.hero.title_highlight')}</span>{' '}
              {t('home.hero.title_2')}
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              {t('home.hero.description')}
            </p>

            <form onSubmit={handleSearch} className="mt-8 relative max-w-lg">
              <div className="flex items-center bg-white dark:bg-[#1E293B] rounded-2xl p-2 pl-4 shadow-lg shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:border-primary-500 transition-all">
                <input
                  type="text"
                  placeholder={t('home.hero.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3 py-3"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="shrink-0 p-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-colors flex items-center justify-center"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Upload Prescription Card */}
          <div className="relative z-10 mt-12 lg:mt-0">
            {/* Background glowing blur effect */}
            <div className="absolute inset-0 bg-primary-400/20 dark:bg-primary-600/10 blur-3xl rounded-full transform translate-y-10 scale-105" />

            <div className="relative bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('home.hero.have_prescription')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {t('home.hero.upload_desc')}
                </p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary-200 dark:border-primary-800/60 rounded-2xl p-8 text-center bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-all duration-300">
                  <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-slate-900 dark:text-white font-medium mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {t('home.hero.click_upload')}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs">
                  {t('home.hero.file_types')}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{t('home.hero.verified')}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{t('home.hero.fast')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
