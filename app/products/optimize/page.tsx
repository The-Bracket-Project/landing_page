import Container from "../../components/ui/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Image from "next/image";

export default function OptimizePage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Container className="py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ color: 'var(--brand-k)' }}>
              Optimize Compatibility
            </h1>
            <p className="mt-3 text-lg" style={{ color: 'var(--brand-text)' }}>
              Quantification + the Compatibility OS to route, match, and organize people and teams.
            </p>
          </div>
          <div className="justify-self-center">
            <Image
              src="/placeholder.jpg"
              alt="Compatibility OS graphic placeholder"
              width={560}
              height={360}
              className="rounded-xl object-cover shadow-md"
            />
          </div>
        </div>

        {/* Top Line Overview */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--brand-k)' }}>Top Line Overview</h2>
          <p className="mt-3" style={{ color: 'var(--brand-text)' }}>
            Our Compatibility engine takes the traits learned from our quantification algorithm and puts them into practice.
            Unlock more efficient organization and matchmaking between all group sizes, from enterprise teams to therapy appointments.
          </p>
        </section>

        {/* Hiring Suite */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-text)' }}>Enterprise Reorganization & Structure (Hiring Suite)</h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Instant visibility into how new employee candidates fit into your organization</li>
              <li>A constantly-learning algorithm that adjusts to your organization’s needs and capacity</li>
              <li>Optimizes groups based on critical traits previously left invisible</li>
            </ul>
          </div>
          <div className="rounded-xl border p-5" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
            <h4 className="font-semibold" style={{ color: 'var(--brand-text)' }}>API</h4>
            <p className="mt-2">Deploy the compatibility operating system for any use case in question.</p>
          </div>
        </section>

        {/* Potential Use Cases */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-k)' }}>Potential Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div>
              <h4 className="font-semibold" style={{ color: 'var(--brand-text)' }}>Quantification</h4>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Insurance: Match policyholders to best-fit agents/adjusters and communication styles to reduce churn and complaints</li>
                <li>Human Resources: Score role–candidate fit and prioritize interviews to cut late-stage false positives and mis-hires</li>
                <li>Admissions: Rank applicants by program fit from essays/interviews to build balanced, high-retention cohorts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: 'var(--brand-text)' }}>Quantification + Optimization</h4>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Events: Auto-group attendees into tables, tracks, or breakouts that spark chemistry and follow-on meetings. Find events that would be good for certain individuals</li>
                <li>Healthcare: Pair patients with clinicians and care pathways aligned to temperament and adherence likelihood</li>
                <li>Therapist Matching: Route clients to therapists with compatible modalities, interpersonal styles, and availability</li>
                <li>Mentorship: Match mentors and mentees by goals, experience, and interaction style to raise completion rates</li>
                <li>Sales: Send each lead to the rep whose communication pattern best converts that lead type</li>
              </ul>
            </div>
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
