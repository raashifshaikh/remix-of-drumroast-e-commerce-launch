import { Link } from "react-router-dom";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/drumroast-logo.jpg";

const Footer = () => {
  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="DrumRoast" className="h-10 w-auto rounded-md" />
              <span className="font-heading text-xl font-bold">DrumRoast</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Traditionally crafted taste — premium dry fruits & healthy snacks by Kalpavriksha Agro Products Pvt Ltd.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm opacity-80">
              <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
              <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
              <Link to="/corporate" className="hover:opacity-100 transition-opacity">Corporate Orders</Link>
              <Link to="/cafe" className="hover:opacity-100 transition-opacity">Café Experience</Link>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-2 text-sm opacity-80">
              <a href="mailto:officialdrumroast@gmail.com" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
                <Mail className="h-4 w-4" />
                officialdrumroast@gmail.com
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm opacity-80">Stay updated with new launches and seasonal collections.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="sm">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} DrumRoast by Kalpavriksha Agro Products Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
