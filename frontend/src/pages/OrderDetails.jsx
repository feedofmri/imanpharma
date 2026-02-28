import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, MapPin, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';

function OrderDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // If no file was uploaded, redirect back to home
        if (!location.state?.fileName) {
            navigate('/');
            return;
        }
        setFileName(location.state.fileName);
    }, [location, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call for order submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form or redirect after success (optional)
            // setTimeout(() => navigate('/'), 3000);
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
                        Order Received!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Thank you for your order. Our pharmacists are reviewing your prescription and will contact you shortly at <span className="font-semibold text-slate-900 dark:text-white">{formData.phone}</span> to confirm the delivery details.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-md transition-colors w-full"
                    >
                        Return to Home
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
                            Complete Your <span className="text-primary-600 dark:text-primary-400">Order</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Please provide your delivery details so we can process your prescription.
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
                                            Full Name
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
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Phone Number
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
                                                placeholder="01XXXXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Delivery Address
                                        </label>
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
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3"
                                                placeholder="House/Apt, Street, Area, Sirajganj"
                                            />
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            id="notes"
                                            rows={2}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4"
                                            placeholder="Any specific instructions for delivery?"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm Order'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="md:col-span-1 space-y-6">

                            {/* File Attachment Summary */}
                            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Attached Prescription
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
                                            Uploaded successfully
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Information */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-6 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">What happens next?</h4>
                                    <ul className="mt-2 text-sm text-blue-800 dark:text-blue-400/80 space-y-2 list-disc list-inside">
                                        <li>Our pharmacist will review the prescription.</li>
                                        <li>We will call you to confirm availability and total price.</li>
                                        <li>The order will be dispatched to your provided address.</li>
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
