

# DrumRoast — Premium Dry Fruits & Healthy Snacks Ecommerce Website

## Brand & Visual Identity
- **Color palette**: Teal/turquoise primary, warm yellow (from logo) highlight, soft pink accents, white backgrounds
- **Typography**: Clean, rounded, friendly fonts — modern Indian premium feel
- **Logo**: DrumRoast logo embedded across header/footer
- **Overall feel**: Bright, spacious, premium retail — NOT dark luxury

---

## Phase 1: Core Pages & Layout

### Global Navigation & Footer
- Sticky header with logo, nav links (Home, Shop, About, Café, Corporate, Contact), cart icon, and login/signup button
- Footer with About, Shop, Corporate, Policies links, newsletter signup, social media icons, and email (officialdrumroast@gmail.com)

### Home Page
- **Hero section** with headline "Traditionally Crafted Taste", subtext, and CTA buttons (Shop Now / Explore Collections)
- **Brand introduction** section with story text
- **Segment highlights** — DrumRoast Signature, Daily, Café cards
- **Benefits icons** — High Quality Ingredients, Nutrient Rich, Carefully Processed, Hygienic Packaging
- **Featured products** carousel/grid
- **Newsletter signup** section

### About Page
- Brand story with "Our Story" title and full content about heritage, processing, and values

### Café Experience Page
- Brand storytelling page about the café concept — specialty beverages, dry fruit desserts, smoothie bowls
- Positioned as future growth narrative

### Contact Page
- Email contact form (sends to officialdrumroast@gmail.com)
- Social media links section
- No phone numbers

### Business / Bulk Orders Page
- Corporate gifting & wholesale enquiries info
- Contact form with fields: Name, Organization, Email, Message

---

## Phase 2: Ecommerce & Product System (Supabase Backend)

### Database Setup
- **Products table**: name, description, price, images, category, subcategory, nutritional info, ingredients, storage instructions, packaging details, stock status, featured flag
- **Categories table**: DrumRoast Signature, DrumRoast Daily, Gift Collections
- **Cart table**: user_id, product_id, quantity
- **Orders table**: user_id, items, total, status, shipping address (payment integration placeholder for later)
- **Profiles table**: linked to auth.users for name, address, phone
- Pre-seeded product data for all categories (cashews, almonds, pistachios, trail mixes, makhanas, gift boxes, etc.)

### Shop Page
- Category filters (Signature, Daily, Gift Collections)
- Product grid with images, names, prices
- Search and sort functionality

### Product Detail Page
- Large product image
- Nutritional highlights, ingredient listing, storage instructions, packaging details
- Add to cart button
- Related products section

### Cart & Checkout
- Cart drawer/page showing items, quantities, totals
- Checkout flow collecting shipping address and order summary
- **Payment placeholder**: "Pay via UPI" button that confirms the order (actual UPI gateway to be integrated later)
- Order confirmation page

---

## Phase 3: User Authentication

- **Optional accounts** — browse freely, login required only to place orders
- Email/password signup and login via Supabase Auth
- User profile with saved addresses and order history
- Guest users prompted to sign up/login when adding to cart or at checkout

---

## Key Technical Details
- Fully responsive design (mobile-first)
- SEO-friendly page structure with proper meta tags
- Fast loading with optimized images
- Supabase for database, auth, and storage (product images)
- Scalable architecture ready for UPI payment integration later

