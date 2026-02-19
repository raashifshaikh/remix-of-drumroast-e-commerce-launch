import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  category: string;
  emoji: string | null;
  image_url: string | null;
  is_active: boolean | null;
};

type Offer = {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number;
  product_id: string | null;
  is_active: boolean | null;
  image_url: string | null;
  end_date: string;
};

const categories = ["All", "Signature", "Daily", "Gift"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: prods }, { data: offs }] = await Promise.all([
        supabase.from("products").select("id,name,slug,price,original_price,category,emoji,image_url,is_active").eq("is_active", true),
        supabase.from("offers").select("id,title,description,discount_percentage,product_id,is_active,image_url,end_date").eq("is_active", true),
      ]);
      if (prods) setProducts(prods as Product[]);
      if (offs) setOffers(offs as Offer[]);
      setLoading(false);
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-muted to-accent/5 py-12 md:py-16">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 font-heading text-4xl font-extrabold md:text-5xl">
              Our <span className="text-primary">Collection</span>
            </h1>
            <p className="text-muted-foreground">Premium cashew flavours, healthy snacks, and curated gift collections — all drum-roasted to perfection.</p>
          </motion.div>
        </div>
      </section>

      {/* Active Offers Strip */}
      {offers.length > 0 && (
        <section className="container pt-8 pb-2">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {offers.map((o) => (
              <Link
                key={o.id}
                to={o.product_id ? `/product/${o.product_id}` : "/shop"}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative flex h-24 w-72 items-center gap-3 overflow-hidden rounded-xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  {o.image_url ? (
                    <img src={o.image_url} alt={o.title} className="h-full w-20 flex-shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-full w-20 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{o.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{o.description}</p>
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {o.discount_percentage}% OFF
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.div key={cat} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
                    activeCategory === cat ? "shadow-md" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All" ? "All Products" : `DrumRoast ${cat}`}
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-full pl-9" />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-44 w-full rounded-2xl" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                originalPrice={p.original_price}
                category={p.category}
                emoji={p.emoji}
                imageUrl={p.image_url}
                discount={getDiscount(p.id)}
                index={i}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-4 text-6xl">🔍</div>
            <p className="text-lg font-medium text-muted-foreground">
              No products found. Try a different search or category.
            </p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default Shop;
