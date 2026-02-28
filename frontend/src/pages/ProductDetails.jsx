import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Pill, AlertCircle, CheckCircle2, ArrowLeft, Heart, Share2, ShoppingCart, Store, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

function ProductDetails() {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { products, branches } = useData();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || 1);
    const [sellerNotice, setSellerNotice] = useState(false);

    const isSeller = user?.role === 'admin' || user?.role === 'manager';

    // Find the product by ID
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0F172A] px-4">
                <AlertCircle className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('product.not_found')}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-sm">
                    {t('product.not_found_desc')}
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 dark:bg-primary-500 text-white font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {t('product.back_catalog')}
                </Link>
            </div>
        );
    }

    // Get stock for selected branch
    const branchStock = product.branchStock || {};
    const currentStock = branchStock[String(selectedBranchId)] ?? 0;
    const inStock = currentStock > 0;
    const selectedBranch = branches.find(b => b.id === selectedBranchId);

    const getCategoryLabel = (category) => {
        if (language !== 'bn') return category;
        switch (category) {
            case 'Medicines': return t('products.cat.medicines');
            case 'Antibiotics': return t('products.cat.antibiotics');
            case 'Medical Devices': return t('products.cat.devices');
            case 'Supplements': return t('products.cat.supplements');
            default: return category;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-[#0F172A] min-h-screen pb-20">
            {/* Top Breadcrumb Header */}
            <div className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            {t('nav.products')}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-white">{getCategoryLabel(product.category)}</span>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-white truncate">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('product.back_catalog')}
                </Link>

                <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Image Placeholder */}
                        <div className="aspect-square rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                            {product.category === 'Medicines' || product.category === 'Antibiotics' ? (
                                <Pill className="w-32 h-32 text-primary-200 dark:text-primary-800/50" />
                            ) : (
                                <div className="w-32 h-32 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-300 dark:text-primary-800/50 font-bold text-4xl">
                                    {product.name.charAt(0)}
                                </div>
                            )}
                            <div className="absolute top-4 right-4">
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-sm">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-800/50">
                                        {getCategoryLabel(product.category)}
                                    </span>

                                    {inStock ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {t('home.featured.in_stock')} ({currentStock})
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {t('home.featured.out_of_stock')}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                                    {product.name}
                                </h1>

                                <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
                                    {product.description}
                                </p>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        {product.price.split(' ')[0]}
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                                        {product.price.split(' ').slice(1).join(' ')}
                                    </span>
                                </div>

                                {/* Branch Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
                                        <Store className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                                        {t('product_details.select_branch')}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {branches.map(branch => {
                                            const stock = branchStock[String(branch.id)] ?? 0;
                                            const isSelected = selectedBranchId === branch.id;
                                            return (
                                                <button
                                                    key={branch.id}
                                                    onClick={() => { setSelectedBranchId(branch.id); setQuantity(1); }}
                                                    className={`relative p-3 rounded-xl border-2 text-left transition-all ${isSelected
                                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/30'
                                                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                                                        }`}
                                                >
                                                    <p className={`text-sm font-medium ${isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                                                        {branch.name}
                                                    </p>
                                                    <p className={`text-xs mt-0.5 ${stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                                                        {stock > 0 ? `${stock} ${t('product_details.in_stock')}` : t('product_details.out_of_stock')}
                                                    </p>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-500" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-slate-800 flex-grow">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
                                        {t('product.desc_label')}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                        {product.details}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                                        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{t('product.manufacturer')}</span>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{product.manufacturer}</span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                                        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{t('product.pack_size')}</span>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{product.packSize}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Notice */}
                            {sellerNotice && (
                                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                    <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                                    <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                                        {t('product_details.buyer_only_notice')}
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center justify-between border border-gray-200 dark:border-slate-700 rounded-xl h-14 bg-white dark:bg-slate-800 shrink-0 shadow-sm">
                                    <button
                                        disabled={!inStock || quantity <= 1 || isSeller}
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-primary-600 disabled:opacity-50 disabled:hover:text-slate-500 transition-colors"
                                    >-</button>
                                    <span className="w-12 text-center font-semibold text-slate-900 dark:text-white">{quantity}</span>
                                    <button
                                        disabled={!inStock || quantity >= currentStock || isSeller}
                                        onClick={() => setQuantity(q => Math.min(q + 1, currentStock))}
                                        className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-primary-600 disabled:opacity-50 disabled:hover:text-slate-500 transition-colors"
                                    >+</button>
                                </div>
                                <button
                                    disabled={!inStock || isSeller}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (isSeller) {
                                            setSellerNotice(true);
                                            return;
                                        }
                                        addToCart(product, quantity, selectedBranchId);
                                    }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl text-white font-bold text-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {isSeller ? t('product_details.buyer_only') : (inStock ? t('product.add_cart') : t('product.out_of_stock_btn'))}
                                </button>
                                <button className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all shadow-sm">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
