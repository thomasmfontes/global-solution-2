import type { ReactNode } from 'react';

interface AuthFormCardProps {
  children: ReactNode;
}

export function AuthFormCard({ children }: AuthFormCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      {children}
    </div>
  );
}
