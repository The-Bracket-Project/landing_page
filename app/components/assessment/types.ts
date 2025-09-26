// Assessment phases
export type AssessmentStep = 
  | 'interests-input'
  | 'name-input' 
  | 'group-selection'
  | 'personality-questions'
  | 'results-summary';

// API-related types

export interface PersonalityResponseData {
  questionId: string;
  answer: string;
  score: Float16Array; // Score array from the selected option
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
  interests: string[];
  interestsApiStatus: ApiStatus;
  
  // Phase 2: Name collection
  userName: string;
  
  // Phase 3: Group Selection
  availableGroups: InterestsGroups[][]; // From interests API (raw data)
  groupSelection: string[]; // Array of selected group descriptions
  
  // Phase 4: Personality Questions
  followUpQuestions: FollowUpQuestion[]; // From follow-up questions API
  personalityResponses: PersonalityResponseData[];
  personalityApiStatus: ApiStatus;
  requestId: string | null;
  
  // Phase 5: Results
  generatedSummary: string | null;
  summaryApiStatus: ApiStatus;
  // Immediate results (if returned by backend)
  oceanScores?: Record<string, { score: number; level: string }> | null;
  
  // Meta
  startTime: Date;
  completedSteps: AssessmentStep[];
}

export interface StepProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdateData: (data: Partial<AssessmentState>) => void;
  assessmentState: AssessmentState;
  isLastStep: boolean;
}

export interface InterestsStepProps extends StepProps {
  onSubmitInterests: () => Promise<void>;
} 

// Groups interface (raw API data)
export interface InterestsGroups {
  description: string;
  target_ocean: string;
  ocean_score: string;
}

export interface InterestsApiRequest {
  interests: string[];
}

export interface InterestsApiResponse {
  groups: InterestsGroups[][]; // Raw API data
}

export interface FollowUpOption {
  text: string;
  score: Float16Array;
}

export interface FollowUpQuestion {
  target_ocean: string;
  interest: string;
  question: string;
  options: FollowUpOption[];
}

export interface FollowUpQuestionsReponse {
  questions: FollowUpQuestion[];
}
