import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onSelectOfferingClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectOfferingClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-temple-gold/40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Sacred Logo / Mandir Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-temple-saffron via-temple-maroon to-temple-sanctum p-0.5 shadow-diya flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#FFFDF9] flex items-center justify-center border border-temple-gold/60">
                <span className="text-2xl text-temple-saffron font-serif font-bold">ॐ</span>
              </div>
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wider text-temple-maroon uppercase flex items-center gap-1.5">
                <span>Shree Somnath Sanctum</span>
              </div>
              <p className="text-[10px] tracking-widest text-temple-gold-dark uppercase font-medium">
                Vedic Temple Trust & Consecration Seva
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-temple-sanctum">
            <a href="#hero-banner" className="hover:text-temple-saffron transition-colors">Home</a>
            <a href="#shivling-section" className="text-temple-maroon font-semibold hover:text-temple-saffron transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-temple-saffron animate-ping"></span>
              Shivling Sthapana
            </a>
            <a href="#offerings-catalog" className="hover:text-temple-saffron transition-colors">Temple Offerings</a>
            <a href="#vidhi-process" className="hover:text-temple-saffron transition-colors">Vedic Vidhi</a>
            <a href="#trust-guarantee" className="hover:text-temple-saffron transition-colors flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-temple-gold" />
              <span>Trust Guarantee</span>
            </a>
          </div>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSelectOfferingClick}
              className="px-5 py-2.5 rounded-md font-serif text-xs font-semibold uppercase tracking-wider text-white saffron-gradient shadow-diya hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all border border-temple-gold/50 flex items-center gap-2"
            >
              <span>Book Sthapana Seva</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-temple-maroon hover:bg-temple-ivory-dark focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-temple-gold/40 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <a
            href="#hero-banner"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-temple-sanctum hover:text-temple-saffron"
          >
            Home
          </a>
          <a
            href="#shivling-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-temple-maroon hover:text-temple-saffron"
          >
            Shivling Sthapana Seva
          </a>
          <a
            href="#offerings-catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-temple-sanctum hover:text-temple-saffron"
          >
            Temple Offerings
          </a>
          <a
            href="#vidhi-process"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-temple-sanctum hover:text-temple-saffron"
          >
            Vedic Vidhi & Rituals
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSelectOfferingClick();
            }}
            className="w-full mt-2 py-3 rounded-md font-serif text-xs font-bold uppercase tracking-wider text-white saffron-gradient shadow-diya text-center"
          >
            Book Sthapana Seva
          </button>
        </div>
      )}
    </nav>
  );
};

