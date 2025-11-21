import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  className?: string;
  padding?: boolean;
}

export function PageContainer({
  children,
  maxWidth = '7xl',
  className = '',
  padding = true
}: PageContainerProps) {
  return (
    <div className={padding ? 'py-12 px-4' : ''}>
      <div className={`max-w-${maxWidth} mx-auto ${className}`.trim()}>{children}</div>
    </div>
  );
}
