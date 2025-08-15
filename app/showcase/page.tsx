'use client';

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PersonalityAssessment from "../components/PersonalityAssessment";

const CORRECT_PASSWORD = '25BR2021ACKET*';

export default function Showcase() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedAuth = sessionStorage.getItem('showcase-auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('showcase-auth', 'true');
            setError('');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center"
                style={{
                    background: "linear-gradient(to bottom, #E1F4F4 0%, #000000 60%)"
                }}
            >
                <div 
                    className="rounded-3xl p-8 max-w-md w-full mx-4"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.37), 0 0 0 4px rgba(255, 255, 255, 0.18)',
                    }}
                >
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Access Protected Content
                    </h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="mb-4 text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Access Showcase
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    return (
        <div 
            className="min-h-screen"
            style={{
                background: "linear-gradient(to bottom, #E1F4F4 0%, #000000 60%)"
            }}
        >
            <Navbar />
            
            <div className="flex flex-col min-h-[calc(100vh-80px)] max-w-6xl px-4 sm:px-6 md:px-8 justify-between mx-auto">
                <main className="flex-1 mx-auto pt-10">
                    <div className="items-center justify-center min-h-full">
                        <div 
                            className="rounded-3xl p-4 md:p-6 lg:w-4xl md: mx-auto"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.37), 0 0 0 4px rgba(255, 255, 255, 0.18)',
                            }}
                        >
                            <PersonalityAssessment />
                        </div>
                        
                        {/* <p className="text-center text-sm text-white/70 mt-4 mb-10">
                            ⚠️ Please don&apos;t refresh the page during the assessment - your progress will be lost
                        </p> */}
                    </div>
                </main>

                <div className="max-w-6xl pt-10 md:px-6 lg:px-8">
                    <Footer />
                </div>
            </div>
        </div>
    )
}