import { createFileRoute } from "@tanstack/react-router";
import { ShopContent } from "@/components/threadx-products";
import { PageFrame } from "@/components/threadx-shell";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : "",
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({ meta: [
    { title: "Shop all tees — THREADX India" },
    { name: "description", content: "Find your fit: shop THREADX oversized, regular, graphic and everyday T-shirts. Easy Indian pricing, free delivery over ₹999." },
    { property: "og:title", content: "Shop all tees — THREADX" },
    { property: "og:description", content: "Easy fits. Really good cotton. Find your everyday favourite in the THREADX collection." },
  ] }),
  component: ShopPage,
});

function ShopPage() {
  const { category, q } = Route.useSearch();
  return <PageFrame><main><ShopContent key={`${category}-${q}`} initialCategory={category} initialQuery={q}/></main></PageFrame>;
}