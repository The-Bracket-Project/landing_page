import React from 'react';

export default function Container({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(' ')} {...props}>
      {children}
    </div>
  );
}

