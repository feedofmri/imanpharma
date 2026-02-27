function FeatureCard({ icon: Icon, title, description, accent = false }) {
  return (
    <div
      className={`relative p-6 rounded-xl border transition-shadow duration-200 hover:shadow-lg ${
        accent
          ? 'border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20'
          : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          accent
            ? 'bg-cyan-600 dark:bg-cyan-500'
            : 'bg-gray-100 dark:bg-slate-700'
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            accent ? 'text-white' : 'text-cyan-600 dark:text-cyan-400'
          }`}
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
