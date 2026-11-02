"""Run from the root of the existing ReClaim checkout. Fails closed if source changed."""
from pathlib import Path
p = Path('client/src/pages/SellPage.tsx')
s = p.read_text(encoding='utf8')

def replace_once(old, new):
    global s
    if s.count(old) != 1:
        raise SystemExit(f'Expected exactly one match, found {s.count(old)}: {old[:90]!r}. No file modified.')
    s = s.replace(old, new, 1)

replace_once('import Footer from "../components/Footer";', 'import Footer from "../components/Footer";\nimport { createListing, type SaveResult } from "../lib/createListing";')
replace_once('  const [preview, setPreview] = useState(false);', '''  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState<SaveResult | null>(null);''')
replace_once('  function textField(', '''  async function saveListing() {
    if (saving || saved) return;
    const nextErrors = validate(form, image);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || imageError) {
      setPreview(false);
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const result = await createListing({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
        condition: form.condition,
        dimensions: form.dimensions.trim(),
        pickup_location: form.pickupLocation.trim(),
      });
      setSaved(result);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to save listing.");
    } finally {
      setSaving(false);
    }
  }

  function textField(''')
replace_once('''                <div className="rounded-lg bg-[#EFF5EE] p-4 text-sm text-[#31573D]">
                  Preview complete. Database
                  publishing will be added when
                  the backend is ready.
                </div>''', '''                <div className="rounded-lg bg-[#EFF5EE] p-4 text-sm text-[#31573D]">
                  {saved
                    ? saved.demo
                      ? "Demo listing saved only in this browser. It is NOT in Supabase or visible to teammates."
                      : "Listing saved by the connected server."
                    : "Review your listing and submit below. Photos are preview-only and are NOT uploaded or persisted yet."}
                </div>

                {saveError && (
                  <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {saveError}
                  </p>
                )}
                {saved && (
                  <p role="status" className="text-sm font-semibold text-[#2F6B47]">
                    Saved listing ID: {saved.listing.id}
                  </p>
                )}
                {!saved && (
                  <button
                    type="button"
                    onClick={() => { void saveListing(); }}
                    disabled={saving}
                    className="rounded-lg bg-[#2F6B47] px-6 py-3 font-semibold text-white disabled:opacity-50 hover:bg-[#25573A]"
                  >
                    {saving ? "Saving..." : "Submit listing"}
                  </button>
                )}''')
replace_once('''                  Edit listing
                </button>''', '''                  {saved ? "Review saved details" : "Edit listing"}
                </button>''')
replace_once('''                  Listings are not saved yet.''', '''                  Photos remain preview-only until storage is connected.''')
# Prevent editing a submitted listing without creating a new submission.
replace_once('''                    setPreview(false);
                    window.scrollTo(0, 0);''', '''                    if (saved) return;
                    setPreview(false);
                    window.scrollTo(0, 0);''')
replace_once('''                  onClick={() => {
                    if (saved) return;''', '''                  disabled={Boolean(saved)}
                  onClick={() => {
                    if (saved) return;''')
p.write_text(s, encoding='utf8')
print('Patched:', p)
