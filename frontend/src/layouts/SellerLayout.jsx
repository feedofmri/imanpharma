import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Users, ShoppingBag, LayoutDashboard, LogOut, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function SellerLayout() {
    const { logout, user, isAdmin } = useAuth();
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/seller', icon: LayoutDashboard },
        { name: 'Products', path: '/seller/products', icon: Package },
        { name: 'Orders', path: '/seller/orders', icon: ShoppingBag },
    ];

    // Admins might have an extra "Users/Managers" link later, but for now just basic structure
    if (isAdmin) {
        links.push({ name: 'Managers', path: '/seller/managers', icon: Users });
        links.push({ name: 'Reports', path: '/seller/reports', icon: FileText });
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-50 dark:bg-[#0F172A]">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 shrink-0 text-slate-300">
                <div className="mb-8 hidden md:block">
                    <h2 className="text-xl font-bold text-white">Seller Portal</h2>
                    <p className="text-sm text-slate-400 capitalize">{user?.role} Access</p>
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
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="md:inline">{link.name}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-400 hover:bg-rose-500/10 transition-colors md:mt-8 whitespace-nowrap"
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

export default SellerLayout;
