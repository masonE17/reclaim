import { supabase } from "./supabase";
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
export async function createListing(
  input: CreateListingInput
): Promise<SaveResult> {
  // Require a signed-in seller
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Please sign in before posting a listing.");
  }

  // Save the listing to Supabase
  const { data, error } = await supabase
    .from("listings")
    .insert({
      seller_id: user.id,
      title: input.title,
      category: input.category,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
      condition: input.condition,
      dimensions: input.dimensions,
      location: input.pickup_location,
      status: "available",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Convert database fields back to the existing frontend format
  return {
    listing: {
      id: data.id,
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      condition: data.condition,
      dimensions: data.dimensions,
      pickup_location: data.location,
      created_at: data.created_at,
    },
    demo: false,
  };
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
