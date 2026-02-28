import { X, Minus, Plus, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useData } from '../contexts/DataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

function CartDrawer({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const { branches } = useData();
    const { t } = useLanguage();

    const subtotal = cartItems.reduce((sum, item) => {
        // Assuming price is a string like "৳ 45.00" or "$ 45.00"
        const priceNum = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
        return sum + (priceNum * item.quantity);
    }, 0);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#0F172A] shadow-2xl flex flex-col transform transition-transform duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                            <ShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Cart</h2>
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full text-sm font-medium">
                            {cartItems.length}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Your cart is empty</h3>
                                <p className="text-slate-500 dark:text-slate-400">Looks like you haven't added anything yet.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => {
                                const branchName = branches.find(b => b.id === item.branchId)?.name || 'Unknown';
                                return (
                                    <div key={`${item.product.id}-${item.branchId}`} className="flex gap-4 p-4 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-2xl">
                                        {/* Image Placeholder */}
                                        <div className="w-24 h-24 shrink-0 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-slate-700">
                                            <span className="text-xl font-bold text-slate-300 dark:text-slate-600">
                                                {item.product.name.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                                                    {item.product.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id, item.branchId)}
                                                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.product.price}</p>
                                            <p className="text-xs text-primary-600 dark:text-primary-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{branchName}</p>

                                            <div className="mt-auto flex items-center justify-between">
                                                {/* Quantity Control */}
                                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg p-1 border border-gray-200 dark:border-slate-700">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.branchId, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-6 text-center font-medium text-sm text-slate-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.branchId, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Item Total */}
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    ৳ {(parseFloat(item.product.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-slate-800 p-6 bg-gray-50 dark:bg-slate-900/50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">৳ {subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={clearCart}
                                className="px-6 py-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Clear
                            </button>
                            <Link
                                to="/order-details"
                                onClick={onClose}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-colors shadow-lg shadow-primary-600/20"
                            >
                                Checkout <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;
