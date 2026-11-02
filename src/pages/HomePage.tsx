import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { Hero } from '../components/layout/Hero';
import { ShivlingOffer } from '../components/offerings/ShivlingOffer';
import { HowItWorks, MantraBand, VerseSection } from '../components/offerings/TempleSections';
import { productPath } from '../components/offerings/ProductCard';

export const HomePage: React.FC = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  const hasChoice = products.length > 1;
  const lowestPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : undefined;

  // One product goes straight to its page; several are shown in the offerings section
  const handleOffer = () => {
    if (products.length === 1) {
      navigate(productPath(products[0]));
    } else {
      document.getElementById('offerings')?.scrollIntoView();
    }
  };

  const actionLabel = hasChoice ? 'View offerings' : 'Offer for your Shivling';

  return (
    <>
      <Hero price={lowestPrice} hasChoice={hasChoice} actionLabel={actionLabel} onOffer={handleOffer} />
      <MantraBand />
      <ShivlingOffer />
      <HowItWorks />
      <VerseSection />

      {/* Always-reachable action on phones */}
      {lowestPrice !== undefined && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-brass-500/40 bg-sanctum/95 px-4 py-3 backdrop-blur sm:hidden">
          <span className="leading-none">
            {hasChoice && <span className="block text-xs uppercase tracking-widest text-ivory-200/80">From</span>}
            <span className="brass-text text-3xl font-bold">₹{lowestPrice.toLocaleString('en-IN')}</span>
          </span>
          <button type="button" onClick={handleOffer} className="btn-offer !py-2 !text-base">
            {actionLabel}
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
