'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { EXTERNAL_DEMO_URL, CHATBOT_DEMO_URL } from "../utils/config";

export default function PasswordGate() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-3xl mx-auto rounded-2xl p-10 shadow-sm" style={{ background: 'white', border: '1px solid rgba(33,61,97,0.08)' }}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: 'var(--brand-k)' }}>Choose a demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/showcase" className="block rounded-2xl border p-7 md:p-8 hover:shadow-lg transition min-h-[160px]" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
              <div className="text-base md:text-lg uppercase font-semibold tracking-wide" style={{ color: 'var(--brand-k)' }}>Quantify Personality</div>
              <div className="mt-2 text-base" style={{ color: 'var(--brand-text)' }}>Guided LLM-based assessment demo</div>
            </a>
            <a href={EXTERNAL_DEMO_URL} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border p-7 md:p-8 hover:shadow-lg transition min_h-[160px]" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
              <div className="text-base md:text-lg uppercase font-semibold tracking-wide" style={{ color: 'var(--brand-k)' }}>Full OS Demo</div>
              <div className="mt-2 text-base" style={{ color: 'var(--brand-text)' }}>External demo environment</div>
            </a>
            <a href={CHATBOT_DEMO_URL} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border p-7 md:p-8 hover:shadow-lg transition min-h-[160px]" style={{ borderColor: 'rgba(33,61,97,0.12)' }}>
              <div className="text-base md:text-lg uppercase font-semibold tracking-wide" style={{ color: 'var(--brand-k)' }}>Bracket Agents</div>
              <div className="mt-2 text-base" style={{ color: 'var(--brand-text)' }}>External demo environment</div>
            </a>
          </div>
        </div>
      </main>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
  );
}
