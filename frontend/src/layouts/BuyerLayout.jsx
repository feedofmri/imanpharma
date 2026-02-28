import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function BuyerLayout() {
    const { logout, user } = useAuth();
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/buyer', icon: LayoutDashboard },
        { name: 'My Orders', path: '/buyer/orders', icon: Package },
        { name: 'Profile', path: '/buyer/profile', icon: User },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-50 dark:bg-[#0F172A]">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-slate-800 p-6 shrink-0">
                <div className="mb-8 hidden md:block">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Account</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Welcome, {user?.name}</p>
                </div>

                <nav className="space-y-2 flex flex-row overflow-x-auto md:flex-col pb-2 md:pb-0">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || location.pathname === link.path + '/';
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${isActive
                                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="md:inline">{link.name}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors md:mt-8 whitespace-nowrap"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="md:inline">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default BuyerLayout;
