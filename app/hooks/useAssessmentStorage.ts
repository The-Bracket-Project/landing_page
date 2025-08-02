// Custom hook for intelligent assessment state management with granular control

import { useState, useEffect, useCallback } from 'react';
import { AssessmentState } from '../components/assessment/types';
import { 
  loadValidatedAssessmentState, 
  saveValidatedAssessmentState, 
  clearAssessmentState,
  getSavedStateTimestamp,
  shouldSaveState 
} from '../utils/localStorage';

interface UseAssessmentStorageProps {
  initialState: AssessmentState;
  onStateRestore?: (state: AssessmentState, fallbackInfo?: { reason: string; needsApiFallback: boolean }) => void;
  autoSave?: boolean;
}

interface UseAssessmentStorageReturn {
  // State management
  assessmentState: AssessmentState;
  setAssessmentState: (state: AssessmentState | ((prev: AssessmentState) => AssessmentState)) => void;
  
  // Storage operations
  saveState: () => { success: boolean; reason?: string };
  clearSavedState: () => void;
  
  // Restoration
  showRestorePrompt: boolean;
  savedStateTimestamp: Date | null;
  restorePromptInfo: { needsApiFallback: boolean; fallbackReason?: string } | null;
  handleRestoreProgress: () => void;
  handleStartFresh: () => void;
  
  // Validation
  isStateValid: boolean;
  validationInfo: { isValid: boolean; missingData: string[] };
}

export function useAssessmentStorage({ 
  initialState, 
  onStateRestore,
  autoSave = true 
}: UseAssessmentStorageProps): UseAssessmentStorageReturn {
  
  const [assessmentState, setAssessmentStateInternal] = useState<AssessmentState>(initialState);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [savedStateTimestamp, setSavedStateTimestamp] = useState<Date | null>(null);
  const [restorePromptInfo, setRestorePromptInfo] = useState<{ 
    needsApiFallback: boolean; 
    fallbackReason?: string 
  } | null>(null);

  // Load saved state on mount
  useEffect(() => {
    const loadResult = loadValidatedAssessmentState();
    const timestamp = getSavedStateTimestamp();
    
    if (loadResult.state && timestamp) {
      setSavedStateTimestamp(timestamp);
      setRestorePromptInfo({
        needsApiFallback: loadResult.needsApiFallback,
        fallbackReason: loadResult.fallbackReason
      });
      setShowRestorePrompt(true);
    }
  }, []);

  // Auto-save when state changes (with validation)
  useEffect(() => {
    if (!autoSave) return;
    
    // Don't save initial state or invalid states
    const isInitialState = 
      assessmentState.currentStep === 'interests-input' && 
      assessmentState.completedSteps.length === 0 && 
      assessmentState.interests.interests.length === 0;
    
    console.log('💾 Auto-save check:', {
      currentStep: assessmentState.currentStep,
      interests: assessmentState.interests.interests.length,
      availableGroups: assessmentState.availableGroups.length,
      followUpQuestions: assessmentState.followUpQuestions.length,
      isInitialState,
      shouldSave: shouldSaveState(assessmentState)
    });
    
    if (!isInitialState && shouldSaveState(assessmentState)) {
      const saveResult = saveValidatedAssessmentState(assessmentState);
      if (!saveResult.success) {
        console.warn('❌ Auto-save failed:', saveResult.reason);
      } else {
        console.log('✅ Auto-save successful for step:', assessmentState.currentStep);
      }
    } else if (!isInitialState) {
      console.log('⏭️ Skipping auto-save (state not ready for current step)');
    }
  }, [assessmentState, autoSave]);

  // Enhanced state setter that provides more control
  const setAssessmentState = useCallback((
    state: AssessmentState | ((prev: AssessmentState) => AssessmentState)
  ) => {
    setAssessmentStateInternal(prevState => {
      const newState = typeof state === 'function' ? state(prevState) : state;
      return newState;
    });
  }, []);

  // Manual save function
  const saveState = useCallback(() => {
    return saveValidatedAssessmentState(assessmentState);
  }, [assessmentState]);

  // Clear saved state
  const clearSavedState = useCallback(() => {
    clearAssessmentState();
  }, []);

  // Handle restore progress
  const handleRestoreProgress = useCallback(() => {
    const loadResult = loadValidatedAssessmentState();
    
    if (loadResult.state) {
      setAssessmentState(loadResult.state);
      
      // Notify parent component about restoration
      if (onStateRestore) {
        onStateRestore(
          loadResult.state, 
          loadResult.needsApiFallback ? {
            reason: loadResult.fallbackReason || 'Unknown fallback reason',
            needsApiFallback: loadResult.needsApiFallback
          } : undefined
        );
      }
    }
    
    setShowRestorePrompt(false);
  }, [onStateRestore, setAssessmentState]);

  // Handle start fresh
  const handleStartFresh = useCallback(() => {
    clearAssessmentState();
    setAssessmentState(initialState);
    setShowRestorePrompt(false);
  }, [initialState, setAssessmentState]);

  // Validation info
  const validationInfo = (() => {
    try {
      const { validateStepDataIntegrity } = require('../utils/localStorage');
      const validation = validateStepDataIntegrity(assessmentState);
      return {
        isValid: validation.isValid,
        missingData: validation.missingData
      };
    } catch {
      return { isValid: true, missingData: [] };
    }
  })();

  return {
    // State management
    assessmentState,
    setAssessmentState,
    
    // Storage operations
    saveState,
    clearSavedState,
    
    // Restoration
    showRestorePrompt,
    savedStateTimestamp,
    restorePromptInfo,
    handleRestoreProgress,
    handleStartFresh,
    
    // Validation
    isStateValid: validationInfo.isValid,
    validationInfo
  };
}

// Additional utility hook for API retry logic
export function useApiRetry() {
  const [retryInfo, setRetryInfo] = useState<{
    shouldRetry: boolean;
    retryType: 'groups' | 'followUpQuestions' | null;
    retryData: any;
  }>({
    shouldRetry: false,
    retryType: null,
    retryData: null
  });

  const scheduleRetry = useCallback((
    type: 'groups' | 'followUpQuestions',
    data: any
  ) => {
    console.log('🎯 scheduleRetry called:', { type, data });
    setRetryInfo({
      shouldRetry: true,
      retryType: type,
      retryData: data
    });
    console.log('🎯 Retry scheduled - retryInfo updated');
  }, []);

  const clearRetry = useCallback(() => {
    console.log('🧹 clearRetry called - clearing retry info');
    setRetryInfo({
      shouldRetry: false,
      retryType: null,
      retryData: null
    });
  }, []);

  return {
    retryInfo,
    scheduleRetry,
    clearRetry
  };
}