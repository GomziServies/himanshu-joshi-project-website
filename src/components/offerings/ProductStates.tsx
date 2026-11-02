import React from 'react';
import { RefreshCw } from 'lucide-react';

export const ProductsLoading: React.FC = () => (
  <div className="flex animate-pulse flex-wrap justify-center gap-8" role="status" aria-label="Loading">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="w-full max-w-[20rem] rounded-2xl border border-ivory-200 bg-white p-5 sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
        <div className="mx-auto aspect-[4/5] w-full max-w-[12.5rem] rounded-t-full bg-ivory-200" />
        <div className="mt-5 h-6 w-3/4 rounded bg-ivory-200" />
        <div className="mt-3 h-4 w-full rounded bg-ivory-200" />
        <div className="mt-5 h-10 w-full rounded-full bg-ivory-200" />
      </div>
    ))}
  </div>
);

export const ProductsError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="mx-auto max-w-md rounded-2xl border border-brass-400/60 bg-white p-8 text-center" role="alert">
    <p className="font-title text-xl text-ink">We could not reach the temple office</p>
    <p className="mt-2 text-ink-muted">Please check your connection and try again.</p>
    <button type="button" onClick={onRetry} className="btn-offer mt-5 !text-base">
      <RefreshCw className="h-4 w-4" />
      Try again
    </button>
  </div>
);

export const ProductsEmpty: React.FC = () => (
  <p className="text-center text-lg text-ink-muted">
    Offerings are not open right now. Please call +91 98256 00778.
  </p>
);
