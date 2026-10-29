import React, { useState, useEffect } from 'react';
import { Banner } from '../types';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface BannerCarouselProps {
  banners: Banner[];
  onCtaClick: (link?: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onCtaClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section id="hero-banner" className="relative bg-temple-sanctum overflow-hidden min-h-[480px] lg:min-h-[580px] flex items-center">
      {/* Background Image with Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-out transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-temple-sanctum via-temple-sanctum/85 to-temple-sanctum/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-temple-sanctum via-transparent to-temple-sanctum/50" />
      </div>

      {/* Decorative Traditional Temple Motifs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-temple-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-temple-saffron/15 blur-3xl pointer-events-none" />

      {/* Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          {currentBanner.badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-temple-maroon/80 border border-temple-gold/60 text-temple-gold-light text-xs font-serif uppercase tracking-widest backdrop-blur-sm shadow-diya">
              <Sparkles className="w-3.5 h-3.5 text-temple-gold animate-spin" style={{ animationDuration: '4s' }} />
              <span>{currentBanner.badgeText}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide drop-shadow-md">
            {currentBanner.title}
          </h1>

          {/* Subtitle */}
          {currentBanner.subtitle && (
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
              {currentBanner.subtitle}
            </p>
          )}

          {/* Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onCtaClick(currentBanner.ctaLink)}
              className="px-8 py-4 rounded-md font-serif text-sm font-bold uppercase tracking-wider text-white saffron-gradient shadow-diya hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all border border-temple-gold flex items-center gap-3 group"
            >
              <span>{currentBanner.ctaText || 'Book Sacred Seva'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#shivling-section"
              className="px-6 py-4 rounded-md font-serif text-sm font-semibold uppercase tracking-wider text-temple-gold-light bg-black/40 hover:bg-black/60 border border-temple-gold/40 backdrop-blur-sm transition-all"
            >
              View Vidhi & Sanctum
            </a>
          </div>

        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-temple-gold border border-temple-gold/40 backdrop-blur-sm transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-temple-gold border border-temple-gold/40 backdrop-blur-sm transition-all"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-temple-gold' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

