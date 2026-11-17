import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, updateProductDiscount } from "../Backend/AdminLogic";
import { Button } from "../Components/ui/button";
import { toast } from "sonner";

export default function DiscountManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    const rows = await getProducts();
    setProducts(rows);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const updateField = (id, field, value) => {
    setProducts((current) => current.map((product) => product.id === id ? { ...product, [field]: value } : product));
  };

  const saveDiscount = async (product) => {
    setSavingId(product.id);
    try {
      await updateProductDiscount(product.id, product.discountPercent ?? 0, product.isOnSale);
      toast.success(`${product.name} sale updated`);
      await loadProducts();
    } catch (error) {
      toast.error(error.message || "Could not save sale");
    } finally {
      setSavingId(null);
    }
  };

  return <main className="mx-auto max-w-5xl py-10 text-foreground">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
      <div><h1 className="text-3xl font-bold">Product sales</h1><p className="mt-2 text-sm text-muted-foreground">Set a discount for each product and switch the sale on or off.</p></div>
      <Link to="/dashboard"><Button variant="outline">Back to dashboard</Button></Link>
    </header>
    {loading ? <p>Loading products…</p> : products.length === 0 ? <p>No products found.</p> : <div className="grid gap-4">
      {products.map((product) => <section key={product.id} className="flex flex-wrap items-center gap-5 rounded-2xl border border-border/50 bg-card/50 p-5">
        <img className="h-20 w-20 rounded-xl object-cover" src={product.imgUrls?.[0] || product.imgUrl || "/placeholder.svg"} alt={product.name} />
        <div className="min-w-40 flex-1"><h2 className="font-bold">{product.name}</h2><p className="text-sm text-muted-foreground">Regular price: ₦{Number(product.price || 0).toLocaleString()}</p></div>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={Boolean(product.isOnSale)} onChange={(event) => updateField(product.id, "isOnSale", event.target.checked)} /> Sale active</label>
        <label className="flex items-center gap-2 text-sm">Discount % <input className="w-24 rounded-lg border border-border bg-background px-3 py-2" type="number" min="0" max="100" value={product.discountPercent ?? 0} onChange={(event) => updateField(product.id, "discountPercent", event.target.value)} /></label>
        <Button onClick={() => saveDiscount(product)} disabled={savingId === product.id}>{savingId === product.id ? "Saving…" : "Save sale"}</Button>
      </section>)}
    </div>}
  </main>;
}
