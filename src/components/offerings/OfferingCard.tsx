import React from 'react';
import { ProductOffering } from '../../types/api';
import { Users } from 'lucide-react';

interface OfferingCardProps {
  offering: ProductOffering;
  onSelect?: (offering: ProductOffering) => void;
  onQuickBook: (offering: ProductOffering) => void;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({ offering, onSelect, onQuickBook }) => {
  const handleCardClick = () => {
    if (onSelect) onSelect(offering);
  };
  // Extract or synthesize specifications for the 3 sacred bullets
  const stoneSpec = offering.specifications?.find((s) => s.key.toLowerCase().includes('stone') || s.key.toLowerCase().includes('lingam'))?.value ||
    '3.5" – 4.0" SACRED SWAYAMBHU SHIVLING STONE';

  const baseSpec = offering.specifications?.find((s) => s.key.toLowerCase().includes('base') || s.key.toLowerCase().includes('peeth'))?.value ||
    (offering.prasadIncludes && offering.prasadIncludes[0]) ||
    'SOLID HEAVY BRASS BASE (1.2 KG) WITH TRISHUL ENGRAVING';

  const priestCount = offering.ritualDetails?.priestsCount || 2;
  const priestSpec = `${priestCount} CERTIFIED RIGVEDIC PRIESTS`;

  const badgeText = offering.isFeatured
    ? 'MOST POPULAR DEVOTEE CHOICE'
    : (offering.category ? `${offering.category.toUpperCase()} SEVA` : 'MOST POPULAR DEVOTEE CHOICE');

  return (
    <div 
      onClick={handleCardClick}
      className="relative bg-[#FAF4EB] rounded-3xl p-7 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between max-w-sm sm:max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] group cursor-pointer"
    >
      {/* 4 L-Shaped Golden Corner Brackets */}
      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

      {/* Arched Top Maroon Badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] text-[#FFE885] border border-[#D4AF37] shadow-md text-[10px] sm:text-[11px] font-serif font-black tracking-widest uppercase text-center whitespace-nowrap">
        {badgeText}
      </div>

      {/* Title Header */}
      <div className="text-center mt-3 space-y-1">
        <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F1510] tracking-wide uppercase leading-tight group-hover:text-[#6D071A] transition-colors">
          {offering.title}
        </h3>
        {offering.subtitle && (
          <p className="text-xs font-serif font-bold text-[#C2410C]">
            {offering.subtitle}
          </p>
        )}
      </div>

      {/* Sacred Dakshina Price Block */}
      <div className="text-center my-3 space-y-1.5">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-serif font-black text-[#6D071A]">
            ₹{offering.price.toLocaleString('en-IN')}
          </span>
          {offering.originalPrice && (
            <span className="text-sm line-through text-stone-400 font-serif">
              ₹{offering.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Full Prasad Delivery Guarantee Pill */}
        <div className="inline-block px-3.5 py-1 rounded-full bg-[#F3E8D8] border border-[#E0D2C0] text-[#C2410C] text-[10px] sm:text-[11px] font-serif font-bold">
          पूर्ण प्रसाद एवं स्पीड पोस्ट सम्मिलित
        </div>
      </div>

      {/* Description in Upper Case Serif */}
      <p className="text-[11px] sm:text-xs text-stone-600 font-serif leading-relaxed text-center uppercase tracking-wide px-1 line-clamp-3 mb-4">
        {offering.shortDescription || offering.description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-[#D4AF37]/40 mb-4" />

      {/* 3 Sacred Inclusion Bullets */}
      <div className="space-y-2.5 text-[11px] sm:text-xs font-serif text-stone-800 uppercase tracking-wide mb-5">
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full border border-[#FF7722] text-[#FF7722] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
            ✓
          </div>
          <span className="font-semibold leading-snug">
            {stoneSpec}
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
            ✓
          </div>
          <span className="font-semibold leading-snug">
            {baseSpec}
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          <Users className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <span className="font-semibold leading-snug">
            {priestSpec}
          </span>
        </div>
      </div>

      {/* Full-Width Action Button */}
      <button
        type="button"
        onClick={() => onQuickBook(offering)}
        className="w-full py-3 sm:py-3.5 rounded-xl font-serif font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#C2410C] via-[#FF7722] to-[#C2410C] hover:from-[#EA580C] hover:to-[#EA580C] shadow-md hover:shadow-diya transition-all duration-300 border border-[#FFE885] cursor-pointer flex items-center justify-center gap-2"
      >
        <span>✓ SELECTED SACRED TIER</span>
      </button>
    </div>
  );
};

export default OfferingCard;
