interface AuthHeaderProps {
  icon: 'login' | 'register';
  title: string;
  subtitle?: string;
}

export function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-primary-600 dark:bg-primary-500 p-4 rounded-2xl shadow-lg">
          {icon === 'login' ? (
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          )}
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}
