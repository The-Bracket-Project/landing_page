import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

export default function ContactUs() {
  return (
    <div
      className="min-h-screen"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #ffffff 0%, #8C7A48 40%, #000000 70%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-50  px-4">
          <p
            className={`text-5xl md:text-6xl lg:text-6xl text-center font-semibold poppins`}
            style={{ color: "#000000" }}
          >
            Get In Touch
          </p>
          <p
            className={`text-5xl md:text-6xl lg:text-6xl text-center font-semibold poppins`}
          >
            Enquiries and Collaborations
          </p>
        </div>
        <Footer />
      </div>
    </div>

    // <>
    //   <Navbar />
    //   <main>
    //     <h1>Contact Us</h1>
    //     <p>Feel free to reach out to us.</p>
    //   </main>
    //   <Footer />
    // </>
  );
}
