import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #ffffff 0%, #205563 5%, #000000 8%, #000000 30%, #8C7A48 50%, #7F8F42 70%, #000000 90%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20 px-10">
          <p
            className={`text-5xl md:text-6xl lg:text-7xl text-center font-semibold poppins`}
          >
            The AI Engine For Human Compatibility
          </p>
        </div>

        <div className="h-130 md:h-140 lg:h-140 flex flex-col items-center justify-center mb-15">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full object-cover rounded-lg"
          >
            <source src="/NodeGridScene.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex gap-10 md:gap-1 lg:gap-1 flex-col items-center justify-center pb-25">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-96 md:min-h-110 lg:min-h-110 gap-5 md:gap-1">
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 lg:order-1">
                <div className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start">
                  <p className="text-2xl md:text-3xl font-bold">
                    A Universal (And Worsening) Problem
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      $1.4 B
                    </span>{" "}
                    was spent by U.S consumers on social discovery apps in 2022,
                    inlcuding platforms aimed at meeting new people and finding
                    events (Sensor Tower, 2023)
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      80%
                    </span>{" "}
                    of Gen Z report feeling loneliness compared to 45% of Baby
                    Boomers (Harlow, 2021)
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-96 lg:h-110 rounded-3xl overflow-hidden order-1 md:order-2 lg:order-2">
                <Image
                  src="/loneliness.jpg"
                  alt="loneliness"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-96 md:min-h-110 lg:min-h-110 gap-5 md:gap-1">
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-96 lg:h-110 rounded-3xl overflow-hidden order-1">
                <Image
                  src="/cash.jpg"
                  alt="cash"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2">
                <div className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start">
                  <p className="text-2xl md:text-3xl font-bold">
                    How It Impacts Businesses
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      $1 T
                    </span>{" "}
                    voluntary employee turnover costs U.S business annually,
                    approximately (Gallup, 2019)
                  </p>
                  <p className="text-lg md:text-xl">
                    <span className="font-semibold text-3xl md:text-4xl">
                      53%
                    </span>{" "}
                    of employees would trade compensation for meaningful
                    workplace relationships (BetterUp Labs, 2022)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center min-h-96 md:min-h-110 lg:min-h-110 gap-5 md:gap-1">
              <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 lg:order-1">
                <div className="px-4 md:px-10 flex flex-col gap-4 justify-center items-start">
                  <p className="text-2xl md:text-3xl font-bold">
                    A Solution That Works
                  </p>
                  <p className="text-lg md:text-xl">
                    We blend established psychological insights and machine
                    learning to create a{" "}
                    <span className="font-bold text-2xl">smarter</span>, more{" "}
                    <span className="font-bold text-2xl">empathetic</span>{" "}
                    approach to compatibility.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                    …with our model already achieving{" "}
                    <span className="font-bold text-3xl md:text-4xl">
                      83.9%
                    </span>{" "}
                    accuracy and{" "}
                    <span className="font-bold text-3xl md:text-4xl">
                      improving every day!
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-96 lg:h-110 rounded-3xl overflow-hidden order-1 md:order-2 lg:order-2">
                <Image
                  src="/earth.jpg"
                  alt="earth"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-140 w-full border-t border-gray-200 items-center justify-center gap-5">
          <div className="w-4/5 mx-auto justify-center items-center">
            <h1 className="text-center text-5xl font-bold">
              Whatever You Are Connecting, We Make It Compatible.
            </h1>
          </div>
          <div className="max-w-100 mx-auto justify-center items-center">
            <p className="text-center text-3xl">
              Compatibility is not an afterthought anymore.{" "}
              <span className="font-bold text-3xl">We&apos;re Building It</span>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
