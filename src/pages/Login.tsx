import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import logo from "@/assets/drumroast-logo.jpg";

const Login = () => {
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: isSignUp ? "Account created!" : "Logged in!",
        description: isSignUp ? "Welcome to DrumRoast. You can now place orders." : "Welcome back!",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center">
            <img src={logo} alt="DrumRoast" className="mx-auto mb-4 h-16 w-auto rounded-lg" />
            <h1 className="font-heading text-2xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignUp ? "Sign up to place orders and track your purchases." : "Login to your DrumRoast account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                <Input required placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <Input required type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <Input required type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-primary hover:underline">
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
