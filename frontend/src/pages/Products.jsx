import { useState, useEffect } from 'react';
import { Pill, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const categories = ['All', 'Medicines', 'Medical Devices', 'Antibiotics', 'Supplements'];

function Products() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    // Reset page to 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* Page Header */}
            <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
                            <Pill className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                            <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                Medicines & Healthcare
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            Our <span className="text-primary-600 dark:text-primary-400">Products</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Explore our wide range of reliable medicines, healthcare products, and medical devices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 dark:bg-slate-900/50 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Filters and Search */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            <Filter className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mr-1" />
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? 'bg-primary-600 text-white border border-primary-600'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <Link
                                to={`/product/${product.id}`}
                                key={product.id}
                                className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] hover:shadow-xl dark:hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                        {product.category}
                                    </span>
                                    {product.inStock ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                                        {product.price}
                                    </span>
                                    <button className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                                        Details
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx + 1)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === idx + 1
                                                ? 'bg-primary-600 text-white border border-primary-600'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 dark:text-slate-400">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="mt-4 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}

export default Products;
