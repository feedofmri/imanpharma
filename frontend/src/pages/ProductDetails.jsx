import { useParams, Link } from 'react-router-dom';
import { Pill, AlertCircle, CheckCircle2, ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        category: 'Medicines',
        description: 'Relief for fever and moderate pain.',
        details: 'Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It\'s available combined with other painkillers and anti-sickness medicines. It\'s an ingredient in a wide range of cold and flu remedies.',
        price: '৳20.00 / strip',
        manufacturer: 'Square Pharmaceuticals Ltd.',
        inStock: true,
        packSize: '10 tablets per strip',
    },
    {
        id: 2,
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        description: 'Treats a variety of bacterial infections.',
        details: 'Amoxicillin is an antibiotic. It\'s used to treat bacterial infections, such as chest infections (including pneumonia), dental abscesses and urinary tract infections (UTIs). It\'s used in children, often to treat ear infections and chest infections.',
        price: '৳55.00 / strip',
        manufacturer: 'Beximco Pharmaceuticals Ltd.',
        inStock: true,
        packSize: '10 capsules per strip',
    },
    {
        id: 3,
        name: 'Digital Thermometer',
        category: 'Medical Devices',
        description: 'Accurate clinical digital thermometer.',
        details: 'A digital thermometer uses an electronic heat sensor to record body temperature. They can be used in the rectum, mouth, or armpit. Armpit temperatures are usually the least accurate of the three. It comes with a clear LCD display, beeper alert, and auto shut-off function.',
        price: '৳150.00',
        manufacturer: 'Generic',
        inStock: true,
        packSize: '1 unit',
    },
    {
        id: 4,
        name: 'Vitamin D3 2000 IU',
        category: 'Supplements',
        description: 'Promotes bone and immune system health.',
        details: 'Vitamin D3 (Cholecalciferol) supplements help your body absorb calcium and phosphorus. Having the right amount of vitamin D, calcium, and phosphorus is important for building and keeping strong bones. It is highly recommended during winter or for indoor lifestyles.',
        price: '৳120.00 / bottle',
        manufacturer: 'Incepta Pharmaceuticals Ltd.',
        inStock: false,
        packSize: '30 tablets',
    },
    {
        id: 5,
        name: 'Ibuprofen 400mg',
        category: 'Medicines',
        description: 'Nonsteroidal anti-inflammatory drug.',
        details: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain from various conditions such as headache, dental pain, menstrual cramps, muscle aches, or arthritis. It is also used to reduce fever and to relieve minor aches and pain due to the common cold or flu.',
        price: '৳30.00 / strip',
        manufacturer: 'Renata Limited',
        inStock: true,
        packSize: '10 tablets per strip',
    },
    {
        id: 6,
        name: 'First Aid Kit',
        category: 'Medical Devices',
        description: 'Essential items for treating minor injuries.',
        details: 'A comprehensive first aid kit equipped with bandages, antiseptic wipes, gauze sheets, medical tape, tweezers, and scissors. Perfect for keeping at home, in the car, or taking on camping trips to treat minor cuts, scrapes, and burns.',
        price: '৳450.00',
        manufacturer: 'HealthCare Essentials',
        inStock: true,
        packSize: '1 box (15 items)',
    },
];

function ProductDetails() {
    const { id } = useParams();

    // Find the product by ID
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0F172A] px-4">
                <AlertCircle className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Product Not Found</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-sm">
                    We couldn't find the product you're looking for. It might have been removed or the link is incorrect.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 dark:bg-primary-500 text-white font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-[#0F172A] min-h-screen pb-20">
            {/* Top Breadcrumb Header */}
            <div className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            Products
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-white">{product.category}</span>
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
                    Back to catalog
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
                                        {product.category}
                                    </span>

                                    {product.inStock ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                                    {product.name}
                                </h1>

                                <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
                                    {product.description}
                                </p>

                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        {product.price.split(' ')[0]}
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                                        {product.price.split(' ').slice(1).join(' ')}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-slate-800 flex-grow">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
                                        Description
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                        {product.details}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                                        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Manufacturer</span>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{product.manufacturer}</span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                                        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Pack Size</span>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{product.packSize}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button
                                    disabled={!product.inStock}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                <button className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
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
