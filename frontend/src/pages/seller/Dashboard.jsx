import { DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function SellerDashboard() {
    const { isAdmin } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Shop Overview</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Today's metrics and alerts</p>
                </div>
                {isAdmin && (
                    <div className="flex gap-2">
                        <select className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 block p-2">
                            <option>All Branches</option>
                            <option>Main Branch</option>
                        </select>
                        <select className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 block p-2">
                            <option>Today</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">৳ 24,500</p>
                    </div>
                    <div className="absolute top-6 right-6 flex items-center gap-1 text-emerald-600 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" /> 12%
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Orders</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">45</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Products Sold</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">112</p>
                    </div>
                </div>

                <div className="p-6 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-200 dark:border-rose-800/50 shadow-sm flex flex-col gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-rose-600 dark:text-rose-400">Low Stock</p>
                        <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">8 Items</p>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm min-h-[300px] flex items-center justify-center">
                    <div className="text-center text-slate-500 dark:text-slate-400">
                        <p>Advanced Analytics Chart Placeholder</p>
                        <p className="text-sm mt-2">Historical Sales Data Chart</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerDashboard;
