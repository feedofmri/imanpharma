import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, User, LogOut, LayoutDashboard, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function BuyerLayout() {
    const { logout, user } = useAuth();
    const location = useLocation();
    const { t } = useLanguage();

    const links = [
        { name: t('buyer.dashboard'), path: '/buyer', icon: LayoutDashboard },
        { name: t('buyer.orders'), path: '/buyer/orders', icon: Package },
        { name: t('buyer.addresses'), path: '/buyer/addresses', icon: MapPin },
        { name: t('buyer.profile'), path: '/buyer/profile', icon: User },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-50 dark:bg-[#0F172A]">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-slate-800 p-6 shrink-0">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('buyer.account')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('buyer.welcome')} {user?.name}</p>
                </div>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || location.pathname === link.path + '/';
                        const Icon = link.icon;
                        return (
                            <Link key={link.path} to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}

                    <button onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors mt-8 w-full"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span>{t('buyer.logout')}</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Tab Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-around px-2 py-1">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || location.pathname === link.path + '/';
                        const Icon = link.icon;
                        return (
                            <Link key={link.path} to={link.path}
                                className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl min-w-[60px] transition-all ${isActive
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-slate-400 dark:text-slate-500'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/30' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-semibold leading-tight">{link.name}</span>
                            </Link>
                        );
                    })}
                    <button onClick={logout}
                        className="flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl min-w-[60px] text-rose-400 dark:text-rose-500"
                    >
                        <div className="p-1.5 rounded-lg">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-semibold leading-tight">{t('buyer.logout')}</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default BuyerLayout;
