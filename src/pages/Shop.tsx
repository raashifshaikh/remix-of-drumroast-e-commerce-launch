import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  category: string;
  emoji: string | null;
  is_active: boolean | null;
};

type Offer = {
  id: string;
  discount_percentage: number;
  product_id: string | null;
  is_active: boolean | null;
};

const categories = ["All", "Signature", "Daily", "Gift"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const load = async () => {
      const [{ data: prods }, { data: offs }] = await Promise.all([
        supabase.from("products").select("id,name,slug,price,original_price,category,emoji,is_active").eq("is_active", true),
        supabase.from("offers").select("id,discount_percentage,product_id,is_active").eq("is_active", true),
      ]);
      if (prods) setProducts(prods as Product[]);
      if (offs) setOffers(offs as Offer[]);
    };
    load();
  }, []);

  const getDiscount = (productId: string) => {
    const offer = offers.find((o) => o.product_id === productId);
    return offer ? offer.discount_percentage : null;
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory, products]);

  return (
    <Layout>
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 font-heading text-4xl font-extrabold md:text-5xl">Shop</h1>
            <p className="text-muted-foreground">Explore our signature cashew flavours, healthy snacks, and gift collections.</p>
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
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
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-full pl-9" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => {
            const discount = getDiscount(p.id);
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.3 }}>
                <Link to={`/product/${p.slug}`}>
                  <Card className="h-full overflow-hidden border-none shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-muted to-background text-5xl">
                      {p.emoji || "🥜"}
                      {discount && (
                        <span className="absolute right-2 top-2 rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <span className="text-xs font-medium text-primary">{p.category}</span>
                      <h3 className="mt-1 font-heading text-sm font-bold">{p.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-lg font-bold text-primary">₹{p.price}</p>
                        {p.original_price && (
                          <p className="text-sm text-muted-foreground line-through">₹{p.original_price}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
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
