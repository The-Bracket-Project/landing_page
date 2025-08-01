import { useState } from 'react';
import { StepProps, PersonalityResponseData, FollowUpOption } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function PersonalityQuestionsStep({ 
  onNext, 
  onUpdateData, 
  assessmentState
}: StepProps) {
  const { followUpQuestions, personalityResponses } = assessmentState;
  
  // State for managing question navigation and selections
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionResponses, setQuestionResponses] = useState<{[questionIndex: number]: PersonalityResponseData}>({});
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentQuestion = followUpQuestions[currentQuestionIndex];
  const totalQuestions = followUpQuestions.length;
  
  // Handle option selection
  const handleOptionSelect = (option: FollowUpOption) => {
    if (!currentQuestion) return; // Safety check
    
    const response: PersonalityResponseData = {
      questionId: `${currentQuestion.target_ocean}_${currentQuestion.interest}_${currentQuestionIndex}`,
      answer: option.text,
      score: option.score // Store the full score array from the selected option
    };
    
    const newResponses = {
      ...questionResponses,
      [currentQuestionIndex]: response
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
    if (currentQuestionIndex < totalQuestions - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnimating(false);
      }, 150);
    }
  };
  
  // Handle moving to previous question with animation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsAnimating(false);
      }, 150);
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
  const hasAnsweredCurrentQuestion = questionResponses[currentQuestionIndex] !== undefined;
  
  // Check if this is the last question
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  // Check if all questions have been answered
  const allQuestionsAnswered = Object.keys(questionResponses).length === totalQuestions;

  // Show message if no questions available or current question is invalid
  if (followUpQuestions.length === 0 || !currentQuestion) {
    return (
      <div className="space-y-6">
        <div className="text-center px-8">
          <p className="text-lg text-black/80 mb-4">
            No follow-up questions are available at this time.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Let's continue to see your results!
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
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      {/* Current Question Display */}
      <div className="max-w-2xl mx-auto">
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
              const isSelected = questionResponses[currentQuestionIndex]?.answer === option.text;
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
      <div className="flex justify-center">
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
          <div className="text-center">
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