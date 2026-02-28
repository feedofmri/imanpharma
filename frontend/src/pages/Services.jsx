import {
  Pill,
  ShoppingBag,
  Scissors,
  Sparkles,
  Cross,
  Upload,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const getCategories = (t) => [
  {
    icon: Pill,
    title: t('services.cat.chronic.title'),
    description: t('services.cat.chronic.desc'),
    items: t('services.cat.chronic.tags'),
  },
  {
    icon: ShoppingBag,
    title: t('services.cat.otc.title'),
    description: t('services.cat.otc.desc'),
    items: t('services.cat.otc.tags'),
  },
  {
    icon: Scissors,
    title: t('services.cat.surgical.title'),
    description: t('services.cat.surgical.desc'),
    items: t('services.cat.surgical.tags'),
  },
  {
    icon: Sparkles,
    title: t('services.cat.care.title'),
    description: t('services.cat.care.desc'),
    items: t('services.cat.care.tags'),
  },
  {
    icon: Cross,
    title: t('services.cat.firstaid.title'),
    description: t('services.cat.firstaid.desc'),
    items: t('services.cat.firstaid.tags'),
  },
];

function Services() {
  const { t } = useLanguage();
  const categories = getCategories(t);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Navigate to order details page, passing the file info in state
      navigate('/order-details', { state: { fileName: file.name } });
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
              <Pill className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                {t('services.tag')}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('services.title_1')}{' '}
              <span className="text-primary-600 dark:text-primary-400">{t('services.title_2')}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('services.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Prescription Card */}
      <section className="bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto relative z-10">
            {/* Background glowing blur effect */}
            <div className="absolute inset-0 bg-primary-400/20 dark:bg-primary-600/10 blur-3xl rounded-full transform translate-y-10 scale-105" />

            <div className="relative bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('services.upload_title')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('services.upload_desc')}
                </p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary-200 dark:border-primary-800/60 rounded-2xl p-10 text-center bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-all duration-300">
                  <Upload className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-lg text-slate-900 dark:text-white font-medium mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {t('services.upload_cta')}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  {t('services.upload_types')}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>{t('home.hero.verified')}</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>{t('home.hero.fast')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {t('services.whatsapp_or')}
                </p>
                <a
                  href="https://wa.me/8801716982965"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:underline"
                >
                  {t('services.whatsapp_btn')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
