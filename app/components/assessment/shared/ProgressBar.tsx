import { AssessmentStep } from '../types';

interface ProgressBarProps {
  currentStep: AssessmentStep;
  allSteps: AssessmentStep[];
}

export default function ProgressBar({ currentStep, allSteps }: ProgressBarProps) {
  const currentIndex = allSteps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / allSteps.length) * 100;



  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(to right, #000000, #FFD700)'
          }}
        />
      </div>
    </div>
  );
} 