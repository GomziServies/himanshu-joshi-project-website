import React from 'react';
import { ProductOffering } from '../../types/api';
import { ShieldCheck, Gift, Clock, Sparkles } from 'lucide-react';

interface OfferingCardProps {
  offering: ProductOffering;
  onSelect: (offering: ProductOffering) => void;
  onQuickBook: (offering: ProductOffering) => void;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({ offering, onSelect, onQuickBook }) => {
  const image = offering.featuredImage || offering.images?.[0] || 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gold-500/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Card Header Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
        <img
          src={image}
          alt={offering.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-sm text-gold-400 text-[10px] font-serif font-bold uppercase tracking-wider border border-gold-500/40">
            {offering.category || 'Vedic Seva'}
          </span>
        </div>

        {/* In Stock / Sanctum Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
          <span className="flex items-center gap-1 text-gold-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            100% Vedic Vidhi
          </span>
          {offering.prasadIncludes && offering.prasadIncludes.length > 0 && (
            <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              <Gift className="w-3 h-3 text-saffron-400" />
              Prasad Included
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-maroon-700 transition-colors">
            {offering.title}
          </h3>
          {offering.subtitle && (
            <p className="text-xs text-saffron-600 font-medium">
              {offering.subtitle}
            </p>
          )}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {offering.shortDescription || offering.description}
          </p>
        </div>

        {/* Ritual Duration & Priests Meta */}
        {offering.ritualDetails && (
          <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
            {offering.ritualDetails.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-saffron-500" />
                {offering.ritualDetails.duration}
              </span>
            )}
            {offering.ritualDetails.sanctum && (
              <span className="truncate">• {offering.ritualDetails.sanctum}</span>
            )}
          </div>
        )}

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-400 uppercase block font-semibold">Dakshina</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-serif font-extrabold text-maroon-700">
                ₹{offering.price.toLocaleString('en-IN')}
              </span>
              {offering.originalPrice && (
                <span className="text-xs line-through text-stone-400">
                  ₹{offering.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(offering)}
              type="button"
              className="px-3 py-2 rounded-lg border border-stone-300 hover:border-gold-500 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
            >
              Learn More
            </button>
            <button
              onClick={() => onQuickBook(offering)}
              type="button"
              className="px-4 py-2 rounded-lg bg-saffron-600 hover:bg-saffron-500 text-white font-serif text-xs font-bold shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>Book Seva</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingCard;
