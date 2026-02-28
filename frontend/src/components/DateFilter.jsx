import { useState, useEffect } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function DateFilter({ onDateRangeChange }) {
    const { t } = useLanguage();
    const [filterType, setFilterType] = useState('all'); // all, today, month, year, custom
    const [customRange, setCustomRange] = useState({ start: '', end: '' });

    useEffect(() => {
        let start = null;
        let end = null;
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (filterType === 'all') {
            // Leave start and end as null
        } else if (filterType === 'today') {
            start = now;
            end = new Date(now);
            end.setHours(23, 59, 59, 999);
        } else if (filterType === 'month') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        } else if (filterType === 'year') {
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        } else if (filterType === 'custom') {
            if (customRange.start) {
                start = new Date(customRange.start);
                start.setHours(0, 0, 0, 0);
            }
            if (customRange.end) {
                end = new Date(customRange.end);
                end.setHours(23, 59, 59, 999);
            }
        }

        onDateRangeChange({ start, end });
    }, [filterType, customRange, onDateRangeChange]);

    return (
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#1E293B] p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 px-2 text-slate-500 dark:text-slate-400 border-r border-gray-200 dark:border-slate-700">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium mr-2">Filter:</span>
            </div>

            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-3 pr-8 py-1.5 text-sm border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none font-medium cursor-pointer"
            >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
            </select>

            {filterType === 'custom' && (
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={customRange.start}
                        onChange={(e) => setCustomRange(prev => ({ ...prev, start: e.target.value }))}
                        className="px-2 py-1.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span className="text-slate-400 text-sm">to</span>
                    <input
                        type="date"
                        value={customRange.end}
                        onChange={(e) => setCustomRange(prev => ({ ...prev, end: e.target.value }))}
                        className="px-2 py-1.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
            )}
        </div>
    );
}

export default DateFilter;
