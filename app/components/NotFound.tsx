"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 fixed inset-0 z-50">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1
            className={`text-6xl font-bold mb-4 ${poppins.className}`}
            style={{ color: "#15494A" }}
          >
            404
          </h1>
          <h2
            className={`text-2xl font-semibold mb-6 ${poppins.className}`}
            style={{ color: "#15494A" }}
          >
            Page Not Found
          </h2>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${poppins.className}`}
              style={{ color: "#15494A" }}
            >
              Under Maintenance
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
