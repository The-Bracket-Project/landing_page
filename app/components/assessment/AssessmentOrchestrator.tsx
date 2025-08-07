'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { AssessmentState, AssessmentStep, InterestsApiRequest, InterestsApiResponse} from './types';
import { useAssessmentStorage } from '../../hooks/useAssessmentStorage';
import ProgressBar from './shared/ProgressBar';
import InterestsInputStep from './steps/InterestsInputStep';
import SelfDescriptionStep from './steps/SelfDescriptionStep';
import GroupSelectionStep from './steps/GroupSelectionStep';
import PersonalityQuestionsStep from './steps/PersonalityQuestionsStep';
import ResultsSummaryStep from './steps/ResultsSummaryStep';

export default function AssessmentOrchestrator() {
  const initialState: AssessmentState = {
    currentStep: 'interests-input',
    interests: [],
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

  const steps: AssessmentStep[] = useMemo(() => [
    'interests-input',
    'self-description', 
    'group-selection',
    'personality-questions',
    'results-summary'
  ], []);

  // Handle state restoration with API fallback logic - simple placeholder
  const handleStateRestore = useCallback((
    state: AssessmentState, 
    fallbackInfo?: { reason: string; needsApiFallback: boolean }
  ) => {
    // Store fallback info for useEffect to handle
    if (fallbackInfo?.needsApiFallback) {
      // Mark that we need to run fallbacks
      sessionStorage.setItem('needsApiFallback', JSON.stringify({ state, fallbackInfo }));
    }
  }, []);

  const {
    assessmentState,
    setAssessmentState,
    showRestorePrompt,
    savedStateTimestamp,
    restorePromptInfo,
    handleRestoreProgress,
    handleStartFresh,
  } = useAssessmentStorage({
    initialState,
    onStateRestore: handleStateRestore,
    autoSave: true
  });

  // Generic API call handler
  const handleApiCall = useCallback(async (
    apiCall: () => Promise<unknown>, 
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
    const interests = assessmentState.interests;
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
          const response = await fetch('/api/groups', {
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
      const typedResult = groupsResult as InterestsApiResponse;
      if (typedResult?.groups) {
        updateAssessmentData({ 
          availableGroups: typedResult.groups
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
      const followUpResult = await fetch('/api/followup', {
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

  // Generate summary API call - triggered when moving to results step
  const handleGenerateSummaryApiCall = useCallback(async () => {
    try {
      const result = await handleApiCall(
        async () => {
          const response = await fetch('/api/generate-summary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              interests: assessmentState.interests,
              selfDescription: assessmentState.selfDescription,
              availableGroups: assessmentState.availableGroups,
              groupSelection: assessmentState.groupSelection,
              followUpQuestions: assessmentState.followUpQuestions,
              personalityResponses: assessmentState.personalityResponses
            }),
          });

          if (!response.ok) {
            throw new Error(`Summary generation failed: ${response.status} ${response.statusText}`);
          }

          return response.json();
        },
        'summaryApiStatus'
      );

      // Store the generated summary
      const typedResult = result as { summary?: string };
      if (typedResult?.summary) {
        updateAssessmentData({ 
          generatedSummary: typedResult.summary
        });
      }
    } catch (error) {
      console.error('Error with generate summary API:', error);
      throw error; // Re-throw for retry handling
    }
  }, [handleApiCall, updateAssessmentData, assessmentState.interests, assessmentState.selfDescription, assessmentState.availableGroups, assessmentState.groupSelection, assessmentState.followUpQuestions, assessmentState.personalityResponses]);

  // State restoration fallback logic - runs after API handlers are defined
  const executeStateRestorationFallbacks = useCallback((
    state: AssessmentState, 
    fallbackInfo?: { reason: string; needsApiFallback: boolean }
  ) => {
    if (fallbackInfo?.needsApiFallback) {
      // Execute API retries directly (not through queue) to handle multiple missing APIs
      const requestData = { interests: state.interests };
      
      // Check if groups are missing and user has interests
      if (state.availableGroups.length === 0 && state.interests.length >= 3) {
        handleGroupsApiCall(requestData).catch(error => {
          console.error('Groups API retry failed during restoration:', error);
        });
      }
      
      // Check if follow-up questions are missing and user has interests  
      if (state.followUpQuestions.length === 0 && state.interests.length >= 3) {
        handleFollowUpQuestionsApiCall(requestData).catch(error => {
          console.error('Follow-up questions API retry failed during restoration:', error);
        });
      }

      // Check if summary is missing and user is on results step with complete data
      if (!state.generatedSummary && state.currentStep === 'results-summary' && 
          state.personalityResponses.length > 0) {
        handleGenerateSummaryApiCall().catch(error => {
          console.error('Generate summary API retry failed during restoration:', error);
        });
      }
    }
  }, [handleGroupsApiCall, handleFollowUpQuestionsApiCall, handleGenerateSummaryApiCall]);

  // Handle API fallbacks on component mount if needed
  useEffect(() => {
    const fallbackData = sessionStorage.getItem('needsApiFallback');
    if (fallbackData) {
      try {
        const { state, fallbackInfo } = JSON.parse(fallbackData);
        executeStateRestorationFallbacks(state, fallbackInfo);
        sessionStorage.removeItem('needsApiFallback');
      } catch (error) {
        console.error('Error handling API fallbacks:', error);
        sessionStorage.removeItem('needsApiFallback');
      }
    }
  }, [executeStateRestorationFallbacks]);

  // Interests submission handler - moves to next step immediately and awaits background API call
  const handleInterestsSubmission = async () => {
    const interests = assessmentState.interests;
    if (interests.length < 3) return;

    // Move to next step immediately (synchronous)
    goToNextStep();
    
    // Wait for API call to complete in background
    await handleInterestsApiCall();
  };

  const goToNextStep = useCallback(async () => {
    const currentIndex = steps.indexOf(assessmentState.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      
      // Console log all assessment data when moving from personality-questions to results-summary
      if (assessmentState.currentStep === 'personality-questions' && nextStep === 'results-summary') {
        console.log('Interests:', assessmentState.interests);
        console.log('Self Description:', assessmentState.selfDescription);
        console.log('Available Groups:', assessmentState.availableGroups);
        console.log('Selected Groups:', assessmentState.groupSelection);
        console.log('Follow-up Questions:', assessmentState.followUpQuestions);
        console.log('Personality Responses:', assessmentState.personalityResponses);
        
        // Trigger summary generation API call
        handleGenerateSummaryApiCall().catch(error => {
          console.error('Summary generation failed during step transition:', error);
          // Continue to results step even if summary generation fails
        });
      }
      
      updateAssessmentData({
        currentStep: nextStep,
        completedSteps: [...assessmentState.completedSteps, assessmentState.currentStep]
      });
    }
  }, [assessmentState, updateAssessmentData, steps, handleGenerateSummaryApiCall]);

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
                    ⚠️ Some data needs to be refreshed. We&apos;ll automatically retry any missing API calls.
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