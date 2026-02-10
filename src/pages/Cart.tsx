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
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mb-3 font-heading text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added any products yet. Browse our collection and find something you love!
          </p>
          <Link to="/shop">
            <Button className="rounded-full px-8">Browse Shop</Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Cart;
