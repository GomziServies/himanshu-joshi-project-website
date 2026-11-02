import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';
import { ProductOffering } from '../../types/api';
import { useCart } from '../../context/CartContext';
import { ArchFrame } from '../layout/Ornaments';

const FALLBACK_IMAGE = '/salahkareshwar-shivling.jpg';
const ADDED_MESSAGE_MS = 1800;

export function imageOf(product: ProductOffering): string {
  return product.featuredImage || product.images?.[0] || FALLBACK_IMAGE;
}

export function productPath(product: ProductOffering): string {
  return `/product/${product.slug}`;
}

/** Shows "Added" briefly after a product goes into the cart. */
export function useAddedFlash(): [boolean, () => void] {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), ADDED_MESSAGE_MS);
    return () => clearTimeout(timer);
  }, [added]);

  return [added, () => setAdded(true)];
}

export const ProductCard: React.FC<{ product: ProductOffering }> = ({ product }) => {
  const { add } = useCart();
  const [added, flashAdded] = useAddedFlash();

  return (
    <article className="flex w-full max-w-[20rem] flex-col rounded-2xl border border-brass-400/50 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
      <Link to={productPath(product)} aria-label={`View ${product.title}`} tabIndex={-1}>
        <ArchFrame src={imageOf(product)} alt="" className="mx-auto aspect-[4/5] w-full max-w-[12.5rem]" />
      </Link>

      <h3 className="mt-5 break-words font-title text-xl leading-snug text-ink">
        <Link to={productPath(product)} className="hover:text-sindoor-600">{product.title}</Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 break-words text-ink-muted">{product.description}</p>

      <div className="mt-auto pt-4">
        <p className="text-3xl font-bold leading-none text-sindoor-600">₹{product.price.toLocaleString('en-IN')}</p>
        <button
          type="button"
          onClick={() => {
            add(product._id);
            flashAdded();
          }}
          className="btn-offer mt-3 w-full !px-4 !py-2 !text-base"
          aria-label={`Add ${product.title} to cart`}
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
