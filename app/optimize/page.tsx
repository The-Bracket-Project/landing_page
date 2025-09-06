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
                From helping someone find friends or build lasting relationships, to matching with an account manager or financial broker, to creating high-performing professional teams, the Compatibility OS powers meaningful efficient context specific connections across various personal, social, and organizational settings. With seamless integration in a diverse array of environments from consumer apps to enterprise platforms the Compatibility OS serves as the AI engine for human connection.               </p>
              <p>
                Built on top of the Compatibility OS, our Enterprise Optimization Suite leverages our proprietary models to optimize employee and customer acquisition and retention. From placing candidates in their ideal environments to re-assembling teams to boost performance, or even matching sales strategies, product features, or AI agents to customers, based on their unique personality profile  the suite  helps organizations streamline hiring, reduce churn, and drive both workforce stability and long-term customer relationships.
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

