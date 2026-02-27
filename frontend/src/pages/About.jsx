import { Heart, User, FileCheck, Target, Eye, Award } from 'lucide-react';

function About() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/30 mb-6">
              <Heart className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Built on <span className="text-cyan-600 dark:text-cyan-400">Trust</span>, Driven by{' '}
              <span className="text-cyan-600 dark:text-cyan-400">Care</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              M/S Iman Pharmacy was founded with a simple yet powerful vision — to provide the
              community of Ullapara with access to 100% authentic medicines, reliable healthcare
              products, and compassionate pharmaceutical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="w-12 h-12 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To become the most trusted pharmacy in Ullapara and surrounding areas by prioritizing
                authenticity, accessibility, and compassionate customer care in everything we do.
              </p>
            </div>
            <div className="p-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="w-12 h-12 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To serve every customer with integrity, ensuring that no one in our community goes
                without essential medicines. We believe healthcare is a right, not a privilege.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proprietor Bio */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Photo Placeholder */}
            <div className="md:col-span-2">
              <div className="aspect-[3/4] rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <User className="w-16 h-16 mb-3" />
                  <span className="text-sm font-medium">Proprietor Photo</span>
                  <span className="text-xs mt-1">Recommended: 450×600px</span>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/30 mb-4">
                <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                  Proprietor
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Md. Shafiqul Islam
              </h2>
              <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-6">
                Founder & Proprietor, M/S Iman Pharmacy
              </p>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Md. Shafiqul Islam established M/S Iman Pharmacy with the core belief that every
                  individual in Ullapara deserves access to genuine, affordable medicines. His
                  dedication to the community and his unwavering commitment to quality have made
                  Iman Pharmacy a household name.
                </p>
                <p>
                  Under his leadership, the pharmacy has grown to serve hundreds of families, offering
                  not just medicines but also trusted pharmaceutical guidance. His vision is to expand
                  services to include home delivery and digital prescriptions for greater convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Trust */}
      <section className="bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Trade License Registered
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              M/S Iman Pharmacy is a fully registered and legally compliant business. We operate
              under a valid trade license issued by the local authorities, ensuring that all our
              operations meet the highest standards of transparency and legality.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Verified & Compliant Business
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
