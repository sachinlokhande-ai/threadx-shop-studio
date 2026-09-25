import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageFrame } from "@/components/threadx-shell";
import { ProductGrid, SectionHeading, ShopStrip } from "@/components/threadx-products";
import { formatINR, products } from "@/lib/threadx-products";
import { useStore } from "@/lib/threadx-store";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = products.find((item) => item.id === params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "The good stuff"} — THREADX` },
    { name: "description", content: loaderData?.description ?? "Really good cotton tees for everyday. Find your fit with THREADX India." },
    { property: "og:title", content: `${loaderData?.name ?? "Shop tees"} — THREADX` },
    { property: "og:description", content: loaderData?.description ?? "Thoughtfully made tees, ready for their new favourite person." },
  ] }),
  notFoundComponent: () => <PageFrame><div className="mx-auto max-w-2xl px-5 py-24 text-center"><h1 className="font-display text-3xl font-semibold">That tee has wandered off.</h1><Link to="/shop" className="mt-5 inline-flex underline underline-offset-4">Find it another way</Link></div></PageFrame>,
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const { addToCart, showNotice } = useStore();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const handleAdd = (goToCart = false) => {
    if (!size) { setSizeError(true); return; }
    addToCart(product, size, color, quantity);
    showNotice(`${product.name} · ${size} added to your bag`);
    if (goToCart) window.location.href = "/cart";
  };
  const related = products.filter((item) => item.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 4);
  return <PageFrame><main className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 sm:px-8 sm:pt-7 lg:px-12">
    <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/> Shop the collection</Link>
    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,.9fr)] lg:gap-16"><div className="relative aspect-[4/4.65] overflow-hidden bg-card sm:aspect-[1/1] lg:aspect-[.93/1]"><img src={product.image} alt={product.name} width={1024} height={1024} fetchPriority="high" className="size-full object-cover"/><span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider">{product.category}</span></div>
      <section className="py-1 sm:py-4 lg:py-8"><Eyebrow>Better basics, better days</Eyebrow><h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-[38px]">{product.name}<span className="text-accent">.</span></h1><div className="mt-3 flex items-center gap-2"><span className="flex items-center gap-1 text-xs"><Star className="size-3.5 fill-accent text-accent"/>{product.rating}</span><a href="#reviews" className="text-[11px] text-muted-foreground underline underline-offset-4">{product.reviews} reviews</a><span className="text-[10px] text-muted-foreground">· In love with this fit</span></div>
        <div className="mt-5 flex flex-wrap items-baseline gap-3 border-b border-border pb-5"><span className="text-xl font-semibold">{formatINR(product.price)}</span><span className="text-sm text-muted-foreground line-through">{formatINR(product.originalPrice)}</span><span className="border border-accent/40 px-2 py-1 text-[10px] font-semibold">YOU SAVE {product.discount}%</span></div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <fieldset className="mt-6"><legend className="text-xs font-semibold">Colour <span className="font-normal text-muted-foreground">/ {color}</span></legend><div className="mt-3 flex flex-wrap gap-2">{product.colors.map((tone) => <button key={tone} aria-label={`Choose ${tone}`} aria-pressed={color === tone} onClick={() => setColor(tone)} className={`flex h-9 items-center gap-2 border px-3 text-[11px] ${color === tone ? "border-primary" : "border-border hover:border-foreground"}`}><span className={`size-4 border border-foreground/10 ${tone === "Black" ? "bg-foreground" : tone === "White" || tone === "Cloud" ? "bg-background" : tone === "Rust" ? "bg-chart-3" : tone === "Moss" ? "bg-chart-4" : tone === "Sky" ? "bg-chart-2" : tone === "Slate" ? "bg-muted-foreground" : "bg-secondary"}`}/>{tone}{color === tone && <Check className="size-3"/>}</button>)}</div></fieldset>
        <fieldset className="mt-6"><legend className="text-xs font-semibold">Pick your size{size && <span className="font-normal text-muted-foreground"> / {size}</span>}</legend><div className="mt-3 flex flex-wrap gap-2">{product.sizes.map((item) => <button key={item} aria-pressed={size === item} onClick={() => { setSize(item); setSizeError(false); }} className={`flex h-10 min-w-11 items-center justify-center border px-3 text-xs transition-colors ${size === item ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{item}</button>)}</div>{sizeError && <p role="alert" className="mt-2 text-xs text-destructive">Pick your size first — we want to get this just right.</p>}<p className="mt-2 text-[10px] text-muted-foreground">Relaxed, unisex fit · Between sizes? Size down for a closer fit.</p></fieldset>
        <div className="mt-6 flex flex-wrap gap-3"><div className="flex h-12 items-center border border-input"><Button aria-label="Decrease quantity" disabled={quantity <= 1} variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-11 w-10"><Minus/></Button><span className="w-8 text-center text-xs">{quantity}</span><Button aria-label="Increase quantity" variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-11 w-10"><Plus/></Button></div><Button onClick={() => handleAdd()} className="h-12 min-w-0 flex-1 rounded-sm">Add to bag · {formatINR(product.price * quantity)} <ArrowRight/></Button></div>
        <Button variant="outline" onClick={() => handleAdd(true)} className="mt-3 h-11 w-full rounded-sm">Get it now</Button><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-foreground"><span>Free delivery over ₹999</span><span>·</span><span>Easy 7-day exchanges</span><span>·</span><span>Designed in India</span></div>
        <div className="mt-8 border-t border-border pt-6"><h2 className="text-xs font-semibold uppercase tracking-wider">A little more about the details</h2><p className="mt-2 text-xs leading-5 text-muted-foreground">Responsibly chosen cotton · 240 GSM heavyweight fabric · Pre-washed for a softer handfeel · Made for everyday, wash after wash.</p></div>
      </section></div>
    <section className="mt-16 border-t border-border pt-8 sm:mt-20" id="reviews"><div className="grid gap-8 sm:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>Very kind words</Eyebrow><h2 className="mt-1 font-display text-2xl font-semibold">A tee worth talking about.</h2><div className="mt-3 flex items-center gap-2 text-sm"><Star className="size-4 fill-accent text-accent"/>{product.rating}<span className="text-xs text-muted-foreground">({product.reviews} lovely reviews)</span></div></div><div className="divide-y divide-border border-y border-border">{[["Sana R.", "Wore it once and immediately ordered another in a different colour. The fit is perfect."], ["Aarav M.", "Finally, an everyday tee that feels as good as it looks. Really lovely cotton."], ["Ishita K.", "Looks even better in person. Arrived beautifully packed and in two days."]].map(([name, quote]) => <article key={name} className="py-4"><div className="flex justify-between text-xs font-medium"><span>{name}</span><span className="flex gap-0.5 text-accent">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3 fill-current"/>)}</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">“{quote}”</p></article>)}</div></div></section>
    <section className="mt-14"><SectionHeading eyebrow="Good company" title="You might get on with these, too" href="/shop"/><ProductGrid items={related}/></section><ShopStrip/>
  </main></PageFrame>;
}