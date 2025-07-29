import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Showcase() {
    return (
        <div
            className="min-h-screen bg-gray-900"
            style={{
                minHeight: "100vh",
            }}
        >
            <Navbar />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-center min-h-screen px-4 py-20">
                    <div 
                        className="rounded-3xl p-8 max-w-4xl w-full mx-auto h-100"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18)',
                        }}
                    >
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Showcase
                            </h1>
                            <p className="text-lg text-white/80 mb-8">
                                Welcome to our showcase page. This is a centered rounded div with white shadow.
                            </p>
                            <div className="space-y-4">
                                <p className="text-white/70">
                                    Add your content here to showcase your work, products, or services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}