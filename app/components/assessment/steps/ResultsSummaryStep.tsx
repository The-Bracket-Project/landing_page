import { useEffect, useMemo, useRef } from 'react';
import { StepProps } from '../types';
import { clearAssessmentState } from '../../../utils/localStorage';

const STUDY_DEMO_BASE_URL = process.env.NEXT_PUBLIC_STUDY_DEMO_URL ?? '/study';

export default function ResultsSummaryStep({
  assessmentState,
  onUpdateData
}: StepProps) {
  const { generatedSummary, summaryApiStatus, requestId } = assessmentState;

  const hasCleared = useRef(false);

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

  const participantSlug = useMemo(() => {
    const base = assessmentState.userName?.trim() || 'participant';
    return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'participant';
  }, [assessmentState.userName]);

  const demoUrl = useMemo(() => {
    if (!requestId) return null;
    const params = new URLSearchParams({
      participantId: participantSlug,
      oceanRequestId: requestId,
    });
    const separator = STUDY_DEMO_BASE_URL.includes('?') ? '&' : '?';
    return `${STUDY_DEMO_BASE_URL}${separator}${params.toString()}`;
  }, [participantSlug, requestId]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      {/* Top banner */}
      <div className="relative overflow-hidden rounded-2xl ring-1 p-6 mt-2" style={{ background: '#eef2f7', borderColor: 'rgba(33,61,97,0.2)' }}>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full grid place-items-center shadow" style={{ background: 'var(--brand-b)', color: 'white' }}>OK</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-k)' }}>Assessment Complete</h3>
            <p className="mt-1" style={{ color: 'var(--brand-b)' }}>
              Thanks for completing the personality assessment. We&apos;re preparing your personalized insights.
            </p>
          </div>
        </div>

        {summaryApiStatus.loading && (
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

        {demoUrl && (
          <Card className="p-5 text-center">
            <h4 className="text-lg font-semibold" style={{ color: 'var(--brand-k)' }}>
              Ready to try the adaptive task demo?
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Carry your freshly generated trait profile into a realistic workflow and see how personalization behaves.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Open Task Demo
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(demoUrl).catch(() => undefined)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                Copy Demo Link
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Link includes your survey token ({requestId}) so the demo auto-loads your trait lenses.
            </p>
          </Card>
        )}
        <div className="mx-auto text-center text-sm text-gray-600">
          Your anonymous data helps advance personality research. Thank you for contributing!
        </div>
      </div>
    </div>
  );
}
