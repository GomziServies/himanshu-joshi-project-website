import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react';

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
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleCta = () => {
    if (onSelectOfferingClick) {
      onSelectOfferingClick();
    } else if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-gold-500/30 text-cream-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Temple Insignia & Brand Identity */}
          <a href="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Sacred Emblemed Diya Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-700 to-stone-950 border border-gold-500/60 flex items-center justify-center shadow-diya group-hover:shadow-diya-lg transition-all duration-300">
              <svg className="w-7 h-7 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C11.5 4 10 6 10 8.5C10 10.4 11.6 12 13.5 12C15.4 12 17 10.4 17 8.5C17 6 15 4 14 2C13.5 1 12.5 1 12 2Z"
                  fill="#FF7722"
                />
                <path d="M4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14H4Z" fill="#D4AF37" />
                <ellipse cx="12" cy="14" rx="8" ry="2" fill="#B88E23" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-gold-400 tracking-wider">
                श्री सोमनाथ मन्दिरम्
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-stone-300 uppercase tracking-widest">
                Shree Somnath Sanctum Seva Trust
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/" className="text-cream-50 hover:text-gold-400 transition-colors">
              मुख्य पृष्ठ (Home)
            </a>

            {/* Shivling Sthapana Flagship Link */}
            <a
              href="#shivling-sthapana"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-saffron-500/15 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500/25 transition-colors font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              शिवलिंग स्थापना
            </a>

            {/* Offerings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-cream-100 hover:text-gold-400 transition-colors py-2"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span>पूजा व सेवा</span>
                <ChevronDown className="w-4 h-4 text-gold-500" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-stone-900 border border-gold-500/40 rounded-lg shadow-xl py-2 z-50">
                  <a
                    href="#offerings"
                    className="block px-4 py-2 hover:bg-stone-800 text-cream-100 hover:text-gold-400"
                  >
                    सम्पूर्ण सेवा सूची (All Offerings)
                  </a>
                  <a
                    href="#rudrabhishek"
                    className="block px-4 py-2 hover:bg-stone-800 text-cream-100 hover:text-gold-400"
                  >
                    महा रुद्राभिषेक (Rudrabhishek)
                  </a>
                  <a
                    href="#prasad"
                    className="block px-4 py-2 hover:bg-stone-800 text-cream-100 hover:text-gold-400"
                  >
                    महाप्रसाद डिलीवरी (Prasad Delivery)
                  </a>
                </div>
              )}
            </div>

            <a href="#vedic-vidhi" className="text-cream-100 hover:text-gold-400 transition-colors">
              वैदिक विधि (Ritual Vidhi)
            </a>

            <a href="#trust" className="text-cream-100 hover:text-gold-400 transition-colors">
              मंदिर ट्रस्ट (About Trust)
            </a>
          </nav>

          {/* Right Header Actions: Seva Cart & Contact Button */}
          <div className="flex items-center gap-3">
            {/* Devotee Cart / Selected Seva Drawer Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                type="button"
                className="relative p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-gold-400 border border-gold-500/30 transition-colors"
                aria-label="View Devotee Sankalp Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold flex items-center justify-center shadow-md animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Book Now Primary Button */}
            <button
              onClick={handleCta}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-serif font-semibold text-white bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-600 shadow-md hover:shadow-diya transition-all duration-300 border border-gold-500/30 cursor-pointer"
            >
              <span>संकल्प लें (Book Seva)</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-stone-800 text-cream-100 hover:text-gold-400"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-gold-500/30 px-4 pt-3 pb-6 space-y-3">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-cream-50 hover:bg-stone-800 hover:text-gold-400"
          >
            मुख्य पृष्ठ (Home)
          </a>
          <a
            href="#shivling-sthapana"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-saffron-400 bg-saffron-500/10 border border-saffron-500/30"
          >
            शिवलिंग स्थापना (Shivling Sthapana)
          </a>
          <a
            href="#offerings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-cream-100 hover:bg-stone-800 hover:text-gold-400"
          >
            पूजा व सेवा सूची (Offerings)
          </a>
          <a
            href="#vedic-vidhi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-cream-100 hover:bg-stone-800 hover:text-gold-400"
          >
            वैदिक विधि (Vedic Vidhi)
          </a>
          <a
            href="#trust"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-cream-100 hover:bg-stone-800 hover:text-gold-400"
          >
            मंदिर ट्रस्ट (About Trust)
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleCta();
              }}
              type="button"
              className="block w-full text-center py-3 rounded-lg font-serif font-bold text-white bg-saffron-600 hover:bg-saffron-500 shadow-md"
            >
              संकल्प व सेवा बुक करें (Book Seva)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
