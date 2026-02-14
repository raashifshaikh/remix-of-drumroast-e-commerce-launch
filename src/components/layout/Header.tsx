import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/drumroast-logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/cafe", label: "Café" },
  { to: "/corporate", label: "Corporate" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.img
            src={logo}
            alt="DrumRoast"
            className="h-10 w-auto rounded-lg md:h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="font-heading text-xl font-bold text-primary md:text-2xl">
            DrumRoast
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-muted">
              <Shield className="mr-1 inline h-4 w-4" />Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          {user ? (
            <Button variant="outline" size="sm" className="hidden rounded-full md:inline-flex" onClick={() => signOut()}>
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden rounded-full md:inline-flex">
                <User className="mr-1 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t bg-background px-4 pb-4 pt-2 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                    location.pathname === link.to ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {isAdmin && (
              <Link to="/admin" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary">
                <Shield className="mr-1 inline h-4 w-4" />Admin Panel
              </Link>
            )}
            {user ? (
              <Button variant="outline" size="sm" className="mt-2 w-full rounded-full" onClick={() => signOut()}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="mt-2 w-full rounded-full">
                  <User className="mr-1 h-4 w-4" /> Login / Sign Up
                </Button>
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
