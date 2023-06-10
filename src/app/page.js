import Image from 'next/image'
//import and image from public folder
import phone from '/public/iphone-mockup2.png'

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white">


      <div className="h-12 w-full bg-white"></div>
      <div className="h-2/3 w-full bg-[#480C3B] flex px-52">
        <div className="h-full w-3/5 bg-[#480C3B] flex flex-col justify-center mx-5">
          <h1 className="text-white text-7xl font-bold tracking-tighter"><span className='text-5xl'>The</span> Bracket.</h1>
          <div className='mt-8'>
            <p className="text-white text-2xl">Connect with other college students in new and exciting ways on our social platform</p>
          </div>
        </div>
        <div className="h-full w-2/5 bg-[#480C3B] flex flex-col justify-center">
          <div className='mt-60 ml-24'>
            <Image src={phone} alt="Picture of the author" width={310}/>
          </div>
        </div>


        
        

      </div>
    </main>
  )
}
