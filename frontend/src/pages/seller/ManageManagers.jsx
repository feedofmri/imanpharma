import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Mail, Lock, UserCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

function ManageManagers() {
    const { users, addUser, updateUser, deleteUser, branches } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingManager, setEditingManager] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const managers = users.filter(u => u.role === 'manager');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const openCreateModal = () => {
        setEditingManager(null);
        setFormData({ name: '', email: '', password: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (manager) => {
        setEditingManager(manager);
        setFormData({ name: manager.name, email: manager.email, password: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingManager) {
            // Update existing manager
            updateUser(editingManager.id, {
                ...editingManager,
                name: formData.name,
                email: formData.email,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
            });
        } else {
            // Create new manager
            const newManager = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                role: 'manager',
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
            };
            addUser(newManager);
        }
        setFormData({ name: '', email: '', password: '' });
        setEditingManager(null);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this manager?')) {
            deleteUser(id);
        }
    };

    const getBranchForManager = (managerId) => {
        return branches.find(b => b.managerId === managerId);
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Managers</h1>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Manager
                </button>
            </div>

            {/* Managers Table */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-gray-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-4">Manager</th>
                                <th scope="col" className="px-6 py-4">Email</th>
                                <th scope="col" className="px-6 py-4">Assigned Branch</th>
                                <th scope="col" className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {managers.map((manager) => {
                                const branch = getBranchForManager(manager.id);
                                return (
                                    <tr key={manager.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={manager.avatarUrl} alt="" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700" />
                                                <span className="font-medium text-slate-900 dark:text-white">{manager.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{manager.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {branch ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                                    {branch.name}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic text-xs">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(manager)}
                                                    className="p-2 text-slate-400 hover:text-primary-600 transition-colors bg-gray-50 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(manager.id)}
                                                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {managers.length === 0 && (
                                <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400">No managers found. Add one to get started.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit Manager Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editingManager ? 'Edit Manager' : 'Create New Manager'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserCircle className="h-5 w-5 text-gray-400" /></div>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                        className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                        placeholder="Manager Name" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                        className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                        placeholder="manager@imanpharma.com" />
                                </div>
                            </div>
                            {!editingManager && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                                        <input type="password" name="password" required value={formData.password} onChange={handleChange}
                                            className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                            placeholder="••••••••" />
                                    </div>
                                </div>
                            )}
                            <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                                {editingManager ? 'Save Changes' : 'Create Manager'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageManagers;
