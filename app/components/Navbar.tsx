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
  const hideProductsTimeoutRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [menuTop, setMenuTop] = useState<number>(72);
  // auto-hide removed; navbar is sticky for mobile and web

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

      // no auto-hide; keep sticky
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
      <div 
        className={`sticky top-0 px-4 md:px-10 lg:px-10 py-1 z-[80] transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-lg ${isScrolled ? 'shadow-lg border-b' : ''}`}
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
            className={`relative hidden md:flex flex-row items-center font-medium gap-3 md:gap-5 lg:gap-5 ${dmSans.className} ml-auto`}
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
              <button type="button" className="hover:opacity-80 hover:text-[#33537a] transition-colors inline-flex items-center gap-1">
                <span>Products</span>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="opacity-70">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.417a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8" style={{ fontSize: '12pt' }}>
                      {/* Column: Personality Quantification (clickable card) */}
                      <Link href="/identify" className="space-y-1 block group">
                        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--brand-k)' }}>Personality Quantification</p>
                        <h3 className="text-lg md:text-xl font-semibold mt-1" style={{ color: 'var(--brand-text)' }}>Personality Quantification</h3>
                        <p className="text-sm mt-1 text-gray-600">Encode users into stable, interpretable trait vectors.</p>
                        <span className="inline-block text-sm mt-2 group-hover:underline" style={{ color: 'var(--brand-k)' }}>Open →</span>
                      </Link>

                      {/* Column: Compatibility OS (clickable card) */}
                      <Link href="/optimize" className="space-y-1 block group">
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
              className="hover:opacity-80 hover:text-[#33537a] transition-colors"
            >
              <h1>Contact Us</h1>
            </Link>
            <Link
              href="/password"
              className="px-5 py-2 rounded-full text-white font-semibold shadow-md bg-[var(--brand-accent)] hover:brightness-110"
            >
              <h1 className="text-sm">Log in</h1>
            </Link>
          </div>

          {/* Mobile controls: right-aligned group */}
          <div className="md:hidden flex items-center ml-auto">
            <Link
              href="/password"
              className="px-4 py-2 rounded-full text-white font-semibold shadow bg-[var(--brand-accent)] hover:brightness-110"
            >
              <span className="text-sm">Log in</span>
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 hover:text-[#33537a] transition-colors ml-2"
              onClick={() => setMobileOpen((v) => !v)}
              style={{ color: 'var(--brand-text)' }}
            >
              <span className="sr-only">Toggle menu</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
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
          className="fixed inset-0 z-[99990] md:hidden"
          style={{ top: menuTop }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="mx-4 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-lg border border-black/5 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="divide-y divide-black/5" style={{ color: 'var(--brand-text)' }}>
              {/* Products (collapsible on mobile) matching Contact Us row */}
              <button
                type="button"
                className="block w-full px-4 py-3 hover:bg-black/5 hover:text-[#33537a]"
                onClick={() => setMobileProductsOpen((v) => !v)}
                aria-expanded={mobileProductsOpen}
                style={{ color: 'var(--brand-text)' }}
              >
                <span className="w-full inline-flex items-center justify-between">
                  <span>Products</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.417a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {mobileProductsOpen && (
                <div className="flex flex-col">
                  <Link href="/identify" className="block px-4 py-3 hover:bg-black/5 hover:text-[#33537a]" onClick={() => setMobileOpen(false)}>
                    Personality Quantification
                  </Link>
                  <Link href="/optimize" className="block px-4 py-3 hover:bg-black/5 hover:text-[#33537a]" onClick={() => setMobileOpen(false)}>
                    Compatibility OS
                  </Link>
                </div>
              )}
              {/* About removed */}
              <Link href="/contactus" className="block px-4 py-3 hover:bg-black/5 hover:text-[#33537a]" onClick={() => setMobileOpen(false)}>Contact Us</Link>
              {/* Login button removed from menu; pinned in navbar */}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Navbar;
