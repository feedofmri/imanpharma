import { DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../contexts/DataContext';
import DashCharts from '../../components/DashCharts';

function SellerDashboard() {
    const { isAdmin, user } = useAuth();
    const { t } = useLanguage();
    const { orders, products, branches } = useData();

    // Filter data based on role
    const managedBranch = branches.find(b => b.managerId === user?.id);
    const sellerOrders = isAdmin ? orders : orders.filter(o => o.branchId === managedBranch?.id);
    const sellerProducts = isAdmin ? products : products.filter(p => p.branchStocks?.[managedBranch?.id] > 0);

    // Dynamic Calculations
    const totalRevenue = sellerOrders.reduce((sum, o) => sum + parseFloat(o.total.replace('৳ ', '').replace(',', '')), 0);
    const totalOrders = sellerOrders.length;
    const itemsSold = sellerOrders.reduce((sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);

    const lowStockThreshold = 10;
    const lowStockItems = products.filter(p => {
        if (isAdmin) {
            return Object.values(p.branchStocks || {}).some(qty => qty > 0 && qty < lowStockThreshold);
        } else {
            const qty = p.branchStocks?.[managedBranch?.id] || 0;
            return qty > 0 && qty < lowStockThreshold;
        }
    }).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.dash.title')}</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{t('seller.dash.subtitle')}</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('seller.dash.revenue')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">৳ {totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('seller.dash.orders')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalOrders}</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('seller.dash.products_sold')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{itemsSold}</p>
                    </div>
                </div>

                <div className="p-6 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-200 dark:border-rose-800/50 shadow-sm flex flex-col gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{t('seller.dash.low_stock')}</p>
                        <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">{lowStockItems} {t('seller.dash.items')}</p>
                    </div>
                </div>
            </div>

            {/* Advanced Analytics Charts */}
            <DashCharts orders={sellerOrders} isAdmin={isAdmin} branches={branches} />
        </div>
    );
}

export default SellerDashboard;
