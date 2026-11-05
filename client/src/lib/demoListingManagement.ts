import { getDemoListings, type SavedListing } from "./createListing";

// Same key currently used by createListing.ts. Demo-only: no user authentication.
const KEY = "reclaim-demo-listings-v1";

export type ListingStatus = "available" | "sold" | "unavailable";
export type ManagedListing = SavedListing & { status?: ListingStatus };
export type ListingChanges = Pick<SavedListing,
  "title" | "category" | "description" | "price" | "quantity" |
  "condition" | "dimensions" | "pickup_location">;

export function listBrowserDemoListings(): ManagedListing[] {
  return getDemoListings() as ManagedListing[];
}

export function updateBrowserDemoListing(id: string, changes: ListingChanges): ManagedListing {
  if (!changes.title.trim() || !changes.description.trim() || !changes.category.trim() ||
      !changes.condition.trim() || !changes.dimensions.trim() || !changes.pickup_location.trim() ||
      !Number.isFinite(changes.price) || changes.price < 0 ||
      !Number.isSafeInteger(changes.quantity) || changes.quantity < 1) {
    throw new Error("Complete all fields and enter a valid price and quantity.");
  }
  const listings = listBrowserDemoListings();
  const index = listings.findIndex((listing) => listing.id === id);
  if (index < 0) throw new Error("This listing was not found in this browser.");
  const updated = { ...listings[index], ...changes };
  listings[index] = updated;
  localStorage.setItem(KEY, JSON.stringify(listings));
  return updated;
}

export function setBrowserDemoListingStatus(id: string, status: ListingStatus): void {
  const listings = listBrowserDemoListings();
  const listing = listings.find((entry) => entry.id === id);
  if (!listing) throw new Error("This listing was not found in this browser.");
  listing.status = status;
  localStorage.setItem(KEY, JSON.stringify(listings));
}
