import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OfferingsCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const OfferingsCatalog: React.FC<OfferingsCatalogProps> = ({ products, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category || 'Offering')))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="offerings-catalog" className="py-20 bg-white border-b border-temple-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-temple-saffron font-bold">
              Consecrated Rituals & Sevas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-temple-maroon">
              Temple Offerings & Pujas
            </h2>
            <p className="text-gray-600 text-sm max-w-xl">
              Every Seva is scheduled with strict purity, chanted with Vedic Suktas, and sealed with the family Gotra Sankalp.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Seva or Offering..."
              className="w-full px-4 py-2.5 rounded-lg border border-temple-gold/40 text-sm focus:outline-none focus:ring-2 focus:ring-temple-saffron/40 bg-temple-ivory"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-temple-maroon text-white shadow-diya font-bold'
                  : 'bg-temple-ivory-warm text-temple-sanctum hover:bg-temple-ivory-dark font-medium border border-temple-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-xl border border-temple-gold/40 overflow-hidden shadow-sm hover:shadow-diya transition-all duration-300 flex flex-col group"
            >
              {/* Product Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-temple-sanctum">
                <img
                  src={prod.featuredImage || (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=600&auto=format&fit=crop'}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-temple-maroon/90 text-white text-[11px] font-serif uppercase tracking-wider font-semibold border border-temple-gold/40 backdrop-blur-sm">
                    {prod.category}
                  </span>
                </div>
                {prod.isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-temple-gold text-temple-sanctum text-[11px] font-serif uppercase tracking-wider font-bold shadow-md">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-temple-sanctum group-hover:text-temple-maroon transition-colors line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                    {prod.subtitle || prod.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-medium">Dakshina</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-xl font-bold text-temple-maroon">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="px-4 py-2 rounded-md font-serif text-xs font-bold uppercase tracking-wider text-white saffron-gradient hover:shadow-diya transition-all flex items-center gap-1.5"
                  >
                    <span>Book Seva</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Sparkles className="w-8 h-8 text-temple-gold mx-auto" />
            <p className="text-gray-500 font-serif text-sm">No temple offerings matched your criteria.</p>
          </div>
        )}

      </div>
    </section>
  );
};

