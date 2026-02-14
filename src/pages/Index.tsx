import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Award, Shield, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const benefits = [
  { icon: Award, title: "High Quality Ingredients", desc: "Sourced from trusted farms across India" },
  { icon: Leaf, title: "Nutrient Rich", desc: "Packed with natural goodness and vitamins" },
  { icon: Shield, title: "Carefully Processed", desc: "Traditional drum-roasting techniques" },
  { icon: Package, title: "Hygienic Packaging", desc: "Sealed fresh for lasting quality" },
];

const segments = [
  { title: "DrumRoast Signature", desc: "Premium cashew flavours crafted for the discerning palate — salted, masala, peri peri, tandoori, and more.", emoji: "🏆" },
  { title: "DrumRoast Daily", desc: "Everyday snack options — makhanas, trail mixes, and healthy bites for every mood.", emoji: "🌿" },
  { title: "DrumRoast Café", desc: "An experiential concept blending specialty beverages with dry fruit desserts and smoothie bowls.", emoji: "☕" },
];

const stats = [
  { value: 12, suffix: "+", label: "Flavours" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "%", label: "Natural" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

type FeaturedProduct = { id: string; name: string; slug: string; price: number; category: string; emoji: string | null; image_url: string | null };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DrumRoast",
  alternateName: "Kalpavriksha Agro Products",
  url: "https://drumroast.vercel.app",
  logo: "https://drumroast.vercel.app/favicon.png",
  description: "Premium drum-roasted cashew flavours, healthy snacks & gift collections.",
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["English", "Hindi"] },
  sameAs: ["https://instagram.com/drumroast"],
};

const Index = () => {
  const [featured, setFeatured] = useState<FeaturedProduct[]>([]);

  useEffect(() => {
    supabase
      .from("products") 
      .select("id,name,slug,price,category,emoji,image_url")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(6)
      .then(({ data }) => { if (data) setFeatured(data as FeaturedProduct[]); });
  }, []);

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-muted to-accent/10">
        {/* Floating cashew decorations */}
        {["🥜", "🌰", "🥜", "🌰", "🥜"].map((e, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-3xl opacity-20 md:text-5xl"
            style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}
        <div className="container relative py-24 md:py-36">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.p custom={0} variants={fadeUp} className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
              Premium Cashews & Healthy Snacks
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="mb-6 font-heading text-4xl font-extrabold leading-tight md:text-6xl">
              Traditionally Crafted{" "}
              <span className="relative inline-block text-primary">
                Taste
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="mb-8 text-lg text-muted-foreground md:text-xl">
              Experience authentic drum-roasted cashew flavours inspired by Indian food heritage and refined for modern lifestyles.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold backdrop-blur">
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container grid grid-cols-3 divide-x">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-8 text-center"
            >
              <p className="font-heading text-3xl font-extrabold text-primary md:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="container py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">Rooted in Tradition, Made for <span className="text-primary">Today</span></h2>
          <p className="text-lg leading-relaxed text-muted-foreground">DrumRoast brings time-honoured roasting traditions into contemporary food retail. Built on expertise in nut processing and agro-based value addition, the brand delivers premium nutrition, honest ingredients, and flavour-rich snacks crafted with care.</p>
        </motion.div>
      </section>

      {/* Segments */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">Our Collections</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {segments.map((seg, i) => (
              <motion.div key={seg.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
                <Card className="group h-full border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-8">
                    <motion.span
                      className="mb-4 inline-block text-4xl"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                      transition={{ duration: 0.4 }}
                    >
                      {seg.emoji}
                    </motion.span>
                    <h3 className="mb-3 font-heading text-xl font-bold">{seg.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{seg.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16 md:py-24">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">Why Choose DrumRoast</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="group text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20"
              >
                <b.icon className="h-7 w-7 text-primary" />
              </motion.div>
              <h3 className="mb-2 font-heading text-base font-bold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Featured Cashew Flavours</h2>
            <Link to="/shop" className="hidden text-sm font-semibold text-primary hover:underline md:block">View All →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                category={p.category}
                emoji={p.emoji}
                imageUrl={p.image_url}
                index={i}
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop"><Button variant="outline" className="rounded-full">View All Products</Button></Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">Stay in the Loop</h2>
          <p className="mb-6 text-muted-foreground">Get notified about new launches, seasonal collections, and exclusive offers.</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="rounded-full" />
            <Button className="rounded-full px-6 shadow-md shadow-primary/20">Subscribe</Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
