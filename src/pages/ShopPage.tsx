import React from 'react';
import { useProducts } from '../context/ProductsContext';
import { PageBanner } from '../components/layout/PageBanner';
import { ProductCard } from '../components/offerings/ProductCard';
import { ProductsEmpty, ProductsError, ProductsLoading } from '../components/offerings/ProductStates';

export const ShopPage: React.FC = () => {
  const { products, status, reload } = useProducts();

  return (
    <>
      <PageBanner hindi="पावन अर्पण" title="All offerings" />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {status === 'loading' && <ProductsLoading />}
        {status === 'error' && <ProductsError onRetry={reload} />}
        {status === 'ready' && products.length === 0 && <ProductsEmpty />}
        {status === 'ready' && products.length > 0 && (
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ShopPage;
