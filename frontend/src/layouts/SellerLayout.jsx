import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Users, ShoppingBag, LayoutDashboard, LogOut, FileText, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function SellerLayout() {
    const { logout, user, isAdmin } = useAuth();
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/seller', icon: LayoutDashboard },
        { name: 'Products', path: '/seller/products', icon: Package },
        { name: 'Orders', path: '/seller/orders', icon: ShoppingBag },
    ];

    if (isAdmin) {
        links.push({ name: 'Managers', path: '/seller/managers', icon: Users });
        links.push({ name: 'Branches', path: '/seller/branches', icon: Store });
        links.push({ name: 'Reports', path: '/seller/reports', icon: FileText });
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-50 dark:bg-[#0F172A]">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-slate-900 border-r border-slate-800 p-6 shrink-0 text-slate-300">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white">Seller Portal</h2>
                    <p className="text-sm text-slate-400 capitalize">{user?.role} Access</p>
                </div>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || location.pathname === link.path + '/';
                        const Icon = link.icon;
                        return (
                            <Link key={link.path} to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}

                    <button onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-400 hover:bg-rose-500/10 transition-colors mt-8 w-full"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Tab Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-around px-1 py-1 overflow-x-auto">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || location.pathname === link.path + '/';
                        const Icon = link.icon;
                        return (
                            <Link key={link.path} to={link.path}
                                className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl min-w-[52px] transition-all ${isActive
                                    ? 'text-primary-400'
                                    : 'text-slate-500'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-primary-600/20' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-semibold leading-tight">{link.name}</span>
                            </Link>
                        );
                    })}
                    <button onClick={logout}
                        className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl min-w-[52px] text-rose-500"
                    >
                        <div className="p-1.5 rounded-lg">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-semibold leading-tight">Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default SellerLayout;
