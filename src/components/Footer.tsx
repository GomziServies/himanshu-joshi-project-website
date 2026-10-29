import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-temple-sanctum text-white border-t-2 border-temple-gold/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Trust Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-temple-gold/20 border border-temple-gold flex items-center justify-center">
                <span className="text-xl text-temple-gold font-serif font-bold">ॐ</span>
              </div>
              <span className="font-serif text-lg font-bold text-temple-gold-light tracking-wider">
                Shree Somnath Sanctum
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Registered Vedic Religious & Charitable Trust dedicated to preserving sacred Agamic temple traditions, Narmadeshwar Shivling consecration, and authentic home altar Pran Pratishtha.
            </p>
            <div className="flex items-center gap-2 text-xs text-temple-gold">
              <ShieldCheck className="w-4 h-4" />
              <span>Regd. Trust No: TRUST/VAR/2026/V77</span>
            </div>
          </div>

          {/* Col 2: Consecrated Offerings */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-temple-gold-light uppercase tracking-wider border-b border-temple-gold/20 pb-2">
              Sacred Sevas
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#shivling-section" className="hover:text-temple-gold transition-colors">
                  • Shivling Sthapana & Pran Pratishtha
                </a>
              </li>
              <li>
                <a href="#offerings-catalog" className="hover:text-temple-gold transition-colors">
                  • Maha Rudrabhishek & Bilva Archana
                </a>
              </li>
              <li>
                <a href="#offerings-catalog" className="hover:text-temple-gold transition-colors">
                  • Maha Mrityunjaya Jaap & Vedic Havan
                </a>
              </li>
              <li>
                <a href="#offerings-catalog" className="hover:text-temple-gold transition-colors">
                  • Special Shravan Somwar Archana
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctum Office & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-temple-gold-light uppercase tracking-wider border-b border-temple-gold/20 pb-2">
              Sanctum Office
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-temple-gold flex-shrink-0 mt-0.5" />
                <span>Sanctum Altar Complex, Dashashwamedh Ghat Road, Varanasi, Uttar Pradesh 221001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <span>+91 98765 43210 / +91 91234 56789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-temple-gold flex-shrink-0" />
                <span>seva@somnathsanctum.org</span>
              </div>
            </div>
          </div>

          {/* Col 4: Spiritual Assurance */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-temple-gold-light uppercase tracking-wider border-b border-temple-gold/20 pb-2">
              Trust Guarantee
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-temple-gold/30 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2 text-temple-gold">
                <Award className="w-4 h-4" />
                <span className="font-semibold">100% Shastra Compliant</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All offerings are performed by initiated Vedic Brahmins. Every devotee receives a sealed Prasad box, holy Bhasma, and verifiable transaction receipt.
              </p>
            </div>
          </div>

        </div>

        {/* Shloka Banner */}
        <div className="pt-8 border-t border-temple-gold/20 text-center space-y-2">
          <p className="font-serif text-sm text-temple-gold tracking-widest">
            ॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shree Somnath Sanctum Trust. All Vedic Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

