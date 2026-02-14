

# Fix Vercel 404, Add Product Images, Sitemap, and SEO

## Issues to Fix

### 1. Vercel 404 Error (Critical)
The screenshot shows a "404: NOT_FOUND" on `drumroast.vercel.app`. This happens because Vercel doesn't know to redirect all routes to `index.html` for your single-page React app. When someone visits `/shop` or `/about` directly, Vercel looks for a file at that path and finds nothing.

**Fix:** Add a `vercel.json` file with a rewrite rule that sends all requests to `index.html`.

### 2. Product Image Upload in Admin
Currently, admin can only set an emoji for products. The `products` table already has an `image_url` column, but the admin form doesn't use it. We need:

- Create a Supabase Storage bucket called `product-images` for storing product photos
- Add an image upload field in the admin Products form
- Show the uploaded image in the product listing table

### 3. Product Cards Show Images Instead of Emoji
Update `ProductCard.tsx` and `ProductDetail.tsx` to display the product's `image_url` when available, falling back to emoji if no image is uploaded.

### 4. Sitemap for Google
Create a `public/sitemap.xml` with all static routes. Dynamic product pages can be added later when products are known.

### 5. SEO Improvements
- Add structured data (JSON-LD) for the business on the home page
- Add canonical URLs and proper meta tags per page
- Create a reusable SEO/meta component
- Update `robots.txt` with sitemap reference

---

## Technical Details

### Files to Create
- `vercel.json` -- Rewrite rules for SPA routing on Vercel
- `public/sitemap.xml` -- Static sitemap with all main routes
- `supabase/migrations/[timestamp]_create_product_images_bucket.sql` -- Storage bucket for product images

### Files to Modify
- `src/pages/admin/Products.tsx` -- Add image upload field, show image preview in table
- `src/components/ProductCard.tsx` -- Show `image_url` when available, fallback to emoji
- `src/pages/ProductDetail.tsx` -- Show product image instead of emoji when available
- `src/pages/Index.tsx` -- Add JSON-LD structured data for the business
- `public/robots.txt` -- Add sitemap URL reference
- `index.html` -- Add canonical link tag

### How Image Upload Works
1. Admin selects a photo in the product form
2. The file is uploaded to Supabase Storage (`product-images` bucket)
3. The public URL is saved in the product's `image_url` column
4. ProductCard and ProductDetail display the image with a gradient overlay, falling back to emoji when no image exists

### Storage Bucket Setup
- Bucket name: `product-images`
- Public access: Yes (so images can be displayed without auth)
- RLS policy: Only admins can upload/delete, anyone can view

