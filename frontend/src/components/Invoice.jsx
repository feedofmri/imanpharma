import { useRef } from 'react';
import { X, Download, Printer } from 'lucide-react';
import logoDark from '../assets/logo/Logo Dark.png';

function Invoice({ order, branches, onClose }) {
    const printRef = useRef();
    const branch = branches?.find(b => b.id === order?.branchId);

    const handlePrint = () => {
        // Convert logo to base64 for the print window
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
        const content = printRef.current;
        const printWindow = window.open('', '_blank');
        const logoHtml = logoBase64
            ? `<img src="${logoBase64}" alt="Logo" style="height:48px; margin-bottom: 8px;" />`
            : '';
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice - ${order.id}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 40px; }
                        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #e2e8f0; }
                        .company-name { font-size: 24px; font-weight: bold; color: #6CA668; }
                        .company-sub { font-size: 12px; color: #64748b; margin-top: 4px; }
                        .invoice-title { font-size: 28px; font-weight: bold; color: #334155; text-align: right; }
                        .invoice-id { font-size: 14px; color: #64748b; margin-top: 4px; text-align: right; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
                        .info-box h4 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 600; margin-bottom: 8px; }
                        .info-box p { font-size: 14px; color: #334155; line-height: 1.6; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                        th { background: #f8fafc; text-align: left; padding: 12px 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; border-bottom: 2px solid #e2e8f0; }
                        td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
                        .text-right { text-align: right; }
                        .total-row { background: #f0fdf4; }
                        .total-row td { font-weight: bold; font-size: 16px; color: #6CA668; }
                        .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            ${logoHtml}
                            <div class="company-name">M/S Iman Pharmacy</div>
                            <div class="company-sub">Your Trusted Health Partner</div>
                            ${branch ? `<div class="company-sub">${branch.name} — ${branch.location}</div>` : ''}
                        </div>
                        <div style="text-align: right;">
                            <div class="invoice-title">INVOICE</div>
                            <div class="invoice-id">${order.id}</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">Date: ${order.date}</div>
                        </div>
                    </div>
                    ${content.querySelector('.invoice-body').innerHTML}
                    <div class="footer">Thank you for choosing M/S Iman Pharmacy. &bull; www.imanpharma.com</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invoice Preview</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={handlePrint} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                            <Printer className="w-4 h-4" /> Print / Save PDF
                        </button>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="p-6 sm:p-8 overflow-y-auto" ref={printRef}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: '2px solid #e2e8f0' }}>
                        <div>
                            <img src={logoDark} alt="Iman Pharmacy" style={{ height: '48px', marginBottom: '8px' }} />
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6CA668' }}>M/S Iman Pharmacy</div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Your Trusted Health Partner</div>
                            {branch && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{branch.name} — {branch.location}</div>}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#334155' }}>INVOICE</div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{order.id}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Date: {order.date}</div>
                        </div>
                    </div>

                    <div className="invoice-body">
                        {/* Customer & Payment Info */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                            <div>
                                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>Bill To</h4>
                                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                                    {order.customerName}<br />
                                    {order.phone}<br />
                                    {order.address}
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>Payment Info</h4>
                                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                                    Method: <strong style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</strong><br />
                                    Status: <strong>{order.status}</strong>
                                </p>
                            </div>
                        </div>

                        {/* Items Table */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                            <thead>
                                <tr>
                                    <th style={{ background: '#f8fafc', textAlign: 'left', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Item</th>
                                    <th style={{ background: '#f8fafc', textAlign: 'left', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Qty</th>
                                    <th style={{ background: '#f8fafc', textAlign: 'left', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Price</th>
                                    <th style={{ background: '#f8fafc', textAlign: 'right', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(order.items || []).map((item, idx) => {
                                    const price = parseFloat((item.product?.price || '0').replace(/[^0-9.]/g, ''));
                                    const subtotal = price * item.quantity;
                                    return (
                                        <tr key={idx}>
                                            <td style={{ padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }}>
                                                {item.product?.name || 'Unknown'}<br />
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.product?.packSize || ''}</span>
                                            </td>
                                            <td style={{ padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }}>{item.quantity}</td>
                                            <td style={{ padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }}>{item.product?.price}</td>
                                            <td style={{ padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #f1f5f9', textAlign: 'right' }}>৳ {subtotal.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                                <tr style={{ background: '#f0fdf4' }}>
                                    <td colSpan="3" style={{ padding: '12px 16px', fontWeight: 'bold', fontSize: '16px', color: '#6CA668' }}>Total</td>
                                    <td style={{ padding: '12px 16px', fontWeight: 'bold', fontSize: '16px', color: '#6CA668', textAlign: 'right' }}>{order.total}</td>
                                </tr>
                            </tbody>
                        </table>

                        {order.notes && (
                            <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px', color: '#64748b' }}>
                                <strong>Note:</strong> {order.notes}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
