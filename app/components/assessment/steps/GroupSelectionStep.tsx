import { StepProps } from '../types';

export default function GroupSelectionStep({ 
  onNext, 
  /* onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep */
}: StepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          Phase 3: Group Selection
        </h2>
        <p className="text-lg text-black/80 mb-6">
          This is where users will select groups based on their interests. Multiple choice selection.
        </p>
        <div className="bg-white rounded-md p-4 text-sm text-gray-600">
          <strong>Implementation placeholder:</strong><br/>
          • Display groups from interests API<br/>
          • Multiple choice selection interface<br/>
          • Validate minimum/maximum selections
        </div>
      </div>

      {/* Navigation - Only Next button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Continue to Personality Questions
        </button>
      </div>
    </div>
  );
} 