import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getFaqs = (t) => [
    {
        question: t('faq.items.q1.q'),
        answer: t('faq.items.q1.a')
    },
    {
        question: t('faq.items.q2.q'),
        answer: t('faq.items.q2.a')
    },
    {
        question: t('faq.items.q3.q'),
        answer: t('faq.items.q3.a')
    },
    {
        question: t('faq.items.q4.q'),
        answer: t('faq.items.q4.a')
    },
    {
        question: t('faq.items.q5.q'),
        answer: t('faq.items.q5.a')
    }
];

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0F172A] overflow-hidden transition-all duration-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
                <span className="font-semibold text-slate-900 dark:text-white text-lg pr-4">
                    {question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'bg-gray-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>

            <div
                className={`px-5 text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-96 pb-5' : 'opacity-0 max-h-0 pb-0 overflow-hidden'
                    }`}
            >
                <div className="pt-2 border-t border-gray-100 dark:border-slate-800/50 mt-2">
                    {answer}
                </div>
            </div>
        </div>
    );
}

function FAQ() {
    const { t } = useLanguage();
    const faqs = getFaqs(t);
    return (
        <>
            <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-3xl text-center mx-auto">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
                            <HelpCircle className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                            <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                {t('faq.tag')}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            {t('faq.title_1')} <span className="text-primary-600 dark:text-primary-400">{t('faq.title_2')}</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t('faq.desc')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-slate-900/50 py-16 sm:py-24 min-h-[50vh]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            {t('faq.more.q')} <a href="/contact" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">{t('faq.more.action')}</a> {t('faq.more.suffix')}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FAQ;
