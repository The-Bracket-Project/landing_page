import Image from 'next/image'
//import and image from public folder
import phone from '/public/iphone-mockup2.png'
import banner1 from '/public/banner1.png'
import banner2 from '/public/banner2.png'
import banner3 from '/public/banner3.png'
import join from '/public/join button.png'

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white">
      <div className="h-12 w-full bg-white"></div>
      <div className="h-2/3 w-full bg-[#480C3B] flex px-52">
        <div className="h-full w-3/5 bg-[#480C3B] flex flex-col justify-center mx-5">
          <h1 className="text-white text-8xl font-bold tracking-tighter"><span className='text-6xl font-bold'>The</span> <span className='font-bold'>Bracket.</span></h1>
          <div className='mt-16'>
            <p className="text-white text-xl">Connect with other college students in <span className='font-bold'>new</span> and <span className='font-bold'>exciting</span> ways on our social platform</p>
          </div>
          <div className='mt-16 flex items-center'>
        <p className="text-white text-xl font-bold">Interested in joining the team?</p>
        <div className="ml-4">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeNnr_NntS9ywV8JF3ZIZc7oya40HtsVLlQ_LSxNGNQkILHzQ/viewform" target="_blank" rel="noopener noreferrer">
            <button className="styles.button">
              <Image src={join} alt="Join Now" width={105} height={105} />
            </button>
          </a>
        </div>
      </div>
        </div>
        <div className="h-5/6 w-2/5 bg-[#480C3B] flex flex-col justify-center">
          <div className='mt-60 ml-24'>
            <Image src={phone} alt="Picture of the author" width={310}/>
          </div> 
        </div>
      </div>
      <div className="flex justify-start mt-20 ml-52">
        <div className='mr-32'>
          <Image src={banner1} alt="Picture of the author" width={150}/>
        </div>
        <div className='mr-32'>
          <Image src={banner2} alt="Picture of the author" width={150}/>
        </div>
        <div>
          <Image src={banner3} alt="Picture of the author" width={150}/>
        </div>
      </div>
    </main>
  );
}
