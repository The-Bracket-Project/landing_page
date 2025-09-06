import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Image from "next/image";

export default function IdentifyPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>
              Personality Quantification
            </h1>
            <p className="mt-3 text-lg" style={{ color: 'var(--brand-text)' }}>
              Our personality quantification mechanism uses customised Large Language Models to transform personality assessments into a seamless experience, delivering detailed trait-based profiles tailored specifically to a given individual. By reimagining the traditionally static OCEAN personality exam as an intuitive, dynamic process, Bracket AI delivers unprecedented efficiency while maintaining exceptional accuracy (achieving roughly 93% reliability) in capturing individual personality traits.
            </p>
          </div>
          <div className="justify-self-center">
            <Image
              src="/identify.png"
              alt="Personality Quantification"
              width={560}
              height={360}
              className="object-contain"
            />
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

