import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, Eyebrow } from "@/components/threadx-shell";
import { useStore } from "@/lib/threadx-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — THREADX" },
      { name: "description", content: "Review your THREADX bag, adjust quantities and check out." },
      { property: "og:title", content: "Your Bag — THREADX" },
      { property: "og:description", content: "Review your THREADX bag, adjust quantities and check out." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function CartPage() {
  const { lines, totals, setQuantity, removeFromCart } = useStore();

  return (
    <PageFrame>
      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <Eyebrow>Your bag</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Shopping bag</h1>

        {lines.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-5 border border-dashed border-border px-6 py-20 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Your bag is empty. Go find a tee that feels like you.</p>
            <Button asChild className="rounded-sm"><Link to="/shop">Shop all tees <ArrowRight /></Link></Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((item) => (
                <li key={item.key} className="flex gap-4 py-5 sm:gap-6">
                  <Link to="/products/$productId" params={{ productId: item.product.id }} className="block w-24 shrink-0 overflow-hidden bg-secondary sm:w-28">
                    <img src={item.product.image} alt={item.product.name} className="aspect-[4/5] w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to="/products/$productId" params={{ productId: item.product.id }} className="truncate text-sm font-semibold hover:text-accent">{item.product.name}</Link>
                        <p className="mt-1 text-xs text-muted-foreground">Size {item.size} · {item.color}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.product.name}`} className="text-muted-foreground transition-colors hover:text-destructive"><Trash2 className="size-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="inline-flex items-center border border-border">
                        <button onClick={() => setQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity" className="flex size-8 items-center justify-center hover:bg-secondary"><Minus className="size-3.5" /></button>
                        <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => setQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity" className="flex size-8 items-center justify-center hover:bg-secondary"><Plus className="size-3.5" /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{inr(item.lineTotal)}</p>
                        {item.savings > 0 && <p className="text-xs text-muted-foreground line-through">{inr(item.product.originalPrice * item.quantity)}</p>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-border bg-secondary/30 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Order summary</h2>
              <dl className="mt-5 grid gap-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(totals.subtotal)}</dd></div>
                {totals.savings > 0 && <div className="flex justify-between text-accent"><dt>You save</dt><dd>−{inr(totals.savings)}</dd></div>}
                <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{inr(totals.gst)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{totals.delivery === 0 ? "Free" : inr(totals.delivery)}</dd></div>
                <div className="mt-2 flex justify-between border-t border-border pt-4 text-base font-semibold"><dt>Total</dt><dd>{inr(totals.total)}</dd></div>
              </dl>
              {totals.delivery > 0 && <p className="mt-3 text-xs text-muted-foreground">Add {inr(999 - totals.subtotal)} more for free delivery.</p>}
              <Button asChild className="mt-6 w-full rounded-sm"><Link to="/checkout">Proceed to checkout <ArrowRight /></Link></Button>
              <Link to="/shop" className="mt-4 block text-center text-xs text-muted-foreground underline-offset-4 hover:underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </main>
    </PageFrame>
  );
}
