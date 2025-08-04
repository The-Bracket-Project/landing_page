// Assessment phases
export type AssessmentStep = 
  | 'interests-input'
  | 'self-description' 
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
  
  // Phase 2: Description
  selfDescription: string;
  
  // Phase 3: Group Selection
  availableGroups: InterestsGroups[][]; // From interests API (raw data)
  groupSelection: string[]; // Array of selected group descriptions
  
  // Phase 4: Personality Questions
  followUpQuestions: FollowUpQuestion[]; // From follow-up questions API
  personalityResponses: PersonalityResponseData[];
  personalityApiStatus: ApiStatus;
  requestId: string | null;
  
  // Phase 5: OCEAN Scores Computation
  oceanScores: OceanScore | null;
  oceanScoresApiStatus: ApiStatus;
  
  // Phase 6: Results
  generatedSummary: string | null;
  summaryApiStatus: ApiStatus;
  
  // Meta
  startTime: Date;
  completedSteps: AssessmentStep[];
}

export interface StepProps {
  onNext: () => void;
  onUpdateData: (data: Partial<AssessmentState>) => void;
  assessmentState: AssessmentState;
  isLastStep: boolean;
}

export interface InterestsStepProps extends StepProps {
  onSubmitInterests: () => Promise<void>;
}

export interface PersonalityQuestionsStepProps extends StepProps {
  onSubmitPersonalityData: () => Promise<void>;
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

export interface OceanScore {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface OceanScoresApiRequest {
  interests: string[];
  selfDescription: string;
  availableGroups: InterestsGroups[][];
  groupSelection: string[];
  followUpQuestions: FollowUpQuestion[];
  personalityResponses: PersonalityResponseData[];
}

export interface OceanScoresApiResponse {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}
