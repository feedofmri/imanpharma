import { Package, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../contexts/DataContext';
import { useState } from 'react';
import DateFilter from '../../components/DateFilter';

function BuyerDashboard() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { orders } = useData();

    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const baseOrders = orders.filter(o => o.customerId === user?.id);

    const userOrders = baseOrders.filter(o => {
        if (!dateRange.start && !dateRange.end) return true;
        const oDate = new Date(o.date);
        oDate.setHours(0, 0, 0, 0);

        if (dateRange.start && dateRange.end) {
            return oDate >= dateRange.start && oDate <= dateRange.end;
        }
        if (dateRange.start) return oDate >= dateRange.start;
        if (dateRange.end) return oDate <= dateRange.end;
        return true;
    });

    const totalOrders = userOrders.length;
    const pendingOrders = userOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
    const totalSpent = userOrders.reduce((sum, o) => {
        const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('buyer.dash.title')}</h1>
                <DateFilter onDateRangeChange={setDateRange} />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('buyer.dash.orders_title')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalOrders}</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('buyer.dash.pending_title')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingOrders}</p>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('buyer.dash.delivered_title')}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">৳ {totalSpent.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerDashboard;
