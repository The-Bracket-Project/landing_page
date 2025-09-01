import React from 'react';

export default function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={[
      'rounded-xl shadow-sm ring-1',
      className
    ].join(' ')}
    style={{ background: 'white', borderColor: 'rgba(33,61,97,0.08)' }}
    {...props}
    >
      {children}
    </div>
  );
}

