import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Cart = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md text-center"
        >
          <motion.div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShoppingCart className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="mb-3 font-heading text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added any products yet. Browse our collection and find something you love!
          </p>
          <Link to="/shop">
            <Button className="rounded-full px-8 shadow-md shadow-primary/20">Browse Shop</Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Cart;
