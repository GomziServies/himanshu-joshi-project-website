import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShoppingCart } from 'lucide-react';
import { ProductOffering } from '../../types/api';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import { ArchFrame } from '../layout/Ornaments';
import { ProductCard, imageOf, productPath, useAddedFlash } from './ProductCard';
import { ProductsEmpty, ProductsError, ProductsLoading } from './ProductStates';

const HOME_PRODUCT_LIMIT = 4;

/** Large layout for when the temple offers a single product. */
const FeaturedShivling: React.FC<{ product: ProductOffering }> = ({ product }) => {
  const { add } = useCart();
  const [added, flashAdded] = useAddedFlash();

  return (
    <article className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <ArchFrame src={imageOf(product)} alt={product.title} className="mx-auto aspect-[4/5] w-full max-w-sm" />
      <div>
        {product.subtitle && <p lang="hi" className="font-deva text-xl text-sindoor-600">{product.subtitle}</p>}
        <h3 className="mt-1 font-title text-3xl text-ink sm:text-4xl">{product.title}</h3>
        <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink-muted">{product.description}</p>

        {product.prasadIncludes && product.prasadIncludes.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {product.prasadIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-ink">
                <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-marigold-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ivory-200 pt-6">
          <p className="text-5xl font-bold leading-none text-sindoor-600">₹{product.price.toLocaleString('en-IN')}</p>
          <button
            type="button"
            onClick={() => {
              add(product._id);
              flashAdded();
            }}
            className="btn-offer"
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            {added ? 'Added' : 'Add to cart'}
          </button>
          <Link to={productPath(product)} className="font-semibold text-ink underline decoration-brass-500 underline-offset-4 hover:text-sindoor-600">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

/** Home page offerings: at most four products, with the rest on the Shop page. */
export const ShivlingOffer: React.FC = () => {
  const { products, status, reload } = useProducts();

  return (
    <section id="offerings" className="bg-ivory-50 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 lang="hi" className="font-deva text-4xl leading-snug text-sindoor-600 sm:text-5xl sm:leading-snug">
            पावन अर्पण
          </h2>
          <p className="mt-1 font-title text-xl text-ink-muted">Sacred offerings of Salahkareshwar Mahadev Tirth</p>
        </div>

        {status === 'loading' && <ProductsLoading />}
        {status === 'error' && <ProductsError onRetry={reload} />}
        {status === 'ready' && products.length === 0 && <ProductsEmpty />}
        {status === 'ready' && products.length === 1 && <FeaturedShivling product={products[0]} />}

        {status === 'ready' && products.length > 1 && (
          <>
            <div className="flex flex-wrap items-stretch justify-center gap-8">
              {products.slice(0, HOME_PRODUCT_LIMIT).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/shop" className="btn-offer">
                View all
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ShivlingOffer;
