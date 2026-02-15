import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <Layout>
      <SEOHead
        title="DrumRoast Blog – Cashew Health Tips, Dry Fruit Guides & More"
        description="Read expert articles on cashew health benefits, almond nutrition, dry fruit snacking tips, and premium gifting guides from DrumRoast."
        canonical="https://drumroast.vercel.app/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "DrumRoast Blog",
          description: "Expert articles on cashews, almonds, dry fruits, health benefits and premium snacking.",
          url: "https://drumroast.vercel.app/blog",
          publisher: {
            "@type": "Organization",
            name: "DrumRoast by Kalpavriksha Agro Products",
          },
        }}
      />

      <div className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            The DrumRoast Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Expert guides on cashews, almonds, dry fruits, health benefits, and smart snacking.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg md:p-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-xl font-bold transition-colors group-hover:text-primary md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
