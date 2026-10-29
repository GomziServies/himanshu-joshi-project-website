import React from 'react';
import { Sparkles, Phone, Mail } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-temple-maroon-dark via-temple-maroon to-temple-sanctum text-white text-xs py-2 px-4 border-b border-temple-gold/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-temple-gold-light font-medium tracking-wide">
          <Sparkles className="w-4 h-4 text-temple-gold animate-pulse" />
          <span>॥ ॐ नमः शिवाय ॥ Auspicious Shravan Seva: Consecrated Narmadeshwar Shivling with Vedic Pran Pratishtha</span>
        </div>
        <div className="flex items-center gap-6 text-gray-200 text-xs">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-temple-gold" />
            <span>Sanctum Seva: +91 98765 43210</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-temple-gold" />
            <span>seva@somnathsanctum.org</span>
          </span>
        </div>
      </div>
    </div>
  );
};

