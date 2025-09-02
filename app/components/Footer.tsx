import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: 'rgba(33,61,97,0.12)', color: 'var(--brand-text)' }}>
      <div className="flex flex-row items-start justify-between gap-6">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Image src="/logo.PNG" alt="Bracket AI" width={40} height={40} />
          <span className="font-semibold" style={{ color: 'var(--brand-k)' }}>Bracket AI</span>
        </div>

        {/* Navigation and Social Links */}
        <div className="flex-1 flex flex-col items-end space-y-4 min-w-[240px]">
          {/* Navigation Links */}
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/contactus" className="hover:opacity-80">
                Contact Us
              </a>
            </li>
          </ul>
          
          {/* Social Media Links */}
          <div className="flex space-x-3 text-[var(--brand-k)]">
            <a 
              href="https://www.linkedin.com/company/bracket-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-colors duration-200"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 text-center text-sm" style={{ color: 'var(--brand-b)' }}>
        <p>&copy; 2024 Bracket IO. All rights reserved.</p>
      </div>
    </footer>
  );
}
