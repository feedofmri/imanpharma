import { useMemo } from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Package, BarChart3 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

function Reports() {
    const { orders, products, branches } = useData();
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();

    // Filter for manager
    const managedBranch = branches.find(b => b.managerId === user?.id);
    const filteredOrders = isAdmin ? orders : orders.filter(o => o.branchId === managedBranch?.id);

    const stats = useMemo(() => {
        const totalRevenue = filteredOrders.reduce((sum, o) => {
            const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);

        const delivered = filteredOrders.filter(o => o.status === 'Delivered').length;
        const processing = filteredOrders.filter(o => o.status === 'Processing').length;
        const shipped = filteredOrders.filter(o => o.status === 'Shipped').length;

        // Top products by frequency
        const productCounts = {};
        filteredOrders.forEach(o => {
            (o.items || []).forEach(item => {
                const name = item.product?.name || 'Unknown';
                productCounts[name] = (productCounts[name] || 0) + item.quantity;
            });
        });
        const topProducts = Object.entries(productCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // Revenue by payment method
        const paymentBreakdown = {};
        filteredOrders.forEach(o => {
            const method = o.paymentMethod || 'cod';
            const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
            paymentBreakdown[method] = (paymentBreakdown[method] || 0) + (isNaN(num) ? 0 : num);
        });

        // Revenue by branch (admin only)
        const branchBreakdown = {};
        if (isAdmin) {
            filteredOrders.forEach(o => {
                const branch = branches.find(b => b.id === o.branchId);
                const name = branch ? branch.name : 'Unknown';
                const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
                branchBreakdown[name] = (branchBreakdown[name] || 0) + (isNaN(num) ? 0 : num);
            });
        }

        return { totalRevenue, delivered, processing, shipped, topProducts, paymentBreakdown, branchBreakdown };
    }, [filteredOrders, branches, isAdmin]);

    const statCards = [
        { label: t('seller.reports_page.revenue'), value: `৳ ${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { label: t('seller.reports_page.orders'), value: filteredOrders.length, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' },
        { label: t('seller.reports_page.delivered'), value: stats.delivered, icon: TrendingUp, color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400' },
        { label: t('seller.reports_page.processing'), value: stats.processing, icon: Package, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' },
    ];

    const maxTopProduct = stats.topProducts.length > 0 ? stats.topProducts[0][1] : 1;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.reports_page.title')}</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Selling Products */}
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('seller.reports_page.top_products')}</h2>
                    </div>
                    {stats.topProducts.length > 0 ? (
                        <div className="space-y-4">
                            {stats.topProducts.map(([name, count], idx) => (
                                <div key={name}>
                                    <div className="flex items-center justify-between text-sm mb-1.5">
                                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-4">{idx + 1}. {name}</span>
                                        <span className="text-slate-500 dark:text-slate-400 shrink-0">{count} {t('seller.reports_page.sold')}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5">
                                        <div
                                            className="bg-primary-500 h-2.5 rounded-full transition-all"
                                            style={{ width: `${(count / maxTopProduct) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 text-center py-4">{t('seller.reports_page.no_sales')}</p>
                    )}
                </div>

                {/* Payment Methods Breakdown */}
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('seller.reports_page.revenue_method')}</h2>
                    </div>
                    {Object.keys(stats.paymentBreakdown).length > 0 ? (
                        <div className="space-y-3">
                            {Object.entries(stats.paymentBreakdown).map(([method, amount]) => (
                                <div key={method} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">{method}</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">৳ {amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 text-center py-4">{t('seller.reports_page.no_payment')}</p>
                    )}
                </div>
            </div>

            {/* Branch Breakdown (Admin only) */}
            {isAdmin && Object.keys(stats.branchBreakdown).length > 0 && (
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{t('seller.reports_page.revenue_branch')}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-700 uppercase bg-gray-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-3">{t('seller.reports_page.branch')}</th>
                                    <th className="px-6 py-3 text-right">{t('seller.reports_page.revenue_col')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {Object.entries(stats.branchBreakdown).map(([name, amount]) => (
                                    <tr key={name} className="hover:bg-gray-50 dark:hover:bg-slate-800/30">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{name}</td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">৳ {amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;
