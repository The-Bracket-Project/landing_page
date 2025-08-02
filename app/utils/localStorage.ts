// localStorage utility for assessment state persistence

import { AssessmentState, AssessmentStep } from '../components/assessment/types';

const STORAGE_KEY = 'bracket-assessment-state';
const STORAGE_VERSION = '1.0';

interface SerializedState extends Omit<AssessmentState, 'startTime' | 'personalityResponses'> {
  startTime: string; // Serialized as ISO string
  personalityResponses: Array<{
    questionId: string;
    answer: string;
    score: number[]; // Float16Array serialized as regular array
  }>;
  _version: string;
  _timestamp: string;
}

/**
 * Serialize AssessmentState for localStorage storage
 */
function serializeState(state: AssessmentState): SerializedState {
  return {
    ...state,
    startTime: state.startTime.toISOString(),
    personalityResponses: state.personalityResponses.map(response => ({
      ...response,
      score: Array.from(response.score) // Convert Float16Array to regular array
    })),
    _version: STORAGE_VERSION,
    _timestamp: new Date().toISOString()
  };
}

/**
 * Deserialize stored data back to AssessmentState
 */
function deserializeState(serialized: SerializedState): AssessmentState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _version, _timestamp, ...stateData } = serialized;
  
  return {
    ...stateData,
    startTime: new Date(stateData.startTime),
    personalityResponses: stateData.personalityResponses.map(response => ({
      ...response,
      score: new Float16Array(response.score) // Convert back to Float16Array
    }))
  };
}

/**
 * Save assessment state to localStorage
 */
export function saveAssessmentState(state: AssessmentState): boolean {
  try {
    const serialized = serializeState(state);
    const jsonString = JSON.stringify(serialized);
    localStorage.setItem(STORAGE_KEY, jsonString);
    return true;
  } catch (error) {
    console.error('Failed to save assessment state:', error);
    return false;
  }
}

/**
 * Load assessment state from localStorage
 */
export function loadAssessmentState(): AssessmentState | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return null;
    }

    const parsed = JSON.parse(storedData) as SerializedState;
    
    // Check version compatibility
    if (parsed._version !== STORAGE_VERSION) {
      console.warn('Assessment state version mismatch, clearing storage');
      clearAssessmentState();
      return null;
    }

    // Check if data is too old (optional - e.g., 7 days)
    const savedTime = new Date(parsed._timestamp);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (savedTime < sevenDaysAgo) {
      console.info('Assessment state too old, clearing storage');
      clearAssessmentState();
      return null;
    }

    return deserializeState(parsed);
  } catch (error) {
    console.error('Failed to load assessment state:', error);
    clearAssessmentState(); // Clear corrupted data
    return null;
  }
}

/**
 * Clear assessment state from localStorage
 */
export function clearAssessmentState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear assessment state:', error);
  }
}

/**
 * Check if there's a saved assessment state
 */
export function hasSavedState(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Get the creation time of saved state (useful for showing user when they last saved)
 */
export function getSavedStateTimestamp(): Date | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;
    
    const parsed = JSON.parse(storedData) as SerializedState;
    return new Date(parsed._timestamp);
  } catch {
    return null;
  }
}

// Hook for detecting localStorage quota exceeded
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if the current step has all required data dependencies
 */
export function validateStepDataIntegrity(state: AssessmentState): {
  isValid: boolean;
  suggestedStep: AssessmentStep;
  missingData: string[];
} {
  const missingData: string[] = [];
  let suggestedStep: AssessmentStep = state.currentStep;

  switch (state.currentStep) {
    case 'interests-input':
      // No dependencies
      break;

    case 'self-description':
      // No API dependencies, just check if interests are present
      if (!state.interests.interests || state.interests.interests.length < 3) {
        missingData.push('interests');
        suggestedStep = 'interests-input';
      }
      break;

    case 'group-selection':
      // Requires availableGroups from groups API
      if (!state.interests.interests || state.interests.interests.length < 3) {
        missingData.push('interests');
        suggestedStep = 'interests-input';
      } else if (!state.availableGroups || state.availableGroups.length === 0) {
        missingData.push('availableGroups');
        suggestedStep = 'self-description'; // Fall back to previous step
      }
      break;

    case 'personality-questions':
      // Requires followUpQuestions from follow-up questions API
      if (!state.interests.interests || state.interests.interests.length < 3) {
        missingData.push('interests');
        suggestedStep = 'interests-input';
      } else if (!state.availableGroups || state.availableGroups.length === 0) {
        missingData.push('availableGroups');
        suggestedStep = 'self-description';
      } else if (!state.followUpQuestions || state.followUpQuestions.length === 0) {
        missingData.push('followUpQuestions');
        suggestedStep = 'group-selection'; // Fall back to previous step
      }
      break;

    case 'results-summary':
      // Requires completed personality responses and requestId
      if (!state.interests.interests || state.interests.interests.length < 3) {
        missingData.push('interests');
        suggestedStep = 'interests-input';
      } else if (!state.availableGroups || state.availableGroups.length === 0) {
        missingData.push('availableGroups');
        suggestedStep = 'self-description';
      } else if (!state.followUpQuestions || state.followUpQuestions.length === 0) {
        missingData.push('followUpQuestions');
        suggestedStep = 'group-selection';
      } else if (!state.personalityResponses || state.personalityResponses.length === 0) {
        missingData.push('personalityResponses');
        suggestedStep = 'personality-questions';
      } else if (!state.requestId) {
        missingData.push('requestId');
        suggestedStep = 'personality-questions';
      }
      break;
  }

  return {
    isValid: missingData.length === 0,
    suggestedStep,
    missingData
  };
}

/**
 * Safely loads and validates assessment state, falling back to appropriate step if needed
 */
export function loadValidatedAssessmentState(): {
  state: AssessmentState | null;
  needsApiFallback: boolean;
  fallbackReason?: string;
} {
  const state = loadAssessmentState();
  
  if (!state) {
    return { state: null, needsApiFallback: false };
  }

  const validation = validateStepDataIntegrity(state);
  
  if (validation.isValid) {
    return { state, needsApiFallback: false };
  }

  // Data integrity issue - need to fall back
  const fallbackState: AssessmentState = {
    ...state,
    currentStep: validation.suggestedStep,
    // Reset completed steps to only include steps before the fallback step
    completedSteps: getCompletedStepsUpTo(validation.suggestedStep)
  };

  const fallbackReason = `Missing data: ${validation.missingData.join(', ')}. Falling back to ${validation.suggestedStep} step.`;

  return {
    state: fallbackState,
    needsApiFallback: true,
    fallbackReason
  };
}

/**
 * Get completed steps up to a specific step (exclusive)
 */
function getCompletedStepsUpTo(targetStep: AssessmentStep): AssessmentStep[] {
  const allSteps: AssessmentStep[] = [
    'interests-input',
    'self-description',
    'group-selection',
    'personality-questions',
    'results-summary'
  ];

  const targetIndex = allSteps.indexOf(targetStep);
  return allSteps.slice(0, Math.max(0, targetIndex));
}

/**
 * Determines if state should be saved based on data integrity
 */
export function shouldSaveState(state: AssessmentState): boolean {
  // We should save as long as the user has made meaningful progress
  // Don't validate future steps - only current step requirements
  return validateCurrentStepOnly(state);
}

/**
 * Validates only the current step's minimum requirements (not future dependencies)
 */
function validateCurrentStepOnly(state: AssessmentState): boolean {
  switch (state.currentStep) {
    case 'interests-input':
      return true; // Always save interests step
      
    case 'self-description':
      // Only requires interests (no API dependencies)
      return state.interests.interests && state.interests.interests.length >= 3;
      
    case 'group-selection':
      // Requires interests - but we'll save even if availableGroups is missing
      // (will be handled by retry logic on restore)
      return state.interests.interests && state.interests.interests.length >= 3;
      
    case 'personality-questions':
      // Requires interests - but we'll save even if followUpQuestions is missing
      // (will be handled by retry logic on restore)
      return state.interests.interests && state.interests.interests.length >= 3;
      
    case 'results-summary':
      // Only save if we actually have responses (this step should be complete)
      return state.personalityResponses && state.personalityResponses.length > 0;
      
    default:
      return false;
  }
}

/**
 * Save state with validation
 */
export function saveValidatedAssessmentState(state: AssessmentState): {
  success: boolean;
  reason?: string;
} {
  if (!shouldSaveState(state)) {
    const validation = validateStepDataIntegrity(state);
    return {
      success: false,
      reason: `Cannot save invalid state: missing ${validation.missingData.join(', ')}`
    };
  }

  const success = saveAssessmentState(state);
  return {
    success,
    reason: success ? undefined : 'localStorage save failed'
  };
}