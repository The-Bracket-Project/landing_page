'use client';

import { useState } from 'react';
import { AssessmentState, AssessmentStep } from './types';
import ProgressBar from './shared/ProgressBar';
import InterestsInputStep from './steps/InterestsInputStep';
import SelfDescriptionStep from './steps/SelfDescriptionStep';
import GroupSelectionStep from './steps/GroupSelectionStep';
import PersonalityQuestionsStep from './steps/PersonalityQuestionsStep';
import ResultsSummaryStep from './steps/ResultsSummaryStep';

export default function AssessmentOrchestrator() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentStep: 'interests-input',
    interests: { interests: [] },
    interestsApiStatus: { loading: false, error: null, success: false },
    selfDescription: '',
    availableGroups: [],
    groupSelection: { selectedGroups: [] },
    personalityResponses: [],
    personalityApiStatus: { loading: false, error: null, success: false },
    generatedSummary: null,
    summaryApiStatus: { loading: false, error: null, success: false },
    startTime: new Date(),
    completedSteps: []
  });

  const steps: AssessmentStep[] = [
    'interests-input',
    'self-description', 
    'group-selection',
    'personality-questions',
    'results-summary'
  ];

  // Generic API call handler
  async function handleApiCall<T>(
    apiCall: () => Promise<T>, 
    statusKey: keyof AssessmentState
  ): Promise<T> {
    setAssessmentState(prev => ({
      ...prev,
      [statusKey]: { loading: true, error: null, success: false }
    }));

    try {
      const result = await apiCall();
      setAssessmentState(prev => ({
        ...prev,
        [statusKey]: { loading: false, error: null, success: true }
      }));
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setAssessmentState(prev => ({
        ...prev,
        [statusKey]: { 
          loading: false, 
          error: errorMessage, 
          success: false 
        }
      }));
      throw error;
    }
  }

  const updateAssessmentData = (data: Partial<AssessmentState>) => {
    setAssessmentState(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(assessmentState.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      updateAssessmentData({
        currentStep: nextStep,
        completedSteps: [...assessmentState.completedSteps, assessmentState.currentStep]
      });
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: goToNextStep,
      onUpdateData: updateAssessmentData,
      onApiCall: handleApiCall,
      assessmentState,
      isLastStep: steps.indexOf(assessmentState.currentStep) === steps.length - 1
    };

    switch (assessmentState.currentStep) {
      case 'interests-input':
        return <InterestsInputStep {...stepProps} />;
      case 'self-description':
        return <SelfDescriptionStep {...stepProps} />;
      case 'group-selection':
        return <GroupSelectionStep {...stepProps} />;
      case 'personality-questions':
        return <PersonalityQuestionsStep {...stepProps} />;
      case 'results-summary':
        return <ResultsSummaryStep {...stepProps} />;
      default:
        return <InterestsInputStep {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    switch (assessmentState.currentStep) {
      case 'interests-input':
        return 'Tell us about your interests';
      case 'self-description':
        return 'Describe yourself';
      case 'group-selection':
        return 'Select what resonates with you';
      case 'personality-questions':
        return 'Personality assessment';
      case 'results-summary':
        return 'Your personality summary';
      default:
        return 'Personality Assessment';
    }
  };

  return (
    <div className="space-y-6 px-2">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
          {getStepTitle()}
        </h2>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        currentStep={assessmentState.currentStep}
        completedSteps={assessmentState.completedSteps}
        allSteps={steps}
      />

      {/* Current Step Content */}
      <div className="min-h-[250px] pb-4">
        {renderCurrentStep()}
      </div>
    </div>
  );
} 