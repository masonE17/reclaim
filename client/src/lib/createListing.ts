/** Seller submission boundary. Julian can replace this implementation once the API/schema is agreed. */
export type CreateListingInput = {
  title: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  condition: string;
  dimensions: string;
  pickup_location: string;
};

export type SavedListing = CreateListingInput & {
  id: string;
  created_at: string;
};

export type SaveResult = { listing: SavedListing; demo: boolean };

const DEMO_STORAGE_KEY = "reclaim-demo-listings-v1";

/**
 * Until Julian provides the server, this saves only to this browser's localStorage.
 * Do not claim demo listings are published, shared, or saved to Supabase.
 * Once VITE_LISTINGS_API_URL is configured, the code POSTs JSON to that URL.
 * The API must enforce authentication, authorization, schema validation and rate limits.
 */
export async function createListing(input: CreateListingInput): Promise<SaveResult> {
  const endpoint = import.meta.env.VITE_LISTINGS_API_URL?.trim();
  if (!endpoint) {
    const previous = getDemoListings();
    const listing: SavedListing = {
      ...input,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify([listing, ...previous]));
    } catch {
      throw new Error("Browser storage is unavailable. The demo listing was not saved.");
    }
    return { listing, demo: true };
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("Could not connect to the listings server. Please try again.");
  }
  if (!response.ok) {
    throw new Error(`Listing was not saved (server returned ${response.status}).`);
  }
  const value: unknown = await response.json();
  if (!isSavedListing(value)) {
    throw new Error("The server returned an unexpected listing response.");
  }
  return { listing: value, demo: false };
}

export function getDemoListings(): SavedListing[] {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    const value: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(value) ? value.filter(isSavedListing) : [];
  } catch {
    return [];
  }
}

function isSavedListing(value: unknown): value is SavedListing {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<SavedListing>;
  return typeof v.id === "string" && typeof v.created_at === "string" &&
    typeof v.title === "string" && typeof v.category === "string" &&
    typeof v.description === "string" && typeof v.price === "number" &&
    Number.isFinite(v.price) && typeof v.quantity === "number" &&
    Number.isSafeInteger(v.quantity) && typeof v.condition === "string" &&
    typeof v.dimensions === "string" && typeof v.pickup_location === "string";
}
