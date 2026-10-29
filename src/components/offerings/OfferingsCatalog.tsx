import React, { useState, useMemo } from 'react';
import { ProductOffering } from '../../types/api';
import { OfferingCard } from './OfferingCard';
import { OfferingDetailModal } from './OfferingDetailModal';
import { Search, Sparkles } from 'lucide-react';

interface OfferingsCatalogProps {
  products: ProductOffering[];
  onSelectProduct: (product: ProductOffering) => void;
}

const CATEGORIES = ['All', 'Offering', 'Puja', 'Ritual', 'Prasad'];

export const OfferingsCatalog: React.FC<OfferingsCatalogProps> = ({
  products,
  onSelectProduct
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedOffering, setInspectedOffering] = useState<ProductOffering | null>(null);

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
    <section id="offerings" className="py-20 bg-cream-50 text-stone-900 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-600 text-xs font-serif font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>॥ मन्दिर सेवा एवं अनुष्ठान सूची ॥</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-700">
            Sacred Offerings, Pujas & Consecrations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Select consecrated rituals performed by accredited temple priests with personalized Gotra Sankalp and holy Prasad dispatched to your doorstep.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-maroon-700 text-white shadow-sm border border-gold-500/50'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-gold-400'
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
              placeholder="Search rituals by deity or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white border border-stone-200 focus:outline-none focus:border-saffron-500 shadow-sm"
            />
          </div>
        </div>

        {/* Offerings Grid */}
        {filteredOfferings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No sacred offerings match your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOfferings.map((offering) => (
              <OfferingCard
                key={offering._id}
                offering={offering}
                onSelect={(item) => setInspectedOffering(item)}
                onQuickBook={(item) => onSelectProduct(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <OfferingDetailModal
        offering={inspectedOffering}
        isOpen={Boolean(inspectedOffering)}
        onClose={() => setInspectedOffering(null)}
        onBookNow={(item) => {
          setInspectedOffering(null);
          onSelectProduct(item);
        }}
      />
    </section>
  );
};

export default OfferingsCatalog;
