import { useState } from 'react';
import { Package, Printer } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Invoice from '../../components/Invoice';

function BuyerOrders() {
    const { orders, branches } = useData();
    const { user } = useAuth();
    const [invoiceOrder, setInvoiceOrder] = useState(null);

    const userOrders = orders.filter(o => o.customerId === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Orders</h1>

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

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900 dark:text-white">{order.total}</p>
                                        <span className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setInvoiceOrder(order); }}
                                        className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                        title="View Invoice"
                                    >
                                        <Printer className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                        No orders found.
                    </div>
                )}
            </div>

            {invoiceOrder && (
                <Invoice order={invoiceOrder} branches={branches} onClose={() => setInvoiceOrder(null)} />
            )}
        </div>
    );
}

export default BuyerOrders;
