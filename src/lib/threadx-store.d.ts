import type { ReactNode } from "react";
import type { ThreadxProduct } from "./threadx-products";

export interface CartItem {
  key: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}
export interface CartLine extends CartItem {
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
  cart: CartItem[];
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
export declare function StoreProvider(props: { children: ReactNode }): ReactNode;
export declare function useStore(): StoreValue;
