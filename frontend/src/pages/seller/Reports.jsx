import { useMemo } from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Package, BarChart3, Download } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import DateFilter from '../../components/DateFilter';
import logoDark from '../../assets/logo/Logo Dark.png';

function Reports() {
    const { orders, products, branches } = useData();
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();

    // Filter for manager
    const managedBranch = branches.find(b => b.managerId === user?.id);
    const baseOrders = isAdmin ? orders : orders.filter(o => o.branchId === managedBranch?.id);

    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const filteredOrders = baseOrders.filter(o => {
        if (!dateRange.start && !dateRange.end) return true;
        const oDate = new Date(o.date);
        oDate.setHours(0, 0, 0, 0);

        if (dateRange.start && dateRange.end) {
            return oDate >= dateRange.start && oDate <= dateRange.end;
        }
        if (dateRange.start) return oDate >= dateRange.start;
        if (dateRange.end) return oDate <= dateRange.end;
        return true;
    });

    const stats = useMemo(() => {
        const totalRevenue = filteredOrders.reduce((sum, o) => {
            const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);

        const delivered = filteredOrders.filter(o => o.status === 'Delivered').length;
        const processing = filteredOrders.filter(o => o.status === 'Processing').length;
        const shipped = filteredOrders.filter(o => o.status === 'Shipped').length;

        // Top products by frequency
        const productCounts = {};
        filteredOrders.forEach(o => {
            (o.items || []).forEach(item => {
                const name = item.product?.name || 'Unknown';
                productCounts[name] = (productCounts[name] || 0) + item.quantity;
            });
        });
        const topProducts = Object.entries(productCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // Revenue by payment method
        const paymentBreakdown = {};
        filteredOrders.forEach(o => {
            const method = o.paymentMethod || 'cod';
            const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
            paymentBreakdown[method] = (paymentBreakdown[method] || 0) + (isNaN(num) ? 0 : num);
        });

        // Revenue by branch (admin only)
        const branchBreakdown = {};
        if (isAdmin) {
            filteredOrders.forEach(o => {
                const branch = branches.find(b => b.id === o.branchId);
                const name = branch ? branch.name : 'Unknown';
                const num = parseFloat(o.total.replace(/[^0-9.]/g, ''));
                branchBreakdown[name] = (branchBreakdown[name] || 0) + (isNaN(num) ? 0 : num);
            });
        }

        return { totalRevenue, delivered, processing, shipped, topProducts, paymentBreakdown, branchBreakdown };
    }, [filteredOrders, branches, isAdmin]);

    const statCards = [
        { label: t('seller.reports_page.revenue'), value: `৳ ${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { label: t('seller.reports_page.orders'), value: filteredOrders.length, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' },
        { label: t('seller.reports_page.delivered'), value: stats.delivered, icon: TrendingUp, color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400' },
        { label: t('seller.reports_page.processing'), value: stats.processing, icon: Package, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' },
    ];

    const maxTopProduct = stats.topProducts.length > 0 ? stats.topProducts[0][1] : 1;

    const handleExport = () => {
        // Convert logo to base64 for the print window to avoid cross-origin issues during print
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext('2d').drawImage(img, 0, 0);
            const logoBase64 = canvas.toDataURL('image/png');
            openPrintWindow(logoBase64);
        };
        img.onerror = () => openPrintWindow('');
        img.src = logoDark;
    };

    const openPrintWindow = (logoBase64) => {
        const printWindow = window.open('', '_blank');
        const logoHtml = logoBase64
            ? `<img src="${logoBase64}" alt="Logo" style="height:48px; margin-bottom: 8px;" />`
            : '';

        let topProductsHtml = stats.topProducts.map(([name, count], idx) => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${idx + 1}. ${name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-size: 14px;">${count} sold</td>
            </tr>
        `).join('');

        printWindow.document.write(`
            <html>
            <head>
                <title>Report_${new Date().toISOString().split('T')[0]}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; }
                    @media print {
                        @page { margin: 0; }
                        body { margin: 1.6cm; }
                    }
                    .header { margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
                    .grid { display: flex; gap: 16px; margin-bottom: 30px; }
                    .card { flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background: #f8fafc; text-align: center; }
                    .card-val { font-size: 24px; font-weight: bold; margin-bottom: 4px; color: #0f172a; }
                    h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th { text-align: left; padding: 10px; background: #f1f5f9; border-bottom: 2px solid #e2e8f0; font-size: 12px; text-transform: uppercase; color: #64748b; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        ${logoHtml}
                        <div style="font-size: 20px; font-weight: bold; color: #6CA668;">Business Analytics Report</div>
                    </div>
                    <div style="text-align: right; color: #64748b; font-size: 13px;">
                        <div style="margin-bottom: 4px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                        <div><strong>Branch:</strong> ${managedBranch ? managedBranch.name : 'All Branches (Admin)'}</div>
                        ${dateRange.start ? `<div style="margin-top: 4px;"><strong>Filter:</strong> ${new Date(dateRange.start).toLocaleDateString()} to ${dateRange.end ? new Date(dateRange.end).toLocaleDateString() : 'Now'}</div>` : ''}
                    </div>
                </div>
                
                <div class="grid">
                    <div class="card">
                        <div class="card-val" style="color: #059669;">৳ ${stats.totalRevenue.toFixed(2)}</div>
                        <div style="font-size: 13px; color: #64748b;">Total Revenue</div>
                    </div>
                    <div class="card">
                        <div class="card-val" style="color: #2563eb;">${filteredOrders.length}</div>
                        <div style="font-size: 13px; color: #64748b;">Total Orders</div>
                    </div>
                    <div class="card">
                        <div class="card-val" style="color: #0284c7;">${stats.delivered}</div>
                        <div style="font-size: 13px; color: #64748b;">Delivered</div>
                    </div>
                    <div class="card">
                        <div class="card-val" style="color: #d97706;">${stats.processing}</div>
                        <div style="font-size: 13px; color: #64748b;">Processing</div>
                    </div>
                </div>

                <h3>Top Selling Products</h3>
                <table>
                    <thead><tr><th>Product Name</th><th style="text-align: right;">Quantity Sold</th></tr></thead>
                    <tbody>${topProductsHtml || '<tr><td colspan="2" style="padding: 10px; text-align: center; font-size: 14px; color: #94a3b8;">No sales data available</td></tr>'}</tbody>
                </table>
                
                <div style="display: flex; gap: 24px;">
                    <div style="flex: 1;">
                        <h3>Revenue by Payment Method</h3>
                        <table>
                            <thead><tr><th>Method</th><th style="text-align: right;">Revenue</th></tr></thead>
                            <tbody>
                                ${Object.keys(stats.paymentBreakdown).length > 0 ? Object.entries(stats.paymentBreakdown).map(([m, a]) => `
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; font-size: 14px;">${m}</td>
                                        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-size: 14px; font-weight: bold;">৳ ${a.toFixed(2)}</td>
                                    </tr>`).join('') : '<tr><td colspan="2" style="padding: 10px; text-align: center; font-size: 14px; color: #94a3b8;">No data</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                    
                    ${isAdmin && Object.keys(stats.branchBreakdown).length > 0 ? `
                    <div style="flex: 1;">
                        <h3>Revenue by Branch</h3>
                        <table>
                            <thead><tr><th>Branch Name</th><th style="text-align: right;">Revenue</th></tr></thead>
                            <tbody>
                                ${Object.entries(stats.branchBreakdown).map(([n, a]) => `
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${n}</td>
                                        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-size: 14px; font-weight: bold;">৳ ${a.toFixed(2)}</td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>` : '<div style="flex: 1;"></div>'}
                </div>
                
                <div style="margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                    Generated by M/S Iman Pharmacy Analytics System &bull; www.imanpharma.com
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 300);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('seller.reports_page.title')}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                    <DateFilter onDateRangeChange={setDateRange} />
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 rounded-xl transition-all shadow-sm font-medium"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-5 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Selling Products */}
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('seller.reports_page.top_products')}</h2>
                    </div>
                    {stats.topProducts.length > 0 ? (
                        <div className="space-y-4">
                            {stats.topProducts.map(([name, count], idx) => (
                                <div key={name}>
                                    <div className="flex items-center justify-between text-sm mb-1.5">
                                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-4">{idx + 1}. {name}</span>
                                        <span className="text-slate-500 dark:text-slate-400 shrink-0">{count} {t('seller.reports_page.sold')}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5">
                                        <div
                                            className="bg-primary-500 h-2.5 rounded-full transition-all"
                                            style={{ width: `${(count / maxTopProduct) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 text-center py-4">{t('seller.reports_page.no_sales')}</p>
                    )}
                </div>

                {/* Payment Methods Breakdown */}
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('seller.reports_page.revenue_method')}</h2>
                    </div>
                    {Object.keys(stats.paymentBreakdown).length > 0 ? (
                        <div className="space-y-3">
                            {Object.entries(stats.paymentBreakdown).map(([method, amount]) => (
                                <div key={method} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">{method}</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">৳ {amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 text-center py-4">{t('seller.reports_page.no_payment')}</p>
                    )}
                </div>
            </div>

            {/* Branch Breakdown (Admin only) */}
            {isAdmin && Object.keys(stats.branchBreakdown).length > 0 && (
                <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{t('seller.reports_page.revenue_branch')}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-700 uppercase bg-gray-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-3">{t('seller.reports_page.branch')}</th>
                                    <th className="px-6 py-3 text-right">{t('seller.reports_page.revenue_col')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {Object.entries(stats.branchBreakdown).map(([name, amount]) => (
                                    <tr key={name} className="hover:bg-gray-50 dark:hover:bg-slate-800/30">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{name}</td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">৳ {amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;
