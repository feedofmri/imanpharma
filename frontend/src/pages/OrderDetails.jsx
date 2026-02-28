import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FileText, MapPin, Phone, User, CheckCircle2, AlertCircle, ShoppingBag, CreditCard, LogIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

function OrderDetails() {
    const { t } = useLanguage();
    const { cartItems, clearCart } = useCart();
    const { branches, users, addOrder } = useData();
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');

    // Get full user data from DataContext (includes phone, addresses)
    const currentUser = users.find(u => u.id === user?.id) || user;
    const savedAddresses = currentUser?.addresses || [];
    const defaultAddress = savedAddresses.find(a => a.isDefault) || savedAddresses[0];

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(
        defaultAddress ? savedAddresses.indexOf(defaultAddress) : -1
    );

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        address: defaultAddress ? [defaultAddress.address, defaultAddress.area, defaultAddress.city].filter(Boolean).join(', ') : '',
        notes: '',
        paymentMethod: 'cod'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => {
        const priceNum = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
        return sum + (priceNum * item.quantity);
    }, 0);

    const shipping = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + shipping;

    // When user selects a saved address, update the form
    const handleAddressSelect = (index) => {
        setSelectedAddressIndex(index);
        if (index >= 0 && savedAddresses[index]) {
            const addr = savedAddresses[index];
            setFormData(prev => ({
                ...prev,
                address: [addr.address, addr.area, addr.city].filter(Boolean).join(', ')
            }));
        }
    };

    useEffect(() => {
        // Redirect sellers — they can't checkout
        if (user && (user.role === 'admin' || user.role === 'manager')) {
            navigate('/products');
            return;
        }
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/order-details' } });
            return;
        }
        // If no file was uploaded AND cart is empty and not successfully ordered, redirect back to products
        if (!location.state?.fileName && cartItems.length === 0 && !isSuccess) {
            navigate('/products');
            return;
        }
        if (location.state?.fileName) {
            setFileName(location.state.fileName);
        }
    }, [location, navigate, cartItems.length, isAuthenticated, user, isSuccess]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build a new order and persist it
        const newOrder = {
            id: `ORD-${Date.now()}`,
            customerId: user?.id || null,
            customerName: formData.name,
            phone: formData.phone,
            address: formData.address,
            total: `৳ ${total.toFixed(2)}`,
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
            items: cartItems.map(ci => ({ product: ci.product, quantity: ci.quantity })),
            branchId: cartItems[0]?.branchId || 1,
            paymentMethod: formData.paymentMethod,
            notes: formData.notes
        };

        setTimeout(() => {
            addOrder(newOrder);
            setIsSubmitting(false);
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <section className="bg-gray-50 dark:bg-slate-900/50 py-16 sm:py-24 min-h-[70vh] flex items-center justify-center">
                <div className="max-w-md w-full mx-auto px-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        {t('order.success.title')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        {t('order.success.desc_1')} <span className="font-semibold text-slate-900 dark:text-white">{formData.phone}</span> {t('order.success.desc_2')}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-md transition-colors w-full"
                    >
                        {t('order.success.btn')}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {t('order.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('order.title_2')}</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {t('order.desc')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-slate-900/50 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-left">

                        {/* Form Column */}
                        <div className="md:col-span-2">
                            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('order.form.name')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                                placeholder={t('order.form.name_placeholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('order.form.phone')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                                placeholder={t('order.form.phone_placeholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('order.form.address')}
                                        </label>

                                        {/* Saved Address Quick Picker */}
                                        {savedAddresses.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {savedAddresses.map((addr, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleAddressSelect(index)}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedAddressIndex === index
                                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                                                            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <MapPin className="w-3 h-3" />
                                                        {addr.label}
                                                    </button>
                                                ))}
                                                <Link to="/buyer/addresses" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                                                    {t('order.form.manage_addr')}
                                                </Link>
                                            </div>
                                        )}

                                        <div className="relative">
                                            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                                <MapPin className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                                            </div>
                                            <textarea
                                                name="address"
                                                id="address"
                                                required
                                                rows={3}
                                                value={formData.address}
                                                onChange={(e) => { handleChange(e); setSelectedAddressIndex(-1); }}
                                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                                placeholder={t('order.form.address_ph')}
                                            />
                                        </div>
                                    </div>

                                    {/* Payment Method Selection */}
                                    <div>
                                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('order.form.payment_method')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                                            </div>
                                            <select
                                                name="paymentMethod"
                                                id="paymentMethod"
                                                required
                                                value={formData.paymentMethod}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 appearance-none"
                                            >
                                                <option value="cod">{t('order.form.payment_cod')}</option>
                                                <option value="bkash">{t('order.form.payment_bkash')}</option>
                                                <option value="nagad">{t('order.form.payment_nagad')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('order.form.notes')}
                                        </label>
                                        <textarea
                                            name="notes"
                                            id="notes"
                                            rows={2}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                            placeholder={t('order.form.notes_ph')}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? t('order.form.btn_processing') : t('order.form.btn_confirm')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="md:col-span-1 space-y-6">

                            {/* Cart Summary */}
                            {cartItems.length > 0 && (
                                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        {t('order.sidebar.cart_title')}
                                    </h3>

                                    <div className="space-y-4 mb-6">
                                        {cartItems.map(item => (
                                            <div key={item.product.id} className="flex justify-between items-start text-sm">
                                                <div className="pr-4">
                                                    <span className="font-medium text-slate-900 dark:text-white">{item.quantity}x </span>
                                                    <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{item.product.name}</span>
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white shrink-0">
                                                    ৳ {(parseFloat(item.product.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">{t('order.sidebar.subtotal')}</span>
                                            <span className="font-medium text-slate-900 dark:text-white">৳ {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">{t('order.sidebar.shipping')}</span>
                                            <span className="font-medium text-slate-900 dark:text-white">৳ {shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between">
                                            <span className="font-bold text-slate-900 dark:text-white">{t('order.sidebar.total')}</span>
                                            <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">৳ {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* File Attachment Summary */}
                            {fileName && (
                                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                        {t('order.sidebar.rx_title')}
                                    </h3>
                                    <div className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800/50">
                                        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-800/60 flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                {fileName}
                                            </p>
                                            <p className="text-xs text-primary-600 dark:text-primary-400 mt-0.5">
                                                {t('order.sidebar.rx_success')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Information */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-6 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">{t('order.sidebar.next_title')}</h4>
                                    <ul className="mt-2 text-sm text-blue-800 dark:text-blue-400/80 space-y-2 list-disc list-inside">
                                        <li>{t('order.sidebar.l1')}</li>
                                        <li>{t('order.sidebar.l2')}</li>
                                        <li>{t('order.sidebar.l3')}</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default OrderDetails;
