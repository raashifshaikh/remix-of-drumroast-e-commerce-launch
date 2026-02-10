import { motion } from "framer-motion";
import { Heart, Leaf, Shield, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";

const values = [
  { icon: Heart, title: "Authenticity", desc: "Honouring traditional roasting methods passed down through generations." },
  { icon: Leaf, title: "Nutritional Integrity", desc: "Preserving natural goodness through careful processing and minimal additives." },
  { icon: Shield, title: "Trustworthiness", desc: "Transparent sourcing and quality you can see, taste, and trust." },
  { icon: Star, title: "Craftsmanship", desc: "Every batch roasted with precision, care, and decades of expertise." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary">About Us</p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl">Our Story</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              DrumRoast was born from a commitment to preserve India's traditional roasting knowledge while adapting to modern consumer expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Kalpavriksha Agro Products Pvt Ltd has spent years perfecting the art of nut processing, building deep agricultural expertise from the ground up. DrumRoast is the natural evolution of that journey — a brand that brings backend manufacturing excellence to the forefront of consumer experience.
          </p>
          <p>
            The name "DrumRoast" pays homage to the traditional drum-roasting technique, valued across Indian food culture for delivering even roasting, authentic flavour, and a distinctive texture that modern methods often fail to replicate.
          </p>
          <p>
            By combining authentic sourcing, thoughtful processing, and contemporary packaging, DrumRoast delivers snacks that respect tradition while fitting seamlessly into modern routines. Whether it's a handful of premium cashews during a busy workday, a trail mix for an outdoor adventure, or a festive gift box for someone special — every product carries the warmth of traditional craftsmanship.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
