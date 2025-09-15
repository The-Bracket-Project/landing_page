"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import AutoPlayVideo from "./components/AutoPlayVideo";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <div className="page-root">
      <Navbar />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="hero grid grid-cols-5 gap-1 md:gap-12 items-center content-start md:content-center">
          {/* Left: animation */}
          <div className="col-span-5 md:col-span-2 flex justify-center md:justify-start order-1 md:order-1 mb-12 md:mb-0">
            <div className="w-[92vw] h-[52vw] sm:w-[360px] sm:h-[205px] md:w-[520px] md:h-[320px] rounded-xl overflow-hidden">
              <AutoPlayVideo
                src="/NodeGridScene_new.mp4"
                className="w-full h-full object-cover"
                style={{ outline: 'none' }}
                holdOnEndMs={2500}
              />
            </div>
          </div>
          {/* Right: headline and CTA */}
          <div className="col-span-5 md:col-span-3 flex flex-col items-center md:items-start gap-2 md:gap-6 order-2 md:order-2">
            <Reveal>
              <p className="hero-title text-4xl md:text-6xl lg:text-7xl font-semibold poppins text-center md:text-left" style={{ color: 'var(--brand-k)' }}>
                The AI Engine for Human Compatibility
              </p>
            </Reveal>
            <div className="pt-2 md:pt-2 w-full flex justify-center md:justify-start">
              <a
                href="#main-content"
                className="cta inline-flex items-center justify-center px-8 py-3 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
              >
                Discover More
              </a>
            </div>
          </div>
            {/* Eyebrow peek from Products section (anchor to hero bottom) */}
            <div className="hero-eyebrow">
              <div className="hero-eyebrow__bar" />
            </div>
          </div>
        </div>

        <section id="main-content" className="section section--first section--products w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="poppins text-4xl md:text-5xl font-semibold text-center mb-8 md:mb-12" style={{ color: 'var(--brand-k)' }}>
                Products
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Poseidon Card */}
              <Reveal className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6 md:p-8 flex flex-col">
                <div className="relative w-full h-44 md:h-56 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src="/loneliness.png"
                    alt="Bracket Poseidon"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Bracket Poseidon</h3>
                <p className="text-base md:text-lg mb-5" style={{ color: 'var(--brand-text)' }}>
                  Our proprietary personality system built on the OCEAN model, encoding users into stable, interpretable trait vectors with unparalleled accuracy.
                </p>
                <div>
                  <a
                    href="/poseidon"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
                  >
                    Discover More
                  </a>
                </div>
              </Reveal>

              {/* Indra Card */}
              <Reveal className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6 md:p-8 flex flex-col" delayMs={50}>
                <div className="relative w-full h-44 md:h-56 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src="/cash.png"
                    alt="Bracket Indra"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Bracket Indra</h3>
                <p className="text-base md:text-lg mb-5" style={{ color: 'var(--brand-text)' }}>
                  Bracket Indra deciphers context‑specific compatibility by combining Poseidon with a powerful Graph Neural Network. It supports interpersonal and organizational use cases without adding process overhead.
                </p>
                <div>
                  <a
                    href="/indra"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
                  >
                    Discover More
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="section flex flex-col h-140 w-full border-t border-gray-200 items-center justify-center gap-5" style={{ color: 'var(--brand-text)' }}>
          <Reveal className="w-4/5 mx-auto justify-center items-center">
            <h1 className="text-center text-5xl font-bold">
              Whatever You Are Connecting, We Make It Compatible.
            </h1>
          </Reveal>
          <Reveal className="max-w-100 mx-auto justify-center items-center" delayMs={75}>
            <p className="text-center text-3xl">
              Compatibility is not an afterthought anymore.{" "}
              <span className="font-bold text-3xl">We&apos;re Building It</span>
            </p>
          </Reveal>
          <div className="pt-2">
            <a
              href="/contactus"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
            >
              Request a Demo
            </a>
          </div>
        </div>

        <Footer />
      </div>
  );
}
