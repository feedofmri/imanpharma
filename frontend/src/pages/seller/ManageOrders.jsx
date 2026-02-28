import { useState } from 'react';
import { Edit2, Eye, X, MapPin, Phone, CreditCard, FileText, CheckCircle2, Printer, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import NewOrderModal from './NewOrderModal';
import Pagination from '../../components/Pagination';

function ManageOrders() {
    const { orders, branches, updateOrderStatus } = useData();
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Filter orders: Admins see all, Managers see only their branch
    const managedBranch = branches.find(b => b.managerId === user?.id);
    const filteredOrders = isAdmin ? orders : orders.filter(o => o.branchId === managedBranch?.id);

    // Sort youngest first
    const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.date) - new Date(a.date));

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Shipped': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Processing': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.ord.title')}</h1>
                <button
                    onClick={() => setIsNewOrderModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/20"
                >
                    <Plus className="w-5 h-5" />
                    {t('seller.ord.new_manual')}
                </button>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-gray-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-4">Order ID</th>
                                <th scope="col" className="px-6 py-4">Customer</th>
                                <th scope="col" className="px-6 py-4">Total</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4 text-right">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{order.customerName}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 text-slate-400 hover:text-primary-600 transition-colors bg-gray-50 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order Details</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            {/* Customer Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">Customer Details</h4>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{selectedOrder.customerName}</p>
                                        <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{selectedOrder.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{selectedOrder.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">Order Info</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Status:</span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Payment:</span>
                                            <span className="text-slate-900 dark:text-white uppercase">{selectedOrder.paymentMethod}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Date:</span>
                                            <span className="text-slate-900 dark:text-white">{selectedOrder.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Note */}
                            {selectedOrder.notes && (
                                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800">
                                    <div className="flex items-start gap-2">
                                        <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 tracking-wider uppercase mb-1">Customer Note</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{selectedOrder.notes}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Items */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">Items</h4>
                                <div className="divide-y divide-gray-100 dark:divide-slate-800 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="p-3 flex items-center justify-between bg-white dark:bg-slate-900 leading-tight">
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.product.name}</p>
                                                <p className="text-xs text-slate-500">{item.product.packSize}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.quantity} x {item.product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                                        <span className="font-medium text-slate-900 dark:text-white">Total</span>
                                        <span className="font-bold text-lg text-primary-600">{selectedOrder.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 flex items-center justify-between rounded-b-2xl">
                            <div className="relative">
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => {
                                        updateOrderStatus(selectedOrder.id, e.target.value);
                                        setSelectedOrder({ ...selectedOrder, status: e.target.value });
                                    }}
                                    className="pl-3 pr-10 py-2 text-sm border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none font-medium"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <button
                                onClick={() => { setInvoiceOrder(selectedOrder); setSelectedOrder(null); }}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                            >
                                <Printer className="w-4 h-4" /> Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Modal */}
            {invoiceOrder && (
                <Invoice order={invoiceOrder} branches={branches} onClose={() => setInvoiceOrder(null)} />
            )}

            {/* New Manual Order Modal */}
            {isNewOrderModalOpen && (
                <NewOrderModal onClose={() => setIsNewOrderModalOpen(false)} />
            )}
        </div>
    );
}

export default ManageOrders;
