import Container from "../components/ui/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>Products</h1>
          <p className="mt-3 text-lg" style={{ color: 'var(--brand-text)' }}>
            This page describes the Products dropdown and links to the two detailed product pages.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-6 md:p-8 hover:shadow-lg transition-shadow" style={{ borderColor: 'rgba(33,61,97,0.12)', background: 'rgba(255,255,255,0.75)' }}>
            <div className="flex items-start gap-4">
              <Image src="/placeholder.jpg" alt="Personality Quantification" width={120} height={120} className="rounded-md object-cover" />
              <div>
                <h2 className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--brand-k)' }}>Personality Quantification</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--brand-text)' }}>OCEAN Quantification Mechanism to encode users into stable, interpretable trait vectors.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="px-2 py-1 rounded bg-black/5">Developers</span>
              <span className="px-2 py-1 rounded bg-black/5">Platforms</span>
            </div>
            <div className="mt-6">
              <Link href="/products/identify" className="inline-block">
                <Button className="rounded-full px-5">Explore Personality Quantification</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-6 md:p-8 hover:shadow-lg transition-shadow" style={{ borderColor: 'rgba(33,61,97,0.12)', background: 'rgba(255,255,255,0.75)' }}>
            <div className="flex items-start gap-4">
              <Image src="/placeholder.jpg" alt="Compatibility OS" width={120} height={120} className="rounded-md object-cover" />
              <div>
                <h2 className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--brand-k)' }}>Compatibility OS</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--brand-text)' }}>An operating system to route, organize, and match people and teams.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="px-2 py-1 rounded bg-black/5">Hiring Suite</span>
              <span className="px-2 py-1 rounded bg-black/5">Use Cases</span>
            </div>
            <div className="mt-6">
              <Link href="/products/optimize" className="inline-block">
                <Button className="rounded-full px-5">Explore Compatibility OS</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Future use cases placeholder */}
        <section className="mt-12 mb-12">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-k)' }}>Future Use Cases</h3>
          <p className="mt-1" style={{ color: 'var(--brand-text)' }}>We’re actively exploring additional verticals where trait visibility and compatibility optimization deliver immediate ROI.</p>
        </section>

        {/* CTA */}
        <div className="py-8 text-center">
          <Button asChild className="rounded-full px-6 py-3">
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
