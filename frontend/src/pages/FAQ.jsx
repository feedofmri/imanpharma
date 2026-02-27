import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What are your operating hours?",
        answer: "We are open from Saturday to Thursday, 8:00 AM to 10:00 PM. On Fridays, we open from 3:00 PM to 10:00 PM."
    },
    {
        question: "Do you offer home delivery?",
        answer: "Yes, we offer home delivery within the local Ullapara area. Please call our contact number or message us on WhatsApp with your prescription to arrange delivery."
    },
    {
        question: "Do I need a prescription to buy medicines?",
        answer: "A valid prescription is required for all prescription-only medicines (POM), such as antibiotics and specialized treatments. Over-the-counter (OTC) medicines like paracetamol or vitamins can be purchased without one."
    },
    {
        question: "What is your return policy?",
        answer: "For safety and hygiene reasons, we only accept returns on unsealed, unbroken items up to 3 days after purchase with the original receipt. Cold-chain items (like insulin or vaccines) cannot be returned."
    },
    {
        question: "Can I pre-order medicines that are out of stock?",
        answer: "Absolutely. If a medicine is out of stock, we can order it specially for you from our distributors. It typically takes 1-2 business days to arrive."
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
                className={`px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 pb-0 overflow-hidden'
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
    return (
        <>
            <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-3xl text-center mx-auto">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
                            <HelpCircle className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                            <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            How can we <span className="text-primary-600 dark:text-primary-400">Help You?</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Find answers to common questions about our services, prescriptions, and store policies.
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
                            Still have questions? <a href="/contact" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Contact us</a> directly.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FAQ;
