import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Leaf, Package, Thermometer, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

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
  image_url: string | null;
  ingredients: string | null;
  nutrition: string | null;
  storage_instructions: string | null;
  packaging: string | null;
};

const flavorGradients: Record<string, string> = {
  Signature: "from-[hsl(45,90%,50%)] to-[hsl(35,80%,45%)]",
  Daily: "from-[hsl(140,40%,45%)] to-[hsl(160,50%,35%)]",
  Gift: "from-[hsl(340,60%,55%)] to-[hsl(320,50%,45%)]",
};

const DetailAccordion = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:text-primary"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="flex-1 text-sm font-semibold">{label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-12 text-sm text-muted-foreground">{value}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
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
        <div className="container py-8">
          <Skeleton className="mb-6 h-4 w-24" />
          <div className="grid gap-10 md:grid-cols-2">
            <Skeleton className="h-80 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="mx-auto mb-4 text-6xl">📦</div>
          <h1 className="mb-4 font-heading text-2xl font-bold">Product Not Found</h1>
          <Link to="/shop"><Button variant="outline" className="rounded-full">Back to Shop</Button></Link>
        </div>
      </Layout>
    );
  }

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be logged in to add items to cart." });
      navigate("/login");
      return;
    }
    setAddedToCart(true);
    await addToCart(product.id);
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const details = [
    { icon: Leaf, label: "Ingredients", value: product.ingredients },
    { icon: Info, label: "Nutrition", value: product.nutrition },
    { icon: Thermometer, label: "Storage", value: product.storage_instructions },
    { icon: Package, label: "Packaging", value: product.packaging },
  ].filter((d) => d.value) as { icon: React.ElementType; label: string; value: string }[];

  const gradient = flavorGradients[product.category] || flavorGradients.Signature;

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Product showcase with packaging style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} ${product.image_url ? '' : 'p-12'}`}
            style={{ perspective: 1000 }}
          >
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" style={{ minHeight: 320 }} />
            ) : (
              <>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                  }}
                />
                <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-black/10 to-transparent" />
                <motion.div
                  className="relative z-10 text-[10rem] drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {product.emoji || "🥜"}
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{product.category}</span>
              <h1 className="mt-2 font-heading text-3xl font-extrabold md:text-4xl">{product.name}</h1>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-extrabold text-primary">₹{product.price}</p>
              {product.original_price && (
                <p className="text-lg text-muted-foreground line-through">₹{product.original_price}</p>
              )}
            </div>
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>

            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className={`w-full rounded-full shadow-lg shadow-primary/25 transition-all md:w-auto ${
                  addedToCart ? "bg-green-600 hover:bg-green-600" : ""
                }`}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addedToCart ? "✓ Added!" : "Add to Cart"}
              </Button>
            </motion.div>

            {details.length > 0 && (
              <div className="pt-4">
                {details.map((d) => (
                  <DetailAccordion key={d.label} icon={d.icon} label={d.label} value={d.value} />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold">You Might Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((r, i) => (
                <ProductCard
                  key={r.id}
                  id={r.id}
                  name={r.name}
                  slug={r.slug}
                  price={r.price}
                  category={r.category}
                  emoji={r.emoji}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
