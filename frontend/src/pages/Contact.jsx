import { Phone, MessageCircle, Mail, MapPin, Clock, Navigation } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+880 1XXX-XXXXXX',
    action: 'tel:+8801XXXXXXXXX',
    actionLabel: 'Call Now',
    description: 'Call us directly for inquiries or medicine availability.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+880 1XXX-XXXXXX',
    action: 'https://wa.me/8801XXXXXXXXX',
    actionLabel: 'Chat on WhatsApp',
    description: 'Send your prescriptions or ask questions via WhatsApp.',
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@imanpharmacy.com',
    action: 'mailto:info@imanpharmacy.com',
    actionLabel: 'Send Email',
    description: 'Email us for business inquiries or partnership proposals.',
  },
];

function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/30 mb-6">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                Contact & Location
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Get in <span className="text-cyan-600 dark:text-cyan-400">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Have questions about medicines or need pharmaceutical advice? Reach out to us — we're
              always happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                  {method.value}
                </p>
                <a
                  href={method.action}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-600 text-white text-sm font-medium transition-colors duration-200"
                >
                  {method.actionLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address & Map */}
      <section id="location" className="bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Address Details */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Our <span className="text-cyan-600 dark:text-cyan-400">Location</span>
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Address</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Sirajganj Road, Ullapara, Sirajganj
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Opening Hours
                    </h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Saturday – Thursday: 8:00 AM – 10:00 PM</p>
                      <p>Friday: 3:00 PM – 10:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Directions
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Located on the main Sirajganj Road in Ullapara town center. Easily accessible
                      from the bus stand and market area.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[350px] rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <MapPin className="w-12 h-12 mb-3" />
                  <span className="text-sm font-medium mb-1">Google Maps Embed</span>
                  <span className="text-xs text-center max-w-xs">
                    Replace this placeholder with a Google Maps iframe embed of Sirajganj Road,
                    Ullapara, Sirajganj
                  </span>
                  <div className="mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700">
                    <code className="text-xs text-slate-500 dark:text-slate-400">
                      {'<iframe src="maps.google.com/..." />'}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
