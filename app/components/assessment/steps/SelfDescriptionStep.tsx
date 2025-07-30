import { StepProps } from '../types';

export default function SelfDescriptionStep({ 
  onNext, 
  onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep 
}: StepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          Phase 2: Self Description
        </h2>
        <p className="text-lg text-black/80 mb-6">
          This is where users will type their own description about themselves.
        </p>
        <div className="bg-white rounded-md p-4 text-sm text-gray-600">
          <strong>Implementation placeholder:</strong><br/>
          • Text area for user description<br/>
          • Character count and validation<br/>
          • Save description to state
        </div>
      </div>

      {/* Navigation - Only Next button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Continue to Group Selection
        </button>
      </div>
    </div>
  );
} 