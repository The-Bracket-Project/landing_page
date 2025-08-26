import { useEffect, useRef, useState } from 'react';
import { StepProps } from '../types';
import { clearAssessmentState } from '../../../utils/localStorage';

export default function ResultsSummaryStep({
  assessmentState,
  onUpdateData
}: StepProps) {
  const {
    generatedSummary,
    summaryApiStatus,
    requestId
  } = assessmentState;

  type BracketScores = Record<string, { score: number; level: string }>;
  const [bracketScores, setBracketScores] = useState<BracketScores | null>(null);
  const [scoresError, setScoresError] = useState<string | null>(null);
  const [animateBars, setAnimateBars] = useState(false);

  const hasCleared = useRef(false);

  const traitOrder = ['Extraversion', 'Conscientiousness', 'Openness', 'Agreeableness', 'Neuroticism'];

  const traitMeta: Record<
    string,
    {
      emoji: string;
      from: string; // gradient start
      to: string;   // gradient end
      tooltip: string;
    }
  > = {
    openness: { emoji: '🎨', from: 'from-purple-500', to: 'to-purple-300', tooltip: 'Curiosity, creativity, preference for variety' },
    conscientiousness: { emoji: '📅', from: 'from-blue-600', to: 'to-blue-300', tooltip: 'Organization, diligence, reliability' },
    extraversion: { emoji: '🌟', from: 'from-amber-400', to: 'to-amber-200', tooltip: 'Sociability, assertiveness, energy' },
    agreeableness: { emoji: '🤝', from: 'from-emerald-500', to: 'to-emerald-300', tooltip: 'Cooperation, empathy, warmth' },
    neuroticism: { emoji: '🧠', from: 'from-slate-600', to: 'to-slate-400', tooltip: 'Emotional variability, sensitivity to stress' },
  };

  useEffect(() => {
    // Clear saved assessment data since user has completed the assessment
    if (!hasCleared.current) {
      clearAssessmentState();
      hasCleared.current = true;

      // Also clear it again after a short delay to handle any auto-save race conditions
      setTimeout(() => {
        clearAssessmentState();
      }, 100);
    }
  }, []);

  // Poll for summary if not yet generated
  useEffect(() => {
    if (!requestId || generatedSummary) return;

    onUpdateData({ summaryApiStatus: { loading: true, error: null, success: false } });

    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/summary/${requestId}`);
        if (!res.ok) {
          // If summary not ready (e.g., 404), just keep waiting
          if (res.status >= 500) {
            throw new Error(`Summary fetch failed: ${res.status} ${res.statusText}`);
          }
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

    fetchSummary();
    const interval = setInterval(fetchSummary, 1200);
    return () => clearInterval(interval);
  }, [requestId, generatedSummary, onUpdateData]);

  useEffect(() => {
    if (!requestId) return;
    const fetchScores = async () => {
      try {
        const res = await fetch(`/api/ocean_scores/${requestId}`);
        if (!res.ok) {
          throw new Error(`Scores fetch failed: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (data?.scores) {
          setBracketScores(data.scores);
          // allow DOM to paint, then animate bars
          requestAnimationFrame(() => setAnimateBars(true));
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch bracket scores';
        setScoresError(message);
      }
    };
    fetchScores();
  }, [requestId]);

  // Helpers
  const prettyLevel = (lvl: string) =>
    lvl
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const Pill = ({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green'|'blue'|'amber'|'slate'|'purple'|'emerald' }) => (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium
      border-black/5 bg-white/60 backdrop-blur
      shadow-sm">
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 ring-1 ring-emerald-200/60 p-6 mt-2">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-500 text-white grid place-items-center shadow">
            ✅
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-emerald-900">Assessment Complete</h3>
            <p className="mt-1 text-emerald-800/90">
              Thanks for completing the personality assessment. We’re preparing your personalized insights.
            </p>
          </div>
        </div>

        {/* Status strip */}
        {(summaryApiStatus.loading || !bracketScores) && (
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
            <p className="text-emerald-900">Crunching results… this typically takes a few seconds.</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6">
        {/* Summary */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Your Personality Snapshot</h4>
            {summaryApiStatus.success && <Pill tone="emerald">Ready</Pill>}
            {summaryApiStatus.loading && <Pill tone="amber">Generating…</Pill>}
            {summaryApiStatus.error && <Pill tone="slate">Retry recommended</Pill>}
          </div>

          {/* Error */}
          {summaryApiStatus.error && (
            <p className="mt-3 text-sm text-red-600">Error: {summaryApiStatus.error}</p>
          )}

          {/* Loading skeleton */}
          {summaryApiStatus.loading && !generatedSummary && (
            <div className="mt-3 space-y-2">
              <SkeletonLine w="w-11/12" />
              <SkeletonLine w="w-10/12" />
              <SkeletonLine w="w-9/12" />
            </div>
          )}

          {/* Content */}
          {generatedSummary && (
            <p className="mt-3 text-sm leading-6 text-gray-700 whitespace-pre-line">
              {generatedSummary}
            </p>
          )}
        </Card>

        {/* Scores */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Bracket Scores</h4>
            {bracketScores && <Pill tone="blue">Interactive</Pill>}
          </div>

          {scoresError && (
            <p className="mt-3 text-sm text-red-600">Error: {scoresError}</p>
          )}

          {/* Scores loading skeleton */}
          {!scoresError && !bracketScores && (
            <div className="mt-4 space-y-4">
              {traitOrder.map((t, i) => (
                <div key={t} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="opacity-60">⬤</span>
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

          {/* Scores content */}
          {bracketScores && (
            <div className="mt-4 space-y-4">
              {traitOrder.map((displayTrait) => {
                // normalize keys (your API returns lowercase keys)
                const key = displayTrait.toLowerCase();
                const info = bracketScores[key];
                if (!info) return null;

                const meta = traitMeta[key];
                const width = `${Math.max(0, Math.min(100, info.score * 100))}%`;

                return (
                  <div key={key} className="space-y-2" title={meta?.tooltip}>
                    <div className="flex items-center justify-between text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{meta?.emoji ?? '•'}</span>
                        <span className="capitalize">{displayTrait}</span>
                      </div>
                      <Pill>{prettyLevel(info.level)}</Pill>
                    </div>

                    <div className="relative h-4 w-full rounded-lg bg-gray-100 ring-1 ring-black/5 overflow-hidden">
                      {/* subtle pattern backdrop */}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_40%)]" />
                      <div
                        className={[
                          'relative h-full rounded-lg transition-all duration-700 ease-out will-change-[width]',
                          'bg-gradient-to-r',
                          meta?.from ?? 'from-emerald-500',
                          meta?.to ?? 'to-emerald-300',
                          animateBars ? '' : 'w-0'
                        ].join(' ')}
                        style={{ width: animateBars ? width : '0%' }}
                        aria-label={`${displayTrait} score`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(info.score * 100)}
                        role="progressbar"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Closing note */}
        <div className="mx-auto text-center text-sm text-gray-600">
          Your anonymous data helps advance personality research. Thank you for contributing!
        </div>
      </div>
    </div>
  );
}
