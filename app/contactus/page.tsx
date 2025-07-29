"use client";
import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

export default function ContactUs() {
  const [isHovering, setIsHovering] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        form.reset(); // Clear the form
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
    }
  };
  return (
    <>
      <style jsx global>{`
        @keyframes flowingGradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 400% 0%;
          }
        }
      `}</style>
      
      <div
        className="min-h-screen"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom, #ffffff 0%, #8C7A48 30%, #000000 60%)",
        }}
      >
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center py-10  px-4">
          <p
            className={`text-5xl md:text-6xl lg:text-6xl text-center font-semibold poppins`}
            style={{ color: "#000000" }}
          >
            Get In Touch With Us
          </p>
          <p
            className={`text-3xl md:text-4xl lg:text-5xl text-center font-semibold poppins`}
          >
            Enquiries and Collaborations
          </p>
        </div>
        <div className="max-w-2xl mx-auto p-8 mb-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                <p className="font-medium">✅ {submitMessage}</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                <p className="font-medium">❌ {submitMessage}</p>
              </div>
            )}

            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-white-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-black-400"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="company" 
                className="block text-sm font-medium text-white-700 mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your company or organization"
                className="w-full px-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-black-400"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-white-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-black-400"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-white-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project, questions, or how we can help you..."
                className="w-full px-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-black-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-3 px-6 rounded-lg focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #2563eb 0%, #0891b2 25%, #2563eb 50%, #0891b2 75%, #2563eb 100%)',
                backgroundSize: '400% 100%',
                backgroundPosition: '0% 0%',
                animation: isHovering ? 'flowingGradient 3s linear infinite' : 'none'
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Send Message
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
    </>
  );
}
