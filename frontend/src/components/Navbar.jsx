import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Languages, ShoppingBag, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartDrawer from './CartDrawer';
import logoDark from '../assets/logo/Logo Dark.png';
import logoWhite from '../assets/logo/Logo White.png';

const navLinks = [
  { nameKey: 'nav.home', path: '/' },
  { nameKey: 'nav.products', path: '/products' },
  { nameKey: 'nav.services', path: '/services' },
  { nameKey: 'nav.about', path: '/about' },
  { nameKey: 'nav.faq', path: '/faq' },
  { nameKey: 'nav.contact', path: '/contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { cartCount } = useCart();
  const { isAuthenticated, user, isAdmin, isManager } = useAuth();

  const isSeller = isAdmin || isManager;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <div className="flex items-center justify-center py-1.5">
              <img src={logoDark} alt="Iman Pharmacy Logo" className="h-14 sm:h-16 w-auto block dark:hidden" />
              <img src={logoWhite} alt="Iman Pharmacy Logo" className="h-14 sm:h-16 w-auto hidden dark:block" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 lg:px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {t(link.nameKey)}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative items-center mr-2">
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 lg:w-48 xl:w-56 pl-9 pr-4 py-1.5 text-sm rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1E293B] text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 sm:border-none sm:bg-transparent dark:sm:bg-transparent font-medium text-sm"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
              <span className="font-medium">{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {!isSeller && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0F172A]">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <ThemeToggle />

            {isAuthenticated ? (
              <Link
                to={user?.role === 'buyer' ? '/buyer' : '/seller'}
                className="hidden sm:flex p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors items-center gap-2"
                aria-label="Dashboard"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors items-center gap-2"
              >
                <User className="w-4 h-4" />
                {t('nav.signin')}
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="relative mb-4 mt-2">
              <input
                type="text"
                placeholder={t('nav.search_mobile')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            <div className="flex border-b border-gray-200 dark:border-slate-700 pb-4 mb-4 justify-between items-center px-1">
              {isAuthenticated ? (
                <Link
                  to={user?.role === 'buyer' ? '/buyer' : '/seller'}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium text-sm"
                >
                  <User className="w-4 h-4" /> {t('nav.dashboard')}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium"
                >
                  <User className="w-4 h-4" /> {t('nav.signin')}
                </Link>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {t(link.nameKey)}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {!isSeller && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
}

export default Navbar;
