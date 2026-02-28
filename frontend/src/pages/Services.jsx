import {
  Pill,
  ShoppingBag,
  Scissors,
  Sparkles,
  Cross,
  Upload,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const categories = [
  {
    icon: Pill,
    title: 'Chronic Illness Medicine',
    description:
      'Complete range of medicines for diabetes, hypertension, heart disease, thyroid conditions, and other chronic illnesses.',
    items: ['Diabetes Care', 'Blood Pressure', 'Heart Health', 'Thyroid Meds'],
  },
  {
    icon: ShoppingBag,
    title: 'OTC Drugs',
    description:
      'Over-the-counter medicines for common ailments like headache, fever, cold, cough, and digestive issues.',
    items: ['Pain Relief', 'Cold & Flu', 'Antacids', 'Vitamins'],
  },
  {
    icon: Scissors,
    title: 'Surgical Supplies',
    description:
      'Bandages, gauze, syringes, surgical tapes, and other essential surgical and wound-care supplies.',
    items: ['Bandages', 'Syringes', 'Surgical Tape', 'Wound Care'],
  },
  {
    icon: Sparkles,
    title: 'Personal Care',
    description:
      'Skincare, haircare, oral hygiene, and grooming products from trusted local and international brands.',
    items: ['Skincare', 'Haircare', 'Oral Care', 'Hygiene'],
  },
  {
    icon: Cross,
    title: 'First Aid',
    description:
      'Ready-to-use first aid kits, antiseptics, thermometers, BP monitors, and emergency health essentials.',
    items: ['First Aid Kits', 'Antiseptics', 'Thermometers', 'BP Monitors'],
  },
];

function Services() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Navigate to order details page, passing the file info in state
      navigate('/order-details', { state: { fileName: file.name } });
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
              <Pill className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                Our Services
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Everything You Need,{' '}
              <span className="text-primary-600 dark:text-primary-400">Under One Roof</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              From chronic illness management to everyday health essentials — we carry a comprehensive
              range of pharmaceutical products and healthcare supplies.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Prescription Card */}
      <section className="bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto relative z-10">
            {/* Background glowing blur effect */}
            <div className="absolute inset-0 bg-primary-400/20 dark:bg-primary-600/10 blur-3xl rounded-full transform translate-y-10 scale-105" />

            <div className="relative bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Upload Your Prescription
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Upload it securely and let our pharmacists prepare your order for quick pickup or delivery.
                </p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary-200 dark:border-primary-800/60 rounded-2xl p-10 text-center bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-all duration-300">
                  <Upload className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-lg text-slate-900 dark:text-white font-medium mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Click to upload or drag & drop
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  JPG, PNG or PDF (max. 10MB)
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Verified Secure</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Fast Processing</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Or send your prescription via WhatsApp:
                </p>
                <a
                  href="https://wa.me/8801XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:underline"
                >
                  Message on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
