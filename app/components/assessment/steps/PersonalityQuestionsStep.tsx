import { useState, useEffect } from 'react';
import { StepProps, PersonalityResponseData, FollowUpOption } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function PersonalityQuestionsStep({ 
  onNext,
  onPrevious,
  onUpdateData,
  assessmentState
}: StepProps) {
  const { followUpQuestions, availableGroups } = assessmentState;

  // Determine total number of questions across both steps
  const groupQuestionCount = Math.min(5, availableGroups.length);
  const totalQuestions = groupQuestionCount + followUpQuestions.length;
  
  // State for managing question navigation and selections
  const [overallQuestionIndex, setOverallQuestionIndex] = useState(groupQuestionCount);
  const [questionResponses, setQuestionResponses] = useState<{[questionIndex: number]: PersonalityResponseData}>({});
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentQuestion = followUpQuestions[overallQuestionIndex - groupQuestionCount];

  // Handle option selection
  const handleOptionSelect = (option: FollowUpOption) => {
    if (!currentQuestion) return; // Safety check
    
    const response: PersonalityResponseData = {
      questionId: `${currentQuestion.target_ocean}_${currentQuestion.interest}_${overallQuestionIndex}`,
      answer: option.text,
      score: option.score // Store the full score array from the selected option
    };
    
    const newResponses = {
      ...questionResponses,
      [overallQuestionIndex]: response
    };
    
    setQuestionResponses(newResponses);
    
    // Update assessment state with all responses
    const allResponses = Object.values(newResponses);
    onUpdateData({
      personalityResponses: allResponses
    });
  };
  
  // Handle moving to next question with animation
  const handleNextQuestion = () => {
    if (overallQuestionIndex < totalQuestions - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setOverallQuestionIndex(overallQuestionIndex + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handlePrevQuestion = () => {
    if (overallQuestionIndex > groupQuestionCount) {
      setIsAnimating(true);
      setTimeout(() => {
        setOverallQuestionIndex(overallQuestionIndex - 1);
        setIsAnimating(false);
      }, 150);
    } else {
      onPrevious();
    }
  };
  
  // Handle continue (only show after last question)
  const handleContinue = () => {
    // Console log all responses at the end
    const allResponses = Object.values(questionResponses);
    console.log('Final personality responses:', allResponses);
    onNext();
  };
  
  // Check if user has answered current question
  const hasAnsweredCurrentQuestion = questionResponses[overallQuestionIndex] !== undefined;
  
  // Check if this is the last question
  const isLastQuestion = overallQuestionIndex === totalQuestions - 1;
  
  // Check if all questions have been answered
  const allQuestionsAnswered = Object.keys(questionResponses).length === followUpQuestions.length;

  // Initialize responses from assessment state when component mounts or state changes
  useEffect(() => {
    const initialResponses: {[index: number]: PersonalityResponseData} = {};
    assessmentState.personalityResponses.forEach(res => {
      const match = res.questionId.match(/_(\d+)$/);
      const idx = match ? parseInt(match[1], 10) : undefined;
      if (idx !== undefined) {
        initialResponses[idx] = res;
      }
    });
    setQuestionResponses(initialResponses);
    const lastIndex = Object.keys(initialResponses).map(Number).sort((a,b) => b - a)[0];
    if (lastIndex !== undefined) {
      setOverallQuestionIndex(Math.min(lastIndex, totalQuestions - 1));
    }
  }, [assessmentState.personalityResponses, totalQuestions, groupQuestionCount]);

  // Show message if no questions available or current question is invalid
  if (followUpQuestions.length === 0 || !currentQuestion) {
    return (
      <div className="space-y-6">
        <div className="text-center px-8">
          <p className="text-lg text-black/80 mb-4">
            No follow-up questions are available at this time.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Let&apos;s continue to see your results!
          </p>
        </div>
        
        <ContinueButton onClick={onNext}>
          See my results!
        </ContinueButton>
      </div>
    );
  }

  // Main questions UI
  return (
    <div className="space-y-6">
      <div className="text-center px-8">
        {/* <p className="text-lg text-black/80 mb-2">
          Based on your interests: <span className="font-semibold">{currentQuestion.interest}</span>
        </p> */}
        <p className="text-sm text-gray-600 mb-6">
          Question {overallQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      {/* Current Question Display */}
      <div className="w-full">
        <div className={`space-y-4 transition-all duration-200 ${isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          {/* Question */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-black mb-4">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optionIndex) => {
              const isSelected = questionResponses[overallQuestionIndex]?.answer === option.text;
              return (
                <div 
                  key={optionIndex}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-black bg-black text-white shadow-lg transform scale-[1.02]' 
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{option.text}</p>
                    {isSelected && (
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevQuestion}
          disabled={isAnimating}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        {!isLastQuestion && hasAnsweredCurrentQuestion ? (
          <button
            onClick={handleNextQuestion}
            disabled={isAnimating}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : isLastQuestion && allQuestionsAnswered ? (
          <ContinueButton onClick={handleContinue}>
            See my results!
          </ContinueButton>
        ) : (
          <div className="text-right w-full">
            <p className="text-sm text-gray-500">
              {isLastQuestion 
                ? "Select an option to continue" 
                : "Select an option to see the next question"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 