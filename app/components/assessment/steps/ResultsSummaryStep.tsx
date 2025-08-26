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
  
  const hasCleared = useRef(false);

  const traitColors: Record<string, string> = {
    openness: 'bg-purple-500',
    conscientiousness: 'bg-blue-500',
    extraversion: 'bg-yellow-400',
    agreeableness: 'bg-green-500',
    neuroticism: 'bg-gray-700'
  };

  useEffect(() => {
    // Clear saved assessment data since user has completed the assessment
    // Use ref to ensure this only happens once
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
    const interval = setInterval(fetchSummary, 3000);
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
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch bracket scores';
        setScoresError(message);
      }
    };
    fetchScores();
  }, [requestId]);

  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          🎉 Assessment Complete!
        </h3>
        <p className="text-green-700 mb-4">
          Thank you for completing the personality assessment. Your responses have been recorded.
        </p>

        {summaryApiStatus.loading && (
          <div className="flex flex-col items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
            <p className="text-sm text-gray-600">Generating your personalized summary...</p>
          </div>
        )}

        {summaryApiStatus.error && (
          <p className="text-sm text-red-600 mb-4">Error: {summaryApiStatus.error}</p>
        )}

        {generatedSummary && (
          <div className="bg-white rounded-lg p-4 shadow-sm text-left space-y-2 max-w-2xl mx-auto mb-4">
            <h4 className="font-medium text-gray-800">Your Summary:</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{generatedSummary}</p>
          </div>
        )}

{scoresError && (
          <p className="text-sm text-red-600 mb-4">Error: {scoresError}</p>
        )}

        {bracketScores && (
          <div className="bg-white rounded-lg p-4 shadow-sm text-left space-y-4 max-w-2xl mx-auto mb-4">
            <h4 className="font-medium text-gray-800">Bracket Scores</h4>
            <div className="space-y-3">
            {Object.entries(bracketScores).map(([trait, info]) => {
                const barColor = traitColors[trait.toLowerCase()] || 'bg-green-500';
                return (
                  <div key={trait} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span className="capitalize">{trait}</span>
                      <span>{info.level}</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded">
                      <div
                        className={`h-full ${barColor} rounded`}
                        style={{ width: `${info.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* <div className="text-left space-y-4 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Summary:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Interests shared: {interests.length}</li>
              <li>• Self-description provided: {selfDescription ? 'Yes' : 'No'}</li>
              <li>• Groups selected: {groupSelection.length}</li>
              <li>• Questions answered: {personalityResponses.length}</li>
            </ul>
          </div>
        </div> */}

        <p className="text-sm text-gray-600 mt-4">
          Your anonymous data helps advance personality research. Thank you for contributing!
        </p>
      </div>
    </div>
  );
}
