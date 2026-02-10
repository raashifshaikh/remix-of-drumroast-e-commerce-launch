import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Award, Shield, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const benefits = [
  { icon: Award, title: "High Quality Ingredients", desc: "Sourced from trusted farms across India" },
  { icon: Leaf, title: "Nutrient Rich", desc: "Packed with natural goodness and vitamins" },
  { icon: Shield, title: "Carefully Processed", desc: "Traditional drum-roasting techniques" },
  { icon: Package, title: "Hygienic Packaging", desc: "Sealed fresh for lasting quality" },
];

const segments = [
  {
    title: "DrumRoast Signature",
    desc: "Premium nuts, superfood blends, and functional foods crafted for the discerning palate.",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "DrumRoast Daily",
    desc: "Everyday snack options — makhanas, namkeens, puffs, and masala mixes for every mood.",
    color: "bg-secondary/20 text-secondary-foreground",
  },
  {
    title: "DrumRoast Café",
    desc: "An experiential concept blending specialty beverages with dry fruit desserts and smoothie bowls.",
    color: "bg-accent/20 text-accent-foreground",
  },
];

const featuredProducts = [
  { name: "Premium Cashews", price: "₹499", category: "Signature", emoji: "🥜" },
  { name: "Roasted Almonds", price: "₹549", category: "Signature", emoji: "🌰" },
  { name: "Classic Trail Mix", price: "₹399", category: "Signature", emoji: "🥣" },
  { name: "Cream & Onion Makhana", price: "₹199", category: "Daily", emoji: "🍿" },
  { name: "Festive Gift Box", price: "₹1,299", category: "Gift", emoji: "🎁" },
  { name: "Chocolate Almonds", price: "₹599", category: "Signature", emoji: "🍫" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary"
            >
              Premium Dry Fruits & Healthy Snacks
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mb-6 font-heading text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Traditionally Crafted{" "}
              <span className="text-primary">Taste</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mb-8 text-lg text-muted-foreground md:text-xl"
            >
              Experience authentic drum-roasted goodness inspired by Indian food heritage and refined for modern lifestyles.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 font-semibold">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold">
                  Explore Collections
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
            Rooted in Tradition, Made for <span className="text-primary">Today</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            DrumRoast brings time-honoured roasting traditions into contemporary food retail. Built on expertise in nut processing and agro-based value addition, the brand delivers premium nutrition, honest ingredients, and flavour-rich snacks crafted with care.
          </p>
        </motion.div>
      </section>

      {/* Segments */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">
            Our Collections
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {segments.map((seg, i) => (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Card className="h-full border-none shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="p-8">
                    <span className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold ${seg.color}`}>
                      Collection
                    </span>
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
        <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">
          Why Choose DrumRoast
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <b.icon className="h-7 w-7 text-primary" />
              </div>
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
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Featured Products</h2>
            <Link to="/shop" className="hidden text-sm font-semibold text-primary hover:underline md:block">
              View All →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-muted to-background text-6xl">
                    {p.emoji}
                  </div>
                  <CardContent className="p-5">
                    <span className="text-xs font-medium text-primary">{p.category}</span>
                    <h3 className="mt-1 font-heading text-base font-bold">{p.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{p.price}</span>
                      <Button size="sm" variant="outline" className="rounded-full text-xs">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop">
              <Button variant="outline" className="rounded-full">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-bold">Stay in the Loop</h2>
          <p className="mb-6 text-muted-foreground">
            Get notified about new launches, seasonal collections, and exclusive offers.
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="rounded-full" />
            <Button className="rounded-full px-6">Subscribe</Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
