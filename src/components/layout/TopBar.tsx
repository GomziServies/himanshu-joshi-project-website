import React from 'react';
import { Phone, Clock, Flame } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-stone-950 text-cream-100 text-xs py-2 px-4 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Sacred Tithi / Panchang Ticker */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-saffron-500/20 text-saffron-400 font-medium border border-saffron-500/30">
            <Flame className="w-3.5 h-3.5 text-saffron-500 animate-diya-flicker" />
            आज का पंचांग
          </span>
          <span className="text-stone-300">
            कार्तिक मास • शुक्ल पक्ष • एकादशी तिथि | अभिजित मुहूर्त: 11:48 AM – 12:34 PM
          </span>
          <span className="hidden lg:inline text-gold-400">
            • गर्भगृह दर्शन चालू है (Garbhagriha Darshan Open)
          </span>
        </div>

        {/* Temple Timings & Priest Helpline */}
        <div className="flex items-center gap-4 text-stone-300">
          <div className="hidden sm:flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gold-500" />
            <span>आरती: मंगला 3:30 AM • शयन 10:30 PM</span>
          </div>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-saffron-500" />
            <span>पुरोहित हेल्पलाइन: +91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
