'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before the animation starts once visible */
  delayMs?: number;
  as?: React.ElementType;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** Root margin to trigger a bit earlier/later */
  rootMargin?: string;
};

export default function Reveal({
  children,
  className,
  delayMs = 0,
  as: ElementTag = 'div',
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: RevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Guard for environments without IntersectionObserver
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current as Element | null;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const classes = [
    className || '',
    'reveal',
    isVisible ? 'reveal-visible' : '',
  ]
    .join(' ')
    .trim();

  const style: React.CSSProperties = delayMs
    ? { transitionDelay: `${Math.max(0, delayMs)}ms` }
    : {};

  return (
    <ElementTag ref={containerRef as React.RefObject<HTMLElement>} className={classes} style={style}>
      {children}
    </ElementTag>
  );
}


