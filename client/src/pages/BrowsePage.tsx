import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";


type Listing = {
    id: number;
    badge: string;
    price: number;
    title: string;
    distance: string;
    place: string;
    posted: string;
    photoLabel: string;
    tint: string;
};

type Section = {
    id: string;
    title: string;
    subtitle: string;
    listings: Listing[];
};

// Placeholder listings, make sure to replace `tint` and `photoLabel` with real image URLs
const SECTIONS: Section[] = [
    {
        id: "popular",
        title: "Popular near you",
        subtitle: "Most viewed this week",
        listings: [
            { id: 1, badge: "312 views", price: 480, title: "Reclaimed oak flooring, ~240 sq ft", distance: "2.1 mi", place: "Decatur", posted: "3 days ago", photoLabel: "oak flooring", tint: "#DCC7A1" },
            { id: 2, badge: "287 views", price: 350, title: 'Cast iron clawfoot tub, 60"', distance: "5.4 mi", place: "Midtown", posted: "1 day ago", photoLabel: "clawfoot tub", tint: "#CDD0CB" },
            { id: 3, badge: "241 views", price: 160, title: "Solid wood 6-panel doors (set of 4)", distance: "8.0 mi", place: "Marietta", posted: "4 days ago", photoLabel: "interior doors", tint: "#CDB895" },
            { id: 4, badge: "198 views", price: 150, title: "2x4 studs, 8 ft — 60 pieces", distance: "3.7 mi", place: "East Point", posted: "2 days ago", photoLabel: "2x4 stack", tint: "#E3D5A9" },
        ],
    },
    {
        id: "new",
        title: "Just posted",
        subtitle: "Newest listings, refreshed as they come in",
        listings: [
            { id: 5, badge: "New", price: 90, title: "Porcelain tile 12x24, 18 boxes", distance: "1.2 mi", place: "Old Fourth Ward", posted: "12 min ago", photoLabel: "tile boxes", tint: "#BFC4BC" },
            { id: 6, badge: "New", price: 120, title: "Vinyl double-hung windows (3)", distance: "6.3 mi", place: "Smyrna", posted: "40 min ago", photoLabel: "windows", tint: "#C4D0D6" },
            { id: 7, badge: "New", price: 45, title: "Copper pipe offcuts, ~30 lb", distance: "4.4 mi", place: "Kirkwood", posted: "1 hr ago", photoLabel: "copper pipe", tint: "#D9A883" },
            { id: 8, badge: "New", price: 100, title: "Used red brick, ~400", distance: "9.1 mi", place: "Tucker", posted: "2 hr ago", photoLabel: "brick pallet", tint: "#C28F7C" },
        ],
    },
    {
        id: "recommended",
        title: "Recommended for you",
        subtitle: "Based on your saved searches: cabinets, pavers",
        listings: [
            { id: 9, badge: "Saved search", price: 600, title: "Shaker kitchen cabinets, 10-piece set", distance: "7.5 mi", place: "Brookhaven", posted: "5 days ago", photoLabel: "cabinets", tint: "#D4D2C4" },
            { id: 10, badge: "Saved search", price: 75, title: "Concrete pavers, 120 pcs", distance: "11 mi", place: "Stone Mountain", posted: "2 days ago", photoLabel: "pavers", tint: "#C8C3B6" },
            { id: 11, badge: "For you", price: 40, title: '1/2" drywall sheets, 4x8 (14)', distance: "3.0 mi", place: "West End", posted: "6 days ago", photoLabel: "drywall", tint: "#D9D9D3" },
            { id: 12, badge: "For you", price: 55, title: "Architectural shingles, 9 bundles", distance: "12 mi", place: "Lithonia", posted: "1 week ago", photoLabel: "shingles", tint: "#B9BDB8" },
        ],
    },
];

// A single listing card
function ListingCard({ listing }: { listing: Listing }) {
    return (
        <Link
            to={`/listing/${listing.id}`}
            className="bg-white border border-[#DDE0D8] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
            {/* Photo placeholder (swap for an <img> when real photos exist) */}
            <div
                className="relative aspect-[4/3] w-full flex justify-center items-center"
                style={{
                    backgroundColor: listing.tint,
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 10px, rgba(255,255,255,0) 10px, rgba(255,255,255,0) 20px)",
                }}
            >
                <span className="absolute top-2 left-2 bg-[#1B1E1C] text-white font-mono text-[11px] font-semibold px-2 py-0.5 rounded-[4px]">
                    {listing.badge}
                </span>
                <span className="bg-white/80 text-[#3B403A] font-mono text-[11px] px-2 py-0.5 rounded-[3px]">
                    [Photo: {listing.photoLabel}]
                </span>
            </div>

            {/* Listing details */}
            <div className="p-3 flex flex-col gap-1">
                <p className="text-[#1B1E1C] font-extrabold text-[20px] leading-tight">${listing.price}</p>
                <p className="text-[#1B1E1C] font-semibold text-[13px] leading-snug">{listing.title}</p>
                <p className="text-[#7A8077] text-[11px]">
                    {listing.distance} · {listing.place} · {listing.posted}
                </p>
            </div>
        </Link>
    );
}



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
                
                <div className="flex flex-col gap-10 px-1 pt-5 pb-12">
                    {/* Greeting banner */}
                    <div className="bg-[#1F4D31] rounded-xl px-6 py-5 flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-bold text-[20px]">Good afternoon, USER</p>
                            <p className="text-[#D5E3D9] text-[13px]">Showing materials within 25 mi of [YOUR ZIP]</p>
                        </div>
                        <button className="text-white border border-[#6F9680] hover:bg-[#2A5E3D] px-4 py-2 rounded-[8px] font-semibold text-[13px] hover:cursor-pointer">
                            Change location
                        </button>
                    </div>

                    {/* Listing sections */}
                    {SECTIONS.map((section) => (
                        <section key={section.id} className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between items-end">
                                <div className="flex flex-col">
                                    <h2 className="text-[#1B1E1C] font-extrabold text-[26px] leading-tight">{section.title}</h2>
                                    <p className="text-[#7A8077] text-[13px]">{section.subtitle}</p>
                                </div>
                                <Link to="/browse/all" className="text-[#1F4D31] font-bold text-[13px] underline underline-offset-2 hover:text-[#163820]">
                                    See all
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {section.listings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Load more */}
                    <div className="flex justify-center">
                        <button className="text-[#1B1E1C] bg-white hover:bg-[#F1F2EE] px-6 py-2 border border-[#C9CFCB] rounded-[8px] font-semibold text-[13px] hover:cursor-pointer">
                            Load more listings
                        </button>
                    </div>
                </div>
                
                {/*<p>Browse Page</p>*/}
            </div>
            <Footer />
        </div>
    );
}
