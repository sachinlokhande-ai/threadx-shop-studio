import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, Eyebrow } from "@/components/threadx-shell";
import { useStore } from "@/lib/threadx-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — THREADX" },
      { name: "description", content: "Enter your details and place your THREADX order." },
      { property: "og:title", content: "Checkout — THREADX" },
      { property: "og:description", content: "Enter your details and place your THREADX order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const fields = [
  { name: "name", label: "Full name", type: "text", placeholder: "Aarav Sharma", span: 2 },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", span: 1 },
  { name: "phone", label: "Phone", type: "tel", placeholder: "98765 43210", span: 1 },
  { name: "address", label: "Address", type: "text", placeholder: "Flat, street, landmark", span: 2 },
  { name: "city", label: "City", type: "text", placeholder: "Mumbai", span: 1 },
  { name: "state", label: "State", type: "text", placeholder: "Maharashtra", span: 1 },
  { name: "pincode", label: "Pincode", type: "text", placeholder: "400001", span: 1 },
] as const;

function CheckoutPage() {
  const { lines, totals, setLastOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({});

  const placeOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const orderId = `TX${Date.now().toString(36).toUpperCase()}`;
    setLastOrder({ id: orderId, lines, totals, customer: form, placedAt: new Date().toISOString() });
    clearCart();
    navigate({ to: "/order-success" });
  };

  return (
    <PageFrame>
      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" /> Back to bag</Link>
        <Eyebrow className="mt-6">Almost there</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Checkout</h1>

        {lines.length === 0 ? (
          <div className="mt-14 border border-dashed border-border px-6 py-20 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty — add something before checking out.</p>
            <Button asChild className="mt-6 rounded-sm"><Link to="/shop">Shop all tees</Link></Button>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Your details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
                    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name] ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="w-full border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
                    />
                  </label>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Lock className="size-3.5" /> Demo checkout — no payment is taken.</p>
            </section>

            <aside className="h-fit border border-border bg-secondary/30 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Order summary</h2>
              <ul className="mt-5 grid gap-4">
                {lines.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="size-14 shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{item.product.name}</p>
                      <p className="text-[11px] text-muted-foreground">{item.size} · {item.color} × {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold">{inr(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 grid gap-2.5 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{inr(totals.gst)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{totals.delivery === 0 ? "Free" : inr(totals.delivery)}</dd></div>
                <div className="mt-1 flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>{inr(totals.total)}</dd></div>
              </dl>
              <Button type="submit" className="mt-6 w-full rounded-sm">Place order</Button>
            </aside>
          </form>
        )}
      </main>
    </PageFrame>
  );
}
