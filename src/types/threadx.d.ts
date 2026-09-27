import type { ReactNode } from "react";

declare module "@/lib/threadx-products" {
  export interface ThreadxProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    colors: string[];
    sizes: string[];
    rating: number;
    reviews: number;
    isNew: boolean;
    description: string;
  }
  export interface ThreadxCategory {
    name: string;
    number: string;
    tint: string;
    image: string;
  }
  export const products: ThreadxProduct[];
  export const categories: ThreadxCategory[];
  export const formatINR: (amount: number) => string;
}

declare module "@/lib/threadx-store" {
  import type { ThreadxProduct } from "@/lib/threadx-products";
  export interface CartLine {
    key: string;
    productId: string;
    size: string;
    color: string;
    quantity: number;
    product: ThreadxProduct;
    lineTotal: number;
    savings: number;
  }
  export interface CartTotals {
    subtotal: number;
    savings: number;
    gst: number;
    delivery: number;
    total: number;
  }
  export interface StoreValue {
    cart: Omit<CartLine, "product" | "lineTotal" | "savings">[];
    lines: CartLine[];
    totals: CartTotals;
    itemCount: number;
    notice: string;
    showNotice: (message: string) => void;
    lastOrder: unknown;
    setLastOrder: (order: unknown) => void;
    addToCart: (product: ThreadxProduct, size: string, color: string, quantity?: number) => boolean;
    setQuantity: (key: string, quantity: number) => void;
    removeFromCart: (key: string) => void;
    clearCart: () => void;
  }
  export function StoreProvider(props: { children: ReactNode }): ReactNode;
  export function useStore(): StoreValue;
}

declare module "@/components/threadx-shell" {
  export function SiteHeader(): ReactNode;
  export function SiteFooter(): ReactNode;
  export function PageFrame(props: { children: ReactNode }): ReactNode;
  export function Eyebrow(props: { children: ReactNode; className?: string }): ReactNode;
}

declare module "@/components/threadx-products" {
  import type { ThreadxProduct } from "@/lib/threadx-products";
  export function ProductCard(props: { product: ThreadxProduct; index?: number }): ReactNode;
  export function ProductGrid(props: { items: ThreadxProduct[]; columns?: string }): ReactNode;
  export function ShopContent(props: { initialCategory?: string; initialQuery?: string }): ReactNode;
  export function ShopStrip(): ReactNode;
  export function SectionHeading(props: { eyebrow: string; title: string; href?: string; linkText?: string }): ReactNode;
}
