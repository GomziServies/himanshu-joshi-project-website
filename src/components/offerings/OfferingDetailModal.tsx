import React, { useState } from 'react';
import { ProductOffering } from '../../types/api';
import { X, Gift, Clock, Users, MapPin, Sparkles, Check } from 'lucide-react';

interface OfferingDetailModalProps {
  offering: ProductOffering | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (offering: ProductOffering) => void;
}

export const OfferingDetailModal: React.FC<OfferingDetailModalProps> = ({
  offering,
  isOpen,
  onClose,
  onBookNow
}) => {
  if (!isOpen || !offering) return null;

  const images = offering.images && offering.images.length > 0
    ? offering.images
    : [offering.featuredImage || 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1200&auto=format&fit=crop'];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] text-[#1A1412] rounded-2xl shadow-2xl border-2 border-gold-500/50 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-gold-500/30 aspect-square bg-stone-900 shadow-md">
              <img
                src={activeImage}
                alt={offering.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-maroon-700 text-white text-xs font-serif font-bold tracking-wider">
                  {offering.category}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                      activeImage === img ? 'border-saffron-500' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Ritual Metrics Pill */}
            {offering.ritualDetails && (
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-stone-900">Ritual Particulars</h4>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  {offering.ritualDetails.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-saffron-500" />
                      <span>Duration: {offering.ritualDetails.duration}</span>
                    </div>
                  )}
                  {offering.ritualDetails.priestsCount && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold-600" />
                      <span>Priests: {offering.ritualDetails.priestsCount} Acharyas</span>
                    </div>
                  )}
                  {offering.ritualDetails.sanctum && (
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-maroon-700" />
                      <span>Sanctum: {offering.ritualDetails.sanctum}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Title, Description, Inclusions & CTA */}
          <div className="space-y-5">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-saffron-600 font-bold">
                Consecrated Temple Offering
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-maroon-700 mt-1">
                {offering.title}
              </h2>
              {offering.subtitle && (
                <p className="text-sm text-stone-600 mt-1 font-medium">
                  {offering.subtitle}
                </p>
              )}
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 p-3 rounded-xl bg-cream-100 border border-gold-500/20">
              <span className="text-3xl font-serif font-extrabold text-maroon-700">
                ₹{offering.price.toLocaleString('en-IN')}
              </span>
              {offering.originalPrice && (
                <span className="text-sm line-through text-stone-400">
                  ₹{offering.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-emerald-800 font-semibold ml-auto">
                All Samagri & Dakshina Included
              </span>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2 whitespace-pre-line">
              {offering.description}
            </div>

            {/* Rituals Included */}
            {offering.ritualsIncluded && offering.ritualsIncluded.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Vedic Rituals Performed
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {offering.ritualsIncluded.map((rit, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-stone-700">
                      <Check className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                      <span>{rit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prasad Inclusions */}
            {offering.prasadIncludes && offering.prasadIncludes.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Prasad Box Inclusions
                </h4>
                <div className="space-y-1.5 text-xs">
                  {offering.prasadIncludes.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-stone-700 bg-white p-2 rounded border border-stone-100">
                      <Gift className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow(offering);
                }}
                className="w-full py-3.5 px-6 rounded-xl font-serif text-base font-bold text-white bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-600 shadow-diya transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-gold-300" />
                <span>Begin Devotee Sankalp (₹{offering.price.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingDetailModal;
