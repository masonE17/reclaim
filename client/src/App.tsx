import { useEffect } from "react";
import Footer from "./components/Footer";

export default function App() {
    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 w-full bg-[#FFFFFF] flex justify-center items-center py-3 border-b border-[#DDE0D8]">
                <div className="w-full max-w-325 flex flex-row justify-between items-center p-1">
                    <div className="flex flex-row justify-center items-center gap-1">
                        <img src="/ReClaim-icon.png" alt="ReClaim Logo" className="w-12 h-12" />
                        <p className="text-[#1B1F1A] font-bold text-[28px]">ReClaim</p>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-6">
                        <div className="flex flex-row justify-center items-center gap-6">
                            <div className="group flex flex-col justify-center items-center">
                                <button className="text-[#5A6058] font-semibold text-[15px] hover:text-[#1B1F1A] hover:cursor-pointer">About Us</button>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b"></div>
                            </div>
                            <div className="group flex flex-col justify-center items-center">
                                <button className="text-[#5A6058] font-semibold text-[15px] hover:text-[#1B1F1A] hover:cursor-pointer">Log In</button>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b "></div>
                            </div>
                        </div>
                        <button className="bg-[#C2410C] text-white py-2 px-4 rounded-[5px] font-semibold text-[15px] hover:bg-[#9A3412] hover:cursor-pointer">Sign Up</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Home Page</p>
            </div>
            <Footer />
        </div>
    );
}
