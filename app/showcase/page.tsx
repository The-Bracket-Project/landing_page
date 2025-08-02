import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PersonalityAssessment from "../components/PersonalityAssessment";

export default function Showcase() {
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
                    <div className="flex flex-col items-center justify-center min-h-full">
                        <div 
                            className="rounded-3xl p-4 md:p-6 w-full sm:w-4xl mx-auto"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.37), 0 0 0 4px rgba(255, 255, 255, 0.18)',
                            }}
                        >
                            <PersonalityAssessment />
                        </div>
                        
                        <p className="text-center text-sm text-white/70 mt-4 mb-10">
                            ⚠️ Please don&apos;t refresh the page during the assessment - your progress will be lost
                        </p>
                    </div>
                </main>

                <div className="max-w-6xl md:px-6 lg:px-8">
                    <Footer />
                </div>
            </div>
        </div>
    )
}