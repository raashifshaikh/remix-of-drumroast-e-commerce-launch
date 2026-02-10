import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Gift, Truck, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const offerings = [
  { icon: Gift, title: "Corporate Gifting", desc: "Premium gift boxes customized for festivals, events, and employee appreciation." },
  { icon: Truck, title: "Wholesale Distribution", desc: "Bulk supply partnerships for retailers, hotels, and food service businesses." },
  { icon: Building2, title: "Custom Branding", desc: "White-label and co-branded packaging solutions for corporate clients." },
];

const Corporate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Enquiry submitted!", description: "Our team will respond within 24 hours." });
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

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
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary">Business</p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl">Corporate & Bulk Orders</h1>
            <p className="text-lg text-muted-foreground">
              DrumRoast supports corporate gifting, distribution partnerships, and wholesale enquiries. Let's build something together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section className="container py-16 md:py-24">
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {offerings.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full border-none shadow-md text-center">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <o.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading font-bold">{o.title}</h3>
                  <p className="text-sm text-muted-foreground">{o.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg"
        >
          <h2 className="mb-6 text-center font-heading text-2xl font-bold">Send an Enquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <Input required placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Organization</label>
              <Input required placeholder="Company name" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <Input required type="email" placeholder="you@company.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <Textarea required placeholder="Tell us about your requirements..." rows={5} />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Or email us directly at{" "}
            <a href="mailto:officialdrumroast@gmail.com" className="text-primary hover:underline">
              officialdrumroast@gmail.com
            </a>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Corporate;
