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
  const hideProductsTimeoutRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [menuTop, setMenuTop] = useState<number>(72);

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
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('resize', updateMenuTop);
      window.removeEventListener('orientationchange', updateMenuTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            ? "fixed top-0 left-0 right-0 z-[80] shadow-lg transform translate-y-0 bg-white/85 backdrop-blur-lg border-b" 
            : "relative bg-white/70 backdrop-blur-lg"
        }`}
        style={isScrolled ? {
          borderColor: 'rgba(33,61,97,0.12)'
        } : {}}
        ref={navRef}
      >
        <div className="flex flex-row justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex item-center gap-2">
              <h1
                className={`text-xl font-semibold ${dmSans.className} hidden lg:block md:block transition-all duration-400 ${
                  isScrolled ? "transform scale-95" : ""
                }`}
                style={isScrolled ? { color: 'var(--brand-k)' } : { color: 'var(--brand-k)' }}
              >
                Bracket AI
              </h1>
            </Link>
            <Image 
              src="/logo.PNG" 
              alt="Bracket AI" 
              width={50} 
              height={50}
              className={`transition-all duration-300 ${
                isScrolled ? "transform scale-90" : ""
              }`}
            />
          </div>
          <div
            className={`relative flex flex-row items-center font-medium gap-3 md:gap-5 lg:gap-5 ${dmSans.className}`}
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
                      {/* Column: Identify Compatibility */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--brand-k)' }}>Identify Compatibility</p>
                          <h3 className="text-lg md:text-xl font-semibold mt-1" style={{ color: 'var(--brand-text)' }}>OCEAN Quantification</h3>
                          <p className="text-sm mt-1 text-gray-600">Encode users into stable, interpretable trait vectors for personalization and insights.</p>
                        </div>
                        <div className="flex flex-col divide-y divide-gray-100 rounded-lg overflow-hidden">
                          <a href="/products/identify" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Overview</div>
                            <div className="text-xs text-gray-600">How quantification works and where to use it</div>
                          </a>
                          <a href="/products/identify" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Developer API</div>
                            <div className="text-xs text-gray-600">Assign traits via API with simple requests</div>
                          </a>
                          <a href="/products/identify" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Real‑time Signals</div>
                            <div className="text-xs text-gray-600">Build profiles from in‑app behavior</div>
                          </a>
                        </div>
                      </div>

                      {/* Column: Optimize Compatibility */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--brand-k)' }}>Optimize Compatibility</p>
                          <h3 className="text-lg md:text-xl font-semibold mt-1" style={{ color: 'var(--brand-text)' }}>Compatibility OS</h3>
                          <p className="text-sm mt-1 text-gray-600">Operationalize compatibility to match, route, and organize people and teams.</p>
                        </div>
                        <div className="flex flex-col divide-y divide-gray-100 rounded-lg overflow-hidden">
                          <a href="/products/optimize" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Overview</div>
                            <div className="text-xs text-gray-600">From quantification to real‑world routing</div>
                          </a>
                          <a href="/products/optimize" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Hiring Suite</div>
                            <div className="text-xs text-gray-600">Instant visibility into candidate–org fit</div>
                          </a>
                          <a href="/products/optimize" className="px-4 py-3 hover:bg-black/5 transition-colors">
                            <div className="font-medium">Use Cases</div>
                            <div className="text-xs text-gray-600">Sales, events, healthcare, mentorship, and more</div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-3" style={{ background: 'rgba(33,61,97,0.04)' }}>
                      <span className="text-xs" style={{ color: 'var(--brand-text)' }}>Explore the full details and examples</span>
                      <Link href="/products" className="text-sm font-semibold hover:opacity-80" style={{ color: 'var(--brand-k)' }}>
                        View Products →
                      </Link>
                    </div>
                  </div>,
                  document.body
                )
              )}
            </div>
            <Link 
              href="/" 
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>About</h1>
            </Link>
            <Link
              href="/contactus"
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>Contact</h1>
            </Link>
            <Link
              href="https://dashboard.thebracket.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>Dashboard</h1>
            </Link>
            <Link
              href="/showcase"
              className="px-5 py-2 rounded-full text-white font-semibold transition-all duration-200 hover:transform hover:scale-105 shadow-md hover:shadow-lg"
              style={{ background: 'var(--brand-accent)' }}
            >
              <h1 className="text-sm">Demo</h1>
            </Link>
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
    </>
  );
}

export default Navbar;
