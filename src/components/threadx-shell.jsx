import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/threadx-store";

export function SiteHeader() {
  const { itemCount } = useStore();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const active = (path) => location.pathname === path;

  return <>
    <div className="flex h-9 items-center justify-center gap-2 bg-primary text-primary-foreground px-3 text-[10px] font-medium uppercase tracking-[0.16em] sm:text-xs"><span>Made for everyday. Made to last.</span><span className="opacity-45">·</span><span>Free delivery over ₹999</span></div>
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[76px] lg:px-12">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open navigation">{mobileMenu ? <X /> : <Menu />}</Button>
        <Link to="/" aria-label="THREADX home" className="shrink-0 font-display text-[25px] font-bold tracking-[0.015em] sm:text-[29px]">THREAD<span className="text-accent">X</span><span className="ml-1 align-top text-[8px] font-medium text-muted-foreground">®</span></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation"><Link to="/" className={`text-[13px] transition-colors hover:text-accent ${active("/") ? "font-semibold text-foreground" : "text-muted-foreground"}`}>Home</Link><Link to="/shop" className={`text-[13px] transition-colors hover:text-accent ${active("/shop") ? "font-semibold text-foreground" : "text-muted-foreground"}`}>Shop all</Link><Link to="/shop" className="text-[13px] text-muted-foreground transition-colors hover:text-accent">New arrivals</Link><a href="/#about" className="text-[13px] text-muted-foreground transition-colors hover:text-accent">Our story</a></nav>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X /> : <Search />}</Button>
          <Link to="/cart" aria-label={`Shopping bag, ${itemCount} items`} className="relative inline-flex size-9 items-center justify-center rounded-sm hover:bg-accent/15"><ShoppingBag className="size-[19px]" />{itemCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-[17px] items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{itemCount}</span>}</Link>
        </div>
      </div>
      {searchOpen && <form className="animate-reveal border-t border-border bg-background px-5 py-4 sm:px-8 lg:px-12" onSubmit={(event) => { event.preventDefault(); window.location.href = `/shop?q=${encodeURIComponent(query)}`; }}><div className="mx-auto flex max-w-[1440px] items-center gap-3"><Search className="size-4 text-muted-foreground" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your next favourite…" aria-label="Search products" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><Button size="sm" type="submit" className="rounded-sm">Search <ArrowRight /></Button></div></form>}
      {mobileMenu && <nav className="animate-reveal grid grid-cols-2 gap-x-6 gap-y-1 border-t border-border px-6 py-5 lg:hidden"><Link onClick={() => setMobileMenu(false)} to="/" className="py-3 text-sm">Home</Link><Link onClick={() => setMobileMenu(false)} to="/shop" className="py-3 text-sm">Shop all</Link><Link onClick={() => setMobileMenu(false)} to="/shop" className="py-3 text-sm">New arrivals</Link><a onClick={() => setMobileMenu(false)} href="/#about" className="py-3 text-sm">Our story</a></nav>}
    </header>
  </>;
}

export function SiteFooter() {
  return <footer id="about" className="border-t border-border bg-secondary/40">
    <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
      <div><Link to="/" className="font-display text-2xl font-bold">THREAD<span className="text-accent">X</span></Link><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Really good tees for wherever the day takes you. Designed in India. Made for your everyday.</p></div>
      <div><h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Get shopping</h3><div className="grid gap-3 text-sm text-muted-foreground"><Link to="/shop" className="hover:text-foreground">Shop all</Link><Link to="/shop" className="hover:text-foreground">New arrivals</Link><Link to="/shop" className="hover:text-foreground">Best sellers</Link></div></div>
      <div><h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Need a hand?</h3><div className="grid gap-3 text-sm text-muted-foreground"><a href="mailto:hello@threadx.in" className="hover:text-foreground">Contact us</a><a href="mailto:hello@threadx.in" className="hover:text-foreground">Shipping & returns</a><a href="mailto:hello@threadx.in" className="hover:text-foreground">Find your fit</a></div></div>
      <div><h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">A good inbox day</h3><p className="text-sm leading-6 text-muted-foreground">New drops, first dibs and a little something off your first order.</p><a href="mailto:hello@threadx.in?subject=Add%20me%20to%20the%20THREADX%20list" className="mt-3 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">Count me in <ArrowRight className="size-3.5" /></a></div>
    </div><div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2025 THREADX. Good tees, good days.</span><span>Made with care in India · Prices include applicable taxes</span></div></div>
  </footer>;
}

export function PageFrame({ children }) {
  const { notice } = useStore();
  return <div className="min-h-screen"><SiteHeader />{children}<SiteFooter />{notice && <div role="status" className="animate-reveal fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-foreground/10 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg">{notice}</div>}</div>;
}

export function Eyebrow({ children, className = "" }) { return <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px] ${className}`}>{children}</p>; }