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
                From placing the right candidate or assembling a team that actually ships, to matching a customer with the right plan, feature, or account manager, the Compatibility OS powers meaningful, efficient connections across hiring, team design, onboarding, and customer journeys. It can be integrated into any environment, from consumer apps to enterprise platforms, so the same understanding of fit runs through your stack, making it the engine for human connection and retention.
              </p>
              <p>
                Built on the Compatibility OS, <b>Bracket &</b> turns scores into action: build stronger teams, reshuffle when needed, and ramp new hires; we are currently building <b>Bracket +</b> to point customers to the right product, keep them longer, and grow accounts.
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

