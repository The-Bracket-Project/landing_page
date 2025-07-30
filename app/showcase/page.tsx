import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PersonalityAssessment from "../components/PersonalityAssessment";

export default function Showcase() {
    return (
        <div
            className="min-h-screen"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #E1F4F4 0%, #000000 60%)"
            }}
        >
            <Navbar />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                <div className="flex items-start justify-start min-h-screen px-4 pt-20">
                    <div 
                        className="rounded-3xl p-8 max-w-4xl w-full mx-auto min-h-140"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.37), 0 0 0 4px rgba(255, 255, 255, 0.18)',
                        }}
                    >
                        <PersonalityAssessment />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}