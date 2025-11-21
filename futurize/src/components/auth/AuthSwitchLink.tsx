import { Link } from 'react-router-dom';

interface AuthSwitchLinkProps {
  to: string;
  label: string; // texto do botão
}

export function AuthSwitchLink({ to, label }: AuthSwitchLinkProps) {
  return (
    <div className="mt-6">
      <Link
        to={to}
        className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
      >
        {label}
      </Link>
    </div>
  );
}
