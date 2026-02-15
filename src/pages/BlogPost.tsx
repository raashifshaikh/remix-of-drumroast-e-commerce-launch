import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold">Article Not Found</h1>
          <Link to="/blog"><Button variant="outline" className="rounded-full">Back to Blog</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | DrumRoast Blog`}
        description={post.metaDescription}
        canonical={`https://drumroast.vercel.app/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          author: { "@type": "Organization", name: "DrumRoast" },
          publisher: {
            "@type": "Organization",
            name: "DrumRoast by Kalpavriksha Agro Products",
            url: "https://drumroast.vercel.app",
          },
          mainEntityOfPage: `https://drumroast.vercel.app/blog/${post.slug}`,
          keywords: post.keywords.join(", "),
        }}
      />

      <article className="container py-8 md:py-16">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold leading-tight md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-8 space-y-8">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 font-heading text-xl font-bold md:text-2xl">{section.heading}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.content}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-primary/5 p-6 text-center">
            <p className="mb-3 font-heading text-lg font-bold">Ready to taste the difference?</p>
            <Link to="/shop">
              <Button className="rounded-full">Shop DrumRoast Cashews</Button>
            </Link>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

export default BlogPost;
