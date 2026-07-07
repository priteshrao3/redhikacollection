"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";
import { loadCart, saveCart } from "@/lib/cart-storage";

function lineKey(item: Pick<CartItem, "productId" | "color" | "size">) {
  return `${item.productId}__${item.color ?? ""}__${item.size ?? ""}`;
}

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; item: CartItem }
  | { type: "UPDATE_QTY"; key: string; qty: number }
  | { type: "REMOVE"; key: string }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;
    case "ADD": {
      const key = lineKey(action.item);
      const existing = state.find((it) => lineKey(it) === key);
      if (existing) {
        return state.map((it) =>
          lineKey(it) === key ? { ...it, qty: it.qty + action.item.qty } : it
        );
      }
      return [...state, action.item];
    }
    case "UPDATE_QTY":
      return state
        .map((it) => (lineKey(it) === action.key ? { ...it, qty: action.qty } : it))
        .filter((it) => it.qty > 0);
    case "REMOVE":
      return state.filter((it) => lineKey(it) !== action.key);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (item: Pick<CartItem, "productId" | "color" | "size">, qty: number) => void;
  removeItem: (item: Pick<CartItem, "productId" | "color" | "size">) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Hydrate from localStorage after mount to avoid SSR/client markup mismatch.
  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadCart() });
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const itemCount = items.reduce((sum, it) => sum + it.qty, 0);
    return {
      items,
      addItem: (item) => dispatch({ type: "ADD", item }),
      updateQty: (item, qty) => dispatch({ type: "UPDATE_QTY", key: lineKey(item), qty }),
      removeItem: (item) => dispatch({ type: "REMOVE", key: lineKey(item) }),
      clear: () => dispatch({ type: "CLEAR" }),
      subtotal,
      itemCount,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
