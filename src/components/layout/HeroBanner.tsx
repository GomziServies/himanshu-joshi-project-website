import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, ArrowRight } from 'lucide-react';
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

  // Automatic Rotation every 6 seconds (pauses on mouse hover or touch)
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
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
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-stone-950 text-cream-50 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Temple Promotional Highlights"
    >
      {/* Background Image with Sacred Atmospheric Gradient Overlay */}
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
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

            {/* Sacred Multi-Stage Gradient Overlay: Dark sanctum stone to transparent */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
          </div>
        );
      })}

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Sacred Auspicious Badge */}
          {currentBanner.badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{currentBanner.badgeText}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-cream-50 leading-tight">
            {currentBanner.title}
          </h1>

          {/* Subtitle */}
          {currentBanner.subtitle && (
            <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-sans leading-relaxed">
              {currentBanner.subtitle}
            </p>
          )}

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gold-400 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-gold-500" />
              100% प्रामाणिक वैदिक विधि
            </span>
            <span>•</span>
            <span>काशी विद्वत परिषद द्वारा अनुमोदित</span>
            <span>•</span>
            <span>अभिमंत्रित प्रसाद घर डिलीवरी</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleButtonClick(currentBanner.ctaLink || '#shivling-sthapana')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-serif font-bold text-white bg-gradient-to-r from-saffron-600 via-saffron-500 to-saffron-600 hover:from-saffron-500 hover:to-saffron-600 shadow-diya hover:shadow-diya-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-gold-500/30 cursor-pointer"
            >
              <span>{currentBanner.ctaText || 'सेवा प्रारंभ करें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#vedic-vidhi"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-serif font-semibold text-cream-100 bg-stone-900/80 hover:bg-stone-800 border border-gold-500/40 hover:border-gold-400 transition-all duration-200"
            >
              विधि व नियम जानें
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Chevron Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-800 text-gold-400 border border-gold-500/30 backdrop-blur-sm transition-colors focus:outline-none cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-800 text-gold-400 border border-gold-500/30 backdrop-blur-sm transition-colors focus:outline-none cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dot Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentIndex
                  ? 'w-8 bg-saffron-500 shadow-diya'
                  : 'w-2.5 bg-stone-600 hover:bg-stone-400'
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
