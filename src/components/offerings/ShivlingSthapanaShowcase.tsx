import React, { useState } from 'react';
import { ProductOffering, OfferingTier } from '../../types/api';
import { SHIVLING_STHAPANA_TIERS } from '../../data/seedOfferings';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  Gift,
  Clock,
  Users,
  CheckCircle2
} from 'lucide-react';

interface ShivlingSthapanaShowcaseProps {
  product?: ProductOffering;
  onBookNow: (product: ProductOffering, selectedTier?: OfferingTier) => void;
  onViewPrasadBox?: () => void;
}

export const ShivlingSthapanaShowcase: React.FC<ShivlingSthapanaShowcaseProps> = ({
  product,
  onBookNow,
  onViewPrasadBox
}) => {
  const tiers: OfferingTier[] = product?.tiers && product.tiers.length > 0 ? product.tiers : SHIVLING_STHAPANA_TIERS;
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'significance' | 'vidhi' | 'prasad' | 'specs'>('specs');
  
  const selectedTier = tiers[selectedTierIndex] || tiers[0];

  const images = product?.images && product.images.length > 0
    ? product.images
    : [
        'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'
      ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleBookClick = () => {
    if (product) {
      onBookNow(product, selectedTier);
    }
  };

  return (
    <section
      id="shivling-sthapana"
      className="py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FDF8EC] to-[#FFFDF9] border-b border-gold-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/40 text-saffron-600 font-serif text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-saffron-500 animate-diya-flicker" />
            <span>॥ कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ॥</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-maroon-700 tracking-wide">
            Sacred Shivling Sthapana & Pran Pratishtha
          </h2>
          <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed">
            Invite timeless peace, cosmic harmony, and spiritual vitality into your home altar with an authentic Narmada Swayambhu Shivling consecrated strictly per Vedic Agamas.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* 3-Tier Offering Selector */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="text-xs font-serif uppercase tracking-widest text-saffron-600 font-bold">
              Select Sacred Consecration Tier
            </span>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Choose the consecration level that resonates with your family Sankalp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => {
              const isSelected = idx === selectedTierIndex;
              return (
                <div
                  key={tier.id || idx}
                  onClick={() => setSelectedTierIndex(idx)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    isSelected
                      ? 'bg-white border-saffron-500 shadow-diya scale-[1.02]'
                      : 'bg-white/70 border-stone-200 hover:border-gold-400 hover:shadow-md'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-saffron-600 to-saffron-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div className="text-center space-y-2 mt-1">
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      {tier.name}
                    </h3>
                    {tier.hindiName && (
                      <p className="text-xs text-saffron-600 font-serif font-medium">
                        {tier.hindiName}
                      </p>
                    )}
                    <div className="pt-2 flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-serif font-extrabold text-maroon-700">
                        ₹{tier.price.toLocaleString('en-IN')}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-sm line-through text-stone-400">
                          ₹{tier.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 pt-1 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-700">
                    {tier.lingamSpecs && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                        <span>{tier.lingamSpecs}</span>
                      </div>
                    )}
                    {tier.jaladhariSpecs && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span>{tier.jaladhariSpecs}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      <span>{tier.priests || 2} Certified Vedic Acharyas</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div
                      className={`w-full py-2 text-center rounded-lg text-xs font-serif font-bold tracking-wide transition-colors ${
                        isSelected
                          ? 'bg-saffron-500 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? '✓ Selected Tier' : 'Choose This Tier'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Visual & Tabbed Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-2xl bg-stone-900 aspect-[4/3] group">
              <img
                src={selectedImage}
                alt={product?.title || 'Shivling Sthapana'}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-maroon-700 text-white text-xs font-serif uppercase tracking-wider font-semibold border border-gold-500 shadow-diya">
                  Swayambhu Sanctified
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white text-xs">
                <span className="flex items-center gap-1 text-gold-300">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  100% Authentic Narmada Lingam
                </span>
                <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                  Includes Sanctum Bhasma & Gangajal
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  type="button"
                  className={`relative rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                    selectedImage === img
                      ? 'border-saffron-500 shadow-md ring-2 ring-saffron-500/30'
                      : 'border-stone-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Prasad Box Teaser Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-gold-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-saffron-500/10 text-saffron-600 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Consecrated Prasad Box Included
                  </h4>
                  <p className="text-xs text-stone-600">
                    24cm × 18cm × 10cm Rigid Saffron Box with Red Lac Wax Seal
                  </p>
                </div>
              </div>
              {onViewPrasadBox && (
                <button
                  onClick={onViewPrasadBox}
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-gold-500/40 text-maroon-700 hover:bg-gold-500/10 text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Inspect Box
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Tabbed Content & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Price & Guarantee Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-medium">
                  {selectedTier.name} (Devotee Seva Dakshina)
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-serif font-extrabold text-maroon-700">
                    ₹{selectedTier.price.toLocaleString('en-IN')}
                  </span>
                  {selectedTier.originalPrice && (
                    <span className="text-base line-through text-stone-400">
                      ₹{selectedTier.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Priest Dakshina & Speed Post Included
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600 bg-white px-3 py-2 rounded-lg border border-stone-200 shadow-sm">
                <Clock className="w-4 h-4 text-saffron-500" />
                <span>{selectedTier.duration || '2.5 Hours'} Vedic Agamic Ritual</span>
              </div>
            </div>

            {/* Specifications Highlight Header (Ensures immediate visibility) */}
            <div className="bg-cream-100 p-4 rounded-xl border border-gold-500/30">
              <h3 className="font-serif font-bold text-base text-maroon-700 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-saffron-500" />
                Vedic Authentic Sanctum Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 block">Stone:</span>
                  <strong>{selectedTier.lingamSpecs || 'Swayambhu Narmadeshwar'}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Peeth / Base:</span>
                  <strong>{selectedTier.jaladhariSpecs || 'Solid Brass Yoni Peeth'}</strong>
                </div>
              </div>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-3 font-serif font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'specs'
                    ? 'border-saffron-500 text-saffron-600'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                विशिष्टताएँ (Specifications)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('significance')}
                className={`pb-2 px-3 font-serif font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'significance'
                    ? 'border-saffron-500 text-saffron-600'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                महत्व (Significance)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vidhi')}
                className={`pb-2 px-3 font-serif font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'vidhi'
                    ? 'border-saffron-500 text-saffron-600'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                वैदिक विधि (Vedic Vidhi Steps)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prasad')}
                className={`pb-2 px-3 font-serif font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'prasad'
                    ? 'border-saffron-500 text-saffron-600'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                प्रसाद बॉक्स (Prasad Inclusions)
              </button>
            </div>

            {/* Tab Panels */}
            <div className="min-h-[180px]">
              {activeTab === 'specs' && (
                <div className="space-y-2 text-xs">
                  <table className="w-full text-left border-collapse border border-stone-200">
                    <tbody>
                      <tr className="border-b border-stone-200 bg-stone-50">
                        <td className="p-2 font-semibold text-stone-600">Lingam Stone</td>
                        <td className="p-2 text-stone-800">{selectedTier.lingamSpecs || 'Natural Swayambhu Narmadeshwar Pebble'}</td>
                      </tr>
                      <tr className="border-b border-stone-200">
                        <td className="p-2 font-semibold text-stone-600">Yoni Peeth Base</td>
                        <td className="p-2 text-stone-800">{selectedTier.jaladhariSpecs || 'Solid Heavy Brass Base with Engraving'}</td>
                      </tr>
                      <tr className="border-b border-stone-200 bg-stone-50">
                        <td className="p-2 font-semibold text-stone-600">Officiating Priests</td>
                        <td className="p-2 text-stone-800">{selectedTier.priests || 2} Certified Rigvedic & Yajurvedic Scholars</td>
                      </tr>
                      <tr className="border-b border-stone-200">
                        <td className="p-2 font-semibold text-stone-600">Sanctum Location</td>
                        <td className="p-2 text-stone-800">Temple Garbhagriha & Yagyashala</td>
                      </tr>
                      <tr className="border-b border-stone-200 bg-stone-50">
                        <td className="p-2 font-semibold text-stone-600">Fulfillment Verification</td>
                        <td className="p-2 text-stone-800">Framed Consecration Certificate with Priest Signature & QR Code</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'significance' && (
                <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                  <p>
                    The Shiva Purana proclaims that keeping and performing nitya abhishek upon a consecrated Swayambhu Narmadeshwar Shivling destroys negative planetary afflictions (Graha Dosha) and invites the protective aura of Lord Shiva directly into your household.
                  </p>
                  <p>
                    Unlike carved idols that can crack, the sacred Narmada Bana Lingam naturally embodies the subtle cosmic pillar of light (*Jyotirlingam*). Our certified Vedic priests conduct full Pran Pratishtha using Rigvedic hymns, energizing the stone with vital cosmic consciousness.
                  </p>
                </div>
              )}

              {activeTab === 'vidhi' && (
                <div className="space-y-2.5 text-xs text-stone-700">
                  <p className="text-stone-500 mb-2">
                    Consecration executed strictly according to ancient Smartha & Shrauta ritual manuals:
                  </p>
                  {[
                    '1. Ganpati & Gauri Invocation (विघ्नहर्ता पूजन)',
                    '2. Punyahavachanam & Matrika Purification (शुद्धिकरण)',
                    '3. Kalash Sthapana & 7 Sacred Rivers Invocation',
                    '4. Agni Pratishtha & Navagraha Shanti Homa',
                    '5. Pran Pratishtha Nyasa & Transference of Chetana',
                    '6. Sri Rudram & Namakam-Chamakam Resonant Recitation',
                    '7. Panchamrit Snan (Milk, Curd, Ghee, Honey, Ganga Jal)',
                    '8. 108 Fresh Bilva Patra Archana with Shiva Sahasranama',
                    '9. Devotee Family Gotra Sankalp & Phala Shruti',
                    '10. Maha Aarti, Pushpanjali & Universal Shanti Path'
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-white border border-stone-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                      <span className="font-medium text-stone-800">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'prasad' && (
                <div className="space-y-2 text-xs">
                  <p className="text-stone-500 mb-2">
                    Every consecrated Prasad Box is packed in a sanctified environment and dispatched via Speed Post:
                  </p>
                  {(selectedTier.prasadHighlights || [
                    'Consecrated Narmadeshwar Shivling with Brass Yoni Peeth',
                    'Sanctum Bhasma & Holy Gangajal vial from Varanasi (100ml)',
                    '108-bead Sacred Panchmukhi Rudraksha Mala',
                    'Silver-plated Consecrated Bilva Leaf',
                    'Pure Copper Shiva Yantra Energized Coin',
                    'Blessed Raksha Sutra Thread',
                    'Official Seva Certificate signed by Head Priest'
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded bg-white border border-stone-100">
                      <Gift className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span className="text-stone-800 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={handleBookClick}
                className="w-full py-4 px-6 rounded-xl font-serif text-base sm:text-lg font-bold text-white bg-gradient-to-r from-saffron-600 via-saffron-500 to-saffron-600 hover:from-saffron-500 hover:to-saffron-600 shadow-diya hover:shadow-diya-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-gold-500/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-gold-300" />
                <span>Book Shivling Sthapana & Enter Gotra Sankalp</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Shastric Guarantee
                </span>
                <span>•</span>
                <span>Speed Post Tracking Included</span>
                <span>•</span>
                <span>80G Tax Exemption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShivlingSthapanaShowcase;
