

# Fix Blank Product Page, Polish Cart/WhatsApp Flow, Add Blog & SEO

## 1. Critical Bug Fix: Blank Product Detail Page

**Root cause:** In `ProductDetail.tsx`, the hooks `useAuth()`, `useCart()`, and `useNavigate()` are called on lines 137-139 -- AFTER early returns for loading (line 105) and not-found (line 125). This violates React's Rules of Hooks, which requires all hooks to be called in the same order every render. This crashes the component silently, causing a blank page.

**Fix:** Move all hook calls (`useAuth`, `useCart`, `useNavigate`) to the top of the component, before any conditional returns.

## 2. WhatsApp Checkout Flow Polish

The current Checkout page works but needs minor improvements:
- After the user clicks "Order via WhatsApp", clear their cart automatically so they don't see stale items
- Add a confirmation step before opening WhatsApp ("Your order details will be sent via WhatsApp")
- Show a small note with the WhatsApp number so users know who they're contacting

## 3. Blog System for SEO Ranking

To rank for keywords like "cashew", "almond", "dry fruits", "drum roast", we need content pages. Since there's no CMS, we'll create static blog pages with rich, keyword-optimized content.

### New files:
- `src/pages/Blog.tsx` -- Blog listing page with all articles
- `src/pages/BlogPost.tsx` -- Individual blog post renderer
- `src/data/blogPosts.ts` -- Blog content data (titles, slugs, content, meta descriptions)

### Blog posts to include (5 articles):
1. **"Health Benefits of Drum Roasted Cashews"** -- targets: cashew benefits, roasted cashews, healthy snacks
2. **"Why DrumRoast Cashews Are India's Finest"** -- targets: drum roast, premium cashews India
3. **"Almonds vs Cashews: A Complete Nutrition Guide"** -- targets: almond, cashew comparison
4. **"Best Dry Fruits for Daily Snacking"** -- targets: dry fruits, daily snacks, healthy eating
5. **"Corporate Gifting with Premium Dry Fruits"** -- targets: corporate gifts, dry fruit gift boxes

Each blog post will include:
- SEO-optimized title, meta description, and keywords
- JSON-LD Article structured data
- Internal links to product pages and shop
- Proper heading hierarchy (H1, H2, H3)

### Route: `/blog` and `/blog/:slug`

## 4. Advanced SEO Enhancements

### Per-page meta tags
Create a reusable `SEOHead` component that dynamically sets:
- `document.title`
- Meta description via `useEffect`
- JSON-LD structured data per page type

### Product page SEO
Add Product schema (JSON-LD) to `ProductDetail.tsx` with:
- Product name, description, price, image, availability
- Brand: DrumRoast
- Currency: INR

### Sitemap update
Add `/blog` and individual blog post URLs to `public/sitemap.xml`

### index.html improvements
- Add more keyword variations to meta keywords
- Ensure OG image URLs are absolute (`https://drumroast.vercel.app/og-image.jpg`)

## Technical Details

### Files to create:
- `src/components/SEOHead.tsx` -- Reusable SEO component
- `src/data/blogPosts.ts` -- Blog content data
- `src/pages/Blog.tsx` -- Blog listing
- `src/pages/BlogPost.tsx` -- Blog post detail

### Files to modify:
- `src/pages/ProductDetail.tsx` -- Move hooks to top (fix crash), add Product JSON-LD
- `src/pages/Checkout.tsx` -- Clear cart after WhatsApp click, add confirmation
- `src/App.tsx` -- Add `/blog` and `/blog/:slug` routes
- `public/sitemap.xml` -- Add blog URLs
- `index.html` -- Fix OG image to absolute URL, add more keywords

### Hook ordering fix (the critical change):

Before (broken):
```
const ProductDetail = () => {
  const { id } = useParams();
  // ... state hooks ...
  
  if (loading) return <Layout>...</Layout>;    // EARLY RETURN
  if (!product) return <Layout>...</Layout>;   // EARLY RETURN
  
  const { user } = useAuth();      // HOOKS AFTER RETURN = CRASH
  const { addToCart } = useCart();
  const navigate = useNavigate();
```

After (fixed):
```
const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();        // ALL HOOKS AT TOP
  const { addToCart } = useCart();
  const navigate = useNavigate();
  // ... state hooks ...
  
  if (loading) return <Layout>...</Layout>;    // Safe now
  if (!product) return <Layout>...</Layout>;   // Safe now
```

