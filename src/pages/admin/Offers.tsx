import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number;
  product_id: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean | null;
};

const AdminOffers = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", discount_percentage: 10, product_id: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    is_active: true,
  });

  const load = async () => {
    const { data } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    if (data) setOffers(data as Offer[]);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const { error } = await supabase.from("offers").insert({
      ...form,
      product_id: form.product_id || null,
      start_date: new Date(form.start_date).toISOString(),
      end_date: new Date(form.end_date).toISOString(),
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Offer created" });
    setOpen(false);
    load();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("offers").update({ is_active: !current }).eq("id", id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    await supabase.from("offers").delete().eq("id", id);
    toast({ title: "Offer deleted" });
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Offers</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-1 h-4 w-4" /> Create Offer</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>New Offer</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input type="number" placeholder="Discount %" value={form.discount_percentage} onChange={(e) => setForm({ ...form, discount_percentage: +e.target.value })} />
              <Input placeholder="Product ID (optional)" value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Start</label>
                  <Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">End</label>
                  <Input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
                </div>
              </div>
              <Button onClick={handleSave}>Create Offer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.title}</TableCell>
                <TableCell>{o.discount_percentage}%</TableCell>
                <TableCell>{new Date(o.end_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch checked={o.is_active ?? false} onCheckedChange={() => toggleActive(o.id, o.is_active ?? false)} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(o.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOffers;
