import Container from "../../components/ui/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
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
              Identify Compatibility
            </h1>
            <p className="mt-3 text-lg" style={{ color: 'var(--brand-text)' }}>
              OCEAN Quantification Mechanism to encode users into stable, interpretable trait vectors.
            </p>
          </div>
          <div className="justify-self-center">
            <Image
              src="/placeholder.jpg"
              alt="Quantification graphic placeholder"
              width={560}
              height={360}
              className="rounded-xl object-cover shadow-md"
            />
          </div>
        </div>

        {/* For Developers / Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border p-5" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
            <h3 className="font-semibold" style={{ color: 'var(--brand-text)' }}>For Developers</h3>
            <p className="mt-1">API to encode users into stable trait vectors</p>
          </div>
          <div className="rounded-xl border p-5" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
            <h3 className="font-semibold" style={{ color: 'var(--brand-text)' }}>For Platforms</h3>
            <p className="mt-1">Real-time profiles from in-app signals for personalization</p>
          </div>
        </div>

        {/* Top Line Overview */}
        <section className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--brand-k)' }}>Top Line Overview</h2>
          <p className="mt-3" style={{ color: 'var(--brand-text)' }}>
            The Quantification algorithm assigns traits and creates an entirely new layer of visibility into a person’s profile:
            using the research-backed OCEAN model, we surface a profile with interpretable insights.
          </p>
        </section>

        {/* API */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-text)' }}>API: Unique Models</h3>
            <p className="mt-2">
              An API system that assigns traits according to five standards outlined by the OCEAN model: users are not put into boxes,
              but instead given a custom description of their personality and profile.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-text)' }}>API: Universal Visibility</h3>
            <p className="mt-2">
              The traits identified and assigned by Bracket’s API provide key insights that assist in any context.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="py-12 text-center">
          <Button asChild className="rounded-full px-6 py-3">
            {/* @ts-ignore */}
            <a href="/contactus">Request a Demo</a>
          </Button>
        </div>
      </Container>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
  );
}
