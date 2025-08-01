// Assessment phases
export type AssessmentStep = 
  | 'interests-input'
  | 'self-description' 
  | 'group-selection'
  | 'personality-questions'
  | 'results-summary';

// API-related types
export interface InterestsData {
  interests: string[];
  categories?: string[];
}

export interface GroupSelectionData {
  selectedGroups: string[];
  groupScores?: Record<string, number>;
}

export interface PersonalityResponseData {
  questionId: string;
  answer: string;
  weight?: number;
}

export interface ApiStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Main assessment state
export interface AssessmentState {
  currentStep: AssessmentStep;
  
  // Phase 1: Interests
  interests: InterestsData;
  interestsApiStatus: ApiStatus;
  
  // Phase 2: Description
  selfDescription: string;
  
  // Phase 3: Group Selection
  availableGroups: string[]; // From interests API
  groupSelection: GroupSelectionData;
  
  // Phase 4: Personality Questions
  personalityResponses: PersonalityResponseData[];
  personalityApiStatus: ApiStatus;
  
  // Phase 5: Results
  generatedSummary: string | null;
  summaryApiStatus: ApiStatus;
  
  // Meta
  startTime: Date;
  completedSteps: AssessmentStep[];
}

export interface StepProps {
  onNext: () => void;
  onUpdateData: (data: Partial<AssessmentState>) => void;
  onApiCall: <T>(apiCall: () => Promise<T>, statusKey: keyof AssessmentState) => Promise<T>;
  assessmentState: AssessmentState;
  isLastStep: boolean;
} 

export interface InterestsGroups {
  description: string;
  target_ocean: string;
  ocean_score: string;
}

export interface InterestsApiRequest {
  interests: string[];
}

export interface InterestsApiResponse {
  groups: InterestsGroups[][];
}
