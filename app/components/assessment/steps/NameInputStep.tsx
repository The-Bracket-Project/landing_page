'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { StepProps } from '../types';
import ContinueButton from '../shared/ContinueButton';

export default function NameInputStep({
  onNext,
  onUpdateData,
  assessmentState
}: StepProps) {
  const [name, setName] = useState(assessmentState.userName || '');

  useEffect(() => {
    setName(assessmentState.userName || '');
  }, [assessmentState.userName]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 120) return;
    setName(value);
    onUpdateData({ userName: value });
  };

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onUpdateData({ userName: trimmed });
    onNext();
  };

  const isInvalid = name.trim().length === 0;

  return (
    <div className="space-y-6">
      <div className="text-center px-2 md:px-6 space-y-3">
        <p className="text-sm md:text-md text-black/80">
          Let us know what to call you. We&apos;ll use your name to personalize the demo experience and keep track of your results.
        </p>
      </div>

      <div className="mx-2 md:mx-6">
        <label className="block text-sm font-medium text-black/80 mb-2" htmlFor="assessment-name">
          Preferred name
        </label>
        <input
          id="assessment-name"
          value={name}
          onChange={handleChange}
          placeholder="e.g. Alex"
          className="bg-white w-full px-4 py-3 text-black border border-gray-300 text-base rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          autoComplete="name"
        />
        <p className="text-xs text-gray-500 mt-2">
          You can use a nickname if you prefer. This is only used inside the demo environment.
        </p>
      </div>

      <ContinueButton onClick={handleContinue} disabled={isInvalid}>
        Continue
      </ContinueButton>
    </div>
  );
}
