import { useState } from 'react';
import { Plus, Edit2, Trash2, X, MapPin, Phone as PhoneIcon, UserCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

function ManageBranches() {
    const { branches, users, addBranch, updateBranch, deleteBranch } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [formData, setFormData] = useState({ name: '', location: '', contact: '', managerId: '' });

    const managers = users.filter(u => u.role === 'manager');

    const openCreateModal = () => {
        setEditingBranch(null);
        setFormData({ name: '', location: '', contact: '', managerId: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (branch) => {
        setEditingBranch(branch);
        setFormData({
            name: branch.name,
            location: branch.location,
            contact: branch.contact,
            managerId: branch.managerId ? String(branch.managerId) : ''
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const branchData = {
            name: formData.name,
            location: formData.location,
            contact: formData.contact,
            managerId: formData.managerId ? parseInt(formData.managerId) : null
        };

        if (editingBranch) {
            updateBranch(editingBranch.id, { ...editingBranch, ...branchData });
        } else {
            addBranch({ id: Date.now(), ...branchData });
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this branch?')) {
            deleteBranch(id);
        }
    };

    const getManagerName = (managerId) => {
        const manager = users.find(u => u.id === managerId);
        return manager ? manager.name : null;
    };

    // Get IDs of managers already assigned to other branches (to filter dropdown)
    const assignedManagerIds = branches
        .filter(b => b.managerId && (!editingBranch || b.id !== editingBranch.id))
        .map(b => b.managerId);

    const availableManagers = managers.filter(m => !assignedManagerIds.includes(m.id));

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Branches</h1>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Branch
                </button>
            </div>

            {/* Branches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {branches.map((branch) => {
                    const managerName = getManagerName(branch.managerId);
                    return (
                        <div key={branch.id} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between gap-4">
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{branch.name}</h3>
                                <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>{branch.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="w-4 h-4 shrink-0" />
                                        <span>{branch.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserCircle className="w-4 h-4 shrink-0" />
                                        {managerName ? (
                                            <span className="text-primary-600 dark:text-primary-400 font-medium">{managerName}</span>
                                        ) : (
                                            <span className="italic text-slate-400">No manager assigned</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    onClick={() => openEditModal(branch)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(branch.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
                {branches.length === 0 && (
                    <div className="col-span-full text-center py-10 text-slate-400">No branches found.</div>
                )}
            </div>

            {/* Create/Edit Branch Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingBranch ? 'Edit Branch' : 'Add New Branch'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Branch Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="e.g. Dhaka Main Branch" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="Full address" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Number</label>
                                <input type="tel" name="contact" required value={formData.contact} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                    placeholder="017..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assign Manager</label>
                                <select name="managerId" value={formData.managerId} onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 appearance-none"
                                >
                                    <option value="">— No Manager —</option>
                                    {availableManagers.map(m => (
                                        <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
                                    ))}
                                    {/* Show current manager even if assigned */}
                                    {editingBranch?.managerId && !availableManagers.find(m => m.id === editingBranch.managerId) && (() => {
                                        const currentManager = managers.find(m => m.id === editingBranch.managerId);
                                        return currentManager ? <option key={currentManager.id} value={currentManager.id}>{currentManager.name} (current)</option> : null;
                                    })()}
                                </select>
                            </div>
                            <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                                {editingBranch ? 'Save Changes' : 'Create Branch'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageBranches;
