'use client';

import { useState, KeyboardEvent } from 'react';
import { StepProps } from '../types';

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
  onNext, 
  onUpdateData, 
  onApiCall, 
  assessmentState, 
  isLastStep 
}: StepProps) {
  const [interests, setInterests] = useState<string[]>(assessmentState.interests.interests);
  const [inputValue, setInputValue] = useState('');

  const handleAddPredefined = (interest: string) => {
    if (!interests.includes(interest)) {
      const newInterests = [...interests, interest];
      setInterests(newInterests);
      onUpdateData({ 
        interests: { interests: newInterests }
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const val: string = toTitleCase(inputValue.trim());
    if (e.key === 'Enter' && val && !assessmentState.interestsApiStatus.loading) {
      e.preventDefault();
      if (!interests.includes(val)) {
        const newInterests = [...interests, val];
        setInterests(newInterests);
        setInputValue('');
        onUpdateData({ 
          interests: { interests: newInterests }
        });
      }
    }
  };

  const handleRemove = (index: number) => {
    if (!assessmentState.interestsApiStatus.loading) {
      const newInterests = interests.filter((_, i) => i !== index);
      setInterests(newInterests);
      onUpdateData({ 
        interests: { interests: newInterests }
      });
    }
  };

  const handleContinue = async () => {
    if (interests.length < 3 || assessmentState.interestsApiStatus.loading) return;

    try {
      // Make API call using the orchestrator's API handler
      const result: any = await onApiCall(async () => {
        const response = await fetch('/api/interests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ interests }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save interests');
        }
        
        return await response.json();
      }, 'interestsApiStatus');

      // Store the available groups from API response for next step
      if (result?.data?.availableGroups) {
        onUpdateData({ 
          availableGroups: result.data.availableGroups 
        });
      }

      // Move to next step
      onNext();
    } catch (error) {
      console.error('Error saving interests:', error);
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
            disabled={assessmentState.interestsApiStatus.loading || interests.includes(interest)}
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
            onKeyDown={handleKeyDown}
            disabled={assessmentState.interestsApiStatus.loading}
            placeholder="e.g. Reading non fiction, casual football... it can be anything"
            className="w-full px-4 py-3 text-black border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-10"
          />
          {inputValue.trim() && !assessmentState.interestsApiStatus.loading && (
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
          <p className="text-gray-500 text-center">Enter your interests and press Enter or select from the list</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg shadow-sm border"
              >
                <span className="text-sm">{interest}</span>
                <button
                  onClick={() => handleRemove(index)}
                  disabled={assessmentState.interestsApiStatus.loading}
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
      {assessmentState.interestsApiStatus.error && (
        <div className="text-center">
          <p className="text-red-600 text-sm">
            Error: {assessmentState.interestsApiStatus.error}
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={interests.length < 3 || assessmentState.interestsApiStatus.loading}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {assessmentState.interestsApiStatus.loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            `Continue to Self Description (${interests.length}/3+)`
          )}
        </button>
      </div>
    </div>
  );
} 