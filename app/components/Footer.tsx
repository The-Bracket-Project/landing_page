import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-white py-10 justify-between border-t border-gray-800">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Image
            src="/logo.PNG"
            alt="Bracket AI"
            width={64}
            height={64}
          />
        </div>

        {/* Navigation and Social Links */}
        <div className="text-end flex flex-col items-end space-y-4">
          {/* Navigation Links */}
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <a href="/contactus" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            {/* <li>
              <Link href="/not-found" className="hover:text-gray-300">
                Careers
              </Link>
            </li> */}
          </ul>
          
          {/* Social Media Links */}
          <div className="flex space-x-3">
            <a 
              href="https://www.linkedin.com/company/bracket-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-200"
              aria-label="Follow us on LinkedIn"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 text-center">
        <p>&copy; 2024 Bracket IO. All rights reserved.</p>
      </div>
    </footer>
  );
}
