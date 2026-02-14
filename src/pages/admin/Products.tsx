import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  subcategory: string | null;
  emoji: string | null;
  image_url: string | null;
  ingredients: string | null;
  nutrition: string | null;
  storage_instructions: string | null;
  packaging: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
};

const emptyProduct = {
  name: "", slug: "", description: "", price: 0, original_price: null as number | null,
  category: "Signature", subcategory: "Cashews", emoji: "🥜", image_url: null as string | null,
  ingredients: "", nutrition: "", storage_instructions: "", packaging: "",
  is_featured: false, is_active: true,
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data as Product[]);
  };

  useEffect(() => { load(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm({ ...form, image_url: urlData.publicUrl });
    setUploading(false);
    toast({ title: "Image uploaded" });
  };

  const handleSave = async () => {
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { ...form, slug, original_price: form.original_price || null };

    if (editing) {
      const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product updated" });
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product added" });
    }
    setOpen(false);
    setEditing(null);
    setForm(emptyProduct);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    load();
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, slug: p.slug, description: p.description || "", price: p.price,
      original_price: p.original_price, category: p.category, subcategory: p.subcategory || "",
      emoji: p.emoji || "🥜", image_url: p.image_url, ingredients: p.ingredients || "",
      nutrition: p.nutrition || "", storage_instructions: p.storage_instructions || "",
      packaging: p.packaging || "", is_featured: p.is_featured ?? false, is_active: p.is_active ?? true,
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Products</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm(emptyProduct); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Slug (auto)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Image</label>
                {form.image_url && (
                  <div className="relative">
                    <img src={form.image_url} alt="Preview" className="h-32 w-full rounded-lg object-cover" />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute right-1 top-1 h-7 text-xs"
                      onClick={() => setForm({ ...form, image_url: null })}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
                <Input type="number" placeholder="Original Price" value={form.original_price ?? ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? +e.target.value : null })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <Input placeholder="Subcategory" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
              </div>
              <Input placeholder="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              <Textarea placeholder="Ingredients" value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} />
              <Textarea placeholder="Nutrition" value={form.nutrition} onChange={(e) => setForm({ ...form, nutrition: e.target.value })} />
              <Input placeholder="Storage Instructions" value={form.storage_instructions} onChange={(e) => setForm({ ...form, storage_instructions: e.target.value })} />
              <Input placeholder="Packaging" value={form.packaging} onChange={(e) => setForm({ ...form, packaging: e.target.value })} />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                  Active
                </label>
              </div>
              <Button onClick={handleSave}>{editing ? "Update" : "Add"} Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-8 w-8 rounded object-cover" />
                    ) : (
                      <span>{p.emoji}</span>
                    )}
                    {p.name}
                  </div>
                </TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.is_active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
