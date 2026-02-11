import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Tag, ShoppingBag, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/offers", label: "Offers", icon: Tag },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-col border-r bg-background p-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Site
        </Link>
        <h2 className="mb-4 font-heading text-lg font-bold">Admin Panel</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                (location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to)))
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-2 border-b bg-background p-3 md:hidden">
          <Link to="/" className="text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /></Link>
          <span className="font-heading font-bold">Admin</span>
          <nav className="ml-auto flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md p-2 text-sm",
                  (location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to)))
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
