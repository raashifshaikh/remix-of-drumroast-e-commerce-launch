

# Display Offers Publicly, Add Offer Images, Boost SEO

## Problems Found

1. **Offers are invisible to customers** -- They only exist in the admin panel. The homepage and shop page never show active offers/deals to visitors.
2. **No offer image support** -- The `offers` table has no `image_url` column, so admins can't attach promotional banners.
3. **Blog link missing from navigation** -- The blog exists but there's no way for users to find it from the header menu.
4. **SEO gaps** -- No Offer structured data (JSON-LD), and the blog is unreachable from navigation which hurts discoverability.

---

## What Will Change

### 1. Add `image_url` column to `offers` table
A database migration to add an `image_url` text column to the `offers` table so each offer can have a promotional banner image. Images will be stored in the existing `product-images` storage bucket.

### 2. Update Admin Offers page with image upload
Modify `src/pages/admin/Offers.tsx` to include:
- An image upload field (same pattern as admin Products page)
- Image preview in the offers table
- Upload to `product-images` bucket in Supabase Storage

### 3. Add Offers Banner Section to Homepage
Add a new section to `src/pages/Index.tsx` between the hero and stats sections that:
- Fetches active offers from the database
- Displays them as eye-catching banner cards with the offer image, title, discount percentage, and a "Shop Now" link
- Falls back gracefully when no active offers exist (section simply doesn't render)
- Includes Offer JSON-LD structured data for Google rich results

### 4. Add Offers Banner to Shop Page
Add a horizontal scrollable offers strip at the top of the Shop page (`src/pages/Shop.tsx`) showing active deals with discount badges and offer images.

### 5. Add Blog link to navigation
Update `src/components/layout/Header.tsx` to add "Blog" to the nav links array so visitors can discover the SEO content.

### 6. Add Offer JSON-LD structured data
Each visible offer will include Schema.org `Offer` markup so Google can show special offer rich results in search.

---

## Technical Details

### Database Migration
```sql
ALTER TABLE offers ADD COLUMN image_url text;
```

### Files to Modify
- `src/pages/admin/Offers.tsx` -- Add image upload field and preview column
- `src/pages/Index.tsx` -- Add offers banner section with structured data
- `src/pages/Shop.tsx` -- Add offers strip above product grid
- `src/components/layout/Header.tsx` -- Add "Blog" to navLinks array

### Offers Display Logic
- Query: `supabase.from("offers").select("*").eq("is_active", true)` with date filtering (`start_date <= now`, `end_date >= now`)
- Each offer card shows: image (or gradient fallback), title, description, discount percentage, and link to the associated product (if `product_id` is set) or to `/shop`
- Offer JSON-LD schema includes `@type: Offer`, name, description, discount, validity dates, and seller info

### Navigation Update
Add `{ to: "/blog", label: "Blog" }` to the navLinks array in Header.tsx, positioned after "Contact".

