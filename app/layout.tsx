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
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
