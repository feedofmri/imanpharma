import { useState } from 'react';
import { Plus, Trash2, Edit2, X, MapPin, Home, Star, Check } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

function BuyerAddresses() {
    const { user } = useAuth();
    const { users, updateUser } = useData();

    // Addresses are stored in the user object
    const currentUser = users.find(u => u.id === user?.id) || user;
    const addresses = currentUser?.addresses || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ label: 'Home', address: '', area: '', city: '', isDefault: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const openCreateModal = () => {
        setEditingIndex(null);
        setFormData({ label: 'Home', address: '', area: '', city: '', isDefault: addresses.length === 0 });
        setIsModalOpen(true);
    };

    const openEditModal = (index) => {
        setEditingIndex(index);
        setFormData({ ...addresses[index] });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedAddresses = [...addresses];

        // If setting as default, unset all others
        if (formData.isDefault) {
            updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
        }

        if (editingIndex !== null) {
            updatedAddresses[editingIndex] = { ...formData };
        } else {
            updatedAddresses.push({ ...formData });
        }

        updateUser(user.id, { ...currentUser, addresses: updatedAddresses });
        setIsModalOpen(false);
    };

    const handleDelete = (index) => {
        if (window.confirm('Delete this address?')) {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            updateUser(user.id, { ...currentUser, addresses: updatedAddresses });
        }
    };

    const setAsDefault = (index) => {
        const updatedAddresses = addresses.map((a, i) => ({ ...a, isDefault: i === index }));
        updateUser(user.id, { ...currentUser, addresses: updatedAddresses });
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Addresses</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your delivery addresses for faster checkout.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Address
                </button>
            </div>

            {/* Address Cards */}
            {addresses.length > 0 ? (
                <div className="grid gap-4">
                    {addresses.map((addr, index) => (
                        <div key={index} className={`relative bg-white dark:bg-[#1E293B] rounded-2xl border-2 p-5 shadow-sm transition-all ${addr.isDefault
                                ? 'border-primary-500 ring-1 ring-primary-500/20'
                                : 'border-gray-200 dark:border-slate-800'
                            }`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${addr.label === 'Home'
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                            : addr.label === 'Office'
                                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                                : 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                        }`}>
                                        {addr.label === 'Home' ? <Home className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">{addr.label}</h3>
                                            {addr.isDefault && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                                    <Star className="w-3 h-3" /> Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{addr.address}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-500">{[addr.area, addr.city].filter(Boolean).join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {!addr.isDefault && (
                                        <button
                                            onClick={() => setAsDefault(index)}
                                            className="p-2 text-slate-400 hover:text-primary-600 transition-colors bg-gray-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-slate-700 rounded-lg"
                                            title="Set as default"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => openEditModal(index)}
                                        className="p-2 text-slate-400 hover:text-primary-600 transition-colors bg-gray-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-slate-700 rounded-lg"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="p-2 text-rose-400 hover:text-rose-600 transition-colors bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-10 text-center">
                    <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No addresses yet</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Add your first delivery address to speed up checkout.</p>
                </div>
            )}

            {/* Add/Edit Address Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Label</label>
                                <select name="label" value={formData.label} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 appearance-none">
                                    <option>Home</option>
                                    <option>Office</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Street Address</label>
                                <input type="text" name="address" required value={formData.address} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="House/Road/Block" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Area</label>
                                    <input type="text" name="area" value={formData.area} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                        placeholder="Area / Thana" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                        placeholder="City / District" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange}
                                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded focus:ring-primary-500" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Set as default address</span>
                            </label>
                            <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm mt-2">
                                {editingIndex !== null ? 'Save Changes' : 'Add Address'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuyerAddresses;
