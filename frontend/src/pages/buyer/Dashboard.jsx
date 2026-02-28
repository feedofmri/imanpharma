import { Package, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function BuyerDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>

            <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Orders</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">1</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Spent</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">৳ 4,250</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
                <p className="text-slate-600 dark:text-slate-400">You have no recent activity.</p>
            </div>
        </div>
    );
}

export default BuyerDashboard;
