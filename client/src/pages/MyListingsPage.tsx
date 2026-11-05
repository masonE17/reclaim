import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  listBrowserDemoListings, setBrowserDemoListingStatus,
  updateBrowserDemoListing, type ListingChanges, type ListingStatus,
  type ManagedListing,
} from "../lib/demoListingManagement";

const inputClass = "w-full rounded-md border border-[#C9D0C5] px-3 py-2 text-[#1B1F1A]";

export default function MyListingsPage() {
  const [listings, setListings] = useState<ManagedListing[]>(() => listBrowserDemoListings());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ListingChanges | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  function refresh() { setListings(listBrowserDemoListings()); }
  function edit(item: ManagedListing) {
    const { title, category, description, price, quantity, condition, dimensions, pickup_location } = item;
    setDraft({ title, category, description, price, quantity, condition, dimensions, pickup_location });
    setEditingId(item.id);
    setError(""); setMessage("");
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || !editingId) return;
    try {
      updateBrowserDemoListing(editingId, draft);
      setEditingId(null); setDraft(null); refresh();
      setMessage("Demo listing updated in this browser."); setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update listing."); }
  }
  function changeStatus(id: string, status: ListingStatus) {
    try {
      setBrowserDemoListingStatus(id, status);
      refresh(); setMessage(`Listing marked ${status} in this browser.`); setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update status."); }
  }
  return <div className="flex min-h-screen flex-col bg-[#F7F8F5]">
    <Header />
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 text-[#1B1F1A]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-semibold uppercase text-[#C2410C]">Seller dashboard</p>
          <h1 className="text-3xl font-bold">My Listings</h1></div>
        <Link to="/sell" className="rounded-md bg-[#C2410C] px-4 py-2 font-semibold text-white">Post an item</Link>
      </div>
      <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Local demo only.</strong> These are listings saved in this browser, not your authenticated account.
        Changes are not sent to Supabase and are not visible to teammates. Photos are not stored.
      </div>
      {error && <p role="alert" className="mb-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
      {message && <p role="status" className="mb-4 rounded bg-green-50 p-3 text-green-800">{message}</p>}
      {listings.length === 0 ? <div className="rounded-xl border bg-white p-8 text-center">
        <p className="font-semibold">No demo listings saved in this browser yet.</p>
        <p className="mt-2 text-sm text-gray-600">Create one on the Sell page, then return here.</p>
      </div> : <div className="grid gap-4">
        {listings.map(item => <article key={item.id} className="rounded-xl border border-[#DDE0D8] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase text-[#C2410C]">{item.category} · {item.condition}</p>
              <h2 className="mt-1 break-words text-xl font-bold">{item.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{item.pickup_location} · Quantity {item.quantity}</p>
              <p className="mt-2 text-sm text-gray-700">{item.description}</p>
            </div>
            <div className="text-right"><p className="text-xl font-bold">${item.price.toFixed(2)}</p>
              <p className="mt-1 text-xs capitalize text-gray-600">{item.status ?? "available"} (demo)</p></div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
            <button onClick={() => edit(item)} className="rounded-md border px-3 py-2 text-sm font-semibold">Edit listing</button>
            <label className="flex items-center gap-2 text-sm">Status:
              <select className="rounded border px-2 py-2" aria-label={`Status for ${item.title}`}
                value={item.status ?? "available"}
                onChange={e => changeStatus(item.id, e.target.value as ListingStatus)}>
                <option value="available">Available</option><option value="sold">Sold</option><option value="unavailable">Unavailable</option>
              </select>
            </label>
          </div>
          {editingId === item.id && draft && <form onSubmit={save} className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
            {(["title", "category", "condition", "dimensions", "pickup_location"] as const).map(key =>
              <label key={key} className="text-sm font-semibold">{key.replaceAll("_", " ")}
                <input className={inputClass} value={draft[key]}
                  onChange={e => setDraft(old => old ? { ...old, [key]: e.target.value } : old)} /></label>)}
            {(["price", "quantity"] as const).map(key =>
              <label key={key} className="text-sm font-semibold">{key}
                <input type="number" min={key === "quantity" ? 1 : 0} step={key === "quantity" ? 1 : "0.01"}
                  className={inputClass} value={draft[key]}
                  onChange={e => setDraft(old => old ? { ...old, [key]: Number(e.target.value) } : old)} /></label>)}
            <label className="text-sm font-semibold sm:col-span-2">Description
              <textarea className={inputClass} rows={3} value={draft.description}
                onChange={e => setDraft(old => old ? { ...old, description: e.target.value } : old)} /></label>
            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" className="rounded-md bg-[#2F6B47] px-4 py-2 font-semibold text-white">Save changes</button>
              <button type="button" onClick={() => { setEditingId(null); setDraft(null); setError(""); }} className="rounded-md border px-4 py-2">Cancel</button>
            </div>
          </form>}
        </article>)}
      </div>}
    </main>
    <Footer />
  </div>;
}
