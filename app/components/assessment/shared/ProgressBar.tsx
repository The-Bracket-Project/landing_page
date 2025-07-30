import { AssessmentStep } from '../types';

interface ProgressBarProps {
  currentStep: AssessmentStep;
  completedSteps: AssessmentStep[];
  allSteps: AssessmentStep[];
}

export default function ProgressBar({ currentStep, completedSteps, allSteps }: ProgressBarProps) {
  const currentIndex = allSteps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / allSteps.length) * 100;

  const getStepLabel = (step: AssessmentStep): string => {
    switch (step) {
      case 'interests-input':
        return 'Interests';
      case 'self-description':
        return 'Description';
      case 'group-selection':
        return 'Groups';
      case 'personality-questions':
        return 'Questions';
      case 'results-summary':
        return 'Results';
      default:
        return step;
    }
  };

  return (
    <div className="w-full">
      {/* Progress info */}
      <div className="flex justify-between mb-2">
        <span className="text-sm text-black/70">
          Step {currentIndex + 1} of {allSteps.length}: {getStepLabel(currentStep)}
        </span>
        <span className="text-sm text-black/70">{Math.round(progress)}% Complete</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      {/* <div className="flex justify-between">
        {allSteps.map((step, index) => (
          <div 
            key={step}
            className={`flex flex-col items-center space-y-2 ${
              index <= currentIndex ? 'text-black' : 'text-gray-400'
            }`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                completedSteps.includes(step)
                  ? 'bg-green-500 text-white'
                  : index === currentIndex
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {completedSteps.includes(step) ? '✓' : index + 1}
            </div>
            <span className="text-xs hidden sm:block">{getStepLabel(step)}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
} 