import { ShieldCheck, HeartHandshake, Clock, Pill, Baby, Truck, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

const stats = [
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    description: 'Every medicine sourced directly from authorized distributors. No compromises on quality.',
    accent: true,
  },
  {
    icon: HeartHandshake,
    title: 'Expert Advice',
    description: 'Our trained pharmacists provide professional guidance on medications and dosage.',
    accent: false,
  },
  {
    icon: Clock,
    title: 'Open 7 Days',
    description: "We are here for you every day of the week, because health emergencies don't wait.",
    accent: false,
  },
];

const services = [
  {
    icon: Pill,
    title: 'Prescription Medicine',
    description: 'Full range of prescription drugs from trusted national and international brands.',
  },
  {
    icon: Baby,
    title: 'Baby Care',
    description: 'Complete baby care essentials — formulas, diapers, skincare, and hygiene products.',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    description: 'Coming soon — doorstep delivery for your medicines and healthcare products.',
    comingSoon: true,
  },
];

function Home() {
  const { t } = useLanguage();
  const { products } = useData();
  const featuredProducts = products.slice(0, 9);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Quick Stats */}
      <section className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t('home.why.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('home.why.title_highlight')}</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t('home.why.description')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShieldCheck}
              title={t('home.why.auth_title')}
              description={t('home.why.auth_desc')}
              accent={true}
            />
            <FeatureCard
              icon={HeartHandshake}
              title={t('home.why.expert_title')}
              description={t('home.why.expert_desc')}
              accent={false}
            />
            <FeatureCard
              icon={Clock}
              title={t('home.why.open_title')}
              description={t('home.why.open_desc')}
              accent={false}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-slate-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t('home.featured.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('home.featured.title_highlight')}</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t('home.featured.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] hover:shadow-xl dark:hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    {product.category}
                  </span>
                  {Object.values(product.branchStock || {}).some(v => v > 0) ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {t('home.featured.in_stock')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                      {t('home.featured.out_of_stock')}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {product.price}
                  </span>
                  <span className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    {t('home.featured.details')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors border border-primary-200 dark:border-primary-800/50"
            >
              {t('home.featured.browse')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t('home.services.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('home.services.title_highlight')}</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t('home.services.description')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Pill className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('home.services.rx_title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.services.rx_desc')}</p>
            </div>
            <div className="relative p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Baby className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('home.services.baby_title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.services.baby_desc')}</p>
            </div>
            <div className="relative p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200">
              <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                {t('home.services.coming_soon')}
              </span>
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('home.services.delivery_title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.services.delivery_desc')}</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {t('home.services.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>





      {/* Explore Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('home.explore.p_title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('home.explore.p_desc')}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 dark:bg-primary-500 text-white font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              >
                {t('home.explore.p_btn')}
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('home.explore.q_title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('home.explore.q_desc')}
              </p>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                {t('home.explore.q_btn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Strip */}
      <section className="bg-primary-600 dark:bg-primary-900 border-t border-primary-700 dark:border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('home.cta.title')}
              </h2>
              <p className="text-primary-100 dark:text-primary-200">
                {t('home.cta.desc')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#location"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#1E293B] text-primary-600 dark:text-primary-400 font-semibold text-sm shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                {t('home.cta.location')}
              </a>
              <a
                href="https://wa.me/8801716982965"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white dark:border-slate-700 text-white font-semibold text-sm hover:bg-primary-700 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                {t('home.cta.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
