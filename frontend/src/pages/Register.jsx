import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Phone, ShieldCheck, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function Register() {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    // OTP state
    const [step, setStep] = useState('form'); // 'form' | 'otp'
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpTimer, setOtpTimer] = useState(0);
    const [otpSending, setOtpSending] = useState(false);
    const otpRefs = useRef([]);

    // OTP countdown timer
    useEffect(() => {
        if (otpTimer > 0) {
            const interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimer]);

    const sendOtp = () => {
        // Generate a random 6-digit OTP (mock)
        const code = String(Math.floor(100000 + Math.random() * 900000));
        setGeneratedOtp(code);
        setOtpTimer(60);
        setOtp(['', '', '', '', '', '']);
        setOtpError('');

        // In a real app this would call an SMS API
        // For demo, we show the OTP in the console and in a toast
        console.log(`[MOCK SMS] OTP sent to ${phone}: ${code}`);
        alert(`📱 Demo OTP sent to ${phone}: ${code}\n\n(In production this would be sent via SMS)`);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (email.includes('admin') || email.includes('manager')) {
            setError(t('auth.errors.admin_reg'));
            return;
        }

        if (!phone || phone.length < 11) {
            setError(t('auth.errors.valid_phone'));
            return;
        }

        // Move to OTP step
        setOtpSending(true);
        setTimeout(() => {
            sendOtp();
            setStep('otp');
            setOtpSending(false);
        }, 800);
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpError('');

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(''));
        }
    };

    const handleOtpVerify = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length < 6) {
            setOtpError(t('auth.errors.otp_incomplete'));
            return;
        }

        if (enteredOtp !== generatedOtp) {
            setOtpError(t('auth.errors.otp_invalid'));
            return;
        }

        // OTP verified — complete registration
        setLoading(true);
        try {
            await register(name, email, password, phone);
            navigate('/buyer');
        } catch (err) {
            setError(err.message || t('auth.errors.reg_failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = () => {
        if (otpTimer > 0) return;
        sendOtp();
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#0F172A] px-4 py-12">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {step === 'otp' ? t('auth.otp_title') : t('auth.register.title')}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            {step === 'otp'
                                ? `${t('auth.otp_subtitle')} ${phone}`
                                : t('auth.register.subtitle')
                            }
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {step === 'form' ? (
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.name')}</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        placeholder={t('auth.register.placeholder_name')}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('auth.phone')}</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        placeholder={t('auth.register.placeholder_phone')}
                                        maxLength={11}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('auth.phone_hint')}</p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.email')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        placeholder={t('auth.register.placeholder_email')}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.password')}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit" disabled={otpSending}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-600/20 transition-all disabled:opacity-50"
                            >
                                {otpSending ? t('auth.otp_sending') : t('auth.otp_continue')}
                                {!otpSending && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    ) : (
                        /* OTP Verification Step */
                        <div className="space-y-6">
                            {otpError && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                                    {otpError}
                                </div>
                            )}

                            {/* OTP Input Boxes */}
                            <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => otpRefs.current[index] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${digit
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                            : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Timer & Resend */}
                            <div className="text-center">
                                {otpTimer > 0 ? (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {t('auth.otp_resend_in')} <span className="font-semibold text-primary-600 dark:text-primary-400">{otpTimer}s</span>
                                    </p>
                                ) : (
                                    <button onClick={handleResendOtp} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                                        <RotateCcw className="w-4 h-4" /> {t('auth.otp_resend')}
                                    </button>
                                )}
                            </div>

                            {/* Verify Button */}
                            <button
                                onClick={handleOtpVerify} disabled={loading || otp.join('').length < 6}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-600/20 transition-all disabled:opacity-50"
                            >
                                <ShieldCheck className="w-5 h-5" />
                                {loading ? t('auth.otp_creating') : t('auth.otp_verify')}
                            </button>

                            {/* Back to form */}
                            <button
                                onClick={() => setStep('form')}
                                className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                ← {t('auth.otp_back')}
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                        {t('auth.register.has_account')}{' '}
                        <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            {t('auth.register.signin')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
