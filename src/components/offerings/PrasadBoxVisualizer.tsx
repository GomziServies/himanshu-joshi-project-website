import React from 'react';
import { X, ShieldCheck, Box, Check } from 'lucide-react';

interface PrasadBoxVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrasadBoxVisualizer: React.FC<PrasadBoxVisualizerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FDFBF7] text-[#1A1412] rounded-2xl shadow-2xl border-2 border-gold-500/50 p-6 sm:p-8 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center border-b border-gold-500/30 pb-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-600 text-xs font-serif font-bold uppercase tracking-wider mb-2">
            <Box className="w-3.5 h-3.5 text-saffron-500" />
            <span>पवित्र महाप्रसाद सम्पुट</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-maroon-700">
            Sacred Consecrated Prasad Box Architecture
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Carefully packaged in sanctified temple chambers and dispatched directly to your residence via Speed Post.
          </p>
        </div>

        {/* Box Specifications Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Dimensions</span>
            <span className="font-serif font-bold text-stone-900 text-sm">24 × 18 × 10 cm</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Board Weight</span>
            <span className="font-serif font-bold text-stone-900 text-sm">1200 GSM Rigid</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Outer Finish</span>
            <span className="font-serif font-bold text-stone-900 text-sm">Saffron Silk Wrap</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Seal Integrity</span>
            <span className="font-serif font-bold text-stone-900 text-sm">Temple Lac Wax Seal</span>
          </div>
        </div>

        {/* Itemized Contents */}
        <div className="space-y-3 mb-6">
          <h4 className="font-serif font-bold text-maroon-700 text-sm">
            Itemized Inclusions Inside the Box:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              {
                title: 'Consecrated Narmadeshwar Shivling',
                desc: 'Hand-selected natural pebble with solid heavy base, secured in molded velvet cavity.'
              },
              {
                title: 'Kashi Vishwanath Holy Gangajal (100ml)',
                desc: 'Sealed glass vial containing holy water gathered directly from Dashashwamedh Ghat.'
              },
              {
                title: 'Sanctum Dhuni Bhasma (50g)',
                desc: 'Pure sacred ash gathered from the temple morning Maha Bhasma Aarti.'
              },
              {
                title: '5-Mukhi Indonesian / Nepal Rudraksha',
                desc: 'Pre-energized during the 108 Bilva Patra Archana chanting.'
              },
              {
                title: 'Pure Shiva Yantra Energized Coin',
                desc: 'Engraved with sacred Sri Shiva Yantra on obverse and Om Namah Shivaya on reverse.'
              },
              {
                title: 'Silver-Plated Consecrated Bilva Leaf',
                desc: 'Offered directly to the Lingam during your personalized family Gotra Sankalp.'
              },
              {
                title: 'Blessed Raksha Sutra Thread',
                desc: 'Consecrated red & yellow cotton thread for family well-being.'
              },
              {
                title: 'Consecration Certificate & Daily Manual',
                desc: 'Parchment certificate with priest signature & 16-page daily Abhishek guide.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-cream-100 border border-gold-500/20 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">{item.title}</strong>
                  <span className="text-stone-600">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Notice & Close Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero transit breakage guarantee: Replaced free if damaged.</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-maroon-700 hover:bg-maroon-800 text-white font-serif font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Close Inspection (पूर्ण)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrasadBoxVisualizer;
