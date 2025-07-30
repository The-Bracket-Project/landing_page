import { StepProps } from '../types';

export default function InterestsInputStep({ 
  onNext, 
  onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep 
}: StepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          Phase 1: Interests Input
        </h2>
        <p className="text-lg text-black/80 mb-6">
          This is where users will input their interests. This data will go into an API that you will implement later.
        </p>
        <div className="bg-white rounded-md p-4 text-sm text-gray-600">
          <strong>Implementation placeholder:</strong><br/>
          • Interest selection interface<br/>
          • API call to process interests<br/>
          • Validation and error handling
        </div>
      </div>

      {/* Navigation - Only Next button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Continue to Self Description
        </button>
      </div>
    </div>
  );
} 