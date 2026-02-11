import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="DrumRoast" className="h-10 w-auto rounded-md md:h-12" />
          <span className="font-heading text-xl font-bold text-primary md:text-2xl">
            DrumRoast
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
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
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          {user ? (
            <Button variant="outline" size="sm" className="hidden md:inline-flex" onClick={() => signOut()}>
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
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

      {mobileOpen && (
        <nav className="border-t bg-background px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary">
              <Shield className="mr-1 inline h-4 w-4" />Admin Panel
            </Link>
          )}
          {user ? (
            <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <User className="mr-1 h-4 w-4" /> Login / Sign Up
              </Button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
