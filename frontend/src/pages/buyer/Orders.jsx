import { Package, ChevronRight } from 'lucide-react';

function BuyerOrders() {
    const mockOrders = [
        { id: '#ORD-1234', date: 'Oct 24, 2023', total: '৳ 1,250', status: 'Delivered' },
        { id: '#ORD-1235', date: 'Nov 02, 2023', total: '৳ 550', status: 'Processing' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Orders</h1>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {mockOrders.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {mockOrders.map((order) => (
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

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900 dark:text-white">{order.total}</p>
                                        <span className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
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
        </div>
    );
}

export default BuyerOrders;
