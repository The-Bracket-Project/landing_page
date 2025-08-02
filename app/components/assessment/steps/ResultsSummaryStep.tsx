import { useEffect } from 'react';
import { StepProps } from '../types';
import { clearAssessmentState } from '../../../utils/localStorage';

export default function ResultsSummaryStep({
  assessmentState,
  onUpdateData
}: StepProps) {
  const {
    interests,
    selfDescription,
    groupSelection,
    personalityResponses,
    requestId,
    generatedSummary,
    summaryApiStatus
  } = assessmentState;

  useEffect(() => {
    // Clear saved assessment data since user has completed the assessment
    clearAssessmentState();

    const fetchSummary = async () => {
      if (!requestId) return;

      onUpdateData({
        summaryApiStatus: { loading: true, error: null, success: false }
      });

      try {
        const response = await fetch(`/api/summary/${requestId}`);
        if (!response.ok) {
          throw new Error(`Summary API call failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        onUpdateData({
          generatedSummary: data.summary || null,
          summaryApiStatus: { loading: false, error: null, success: true }
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        onUpdateData({
          summaryApiStatus: { loading: false, error: errorMessage, success: false }
        });
      }
    };

    if (!generatedSummary && !summaryApiStatus.loading) {
      fetchSummary();
    }
  }, [requestId, generatedSummary, summaryApiStatus.loading, onUpdateData]);

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
          <p className="text-sm text-gray-600 mb-4">Generating your personalized summary...</p>
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

        <div className="text-left space-y-4 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Summary:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Interests shared: {interests.interests.length}</li>
              <li>• Self-description provided: {selfDescription ? 'Yes' : 'No'}</li>
              <li>• Groups selected: {groupSelection.length}</li>
              <li>• Questions answered: {personalityResponses.length}</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Your anonymous data helps advance personality research. Thank you for contributing!
        </p>
      </div>
    </div>
  );
}
