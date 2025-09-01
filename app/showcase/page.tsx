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
            <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
                <Navbar />
                <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12 flex items-center justify-center">
                    <div className="rounded-2xl p-8 max-w-md w-full mx-4 shadow-sm" style={{ background: 'white', border: '1px solid rgba(33,61,97,0.08)' }}>
                        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--brand-k)' }}>
                            Access Protected Content
                        </h1>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-text)' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white text-gray-900 placeholder-gray-500"
                                    style={{ borderColor: 'rgba(33,61,97,0.2)' , outline: 'none' }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-accent)')}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(33,61,97,0.2)')}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            {error && (
                                <div className="mb-4 text-sm text-center" style={{ color: '#842029' }}>
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full text-white font-semibold py-2.5 px-4 rounded-full transition duration-200 shadow"
                                style={{ background: 'var(--brand-accent)' }}
                            >
                                Access Showcase
                            </button>
                        </form>
                    </div>
                </main>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <Footer />
                </div>
            </div>
        );
    }
    return (
            <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
            <Navbar />
            
            <div className="flex flex-col min-h-[calc(100vh-80px)] max-w-6xl px-4 sm:px-6 md:px-8 justify-between mx-auto">
                <main className="flex-1 mx-auto pt-10">
                    <div className="items-center justify-center min-h-full">
                        <div className="rounded-3xl p-4 md:p-6 lg:w-4xl md: mx-auto" style={{ background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.06)', border: '1px solid rgba(33,61,97,0.08)' }}>
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
