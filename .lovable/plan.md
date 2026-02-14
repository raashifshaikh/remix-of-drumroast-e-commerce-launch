

# Functional Cart + WhatsApp Checkout

## Overview

Build a fully working cart system that requires login, stores items in the `cart_items` Supabase table, and leads to a checkout page that redirects users to WhatsApp to place their order directly with the owner.

## What Changes

### 1. Cart Context (new file: `src/hooks/useCart.tsx`)
A React context that manages cart state using the existing `cart_items` table in Supabase:
- `addToCart(productId, quantity)` -- inserts/updates cart item (requires auth)
- `removeFromCart(productId)` -- deletes item
- `updateQuantity(productId, quantity)` -- updates quantity
- `clearCart()` -- removes all items
- `cartItems` -- array of cart items with product details
- `cartCount` -- total item count (shown as badge on cart icon in header)
- Auto-loads cart on login, clears on logout

### 2. "Add to Cart" requires login
- **ProductDetail.tsx**: The "Add to Cart" button checks if user is logged in. If not, redirect to `/login` with a toast message "Please sign in to add items to cart"
- **ProductCard.tsx**: Same behavior for the cart icon button on hover

### 3. Cart Page (rewrite `src/pages/Cart.tsx`)
Replace the static empty-cart page with a functional cart:
- Shows list of cart items with product image/emoji, name, price, quantity controls (+/- buttons)
- "Remove" button per item
- Cart summary sidebar showing subtotal and total
- "Proceed to Checkout" button (navigates to `/checkout`)
- Empty state still shown when cart has no items
- Login prompt if user is not signed in

### 4. Checkout Page (new file: `src/pages/Checkout.tsx`)
- Displays order summary (all items, quantities, prices, total)
- Prominent "Order via WhatsApp" button that opens WhatsApp with a pre-formatted message:
  - URL: `https://wa.me/917715808527?text=...`
  - Message includes: order items list, quantities, prices, and total
- The message is URL-encoded and formatted clearly
- Add route `/checkout` in App.tsx

### 5. Header Cart Badge
- Update Header.tsx to show a small badge with cart item count on the cart icon
- Uses the cart context to get the count

### 6. Wrap App with CartProvider
- Add `CartProvider` inside `AuthProvider` in App.tsx so cart is available everywhere

## Technical Details

### Files to Create
- `src/hooks/useCart.tsx` -- Cart context with Supabase integration
- `src/pages/Checkout.tsx` -- Checkout page with WhatsApp redirect

### Files to Modify
- `src/pages/Cart.tsx` -- Full rewrite to show actual cart items
- `src/pages/ProductDetail.tsx` -- Wire "Add to Cart" to cart context with auth check
- `src/components/ProductCard.tsx` -- Wire cart button with auth check
- `src/components/layout/Header.tsx` -- Add cart count badge
- `src/App.tsx` -- Add CartProvider wrapper and `/checkout` route

### WhatsApp Message Format
When the user clicks "Order via WhatsApp", a message like this opens:
```
Hi! I'd like to place an order from DrumRoast:

1. Masala Cashew (x2) - Rs.598
2. Chocolate Cashew (x1) - Rs.349

Total: Rs.947

Please confirm availability and payment details.
```

### Cart-Database Integration
The existing `cart_items` table has: `id`, `user_id`, `product_id`, `quantity`, `created_at` with proper RLS policies (users can only access their own items). The context will join with `products` table to get names, prices, and images for display.

