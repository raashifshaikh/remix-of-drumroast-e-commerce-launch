import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Leaf, Package, Thermometer, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  subcategory: string | null;
  emoji: string | null;
  ingredients: string | null;
  nutrition: string | null;
  storage_instructions: string | null;
  packaging: string | null;
};

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Try slug first, then UUID
      let query = supabase.from("products").select("*").eq("is_active", true);
      const isUUID = id && /^[0-9a-f-]{36}$/.test(id);
      if (isUUID) {
        query = query.eq("id", id);
      } else {
        query = query.eq("slug", id);
      }
      const { data } = await query.single();
      if (data) {
        setProduct(data as Product);
        // Load related from same category
        const { data: rel } = await supabase
          .from("products")
          .select("id,name,slug,price,emoji,category,description,original_price,subcategory,ingredients,nutrition,storage_instructions,packaging")
          .eq("category", (data as Product).category)
          .neq("id", (data as Product).id)
          .eq("is_active", true)
          .limit(3);
        if (rel) setRelated(rel as Product[]);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
  };

  const details = [
    { icon: Leaf, label: "Ingredients", value: product.ingredients },
    { icon: Info, label: "Nutrition", value: product.nutrition },
    { icon: Thermometer, label: "Storage", value: product.storage_instructions },
    { icon: Package, label: "Packaging", value: product.packaging },
  ].filter((d) => d.value);

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-background p-12 text-9xl">
            {product.emoji || "🥜"}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="text-sm font-medium text-primary">{product.category}</span>
              <h1 className="mt-1 font-heading text-3xl font-extrabold md:text-4xl">{product.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-primary">₹{product.price}</p>
              {product.original_price && (
                <p className="text-lg text-muted-foreground line-through">₹{product.original_price}</p>
              )}
            </div>
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>

            <Button size="lg" className="w-full rounded-full md:w-auto" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
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

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold">You Might Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} to={`/product/${r.slug}`}>
                  <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-32 items-center justify-center bg-gradient-to-br from-muted to-background text-5xl">
                      {r.emoji || "🥜"}
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
