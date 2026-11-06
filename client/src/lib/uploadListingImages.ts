import { supabase } from "./supabase";

const BUCKET = "listing-images-new";

export async function uploadListingImages(
  listingId: string,
  files: File[]
) {
  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Please sign in to upload photos.");
  }

  if (files.length < 1 || files.length > 5) {
    throw new Error("Select between 1 and 5 photos.");
  }

  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const uploadedUrls: string[] = [];

  for (const [index, file] of files.entries()) {
    const extension = extensions[file.type];

    if (!extension || file.size > 5 * 1024 * 1024) {
      throw new Error("Use JPG, PNG or WebP files under 5 MB.");
    }

    const path =
      `${user.id}/${listingId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { error: recordError } = await supabase
      .from("listing_images")
      .insert({
        listing_id: listingId,
        storage_path: path,
        sort_order: index,
      });

    if (recordError) {
      throw new Error(
        `Photo uploaded, but its database record failed: ${recordError.message}`
      );
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path);

    uploadedUrls.push(data.publicUrl);
  }

  // Preserve compatibility with existing marketplace cards.
  const { error: updateError } = await supabase
    .from("listings")
    .update({ image_url: uploadedUrls[0] })
    .eq("id", listingId)
    .eq("seller_id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return uploadedUrls;
}