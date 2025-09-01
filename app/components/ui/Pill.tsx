import React from 'react';

export default function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        className,
      ].join(' ')}
      style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'white' }}
    >
      {children}
    </span>
  );
}

