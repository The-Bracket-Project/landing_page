import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import AutoPlayVideo from "./components/AutoPlayVideo";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-5 gap-1 md:gap-12 items-center content-start md:content-center min-h-[calc(100vh-96px)] pt-8 md:pt-4">
          {/* Left: animation */}
          <div className="col-span-5 md:col-span-2 flex justify-center md:justify-start order-1 md:order-1 mb-12 md:mb-0">
            <div className="w-[92vw] h-[52vw] sm:w-[360px] sm:h-[205px] md:w-[520px] md:h-[320px] rounded-xl overflow-hidden">
              <AutoPlayVideo
                src="/NodeGridScene_noaudio.mp4"
                className="w-full h-full object-cover"
                style={{ outline: 'none' }}
              />
            </div>
          </div>
          {/* Right: headline and CTA */}
          <div className="col-span-5 md:col-span-3 flex flex-col items-center md:items-start gap-2 md:gap-6 order-2 md:order-2">
            <Reveal>
              <p className="text-4xl md:text-6xl lg:text-7xl font-semibold poppins text-center md:text-left" style={{ color: 'var(--brand-k)' }}>
                The AI Engine for Human Compatibility
              </p>
            </Reveal>
            <div className="pt-2 md:pt-2 w-full flex justify-center md:justify-start">
              <a
                href="#main-content"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>

        <div id="main-content" className="flex gap-10 md:gap-1 lg:gap-1 flex-col items-center justify-center pb-25">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-72 md:min-h-96 lg:min-h-96 gap-5 md:gap-1">
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 lg:order-1">
                <Reveal className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start" style={{ color: 'var(--brand-text)' }}>
                  <p className="text-2xl md:text-3xl font-bold">Personality Quantification</p>
                  <p className="text-lg md:text-xl">
                    OCEAN Quantification Mechanism to encode users into stable, interpretable trait vectors.
                    <br />
                    <span className="text-base">Only 10 questions — takes under 300 seconds.</span>
                  </p>
                  <div className="pt-2">
                    <a
                      href="/products/identify"
                      className="inline-flex items-center justify-center px-6 py-2 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
                    >
                      Discover More
                    </a>
                  </div>
                </Reveal>
              </div>
              <Reveal className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-90 lg:h-110 rounded-3xl overflow-hidden order-1 md:order-2 lg:order-2">
                <div className="relative w-full h-full">
                  <Image
                    src="/loneliness.png"
                    alt="Loneliness"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 100vw, 200vw"
                    priority={false}
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-72 md:min-h-96 lg:min-h-96 gap-5 md:gap-1">
              <Reveal className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-72 lg:h-80 rounded-3xl overflow-hidden order-1">
                <div className="relative w-full h-full">
                  <Image
                    src="/cash.png"
                    alt="Cost / Turnover"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
              </Reveal>
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2">
                <Reveal className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start" delayMs={50} style={{ color: 'var(--brand-text)' }}>
                  <p className="text-2xl md:text-3xl font-bold">Compatibility OS</p>
                  <p className="text-lg md:text-xl">
                    Bracket’s Compatibility Operating System is designed to connect people in ways that truly matter. By combining our advanced Personality Quantification mechanism with a powerful Graph Neural Network, the system predicts context-specific compatibility with remarkable accuracy.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/products/optimize"
                      className="inline-flex items-center justify-center px-6 py-2 rounded-full text-white shadow bg-[var(--brand-accent)] hover:brightness-110"
                    >
                      Discover More
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Removed the final text and earth video section to keep the page concise */}
        </div>

        <div className="flex flex-col h-140 w-full border-t border-gray-200 items-center justify-center gap-5" style={{ color: 'var(--brand-text)' }}>
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
    </div>
  );
}
