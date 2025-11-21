import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  after?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, align = 'left', after, className = '' }: PageHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div className={`mb-8 ${className}`.trim()}>
      <h1
        className={`text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ${
          isCenter ? 'text-center' : ''
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`${isCenter ? 'text-center' : ''} text-gray-600 dark:text-gray-400`}
        >
          {subtitle}
        </p>
      )}
      {after}
    </div>
  );
}
