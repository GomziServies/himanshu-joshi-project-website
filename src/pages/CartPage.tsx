import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Trash2 } from 'lucide-react';
import { CheckoutLine } from '../types/api';
import { useCart } from '../context/CartContext';
import { totalOf, useCheckout } from '../context/CheckoutContext';
import { useProducts } from '../context/ProductsContext';
import { Diya } from '../components/layout/Ornaments';
import { PageBanner } from '../components/layout/PageBanner';
import { imageOf, productPath } from '../components/offerings/ProductCard';
import { ProductsError, ProductsLoading } from '../components/offerings/ProductStates';
import { QuantityStepper } from '../components/offerings/QuantityStepper';

export const CartPage: React.FC = () => {
  const { lines, count, setQuantity, remove } = useCart();
  const { products, status, reload } = useProducts();
  const { startCheckout } = useCheckout();
  const [removedCount, setRemovedCount] = useState(0);

  const checkoutLines = useMemo<CheckoutLine[]>(
    () =>
      lines.flatMap((line) => {
        const product = products.find((p) => p._id === line.productId);
        return product ? [{ product, quantity: line.quantity }] : [];
      }),
    [lines, products]
  );

  // Only after a successful load: a network failure must never empty someone's cart
  useEffect(() => {
    if (status !== 'ready') return;
    const unavailable = lines.filter((line) => !products.some((p) => p._id === line.productId));
    if (unavailable.length > 0) {
      unavailable.forEach((line) => remove(line.productId));
      setRemovedCount((n) => n + unavailable.length);
    }
  }, [status, lines, products, remove]);

  const total = totalOf(checkoutLines);

  return (
    <>
      <PageBanner hindi="आपका अर्पण" title="Your cart" />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {removedCount > 0 && (
          <p role="status" className="mb-6 rounded-lg border border-brass-400/60 bg-ivory-100 px-4 py-3 font-medium text-ink">
            {removedCount === 1 ? 'An offering in your cart is' : `${removedCount} offerings in your cart are`} no longer available and {removedCount === 1 ? 'was' : 'were'} removed.
          </p>
        )}

        {lines.length === 0 && (
          <div className="py-10 text-center">
            <Diya className="mx-auto h-20 w-20" />
            <h2 className="mt-3 font-title text-3xl text-ink">Your cart is empty</h2>
            <p className="mt-2 text-lg text-ink-muted">Choose an offering to begin.</p>
            <Link to="/shop" className="btn-offer mt-6">See all offerings</Link>
          </div>
        )}

        {lines.length > 0 && status === 'loading' && <ProductsLoading />}
        {lines.length > 0 && status === 'error' && <ProductsError onRetry={reload} />}

        {status === 'ready' && checkoutLines.length > 0 && (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <ul className="divide-y divide-ivory-200 overflow-hidden rounded-2xl border border-brass-400/50 bg-white shadow-sm">
              {checkoutLines.map(({ product, quantity }) => (
                <li key={product._id} className="flex gap-4 p-4 sm:p-5">
                  <Link to={productPath(product)} tabIndex={-1} aria-hidden="true" className="shrink-0">
                    <img src={imageOf(product)} alt="" className="h-28 w-[5.5rem] rounded-t-full border border-brass-500 object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="min-w-0 break-words font-title text-lg leading-snug text-ink sm:text-xl">
                        <Link to={productPath(product)} className="hover:text-sindoor-600">{product.title}</Link>
                      </h2>
                      <button
                        type="button"
                        onClick={() => remove(product._id)}
                        className="shrink-0 rounded-lg p-1.5 text-sindoor-600 transition-colors hover:bg-sindoor-500/10"
                        aria-label={`Remove ${product.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-ink-muted">₹{product.price.toLocaleString('en-IN')} each</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <QuantityStepper
                        value={quantity}
                        onChange={(next) => setQuantity(product._id, next)}
                        label={`Quantity of ${product.title}`}
                      />
                      <p className="text-xl font-bold text-sindoor-600">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-2xl border border-brass-400/50 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-title text-2xl text-ink">Summary</h2>
              <div className="mt-4 flex items-baseline justify-between text-ink-muted">
                <span>Items</span>
                <span>{count}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-ivory-200 pt-3">
                <span className="text-lg font-semibold text-ink">Total</span>
                <span className="text-3xl font-bold text-sindoor-600" data-testid="cart-total">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button
                type="button"
                onClick={() => startCheckout(checkoutLines, { fromCart: true })}
                className="btn-offer mt-5 w-full"
              >
                <Lock className="h-4 w-4" />
                Proceed to pay
              </button>
              <Link to="/shop" className="mt-3 block text-center font-semibold text-ink underline decoration-brass-500 underline-offset-4 hover:text-sindoor-600">
                Add more offerings
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
};

export default CartPage;
