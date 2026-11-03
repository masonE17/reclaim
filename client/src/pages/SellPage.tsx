import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import Footer from "../components/Footer";
import { createListing, type SaveResult } from "../lib/createListing";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
type ListingForm = {
  title: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  condition: string;
  dimensions: string;
  pickupLocation: string;
};

type Field = keyof ListingForm;
type Errors = Partial<Record<Field | "image", string>>;

const initialForm: ListingForm = {
  title: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  condition: "",
  dimensions: "",
  pickupLocation: "",
};

const categories = [
  "Lumber",
  "Doors",
  "Windows",
  "Flooring",
  "Pipes",
  "Fixtures",
  "Hardware",
  "Other",
];

const conditions = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Salvageable",
];

const inputClass =
  "w-full rounded-lg border border-[#C9D0C5] bg-white px-3 py-2.5 text-[#1B1F1A] outline-none focus:border-[#2F6B47] focus:ring-2 focus:ring-[#2F6B47]/20";

function validate(
  form: ListingForm,
  image: File | null
): Errors {
  const errors: Errors = {};

  if (!form.title.trim()) {
    errors.title = "Enter an item name.";
  } else if (form.title.trim().length > 120) {
    errors.title = "Use 120 characters or fewer.";
  }

  if (!form.category) {
    errors.category = "Select a category.";
  }

  if (!form.description.trim()) {
    errors.description = "Enter a description.";
  }

  if (
    !form.price.trim() ||
    !Number.isFinite(Number(form.price)) ||
    Number(form.price) < 0
  ) {
    errors.price = "Enter a valid price of $0 or more.";
  }

  if (
    !/^\d+$/.test(form.quantity.trim()) ||
    Number(form.quantity) < 1 ||
    !Number.isSafeInteger(Number(form.quantity))
  ) {
    errors.quantity =
      "Enter a whole number of at least 1.";
  }

  if (!form.condition) {
    errors.condition = "Select a condition.";
  }

  if (!form.dimensions.trim()) {
    errors.dimensions =
      "Enter dimensions, including units.";
  }

  if (!form.pickupLocation.trim()) {
    errors.pickupLocation =
      "Enter a pickup location.";
  }

  if (!image) {
    errors.image = "Select a listing image.";
  }

  return errors;
}

export default function SellPage() {
  const [form, setForm] =
    useState<ListingForm>(initialForm);

  const [image, setImage] =
    useState<File | null>(null);

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const imageUrlRef = useRef<string | null>(null);

  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState<SaveResult | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const urlRef = imageUrlRef;

    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, []);

  function update(field: Field, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function clearImageUrl() {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }

    setImageUrl(null);
  }

  function selectImage(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError(
        "Choose a JPG, PNG, or WebP image."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError(
        "The image must be 5 MB or smaller."
      );
      return;
    }

    clearImageUrl();

    const url = URL.createObjectURL(file);

    imageUrlRef.current = url;

    setImage(file);
    setImageUrl(url);
    setImageError("");

    setErrors((current) => ({
      ...current,
      image: undefined,
    }));
  }

  function removeImage() {
    clearImageUrl();
    setImage(null);
    setImageError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(form, image);

    setErrors(nextErrors);

    if (
      Object.keys(nextErrors).length === 0 &&
      !imageError
    ) {
      setPreview(true);
      window.scrollTo(0, 0);
    }
  }

  async function saveListing() {
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

  function textField(
    field: Field,
    label: string,
    placeholder: string,
    type = "text"
  ) {
    return (
      <label
        className="block space-y-1.5"
        key={field}
      >
        <span className="text-sm font-semibold text-[#1B1F1A]">
          {label}{" "}
          <span className="text-red-700">*</span>
        </span>

        <input
          className={inputClass}
          type={type}
          min={
            type === "number"
              ? field === "quantity"
                ? 1
                : 0
              : undefined
          }
          step={
            type === "number"
              ? field === "quantity"
                ? 1
                : "0.01"
              : undefined
          }
          value={form[field]}
          placeholder={placeholder}
          onChange={(event) =>
            update(field, event.target.value)
          }
          aria-invalid={Boolean(errors[field])}
          aria-describedby={
            errors[field]
              ? `${field}-error`
              : undefined
          }
        />

        {errors[field] && (
          <p
            id={`${field}-error`}
            className="text-sm text-red-700"
          >
            {errors[field]}
          </p>
        )}
      </label>
    );
  }

  function selectField(
    field: "category" | "condition",
    label: string,
    options: string[]
  ) {
    return (
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[#1B1F1A]">
          {label}{" "}
          <span className="text-red-700">*</span>
        </span>

        <div className="relative">
          <select
            className={`${inputClass} appearance-none pr-10`}
            value={form[field]}
            onChange={(event) =>
              update(field, event.target.value)
            }
            aria-invalid={Boolean(errors[field])}
            aria-describedby={
              errors[field]
                ? `${field}-error`
                : undefined
            }
          >
            <option value="">
              Select {label.toLowerCase()}
            </option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#5A6058]"
          />
        </div>

        {errors[field] && (
          <p
            id={`${field}-error`}
            className="text-sm text-red-700"
          >
            {errors[field]}
          </p>
        )}
      </label>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header for sell page */}
      <div className="sticky top-0 z-50 w-full bg-[#FFFFFF] flex justify-center items-center py-3 border-b-2 border-[#DDE0D8]">
        <div className="w-full max-w-325 flex flex-row justify-between items-center p-1">
          {/* Logo and link to home page */}
          <Link to="/" className="flex flex-row justify-center items-center gap-1">
            <img src="/ReClaim-icon.png" alt="ReClaim Logo" className="w-12 h-12" />
            <p className="text-[#1B1F1A] font-bold text-[28px]">ReClaim</p>
          </Link>
          {/* Post listing and profile buttons */}
          <div className="flex flex-row justify-center items-center gap-10">
            <div className="flex flex-row justify-center items-center gap-6">
              <button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] py-3 px-4 border border-[#C9CFCB] rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Cancel</button>
              <button className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Post listing</button>
            </div>
            <Link to="/profile" className="flex flex-row justify-center items-center gap-2 pr-2">
              <p className="text-[#5A6058] font-semibold text-[15px]">Profile</p>
              <div className="w-10 h-10 rounded-full bg-[#E3E7DE] flex justify-center items-center">
                <p className="text-[#5A6058] font-semibold text-[18px]">?</p>
              </div>
            </Link>
          </div>
        </div>
      </div>


      <main className="flex-1 bg-[#F7F8F5] text-[#1B1F1A]">
        <div className="w-full max-w-325 mx-auto p-10">
          <div className="mb-10">
            <p className="font-semibold text-[#C2410C] text-[13px]">
              RECLAIM MARKETPLACE
            </p>

            <h1 className="font-extrabold text-[#1B1E1C] text-[44px] -mt-2">
              {preview
                ? "Preview your listing"
                : "Post an item"}
            </h1>

            <p className="text-[#48514C] text-[18px]">
              {preview
                ? "Review your details before moving on. This is only a preview, so nothing has been published yet."
                : "Give your reusable materials a second life. Fill in the details below to create a listing preview."}
            </p>
          </div>

          {preview ? (
            <section className="overflow-hidden rounded-2xl border border-[#DDE0D8] bg-white shadow-sm">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={`Preview of ${form.title}`}
                  className="max-h-96 w-full bg-[#F0F2ED] object-contain"
                />
              )}

              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#C2410C] text-[13px] uppercase">
                      {form.category} · {form.condition}
                    </p>

                    <h2 className="font-extrabold text-[#1B1E1C] text-[36px]">
                      {form.title.trim()}
                    </h2>
                  </div>

                  <p className="font-extrabold text-[#C2410C] text-[36px]">
                    ${Number(form.price).toFixed(2)}
                  </p>
                </div>

                <p className="whitespace-pre-wrap text-[#48514C] text-[18px] -mt-4">
                  {form.description.trim()}
                </p>

                <dl className="grid gap-4 border-t border-[#DDE0D8] pt-5 sm:grid-cols-2">
                  {[
                    ["Quantity", form.quantity],
                    ["Dimensions", form.dimensions],
                    ["Pickup location", form.pickupLocation],
                    ["Image", image?.name ?? ""],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-semibold text-[#55605A] text-[14px]">
                        {label}
                      </dt>

                      <dd className="mt-1 wrap-break-word font-bold text-[#1B1E1C] text-[18px]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="rounded-lg bg-[#EFF5EE] p-4 text-sm text-[#31573D]">
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
                )}

                <button
                  type="button"
                  disabled={Boolean(saved)}
                  onClick={() => {
                    if (saved) return;
                    setPreview(false);
                    window.scrollTo(0, 0);
                  }}
                  className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer"
                >
                  {saved ? "Review saved details" : "Edit listing"}
                </button>
              </div>
            </section>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="space-y-7 rounded-2xl border border-[#DDE0D8] bg-white p-5 shadow-sm sm:p-8"
            >
              <section className="space-y-5">
                <h2 className="border-b border-[#DDE0D8] pb-3 text-xl font-bold">
                  Material details
                </h2>

                {textField(
                  "title",
                  "Item name",
                  "e.g. Reclaimed oak floorboards"
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {selectField(
                    "category",
                    "Category",
                    categories
                  )}

                  {selectField(
                    "condition",
                    "Condition",
                    conditions
                  )}
                </div>

                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold">
                    Description{" "}
                    <span className="text-red-700">
                      *
                    </span>
                  </span>

                  <textarea
                    className={`${inputClass} min-h-30`}
                    value={form.description}
                    placeholder="Describe the material, any wear, and what a buyer should know."
                    onChange={(event) =>
                      update(
                        "description",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.description
                    )}
                    aria-describedby={
                      errors.description
                        ? "description-error"
                        : undefined
                    }
                  />

                  {errors.description && (
                    <p
                      id="description-error"
                      className="text-sm text-red-700"
                    >
                      {errors.description}
                    </p>
                  )}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  {textField(
                    "price",
                    "Price ($)",
                    "e.g. 45.00",
                    "number"
                  )}

                  {textField(
                    "quantity",
                    "Quantity available",
                    "e.g. 12",
                    "number"
                  )}
                </div>

                {textField(
                  "dimensions",
                  "Dimensions",
                  "e.g. 8 ft × 6 in × 1 in"
                )}

                {textField(
                  "pickupLocation",
                  "Pickup location",
                  "e.g. Atlanta, GA"
                )}
              </section>

              <section className="space-y-3">
                <h2 className="border-b border-[#DDE0D8] pb-3 text-xl font-bold">
                  Material photo
                </h2>

                <label className="block cursor-pointer rounded-xl border-2 border-dashed border-[#BDCBBB] bg-[#F7F9F5] p-6 text-center hover:border-[#2F6B47] focus-within:border-[#2F6B47]">
                  <span className="block font-semibold text-[#2F6B47]">
                    Choose a photo
                  </span>

                  <span className="mt-1 block text-sm text-[#5A6058]">
                    JPG, PNG, or WebP · Up to 5 MB
                  </span>

                  <span className="mt-4 block break-all text-sm text-[#5A6058]">
                    {image ? image.name : "No file selected"}
                  </span>

                  <input
                    className="sr-only"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selectImage}
                    aria-label="Upload material photo"
                  />
                </label>

                {(imageError || errors.image) && (
                  <p
                    role="alert"
                    className="text-sm text-red-700"
                  >
                    {imageError || errors.image}
                  </p>
                )}

                {imageUrl && (
                  <div className="flex flex-wrap items-start gap-4 rounded-lg border border-[#DDE0D8] p-3">
                    <img
                      src={imageUrl}
                      alt="Selected material preview"
                      className="h-36 w-44 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-medium">
                        {image?.name}
                      </p>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-3 text-sm font-semibold text-red-700 underline"
                      >
                        Remove photo
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <div className="flex flex-col items-start gap-3 border-t border-[#DDE0D8] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#5A6058]">
                  Fields marked * are required.
                  Photos remain preview-only until storage is connected.
                </p>

                <button
                  type="submit"
                  className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer"
                >
                  Preview listing <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
