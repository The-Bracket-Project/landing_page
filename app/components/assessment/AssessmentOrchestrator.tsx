'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentState, AssessmentStep, InterestsApiRequest, InterestsApiResponse} from './types';
import { useAssessmentStorage, useApiRetry } from '../../hooks/useAssessmentStorage';
import ProgressBar from './shared/ProgressBar';
import InterestsInputStep from './steps/InterestsInputStep';
import SelfDescriptionStep from './steps/SelfDescriptionStep';
import GroupSelectionStep from './steps/GroupSelectionStep';
import PersonalityQuestionsStep from './steps/PersonalityQuestionsStep';
import ResultsSummaryStep from './steps/ResultsSummaryStep';

export default function AssessmentOrchestrator() {
  const initialState: AssessmentState = {
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
  };

  const {
    assessmentState,
    setAssessmentState,
    showRestorePrompt,
    savedStateTimestamp,
    restorePromptInfo,
    handleRestoreProgress,
    handleStartFresh,
    isStateValid,
    validationInfo
  } = useAssessmentStorage({
    initialState,
    onStateRestore: handleStateRestore,
    autoSave: true
  });

  const { retryInfo, scheduleRetry, clearRetry } = useApiRetry();

  const steps: AssessmentStep[] = [
    'interests-input',
    'self-description', 
    'group-selection',
    'personality-questions',
    'results-summary'
  ];

  // Handle state restoration with API fallback logic
  function handleStateRestore(
    state: AssessmentState, 
    fallbackInfo?: { reason: string; needsApiFallback: boolean }
  ) {
    if (fallbackInfo?.needsApiFallback) {
      console.log('🔄 State restored with fallback:', fallbackInfo.reason);
      
      // Schedule API retries based on what's missing (regardless of current step)
      // Check if groups are missing and user has interests
      if (state.availableGroups.length === 0 && state.interests.interests.length >= 3) {
        console.log('📝 Scheduling groups API retry with interests:', state.interests.interests);
        scheduleRetry('groups', { interests: state.interests.interests });
      }
      
      // Check if follow-up questions are missing and user has interests  
      if (state.followUpQuestions.length === 0 && state.interests.interests.length >= 3) {
        console.log('📝 Scheduling followUpQuestions API retry with interests:', state.interests.interests);
        scheduleRetry('followUpQuestions', { interests: state.interests.interests });
      }
    } else {
      console.log('✅ State restored successfully without API fallback needed');
    }
  }

  // Generic API call handler
  const handleApiCall = useCallback(async (
    apiCall: () => Promise<any>, 
    statusKey: keyof AssessmentState
  ) => {
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
  }, [setAssessmentState]);

  const updateAssessmentData = useCallback((data: Partial<AssessmentState>) => {
    setAssessmentState(prev => ({ ...prev, ...data }));
  }, [setAssessmentState]);

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
  const handleGroupsApiCall = useCallback(async (requestData: InterestsApiRequest) => {
    try {
      const groupsResult = await handleApiCall(
        async () => {
          const response = await fetch('/api/get-groups-showcase', {
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
      throw error; // Re-throw for retry handling
    }
  }, [handleApiCall, updateAssessmentData]);

  // Follow-up questions API call - runs independently in background
  const handleFollowUpQuestionsApiCall = useCallback(async (requestData: InterestsApiRequest) => {
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
      throw error; // Re-throw for retry handling
    }
  }, [updateAssessmentData]);

  // API retry effect
  useEffect(() => {
    console.log('📄 Retry effect triggered. retryInfo:', retryInfo);
    console.log('📄 shouldRetry?', retryInfo.shouldRetry);
    if (!retryInfo.shouldRetry) {
      console.log('📄 No retry needed, exiting effect');
      return;
    }

    console.log('📄 Proceeding with retry execution...');
    const executeRetry = async () => {
      console.log(`🔄 Executing retry for ${retryInfo.retryType} API call with data:`, retryInfo.retryData);
      
      try {
        if (retryInfo.retryType === 'groups') {
          await handleGroupsApiCall(retryInfo.retryData);
          console.log('✅ Groups API retry completed successfully');
        } else if (retryInfo.retryType === 'followUpQuestions') {
          await handleFollowUpQuestionsApiCall(retryInfo.retryData);
          console.log('✅ Follow-up questions API retry completed successfully');
        }
        clearRetry();
      } catch (error) {
        console.error('❌ API retry failed:', error);
      }
    };

    executeRetry();
  }, [retryInfo, handleGroupsApiCall, handleFollowUpQuestionsApiCall, clearRetry]);

  // Interests submission handler - moves to next step immediately and awaits background API call
  const handleInterestsSubmission = async () => {
    const interests = assessmentState.interests.interests;
    if (interests.length < 3) return;

    // Move to next step immediately (synchronous)
    goToNextStep();
    
    // Wait for API call to complete in background
    await handleInterestsApiCall();
  };

  const goToNextStep = useCallback(() => {
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
  }, [assessmentState, updateAssessmentData]);

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
    <div className="space-y-6 md:px-2">
      {/* Restore Progress Prompt */}
      {showRestorePrompt && savedStateTimestamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Continue Your Assessment?
              </h3>
              <p className="text-gray-600 mb-4">
                We found your previous progress from{' '}
                {savedStateTimestamp?.toLocaleDateString()} at{' '}
                {savedStateTimestamp?.toLocaleTimeString()}.
              </p>
              
              {restorePromptInfo?.needsApiFallback && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Some data needs to be refreshed. We'll automatically retry any missing API calls.
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mb-6">
                Would you like to continue where you left off or start fresh?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRestoreProgress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Progress
                </button>
                <button
                  onClick={handleStartFresh}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Start Fresh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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