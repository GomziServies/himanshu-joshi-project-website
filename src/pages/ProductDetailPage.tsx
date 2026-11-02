import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronRight, ShoppingCart } from 'lucide-react';
import { ProductOffering } from '../types/api';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useProducts } from '../context/ProductsContext';
import { ArchFrame } from '../components/layout/Ornaments';
import { ProductCard, imageOf, useAddedFlash } from '../components/offerings/ProductCard';
import { ProductsError } from '../components/offerings/ProductStates';
import { QuantityStepper } from '../components/offerings/QuantityStepper';

const RELATED_LIMIT = 4;

const ProductDetail: React.FC<{ product: ProductOffering }> = ({ product }) => {
  const { add } = useCart();
  const { startCheckout } = useCheckout();
  const [quantity, setQuantity] = useState(1);
  const [added, flashAdded] = useAddedFlash();

  const total = product.price * quantity;

  return (
    <article className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <ArchFrame src={imageOf(product)} alt={product.title} className="mx-auto aspect-[4/5] w-full max-w-sm" />

      <div>
        {product.subtitle && <p lang="hi" className="break-words font-deva text-xl text-sindoor-600">{product.subtitle}</p>}
        <h1 className="mt-1 break-words font-title text-3xl text-ink sm:text-4xl">{product.title}</h1>
        <p className="mt-3 text-4xl font-bold leading-none text-sindoor-600" data-testid="unit-price">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <p className="mt-5 whitespace-pre-line break-words text-lg leading-relaxed text-ink-muted">{product.description}</p>

        {product.prasadIncludes && product.prasadIncludes.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {product.prasadIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 break-words text-lg text-ink">
                <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-marigold-500" aria-hidden="true" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 border-t border-ivory-200 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-ink">Quantity</span>
              <QuantityStepper value={quantity} onChange={setQuantity} />
            </div>
            <p className="text-lg text-ink-muted">
              Total <span className="text-2xl font-bold text-ink" data-testid="line-total">₹{total.toLocaleString('en-IN')}</span>
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                add(product._id, quantity);
                flashAdded();
              }}
              className="btn-offer flex-1"
            >
              {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              onClick={() => startCheckout([{ product, quantity }])}
              className="flex-1 rounded-full border-2 border-sanctum px-7 py-3 text-lg font-semibold text-sanctum transition-colors hover:bg-sanctum hover:text-brass-300"
            >
              Offer now
            </button>
          </div>

          {added && (
            <p className="mt-3 text-center" role="status">
              <Link to="/cart" className="font-semibold text-sindoor-600 underline underline-offset-4">View your cart</Link>
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { products, status, reload } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const others = products.filter((p) => p.slug !== slug).slice(0, RELATED_LIMIT);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-ink-muted">
        <Link to="/" className="hover:text-sindoor-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/shop" className="hover:text-sindoor-600">Shop</Link>
        {product && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="min-w-0 truncate text-ink">{product.title}</span>
          </>
        )}
      </nav>

      {status === 'loading' && (
        <div className="grid animate-pulse gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" role="status" aria-label="Loading">
          <div className="mx-auto aspect-[4/5] w-full max-w-sm rounded-t-full bg-ivory-200" />
          <div className="space-y-4">
            <div className="h-10 w-3/4 rounded bg-ivory-200" />
            <div className="h-10 w-32 rounded bg-ivory-200" />
            <div className="h-5 w-full rounded bg-ivory-200" />
            <div className="h-5 w-5/6 rounded bg-ivory-200" />
          </div>
        </div>
      )}

      {status === 'error' && <ProductsError onRetry={reload} />}

      {status === 'ready' && !product && (
        <div className="py-12 text-center">
          <h1 className="font-title text-3xl text-ink">This offering is not available</h1>
          <p className="mt-2 text-lg text-ink-muted">It may have been removed or is no longer on offer.</p>
          <Link to="/shop" className="btn-offer mt-6">See all offerings</Link>
        </div>
      )}

      {status === 'ready' && product && (
        <>
          {/* Keyed so the chosen quantity resets when moving to another product */}
          <ProductDetail key={product._id} product={product} />

          {others.length > 0 && (
            <div className="mt-16 border-t border-ivory-200 pt-12">
              <h2 className="mb-8 text-center font-title text-3xl text-ink">More offerings</h2>
              <div className="flex flex-wrap items-stretch justify-center gap-8">
                {others.map((other) => (
                  <ProductCard key={other._id} product={other} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductDetailPage;
