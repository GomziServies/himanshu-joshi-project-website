import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ProductOffering } from '../types/api';
import { fetchOfferings } from '../services/offeringService';

export type LoadStatus = 'loading' | 'ready' | 'error';

interface ProductsContextValue {
  products: ProductOffering[];
  status: LoadStatus;
  reload: () => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductOffering[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');

  const reload = useCallback(async () => {
    setStatus('loading');
    try {
      setProducts(await fetchOfferings());
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load products:', err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <ProductsContext.Provider value={{ products, status, reload }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts(): ProductsContextValue {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
}
