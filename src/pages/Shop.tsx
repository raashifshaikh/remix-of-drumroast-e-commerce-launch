import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  emoji: string;
};

const allProducts: Product[] = [
  // Signature
  { id: "1", name: "Drum Roasted Cashews", price: 499, category: "Signature", subcategory: "Cashews", emoji: "🥜" },
  { id: "2", name: "Premium Almonds", price: 549, category: "Signature", subcategory: "Almonds", emoji: "🌰" },
  { id: "3", name: "Iranian Pistachios", price: 799, category: "Signature", subcategory: "Pistachios", emoji: "🟢" },
  { id: "4", name: "Chocolate Coated Cashews", price: 599, category: "Signature", subcategory: "Chocolate Nuts", emoji: "🍫" },
  { id: "5", name: "Classic Trail Mix", price: 399, category: "Signature", subcategory: "Trail Mix", emoji: "🥣" },
  { id: "6", name: "Energy Trail Mix", price: 449, category: "Signature", subcategory: "Trail Mix", emoji: "⚡" },
  { id: "7", name: "Superfood Blend", price: 649, category: "Signature", subcategory: "Superfoods", emoji: "🌿" },
  { id: "8", name: "Protein Power Bar", price: 149, category: "Signature", subcategory: "Protein Bars", emoji: "💪" },
  { id: "9", name: "Chocolate Almonds", price: 599, category: "Signature", subcategory: "Chocolate Nuts", emoji: "🍫" },
  { id: "10", name: "Honey Roasted Cashews", price: 549, category: "Signature", subcategory: "Cashews", emoji: "🍯" },
  // Daily
  { id: "11", name: "Salted Peanuts", price: 99, category: "Daily", subcategory: "Peanuts", emoji: "🥜" },
  { id: "12", name: "Masala Peanuts", price: 119, category: "Daily", subcategory: "Masala Snacks", emoji: "🌶️" },
  { id: "13", name: "Classic Chips", price: 79, category: "Daily", subcategory: "Chips", emoji: "🍟" },
  { id: "14", name: "Cream & Onion Makhana", price: 199, category: "Daily", subcategory: "Makhana", emoji: "🍿" },
  { id: "15", name: "Peri Peri Makhana", price: 199, category: "Daily", subcategory: "Makhana", emoji: "🔥" },
  { id: "16", name: "Cheese Puffs", price: 89, category: "Daily", subcategory: "Puff Snacks", emoji: "🧀" },
  { id: "17", name: "Classic Namkeen Mix", price: 129, category: "Daily", subcategory: "Namkeen", emoji: "🥨" },
  { id: "18", name: "Tangy Tomato Chips", price: 79, category: "Daily", subcategory: "Chips", emoji: "🍅" },
  // Gift Collections
  { id: "19", name: "Festive Delight Box", price: 1299, category: "Gift", subcategory: "Festive", emoji: "🎁" },
  { id: "20", name: "Premium Nut Collection", price: 1599, category: "Gift", subcategory: "Festive", emoji: "✨" },
  { id: "21", name: "Corporate Gift Pack", price: 999, category: "Gift", subcategory: "Corporate", emoji: "🏢" },
  { id: "22", name: "Royal Assortment Box", price: 1999, category: "Gift", subcategory: "Festive", emoji: "👑" },
];

const categories = ["All", "Signature", "Daily", "Gift"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <Layout>
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 font-heading text-4xl font-extrabold md:text-5xl">Shop</h1>
            <p className="text-muted-foreground">Explore our range of premium dry fruits, healthy snacks, and gift collections.</p>
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "All" ? "All Products" : `DrumRoast ${cat}`}
              </Button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full pl-9"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              <Link to={`/product/${p.id}`}>
                <Card className="h-full overflow-hidden border-none shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-muted to-background text-5xl">
                    {p.emoji}
                  </div>
                  <CardContent className="p-4">
                    <span className="text-xs font-medium text-primary">{p.category}</span>
                    <h3 className="mt-1 font-heading text-sm font-bold">{p.name}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">₹{p.price}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products found. Try a different search or category.
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Shop;
