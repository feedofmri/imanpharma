import { useState, useMemo } from 'react';
import { MessageSquare, Search, Filter, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';

function ManageComplaints() {
    const { t } = useLanguage();
    const { complaints, updateComplaintStatus, users, branches } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredComplaints = useMemo(() => {
        return complaints.filter(comp => {
            const matchesSearch = comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comp.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (comp.orderRef && comp.orderRef.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStatus = statusFilter === 'All' || comp.status === statusFilter;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [complaints, searchTerm, statusFilter]);

    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'Open' ? 'Resolved' : 'Open';
        updateComplaintStatus(id, newStatus);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.inbox')}</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Open">Open</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {filteredComplaints.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredComplaints.map((comp) => {
                            const buyer = users.find(u => u.id === comp.buyerId);
                            return (
                                <div key={comp.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0 mt-1">
                                                <MessageSquare className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{comp.subject}</h3>
                                                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${comp.status === 'Open'
                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        }`}>
                                                        {comp.status}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">ID: {comp.id}</span>
                                                    <span>&bull;</span>
                                                    <span>{new Date(comp.date).toLocaleDateString()}</span>
                                                    {buyer && (
                                                        <>
                                                            <span>&bull;</span>
                                                            <span className="text-primary-600 dark:text-primary-400">{buyer.name} ({buyer.phone})</span>
                                                        </>
                                                    )}
                                                    {comp.orderRef && (
                                                        <>
                                                            <span>&bull;</span>
                                                            <span className="font-medium">Ref: {comp.orderRef}</span>
                                                        </>
                                                    )}
                                                    {comp.branchId && (
                                                        <>
                                                            <span>&bull;</span>
                                                            <span className="font-medium text-slate-800 dark:text-slate-200">{branches.find(b => b.id === comp.branchId)?.name}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                                                    {comp.desc}
                                                </p>
                                                {comp.image && (
                                                    <div className="mt-4">
                                                        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Attachment</p>
                                                        <a href={comp.image} target="_blank" rel="noreferrer">
                                                            <img src={comp.image} alt="Complaint Attachment" className="max-w-[200px] sm:max-w-xs object-cover rounded-xl border border-gray-200 dark:border-slate-700 hover:opacity-90 transition-opacity" />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 mt-4 sm:mt-0">
                                            <button
                                                onClick={() => handleStatusToggle(comp.id, comp.status)}
                                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all w-full sm:w-auto ${comp.status === 'Open'
                                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20'
                                                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                                    }`}
                                            >
                                                {comp.status === 'Open' ? (
                                                    <><CheckCircle className="w-4 h-4" /> Mark Resolved</>
                                                ) : (
                                                    <><AlertCircle className="w-4 h-4" /> Reopen</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-16 text-center text-slate-500 dark:text-slate-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No complaints found</h3>
                        <p>You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageComplaints;
