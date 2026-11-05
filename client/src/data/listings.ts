// Shared listing data used by BOTH the Browse page and the Listing page.
// Replace this with a real API / database call later; the shape can stay the same.

export type Seller = {
    id: string;
    name: string;
    business?: string;
    initials: string;
    rating: number;
    sales: number;
    memberSince: string;
};

export type Listing = {
    id: number;
    // Browse card fields
    badge: string;
    price: number;
    title: string;
    distance: string;
    place: string;
    posted: string;
    photoLabel: string;
    tint: string;
    category: string;
    // Listing page fields
    postedDate: string;
    description: string;
    tags: string[];
    views: number;
    saves: number;
    zip: string;
    pickup: string;
    quantity: string;
    dimensions: string;
    weight: string;
    condition: string;
    priceNote: string;
    sellerId: string;
};

export type Section = {
    id: string;
    title: string;
    subtitle: string;
    listings: Listing[];
};

export const SELLERS: Seller[] = [
    { id: "s1", name: "Dan Ruiz", business: "Ruiz Remodeling", initials: "DR", rating: 4.8, sales: 23, memberSince: "2026" },
    { id: "s2", name: "Maria Chen", business: "Peachtree Salvage", initials: "MC", rating: 4.9, sales: 41, memberSince: "2025" },
    { id: "s3", name: "Tom Baker", business: "Baker Builders", initials: "TB", rating: 4.6, sales: 12, memberSince: "2026" },
    { id: "s4", name: "Aisha Johnson", initials: "AJ", rating: 4.7, sales: 8, memberSince: "2026" },
    { id: "s5", name: "Luis Ortega", business: "Ortega Masonry", initials: "LO", rating: 4.9, sales: 57, memberSince: "2024" },
];

export const LISTINGS: Listing[] = [
    {
        id: 1, badge: "312 views", price: 480, title: "Reclaimed oak flooring, ~240 sq ft",
        distance: "2.1 mi", place: "Decatur", posted: "3 days ago", photoLabel: "oak flooring", tint: "#DCC7A1", category: "Flooring",
        postedDate: "Oct 12, 2026",
        description: "Pulled from a 1920s bungalow remodel in Decatur. 2¼\" red oak strip, tongue and groove. Most boards are 3–6 ft. Nails mostly removed; some will need a light sand. Stored dry in a garage.",
        tags: ["red oak", "hardwood", "tongue & groove", "reclaimed"],
        views: 312, saves: 18, zip: "30030",
        pickup: "Pickup weekdays 4–7 pm, Sat 9–noon. Bring a truck or van — loading help available.",
        quantity: "~240 sq ft", dimensions: "2¼\" × ¾\" × 3–6 ft", weight: "~550 lb total", condition: "Good, used",
        priceNote: "≈ $2.00 / sq ft · new retail ≈ [$X]", sellerId: "s1",
    },
    {
        id: 2, badge: "287 views", price: 350, title: 'Cast iron clawfoot tub, 60"',
        distance: "5.4 mi", place: "Midtown", posted: "1 day ago", photoLabel: "clawfoot tub", tint: "#CDD0CB", category: "Plumbing",
        postedDate: "Nov 2, 2026",
        description: "Original cast iron clawfoot tub with porcelain interior and four ball-and-claw feet. Minor wear near the drain; no cracks or chips on the rim. Fixtures not included.",
        tags: ["cast iron", "clawfoot", "bathroom", "vintage"],
        views: 287, saves: 24, zip: "30309",
        pickup: "Pickup evenings after 5 pm and weekends. Needs at least two people and a truck to move.",
        quantity: "1 tub", dimensions: '60" L × 30" W × 28" H', weight: "~350 lb", condition: "Good, used",
        priceNote: "new retail ≈ [$X]", sellerId: "s2",
    },
    {
        id: 3, badge: "241 views", price: 160, title: "Solid wood 6-panel doors (set of 4)",
        distance: "8.0 mi", place: "Marietta", posted: "4 days ago", photoLabel: "interior doors", tint: "#CDB895", category: "Doors & windows",
        postedDate: "Oct 30, 2026",
        description: "Set of four solid wood interior doors, 6-panel, taken out during a hallway remodel. Hinge mortises are intact. Paint on one side; stripped and ready to refinish on the other.",
        tags: ["interior doors", "6-panel", "solid wood", "set of 4"],
        views: 241, saves: 15, zip: "30060",
        pickup: "Pickup weekends only. Doors are stored in the garage, easy to load.",
        quantity: "4 doors", dimensions: '32" × 80" × 1⅜"', weight: "~40 lb each", condition: "Good, used",
        priceNote: "≈ $40 each · new retail ≈ [$X]", sellerId: "s3",
    },
    {
        id: 4, badge: "198 views", price: 150, title: "2x4 studs, 8 ft — 60 pieces",
        distance: "3.7 mi", place: "East Point", posted: "2 days ago", photoLabel: "2x4 stack", tint: "#E3D5A9", category: "Lumber",
        postedDate: "Nov 1, 2026",
        description: "Sixty 2x4 studs left over from a framing job. Kept under a tarp, straight and dry. A handful have small knots, but none are split.",
        tags: ["2x4", "studs", "framing", "lumber"],
        views: 198, saves: 9, zip: "30344",
        pickup: "Pickup weekdays after 3 pm. Bring a trailer or truck with a long bed.",
        quantity: "60 pieces", dimensions: '1½" × 3½" × 8 ft', weight: "~800 lb total", condition: "Like new",
        priceNote: "≈ $2.50 / stud · new retail ≈ [$X]", sellerId: "s3",
    },
    {
        id: 5, badge: "New", price: 90, title: "Porcelain tile 12x24, 18 boxes",
        distance: "1.2 mi", place: "Old Fourth Ward", posted: "12 min ago", photoLabel: "tile boxes", tint: "#BFC4BC", category: "Tile & stone",
        postedDate: "Nov 3, 2026",
        description: "Eighteen unopened boxes of gray porcelain floor tile, left over after a kitchen job. All boxes are from the same lot, so the color matches. Great for a bathroom or small kitchen.",
        tags: ["porcelain", "tile", "unopened", "gray"],
        views: 21, saves: 2, zip: "30312",
        pickup: "Pickup any day after 10 am. Boxes are heavy, so bring a hand truck if you have one.",
        quantity: "18 boxes (~290 sq ft)", dimensions: '12" × 24"', weight: "~1,100 lb total", condition: "New, unopened",
        priceNote: "≈ $5 / box · new retail ≈ [$X]", sellerId: "s4",
    },
    {
        id: 6, badge: "New", price: 120, title: "Vinyl double-hung windows (3)",
        distance: "6.3 mi", place: "Smyrna", posted: "40 min ago", photoLabel: "windows", tint: "#C4D0D6", category: "Doors & windows",
        postedDate: "Nov 3, 2026",
        description: "Three white vinyl double-hung windows, removed during a replacement project. Glass is clear with no fogging. Screens are included for two of the three.",
        tags: ["vinyl", "double-hung", "windows", "white"],
        views: 34, saves: 3, zip: "30080",
        pickup: "Pickup weekdays 5–8 pm, weekends anytime.",
        quantity: "3 windows", dimensions: '36" × 60" each', weight: "~35 lb each", condition: "Good, used",
        priceNote: "≈ $40 each · new retail ≈ [$X]", sellerId: "s2",
    },
    {
        id: 7, badge: "New", price: 45, title: "Copper pipe offcuts, ~30 lb",
        distance: "4.4 mi", place: "Kirkwood", posted: "1 hr ago", photoLabel: "copper pipe", tint: "#D9A883", category: "Plumbing",
        postedDate: "Nov 3, 2026",
        description: "A bucket of copper pipe offcuts in mixed lengths, mostly ½\" and ¾\" Type L. Clean and ready to reuse for small repairs or sweat-fitting practice.",
        tags: ["copper", "pipe", "offcuts", "Type L"],
        views: 17, saves: 1, zip: "30317",
        pickup: "Porch pickup available any day. Message to arrange a time.",
        quantity: "~30 lb", dimensions: '½" and ¾" pipe, 6–36" long', weight: "~30 lb", condition: "Good, used",
        priceNote: "≈ $1.50 / lb · new retail ≈ [$X]", sellerId: "s2",
    },
    {
        id: 8, badge: "New", price: 100, title: "Used red brick, ~400",
        distance: "9.1 mi", place: "Tucker", posted: "2 hr ago", photoLabel: "brick pallet", tint: "#C28F7C", category: "Brick & masonry",
        postedDate: "Nov 3, 2026",
        description: "About 400 used red clay bricks from a chimney removal. Mortar cleaned off most of them. Good for a garden border, patio, or fire pit. Sold on one pallet.",
        tags: ["brick", "red clay", "chimney", "pallet"],
        views: 29, saves: 4, zip: "30084",
        pickup: "Pickup weekdays 4–7 pm. A forklift is available, but bring a truck rated for the weight.",
        quantity: "~400 bricks", dimensions: '8" × 2¼" × 3¾" each', weight: "~1,800 lb total", condition: "Fair, used",
        priceNote: "≈ $0.25 / brick · new retail ≈ [$X]", sellerId: "s5",
    },
    {
        id: 9, badge: "Saved search", price: 600, title: "Shaker kitchen cabinets, 10-piece set",
        distance: "7.5 mi", place: "Brookhaven", posted: "5 days ago", photoLabel: "cabinets", tint: "#D4D2C4", category: "Cabinets",
        postedDate: "Oct 29, 2026",
        description: "Ten-piece shaker kitchen cabinet set in off-white paint: base, wall, and one corner unit. Soft-close hinges. Countertop not included. Removed carefully and labeled by position.",
        tags: ["shaker", "kitchen", "cabinets", "soft-close"],
        views: 156, saves: 21, zip: "30319",
        pickup: "Pickup Saturdays 9–noon. Two people recommended.",
        quantity: "10 pieces", dimensions: "Varies, see message", weight: "~450 lb total", condition: "Good, used",
        priceNote: "≈ $60 / piece · new retail ≈ [$X]", sellerId: "s3",
    },
    {
        id: 10, badge: "Saved search", price: 75, title: "Concrete pavers, 120 pcs",
        distance: "11 mi", place: "Stone Mountain", posted: "2 days ago", photoLabel: "pavers", tint: "#C8C3B6", category: "Brick & masonry",
        postedDate: "Nov 1, 2026",
        description: "120 gray concrete pavers, about 12 sq ft of coverage per 10 pieces. Left over from a patio project. No chips, and stored flat on a pallet.",
        tags: ["pavers", "concrete", "patio", "gray"],
        views: 73, saves: 6, zip: "30083",
        pickup: "Pickup anytime with notice. Pavers are heavy, so bring a truck.",
        quantity: "120 pieces", dimensions: '12" × 12" × 1½"', weight: "~1,500 lb total", condition: "Like new",
        priceNote: "≈ $0.63 / paver · new retail ≈ [$X]", sellerId: "s5",
    },
    {
        id: 11, badge: "For you", price: 40, title: '1/2" drywall sheets, 4x8 (14)',
        distance: "3.0 mi", place: "West End", posted: "6 days ago", photoLabel: "drywall", tint: "#D9D9D3", category: "Lumber",
        postedDate: "Oct 28, 2026",
        description: "Fourteen sheets of ½\" drywall, 4x8, left over from a basement finish. Stored flat and dry. A few corners are chipped, but all the sheets are usable.",
        tags: ["drywall", "4x8", "sheetrock", "leftover"],
        views: 48, saves: 3, zip: "30310",
        pickup: "Pickup weekdays after 4 pm. Bring a truck or van with a flat bed.",
        quantity: "14 sheets", dimensions: '4 ft × 8 ft × ½"', weight: "~800 lb total", condition: "Like new",
        priceNote: "≈ $2.85 / sheet · new retail ≈ [$X]", sellerId: "s4",
    },
    {
        id: 12, badge: "For you", price: 55, title: "Architectural shingles, 9 bundles",
        distance: "12 mi", place: "Lithonia", posted: "1 week ago", photoLabel: "shingles", tint: "#B9BDB8", category: "Roofing",
        postedDate: "Oct 27, 2026",
        description: "Nine bundles of charcoal architectural shingles from a roof job. Bundles are sealed and stored off the ground under cover. Enough for roughly 3 squares.",
        tags: ["shingles", "roofing", "charcoal", "architectural"],
        views: 37, saves: 2, zip: "30058",
        pickup: "Pickup weekends. Bundles are about 60 lb each.",
        quantity: "9 bundles (~3 squares)", dimensions: "Standard bundle", weight: "~540 lb total", condition: "New, unopened",
        priceNote: "≈ $6 / bundle · new retail ≈ [$X]", sellerId: "s4",
    },
    // Extra listings from the same seller (not on the Browse page, but shown under "More from ...")
    {
        id: 13, badge: "Listed", price: 65, title: 'Wood casement window, 30x48"',
        distance: "2.1 mi", place: "Decatur", posted: "1 week ago", photoLabel: "window", tint: "#C4D0D6", category: "Doors & windows",
        postedDate: "Oct 27, 2026",
        description: "Wood casement window with the original hardware and glazing. Frame is solid, needs paint. Taken out of the same Decatur bungalow as the oak flooring.",
        tags: ["casement", "wood", "window", "reclaimed"],
        views: 44, saves: 5, zip: "30030",
        pickup: "Pickup weekdays 4–7 pm, Sat 9–noon.",
        quantity: "1 window", dimensions: '30" × 48"', weight: "~25 lb", condition: "Fair, used",
        priceNote: "new retail ≈ [$X]", sellerId: "s1",
    },
    {
        id: 14, badge: "Listed", price: 40, title: "Oak baseboard trim, ~80 ft",
        distance: "2.1 mi", place: "Decatur", posted: "1 week ago", photoLabel: "baseboard", tint: "#CDB895", category: "Lumber",
        postedDate: "Oct 27, 2026",
        description: "About 80 linear feet of oak baseboard trim in 6–10 ft lengths. Pulled with care, with few splits. A light sanding and refinish will bring it back.",
        tags: ["oak", "baseboard", "trim", "reclaimed"],
        views: 31, saves: 3, zip: "30030",
        pickup: "Pickup weekdays 4–7 pm, Sat 9–noon.",
        quantity: "~80 ft", dimensions: '3¼" × ⅝" × 6–10 ft', weight: "~60 lb total", condition: "Good, used",
        priceNote: "≈ $0.50 / ft · new retail ≈ [$X]", sellerId: "s1",
    },
];

export function getListingById(id: string | number | undefined): Listing | undefined {
    return LISTINGS.find((l) => String(l.id) === String(id));
}

export function getSellerById(id: string): Seller | undefined {
    return SELLERS.find((s) => s.id === id);
}

// Other listings from the same seller (excludes the current one)
export function getMoreFromSeller(sellerId: string, excludeId: number, limit = 2): Listing[] {
    return LISTINGS.filter((l) => l.sellerId === sellerId && l.id !== excludeId).slice(0, limit);
}

const byIds = (ids: number[]) => ids.map((id) => LISTINGS.find((l) => l.id === id)!);

// Sections shown on the Browse page
export const SECTIONS: Section[] = [
    { id: "popular", title: "Popular near you", subtitle: "Most viewed this week", listings: byIds([1, 2, 3, 4]) },
    { id: "new", title: "Just posted", subtitle: "Newest listings, refreshed as they come in", listings: byIds([5, 6, 7, 8]) },
    { id: "recommended", title: "Recommended for you", subtitle: "Based on your saved searches: cabinets, pavers", listings: byIds([9, 10, 11, 12]) },
];
