'use client';

import { useState } from 'react';
import { AssessmentState, AssessmentStep, InterestsApiRequest, InterestsApiResponse} from './types';
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
    groupSelection: [],
    followUpQuestions: [],
    personalityResponses: [],
    personalityApiStatus: { loading: false, error: null, success: false },
    requestId: null,
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

  // Interests API call handler - runs in background
  const handleInterestsApiCall = async () => {
    const interests = assessmentState.interests.interests;
    if (interests.length < 3) return;

    const requestData: InterestsApiRequest = { interests };

    const groupsApiCall = handleGroupsApiCall(requestData);
    
    handleFollowUpQuestionsApiCall(requestData);
    
    // Only wait for groups API to complete (GroupSelection depends on this)
    await groupsApiCall;
  };

  // Groups API call - controls GroupSelection loading state
  const handleGroupsApiCall = async (requestData: InterestsApiRequest) => {
    try {
      const groupsResult = await handleApiCall<InterestsApiResponse>(
        async () => {
          const response = await fetch('/api/get-groups-showcase/v1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });

          if (!response.ok) {
            throw new Error(`Groups API call failed: ${response.status} ${response.statusText}`);
          }

          return response.json();
        },
        'interestsApiStatus'
      );

      // Store the available groups from API response
      if (groupsResult?.groups) {
        updateAssessmentData({ 
          availableGroups: groupsResult.groups
        });
      }
    } catch (error) {
      console.error('Error with groups API:', error);
    }
  };

  // Follow-up questions API call - runs independently in background
  const handleFollowUpQuestionsApiCall = async (requestData: InterestsApiRequest) => {
    try {
      const followUpResult = await fetch('/api/follow-up-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!followUpResult.ok) {
        throw new Error(`Follow-up questions API call failed: ${followUpResult.status} ${followUpResult.statusText}`);
      }

      const data = await followUpResult.json();

      // Store this data in state for PersonalityQuestionsStep and save request ID
      updateAssessmentData({
        followUpQuestions: data.questions || [],
        requestId: data.request_id || null
      });
      
    } catch (error) {
      console.error('Error with follow-up questions API:', error);
      // This doesn't affect the main flow
    }
  };

  // Interests submission handler - moves to next step immediately and awaits background API call
  const handleInterestsSubmission = async () => {
    const interests = assessmentState.interests.interests;
    if (interests.length < 3) return;

    // Move to next step immediately (synchronous)
    goToNextStep();
    
    // Wait for API call to complete in background
    await handleInterestsApiCall();
  };

  const updateAssessmentData = (data: Partial<AssessmentState>) => {
    setAssessmentState(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(assessmentState.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      
      // Console log all assessment data when moving from personality-questions to results-summary
      if (assessmentState.currentStep === 'personality-questions' && nextStep === 'results-summary') {
        console.log('=== Complete Assessment Data ===');
        console.log('Interests:', assessmentState.interests);
        console.log('Self Description:', assessmentState.selfDescription);
        console.log('Available Groups:', assessmentState.availableGroups);
        console.log('Selected Groups:', assessmentState.groupSelection);
        console.log('Follow-up Questions:', assessmentState.followUpQuestions);
        console.log('Personality Responses:', assessmentState.personalityResponses);
        console.log('================================');
      }
      
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
      assessmentState,
      isLastStep: steps.indexOf(assessmentState.currentStep) === steps.length - 1
    };

    switch (assessmentState.currentStep) {
      case 'interests-input':
        return <InterestsInputStep {...stepProps} onSubmitInterests={handleInterestsSubmission} />;
      case 'self-description':
        return <SelfDescriptionStep {...stepProps} />;
      case 'group-selection':
        return <GroupSelectionStep {...stepProps} />;
      case 'personality-questions':
        return <PersonalityQuestionsStep {...stepProps} />;
      case 'results-summary':
        return <ResultsSummaryStep {...stepProps} />;
      default:
        return <InterestsInputStep {...stepProps} onSubmitInterests={handleInterestsSubmission} />;
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
        return 'Further questions';
      case 'results-summary':
        return 'Your results';
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
        allSteps={steps}
      />

      {/* Current Step Content */}
      <div className="min-h-[250px] pb-4">
        {renderCurrentStep()}
      </div>
    </div>
  );
} 