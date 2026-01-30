import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll"; // <--- 1. IMPORT THIS

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Mindx | AI, App Development & Design Agency",
  description: "Mindx is a digital agency specializing in Machine Learning, Android Apps, Web Design, and Personal Branding.",
  keywords: ["Machine Learning", "Android Studio", "Figma", "Web Design", "Agency", "Mindx"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-black cursor-none`}>
        
        <SmoothScroll /> {/* <--- 2. ADD THIS HERE */}
        <Cursor />
        
        {/* Main Content Wrapper - Slides OVER the footer */}
        <div className="relative z-10 bg-black mb-[500px] shadow-2xl border-b border-white/10">
            {children}
        </div>

        {/* Sticky Footer - Sits BEHIND the content */}
        <div className="fixed bottom-0 left-0 w-full z-0 h-[500px]">
             <Footer />
        </div>
      </body>
    </html>
  );
}