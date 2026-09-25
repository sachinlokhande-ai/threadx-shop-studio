import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/threadx-editorial.jpg";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageFrame } from "@/components/threadx-shell";
import { ProductGrid, SectionHeading, ShopStrip } from "@/components/threadx-products";
import { categories, products } from "@/lib/threadx-products";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "THREADX — Everyday Tees. Better." },
    { name: "description", content: "Really good cotton tees for everyday. Discover considered fits, independent graphics, and small-batch essentials from THREADX India." },
    { property: "og:title", content: "THREADX — Everyday Tees. Better." },
    { property: "og:description", content: "Thoughtfully made tees, ready for their new favourite person. Designed in India." },
  ] }),
  component: HomePage,
});

function HomePage() {
  return <PageFrame>
    <main>
      <section className="relative isolate min-h-[510px] overflow-hidden bg-secondary sm:min-h-[590px] lg:min-h-[610px]">
        <img src={heroImage} alt="THREADX oversized essential tee in a sunlit architectural setting" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-[64%_42%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/75 via-foreground/37 to-foreground/5" />
        <div className="mx-auto flex min-h-[510px] max-w-[1440px] items-center px-6 py-14 sm:min-h-[590px] sm:px-10 lg:min-h-[610px] lg:px-16"><div className="max-w-xl text-background animate-reveal">
          <div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-background/80"/><Eyebrow className="text-background">A little more you, every day</Eyebrow></div>
          <h1 className="font-display text-[46px] font-bold leading-[0.98] sm:text-6xl lg:text-[76px]">EVERYDAY<br/>TEES. BETTER<span className="text-accent">.</span></h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-background/85 sm:text-base sm:leading-7">The ones you reach for on the good days. And all the ordinary ones, too.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><Button asChild className="h-12 rounded-sm bg-background px-6 text-foreground hover:bg-background/85"><Link to="/shop">Shop the collection <ArrowRight/></Link></Button><span className="text-[10px] uppercase tracking-[0.16em] text-background/75">Small batch · Made in India</span></div>
        </div><div className="absolute bottom-5 right-6 hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-background/80 md:flex"><ArrowDownRight className="size-4"/> A better basic starts here</div></div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 pt-11 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12"><SectionHeading eyebrow="The fit finder" title="One good tee. Many moods" href="/shop"/>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{categories.map((category) => <Link key={category.name} to="/shop" search={{ category: category.name }} className="group relative block overflow-hidden"><div className={`relative aspect-[4/4.7] overflow-hidden ${category.tint}`}><img src={category.image} alt={`${category.name} T-shirts`} loading="lazy" width={1024} height={1024} className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/><div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"/><span className="absolute left-3 top-3 text-[9px] font-medium text-background/90 sm:left-4 sm:top-4">{category.number} / 04</span><span className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-display text-base font-semibold text-background sm:bottom-4 sm:left-4 sm:right-4 sm:text-lg">{category.name}<span className="flex size-7 items-center justify-center rounded-full border border-background/60 transition-colors group-hover:bg-background group-hover:text-foreground"><ArrowUpRight className="size-3.5"/></span></span></div></Link>)}</div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-7 sm:px-8 sm:pb-16 lg:px-12"><SectionHeading eyebrow="Everybody's favourite" title="The good ones, on repeat" href="/shop"/><ProductGrid items={products.filter((item) => ["core-white", "core-black", "sun-daze", "day-one"].includes(item.id))}/></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12"><div className="grid overflow-hidden bg-card lg:grid-cols-[1.04fr_.96fr]"><div className="relative min-h-[290px] overflow-hidden bg-secondary sm:min-h-[370px] lg:min-h-[420px]"><img src={products.find((p) => p.id === "sun-daze")?.image} alt="Fresh colour and easy everyday fits" loading="lazy" width={1024} height={1024} className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-[1.025]"/></div><div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14"><Eyebrow>In a good place</Eyebrow><h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-[1.08] sm:text-[42px]">Fresh tees.<br/>New energy<span className="text-accent">.</span></h2><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A fresh batch of colours and graphics to make getting dressed feel a little less like a thing.</p><Button asChild variant="outline" className="mt-6 h-10 w-fit rounded-sm px-4"><Link to="/shop">Meet the new arrivals <ArrowRight/></Link></Button><p className="mt-7 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Dropped recently · Not here forever</p></div></div></section>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><ShopStrip/></div>
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="flex flex-col items-center border border-border px-5 py-10 text-center sm:py-12"><Eyebrow>A little extra for your everyday</Eyebrow><p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Your delivery? That's on us<span className="text-accent">.</span></p><p className="mt-2 text-sm text-muted-foreground">On every order over ₹999. Your cart will thank you.</p><Button asChild variant="link" className="mt-2"><Link to="/shop">Find your next favourite <ArrowRight/></Link></Button></div></section>
    </main>
  </PageFrame>;
}