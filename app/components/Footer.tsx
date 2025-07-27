import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 justify-between border-t border-gray-800">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Image
            src="/logo.PNG"
            alt="Bracket AI"
            width={64}
            height={64}
            className="h-16"
          />
        </div>

        {/* Contact Column */}
        <div className="text-end">
          <ul className="space-y-2">
            <li>
              <Link href="/not-found" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <a href="mailto:hello@bracket.ai" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <li>
              <Link href="/not-found" className="hover:text-gray-300">
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 text-center">
        <p>&copy; 2024 Bracket IO. All rights reserved.</p>
      </div>
    </footer>
  );
}
