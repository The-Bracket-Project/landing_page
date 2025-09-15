import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Image from "next/image";

export default function IndraPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero with focused content only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
          {/* Title – first on mobile; top-left on desktop */}
          <div className="order-1 md:order-1 md:col-span-1 md:col-start-1 md:row-start-1">
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>
              Bracket Indra
            </h1>
          </div>

          {/* Image – under title on mobile; right column (spans rows) on desktop */}
          <div className="order-2 md:order-2 justify-self-center md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2">
            <Image
              src="/quantify.png"
              alt="Bracket Indra"
              width={560}
              height={360}
              className="object-contain"
            />
          </div>

          {/* Text + CTA – third on mobile; bottom-left on desktop */}
          <div className="order-3 md:order-3 md:col-span-1 md:col-start-1 md:row-start-2">
            <div className="mt-4 space-y-4 text-lg" style={{ color: 'var(--brand-text)' }}>
              <p>
                From helping someone find friends or build lasting relationships, to matching with an account manager or financial broker, to creating high‑performing professional teams, Bracket Indra powers meaningful, efficient, context‑specific connections across personal, social, and organizational settings. With seamless integration in a diverse array of environments—from consumer apps to enterprise platforms—Bracket Indra serves as the AI engine for human connection.
              </p>
              <p>
                Built on top of Bracket Indra, our Enterprise Optimization Suite leverages our proprietary models to optimize employee and customer acquisition and retention. From placing candidates in their ideal environments to re‑assembling teams to boost performance, or even matching sales strategies, product features, or AI agents to customers based on their unique personality profile, the suite helps organizations streamline hiring, reduce churn, and drive both workforce stability and long‑term customer relationships.
              </p>
            </div>
            <div className="py-8">
              <Button asChild className="rounded-full px-6 py-3">
                <a href="/contactus">Book a Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
  );
}
