import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame } from "@/components/threadx-shell";
import { useStore } from "@/lib/threadx-store";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Placed — THREADX" },
      { name: "description", content: "Your THREADX order was placed successfully." },
      { property: "og:title", content: "Order Placed — THREADX" },
      { property: "og:description", content: "Your THREADX order was placed successfully." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderSuccessPage,
});

const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function OrderSuccessPage() {
  const { lastOrder } = useStore();

  return (
    <PageFrame>
      <main className="mx-auto flex max-w-[720px] flex-col items-center px-5 py-16 text-center sm:py-24">
        <CheckCircle2 className="size-14 text-accent" />
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Order placed successfully!</h1>
        {lastOrder ? (
          <>
            <p className="mt-3 text-sm text-muted-foreground">Order ID <span className="font-semibold text-foreground">{lastOrder.id}</span> — a confirmation is on its way to {lastOrder.customer?.email || "your inbox"}.</p>
            <div className="mt-10 w-full border border-border bg-secondary/30 p-6 text-left sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Order summary</h2>
              <ul className="mt-4 grid gap-3">
                {lastOrder.lines.map((item: any) => (
                  <li key={item.key} className="flex justify-between gap-4 text-sm">
                    <span className="min-w-0 truncate">{item.product.name} <span className="text-muted-foreground">· {item.size} · {item.color} × {item.quantity}</span></span>
                    <span className="shrink-0 font-medium">{inr(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 grid gap-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(lastOrder.totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">GST</dt><dd>{inr(lastOrder.totals.gst)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{lastOrder.totals.delivery === 0 ? "Free" : inr(lastOrder.totals.delivery)}</dd></div>
                <div className="mt-1 flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total paid</dt><dd>{inr(lastOrder.totals.total)}</dd></div>
              </dl>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Thanks for shopping with THREADX.</p>
        )}
        <Button asChild className="mt-10 rounded-sm"><Link to="/shop" search={{}}>Continue shopping <ArrowRight /></Link></Button>
      </main>
    </PageFrame>
  );
}
