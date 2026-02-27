import {
  Pill,
  ShoppingBag,
  Scissors,
  Sparkles,
  Cross,
  Upload,
  FileText,
  ArrowRight,
} from 'lucide-react';

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
  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/30 mb-6">
              <Pill className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                Our Services
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Everything You Need,{' '}
              <span className="text-cyan-600 dark:text-cyan-400">Under One Roof</span>
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
                  <category.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
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

      {/* Prescription Upload Placeholder */}
      <section className="bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Upload Your <span className="text-cyan-600 dark:text-cyan-400">Prescription</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Send us your prescription and we'll prepare your medicines. This feature is coming
                soon!
              </p>
            </div>

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-10 text-center hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors duration-200 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                Drag & Drop Your Prescription
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                or click to browse files (JPG, PNG, PDF)
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white text-sm font-medium">
                <FileText className="w-4 h-4" />
                Browse Files
              </div>
              <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-medium">
                ⚠ This feature is a UI placeholder and will be functional in a future update.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                In the meantime, you can send your prescription via WhatsApp:
              </p>
              <a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm hover:underline"
              >
                Send via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
