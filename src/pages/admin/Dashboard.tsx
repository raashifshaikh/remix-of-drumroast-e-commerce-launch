import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Tag, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, offers: 0, orders: 0 });

  useEffect(() => {
    const load = async () => {
      const [p, o, ord] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("offers").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("orders").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        products: p.count ?? 0,
        offers: o.count ?? 0,
        orders: ord.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, to: "/admin/products" },
    { label: "Active Offers", value: stats.offers, icon: Tag, to: "/admin/offers" },
    { label: "Orders", value: stats.orders, icon: ShoppingBag, to: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-bold">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link to="/admin/products"><Button>Manage Products</Button></Link>
        <Link to="/admin/offers"><Button variant="outline">Manage Offers</Button></Link>
      </div>
    </div>
  );
};

export default Dashboard;
