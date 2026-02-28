import { useState } from 'react';
import { MessageSquare, Plus, X, Store, Paperclip } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

function BuyerComplaints() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { complaints: allComplaints, addComplaint, branches } = useData();

    // Filter complaints for the logged-in buyer
    const userComplaints = allComplaints.filter(c => c.buyerId === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        subject: '',
        orderRef: '',
        branchId: '',
        image: null,
        desc: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComplaint = {
            id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
            buyerId: user?.id,
            subject: formData.subject,
            orderRef: formData.orderRef,
            branchId: formData.branchId,
            image: formData.image,
            desc: formData.desc,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };

        addComplaint(newComplaint);
        setIsModalOpen(false);
        setFormData({ subject: '', orderRef: '', branchId: '', image: null, desc: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('buyer.comp.title')}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    {t('buyer.comp.new_btn')}
                </button>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {userComplaints.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {userComplaints.map((comp) => (
                            <div key={comp.id} className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{comp.subject}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                <span>{comp.id}</span>
                                                <span>&bull;</span>
                                                <span>{t('buyer.comp.date')} {comp.date}</span>
                                                {comp.orderRef && (
                                                    <>
                                                        <span>&bull;</span>
                                                        <span>{t('buyer.comp.ref')} {comp.orderRef}</span>
                                                    </>
                                                )}
                                                {comp.branchId && (
                                                    <>
                                                        <span>&bull;</span>
                                                        <span>{branches.find(b => b.id === comp.branchId)?.name}</span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="mt-3 text-slate-600 dark:text-slate-300">{comp.desc}</p>
                                            {comp.image && (
                                                <div className="mt-3">
                                                    <img src={comp.image} alt="Attachment" className="max-w-[150px] rounded-lg border border-gray-200 dark:border-slate-700" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shrink-0 ${comp.status === 'Open'
                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        }`}>
                                        {comp.status === 'Open' ? t('buyer.comp.status_open') : t('buyer.comp.status_resolved')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{t('buyer.comp.empty')}</h3>
                        <p>{t('buyer.comp.empty_desc')}</p>
                    </div>
                )}
            </div>

            {/* New Complaint Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {t('buyer.comp.form_title')}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('buyer.comp.subject')} *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder={t('buyer.comp.subject_ph')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('buyer.comp.order_ref')}</label>
                                <input
                                    type="text"
                                    value={formData.orderRef}
                                    onChange={(e) => setFormData({ ...formData, orderRef: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder={t('buyer.comp.order_ph')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('buyer.comp.branch')} *</label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <select
                                        required
                                        value={formData.branchId}
                                        onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none"
                                    >
                                        <option value="" disabled>{t('buyer.comp.branch_ph')}</option>
                                        {branches.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('buyer.comp.desc')} *</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                                    placeholder={t('buyer.comp.desc_ph')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('buyer.comp.image')}</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/20 dark:file:text-primary-400 dark:hover:file:bg-primary-900/30 transition-all border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-900/50"
                                    />
                                </div>
                                {formData.image && (
                                    <div className="mt-3 relative inline-block">
                                        <img src={formData.image} alt="Complaint Attachment" className="h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-slate-700" />
                                        <button type="button" onClick={() => setFormData({ ...formData, image: null })} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                >
                                    {t('buyer.comp.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 transition-all"
                                >
                                    {t('buyer.comp.submit')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuyerComplaints;
