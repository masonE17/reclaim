import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ---------- NEW: imports ----------
import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faMagnifyingGlassPlus, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getListingById, getSellerById, getMoreFromSeller, type Listing } from "../data/listings";
// ---------- END NEW ----------

// ---------- NEW: listing details UI (fills in the page from the clicked listing) ----------
const STRIPES =
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 10px, rgba(255,255,255,0) 10px, rgba(255,255,255,0) 20px)";

// Slightly different shades so the 5 placeholder photos look distinct
const PHOTO_BRIGHTNESS = [1, 0.93, 1.07, 0.88, 1.04];

function ListingDetails({ listing }: { listing: Listing }) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [saved, setSaved] = useState(false);

    const seller = getSellerById(listing.sellerId);
    const moreFromSeller = getMoreFromSeller(listing.sellerId, listing.id);
    const sellerLabel = seller ? seller.name + (seller.business ? ` · ${seller.business}` : "") : "";

    return (
        <div className="flex flex-col gap-4 p-3">
            {/* Breadcrumb */}
            <p className="text-[#5A6058] text-[13px]">
                <Link to="/browse" className="underline hover:text-[#1F4D31]">Browse</Link>
                {" / "}
                <Link to="/browse" className="underline hover:text-[#1F4D31]">{listing.category}</Link>
                {" / "}
                <span>{listing.title}</span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-4 items-start">
                {/* ---------- Left column ---------- */}
                <div className="flex flex-col gap-4">
                    {/* Description */}
                    <div className="bg-white border border-[#DDE0D8] rounded-xl overflow-hidden">
                        <div className="p-5 flex flex-col gap-3">
                            <h2 className="text-[#1B1E1C] font-bold text-[16px]">Description</h2>
                            <p className="text-[#3B403A] text-[13px] leading-relaxed">{listing.description}</p>
                            <div className="flex flex-row flex-wrap gap-2">
                                {listing.tags.map((tag) => (
                                    <span key={tag} className="bg-[#F1F2EE] border border-[#DDE0D8] rounded-full px-3 py-0.5 text-[#3B403A] text-[12px]">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#F1F2EE] border-t border-[#DDE0D8] px-5 py-3 flex flex-row gap-4 text-[#5A6058] text-[11px]">
                            <span>Posted {listing.posted} · {listing.postedDate}</span>
                            <span>{listing.views} views</span>
                            <span>{listing.saves} saves</span>
                        </div>
                    </div>

                    {/* Location & pickup */}
                    <div className="bg-white border border-[#DDE0D8] rounded-xl p-5 flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-[#1B1E1C] font-bold text-[16px]">Location &amp; pickup</h2>
                            <p className="text-[#1F4D31] font-bold text-[13px]">{listing.distance} away</p>
                        </div>
                        <div
                            className="relative h-28 rounded-lg bg-[#D9DED9] flex justify-center items-center"
                            style={{ backgroundImage: STRIPES }}
                        >
                            <span className="text-[#C2410C] text-[22px]"><FontAwesomeIcon icon={faLocationDot} /></span>
                            <span className="absolute bottom-1 right-2 text-[#5A6058] font-mono text-[10px]">[Map]</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#1B1E1C] font-bold text-[13px]">{listing.place}, GA {listing.zip} (exact address shared after purchase)</p>
                            <p className="text-[#5A6058] text-[13px] leading-snug">{listing.pickup}</p>
                        </div>
                    </div>

                    {/* Seller */}
                    {seller && (
                        <div className="bg-white border border-[#DDE0D8] rounded-xl p-5 flex flex-row items-center gap-3">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-[#C2410C] flex justify-center items-center">
                                <p className="text-white font-bold text-[16px]">{seller.initials}</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-0.5">
                                <p className="text-[#1B1E1C] font-bold text-[14px]">{sellerLabel}</p>
                                <p className="text-[#5A6058] text-[12px]">
                                    <span className="text-[#C2410C]">
                                        {[0, 1, 2, 3, 4].map((i) => <FontAwesomeIcon key={i} icon={faStar} className="text-[10px]" />)}
                                    </span>{" "}
                                    {seller.rating} · {seller.sales} sales · member since {seller.memberSince}
                                </p>
                            </div>
                            <Link to="/profile">
                                <button className="text-[#1B1E1C] bg-white hover:bg-[#F1F2EE] px-4 py-2 border border-[#C9CFCB] rounded-[8px] font-semibold text-[13px] hover:cursor-pointer whitespace-nowrap">View profile</button>
                            </Link>
                        </div>
                    )}

                    {/* More from this seller */}
                    {seller && moreFromSeller.length > 0 && (
                        <div className="bg-white border border-[#DDE0D8] rounded-xl p-5 flex flex-col gap-3">
                            <div className="flex flex-row justify-between items-center">
                                <h2 className="text-[#1B1E1C] font-bold text-[16px]">More from {seller.name}</h2>
                                <Link to="/profile" className="text-[#1F4D31] font-bold text-[12px] underline underline-offset-2">See all</Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {moreFromSeller.map((item) => (
                                    <Link key={item.id} to={`/listing/${item.id}`} className="border border-[#DDE0D8] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                        <div className="h-20 flex justify-center items-center" style={{ backgroundColor: item.tint, backgroundImage: STRIPES }}>
                                            <span className="bg-white/80 text-[#3B403A] font-mono text-[10px] px-1.5 py-0.5 rounded-[3px]">[Photo: {item.photoLabel}]</span>
                                        </div>
                                        <div className="p-2 flex flex-col">
                                            <p className="text-[#1B1E1C] font-extrabold text-[14px]">${item.price}</p>
                                            <p className="text-[#1B1E1C] font-semibold text-[12px] leading-snug">{item.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ---------- Right column ---------- */}
                <div className="bg-white border border-[#DDE0D8] rounded-xl overflow-hidden">
                    {/* Title + save/share */}
                    <div className="p-5 flex flex-row justify-between items-start gap-3 border-b border-[#DDE0D8]">
                        <h1 className="text-[#1B1E1C] font-extrabold text-[26px] leading-tight">{listing.title}</h1>
                        <div className="flex flex-row gap-2 shrink-0">
                            <button
                                onClick={() => setSaved(!saved)}
                                aria-label={saved ? "Remove from saved" : "Save listing"}
                                className={`w-9 h-9 border border-[#C9CFCB] rounded-[8px] hover:bg-[#F1F2EE] hover:cursor-pointer ${saved ? "text-[#C2410C]" : "text-[#1B1E1C]"}`}
                            >
                                <FontAwesomeIcon icon={saved ? faHeartSolid : faHeart} />
                            </button>
                            <button
                                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                                aria-label="Copy link"
                                className="w-9 h-9 border border-[#C9CFCB] rounded-[8px] text-[#1B1E1C] hover:bg-[#F1F2EE] hover:cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                            </button>
                        </div>
                    </div>

                    {/* Main photo */}
                    <div
                        className="relative aspect-[4/3] w-full flex justify-center items-center"
                        style={{ backgroundColor: listing.tint, backgroundImage: STRIPES, filter: `brightness(${PHOTO_BRIGHTNESS[photoIndex]})` }}
                    >
                        <span className="bg-white/80 text-[#3B403A] font-mono text-[12px] px-2 py-1 rounded-[3px]">[Main photo: {listing.photoLabel}]</span>
                        <button className="absolute bottom-3 left-3 bg-[#1B1E1C] text-white px-4 py-2 rounded-full font-semibold text-[13px] flex flex-row items-center gap-2 hover:cursor-pointer">
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} /> Zoom
                        </button>
                        <span className="absolute bottom-3 right-3 bg-[#1B1E1C]/90 text-white px-2.5 py-1 rounded-full font-semibold text-[11px]">
                            {photoIndex + 1} / {PHOTO_BRIGHTNESS.length}
                        </span>
                    </div>
                    {/* Thumbnails */}
                    <div className="px-4 py-3 flex flex-row gap-2 border-b border-[#DDE0D8]">
                        {PHOTO_BRIGHTNESS.map((brightness, i) => (
                            <button
                                key={i}
                                onClick={() => setPhotoIndex(i)}
                                aria-label={`Show photo ${i + 1}`}
                                className={`w-14 h-12 rounded-md hover:cursor-pointer ${i === photoIndex ? "border-2 border-[#1B1E1C]" : "border border-[#DDE0D8]"}`}
                                style={{ backgroundColor: listing.tint, backgroundImage: STRIPES, filter: `brightness(${brightness})` }}
                            />
                        ))}
                    </div>

                    {/* Price + specs + actions */}
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex flex-row items-baseline gap-3 flex-wrap">
                            <p className="text-[#1B1E1C] font-extrabold text-[32px] leading-none">${listing.price}</p>
                            <p className="text-[#5A6058] text-[12px]">{listing.priceNote}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                                ["Quantity", listing.quantity],
                                ["Dimensions", listing.dimensions],
                                ["Weight", listing.weight],
                                ["Condition", listing.condition],
                            ].map(([label, value]) => (
                                <div key={label} className="bg-[#F1F2EE] rounded-lg p-3 flex flex-col gap-1">
                                    <p className="text-[#7A8077] font-mono text-[10px] uppercase tracking-wide">{label}</p>
                                    <p className="text-[#1B1E1C] font-bold text-[13px] leading-snug">{value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button className="bg-[#C2410C] hover:bg-[#9A3412] text-white py-3 rounded-[8px] font-bold text-[14px] hover:cursor-pointer">Add to cart</button>
                            <Link to="/messages" className="block">
                                <button className="w-full bg-[#1B1E1C] hover:bg-black text-white py-3 rounded-[8px] font-bold text-[14px] hover:cursor-pointer">Message seller</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// ---------- END NEW ----------

export default function ListingPage() {
    const { id } = useParams();

    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // ---------- NEW: look up the clicked listing by the :id in the URL ----------
    const listing = getListingById(id);
    // ---------- END NEW ----------

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Listing Page</p>
                {/* ---------- NEW: page content ---------- */}
                {listing ? (
                    // key resets the photo/save state when you move between listings
                    <ListingDetails key={listing.id} listing={listing} />
                ) : (
                    <div className="p-10 text-center flex flex-col gap-3 items-center">
                        <p className="text-[#1B1E1C] font-bold text-[20px]">We couldn't find that listing.</p>
                        <Link to="/browse" className="text-[#1F4D31] font-bold underline">Back to browse</Link>
                    </div>
                )}
                {/* ---------- END NEW ---------- */}
            </div>
            <Footer />
        </div>
    );
}

