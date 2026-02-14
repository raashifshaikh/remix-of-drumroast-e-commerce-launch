import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, cartCount, loading, updateQuantity, removeFromCart } = useCart();

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-md text-center">
            <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="mb-3 font-heading text-2xl font-bold">Sign in to view your cart</h1>
            <p className="mb-6 text-muted-foreground">You need to be logged in to add items and view your cart.</p>
            <Link to="/login">
              <Button className="rounded-full px-8">Login / Sign Up</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md text-center">
            <motion.div
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShoppingCart className="h-10 w-10 text-primary" />
            </motion.div>
            <h1 className="mb-3 font-heading text-2xl font-bold">Your Cart is Empty</h1>
            <p className="mb-6 text-muted-foreground">Browse our collection and find something you love!</p>
            <Link to="/shop"><Button className="rounded-full px-8 shadow-md shadow-primary/20">Browse Shop</Button></Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-16">
        <h1 className="mb-8 font-heading text-3xl font-bold">Your Cart ({cartCount})</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item, i) => (
              <motion.div
                key={item.product_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border bg-card p-4"
              >
                <Link to={`/product/${item.product.slug}`} className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  {item.product.image_url ? (
                    <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl">{item.product.emoji || "🥜"}</span>
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.slug}`} className="font-heading font-bold text-card-foreground hover:text-primary">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.product.category}</p>
                  <p className="mt-1 font-bold text-primary">₹{item.product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product_id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <p className="w-20 text-right font-bold text-card-foreground">₹{item.product.price * item.quantity}</p>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.product_id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-card p-6">
              <h2 className="mb-4 font-heading text-xl font-bold">Order Summary</h2>
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-extrabold text-primary">₹{cartTotal}</span>
              </div>
              <Link to="/checkout">
                <Button size="lg" className="mt-6 w-full rounded-full shadow-lg shadow-primary/25">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
