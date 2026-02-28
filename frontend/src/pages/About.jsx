import { useState } from 'react';
import { Heart, User, FileCheck, Target, Eye, Award, X } from 'lucide-react';
import proprietorPhoto from '../assets/Proprietor.png';
import tradeLicense from '../assets/documents/trade-license.jpg';
import drugLicense from '../assets/documents/drug-licence.jpeg';
import pcbCertificate from '../assets/documents/pharmacy council of bangladesh (pcb) certificate.jpeg';

function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Image Modal overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={closeImage}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={closeImage}
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Document Full View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        </div>
      )}
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-6">
              <Heart className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Built on <span className="text-primary-600 dark:text-primary-400">Trust</span>, Driven by{' '}
              <span className="text-primary-600 dark:text-primary-400">Care</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              M/S Iman Pharmacy was founded with a simple yet powerful vision — to provide the
              community of Sirajganj with access to 100% authentic medicines, reliable healthcare
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
              <div className="w-12 h-12 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To become the most trusted pharmacy in Sirajganj and surrounding areas by prioritizing
                authenticity, accessibility, and compassionate customer care in everything we do.
              </p>
            </div>
            <div className="p-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="w-12 h-12 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center mb-5">
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
            {/* Managing Director Photo */}
            <div className="md:col-span-2">
              <div className="aspect-[3/4] rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <img src={proprietorPhoto} alt="Managing Director" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 mb-4">
                <User className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                  Managing Director
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Md. Shofiqul Islam
              </h2>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-6">
                Founder & Managing Director, M/S Iman Pharmacy
              </p>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Md. Shofiqul Islam established M/S Iman Pharmacy with the core belief that every
                  individual in Sirajganj deserves access to genuine, affordable medicines. His
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

      {/* Legal & Compliance Documents */}
      <section className="bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Registered & Compliant
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              M/S Iman Pharmacy operates under strict legal and professional guidelines. We are fully registered
              with the relevant authorities, ensuring that our operations meet the highest standards of transparency, safety, and legality.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                Verified Business Entity
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trade License */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="aspect-[3/4] p-4 bg-gray-100 dark:bg-slate-900 flex-shrink-0 cursor-pointer group select-none"
                onClick={() => openImage(tradeLicense)}
                onContextMenu={(e) => e.preventDefault()}
              >
                <img src={tradeLicense} alt="Trade License" className="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:scale-[1.02] pointer-events-none" draggable="false" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-center text-center border-t border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Trade License</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Official business registration authorized by the local government.</p>
              </div>
            </div>

            {/* Drug License */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="aspect-[3/4] p-4 bg-gray-100 dark:bg-slate-900 flex-shrink-0 cursor-pointer group select-none"
                onClick={() => openImage(drugLicense)}
                onContextMenu={(e) => e.preventDefault()}
              >
                <img src={drugLicense} alt="Drug License" className="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:scale-[1.02] pointer-events-none" draggable="false" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-center text-center border-t border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Drug License</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Authorized by the Directorate General of Drug Administration (DGDA).</p>
              </div>
            </div>

            {/* PCB Certificate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="aspect-[3/4] p-4 bg-gray-100 dark:bg-slate-900 flex-shrink-0 cursor-pointer group select-none"
                onClick={() => openImage(pcbCertificate)}
                onContextMenu={(e) => e.preventDefault()}
              >
                <img src={pcbCertificate} alt="PCB Certificate" className="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:scale-[1.02] pointer-events-none" draggable="false" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-center text-center border-t border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">PCB Certificate</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Registered with the Pharmacy Council of Bangladesh (PCB).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
