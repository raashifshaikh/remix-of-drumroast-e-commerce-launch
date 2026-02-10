import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Facebook, Twitter, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
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
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <Input required placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <Input required type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <Textarea required placeholder="How can we help?" rows={5} />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-3 font-heading text-lg font-bold">Email Us</h3>
              <a
                href="mailto:officialdrumroast@gmail.com"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="h-5 w-5" />
                officialdrumroast@gmail.com
              </a>
            </div>
            <div>
              <h3 className="mb-3 font-heading text-lg font-bold">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
