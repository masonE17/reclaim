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
            <div className="sticky top-0 z-50 w-full bg-[#FFFFFF] flex justify-center items-center py-3 border-b-2 border-[#DDE0D8]">
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

            <div className="flex-1 w-full max-w-325 mx-auto p-10">
                {/* Main page content section */}
                <div className="w-full flex flex-row justify-between items-center gap-5 p-1">
                    {/* Content section */}
                    <div className="w-180 flex flex-col justify-between items-start gap-2">
                        <div className="bg-[#E3EDE6] py-2 px-4 rounded-[5px]">
                            <p className="font-semibold text-[#1F5134] text-[12px]">LOCAL CONSTRUCTION MATERIAL MARKETPLACE</p>
                        </div>
                        <p className="font-extrabold text-[#1B1E1C] text-[64px]">Leftover materials</p>
                        <p className="font-extrabold text-[#1B1E1C] text-[64px] -mt-9">deserve a second job</p>
                        <p className="font-extrabold text-[#1B1E1C] text-[64px] -mt-9">site.</p>
                        <p className="text-[#48514C] text-[18px]">ReClaim lets contractors and renovators list reusable lumber, tile, fixtures, and more with photos, price, location, and pickup details, so good material gets resused instead of hauled to the landfill.</p>
                        <div className="w-full flex flex-row justify-start items-center gap-3 my-3">
                            <button className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Browse materials near you</button>
                            <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] py-3 px-4 border border-[#C9CFCB] rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Watch the demo</button>
                        </div>
                        <div className="w-full border-b border-[#C9CFCB] rounded-[5px]"></div>
                        <div className="w-full flex flex-row justify-start items-center gap-8">
                            <div className="flex flex-col justify-center items-start">
                                <p className="font-bold text-[#1B1E1C] text-[28px]">[X] tons</p>
                                <p className="text-[#55605A] text-[14px] -mt-1">kept out of landfills</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="font-bold text-[#1B1E1C] text-[28px]">[X]</p>
                                <p className="text-[#55605A] text-[14px] -mt-1">active listings</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="font-bold text-[#1B1E1C] text-[28px]">[X]</p>
                                <p className="text-[#55605A] text-[14px] -mt-1">partner companies</p>
                            </div>
                        </div>
                    </div>

                    {/* Sign up form section */}
                    <div className="w-125 border border-[#D9D7D0] bg-[#FFFFFF] rounded-[5px] flex flex-col justify-center items-center gap-3 py-7 shadow-[0_12px_32px_rgba(27,30,28,0.08)]">
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-bold text-[#1B1E1C] text-[26px]">Create your profile</p>
                            <p className="text-[#55605A] text-[15px]">Free to join, buy or sell in minutes.</p>
                        </div>
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-semibold text-[#1B1E1C] text-[14px]">Full name</p>
                            <input type="text" placeholder="Jordan Rivera" className="w-full border border-[#C9CFCB] rounded-[5px] px-3 py-2" />
                        </div>
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-semibold text-[#1B1E1C] text-[14px]">Company (optional)</p>
                            <input type="text" placeholder="Rivera Renovations" className="w-full border border-[#C9CFCB] rounded-[5px] px-3 py-2" />
                        </div>
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-semibold text-[#1B1E1C] text-[14px]">Email</p>
                            <input type="email" placeholder="you@company.com" className="w-full border border-[#C9CFCB] rounded-[5px] px-3 py-2" />
                        </div>
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-semibold text-[#1B1E1C] text-[14px]">Zip Code</p>
                            <input type="text" placeholder="30303" className="w-full border border-[#C9CFCB] rounded-[5px] px-3 py-2" />
                        </div>
                        <div className="w-[85%] flex flex-col justify-center items-start">
                            <p className="font-semibold text-[#1B1E1C] text-[14px]">Password</p>
                            <input type="password" placeholder="At least 8 characters" className="w-full border border-[#C9CFCB] rounded-[5px] px-3 py-2" />
                        </div>
                        <button className="w-[85%] text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Create account</button>
                        <p className="text-[#55605A] text-[14px]">Already have an account? <span className="text-[#1F5134] hover:underline cursor-pointer underline">Sign in</span></p>
                    </div>
                </div>
            </div>

            {/* Companies working with divider section */}
            <div className="w-full bg-[#1B1E1C] flex justify-center items-center py-3">
                <div className="w-full max-w-325 flex flex-row justify-center items-center gap-12 p-1">
                    <p className="text-[#C9CFCB] font-bold text-[12px]">WORKING WITH</p>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                    <div className="border border-[#C9CFCB] p-1 border-dashed rounded-[5px]">
                        <p className="text-[#C9CFCB] font-bold text-[16px]">[Partner Logo]</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-325 mx-auto p-10">
                {/* About us content section */}
                <p className="font-semibold text-[#C2410C] text-[13px]">THE FIVE W'S</p>
                <p className="font-extrabold text-[#1B1E1C] text-[44px] -mt-2">Eveything you need to know</p>
                <p className="font-extrabold text-[#1B1E1C] text-[44px] -mt-3 mb-10">about ReClaim</p>
                <div className="flex flex-row justify-center items-center gap-5">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="w-85 h-50 border border-[#D9D7D0] rounded-[5px] p-5">
                            <p className="font-semibold text-[#C2410C] text-[13px] mb-1.5">01 • WHAT</p>
                            <p className="font-bold text-[#1B1E1C] text-[22px] mb-1.5">A marketplace for resuable materials</p>
                            <p className="text-[#48514C] text-[15px]">Surplus lumber, brick, tile, doors, fixtures, and other surplus building materials. Listed by the people who pulled them off the job.</p>
                        </div>
                        <div className="w-85 h-50 border border-[#D9D7D0] rounded-[5px] p-5">
                            <p className="font-semibold text-[#C2410C] text-[13px] mb-1.5">02 • HOW</p>
                            <p className="font-bold text-[#1B1E1C] text-[22px] mb-1.5">Simple and fast</p>
                            <p className="text-[#48514C] text-[15px]">Upload a photo, add a price, and pickup loctation. Buyers message you, pay, and pick it up locally.</p>
                        </div>
                    </div>
                    <div className=" w-130 h-105 bg-[#1F5134] rounded-[5px] p-5">
                        <p className="font-semibold text-[#F7B48A] text-[13px] mb-1.5">03 • WHO</p>
                        <p className="font-bold text-[#FFFFFF] text-[22px] mb-1.5">Built for contractors, renovators, and DIYers</p>
                        <p className="text-[#D5E3DA] text-[16px] mb-5">ReClaim was built by a team of Georgia Tech students to connect people who have surplus building materials with people who can use them, keeping good material out of the landfill.</p>  
                        <img src="/team-photo-placeholder.png" alt="Team placeholder" className="w-full h-50 object-cover rounded-[5px]" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="w-85 h-50 border border-[#D9D7D0] rounded-[5px] p-5">
                            <p className="font-semibold text-[#C2410C] text-[13px] mb-1.5">04 • WHY</p>
                            <p className="font-bold text-[#1B1E1C] text-[22px] mb-1.5">Less waste, lower costs</p>
                            <p className="text-[#48514C] text-[15px]">Sellers recover value and skip disposal fees and buyers get quality materials for affordable prices.</p>
                        </div>
                        <div className="w-85 h-50 border border-[#D9D7D0] rounded-[5px] p-5">
                            <p className="font-semibold text-[#C2410C] text-[13px] mb-1.5">05 • WHEN</p>
                            <p className="font-bold text-[#1B1E1C] text-[22px] mb-1.5">Launching locally first</p>
                            <p className="text-[#48514C] text-[15px]">Starting with pickup in Atlanta, GA. More regions and shipping coming later.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-325 mx-auto p-10">
                {/* Demo video content section */}
                <p className="font-semibold text-[#C2410C] text-[13px]">SEE IT IN ACTION</p>
                <p className="font-extrabold text-[#1B1E1C] text-[44px] -mt-2">From job site to new home</p>
                <p className="font-extrabold text-[#1B1E1C] text-[44px] -mt-4">in mintues.</p>
                <img src="/demo-video-placeholder.png" alt="Demo video placeholder" className="w-full h-100 object-cover rounded-[5px]" />
            </div>

            {/* Footer section - COMPONENTS */}
            <Footer />
        </div>
    );
}
