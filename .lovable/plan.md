
# DrumRoast UI Overhaul: Professional Look, Animations, Favicon, and Link Preview

## Problems Identified

1. **Broken rendering**: Multiple GoTrueClient instances (duplicate Supabase clients) causing auth issues
2. **Ugly emoji placeholders** instead of professional product imagery matching the cashew packaging style
3. **No favicon or link preview** -- still shows default Lovable branding
4. **No engaging animations** -- page transitions and interactions feel flat
5. **Pages feel generic** -- need premium "snack brand" visual identity matching the packaging reference image (golden yellow, white packaging aesthetic)

---

## 1. Favicon and Link Preview (SEO/Branding)

- Copy the DrumRoast logo to `public/favicon.png` for the favicon
- Update `index.html`:
  - Title: "DrumRoast - Premium Cashew Flavours & Healthy Snacks"
  - Description: Brand tagline
  - OG image: Use the DrumRoast logo for link previews (og:image, twitter:image)
  - Favicon: Reference the logo

## 2. Fix Duplicate Supabase Client

- The console shows "Multiple GoTrueClient instances" -- likely the old `.env`-based client file and the new hardcoded one are both being imported. Ensure only one `supabase` client instance exists across the app.

## 3. Premium Product Card Design (Packaging-Inspired)

Replace emoji-based product cards with a professional, packaging-inspired design:

- **Product cards** will feature a golden-yellow gradient background with a large cashew illustration style, the product name in elegant typography, and a subtle packaging-pouch shape overlay
- Cards will use the brand's golden yellow and white palette from the reference image
- Each product gets a unique gradient/color accent based on its flavor
- "Add to Cart" button integrated directly on hover

## 4. Unwrapping Animation Effect

When clicking on a product card or navigating between pages:

- **Product card click**: A "peel/unwrap" animation using Framer Motion -- the card scales up, rotates slightly, and reveals the product detail page with a smooth transition
- **Page transitions**: Wrap routes in `AnimatePresence` with slide/fade transitions
- **Hover effects on cards**: Subtle 3D tilt effect, shadow lift, and a "package opening" micro-animation (top flap lifting)
- **Button interactions**: Satisfying press/bounce animations on all CTAs

### Technical approach:
- Add `AnimatePresence` in `App.tsx` around `Routes`
- Create page transition wrapper component with enter/exit animations
- Product cards: `whileHover` with scale, rotateY, and shadow changes
- Product detail page: Enter animation that mimics "unwrapping" (content slides in from center outward)

## 5. Enhanced Page Designs

### Home Page
- Hero section with a large background pattern of cashews (CSS gradient/pattern, not image)
- Animated floating cashew emoji decorations
- Counter animation for stats (e.g., "12+ Flavours", "1000+ Happy Customers")
- Smooth scroll-triggered reveal for each section

### Shop Page
- Category filter pills with active animation (sliding indicator)
- Product grid with staggered load animation
- Each card has a "packaging pouch" visual style using CSS (rounded top, sealed edge look)

### Product Detail Page
- Split layout with large product showcase on left (with packaging-style frame)
- Smooth accordion for ingredients/nutrition/storage details
- "Add to Cart" button with satisfying bounce + confetti micro-animation

### All Pages
- Smooth scroll-to-top on navigation
- Loading skeleton states for database-fetched content

## 6. Files to Create/Modify

**Modified files:**
- `index.html` -- favicon, title, OG meta tags
- `src/index.css` -- refined theme, packaging-inspired utility classes
- `tailwind.config.ts` -- new keyframes for unwrap, tilt, float animations
- `src/App.tsx` -- AnimatePresence for route transitions
- `src/pages/Index.tsx` -- premium hero, animated stats, floating elements
- `src/pages/Shop.tsx` -- packaging-style cards, better filter UX, staggered animations
- `src/pages/ProductDetail.tsx` -- unwrap entrance, accordion details, polished layout
- `src/pages/Cart.tsx` -- better empty state with animation
- `src/pages/About.tsx` -- scroll-triggered animations
- `src/pages/Cafe.tsx` -- enhanced card animations
- `src/pages/Login.tsx` -- polished form with logo animation
- `src/pages/NotFound.tsx` -- branded 404 with Layout wrapper
- `src/components/layout/Header.tsx` -- subtle scroll-based background transition
- `src/components/layout/Footer.tsx` -- refined styling
- `src/integrations/supabase/client.ts` -- fix duplicate instance

**New files:**
- `src/components/PageTransition.tsx` -- reusable page transition wrapper
- `src/components/ProductCard.tsx` -- premium product card with packaging style and hover animations

**Copied files:**
- `public/favicon.png` -- DrumRoast logo for favicon
