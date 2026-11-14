import { supabase } from "./supabase";
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

export type SaveResult = { listing: SavedListing };

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
  };
}
