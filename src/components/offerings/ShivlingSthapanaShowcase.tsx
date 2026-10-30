import React, { useState } from 'react';
import { ProductOffering, OfferingTier } from '../../types/api';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  Gift,
  CheckCircle2,
  ArrowRight
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
  const [activeTab, setActiveTab] = useState<'specs' | 'vidhi' | 'prasad' | 'significance'>('specs');

  const images = [
    '/salahkareshwar-shivling.jpg',
    '/punya-passport-logo.jpg',
    '/punya-passport-medallion.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleBookClick = () => {
    if (product) {
      onBookNow(product);
    }
  };

  const price = product?.price || 5100;
  const originalPrice = product?.originalPrice || 7100;

  return (
    <section
      id="shivling-sthapana"
      className="py-20 sm:py-24 bg-[#FBF6EE] relative overflow-hidden border-b-2 border-[#D4AF37]/40"
    >
      {/* Background Sacred Geometry Watermarks */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E05A17]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ornate Top Section Header with Sanskrit Invocation */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] text-[#FFE885] font-serif text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md">
            <Flame className="w-4 h-4 text-[#FF7722] animate-diya" />
            <span>॥ श्री सलाहकारेश्वर विजयते नमः शिवाय ॥</span>
            <Flame className="w-4 h-4 text-[#FF7722] animate-diya" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#6D071A] tracking-wide leading-tight drop-shadow-sm">
            श्री सलाहकारेश्वर महादेव शिवलिंग स्थापना
          </h2>

          <p className="font-serif text-base sm:text-xl text-[#3A2218] font-medium leading-relaxed max-w-3xl mx-auto">
            Consecrate your home mandir with the sacred Swayambhu Shivling consecrated at Sri Salahkareshwar Mahadev Tirth (Vadodara), energized via authentic Rigvedic Pran Pratishtha and 108 Bilva Patra Archana conducted in your sacred family Gotra.
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-serif text-[#D4AF37] text-lg font-bold">ॐ नमः शिवाय</span>
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Product Visual & Consecration Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/40 shadow-2xl">
          
          {/* Left Column: Temple Garbhagriha Frame & Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl bg-[#160B07] aspect-[4/3] group">
              <img
                src={selectedImage}
                alt="सलाहकारेश्वर महादेव शिवलिंग स्थापना"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Top Left Holy Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6D071A] to-[#8B0000] text-[#FFE885] text-xs font-serif uppercase tracking-wider font-extrabold border border-[#D4AF37] shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
                  <span>Salahkareshwar Sanctified</span>
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#FDF8EC] text-xs font-serif">
                <span className="flex items-center gap-1.5 text-[#FFE885] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  100% Authentic Consecrated Swayambhu Shivling
                </span>
                <span className="bg-black/70 px-3 py-1 rounded-md border border-[#D4AF37]/40 backdrop-blur-sm text-[11px]">
                  Sanctum Bhasma & Gangajal Included
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  type="button"
                  className={`relative rounded-xl overflow-hidden border-2 aspect-video transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#D4AF37] shadow-lg ring-2 ring-[#FF7722]/50 scale-102'
                      : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-[#D4AF37]/60'
                  }`}
                >
                  <img src={img} alt="Sanctum View" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Prasad Box Visualizer Teaser Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FDF3E0] to-[#FFF9EE] border-2 border-[#D4AF37]/50 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D071A] to-[#4A0611] text-[#FFE885] flex items-center justify-center shrink-0 border border-[#D4AF37]/60 shadow-md">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#1F1510] text-sm sm:text-base">
                    Consecrated Prasad Box Included
                  </h4>
                  <p className="text-xs text-stone-600 font-serif">
                    Rigid Saffron Velvet Box sealed with Mandir Lac Wax & Priest Signature
                  </p>
                </div>
              </div>

              {onViewPrasadBox && (
                <button
                  onClick={onViewPrasadBox}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6D071A] to-[#8B0000] text-[#FFE885] border border-[#D4AF37] hover:shadow-md text-xs font-serif font-bold shrink-0 cursor-pointer transition-all"
                >
                  Inspect Box
                </button>
              )}
            </div>

            {/* Sacred Specifications Callout */}
            <div className="bg-gradient-to-r from-[#FAF4EB] to-[#FFF9EE] p-5 rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm">
              <h3 className="font-serif font-black text-base text-[#6D071A] flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#FF7722]" />
                <span>Salahkareshwar Sanctum Specifications</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-serif text-stone-800">
                <div className="bg-white/80 p-2.5 rounded-lg border border-[#D4AF37]/30">
                  <span className="text-stone-500 block text-[11px]">Lingam Stone:</span>
                  <strong className="text-[#6D071A]">Swayambhu Salahkareshwar Shivling</strong>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-[#D4AF37]/30">
                  <span className="text-stone-500 block text-[11px]">Yoni Peeth Base:</span>
                  <strong className="text-[#6D071A]">Solid Brass (1.2 kg) with Trishul Engraving</strong>
                </div>
              </div>
            </div>

            {/* Tab Navigation Buttons */}
            <div className="flex items-center gap-2 border-b-2 border-[#D4AF37]/30 overflow-x-auto pb-1 text-xs sm:text-sm font-serif">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 px-4 font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-[#C2410C] text-[#C2410C] font-black'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                विशिष्टताएँ (Specifications)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vidhi')}
                className={`pb-2.5 px-4 font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'vidhi'
                    ? 'border-[#C2410C] text-[#C2410C] font-black'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                वैदिक विधि (Vedic Vidhi Steps)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prasad')}
                className={`pb-2.5 px-4 font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'prasad'
                    ? 'border-[#C2410C] text-[#C2410C] font-black'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                प्रसाद बॉक्स (Prasad Inclusions)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('significance')}
                className={`pb-2.5 px-4 font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'significance'
                    ? 'border-[#C2410C] text-[#C2410C] font-black'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                तीर्थ महिमा (Tirth Significance)
              </button>
            </div>

            {/* Tab Panels */}
            <div className="min-h-[160px] font-serif">
              {activeTab === 'specs' && (
                <div className="space-y-2 text-xs">
                  <table className="w-full text-left border-collapse border border-[#D4AF37]/30 rounded-xl overflow-hidden">
                    <tbody>
                      <tr className="border-b border-[#D4AF37]/20 bg-[#FAF4EB]">
                        <td className="p-2.5 font-bold text-stone-700">Lingam Stone</td>
                        <td className="p-2.5 text-stone-900">Natural Swayambhu Shivling (3.5" to 4.0")</td>
                      </tr>
                      <tr className="border-b border-[#D4AF37]/20">
                        <td className="p-2.5 font-bold text-stone-700">Yoni Peeth Base</td>
                        <td className="p-2.5 text-stone-900">Solid Heavy Brass Base (1.2 kg) with Engraved Tridents</td>
                      </tr>
                      <tr className="border-b border-[#D4AF37]/20 bg-[#FAF4EB]">
                        <td className="p-2.5 font-bold text-stone-700">Officiating Priests</td>
                        <td className="p-2.5 text-stone-900">2 Certified Rigvedic & Yajurvedic Scholars</td>
                      </tr>
                      <tr className="border-b border-[#D4AF37]/20">
                        <td className="p-2.5 font-bold text-stone-700">Sanctum Location</td>
                        <td className="p-2.5 text-stone-900">Salahkareshwar Mahadev Tirth Sanctum & Yagyashala, Gotri Vadodara</td>
                      </tr>
                      <tr className="border-b border-[#D4AF37]/20 bg-[#FAF4EB]">
                        <td className="p-2.5 font-bold text-stone-700">Fulfillment Verification</td>
                        <td className="p-2.5 text-stone-900">Consecration Certificate signed by Head Priest with QR Code</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'vidhi' && (
                <div className="space-y-2 text-xs">
                  <p className="text-stone-600 mb-2 font-medium">
                    Performed strictly per ancient Shiva Agamas at Salahkareshwar Mahadev Tirth:
                  </p>
                  {[
                    'Step 1: Ganpati Pujan & Kalash Sthapana for removing obstacles.',
                    'Step 2: Punyahavachanam & sanctification with sacred Gangajal.',
                    'Step 3: Panchamrit Snan (Milk, Curd, Ghee, Honey, Sugar) with Namakam chanting.',
                    'Step 4: Consecration (Pran Pratishtha) transferring divine consciousness.',
                    'Step 5: 108 Bilva Patra Archana offering sacred leaves with Maha Mrityunjaya mantra.',
                    'Step 6: Gotra & Yajman Sankalp chanted explicitly for family protection.'
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF4EB] border border-[#D4AF37]/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7722] shrink-0" />
                      <span className="font-semibold text-stone-900">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'prasad' && (
                <div className="space-y-2 text-xs">
                  <p className="text-stone-600 mb-2 font-medium">
                    Every consecrated Prasad Box is packed in a sanctified environment and dispatched via Speed Post:
                  </p>
                  {[
                    'Consecrated Salahkareshwar Mahadev Shivling with Brass Yoni Peeth',
                    'Sanctum Bhasma & Holy Gangajal vial (100ml)',
                    '108-bead Sacred Panchmukhi Rudraksha Mala',
                    'Silver-plated Consecrated Bilva Leaf',
                    'Pure Copper Shiva Yantra Energized Coin',
                    'Blessed Raksha Sutra Thread',
                    'Official Seva Certificate signed by Head Priest'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF4EB] border border-[#D4AF37]/20">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-stone-900 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'significance' && (
                <div className="space-y-3 text-stone-800 text-xs sm:text-sm leading-relaxed">
                  <p>
                    The Shiva Purana proclaims that performing nitya abhishek upon a consecrated Swayambhu Shivling blessed at Sri Salahkareshwar Mahadev Tirth destroys negative planetary afflictions (Graha Dosha) and invites the protective divine aura of Lord Shiva directly into your household.
                  </p>
                  <p>
                    Consecrated under strict Agamic rites at Salahkareshwar Mahadev Tirth, the sacred Bana Lingam naturally embodies the eternal cosmic pillar of light (Jyotirlingam). Installed upon a solid brass Yoni Peeth, it forms the complete, supreme representation of Shiva and Shakti.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: THE EXACT TEMPLE OFFERING BOX */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative bg-[#FAF4EB] rounded-3xl p-8 sm:p-9 border-2 border-[#D4AF37] shadow-2xl flex flex-col justify-between w-full max-w-md mx-auto transition-all duration-300">
              
              {/* 4 L-Shaped Golden Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

              {/* Arched Top Maroon Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] text-[#FFE885] border border-[#D4AF37] shadow-md text-[11px] font-serif font-black tracking-widest uppercase text-center whitespace-nowrap">
                MOST POPULAR DEVOTEE CHOICE
              </div>

              {/* Title Header */}
              <div className="text-center mt-3 space-y-1.5">
                <h3 className="font-serif font-black text-xl sm:text-2xl text-[#1F1510] tracking-wide uppercase leading-tight">
                  SALAHKARESHWAR SHIVLING STHAPANA
                </h3>
                <p className="text-sm font-serif font-bold text-[#C2410C]">
                  सलाहकारेश्वर महादेव शिवलिंग स्थापना
                </p>
              </div>

              {/* Price Section */}
              <div className="text-center my-4 space-y-2">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-[#6D071A]">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                  {originalPrice && (
                    <span className="text-sm line-through text-stone-400 font-serif">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Shipping Guarantee Pill */}
                <div className="inline-block px-4 py-1 rounded-full bg-[#F3E8D8] border border-[#E0D2C0] text-[#C2410C] text-[11px] font-serif font-bold">
                  पूर्ण प्रसाद एवं स्पीड पोस्ट सम्मिलित
                </div>
              </div>

              {/* Small-Caps Uppercase Description */}
              <p className="text-xs text-stone-600 font-serif leading-relaxed text-center uppercase tracking-wide px-2 line-clamp-3 mb-5">
                AUTHENTIC 3.5" TO 4" SWAYAMBHU SHIVLING WITH SOLID BRASS YONI PEETH, VEDIC PRAN PRATISHTHA & SANCTUM BLESSINGS.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#D4AF37]/40 mb-5" />

              {/* 3 Inclusion Bullets with Circles */}
              <div className="space-y-3.5 text-xs font-serif text-stone-800 uppercase tracking-wide mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#FF7722] text-[#FF7722] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                    ✓
                  </div>
                  <span className="font-semibold leading-snug">
                    3.5" – 4.0" NATURAL SWAYAMBHU SHIVLING STONE
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#FF7722] text-[#FF7722] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                    ✓
                  </div>
                  <span className="font-semibold leading-snug">
                    SOLID HEAVY BRASS BASE (1.2 KG) WITH TRISHUL ENGRAVING
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#FF7722] text-[#FF7722] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                    ✓
                  </div>
                  <span className="font-semibold leading-snug">
                    2 CERTIFIED RIGVEDIC PRIESTS SANKALP
                  </span>
                </div>
              </div>

              {/* Single Full-Width Action Button */}
              <button
                onClick={handleBookClick}
                type="button"
                className="w-full py-4 rounded-xl font-serif font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#C2410C] via-[#FF7722] to-[#C2410C] hover:from-[#EA580C] hover:to-[#EA580C] shadow-lg hover:shadow-diya transition-all duration-300 border border-[#FFE27A]/50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>✓ SELECTED SACRED TIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ShivlingSthapanaShowcase;
