'use client';

import { useState, KeyboardEvent } from 'react';
import { InterestsStepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

// Predefined interests for quick selection
const predefinedInterests = [
  'Reading', 'Writing', 'Cooking', 'Gaming', 'Music', 'Sports', 'Travel', 
  'Photography', 'Art', 'Fitness', 'Movies', 'Dancing', 'Hiking', 'Gardening',
  'Coding', 'Drawing', 'Swimming', 'Yoga', 'Running', 'Cycling'
];

// Utility function to convert to title case
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ''
    )
    .join(' ');
}

export default function InterestsInputStep({ 
  onUpdateData, 
  assessmentState, 
  onSubmitInterests
}: InterestsStepProps) {
  const [interests, setInterests] = useState<string[]>(assessmentState.interests);
  const [inputValue, setInputValue] = useState('');
  
  // Get loading and error state from the orchestrator
  const { loading, error } = assessmentState.interestsApiStatus;

/* The three functions below used to handle updating AssessmentOrchestrator.tsx state */
  const handleAddPredefined = (interest: string) => {
    if (!interests.includes(interest)) {
      const newInterests = [...interests, interest];
      setInterests(newInterests);
      onUpdateData({ 
        interests: newInterests
      });
    }
  };

  const handleAddTyped = (e: KeyboardEvent<HTMLInputElement>) => {
    const val: string = toTitleCase(inputValue.trim());
    if (e.key === 'Enter' && val && !loading) {
      e.preventDefault();
      if (!interests.includes(val)) {
        const newInterests = [...interests, val];
        setInterests(newInterests);
        setInputValue('');
        onUpdateData({ 
          interests: newInterests
        });
      }
    }
  };

  const handleRemove = (index: number) => {
    if (!loading) {
      const newInterests = interests.filter((_, i) => i !== index);
      setInterests(newInterests);
      onUpdateData({ 
        interests: newInterests
      });
    }
  };

  const handleContinue = async () => {
    if (interests.length < 3 || loading) return;

    try {
      // Trigger immediate navigation and await background API call through the orchestrator
      await onSubmitInterests();
    } catch (error) {
      console.error('Error during interests submission:', error);
      // Error is handled by orchestrator, but we could add component-specific handling here if needed
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center px-8">
        <p className="text-lg text-black/80 mb-6">
          Enter 3 or more hobbies, interests, or activities that you enjoy outside of work.
        </p>
      </div>

      {/* Predefined Interests */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {predefinedInterests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => handleAddPredefined(interest)}
            disabled={loading || interests.includes(interest)}
            className="px-3 py-1.5 rounded-full text-sm border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {interest}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTyped}
            disabled={loading}
            placeholder="Or type it in here!"
            className="w-full px-4 py-3 text-black border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-10 bg-white"
          />
          {inputValue.trim() && !loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12h12" />
                <path d="m12 6 6 6-6 6" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Interest List */}
      <div className="min-h-[100px] bg-gray-50 rounded-xl p-4 max-w-2xl mx-auto">
        {interests.length === 0 ? (
          <p className="text-gray-500 text-center">Choose from our predefined list or type in your own, they will appear here</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-lg shadow-sm border"
              >
                <span className="text-sm">{interest}</span>
                <button
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-center">
          <p className="text-red-600 text-sm">
            Error: {error}
          </p>
        </div>
      )}

      {/* Continue Button */}
      <ContinueButton
        onClick={handleContinue}
        disabled={interests.length < 3}
        loading={loading}
      >
        {loading 
          ? "Saving..." 
          : `Continue (${interests.length}/3+)`
        }
      </ContinueButton>
    </div>
  );
} 