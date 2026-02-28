import { useState, useMemo } from 'react';
import { Users, Search, Edit2, Check, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

function ManageCustomers() {
    const { t } = useLanguage();
    const { users, orders, updateUser } = useData();
    const { user: currentUser } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingId, setEditingId] = useState(null);
    const [editStatus, setEditStatus] = useState('active');

    const ITEMS_PER_PAGE = 8;

    // Filter customers (buyers) first
    // For now, managers and admins can see all buyers. 
    // If we wanted to restrict managers to their branch customers, we could filter via orders.
    const allCustomers = useMemo(() => {
        return users.filter(u => u.role === 'buyer');
    }, [users]);

    const filteredCustomers = useMemo(() => {
        return allCustomers.filter(cust => {
            const matchesSearch = cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cust.phone?.toString().includes(searchTerm);

            return matchesSearch;
        });
    }, [allCustomers, searchTerm]);

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getCustomerOrderCount = (customerId) => {
        return orders.filter(o => o.customerId === customerId).length;
    };

    const handleEditClick = (cust) => {
        setEditingId(cust.id);
        setEditStatus(cust.status || 'active');
    };

    const handleSave = (id) => {
        const custToUpdate = users.find(u => u.id === id);
        updateUser(id, { ...custToUpdate, status: editStatus });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.customers')}</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('seller.cust.search')}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-9 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800 text-sm">
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{t('seller.cust.name')}</th>
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{t('seller.cust.email')}</th>
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{t('seller.cust.phone')}</th>
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{t('seller.cust.orders')}</th>
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{t('seller.cust.status')}</th>
                                <th className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {paginatedCustomers.length > 0 ? (
                                paginatedCustomers.map((cust) => (
                                    <tr key={cust.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={cust.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cust.name}`} alt={cust.name} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800" />
                                                <span className="font-medium text-slate-900 dark:text-white">{cust.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{cust.email}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{cust.phone || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {getCustomerOrderCount(cust.id)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === cust.id ? (
                                                <select
                                                    value={editStatus}
                                                    onChange={(e) => setEditStatus(e.target.value)}
                                                    className="px-2 py-1 text-sm rounded bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 outline-none text-slate-700 dark:text-slate-300"
                                                >
                                                    <option value="active">{t('seller.cust.status_active')}</option>
                                                    <option value="inactive">{t('seller.cust.status_inactive')}</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${(!cust.status || cust.status === 'active')
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                                    }`}>
                                                    {(!cust.status || cust.status === 'active') ? t('seller.cust.status_active') : t('seller.cust.status_inactive')}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {editingId === cust.id ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleSave(cust.id)} className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded transition-colors">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={handleCancel} className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(cust)}
                                                    className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>{t('seller.cust.empty')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm text-slate-500 dark:text-slate-400 pr-4">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} of {filteredCustomers.length}
                        </span>
                        <div className="flex gap-1 overflow-x-auto pb-1 max-w-[50%] sm:max-w-none">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                        ? 'bg-primary-600 text-white'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageCustomers;
