import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Sparkles, Flame } from 'lucide-react';

interface NavbarProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onSelectOfferingClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount = 0,
  onOpenCart,
  onSelectOfferingClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCta = () => {
    if (onSelectOfferingClick) {
      onSelectOfferingClick();
    } else if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#160B07]/95 backdrop-blur-md border-b-2 border-[#D4AF37]/40 text-[#FDFBF7] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Temple Insignia & Brand Identity */}
          <a href="/" className="flex items-center gap-3.5 group focus:outline-none">
            {/* Sacred Punya Passport Medallion Logo */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-lg group-hover:scale-105 transition-all duration-300 shrink-0 bg-[#2A0E08]">
              <img
                src="/punya-passport-logo.jpg"
                alt="पुण्य पासपोर्ट - सलाहकारेश्वर महादेव तीर्थ"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to stylized Om if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-wider text-[#FFE27A] drop-shadow-sm">
                  सलाहकारेश्वर महादेव तीर्थ
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-serif font-black uppercase bg-[#6D071A] text-[#FFE885] border border-[#D4AF37]/50">
                  पुण्य पासपोर्ट
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-serif text-[#D8CCC4] tracking-widest uppercase flex items-center gap-1.5">
                <span>Salahkareshwar Mahadev Tirth</span>
                <span className="hidden md:inline text-[#D4AF37]">• Gotri, Vadodara (Gujarat)</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-serif font-semibold tracking-wide">
            <a 
              href="/" 
              className="text-[#FDFBF7] hover:text-[#FFE27A] transition-colors py-2 relative group"
            >
              <span>मुख्य पृष्ठ</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </a>

            {/* Shivling Sthapana Flagship Link */}
            <a
              href="#shivling-sthapana"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] border border-[#D4AF37] text-[#FFE885] hover:shadow-diya transition-all font-bold"
            >
              <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
              <span>शिवलिंग स्थापना (Sthapana)</span>
              <span className="w-2 h-2 rounded-full bg-[#FF7722] animate-ping" />
            </a>

            <a 
              href="#vedic-vidhi" 
              className="text-[#FDFBF7] hover:text-[#FFE27A] transition-colors py-2 relative group"
            >
              <span>वैदिक विधि</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </a>

            <a 
              href="#mandir-shloka" 
              className="text-[#FDFBF7] hover:text-[#FFE27A] transition-colors py-2 relative group"
            >
              <span>स्तोत्र एवं महिमा</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Right Header Actions: Seva Cart & Contact Button */}
          <div className="flex items-center gap-3">
            {/* Devotee Cart / Selected Seva Drawer Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                type="button"
                className="relative p-2.5 rounded-full bg-[#2A120A] hover:bg-[#3D1A0E] text-[#FFE885] border border-[#D4AF37]/50 transition-colors cursor-pointer"
                aria-label="View Devotee Sankalp Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E05A17] text-white text-xs font-bold flex items-center justify-center shadow-md animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Book Now Primary Button with Temple Gold & Saffron Glow */}
            <button
              onClick={handleCta}
              type="button"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-serif font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#C2410C] via-[#FF7722] to-[#C2410C] hover:from-[#EA580C] hover:to-[#EA580C] shadow-lg hover:shadow-diya transition-all duration-300 border border-[#FFE27A]/50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFE885]" />
              <span>संकल्प बुकिंग</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg bg-[#2A120A] text-[#FFE885] border border-[#D4AF37]/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#160B07] border-t border-[#D4AF37]/30 py-4 px-2 space-y-2">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg font-serif font-semibold text-[#FDFBF7] hover:bg-[#6D071A]/40"
            >
              मुख्य पृष्ठ (Home)
            </a>
            <a
              href="#shivling-sthapana"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg font-serif font-bold text-[#FFE885] bg-[#6D071A]/40 border border-[#D4AF37]/40"
            >
              शिवलिंग स्थापना (Shivling Sthapana)
            </a>
            <a
              href="#vedic-vidhi"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg font-serif font-semibold text-[#FDFBF7] hover:bg-[#6D071A]/40"
            >
              वैदिक विधि (Rituals)
            </a>
            <a
              href="#mandir-shloka"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg font-serif font-semibold text-[#FDFBF7] hover:bg-[#6D071A]/40"
            >
              स्तोत्र एवं महिमा (Shlokas)
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCta();
                }}
                className="w-full py-3 rounded-lg font-serif font-bold text-white bg-gradient-to-r from-[#C2410C] to-[#FF7722] text-center shadow-md border border-[#D4AF37]/50"
              >
                संकल्प सेवा बुक करें (Book Now)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ornate Gold Bottom Hairline with Temple Lotus/Diamond Center */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-[#D4AF37] border border-[#FFE27A] shadow-sm" />
      </div>
    </header>
  );
};

export default Navbar;
