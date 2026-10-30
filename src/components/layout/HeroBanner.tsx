import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, ArrowRight, Flame } from 'lucide-react';
import { Banner } from '../../types/api';
import { fetchBanners } from '../../services/bannerService';
import { SEED_BANNERS } from '../../data/seedBanners';

interface HeroBannerProps {
  onCtaClick?: (ctaLink?: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onCtaClick }) => {
  const [banners, setBanners] = useState<Banner[]>(SEED_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Synchronize dynamic banners from backend API
  useEffect(() => {
    let mounted = true;
    fetchBanners().then((res) => {
      if (mounted && res && res.data && res.data.length > 0) {
        setBanners(res.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Automatic Rotation every 7 seconds
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const currentBanner = banners[currentIndex] || SEED_BANNERS[0];

  const handleButtonClick = (link?: string) => {
    if (onCtaClick) {
      onCtaClick(link);
    } else if (link && link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-[#0F0704] text-[#FDF8EC] select-none border-b-4 border-[#D4AF37]/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Temple Promotional Highlights"
    >
      {/* Background Image with Deep Temple Sanctum Lighting */}
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <picture>
              {banner.mobileImageUrl && (
                <source media="(max-width: 640px)" srcSet={banner.mobileImageUrl} />
              )}
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
            </picture>

            {/* Sacred Multi-Stage Gradient Overlay: Rich Crimson-Maroon to Sanctum Stone */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0704] via-[#1A0A06]/85 to-[#2A060C]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0704]/95 via-[#1A0A06]/75 to-transparent" />
            
            {/* Ambient Diya Light Radial Vignettes */}
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FF7722]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        );
      })}

      {/* Ornate Top Toran Ribbon */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center py-1.5 bg-gradient-to-r from-transparent via-[#6D071A]/90 to-transparent border-b border-[#D4AF37]/40">
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-serif font-bold text-[#FFE885] tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
          <span>॥ ॐ नमः शिवाय • श्री सोमनाथ ज्योतिर्लिंग गर्भगृह अनुष्ठान ॥</span>
          <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
        </div>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-8">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Sacred Auspicious Badge */}
          {currentBanner.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] text-[#FFE885] text-xs sm:text-sm font-serif font-bold tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-[#FFE27A] animate-pulse" />
              <span>{currentBanner.badgeText}</span>
            </div>
          )}

          {/* Heading with Gold Foil & Royal Sanskrit Depth */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#FFFDF9] leading-[1.15] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {currentBanner.title}
          </h1>

          {/* Subtitle */}
          {currentBanner.subtitle && (
            <p className="text-sm sm:text-base lg:text-lg text-[#F2ECE0] font-serif leading-relaxed max-w-2xl drop-shadow-md">
              {currentBanner.subtitle}
            </p>
          )}

          {/* Authentic Temple Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-serif font-bold text-[#FFE27A]">
            <div className="flex items-center gap-2 bg-[#2A1009]/80 px-3 py-2 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm shadow-sm">
              <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>100% वैदिक विधि विधान</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2A1009]/80 px-3 py-2 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>गोत्र-नाम संकल्प सहित</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2A1009]/80 px-3 py-2 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm shadow-sm">
              <Flame className="w-4 h-4 text-[#FF7722] shrink-0 animate-diya" />
              <span>अभिमंत्रित प्रसाद घर डिलीवरी</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleButtonClick(currentBanner.ctaLink || '#shivling-sthapana')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-serif font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#C2410C] via-[#FF7722] to-[#C2410C] hover:from-[#EA580C] hover:to-[#EA580C] shadow-diya hover:shadow-diya-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#FFE885] cursor-pointer"
            >
              <span>{currentBanner.ctaText || 'सेवा प्रारंभ करें (Book Seva)'}</span>
              <ArrowRight className="w-5 h-5 text-[#FFE885]" />
            </button>

            <a
              href="#vedic-vidhi"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-serif font-bold text-sm text-[#FFE885] bg-[#2A0E08]/85 hover:bg-[#3D140A] border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-200 shadow-md backdrop-blur-sm"
            >
              <span>प्रतिष्ठा विधि व नियम</span>
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Chevron Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#1A0A06]/80 hover:bg-[#6D071A] text-[#FFE885] border-2 border-[#D4AF37]/60 backdrop-blur-md transition-all focus:outline-none cursor-pointer shadow-lg hover:scale-110"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#1A0A06]/80 hover:bg-[#6D071A] text-[#FFE885] border-2 border-[#D4AF37]/60 backdrop-blur-md transition-all focus:outline-none cursor-pointer shadow-lg hover:scale-110"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dot Indicators with Sacred Diya Styling */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                idx === currentIndex
                  ? 'w-10 bg-gradient-to-r from-[#FF7722] to-[#D4AF37] shadow-diya border border-[#FFE885]'
                  : 'w-3 bg-stone-700/80 hover:bg-stone-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
