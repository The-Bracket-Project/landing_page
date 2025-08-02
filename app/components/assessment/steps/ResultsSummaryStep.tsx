import { StepProps } from '../types';

export default function ResultsSummaryStep({ 
  assessmentState
}: StepProps) {
  const { interests, selfDescription, groupSelection, personalityResponses } = assessmentState;
  
  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          🎉 Assessment Complete!
        </h3>
        <p className="text-green-700 mb-4">
          Thank you for completing the personality assessment. Your responses have been recorded.
        </p>
        
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