import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const WHATSAPP_NUMBER = "917715808527";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold">Please sign in</h1>
          <Link to="/login"><Button className="rounded-full">Login</Button></Link>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h1 className="mb-4 font-heading text-2xl font-bold">Your cart is empty</h1>
          <Link to="/shop"><Button className="rounded-full">Browse Shop</Button></Link>
        </div>
      </Layout>
    );
  }

  const generateWhatsAppMessage = () => {
    let msg = "Hi! I'd like to place an order from DrumRoast:\n\n";
    cartItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name} (x${item.quantity}) - ₹${item.product.price * item.quantity}\n`;
    });
    msg += `\nTotal: ₹${cartTotal}\n\nPlease confirm availability and payment details.`;
    return encodeURIComponent(msg);
  };

  const handleOrderViaWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    setTimeout(() => navigate("/shop"), 500);
  };

  return (
    <Layout>
      <div className="container py-8 md:py-16">
        <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 font-heading text-3xl font-bold">Order Summary</h1>

          <div className="space-y-4 rounded-2xl border bg-card p-6">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl">{item.product.emoji || "🥜"}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ₹{item.product.price}</p>
                  </div>
                </div>
                <p className="font-bold text-card-foreground">₹{item.product.price * item.quantity}</p>
              </div>
            ))}

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-extrabold text-primary">₹{cartTotal}</span>
            </div>
          </div>

          {!confirmed ? (
            <motion.div className="mt-8" whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="w-full rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:bg-[hsl(142,70%,40%)]"
                onClick={() => setConfirmed(true)}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Proceed to Order via WhatsApp
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4 rounded-2xl border border-[hsl(142,70%,45%)]/30 bg-[hsl(142,70%,45%)]/5 p-6 text-center"
            >
              <p className="font-semibold">Your order details will be sent via WhatsApp to the DrumRoast team.</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 77158 08527</span>
              </div>
              <Button
                size="lg"
                className="w-full rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:bg-[hsl(142,70%,40%)]"
                onClick={handleOrderViaWhatsApp}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Confirm & Open WhatsApp
              </Button>
              <button onClick={() => setConfirmed(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </motion.div>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            You'll be redirected to WhatsApp to confirm your order with the owner directly.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
