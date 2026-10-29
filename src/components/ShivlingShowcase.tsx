import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, CheckCircle2, ShieldCheck, Flame, Gift, Clock, Users, MapPin, Award } from 'lucide-react';

interface ShivlingShowcaseProps {
  product: Product;
  onBookNow: (product: Product) => void;
}

export const ShivlingShowcase: React.FC<ShivlingShowcaseProps> = ({ product, onBookNow }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : product.featuredImage || ''
  );

  return (
    <section id="shivling-section" className="py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FDF8EC] to-[#FFFDF9] border-b border-temple-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-temple-saffron/10 border border-temple-saffron/40 text-temple-saffron font-serif text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-temple-saffron diya-flame" />
            <span>॥ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ॥</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-temple-maroon tracking-wide">
            Sacred Shivling Sthapana & Pran Pratishtha
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed">
            Invite timeless peace, cosmic harmony, and spiritual vitality into your home altar with an authentic Narmada Swayambhu Shivling consecrated strictly per Vedic Agamas.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-temple-gold/40 shadow-2xl bg-temple-sanctum aspect-[4/3] group">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-temple-maroon text-white text-xs font-serif uppercase tracking-wider font-semibold border border-temple-gold shadow-diya">
                  Swayambhu Sanctified
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white text-xs">
                <span className="flex items-center gap-1 text-temple-gold-light">
                  <ShieldCheck className="w-4 h-4 text-temple-gold" />
                  100% Authentic Narmada Lingam
                </span>
                <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                  Includes Sanctum Bhasma
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-temple-saffron scale-105 shadow-diya'
                        : 'border-temple-gold/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Ritual Specifications Table */}
            <div className="bg-white rounded-xl border border-temple-gold/30 p-5 shadow-sm space-y-3">
              <h4 className="font-serif text-sm font-bold text-temple-maroon uppercase tracking-wider border-b border-temple-gold/20 pb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-temple-gold" />
                Vedic Authentic Sanctum Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-gray-500">Lingam Stone:</span>
                  <p className="font-medium text-temple-sanctum">Original Narmada River Natural Pebble</p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500">Base (Yoni Peeth):</span>
                  <p className="font-medium text-temple-sanctum">Pure Solid Brass with Engraved Tridents</p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500">Sanctum Vidhi:</span>
                  <p className="font-medium text-temple-sanctum">Rigvedic Rudra Sukta & Pran Pratishtha</p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500">Prasad Dispatch:</span>
                  <p className="font-medium text-temple-sanctum">Speed Post with Tracking</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing, Ritual Features & Sankalp Booking */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-2">
              <span className="text-xs font-serif uppercase tracking-widest text-temple-saffron font-bold">
                Sole Consecration Offering
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-temple-sanctum leading-snug">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.subtitle || product.shortDescription}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-xl border-2 border-temple-gold/40 p-6 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-temple-gold/10 rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-wrap items-baseline gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-serif text-temple-maroon">₹</span>
                  <span className="text-4xl font-serif font-extrabold text-temple-maroon">
                    {product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                  All-Inclusive Dakshina & Speed Delivery
                </span>
              </div>

              {/* Ritual Snapshot */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Clock className="w-4 h-4 text-temple-gold" />
                  <span>2.5 Hrs Vidhi</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Users className="w-4 h-4 text-temple-gold" />
                  <span>2 Vedic Scholars</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-temple-gold" />
                  <span>Inner Sanctum</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                onClick={() => onBookNow(product)}
                className="w-full py-4 rounded-lg font-serif text-sm font-bold uppercase tracking-wider text-white saffron-gradient shadow-diya hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 border border-temple-gold"
              >
                <Sparkles className="w-5 h-5 text-temple-gold-shimmer" />
                <span>Book Shivling Sthapana & Enter Gotra Sankalp</span>
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                🔒 Secure Razorpay Checkout • Automated Consecration Email Receipt Dispatched Instantly
              </p>
            </div>

            {/* Sacred Prasad Inclusions */}
            {product.prasadIncludes && product.prasadIncludes.length > 0 && (
              <div className="bg-temple-ivory-warm rounded-xl border border-temple-gold/40 p-6 space-y-3">
                <h4 className="font-serif text-sm font-bold text-temple-maroon uppercase tracking-wider flex items-center gap-2">
                  <Gift className="w-4 h-4 text-temple-saffron" />
                  Consecrated Prasad Box Included for Devotee
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-800">
                  {product.prasadIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-temple-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ritual Steps Overview */}
            {product.ritualsIncluded && product.ritualsIncluded.length > 0 && (
              <div className="bg-white rounded-xl border border-temple-gold/30 p-6 space-y-3">
                <h4 className="font-serif text-sm font-bold text-temple-sanctum uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-temple-saffron" />
                  Vedic Consecration Steps (Vidhi Krama)
                </h4>
                <div className="space-y-2 text-xs text-gray-700">
                  {product.ritualsIncluded.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 py-1 border-b border-gray-100 last:border-0">
                      <span className="w-5 h-5 rounded-full bg-temple-maroon text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

