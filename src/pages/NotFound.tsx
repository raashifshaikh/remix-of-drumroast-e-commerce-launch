import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="mx-auto mb-6 text-8xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🥜
          </motion.div>
          <h1 className="mb-3 font-heading text-5xl font-extrabold text-primary">404</h1>
          <p className="mb-6 text-lg text-muted-foreground">Oops! This page doesn't exist.</p>
          <Link to="/">
            <Button className="rounded-full px-8">Return to Home</Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
