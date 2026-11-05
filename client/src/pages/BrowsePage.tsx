import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

export default function BrowsePage() {
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Toggle the display of the more options menu
    function displayMoreOptions() {
        setMoreOptionsOpen(!moreOptionsOpen);
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Browse page header */}
            <div className="sticky top-0 z-50 w-full bg-[#FFFFFF] flex flex-col justify-center items-center py-3 border-b-2 border-[#DDE0D8]">
                <div className="w-full max-w-325 flex flex-row justify-between items-center p-1 gap-2">
                    {/* Navigation to the home page */}
                    <Link to="/" className="flex flex-row justify-center items-center gap-1">
                        <img src="/ReClaim-icon.png" alt="ReClaim Logo" className="w-12 h-12" />
                        <p className="text-[#1B1F1A] font-bold text-[28px]">ReClaim</p>
                    </Link>

                    {/* Options button, search bar, and sell button */}
                    <div className="w-220 flex flex-row justify-center items-center gap-2 p-1">
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[5px] font-semibold text-[15px] hover:cursor-pointer" onClick={displayMoreOptions}><FontAwesomeIcon icon={faBars} /></button>
                        <div className="border border-[#C9CFCB] rounded-[5px] px-3 py-2 w-full flex flex-row justify-center items-center gap-2">
                            <p><FontAwesomeIcon icon={faMagnifyingGlass} /></p>
                            <input type="text" placeholder="Search lumber, tile, and more..." className="w-full text-[15px] outline-none" />
                        </div>
                        <Link to="/sell">
                            <button className="bg-[#C2410C] text-white px-4 py-2 border border-[#C2410C] hover:border-[#9A3412] rounded-[5px] font-semibold text-[15px] hover:bg-[#9A3412] hover:cursor-pointer flex flex-row justify-center items-center gap-1"><FontAwesomeIcon icon={faPlus} /> Sell</button>
                        </Link>
                        <Link to="/messages">
                            <button className="text-[#1B1E1C] font-extrabold text-[20px] hover:cursor-pointer ml-5"><FontAwesomeIcon icon={faMessage} /></button>
                        </Link>
                    </div>

                    {/* Navigation to the user profile page */}
                    <Link to="/profile" className="flex flex-row justify-center items-center gap-2 pr-2">
                        <p className="text-[#5A6058] font-semibold text-[15px]">Profile</p>
                        <div className="w-10 h-10 rounded-full bg-[#E3E7DE] flex justify-center items-center">
                            <p className="text-[#5A6058] font-semibold text-[18px]">?</p>
                        </div>
                    </Link>
                </div>
                {moreOptionsOpen && (
                    <div className="w-full max-w-250 flex flex-row justify-center items-center p-1 gap-6 mt-1">
                        <button className="text-[#FFFFFF] bg-[#1B1E1C] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">All</button>
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">Lumber</button>
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">Tiles & Stone</button>
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">Doors & Windows</button>
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">Bricks & Masonry</button>
                        <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] px-3 py-2 border border-[#C9CFCB] rounded-[10px] font-semibold text-[13px] hover:cursor-pointer">Flooring</button>
                    </div>
                )}
            </div>

            <div className="flex-1 w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Browse Page</p>
            </div>
            <Footer />
        </div>
    );
}
