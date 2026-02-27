import { ShieldCheck, HeartHandshake, Clock, Pill, Baby, Truck } from 'lucide-react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

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
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Quick Stats */}
      <section className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Why Choose <span className="text-cyan-600 dark:text-cyan-400">Iman Pharmacy?</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Trusted by hundreds of families in Ullapara for genuine medicines and caring service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <FeatureCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Our <span className="text-cyan-600 dark:text-cyan-400">Services</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              From prescription medicines to baby care — we have you covered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200"
              >
                {service.comingSoon && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Coming Soon
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
