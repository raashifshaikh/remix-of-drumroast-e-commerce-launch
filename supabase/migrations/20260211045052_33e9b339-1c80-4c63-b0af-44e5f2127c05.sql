
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT NOT NULL DEFAULT 'Signature',
  subcategory TEXT DEFAULT 'Cashews',
  image_url TEXT,
  emoji TEXT DEFAULT '🥜',
  ingredients TEXT,
  nutrition TEXT,
  storage_instructions TEXT,
  packaging TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  stock_status TEXT DEFAULT 'in_stock',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_percentage NUMERIC NOT NULL DEFAULT 0,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cart items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Products: public read, admin write
CREATE POLICY "Anyone can read active products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert products" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.products
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.products
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Offers: public read, admin write
CREATE POLICY "Anyone can read offers" ON public.offers
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert offers" ON public.offers
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update offers" ON public.offers
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete offers" ON public.offers
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: users manage own
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- User roles: no direct access (use has_role function)
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Orders: users read own, admin read all
CREATE POLICY "Users can read own orders" ON public.orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Cart: users manage own
CREATE POLICY "Users can read own cart" ON public.cart_items
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON public.cart_items
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON public.cart_items
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON public.cart_items
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Seed cashew products
INSERT INTO public.products (name, slug, price, category, subcategory, emoji, description, ingredients, nutrition, storage_instructions, packaging, is_featured) VALUES
('Classic Salted Cashews', 'classic-salted-cashews', 499, 'Signature', 'Cashews', '🥜', 'Premium W320 grade cashews, slowly drum-roasted with a light salt finish.', 'Cashew nuts (W320), rock salt, cold-pressed groundnut oil', 'Per 30g: Calories 170, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place. Best within 6 months.', 'Nitrogen-flushed zip-lock pouch. 100g, 250g, 500g.', true),
('Pepper Cashews', 'pepper-cashews', 529, 'Signature', 'Cashews', '🌶️', 'Bold black pepper-coated cashews with a crunchy kick.', 'Cashew nuts, black pepper, rock salt, groundnut oil', 'Per 30g: Calories 168, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', false),
('Masala Cashews', 'masala-cashews', 529, 'Signature', 'Cashews', '🔥', 'A spicy Indian masala blend on premium roasted cashews.', 'Cashew nuts, chili powder, turmeric, cumin, rock salt, groundnut oil', 'Per 30g: Calories 165, Protein 5g, Fat 12g, Carbs 10g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', true),
('Cheese Cashews', 'cheese-cashews', 549, 'Signature', 'Cashews', '🧀', 'Creamy cheese-flavoured cashews — a crowd favourite.', 'Cashew nuts, cheese seasoning, rock salt, groundnut oil', 'Per 30g: Calories 172, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', false),
('Peri Peri Cashews', 'peri-peri-cashews', 549, 'Signature', 'Cashews', '🌶️', 'Fiery peri peri seasoned cashews for spice lovers.', 'Cashew nuts, peri peri seasoning, rock salt, groundnut oil', 'Per 30g: Calories 170, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', true),
('Honey Roasted Cashews', 'honey-roasted-cashews', 599, 'Signature', 'Cashews', '🍯', 'Sweet honey glaze on perfectly roasted cashews.', 'Cashew nuts, honey, rock salt', 'Per 30g: Calories 175, Protein 5g, Fat 12g, Carbs 11g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g, 500g.', true),
('Chocolate Coated Cashews', 'chocolate-coated-cashews', 649, 'Signature', 'Cashews', '🍫', 'Rich dark chocolate coating on crunchy roasted cashews.', 'Cashew nuts, dark chocolate, cocoa butter, sugar', 'Per 30g: Calories 180, Protein 4g, Fat 14g, Carbs 12g', 'Store below 25°C.', 'Sealed box. 100g, 250g.', true),
('Caramel Cashews', 'caramel-cashews', 599, 'Signature', 'Cashews', '🍬', 'Buttery caramel-coated cashews with a toffee-like crunch.', 'Cashew nuts, sugar, butter, cream, rock salt', 'Per 30g: Calories 178, Protein 4g, Fat 13g, Carbs 12g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', false),
('Garlic Herb Cashews', 'garlic-herb-cashews', 549, 'Signature', 'Cashews', '🧄', 'Aromatic garlic and herb seasoned roasted cashews.', 'Cashew nuts, garlic powder, dried herbs, rock salt, groundnut oil', 'Per 30g: Calories 168, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', false),
('Tandoori Cashews', 'tandoori-cashews', 549, 'Signature', 'Cashews', '🔥', 'Smoky tandoori spice blend on premium cashews.', 'Cashew nuts, tandoori masala, rock salt, groundnut oil', 'Per 30g: Calories 170, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', true),
('Plain Roasted Cashews', 'plain-roasted-cashews', 479, 'Signature', 'Cashews', '🥜', 'Pure roasted cashews — no salt, no seasoning, just natural flavour.', 'Cashew nuts (W320)', 'Per 30g: Calories 165, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g, 500g.', false),
('Cream & Onion Cashews', 'cream-onion-cashews', 549, 'Signature', 'Cashews', '🧅', 'Creamy onion seasoning on crunchy roasted cashews.', 'Cashew nuts, cream & onion seasoning, rock salt, groundnut oil', 'Per 30g: Calories 170, Protein 5g, Fat 13g, Carbs 9g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 100g, 250g.', false),
-- Other products
('Classic Trail Mix', 'classic-trail-mix', 399, 'Daily', 'Trail Mix', '🥣', 'A balanced mix of nuts, seeds, and dried fruits.', 'Almonds, cashews, raisins, pumpkin seeds, cranberries', 'Per 30g: Calories 150, Protein 4g, Fat 9g, Carbs 14g', 'Store in cool, dry place.', 'Resealable pouch. 100g, 250g.', false),
('Cream & Onion Makhana', 'cream-onion-makhana', 199, 'Daily', 'Makhana', '🍿', 'Light and crunchy fox nuts with cream & onion flavour.', 'Fox nuts, cream & onion seasoning, groundnut oil, rock salt', 'Per 30g: Calories 110, Protein 3g, Fat 4g, Carbs 16g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 80g.', false),
('Peri Peri Makhana', 'peri-peri-makhana', 199, 'Daily', 'Makhana', '🔥', 'Spicy peri peri seasoned makhana for guilt-free snacking.', 'Fox nuts, peri peri seasoning, groundnut oil, rock salt', 'Per 30g: Calories 112, Protein 3g, Fat 4g, Carbs 16g', 'Store in cool, dry place.', 'Nitrogen-flushed pouch. 80g.', false),
('Festive Delight Box', 'festive-delight-box', 1299, 'Gift', 'Festive', '🎁', 'A curated gift box with assorted premium nuts and sweets.', 'Cashews, almonds, pistachios, dried figs, chocolates', 'Varies by selection', 'Store in cool, dry place.', 'Premium gift box with ribbon.', true),
('Premium Nut Collection', 'premium-nut-collection', 1599, 'Gift', 'Festive', '✨', 'An elegant collection of our finest roasted nuts.', 'Cashews, almonds, pistachios, macadamias, walnuts', 'Varies by selection', 'Store in cool, dry place.', 'Wooden box with compartments.', false),
('Corporate Gift Pack', 'corporate-gift-pack', 999, 'Gift', 'Corporate', '🏢', 'Professional gift packaging perfect for business gifting.', 'Assorted premium nuts and dried fruits', 'Varies by selection', 'Store in cool, dry place.', 'Branded corporate box. Custom branding available.', false);
