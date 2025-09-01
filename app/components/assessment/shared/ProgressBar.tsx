import { AssessmentStep } from '../types';

interface ProgressBarProps {
  currentStep: AssessmentStep;
  allSteps: AssessmentStep[];
  subTotal?: number; // optional sub-steps within current step
  subCurrent?: number; // completed sub-steps
}

export default function ProgressBar({ currentStep, allSteps, subTotal, subCurrent }: ProgressBarProps) {
  const currentIndex = allSteps.indexOf(currentStep);
  let progress = ((currentIndex + 1) / allSteps.length) * 100;
  // If sub-progress provided, distribute current step's segment fractionally
  if (typeof subTotal === 'number' && typeof subCurrent === 'number' && subTotal > 0) {
    const stepSize = 100 / allSteps.length;
    const baseBefore = (currentIndex / allSteps.length) * 100;
    const fractional = Math.min(1, Math.max(0, subCurrent / subTotal)) * stepSize;
    progress = baseBefore + fractional;
  }



  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full rounded-full h-2 mb-4" style={{ background: '#e6e6e6' }}>
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(to right, var(--brand-k), var(--brand-b))'
          }}
        />
      </div>
    </div>
  );
}
