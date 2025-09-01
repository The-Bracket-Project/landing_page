import React from 'react';

export default function ScoreBar({ label, value, level }: { label: string; value: number; level?: string }) {
  const width = `${Math.max(0, Math.min(100, value * 100))}%`;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm" style={{ color: 'var(--brand-text)' }}>
        <span className="capitalize">{label}</span>
        {level && (
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'white' }}>
            {level.replace(/-/g, ' ')}
          </span>
        )}
      </div>
      <div className="relative h-4 w-full rounded-lg overflow-hidden" style={{ background: '#e6ebf2', boxShadow: 'inset 0 0 0 1px rgba(33,61,97,0.08)' }}>
        <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, var(--brand-k), var(--brand-b))', width }} />
      </div>
    </div>
  );
}

