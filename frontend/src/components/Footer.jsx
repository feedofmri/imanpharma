import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import logoDark from '../assets/logo/Logo Dark.png';
import logoWhite from '../assets/logo/Logo White.png';
import { useLanguage } from '../contexts/LanguageContext';

const getCompanyLinks = (t) => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.about'), path: '/about' },
  { name: t('nav.services'), path: '/services' },
  { name: t('nav.products'), path: '/products' },
];

const getCustomerCareLinks = (t) => [
  { name: t('buyer.account'), path: '/buyer' },
  { name: t('buyer.complaints'), path: '/buyer/complaints' },
  { name: t('nav.faq'), path: '/faq' },
  { name: t('nav.contact'), path: '/contact' },
];

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const companyLinks = getCompanyLinks(t);
  const careLinks = getCustomerCareLinks(t);

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center justify-center">
                <img src={logoDark} alt="Iman Pharmacy Logo" className="h-16 sm:h-20 w-auto block dark:hidden" />
                <img src={logoWhite} alt="Iman Pharmacy Logo" className="h-16 sm:h-20 w-auto hidden dark:block" />
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Customer Care
            </h3>
            <ul className="space-y-4">
              {careLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {t('contact.address_val')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                <a
                  href="tel:+8801716982965"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  +880 1716 982965
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                <a
                  href="mailto:info@imanpharma.com"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@imanpharma.com
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} {t('footer.rights')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {t('footer.director')}: <span className="font-medium text-slate-700 dark:text-slate-300">{t('about.director_name')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
