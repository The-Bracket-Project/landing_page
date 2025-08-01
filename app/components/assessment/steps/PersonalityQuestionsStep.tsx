import { StepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function PersonalityQuestionsStep({ 
  onNext, 
  /* onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep */
}: StepProps) {
  return (
    <div className="text-center space-y-6">

      {/* Navigation - Only Next button */}
      <ContinueButton onClick={onNext} fullWidth>
        See my results!
      </ContinueButton>
    </div>
  );
} 