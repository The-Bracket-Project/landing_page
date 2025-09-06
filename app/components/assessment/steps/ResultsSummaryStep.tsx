import { useEffect, useRef, useState } from 'react';
import { StepProps } from '../types';
import { clearAssessmentState } from '../../../utils/localStorage';

export default function ResultsSummaryStep({
  assessmentState,
  onUpdateData
}: StepProps) {
  const { generatedSummary, summaryApiStatus, requestId, oceanScores } = assessmentState;

  type BracketScores = Record<string, { score: number; level: string }>;
  const [bracketScores, setBracketScores] = useState<BracketScores | null>(null);
  const [scoresError, setScoresError] = useState<string | null>(null);
  const [animateBars, setAnimateBars] = useState(false);

  const hasCleared = useRef(false);

  const traitOrder = ['Extraversion', 'Conscientiousness', 'Openness', 'Agreeableness', 'Neuroticism'];

  const traitMeta: Record<string, { tooltip: string }> = {
    openness: { tooltip: 'Curiosity, creativity, preference for variety' },
    conscientiousness: { tooltip: 'Organization, diligence, reliability' },
    extraversion: { tooltip: 'Sociability, assertiveness, energy' },
    agreeableness: { tooltip: 'Cooperation, empathy, warmth' },
    neuroticism: { tooltip: 'Emotional variability, sensitivity to stress' },
  };

  useEffect(() => {
    if (!hasCleared.current) {
      clearAssessmentState();
      hasCleared.current = true;
      setTimeout(() => clearAssessmentState(), 100);
    }
  }, []);

  // Poll for summary if not yet generated
  useEffect(() => {
    // If summary is already present (immediate mode), do not poll
    if (generatedSummary) return;
    if (!requestId) return;

    onUpdateData({ summaryApiStatus: { loading: true, error: null, success: false } });

    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/summary/${requestId}`);
        if (!res.ok) {
          if (res.status >= 500) throw new Error(`Summary fetch failed: ${res.status} ${res.statusText}`);
          return;
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Unexpected summary response:', text);
          throw new Error('Invalid summary response');
        }
        const data = await res.json();
        if (data?.summary) {
          onUpdateData({
            generatedSummary: data.summary,
            summaryApiStatus: { loading: false, error: null, success: true }
          });
          clearInterval(interval);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch summary';
        onUpdateData({ summaryApiStatus: { loading: false, error: message, success: false } });
        clearInterval(interval);
      }
    };

    const interval = setInterval(fetchSummary, 1200);
    return () => clearInterval(interval);
  }, [requestId, generatedSummary, onUpdateData]);

  // Fetch scores
  useEffect(() => {
    // Prefer immediate scores from state; fallback to fetching by requestId
    if (oceanScores) {
      setBracketScores(oceanScores);
      requestAnimationFrame(() => setAnimateBars(true));
      return;
    }
    if (!requestId) return;
    const fetchScores = async () => {
      try {
        const res = await fetch(`/api/ocean_scores/${requestId}`);
        if (!res.ok) throw new Error(`Scores fetch failed: ${res.status} ${res.statusText}`);
        const data = await res.json();
        if (data?.scores) {
          setBracketScores(data.scores);
          requestAnimationFrame(() => setAnimateBars(true));
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch bracket scores';
        setScoresError(message);
      }
    };
    fetchScores();
  }, [requestId, oceanScores]);

  // Helpers
  const prettyLevel = (lvl: string) =>
    lvl.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium border-black/5 bg-white/60 backdrop-blur shadow-sm">
      {children}
    </span>
  );

  const SkeletonLine = ({ w = 'w-3/4' }: { w?: string }) => (
    <div className={`h-3 ${w} rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]`} />
  );

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/80 backdrop-blur rounded-xl shadow-sm ring-1 ring-black/5 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      {/* Top banner */}
      <div className="relative overflow-hidden rounded-2xl ring-1 p-6 mt-2" style={{ background: '#eef2f7', borderColor: 'rgba(33,61,97,0.2)' }}>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full grid place-items-center shadow" style={{ background: 'var(--brand-b)', color: 'white' }}>OK</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-k)' }}>Assessment Complete</h3>
            <p className="mt-1" style={{ color: 'var(--brand-b)' }}>
              Thanks for completing the personality assessment. We’re preparing your personalized insights.
            </p>
          </div>
        </div>

        {(summaryApiStatus.loading || !bracketScores) && (
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="h-3 w-3 animate-pulse rounded-full" style={{ background: 'var(--brand-accent)' }} />
            <p style={{ color: 'var(--brand-k)' }}>Crunching results… this typically takes a few seconds.</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6">
        {/* Summary */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold" style={{ color: 'var(--brand-k)' }}>Your Personality Snapshot</h4>
            {summaryApiStatus.success && <Pill>Ready</Pill>}
            {summaryApiStatus.loading && <Pill>Generating…</Pill>}
            {summaryApiStatus.error && <Pill>Retry recommended</Pill>}
          </div>

          {summaryApiStatus.error && (
            <p className="mt-3 text-sm text-red-600">Error: {summaryApiStatus.error}</p>
          )}

          {summaryApiStatus.loading && !generatedSummary && (
            <div className="mt-3 space-y-2">
              <SkeletonLine w="w-11/12" />
              <SkeletonLine w="w-10/12" />
              <SkeletonLine w="w-9/12" />
            </div>
          )}

          {generatedSummary && (
            <p className="mt-3 text-sm leading-6 whitespace-pre-line" style={{ color: 'var(--brand-text)' }}>
              {generatedSummary}
            </p>
          )}
        </Card>

        {/* Scores */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold" style={{ color: 'var(--brand-k)' }}>Bracket Scores</h4>
            {bracketScores && <Pill>Interactive</Pill>}
          </div>

          {scoresError && (
            <p className="mt-3 text-sm text-red-600">Error: {scoresError}</p>
          )}

          {!scoresError && !bracketScores && (
            <div className="mt-4 space-y-4">
              {traitOrder.map((t) => (
                <div key={t} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#c9d3e3' }} />
                      <span className="capitalize">{t}</span>
                    </div>
                    <div className="h-5 w-20 rounded bg-gray-100 animate-pulse" />
                  </div>
                  <div className="h-4 w-full rounded-lg bg-gray-100 overflow-hidden">
                    <div className="h-full w-1/3 bg-gray-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {bracketScores && (
            <div className="mt-4 space-y-4">
              {traitOrder.map((displayTrait) => {
                const key = displayTrait.toLowerCase();
                const info = bracketScores[key];
                if (!info) return null;

                const meta = traitMeta[key];
                const width = `${Math.max(0, Math.min(100, info.score * 100))}%`;

                return (
                  <div key={key} className="space-y-2" title={meta?.tooltip}>
                    <div className="flex items-center justify-between text-sm" style={{ color: 'var(--brand-text)' }}>
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{displayTrait}</span>
                      </div>
                      <Pill>{prettyLevel(info.level)}</Pill>
                    </div>

                    <div className="relative h-4 w-full rounded-lg overflow-hidden" style={{ background: '#e6ebf2', boxShadow: 'inset 0 0 0 1px rgba(33,61,97,0.08)' }}>
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_40%)]" />
                      <div
                        className={['relative h-full rounded-lg transition-all duration-700 ease-out will-change-[width]', animateBars ? '' : 'w-0'].join(' ')}
                        style={{ width: animateBars ? width : '0%' }}
                        aria-label={`${displayTrait} score`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(info.score * 100)}
                        role="progressbar"
                      />
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, var(--brand-k), var(--brand-b))', width: animateBars ? width : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <div className="mx-auto text-center text-sm text-gray-600">
          Your anonymous data helps advance personality research. Thank you for contributing!
        </div>
      </div>
    </div>
  );
}
