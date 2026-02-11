import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  emoji?: string | null;
  discount?: number | null;
  index?: number;
};

const flavorAccents: Record<string, string> = {
  Signature: "from-[hsl(45,90%,50%)] to-[hsl(35,80%,45%)]",
  Daily: "from-[hsl(140,40%,45%)] to-[hsl(160,50%,35%)]",
  Gift: "from-[hsl(340,60%,55%)] to-[hsl(320,50%,45%)]",
};

const ProductCard = ({
  name,
  slug,
  price,
  originalPrice,
  category,
  emoji,
  discount,
  index = 0,
}: ProductCardProps) => {
  const gradient = flavorAccents[category] || flavorAccents.Signature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-card shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          whileHover={{ y: -6, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ perspective: 800 }}
        >
          {/* Package top flap */}
          <div className="relative">
            <div
              className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden`}
            >
              {/* Packaging texture overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                }}
              />
              {/* Pouch seal line */}
              <div className="absolute left-0 right-0 top-0 h-3 bg-gradient-to-b from-black/10 to-transparent" />
              <motion.div
                className="relative z-10 text-6xl drop-shadow-lg"
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {emoji || "🥜"}
              </motion.div>
              {/* Top flap animation on hover */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-8 origin-top bg-gradient-to-b from-black/20 to-transparent"
                initial={{ rotateX: 0 }}
                whileHover={{ rotateX: -30 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {/* Zigzag edge */}
            <svg className="absolute -bottom-[1px] left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none">
              <path d="M0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 L330,0 L340,12 L350,0 L360,12 L370,0 L380,12 L390,0 L400,12" fill="hsl(var(--card))" />
            </svg>
          </div>

          {/* Discount badge */}
          {discount && (
            <span className="absolute right-3 top-3 z-20 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground shadow-lg">
              -{discount}%
            </span>
          )}

          {/* Content */}
          <div className="relative p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {category}
            </span>
            <h3 className="mt-1.5 font-heading text-base font-bold leading-tight text-card-foreground">
              {name}
            </h3>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-primary">₹{price}</span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Button size="icon" variant="default" className="h-9 w-9 rounded-full shadow-md">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
