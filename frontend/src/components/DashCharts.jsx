import { useMemo } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const COLORS = ['#6CA668', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

function DashCharts({ orders, isAdmin, branches }) {
    const { t, language } = useLanguage();

    // 1. Revenue Over Time (Last 7 days or custom range)
    const revenueData = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => {
            const dayOrders = orders.filter(o => o.date === date);
            const total = dayOrders.reduce((sum, o) => sum + parseFloat(o.total.replace('৳ ', '').replace(',', '')), 0);
            return {
                name: date.split('-').slice(1).join('/'),
                revenue: total
            };
        });
    }, [orders]);

    // 2. Sales by Status
    const statusData = useMemo(() => {
        const statuses = ['Processing', 'Shipped', 'Delivered'];
        return statuses.map(status => ({
            name: status,
            value: orders.filter(o => o.status === status).length
        }));
    }, [orders]);

    // 3. Sales by Branch (Admin) or Category (Manager)
    const distributionData = useMemo(() => {
        if (isAdmin) {
            return branches.map(branch => ({
                name: branch.name,
                value: orders.filter(o => o.branchId === branch.id).length
            }));
        } else {
            // Group by category for managers
            const categoryCounts = {};
            orders.forEach(order => {
                order.items.forEach(item => {
                    const cat = item.product.category;
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity;
                });
            });
            return Object.entries(categoryCounts).map(([name, value]) => ({ name, value })).slice(0, 5);
        }
    }, [orders, isAdmin, branches]);

    if (orders.length === 0) {
        return (
            <div className="p-12 text-center bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800">
                <p className="text-slate-500">{t('seller.dash.no_data')}</p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('seller.dash.revenue_trend')}</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6CA668" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#6CA668" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                tickFormatter={(value) => `৳${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1E293B',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#6CA668' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#6CA668" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sales Distribution */}
            <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                    {isAdmin ? t('seller.dash.sales_by_branch') : t('seller.dash.top_categories')}
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={distributionData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={100}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: '#1E293B',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Bar dataKey="value" fill="#6CA668" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Order Status Pie */}
            <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">{t('seller.dash.sales_by_status')}</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashCharts;
