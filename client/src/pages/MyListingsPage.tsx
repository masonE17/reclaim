import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  listSellerListings, setSellerListingStatus, updateSellerListing,
  type ListingChanges, type ListingStatus, type ManagedListing,
} from "../lib/sellerListings";

const inputClass = "w-full rounded-md border border-[#C9D0C5] px-3 py-2 text-[#1B1F1A]";

export default function MyListingsPage() {
  const [listings, setListings] = useState<ManagedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ListingChanges | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    listSellerListings()
      .then((data) => { if (active) setListings(data); })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load listings."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function refresh() {
    setListings(await listSellerListings());
  }

  function edit(item: ManagedListing) {
    const { title, category, description, price, quantity, condition, dimensions, pickup_location } = item;
    setDraft({ title, category, description, price, quantity, condition, dimensions, pickup_location });
    setEditingId(item.id);
    setError("");
    setMessage("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || !editingId || busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await updateSellerListing(editingId, draft);
      await refresh();
      setEditingId(null); setDraft(null);
      setMessage("Listing changes saved to Supabase.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update listing.");
    } finally { setBusy(false); }
  }

  async function changeStatus(id: string, status: ListingStatus) {
    if (busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await setSellerListingStatus(id, status);
      await refresh();
      setMessage(`Listing marked ${status} in Supabase.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update status.");
    } finally { setBusy(false); }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8F5]">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 text-[#1B1F1A]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase text-[#C2410C]">Seller dashboard</p>
            <h1 className="text-3xl font-bold">My Listings</h1>
          </div>
          <Link to="/sell" className="rounded-md bg-[#C2410C] px-4 py-2 font-semibold text-white">Post an item</Link>
        </div>
        <p className="mb-6 rounded-lg border border-[#DDE0D8] bg-white p-4 text-sm text-gray-700">
          Listings for your signed-in account. Edits and availability changes are saved to Supabase.
        </p>
        {error && <p role="alert" className="mb-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {message && <p role="status" className="mb-4 rounded bg-green-50 p-3 text-green-800">{message}</p>}
        {loading ? <p>Loading your listings...</p> : listings.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="font-semibold">No listings found for your account.</p>
            <p className="mt-2 text-sm text-gray-600">Create one on the Sell page, then return here.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {listings.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#DDE0D8] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="h-28 w-36 rounded-md object-cover" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase text-[#C2410C]">{item.category} · {item.condition}</p>
                    <h2 className="mt-1 break-words text-xl font-bold">{item.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{item.pickup_location} · Quantity {item.quantity}</p>
                    <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                    <p className="mt-1 text-xs capitalize text-gray-600">{item.status}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
                  <button type="button" disabled={busy} onClick={() => edit(item)} className="rounded-md border px-3 py-2 text-sm font-semibold disabled:opacity-50">Edit listing</button>
                  <label className="flex items-center gap-2 text-sm">Status:
                    <select className="rounded border px-2 py-2" aria-label={`Status for ${item.title}`}
                      value={item.status} disabled={busy}
                      onChange={(event) => { void changeStatus(item.id, event.target.value as ListingStatus); }}>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </label>
                </div>
                {editingId === item.id && draft && (
                  <form onSubmit={(event) => { void save(event); }} className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
                    {(["title", "category", "condition", "dimensions", "pickup_location"] as const).map((key) => (
                      <label key={key} className="text-sm font-semibold">{key.replaceAll("_", " ")}
                        <input required className={inputClass} value={draft[key]}
                          onChange={(event) => setDraft((old) => old ? { ...old, [key]: event.target.value } : old)} />
                      </label>
                    ))}
                    {(["price", "quantity"] as const).map((key) => (
                      <label key={key} className="text-sm font-semibold">{key}
                        <input required type="number" min={key === "quantity" ? 1 : 0}
                          step={key === "quantity" ? 1 : "0.01"} className={inputClass} value={draft[key]}
                          onChange={(event) => setDraft((old) => old ? { ...old, [key]: Number(event.target.value) } : old)} />
                      </label>
                    ))}
                    <label className="text-sm font-semibold sm:col-span-2">Description
                      <textarea required className={inputClass} rows={3} value={draft.description}
                        onChange={(event) => setDraft((old) => old ? { ...old, description: event.target.value } : old)} />
                    </label>
                    <div className="flex gap-2 sm:col-span-2">
                      <button disabled={busy} type="submit" className="rounded-md bg-[#2F6B47] px-4 py-2 font-semibold text-white disabled:opacity-50">{busy ? "Saving..." : "Save changes"}</button>
                      <button disabled={busy} type="button" onClick={() => { setEditingId(null); setDraft(null); setError(""); }} className="rounded-md border px-4 py-2">Cancel</button>
                    </div>
                  </form>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
