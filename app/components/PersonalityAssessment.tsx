'use client';

import { useState } from 'react';
import AssessmentOrchestrator from './assessment/AssessmentOrchestrator';

export default function PersonalityAssessment() {
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true);
    };

    return (
        <div className="space-y-8">
            {!isStarted ? (
                <>
                    {/* Introduction Section */}
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                            Try Our Personality Assessment
                        </h1>
                        <div className="space-y-4 text-black/80">
                            <p className="text-lg md:text-xl">
                                Discover your unique personality traits and gain insights into your behavioral patterns.
                            </p>
                            <p className="text-base md:text-lg">
                                This modern personality assessment goes beyond traditional methods to provide deeper insights 
                                into who you are. Using advanced techniques, we analyze your unique patterns and preferences 
                                to create a more accurate and comprehensive personality profile.
                            </p>
                            <p className="text-sm md:text-base text-black/70">
                                Answer honestly for the most accurate results. There are no right or wrong answers.
                            </p>
                        </div>
                    </div>

                    {/* Animated Start Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleStart}
                            className="group relative px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                        >
                            <span className="relative z-10">
                                Begin Assessment
                            </span>
                            
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Pulse animation */}
                            <div className="absolute inset-0 rounded-full bg-black animate-pulse"></div>
                            
                            {/* Ripple effect */}
                            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
                        </button>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-xl">🧠</span>
                            </div>
                            <h3 className="font-semibold text-black">Deep Insights</h3>
                            <p className="text-sm text-black/70">Comprehensive personality analysis</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-xl">⚡</span>
                            </div>
                            <h3 className="font-semibold text-black">Quick & Easy</h3>
                            <p className="text-sm text-black/70">Takes only 3-6 minutes</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-xl">🔬</span>
                            </div>
                            <h3 className="font-semibold text-black">Contribute to Research</h3>
                            <p className="text-sm text-black/70">Anonymous data helps advance understanding</p>
                        </div>
                    </div>
                </>
            ) : (
                // Assessment Started - Use the new orchestrator
                <AssessmentOrchestrator />
            )}
        </div>
    );
} 