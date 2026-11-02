import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'temple_cart';

/** Must not exceed MAX_QUANTITY_PER_ITEM on the server. */
export const MAX_QUANTITY = 20;

// Only IDs and quantities are stored: prices always come fresh from the server
export interface CartLine {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function clampQuantity(quantity: number): number {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity) || 1));
}

function loadLines(): CartLine[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved
      .filter((line) => typeof line?.productId === 'string')
      .map((line) => ({ productId: line.productId, quantity: clampQuantity(Number(line.quantity)) }));
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lines, setLines] = useState<CartLine[]>(loadLines);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // The cart still works for this visit when storage is unavailable
    }
  }, [lines]);

  const add = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.productId === productId);
      if (!existing) return [...prev, { productId, quantity: clampQuantity(quantity) }];
      return prev.map((line) =>
        line.productId === productId ? { ...line, quantity: clampQuantity(line.quantity + quantity) } : line
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((line) => (line.productId === productId ? { ...line, quantity: clampQuantity(quantity) } : line))
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      add,
      setQuantity,
      remove,
      clear
    }),
    [lines, add, setQuantity, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
