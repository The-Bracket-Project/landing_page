import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Image from "next/image";

export default function OptimizePage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero with focused content only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>
              Compatibility OS
            </h1>
            <div className="mt-4 space-y-4 text-lg" style={{ color: 'var(--brand-text)' }}>
              <p>
                From helping someone find friends or build lasting relationships, to matching with an account manager or financial broker, to creating high-performing professional teams, the Compatibility OS powers meaningful and efficient connections across personal, social, and organizational contexts. It can be seamlessly integrated into any environment, from consumer apps to enterprise platforms, making it the AI engine for human connection.
              </p>
              <p>
                Built on top of the Compatibility OS, the Organization Optimization Suite enhances organizational productivity by strengthening structure and unlocking hidden synergies within the existing talent pool. It not only streamlines hiring but also helps companies reconfigure teams to maximize effectiveness and cultural alignment.
              </p>
            </div>
            <div className="py-8">
              <Button asChild className="rounded-full px-6 py-3">
                <a href="/contactus">Book a Demo</a>
              </Button>
            </div>
          </div>
          <div className="justify-self-center">
            <Image
              src="/quantify.png"
              alt="Compatibility OS"
              width={560}
              height={360}
              className="object-contain"
            />
          </div>
        </div>
      </Container>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
  );
}

