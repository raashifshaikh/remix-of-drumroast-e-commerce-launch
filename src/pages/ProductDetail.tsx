import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Leaf, Package, Thermometer, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

// Hardcoded products for Phase 1 — will be replaced with Supabase data
const productData: Record<string, {
  name: string; price: number; category: string; emoji: string;
  desc: string; ingredients: string; nutrition: string; storage: string; packaging: string;
  related: { id: string; name: string; price: number; emoji: string }[];
}> = {
  "1": {
    name: "Drum Roasted Cashews", price: 499, category: "Signature", emoji: "🥜",
    desc: "Premium W320 grade cashews, slowly drum-roasted to golden perfection using traditional techniques. Light salt finish brings out the natural sweetness and buttery crunch.",
    ingredients: "Cashew nuts (W320), rock salt, cold-pressed groundnut oil",
    nutrition: "Per 30g serving: Calories 170, Protein 5g, Fat 13g, Carbs 9g, Fibre 1g",
    storage: "Store in a cool, dry place. Best consumed within 6 months of packaging.",
    packaging: "Food-grade zip-lock pouch, nitrogen-flushed for freshness. Available in 100g, 250g, 500g.",
    related: [
      { id: "10", name: "Honey Roasted Cashews", price: 549, emoji: "🍯" },
      { id: "2", name: "Premium Almonds", price: 549, emoji: "🌰" },
      { id: "5", name: "Classic Trail Mix", price: 399, emoji: "🥣" },
    ],
  },
  "2": {
    name: "Premium Almonds", price: 549, category: "Signature", emoji: "🌰",
    desc: "Handpicked California almonds, lightly roasted to retain maximum nutrition. Crunchy, wholesome, and perfect for everyday snacking.",
    ingredients: "Almonds (California Nonpareil), rock salt",
    nutrition: "Per 30g serving: Calories 165, Protein 6g, Fat 14g, Carbs 6g, Fibre 3g",
    storage: "Store in a cool, dry place away from direct sunlight.",
    packaging: "Resealable food-grade pouch. Available in 100g, 250g, 500g.",
    related: [
      { id: "1", name: "Drum Roasted Cashews", price: 499, emoji: "🥜" },
      { id: "9", name: "Chocolate Almonds", price: 599, emoji: "🍫" },
      { id: "3", name: "Iranian Pistachios", price: 799, emoji: "🟢" },
    ],
  },
};

// Fallback for products without detailed data
const fallback = {
  desc: "Premium quality product from DrumRoast — crafted with care and authentic ingredients.",
  ingredients: "Natural premium ingredients, rock salt",
  nutrition: "Rich in protein, healthy fats, and essential minerals",
  storage: "Store in a cool, dry place. Consume within 6 months.",
  packaging: "Food-grade resealable pouch, nitrogen-flushed.",
  related: [] as { id: string; name: string; price: number; emoji: string }[],
};

const allProducts: Record<string, { name: string; price: number; category: string; emoji: string }> = {
  "1": { name: "Drum Roasted Cashews", price: 499, category: "Signature", emoji: "🥜" },
  "2": { name: "Premium Almonds", price: 549, category: "Signature", emoji: "🌰" },
  "3": { name: "Iranian Pistachios", price: 799, category: "Signature", emoji: "🟢" },
  "4": { name: "Chocolate Coated Cashews", price: 599, category: "Signature", emoji: "🍫" },
  "5": { name: "Classic Trail Mix", price: 399, category: "Signature", emoji: "🥣" },
  "6": { name: "Energy Trail Mix", price: 449, category: "Signature", emoji: "⚡" },
  "7": { name: "Superfood Blend", price: 649, category: "Signature", emoji: "🌿" },
  "8": { name: "Protein Power Bar", price: 149, category: "Signature", emoji: "💪" },
  "9": { name: "Chocolate Almonds", price: 599, category: "Signature", emoji: "🍫" },
  "10": { name: "Honey Roasted Cashews", price: 549, category: "Signature", emoji: "🍯" },
  "11": { name: "Salted Peanuts", price: 99, category: "Daily", emoji: "🥜" },
  "12": { name: "Masala Peanuts", price: 119, category: "Daily", emoji: "🌶️" },
  "13": { name: "Classic Chips", price: 79, category: "Daily", emoji: "🍟" },
  "14": { name: "Cream & Onion Makhana", price: 199, category: "Daily", emoji: "🍿" },
  "15": { name: "Peri Peri Makhana", price: 199, category: "Daily", emoji: "🔥" },
  "16": { name: "Cheese Puffs", price: 89, category: "Daily", emoji: "🧀" },
  "17": { name: "Classic Namkeen Mix", price: 129, category: "Daily", emoji: "🥨" },
  "18": { name: "Tangy Tomato Chips", price: 79, category: "Daily", emoji: "🍅" },
  "19": { name: "Festive Delight Box", price: 1299, category: "Gift", emoji: "🎁" },
  "20": { name: "Premium Nut Collection", price: 1599, category: "Gift", emoji: "✨" },
  "21": { name: "Corporate Gift Pack", price: 999, category: "Gift", emoji: "🏢" },
  "22": { name: "Royal Assortment Box", price: 1999, category: "Gift", emoji: "👑" },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const base = id ? allProducts[id] : null;
  const detail = id ? productData[id] : null;

  if (!base) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
        </div>
      </Layout>
    );
  }

  const product = { ...base, ...(detail || fallback) };

  const handleAddToCart = () => {
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
  };

  const details = [
    { icon: Leaf, label: "Ingredients", value: product.ingredients },
    { icon: Info, label: "Nutrition", value: product.nutrition },
    { icon: Thermometer, label: "Storage", value: product.storage },
    { icon: Package, label: "Packaging", value: product.packaging },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-background p-12 text-9xl"
          >
            {product.emoji}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-medium text-primary">{product.category}</span>
              <h1 className="mt-1 font-heading text-3xl font-extrabold md:text-4xl">{product.name}</h1>
            </div>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="leading-relaxed text-muted-foreground">{product.desc}</p>

            <Button size="lg" className="w-full rounded-full md:w-auto" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <div className="space-y-4 pt-4">
              {details.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <d.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</p>
                    <p className="text-sm">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {product.related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold">You Might Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {product.related.map((r) => (
                <Link key={r.id} to={`/product/${r.id}`}>
                  <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-32 items-center justify-center bg-gradient-to-br from-muted to-background text-5xl">
                      {r.emoji}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading text-sm font-bold">{r.name}</h3>
                      <p className="mt-1 font-bold text-primary">₹{r.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
