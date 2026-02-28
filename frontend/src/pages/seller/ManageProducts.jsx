import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Pagination from '../../components/Pagination';

function ManageProducts() {
    const { products, branches, addProduct, deleteProduct } = useData();
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', category: 'Medicines', description: '', price: '', manufacturer: '', packSize: '', branchId: '', quantity: 1
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Manager isolation: only see products with stock in their branch
    const managedBranch = branches.find(b => b.managerId === user?.id);
    const displayProducts = isAdmin
        ? products
        : products.filter(p => {
            const stock = p.branchStock || {};
            return stock[String(managedBranch?.id)] > 0;
        });

    const sortedProducts = [...displayProducts].sort((a, b) => b.id - a.id);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCreate = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            details: '',
            price: `৳ ${formData.price}`,
            manufacturer: formData.manufacturer,
            inStock: true,
            packSize: formData.packSize,
            branchId: parseInt(formData.branchId) || (managedBranch?.id || 1),
            quantity: parseInt(formData.quantity) || 1
        };
        addProduct(newProduct);
        setFormData({ name: '', category: 'Medicines', description: '', price: '', manufacturer: '', packSize: '', branchId: '', quantity: 1 });
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const getBranchName = (branchId) => {
        const branch = branches.find(b => b.id === branchId);
        return branch ? branch.name : '—';
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.prod.title')}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer"
                >
                    <Plus className="w-5 h-5" /> {t('seller.prod.add')}
                </button>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-gray-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-4">{t('seller.prod.name')}</th>
                                <th scope="col" className="px-6 py-4">{t('seller.prod.category')}</th>
                                <th scope="col" className="px-6 py-4">{t('seller.prod.price')}</th>
                                <th scope="col" className="px-6 py-4">{t('seller.prod.branch')}</th>
                                <th scope="col" className="px-6 py-4">{t('seller.prod.stock')}</th>
                                <th scope="col" className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-300 dark:text-slate-600 shrink-0">
                                            {product.name.charAt(0)}
                                        </div>
                                        <span className="line-clamp-1">{product.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{product.price?.split(' ')[0] || product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                                            {isAdmin ? (product.branchId ? getBranchName(product.branchId) : 'All') : managedBranch?.name || '—'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {(() => {
                                            const stock = isAdmin
                                                ? Object.values(product.branchStock || {}).reduce((sum, v) => sum + v, 0)
                                                : (product.branchStock || {})[String(managedBranch?.id)] || 0;
                                            return stock > 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                    {stock} units
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">Out of Stock</span>
                                            );
                                        })()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 transition-colors bg-gray-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {displayProducts.length === 0 && (
                                <tr><td colSpan="6" className="px-6 py-10 text-center text-slate-400">{t('seller.prod.empty')}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('seller.prod.add')}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.name')}</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="e.g. Napa Extra 500mg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.category')}</label>
                                    <select name="category" value={formData.category} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 appearance-none">
                                        <option>Medicines</option>
                                        <option>Medical Devices</option>
                                        <option>Antibiotics</option>
                                        <option>Supplements</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.price')} (৳)</label>
                                    <input type="number" name="price" required value={formData.price} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                        placeholder="e.g. 25" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.manufacturer')}</label>
                                    <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                        placeholder="e.g. Beximco" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.pack_size')}</label>
                                    <input type="text" name="packSize" value={formData.packSize} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                        placeholder="e.g. 10 tablets" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.branch')}</label>
                                    {isAdmin ? (
                                        <select name="branchId" required value={formData.branchId} onChange={handleChange}
                                            className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 appearance-none">
                                            <option value="" disabled>Select branch</option>
                                            {branches.map(b => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input type="text" readOnly value={managedBranch?.name || 'Your Branch'}
                                            className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 sm:text-sm py-3 px-4 cursor-not-allowed" />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.quantity')}</label>
                                    <input type="number" name="quantity" required min="1" value={formData.quantity} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seller.prod.description')}</label>
                                <textarea name="description" rows={2} value={formData.description} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="Short description..." />
                            </div>
                            <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm mt-2">
                                {t('seller.prod.create')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageProducts;
