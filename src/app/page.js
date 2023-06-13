import Image from 'next/image'
import phone from '/public/iPhoneMockup.png'
import banner1 from '/public/banner1.png'
import banner2 from '/public/banner2.png'
import banner3 from '/public/banner3.png'
import join from '/public/join button.png'

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white">
      <div className="lg:h-12 w-full bg-white"></div>
        <div className="lg:h-2/3 h-5/6 w-full bg-[#480C3B] flex lg:px-52 px-10">
          <div className="h-full  w-full lg:w-3/5 bg-[#480C3B] flex flex-col justify-center mx-5 lg:mr-20">
            <h1 className="text-white text-7xl font-bold tracking-tighter"><span className='text-5xl font-bold'>The</span> <span className='font-bold'>Bracket.</span></h1>
            <div className='mt-16'>
              <p className="text-white text-xl">Connect with other college students in <span className='font-bold'>new</span> and <span className='font-bold'>exciting</span> ways on our social platform</p>
            </div>
            <div className='mt-16 flex items-center'>
          <p className="text-white text-xl font-bold">Interested in joining the team?</p>
          <div className="ml-4">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeNnr_NntS9ywV8JF3ZIZc7oya40HtsVLlQ_LSxNGNQkILHzQ/viewform" target="_blank" rel="noopener noreferrer">
              <button className="styles.button">
                <div className="button-image">
                  <Image src={join} alt="Join Now" width={105} height={105} />
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
        <div className=" w-2/5 bg-[#480C3B] lg:flex hidden flex-col justify-center">
          <div className='mt-48 mx-auto'>
            <Image src={phone} alt="Picture of the author" width={295}/>
          </div> 
        </div>
      </div>
      <div className="flex justify-center lg:justify-start xl:ml-52 lg:ml-16 lg:mt-10  bg-white py-5 h-1/6">
        <div className='lg:mx-8 mx-2 self-center' >
          <Image  src={banner1} alt="Picture of the author" width={150}/>
        </div>
        <div className='lg:mx-8 mx-2 self-center'>
          <Image src={banner2} alt="Picture of the author" width={150}/>
        </div>
        <div className='lg:mx-8 mx-2 self-center'>
          <Image src={banner3} alt="Picture of the author" width={150}/>
        </div>
      </div>
    </main>
  );
}
