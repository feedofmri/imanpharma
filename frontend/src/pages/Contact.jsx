import { Phone, MessageCircle, Mail, MapPin, Clock, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getContactMethods = (t) => [
  {
    icon: Phone,
    title: t('contact.methods.phone_title'),
    value: '+880 1716 982965',
    action: 'tel:+8801716982965',
    actionLabel: t('contact.methods.phone_btn'),
    description: t('contact.methods.phone_desc'),
  },
  {
    icon: MessageCircle,
    title: t('contact.methods.wa_title'),
    value: '+880 1716 982965',
    action: 'https://wa.me/8801716982965',
    actionLabel: t('contact.methods.wa_btn'),
    description: t('contact.methods.wa_desc'),
    external: true,
  },
  {
    icon: Mail,
    title: t('contact.methods.email_title'),
    value: 'info@imanpharma.com',
    action: 'mailto:info@imanpharma.com',
    actionLabel: t('contact.methods.email_btn'),
    description: t('contact.methods.email_desc'),
  },
];

function Contact() {
  const { t } = useLanguage();
  const contactMethods = getContactMethods(t);
  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                {t('contact.tag')}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('contact.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('contact.title_2')}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('contact.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                  {method.value}
                </p>
                <a
                  href={method.action}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white text-sm font-medium transition-colors duration-200"
                >
                  {method.actionLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address & Map */}
      <section id="location" className="bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Address Details */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                {t('contact.loc_title_1')} <span className="text-primary-600 dark:text-primary-400">{t('contact.loc_title_2')}</span>
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{t('contact.address_title')}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {t('contact.address_val')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {t('contact.hours_title')}
                    </h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>{t('contact.hours_1')}</p>
                      <p>{t('contact.hours_2')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {t('contact.dir_title')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {t('contact.dir_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[350px] rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <iframe
                  title="Google Maps - Location"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 min-h-[350px]"
                  src="https://maps.google.com/maps?q=Sirajganj%20Road,%20Ullapara,%20Sirajganj&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
