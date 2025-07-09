import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const images = [ "/loneliness.jpg", "/cash.jpg", "/earth.jpg" ]

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-10 pb-15 px-10">
        <p className={`text-4xl md:text-5xl lg:text-7xl text-center font-semibold poppins`} >The AI Engine For Human Compatibility</p>
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

      <div className="flex gap-1 flex-col items-center justify-center pb-25">
        {
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full  md:h-110 lg:h-110 md:w-220 lg:w-220 w-full">
              <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center h-full">
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="px-10 flex flex-col gap-4 justify-center items-start">
                        <p className="text-3xl font-bold">A Universal (And Worsening) Problem</p>
                        <p className="text-xl">Loneliness is a universal problem that affects millions of people around the world. It is a complex issue that can be caused by a variety of factors, including social isolation, lack of meaningful relationships, and a sense of disconnection from others.</p>
                      </div>
                      </div>
                    <div className='w-full h-full rounded-3xl overflow-hidden'>
                      <img src={images[index]} alt={images[index].slice(0, -4)} className="w-full h-full object-cover" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-full h-full rounded-3xl overflow-hidden'>
                      <img src={images[index]} alt={images[index].slice(0, -4)} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="px-10 flex flex-col gap-4 justify-center items-start">
                        <p className="text-3xl font-bold">A Universal (And Worsening) Problem</p>
                        <p className="text-xl">Loneliness is a universal problem that affects millions of people around the world. It is a complex issue that can be caused by a variety of factors, including social isolation, lack of meaningful relationships, and a sense of disconnection from others.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        }
      </div>

      <div className="flex flex-col h-100 w-full border-t border-gray-200 items-center justify-center gap-5"> 
        <div className="w-4/5 mx-auto justify-center items-center"><h1 className="text-center text-5xl font-bold">Whatever You Are Connecting, We Make It Compatible.</h1></div>
        <div className="max-w-100 mx-auto justify-center items-center"><p className="text-center text-3xl">Compatibility is not an afterthought anymore. <span className="font-bold text-3xl font-extrabold">We're Building It</span></p></div>
      </div>

      <Footer />
    </div>
  );
}
