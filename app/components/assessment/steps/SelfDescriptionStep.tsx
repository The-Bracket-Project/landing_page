'use client';

import { useState } from 'react';
import { StepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function SelfDescriptionStep({ 
  onNext, 
  onUpdateData, 
  assessmentState
}: StepProps) {
  const [description, setDescription] = useState(assessmentState.selfDescription || '');
  const personalityDescriptionMaxLength = 1024;

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= personalityDescriptionMaxLength) {
      setDescription(value);
      onUpdateData({ selfDescription: value });
    }
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center px-2 md:px-6">
        <p className="text-sm md:text-md text-black/80 mb-6">
          Tell us about yourself - your personality and what makes you unique. No personal details needed. Thoughtful responses help us connect you with real people who truly understand you, not just another screen.
        </p>
      </div>

      {/* Text Area */}
      <div className="mx-2 md:mx-6">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          maxLength={personalityDescriptionMaxLength}
          placeholder="Be free and honest... "
          className="bg-white w-full h-55 px-4 py-3 text-black border border-gray-300 text-base rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none leading-relaxed tracking-wide"
          style={{ fontFamily: '"Playfair Display", "Georgia", "Times New Roman", "Baskerville", serif', fontStyle: 'italic' }}
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">
            {description.length}/{personalityDescriptionMaxLength}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <ContinueButton onClick={handleContinue}>
        Continue
      </ContinueButton>
    </div>
  );
} 