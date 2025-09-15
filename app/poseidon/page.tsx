import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Image from "next/image";

export default function PoseidonPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          {/* Title – first on mobile; top-left on desktop */}
          <div className="order-1 md:order-1 md:col-span-1 md:col-start-1 md:row-start-1">
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>
              Bracket Poseidon
            </h1>
          </div>

          {/* Image – second on mobile; right column (spans rows) on desktop */}
          <div className="order-2 md:order-2 justify-self-center md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2">
            <Image
              src="/identify.png"
              alt="Bracket Poseidon"
              width={560}
              height={360}
              className="object-contain"
            />
          </div>

          {/* Description – third on mobile; bottom-left on desktop */}
          <div className="order-3 md:order-3 md:col-span-1 md:col-start-1 md:row-start-2">
            <p className="mt-3 text-lg" style={{ color: 'var(--brand-text)' }}>
              Bracket Poseidon uses customised Large Language Models to transform personality assessments into a seamless experience, delivering detailed trait‑based profiles tailored to each individual. By reimagining the traditionally static OCEAN personality exam as an intuitive, dynamic process, Bracket AI delivers unprecedented efficiency while maintaining exceptional accuracy (roughly 93% reliability) in capturing individual personality traits.
            </p>
          </div>
        </div>
        {/* CTA */}
        <div className="py-12 text-center">
          <Button asChild className="rounded-full px-6 py-3">
            <a href="/contactus">Book a Demo</a>
          </Button>
        </div>
      </Container>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
  );
}
