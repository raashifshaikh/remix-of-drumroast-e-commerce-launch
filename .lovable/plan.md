

# DrumRoast Phase 2: Yellow-White Theme, Cashew Flavours, Admin Panel, and Instagram

## 1. Theme Overhaul — Yellow & White

Shift the entire color palette from teal/turquoise primary to a warm yellow/golden primary with white backgrounds:

- **Primary color**: Warm golden yellow (e.g., `45 90% 50%`) -- buttons, links, highlights
- **Primary foreground**: Dark brown text on yellow buttons
- **Secondary**: Soft amber/brown for accents
- **Background**: Pure white
- **Muted sections**: Light cream/warm gray (`40 30% 96%`)
- **Text**: Deep warm brown (`30 30% 15%`)
- **Accent**: Keep soft pink for subtle highlights

Files changed: `src/index.css` (CSS variables for both light and dark modes)

## 2. Cashew Flavours Focus

Replace the current generic product catalog with cashew-focused flavours as the primary product line:

**DrumRoast Signature Cashews:**
- Classic Salted Cashews
- Pepper Cashews
- Masala Cashews
- Cheese Cashews
- Peri Peri Cashews
- Honey Roasted Cashews
- Chocolate Coated Cashews
- Caramel Cashews
- Garlic Herb Cashews
- Tandoori Cashews
- Plain Roasted Cashews (unsalted)
- Cream & Onion Cashews

**Other Products** (keep as secondary):
- Trail Mixes, Gift Boxes, Makhana, etc.

Update: `src/pages/Shop.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/Index.tsx` (featured products section)

## 3. Instagram Link Integration

Update all Instagram icon links across the site to point to the real profile:
`https://www.instagram.com/officialdrumroast?igsh=MXVyODhybWNkYm95bQ==`

Files changed: `src/components/layout/Footer.tsx`, `src/pages/Contact.tsx`

## 4. Database Setup (Supabase)

Create the following tables via migration:

**products** — id, name, slug, description, price, original_price (for offers), category, subcategory, image_url, ingredients, nutrition, storage_instructions, packaging, is_featured, is_active, stock_status, created_at

**offers** — id, title, description, discount_percentage, product_id (nullable for site-wide), start_date, end_date, is_active, created_at

**profiles** — id (references auth.users), full_name, phone, address, city, state, pincode, created_at

**user_roles** — id, user_id (references auth.users), role (enum: admin, user)

**orders** — id, user_id, items (jsonb), total, status, shipping_address (jsonb), created_at

**cart_items** — id, user_id, product_id, quantity

RLS policies:
- Products: public read, admin insert/update/delete
- Offers: public read, admin insert/update/delete
- Profiles: users read/update own profile
- Orders: users read own orders, admin read all
- Cart: users manage own cart items
- User_roles: only readable via `has_role()` security definer function

Seed data: Insert all cashew flavours and other products into the products table.

## 5. Admin Panel

### Access Control
- Admin routes protected by role check using `has_role()` function
- Route: `/admin` with sub-routes for Products, Offers, Orders
- Only users with `admin` role in `user_roles` table can access
- Non-admin users see a "Not Authorized" page

### Admin Dashboard (`/admin`)
- Overview cards: Total Products, Active Offers, Recent Orders count
- Quick-action buttons to manage products and offers

### Product Management (`/admin/products`)
- Table listing all products with name, price, category, status
- "Add Product" form: name, description, price, original_price, category, subcategory, ingredients, nutrition, storage, packaging, featured toggle, active toggle
- Edit existing products inline or via modal
- Delete products

### Offers Management (`/admin/offers`)
- Create offers: title, description, discount %, link to product (optional), start/end date
- Toggle offers active/inactive
- Active offers display on the Shop page as banners and on product cards as discount badges

### Orders View (`/admin/orders`)
- List all orders with customer name, total, status, date
- Update order status (Pending, Confirmed, Shipped, Delivered)

## 6. Authentication Update

Update `src/pages/Login.tsx` to use real Supabase Auth:
- Email/password signup and login
- On signup, auto-create profile via database trigger
- After login, check if user has admin role and show "Go to Admin" link in header

Update `src/components/layout/Header.tsx`:
- Show user name/avatar when logged in
- Show "Admin" link in nav if user is admin
- Logout button

## 7. Shop & Product Pages — Database Integration

- `Shop.tsx`: Fetch products from Supabase instead of hardcoded array
- `ProductDetail.tsx`: Fetch single product by slug/id from Supabase
- Show offer badges (discount %) on products with active offers
- Show original price with strikethrough when offer is active

## Technical Summary

**New files:**
- `src/pages/admin/AdminLayout.tsx` — admin shell with sidebar nav
- `src/pages/admin/Dashboard.tsx` — overview stats
- `src/pages/admin/Products.tsx` — product CRUD
- `src/pages/admin/Offers.tsx` — offer management
- `src/pages/admin/Orders.tsx` — order listing
- `src/hooks/useAuth.tsx` — auth context with role checking
- `src/components/ProtectedRoute.tsx` — route guard for admin

**Modified files:**
- `src/index.css` — yellow/white theme
- `src/App.tsx` — add admin routes
- `src/pages/Shop.tsx` — Supabase integration
- `src/pages/ProductDetail.tsx` — Supabase integration
- `src/pages/Index.tsx` — updated featured products
- `src/pages/Login.tsx` — real Supabase auth
- `src/components/layout/Header.tsx` — auth state, admin link
- `src/components/layout/Footer.tsx` — Instagram link

**Database migrations:**
- Create `app_role` enum, `products`, `offers`, `profiles`, `user_roles`, `orders`, `cart_items` tables
- Create `has_role()` security definer function
- Create trigger for auto-creating profile on signup
- RLS policies for all tables
- Seed cashew flavour products

