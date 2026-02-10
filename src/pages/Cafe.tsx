import { motion } from "framer-motion";
import { Coffee, IceCream, Salad, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const concepts = [
  { icon: Coffee, title: "Specialty Beverages", desc: "Dry fruit lattes, nutty cold brews, and heritage-inspired chai blends crafted with premium ingredients." },
  { icon: IceCream, title: "Dry Fruit Desserts", desc: "Kaju katli soft-serve, almond praline sundaes, and pistachio-rose parfaits that celebrate Indian flavours." },
  { icon: Salad, title: "Smoothie Bowls", desc: "Nutrient-packed bowls topped with roasted nuts, seeds, dried fruits, and superfood drizzles." },
  { icon: Sparkles, title: "Snack Experiences", desc: "Curated tasting platters, flavour flights, and live drum-roasting demonstrations." },
];

const Cafe = () => {
  return (
    <Layout>
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary">Coming Soon</p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl">
              The DrumRoast <span className="text-primary">Café</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              An experiential expansion into premium lifestyle spaces — where specialty beverages meet dry fruit-based desserts, smoothie bowls, and nutrition-focused snacking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            DrumRoast Café represents the brand's vision for experiential retail — a space where customers can immerse themselves in the world of premium nuts and wholesome snacking. More than just a café, it's a lifestyle destination that bridges culinary heritage with modern wellness culture.
          </p>
          <p>
            Imagine walking into a warm, sunlit space where the aroma of freshly roasted cashews mingles with specialty coffee, where dessert menus feature pistachio-rose layered treats and almond milk smoothies, and where every dish celebrates the humble nut in extraordinary ways.
          </p>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">What to Expect</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {concepts.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="h-full border-none shadow-md">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <c.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-heading font-bold">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cafe;
