import React from "react";

export default function Footer() {
  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-[400px] bg-black text-white flex flex-col justify-end pb-10 px-6 z-0"
      style={{ height: "500px" }} // Fixed height for the reveal effect
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Column 1 */}
            <div>
                <h3 className="text-gray-500 mb-4 font-mono">Pages</h3>
                <ul className="space-y-2 text-lg font-medium">
                    <li><a href="/" className="hover:text-gray-400">Home</a></li>
                    <li><a href="/#work" className="hover:text-gray-400">Work</a></li>
                    <li><a href="/about" className="hover:text-gray-400">About</a></li>
                    <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </div>

            {/* Column 2 */}
            <div>
                <h3 className="text-gray-500 mb-4 font-mono">Socials</h3>
                <ul className="space-y-2 text-lg font-medium">
                    <li><a href="https://www.instagram.com/saransh_singh8/" className="hover:text-gray-400">Instagram</a></li>
                    <li><a href="https://www.youtube.com/@354_saranshsingh8" className="hover:text-gray-400">YouTube</a></li>
                    <li><a href="https://www.linkedin.com/in/saransh0008/" className="hover:text-gray-400">LinkedIn</a></li>
                </ul>
            </div>

            {/* Column 3 */}
            <div>
                <h3 className="text-gray-500 mb-4 font-mono">Love</h3>
                <ul>
                  <li><a href="https://www.figma.com/design/BHSgdlyT7RNCKW3eaKrrKo/Hushh-Wallet?node-id=0-1&t=Lo3oRDObuRONQBII-1" className="hover:text-gray-400">Figma</a></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex justify-between items-end">
            <h1 className="text-[12vw] leading-none font-bold tracking-tighter">Mindx</h1>
            <p className="hidden md:block text-gray-500 mb-2">© 2026 Mindx</p>
        </div>
      </div>
    </div>
  );
}