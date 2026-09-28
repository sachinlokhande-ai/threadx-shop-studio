import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/threadx-products";

const StoreContext = createContext(null);
const CART_KEY = "threadx-cart-v1";

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, isReady]);

  const addToCart = useCallback((product, size, color, quantity = 1) => {
    if (!size) return false;
    setCart((current) => {
      const match = current.find((item) => item.productId === product.id && item.size === size && item.color === color);
      if (match) return current.map((item) => item.key === match.key ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { key: `${product.id}-${size}-${color}`, productId: product.id, size, color, quantity }];
    });
    return true;
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    setCart((current) => quantity <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item));
  }, []);

  const removeFromCart = useCallback((key) => setCart((current) => current.filter((item) => item.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const lines = useMemo(() => cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product, lineTotal: product.price * item.quantity, savings: (product.originalPrice - product.price) * item.quantity }] : [];
  }), [cart]);
  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, item) => sum + item.lineTotal, 0);
    const savings = lines.reduce((sum, item) => sum + item.savings, 0);
    const gst = Math.round(subtotal * 0.05);
    const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 59;
    return { subtotal, savings, gst, delivery, total: subtotal + delivery };
  }, [lines]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showNotice = useCallback((message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }, []);
  const value = useMemo(() => ({ cart, lines, totals, itemCount, notice, showNotice, lastOrder, setLastOrder, addToCart, setQuantity, removeFromCart, clearCart }), [cart, lines, totals, itemCount, notice, showNotice, lastOrder, addToCart, setQuantity, removeFromCart, clearCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used within StoreProvider");
  return store;
}
