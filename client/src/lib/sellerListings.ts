import { supabase } from "./supabase";

export type ListingStatus = "available" | "sold" | "unavailable";
export type ManagedListing = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  condition: string;
  dimensions: string;
  pickup_location: string;
  status: ListingStatus;
  image_url: string | null;
  created_at: string;
};
export type ListingChanges = Pick<ManagedListing,
  "title" | "category" | "description" | "price" | "quantity" |
  "condition" | "dimensions" | "pickup_location">;

async function signedInUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Please sign in before managing listings.");
  return user.id;
}

function isStatus(value: unknown): value is ListingStatus {
  return value === "available" || value === "sold" || value === "unavailable";
}

// The database column is named `location`; the seller form uses `pickup_location`.
function mapListing(value: Record<string, unknown>): ManagedListing {
  return {
    id: String(value.id),
    title: String(value.title ?? ""),
    category: String(value.category ?? ""),
    description: String(value.description ?? ""),
    price: Number(value.price),
    quantity: Number(value.quantity ?? 0),
    condition: String(value.condition ?? ""),
    dimensions: String(value.dimensions ?? ""),
    pickup_location: String(value.location ?? ""),
    status: isStatus(value.status) ? value.status : "available",
    image_url: typeof value.image_url === "string" ? value.image_url : null,
    created_at: String(value.created_at ?? ""),
  };
}

export async function listSellerListings(): Promise<ManagedListing[]> {
  const userId = await signedInUserId();
  const { data, error } = await supabase.from("listings")
    .select("id,title,category,description,price,quantity,condition,dimensions,location,status,image_url,created_at")
    .eq("seller_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => mapListing(row));
}

function validateChanges(changes: ListingChanges): void {
  if (!changes.title.trim() || changes.title.trim().length > 120 ||
      !changes.category.trim() || !changes.description.trim() ||
      !changes.condition.trim() || !changes.dimensions.trim() ||
      !changes.pickup_location.trim() ||
      !Number.isFinite(changes.price) || changes.price < 0 ||
      !Number.isSafeInteger(changes.quantity) || changes.quantity < 1) {
    throw new Error("Complete all fields with a valid title, price, and quantity.");
  }
}

export async function updateSellerListing(id: string, changes: ListingChanges): Promise<void> {
  validateChanges(changes);
  const userId = await signedInUserId();
  const { data, error } = await supabase.from("listings")
    .update({
      title: changes.title.trim(), category: changes.category.trim(),
      description: changes.description.trim(), price: changes.price,
      quantity: changes.quantity, condition: changes.condition.trim(),
      dimensions: changes.dimensions.trim(), location: changes.pickup_location.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id).eq("seller_id", userId)
    .select("id").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Listing not found, or you do not have permission to edit it.");
}

export async function setSellerListingStatus(id: string, status: ListingStatus): Promise<void> {
  if (!isStatus(status)) throw new Error("Invalid listing status.");
  const userId = await signedInUserId();
  const { data, error } = await supabase.from("listings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id).eq("seller_id", userId)
    .select("id").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Listing not found, or you do not have permission to change its status.");
}
