import { useState } from 'react';
import { StepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function GroupSelectionStep({ 
  onNext, 
  assessmentState,
  onUpdateData,
  /* isLastStep */
}: StepProps) {
  const { interestsApiStatus, availableGroups} = assessmentState;
  
  // State for managing set navigation and selections
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [setSelections, setSetSelections] = useState<{[setIndex: number]: {description: string; target_ocean: string; ocean_score: string}}>({});
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Limit to 5 sets maximum
  const maxSets = Math.min(5, availableGroups.length);
  const currentSet = availableGroups[currentSetIndex] || [];
  
  // Handle group selection (one per set)
  const handleGroupSelect = (group: {description: string; target_ocean: string; ocean_score: string}) => {
    const newSetSelections = {
      ...setSelections,
      [currentSetIndex]: group
    };
    
    setSetSelections(newSetSelections);
    
    // Update assessment state with all selected group descriptions from all sets
    const allSelectedGroups = Object.values(newSetSelections).map(g => g.description);
    onUpdateData({
      groupSelection: {
        selectedGroups: allSelectedGroups
      }
    });
  };
  
  // Handle moving to next set with animation
  const handleNextSet = () => {
    if (currentSetIndex < maxSets - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSetIndex(currentSetIndex + 1);
        setIsAnimating(false);
      }, 150);
    }
  };
  
  // Handle continue (only show after last set)
  const handleContinue = () => {
    // Console log all selections with metadata at the end
    const allSelectedWithMetadata = Object.values(setSelections);
    console.log('Final selected groups:', allSelectedWithMetadata);
    onNext();
  };
  
  // Check if user has made a selection from current set
  const hasSelectionFromCurrentSet = setSelections[currentSetIndex] !== undefined;
  
  // Check if this is the last set
  const isLastSet = currentSetIndex === maxSets - 1;

  // Show loading spinner while interests API is pending
  if (interestsApiStatus.loading) {
    return (
      <div className="space-y-6">
        <div className="text-center px-8">
          <p className="text-lg text-black/80 mb-8">
            We&apos;re analyzing your interests to find the perfect groups for you...
          </p>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            This usually takes a few seconds
          </p>
        </div>
      </div>
    );
  }

  // Show error state if API failed
  if (interestsApiStatus.error) {
    return (
      <div className="space-y-6">
        <div className="text-center px-8">
          <p className="text-lg text-black/80 mb-4">
            Something went wrong while analyzing your interests.
          </p>
          <p className="text-red-600 text-sm mb-6">
            Error: {interestsApiStatus.error}
          </p>
        </div>
        
        <ContinueButton onClick={handleContinue}>
          Continue Anyway
        </ContinueButton>
      </div>
    );
  }

  // Main group selection UI (when API is complete)
  return (
    <div className="space-y-6">
      <div className="text-center px-8">
        <p className="text-lg text-black/80 mb-2">
          Based on your interests, here are some groups that might resonate with you.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Set {currentSetIndex + 1} of {maxSets} • Select the ones that resonate with you
        </p>
      </div>

      {/* Current Set Display */}
      {currentSet.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className={`space-y-3 transition-all duration-200 ${isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            {currentSet.map((group, groupIndex) => {
              const isSelected = setSelections[currentSetIndex]?.description === group.description;
              return (
                <div 
                  key={`${currentSetIndex}-${groupIndex}`}
                  onClick={() => handleGroupSelect(group)}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-black bg-black text-white shadow-lg transform scale-[1.02]' 
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm">{group.description}</p>
                  {isSelected && (
                    <div className="mt-2 flex items-center justify-end">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        {!isLastSet && hasSelectionFromCurrentSet ? (
          <button
            onClick={handleNextSet}
            disabled={isAnimating}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Set →
          </button>
        ) : isLastSet && Object.keys(setSelections).length > 0 ? (
          <ContinueButton onClick={handleContinue}>
            Continue ({Object.keys(setSelections).length} selected)
          </ContinueButton>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {isLastSet 
                ? "Select one option to continue" 
                : "Select one option to see the next set"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 