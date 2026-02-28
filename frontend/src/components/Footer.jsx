import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logoDark from '../assets/logo/Logo Dark.png';
import logoWhite from '../assets/logo/Logo White.png';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-start mb-6">
              <div className="flex items-center justify-center">
                <img src={logoDark} alt="Iman Pharmacy Logo" className="h-20 sm:h-24 w-auto block dark:hidden" />
                <img src={logoWhite} alt="Iman Pharmacy Logo" className="h-20 sm:h-24 w-auto hidden dark:block" />
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your trusted health partner in Ullapara. Providing authentic medicines and expert
              pharmaceutical advice to the community since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Sirajganj Road, Ullapara, Sirajganj
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  +880 1XXX-XXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                <a
                  href="mailto:info@imanpharmacy.com"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@imanpharmacy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} M/S Iman Pharmacy. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Proprietor: <span className="font-medium text-slate-700 dark:text-slate-300">Md. Shafiqul Islam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
