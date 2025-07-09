import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

function Navbar() {
  return (
    <div className="px-4 md:px-10 lg:px-10 py-5">
        <div className="flex flex-row justify-between items-center h-16">
            <div className="flex items-center gap-2">
                <h1 className={`text-xl font-semibold ${poppins.className} hidden lg:block md:block`} style={{ color: '#15494A'}}>Bracket AI</h1>
                <Image src="/logo.PNG" alt="Bracket AI" width={50} height={50} />
            </div>
            <div className={`flex flex-row items-center font-medium gap-3 md:gap-5 lg:gap-5 ${poppins.className}`} style={{ color: "#15494A"}}>
                <h1>About</h1>
                <h1>Contact</h1>
                <h1>Dashboard</h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar