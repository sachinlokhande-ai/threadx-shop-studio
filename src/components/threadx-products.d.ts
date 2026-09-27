import type { ReactNode } from "react";
import type { ThreadxProduct } from "@/lib/threadx-products";

export declare function ProductCard(props: { product: ThreadxProduct; index?: number }): ReactNode;
export declare function ProductGrid(props: { items: ThreadxProduct[]; columns?: string }): ReactNode;
export declare function ShopContent(props: { initialCategory?: string; initialQuery?: string }): ReactNode;
export declare function ShopStrip(): ReactNode;
export declare function SectionHeading(props: { eyebrow: string; title: string; href?: string; linkText?: string }): ReactNode;
