import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/drumroast-logo.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/officialdrumroast?igsh=MXVyODhybWNkYm95bQ==";

const Footer = () => {
  return (
    <footer className="border-t bg-foreground text-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="DrumRoast" className="h-10 w-auto rounded-lg" />
              <span className="font-heading text-xl font-bold text-white">DrumRoast</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Traditionally crafted taste — premium cashew flavours & healthy snacks by Kalpavriksha Agro Products Pvt Ltd.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/70">
              {[
                { to: "/about", label: "About Us" },
                { to: "/shop", label: "Shop" },
                { to: "/corporate", label: "Corporate Orders" },
                { to: "/cafe", label: "Café Experience" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
            <div className="space-y-2 text-sm text-white/70">
              <a href="mailto:officialdrumroast@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4" />
                officialdrumroast@gmail.com
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full bg-white/10 p-2.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="text-sm text-white/70">Stay updated with new launches and seasonal collections.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
              />
              <Button variant="secondary" size="sm" className="rounded-full">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} DrumRoast by Kalpavriksha Agro Products Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
