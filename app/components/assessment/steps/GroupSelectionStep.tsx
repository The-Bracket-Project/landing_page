import { StepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function GroupSelectionStep({ 
  onNext, 
  /* onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep */
}: StepProps) {
  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Continue Button */}
      <ContinueButton onClick={handleContinue}>
        Continue
      </ContinueButton>
    </div>
  );
} 