import { StepProps } from '../types';

export default function PersonalityQuestionsStep({ 
  onNext, 
  /* onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep */
}: StepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          Phase 4: Personality Questions
        </h2>
        <p className="text-lg text-black/80 mb-6">
          This is where users will answer personality questions. Multiple choice questions that connect to a different API.
        </p>
        <div className="bg-white rounded-md p-4 text-sm text-gray-600">
          <strong>Implementation placeholder:</strong><br/>
          • Display personality questions<br/>
          • Multiple choice answer interface<br/>
          • API call to process responses
        </div>
      </div>

      {/* Navigation - Only Next button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Generate My Results
        </button>
      </div>
    </div>
  );
} 