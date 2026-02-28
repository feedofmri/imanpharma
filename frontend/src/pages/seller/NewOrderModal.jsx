import { useState, useMemo } from 'react';
import { X, Search, Plus, Minus, Trash2, ShoppingBag, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Order } from '../../models/Order';
import { CartItem } from '../../models/CartItem';

function NewOrderModal({ onClose }) {
    const { products, branches, addOrder, updateProduct } = useData();
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState(() => {
        if (isAdmin) return branches[0]?.id || '';
        return branches.find(b => b.managerId === user?.id)?.id || '';
    });
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [notes, setNotes] = useState('');

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return products.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
            const hasStock = (p.branchStock?.[selectedBranchId] || 0) > 0;
            return matchesQuery && hasStock;
        }).slice(0, 5);
    }, [products, searchQuery, selectedBranchId]);

    const addToCart = (product) => {
        const branchStock = product.branchStock?.[selectedBranchId] || 0;
        const existing = cart.find(item => item.product.id === product.id);

        if (existing) {
            if (existing.quantity < branchStock) {
                setCart(cart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            }
        } else {
            if (branchStock > 0) {
                setCart([...cart, new CartItem(product, 1)]);
            }
        }
        setSearchQuery('');
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.product.id === productId) {
                const product = products.find(p => p.id === productId);
                const branchStock = product.branchStock?.[selectedBranchId] || 0;
                const newQty = Math.max(1, Math.min(branchStock, item.quantity + delta));
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const subtotal = cart.reduce((sum, item) => {
        const priceValue = parseFloat(item.product.price.replace(/[^\d.]/g, '')) || 0;
        return sum + (priceValue * item.quantity);
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        const orderId = `MAN-${Date.now()}`;
        const newOrder = new Order(
            orderId,
            null, // No customer ID for manual orders
            customerName || 'Walk-in Customer',
            customerPhone,
            customerAddress || 'In-store',
            `৳ ${subtotal.toFixed(2)}`,
            'Delivered', // Manual shop orders are delivered instantly
            new Date().toISOString().split('T')[0],
            cart,
            parseInt(selectedBranchId),
            'cash',
            notes
        );

        // Update product stocks
        cart.forEach(item => {
            const product = products.find(p => p.id === item.product.id);
            if (product) {
                const updatedStock = { ...product.branchStock };
                updatedStock[selectedBranchId] = (updatedStock[selectedBranchId] || 0) - item.quantity;
                updateProduct(product.id, { ...product, branchStock: updatedStock });
            }
        });

        addOrder(newOrder);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('seller.ord.manual_order')}</h3>
                            <p className="text-sm text-slate-500">{t('seller.dash.subtitle')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* Left: Product Selection */}
                    <div className="flex-1 p-6 overflow-y-auto border-r border-gray-100 dark:border-slate-800">
                        <div className="space-y-6">
                            {/* Branch Selection (Admin only) */}
                            {isAdmin && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('seller.ord.select_branch')}</label>
                                    <select
                                        value={selectedBranchId}
                                        onChange={(e) => {
                                            setSelectedBranchId(e.target.value);
                                            setCart([]); // Reset cart when branch changes
                                        }}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    >
                                        {branches.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Product Search */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('seller.ord.add_item')}</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('seller.ord.search_products')}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                    />
                                </div>

                                {filteredProducts.length > 0 && (
                                    <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden">
                                        {filteredProducts.map(product => {
                                            const stock = product.branchStock?.[selectedBranchId] || 0;
                                            return (
                                                <button
                                                    key={product.id}
                                                    onClick={() => addToCart(product)}
                                                    disabled={stock <= 0}
                                                    className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors disabled:opacity-50"
                                                >
                                                    <div className="text-left">
                                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{product.name}</p>
                                                        <p className="text-xs text-slate-500">{product.manufacturer}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-primary-600">{product.price}</p>
                                                        <p className={`text-[10px] ${stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                            {stock} {t('seller.prod.stock')}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Cart Table */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">{t('seller.ord.items')}</h4>
                                {cart.length === 0 ? (
                                    <div className="text-center py-8 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-2xl">
                                        <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">Cart is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {cart.map(item => (
                                            <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.product.name}</p>
                                                    <p className="text-xs text-slate-500">{item.product.price}</p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-1">
                                                    <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md text-slate-500"><Minus className="w-3 h-3" /></button>
                                                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md text-slate-500"><Plus className="w-3 h-3" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Customer & Checkout */}
                    <div className="w-full md:w-80 p-6 bg-gray-50 dark:bg-slate-800/20 overflow-y-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider">{t('seller.ord.customer')}</h4>

                                <div>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder={t('seller.ord.customer_name')}
                                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder={t('seller.ord.phone')}
                                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <textarea
                                            value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}
                                            placeholder={t('seller.ord.address')}
                                            rows={2}
                                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-slate-800 space-y-4">
                                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                                    <span className="text-sm">{t('seller.ord.payment_received')}</span>
                                    <span className="font-bold text-lg text-slate-900 dark:text-white">৳ {subtotal.toFixed(2)}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={cart.length === 0}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-600/20 transition-all disabled:opacity-50"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    {t('seller.ord.create_order')}
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full text-center text-sm text-slate-500 hover:text-rose-500 transition-colors"
                                >
                                    {t('seller.ord.discard')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewOrderModal;
