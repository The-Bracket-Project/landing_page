import { useEffect, useRef } from 'react';
import { StepProps } from '../types';
import { clearAssessmentState } from '../../../utils/localStorage';

export default function ResultsSummaryStep({
  assessmentState
}: StepProps) {
  const {
    generatedSummary,
    summaryApiStatus
  } = assessmentState;
  
  const hasCleared = useRef(false);

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
