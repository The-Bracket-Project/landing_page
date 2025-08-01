interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  isLoading?: boolean;
}

export default function NavigationButtons({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  canProceed = true,
  nextLabel = "Next",
  previousLabel = "Previous",
  isLoading = false
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-4 pb-2">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`order-2 sm:order-1 px-6 py-3 rounded-lg font-medium transition-colors ${
          isFirstStep
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
      >
        {previousLabel}
      </button>
      
      <button
        onClick={onNext}
        disabled={!canProceed || isLoading}
        className={`order-1 sm:order-2 px-6 py-3 rounded-lg font-medium transition-colors ${
          !canProceed || isLoading
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : isLastStep
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </span>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  );
} 