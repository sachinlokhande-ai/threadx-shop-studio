import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownUp, ArrowRight, Check, ChevronDown, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, formatINR } from "@/lib/threadx-products";
import { Eyebrow } from "@/components/threadx-shell";

export function ProductCard({ product, index = 0 }) {
  return <article className="group min-w-0 animate-reveal" style={{ animationDelay: `${Math.min(index * 55, 320)}ms` }}>
    <Link to="/products/$productId" params={{ productId: product.id }} className="relative block aspect-[4/5] overflow-hidden bg-card">
      <img src={product.image} alt={product.name} loading={index < 4 ? "eager" : "lazy"} width={1024} height={1024} className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
      {product.isNew && <span className="absolute left-3 top-3 bg-background px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em]">Just dropped</span>}
      {product.discount >= 18 && <span className="absolute right-3 top-3 bg-accent px-2 py-1 text-[9px] font-bold text-accent-foreground">-{product.discount}%</span>}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-center text-[11px] font-semibold text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">View the details <ArrowRight className="ml-1 inline size-3" /></div>
    </Link>
    <div className="pb-1 pt-3.5"><div className="flex items-start justify-between gap-2"><Link to="/products/$productId" params={{ productId: product.id }} className="min-w-0 text-[12px] font-medium leading-[1.45] hover:text-muted-foreground sm:text-[13px]">{product.name}</Link><span className="flex shrink-0 items-center gap-1 pt-0.5 text-[10px]"><Star className="size-3 fill-accent text-accent" />{product.rating}</span></div>
    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[12px]"><span className="font-semibold">{formatINR(product.price)}</span>{product.originalPrice > product.price && <><span className="text-[11px] text-muted-foreground line-through">{formatINR(product.originalPrice)}</span><span className="text-[10px] font-medium text-muted-foreground">-{product.discount}%</span></>}</p>
    <p className="mt-2 text-[10px] text-muted-foreground">{product.colors.slice(0, 3).join(" · ")}</p></div>
  </article>;
}

export function ProductGrid({ items, columns = "grid-cols-2 lg:grid-cols-4" }) {
  if (!items.length) return <div className="col-span-full border border-border py-16 text-center"><p className="font-display text-xl font-semibold">Nothing in this fit (yet).</p><p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters.</p></div>;
  return <div className={`grid ${columns} gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 lg:gap-x-6`}>{items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>;
}

const filters = { category: ["Oversized", "Regular Fit", "Graphic Tees", "Plain Tees"], size: ["S", "M", "L", "XL", "XXL"], color: ["White", "Black", "Rust", "Moss", "Cloud", "Slate", "Sky", "Sand"] };

export function ShopContent({ initialCategory = "", initialQuery = "" }) {
  const [category, setCategory] = useState(initialCategory);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maximumPrice, setMaximumPrice] = useState(1499);
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const filtered = useMemo(() => {
    const found = products.filter((product) => (!category || product.category === category) && (!size || product.sizes.includes(size)) && (!color || product.colors.includes(color)) && product.price <= maximumPrice && (!query || `${product.name} ${product.category} ${product.colors.join(" ")}`.toLowerCase().includes(query.toLowerCase())));
    if (sort === "low") found.sort((a, b) => a.price - b.price);
    if (sort === "high") found.sort((a, b) => b.price - a.price);
    if (sort === "newest") found.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "popular") found.sort((a, b) => b.rating - a.rating);
    return found;
  }, [category, size, color, maximumPrice, sort, query]);
  const clearFilters = () => { setCategory(""); setSize(""); setColor(""); setMaximumPrice(1499); setQuery(""); };

  return <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 sm:px-8 sm:pt-11 lg:px-12">
    <div className="mb-8 border-b border-border pb-8 sm:mb-10 sm:pb-10"><Eyebrow>Made to make the everyday</Eyebrow><h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">The good stuff<span className="text-accent">.</span></h1><p className="mt-2 text-sm text-muted-foreground">Thoughtfully made tees, ready for their new favourite person.</p></div>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length}</span> very good {filtered.length === 1 ? "tee" : "tees"}{category ? ` in ${category}` : ""}</p><div className="flex items-center gap-2"><Button className="h-9 rounded-sm px-3 text-xs lg:hidden" variant="outline" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal className="size-3.5" /> Filters{filtersOpen ? " on" : ""}</Button><label className="flex h-9 items-center gap-2 border border-input px-3"><ArrowDownUp className="size-3.5 text-muted-foreground"/><span className="hidden text-xs text-muted-foreground sm:inline">Sort:</span><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="max-w-36 bg-background text-xs outline-none"><option value="popular">Most loved</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="newest">Just dropped</option></select></label></div></div>
    <div className="grid items-start gap-8 lg:grid-cols-[205px_minmax(0,1fr)] lg:gap-10">
      <aside className={`${filtersOpen ? "grid" : "hidden"} grid-cols-2 gap-5 border-b border-border pb-5 lg:sticky lg:top-32 lg:block lg:border-0 lg:pb-0`}><div className="mb-5 hidden items-center justify-between lg:flex"><p className="text-xs font-semibold uppercase tracking-widest">Refine</p><button onClick={clearFilters} className="text-[11px] text-muted-foreground underline underline-offset-4">Reset</button></div>
        <fieldset className="mb-5 min-w-0"><legend className="mb-3 text-xs font-semibold">Collection</legend><div className="grid gap-2.5">{filters.category.map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-[11px] text-muted-foreground"><input type="radio" name="category" checked={category === item} onChange={() => setCategory(category === item ? "" : item)} className="accent-primary" />{item}</label>)}</div></fieldset>
        <fieldset className="mb-5 min-w-0"><legend className="mb-3 text-xs font-semibold">Size</legend><div className="flex flex-wrap gap-1.5">{filters.size.map((item) => <button key={item} onClick={() => setSize(size === item ? "" : item)} className={`flex h-8 min-w-8 items-center justify-center border px-2 text-[10px] ${size === item ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{item}</button>)}</div></fieldset>
        <fieldset className="mb-5 min-w-0"><legend className="mb-3 text-xs font-semibold">Colour</legend><div className="grid gap-2">{filters.color.map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-[11px] text-muted-foreground"><input type="radio" name="color" checked={color === item} onChange={() => setColor(color === item ? "" : item)} className="accent-primary" />{item}</label>)}</div></fieldset>
        <fieldset className="mb-2 col-span-2 min-w-0 lg:col-span-1"><legend className="mb-3 text-xs font-semibold">Up to ₹{maximumPrice.toLocaleString("en-IN")}</legend><input className="w-full accent-primary" type="range" min={499} max={1499} step={100} value={maximumPrice} onChange={(event) => setMaximumPrice(Number(event.target.value))}/><div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span>₹499</span><span>₹1,499</span></div></fieldset>
      </aside>
      <div className="min-w-0"><div className="mb-5 flex flex-wrap items-center gap-3"><label className="flex h-9 flex-1 items-center gap-2 border border-input px-3 sm:max-w-[330px]"><span className="text-muted-foreground">⌕</span><input type="search" aria-label="Search the collection" placeholder="Search the collection" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-background text-xs outline-none placeholder:text-muted-foreground"/></label>{(category || size || color || query) && <button className="text-[11px] text-muted-foreground underline underline-offset-4" onClick={clearFilters}>Clear all</button>}</div><ProductGrid items={filtered}/></div>
    </div>
  </div>;
}

export function ShopStrip() {
  return <div className="mt-14 grid grid-cols-2 border-y border-border sm:mt-20 lg:grid-cols-4">{[["Good cotton", "Soft on you, kinder by design."], ["Easy exchanges", "The right fit, without the fuss."], ["Made in India", "Thoughtful things, close to home."], ["Easy on shipping", "Free delivery above ₹999."]].map(([title, sub]) => <div key={title} className="border-b border-r border-border px-4 py-5 last:border-r-0 odd:border-r sm:px-5 sm:py-6 lg:border-b-0 lg:px-6"><p className="text-xs font-semibold">{title}</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">{sub}</p></div>)}</div>;
}

export function SectionHeading({ eyebrow, title, href, linkText = "Shop all" }) { return <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8"><div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{title}<span className="text-accent">.</span></h2></div>{href && <Button asChild variant="outline" className="h-9 shrink-0 rounded-sm px-3 text-xs"><Link to={href}>{linkText}<ArrowRight/></Link></Button>}</div>; }