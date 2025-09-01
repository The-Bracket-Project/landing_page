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
                href="/contactus"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white shadow"
                style={{ background: 'var(--brand-accent)' }}
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-10 md:gap-1 lg:gap-1 flex-col items-center justify-center pb-25">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-72 md:min-h-96 lg:min-h-96 gap-5 md:gap-1">
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 lg:order-1">
                <Reveal className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start" style={{ color: 'var(--brand-text)' }}>
                  <p className="text-2xl md:text-3xl font-bold">
                    An Expensive And Worsening Problem
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      $3.4B
                    </span>{" "}
                    was spent globally by companies on psychometric testing for employees.
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      80%
                    </span>{" "}
                    of Gen Z report feeling loneliness compared to 45% of Baby
                    Boomers (Harlow, 2021)
                  </p>
                </Reveal>
              </div>
              <Reveal className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-72 lg:h-80 rounded-3xl overflow-hidden order-1 md:order-2 lg:order-2">
                <Image
                  src="/loneliness.jpg"
                  alt="loneliness"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </Reveal>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-72 md:min-h-96 lg:min-h-96 gap-5 md:gap-1">
              <Reveal className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-72 lg:h-80 rounded-3xl overflow-hidden order-1">
                <Image
                  src="/cash.jpg"
                  alt="cash"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </Reveal>
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2">
                <Reveal className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start" delayMs={50} style={{ color: 'var(--brand-text)' }}>
                  <p className="text-2xl md:text-3xl font-bold">
                    How It Impacts Businesses
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      $900B
                    </span>{" "}
                    is lost by companies each year due to employee turnover (Business Insider, 2024)
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      53%
                    </span>{" "}
                    of employees would trade compensation for meaningful
                    workplace relationships (BetterUp Labs, 2022)
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            {/* Full-width heading */}
            <div className="px-4 md:px-10 mb-6">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--brand-k)' }}>
                  We&apos;re building the infrastructure for better human connection.
                </h2>
              </Reveal>
            </div>
            {/* Two-column: text left, image right */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-8">
              <div className="order-2 md:order-1">
                <Reveal className="px-4 md:px-10" delayMs={100} style={{ color: 'var(--brand-text)' }}>
                  <p className="text-lg md:text-xl">
                    Built on established psychological insights and AI technology, our system plugs into existing platforms to reduce friction, surface real compatibility, and drive better outcomes at scale. Already at <span className="font-bold text-xl md:text-2xl">83.9%</span> accuracy, and learning fast.
                  </p>
                </Reveal>
              </div>
              <Reveal className="order-1 md:order-2 aspect-square md:aspect-auto md:h-72 lg:h-80 rounded-3xl overflow-hidden">
                <Image
                  src="/earth.jpg"
                  alt="earth"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </Reveal>
            </div>
          </div>
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
        </div>

        <Footer />
      </div>
    </div>
  );
}
