import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { findProduct, type Product } from '../data/products';

export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const add = (productId: string) => {
      const product = findProduct(productId);
      if (!product) return;
      setLines((prev) => {
        const existing = prev.find((l) => l.product.id === productId);
        if (existing) {
          return prev.map((l) =>
            l.product.id === productId ? { ...l, qty: l.qty + 1 } : l,
          );
        }
        return [...prev, { product, qty: 1 }];
      });
    };

    const setQty = (productId: string, qty: number) => {
      setLines((prev) =>
        prev
          .map((l) => (l.product.id === productId ? { ...l, qty } : l))
          .filter((l) => l.qty > 0),
      );
    };

    const remove = (productId: string) =>
      setLines((prev) => prev.filter((l) => l.product.id !== productId));

    const clear = () => setLines([]);

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);

    return { lines, count, subtotal, add, setQty, remove, clear };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
