import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type CartProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  emoji: string | null;
  image_url: string | null;
  category: string;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product: CartProduct;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, products(id, name, slug, price, emoji, image_url, category)")
      .eq("user_id", user.id);

    if (data) {
      const items: CartItem[] = data
        .filter((item: any) => item.products)
        .map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          product: item.products as CartProduct,
        }));
      setCartItems(items);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) return;
    const existing = cartItems.find((i) => i.product_id === productId);
    if (existing) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: productId, quantity });
    }
    await fetchCart();
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
    await fetchCart();
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user.id)
      .eq("product_id", productId);
    await fetchCart();
  };

  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, loading, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
