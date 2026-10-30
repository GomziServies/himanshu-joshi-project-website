import React, { useState, useMemo } from 'react';
import { ProductOffering } from '../../types/api';
import { OfferingCard } from './OfferingCard';
import { OfferingDetailModal } from './OfferingDetailModal';
import { Search, Sparkles, Flame, Bell } from 'lucide-react';

interface OfferingsCatalogProps {
  products: ProductOffering[];
  onSelectProduct: (product: ProductOffering) => void;
}

export const OfferingsCatalog: React.FC<OfferingsCatalogProps> = ({
  products,
  onSelectProduct
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedOffering, setInspectedOffering] = useState<ProductOffering | null>(null);

  // Dynamic category pills based only on actual products present in the database
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    products.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [products]);

  const filteredOfferings = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category?.toLowerCase() === activeCategory.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="offerings" className="py-20 sm:py-24 bg-[#FAF5EB] text-stone-900 border-b-2 border-[#D4AF37]/30 relative overflow-hidden">
      {/* Sacred Watermark Geometry */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#FF7722]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] text-[#FFE885] text-xs font-serif font-extrabold uppercase tracking-widest shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
            <span>॥ मन्दिर सेवा एवं अनुष्ठान सूची ॥</span>
            <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#6D071A] tracking-wide">
            Temple Offerings & Consecrated Sevas
          </h2>

          <p className="text-stone-700 text-sm sm:text-base font-serif leading-relaxed">
            Every ritual is conducted by initiated Vedic scholars chanting ancient Shlokas, sealed with your sacred family Gotra Sankalp.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-serif font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#6D071A] text-[#FFE885] shadow-md border-2 border-[#D4AF37]'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-[#D4AF37]'
                }`}
              >
                {cat === 'All' ? 'All Offerings (सर्व सेवा)' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seva or offering..."
              className="w-full pl-9 pr-4 py-2.5 text-xs font-serif rounded-full bg-white border border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7722]"
            />
          </div>
        </div>

        {/* Offerings Grid Rendered in THE EXACT TEMPLE BOX DESIGN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOfferings.map((offering) => (
            <OfferingCard
              key={offering._id}
              offering={offering}
              onSelect={(item: ProductOffering) => setInspectedOffering(item)}
              onQuickBook={(item: ProductOffering) => onSelectProduct(item)}
            />
          ))}
        </div>

        {filteredOfferings.length === 0 && (
          <div className="text-center py-16 space-y-3 font-serif">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
            <p className="text-stone-600 text-sm">No temple offerings matched your search criteria.</p>
          </div>
        )}

        {/* Admin Live Sync Notice */}
        <div className="mt-12 text-center pt-6 border-t border-[#D4AF37]/30 flex items-center justify-center gap-2 text-xs font-serif text-stone-600">
          <Bell className="w-4 h-4 text-[#D4AF37]" />
          <span>Admin Panel live sync active • Any offerings created by the Temple Admin in the Admin Panel appear here automatically.</span>
        </div>

      </div>

      {inspectedOffering && (
        <OfferingDetailModal
          offering={inspectedOffering}
          isOpen={true}
          onClose={() => setInspectedOffering(null)}
          onBookNow={(item) => {
            setInspectedOffering(null);
            onSelectProduct(item);
          }}
        />
      )}
    </section>
  );
};

export default OfferingsCatalog;
