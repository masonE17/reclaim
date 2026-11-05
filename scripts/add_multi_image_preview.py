"""Patch the current ReClaim SellPage to preview up to five images, without uploading them.
Run from repository root. Abort if any expected section changed. Creates a backup of SellPage.
"""
from pathlib import Path
p=Path('client/src/pages/SellPage.tsx')
s=p.read_text(encoding='utf-8')
if 'const [images, setImages]' in s:
    raise SystemExit('Multi-image changes already appear to be installed; no changes made.')

def replace_once(old,new,label):
    global s
    n=s.count(old)
    if n!=1:
        raise SystemExit(f'Cannot safely patch {label}: expected 1 match, found {n}. No file modified.')
    s=s.replace(old,new,1)

replace_once('  image: File | null\n): Errors {','  images: File[]\n): Errors {','validation signature')
replace_once('  if (!image) {\n    errors.image = "Select a listing image.";\n  }','  if (images.length === 0) {\n    errors.image = "Select at least one listing image.";\n  }','required image')
old='''  const [image, setImage] =
    useState<File | null>(null);

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const imageUrlRef = useRef<string | null>(null);'''
new='''  // Local-only previews. Files are NOT stored in Supabase until Julian adds Storage.
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageUrlsRef = useRef<string[]>([]);
  const imageUrl = imageUrls[0] ?? null;'''
replace_once(old,new,'image state')
replace_once('''    const urlRef = imageUrlRef;

    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };''','''    const urlsRef = imageUrlsRef;
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current = [];
    };''','image cleanup')
start=s.index('  function clearImageUrl() {')
end=s.index('  function submit(event: FormEvent<HTMLFormElement>) {',start)
newblock='''  function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selected.length === 0) return;
    if (selected.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setImageError("Only JPG, PNG, and WebP images are supported.");
      return;
    }
    if (selected.some(file => file.size > 5 * 1024 * 1024)) {
      setImageError("Each image must be 5 MB or smaller.");
      return;
    }
    if (images.length + selected.length > 5) {
      setImageError("A listing can have up to 5 photos.");
      return;
    }
    const urls = selected.map(file => URL.createObjectURL(file));
    imageUrlsRef.current = [...imageUrlsRef.current, ...urls];
    setImages(prev => [...prev, ...selected]);
    setImageUrls(prev => [...prev, ...urls]);
    setImageError("");
    setErrors(prev => ({ ...prev, image: undefined }));
  }

  function removeImage(index: number) {
    const url = imageUrlsRef.current[index];
    if (url) URL.revokeObjectURL(url);
    imageUrlsRef.current = imageUrlsRef.current.filter((_, i) => i !== index);
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageError("");
  }

'''
s=s[:start]+newblock+s[end:]
if s.count('validate(form, image)')!=2: raise SystemExit('Expected exactly two validation calls. No file modified.')
s=s.replace('validate(form, image)','validate(form, images)')
replace_once('["Image", image?.name ?? ""],','["Images", `${images.length} selected (preview only)`],','image metadata')
replace_once('JPG, PNG, or WebP · Up to 5 MB','Up to 5 JPG, PNG, or WebP photos · 5 MB per photo','upload instructions')
replace_once('{image ? image.name : "No file selected"}', '{images.length ? `${images.length} photo(s) selected` : "No photos selected"}', 'upload label')
replace_once('''                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selectImage}''','''                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selectImage}''','file input multiple')
start=s.index('                {imageUrl && (',s.index('type="file"'))
end=s.index('              </section>',start)
old=s[start:end]
new='''                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {imageUrls.map((url, index) => (
                      <div key={url} className="rounded-lg border border-[#DDE0D8] p-2">
                        <img src={url} alt={`Material photo ${index + 1}`} className="h-28 w-full rounded object-cover" />
                        <p className="mt-1 truncate text-xs" title={images[index]?.name}>{images[index]?.name}</p>
                        <button type="button" onClick={() => removeImage(index)}
                          className="mt-2 text-sm font-semibold text-red-700 underline">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
'''
s=s[:start]+new+s[end:]
# Add a practical route to My Listings without modifying ProfilePage, owned by Mason.
anchor='''          {/* Post listing and profile buttons */}'''
replace_once(anchor,'''          <Link to="/my-listings" className="rounded-md border border-[#C9CFCB] px-3 py-2 font-semibold text-[#1B1E1C] hover:bg-[#F1F2EE]">My Listings</Link>
          {/* Post listing and profile buttons */}''','my listings navigation')
# Stop the misleading inert controls; Cancel navigates, Post listing scrolls to form rather than publishing silently.
replace_once('''<button className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] py-3 px-4 border border-[#C9CFCB] rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Cancel</button>''','''<Link to="/my-listings" className="text-[#1B1E1C] bg-[#FFFFFF] hover:bg-[#F1F2EE] py-3 px-4 border border-[#C9CFCB] rounded-[5px] font-semibold text-[15px]">Cancel</Link>''','cancel navigation')
replace_once('''<button className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Post listing</button>''','''<button type="button" onClick={() => document.getElementById("seller-form")?.scrollIntoView({ behavior: "smooth" })} className="text-[#FFFFFF] bg-[#C2410C] hover:bg-[#9A3412] py-3 px-4 rounded-[5px] font-semibold text-[15px] hover:cursor-pointer">Post listing</button>''','top nav button')
replace_once('''            <form
              onSubmit={submit}''','''            <form
              id="seller-form"
              onSubmit={submit}''','form target')
# Establish that previews and demo listings are not persistent images.
replace_once('Photos remain preview-only until storage is connected.', 'All selected photos remain preview-only until Supabase Storage is connected.', 'storage notice')
# Prevent visible photo previews implying the photo will be saved.
backup=p.with_suffix('.tsx.backup')
if not backup.exists(): backup.write_text(p.read_text(encoding='utf-8'), encoding='utf-8')
p.write_text(s,encoding='utf-8')
print('Patched seller page for up to 5 local photo previews, My Listings navigation, and functional header buttons.')
print('Backup:',backup)
