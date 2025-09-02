"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const hideProductsTimeoutRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [menuTop, setMenuTop] = useState<number>(72);
  const lastYRef = useRef<number>(0);

  const clearHideProducts = () => {
    if (hideProductsTimeoutRef.current !== null) {
      window.clearTimeout(hideProductsTimeoutRef.current);
      hideProductsTimeoutRef.current = null;
    }
  };

  const handleProductsEnter = () => {
    clearHideProducts();
    setShowProducts(true);
  };

  const handleProductsLeave = () => {
    clearHideProducts();
    hideProductsTimeoutRef.current = window.setTimeout(() => {
      setShowProducts(false);
    }, 180);
  };

  useEffect(() => {
    setMounted(true);

    const updateMenuTop = () => {
      if (navRef.current) {
        const h = navRef.current.getBoundingClientRect().height || 72;
        setMenuTop(Math.round(h));
      }
    };
    updateMenuTop();
    window.addEventListener('resize', updateMenuTop);
    window.addEventListener('orientationchange', updateMenuTop);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress percentage
      const totalScrollable = documentHeight - windowHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      
      setIsScrolled(scrollTop > 100);
      setScrollProgress(Math.min(progress, 100)); // Cap at 100%

      // Determine scroll direction to auto-hide/show navbar
      const lastY = lastYRef.current || 0;
      const delta = scrollTop - lastY;
      lastYRef.current = scrollTop;

      if (scrollTop < 10) {
        setHideOnScroll(false);
      } else if (delta > 4) {
        setHideOnScroll(true);
      } else if (delta < -4) {
        setHideOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('resize', updateMenuTop);
      window.removeEventListener('orientationchange', updateMenuTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open, close on Escape
  useEffect(() => {
    if (!mounted) return;
    const originalOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen, mounted]);

  return (
    <>
      {/* Placeholder to prevent layout jump when navbar becomes fixed */}
      {isScrolled && (
        <div className="px-4 md:px-10 lg:px-10 py-3">
          <div className="h-13"></div>
        </div>
      )}
      
      <div 
        className={`px-4 md:px-10 lg:px-10 py-1 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? `fixed top-0 left-0 right-0 z-[80] shadow-lg transform ${hideOnScroll ? '-translate-y-full' : 'translate-y-0'} bg-white/85 backdrop-blur-lg border-b` 
            : "relative bg-white/70 backdrop-blur-lg"
        }`}
        style={isScrolled ? {
          borderColor: 'rgba(33,61,97,0.12)'
        } : {}}
        ref={navRef}
      >
        <div className="flex flex-row justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.PNG" 
              alt="Bracket AI" 
              width={50} 
              height={50}
              className={`transition-all duration-300 ${
                isScrolled ? "transform scale-90" : ""
              }`}
            />
            <h1
              className={`text-xl font-semibold ${dmSans.className} hidden lg:block md:block transition-all duration-400 ${
                isScrolled ? "transform scale-95" : ""
              }`}
              style={isScrolled ? { color: 'var(--brand-k)' } : { color: 'var(--brand-k)' }}
            >
              Bracket AI
            </h1>
          </Link>
          {/* Desktop nav */}
          <div
            className={`relative hidden md:flex flex-row items-center font-medium gap-3 md:gap-5 lg:gap-5 ${dmSans.className}`}
            style={{ color: 'var(--brand-text)' }}
          >
            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
              onFocus={handleProductsEnter}
              onBlur={handleProductsLeave}
            >
              <button type="button" className="hover:opacity-80 transition-colors">Products</button>
              {showProducts && mounted && (
                createPortal(
                  <div
                    className="fixed left-1/2 -translate-x-1/2 z-[99999] w-[92vw] max-w-5xl rounded-2xl shadow-2xl bg-white/90 backdrop-blur-lg"
                    style={{ top: menuTop }}
                    onMouseEnter={handleProductsEnter}
                    onMouseLeave={handleProductsLeave}
                    onFocus={handleProductsEnter}
                    onBlur={handleProductsLeave}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                      {/* Column: Personality Quantification (clickable card) */}
                      <Link href="/products/identify" className="space-y-1 block group">
                        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--brand-k)' }}>Personality Quantification</p>
                        <h3 className="text-lg md:text-xl font-semibold mt-1" style={{ color: 'var(--brand-text)' }}>OCEAN Quantification</h3>
                        <p className="text-sm mt-1 text-gray-600">Encode users into stable, interpretable trait vectors.</p>
                        <span className="inline-block text-sm mt-2 group-hover:underline" style={{ color: 'var(--brand-k)' }}>Open →</span>
                      </Link>

                      {/* Column: Compatibility OS (clickable card) */}
                      <Link href="/products/optimize" className="space-y-1 block group">
                        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--brand-k)' }}>Compatibility OS</p>
                        <h3 className="text-lg md:text-xl font-semibold mt-1" style={{ color: 'var(--brand-text)' }}>Compatibility OS</h3>
                        <p className="text-sm mt-1 text-gray-600">Operationalize compatibility to match, route, and organize.</p>
                        <span className="inline-block text-sm mt-2 group-hover:underline" style={{ color: 'var(--brand-k)' }}>Open →</span>
                      </Link>
                    </div>
                    {/* Footer link removed intentionally (no standalone products index) */}
                  </div>,
                  document.body
                )
              )}
            </div>
            {/* About removed */}
            <Link
              href="/contactus"
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>Contact Us</h1>
            </Link>
            <Link
              href="/password"
              className="px-5 py-2 rounded-full text-white font-semibold transition-all duration-200 hover:transform hover:scale-105 shadow-md hover:shadow-lg"
              style={{ background: 'var(--brand-accent)' }}
            >
              <h1 className="text-sm">Log in</h1>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: 'var(--brand-text)' }}
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        
        {/* Scroll Progress Bar */}
        {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: '#e6e6e6' }}>
          <div 
            className="h-full transition-all duration-300 ease-out shadow-sm"
            style={{ 
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, var(--brand-k), var(--brand-b))'
            }}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
          />
        </div>
        )}
      </div>

      {/* Mobile menu panel */}
      {mounted && mobileOpen && createPortal(
        <div
          className="fixed inset-x-0 z-[99990] md:hidden"
          style={{ top: menuTop }}
        >
          <div className="mx-4 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-lg border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                    <div className="flex items-center gap-2" style={{ color: 'var(--brand-text)' }}>
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.PNG" alt="Bracket AI" width={28} height={28} className="rounded" />
              </Link>
            </div>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/5"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="divide-y divide-black/5" style={{ color: 'var(--brand-text)' }}>
              {/* Products (collapsible on mobile) */}
              <div className="p-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-black/5 transition-colors"
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  aria-expanded={mobileProductsOpen}
                >
                  <span className="text-sm uppercase font-semibold" style={{ color: 'var(--brand-k)' }}>Products</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.417a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {mobileProductsOpen && (
                  <div className="mt-2 flex flex-col">
                    <Link href="/products/identify" className="block px-4 py-3 rounded hover:bg-black/5" onClick={() => setMobileOpen(false)}>
                      <div className="text-sm font-medium" style={{ color: 'var(--brand-text)' }}>Personality Quantification</div>
                      <div className="text-xs text-gray-600">OCEAN quantification for interpretable traits</div>
                    </Link>
                    <Link href="/products/optimize" className="block px-4 py-3 rounded hover:bg-black/5" onClick={() => setMobileOpen(false)}>
                      <div className="text-sm font-medium" style={{ color: 'var(--brand-text)' }}>Compatibility OS</div>
                      <div className="text-xs text-gray-600">Match, route, and organize people and teams</div>
                    </Link>
                  </div>
                )}
              </div>
              {/* About removed */}
              <Link href="/contactus" className="block px-4 py-3 hover:bg-black/5" onClick={() => setMobileOpen(false)}>Contact Us</Link>
              <div className="p-4">
                <Link href="/password" onClick={() => setMobileOpen(false)}>
                  <span className="inline-flex px-5 py-2 rounded-full text-white font-semibold shadow-md" style={{ background: 'var(--brand-accent)' }}>Log in</span>
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Navbar;
