import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bracket AI",
  description: "The AI Engine For Human Compatibility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground font-sans" 
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #ffffff 0%, #205563 5%, #000000 8%, #000000 30%, #8C7A48 50%, #7F8F42 70%, #000000 90%)',
        }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
