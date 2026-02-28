import { useState } from 'react';
import { Package, Printer } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Invoice from '../../components/Invoice';
import DateFilter from '../../components/DateFilter';

function BuyerOrders() {
    const { orders, branches } = useData();
    const { user } = useAuth();
    const { t } = useLanguage();
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const baseOrders = orders.filter(o => o.customerId === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date));

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

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('buyer.orders_page.title')}</h1>
                <DateFilter onDateRangeChange={setDateRange} />
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {userOrders.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {userOrders.map((order) => (
                            <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{order.id}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{order.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="font-semibold text-slate-900 dark:text-white">{order.total}</p>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === 'Delivered'
                                            ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                            : order.status === 'Processing'
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setInvoiceOrder(order)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                                        title={t('buyer.orders_page.invoice')}
                                    >
                                        <Printer className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                        <Package className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                        <p>{t('buyer.orders_page.empty')}</p>
                    </div>
                )}
            </div>

            {invoiceOrder && <Invoice order={invoiceOrder} branches={branches} onClose={() => setInvoiceOrder(null)} />}
        </div>
    );
}

export default BuyerOrders;
