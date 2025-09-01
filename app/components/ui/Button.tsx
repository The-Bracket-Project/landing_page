import React from 'react';

type ButtonVariants = 'primary' | 'secondary' | 'ghost';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  asChild?: boolean;
  children?: React.ReactNode;
};

export default function Button({ variant = 'primary', className = '', asChild, children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants: Record<ButtonVariants, string> = {
    primary: 'text-white',
    secondary: 'text-[var(--brand-text)] bg-white border border-black/10 hover:bg-[#f3f6fa]',
    ghost: 'text-[var(--brand-text)] hover:bg-black/5',
  };
  const classes = [base, variants[variant], className].filter(Boolean).join(' ');
  const bg = variant === 'primary' ? { background: 'var(--brand-accent)' } : undefined;

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; style?: React.CSSProperties }>;
    const mergedClassName = [classes, child.props.className].filter(Boolean).join(' ');
    const mergedStyle = { ...(bg || {}), ...(child.props?.style || {}) } as React.CSSProperties;
    return React.cloneElement(child, {
      className: mergedClassName,
      style: mergedStyle,
    });
  }

  return (
    <button className={classes} style={bg} {...props}>
      {children}
    </button>
  );
}
