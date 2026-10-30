import React from 'react';
import { Phone, Clock, Flame, Bell } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#120805] text-[#FDF8EC] text-xs py-2 px-4 border-b border-[#D4AF37]/30 shadow-inner relative z-50">
      {/* Decorative top gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Sacred Tithi / Panchang Ticker */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] text-[#FFE885] font-serif font-bold border border-[#D4AF37]/50 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#FF7722] animate-diya" />
            <span>॥ आज का पंचांग ॥</span>
          </span>
          <span className="text-[#E8DFD8] font-serif">
            कार्तिक मास • शुक्ल पक्ष • एकादशी तिथि <span className="text-[#D4AF37] font-semibold">|</span> अभिजित मुहूर्त: <strong className="text-[#FFE885]">11:48 AM – 12:34 PM</strong>
          </span>
          <span className="hidden lg:inline text-[#D4AF37] font-serif">
            • गर्भगृह अखण्ड ज्योति प्रज्वलित (Live Darshan Active)
          </span>
        </div>

        {/* Temple Timings & Priest Helpline */}
        <div className="flex items-center gap-4 text-[#D8CCC4] text-[11px] sm:text-xs">
          <div className="hidden sm:flex items-center gap-1.5 font-serif">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>आरती: मंगला <strong>4:00 AM</strong> • शयन <strong>10:30 PM</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[#FFE885] font-serif">
            <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>अखण्ड वेद पाठ</span>
          </div>

          <a
            href="tel:+919825600778"
            className="flex items-center gap-1.5 text-[#FFE885] hover:text-white transition-colors font-serif font-semibold bg-[#6D071A]/60 px-3 py-1 rounded-full border border-[#D4AF37]/40"
          >
            <Phone className="w-3 h-3 text-[#FF7722]" />
            <span>तीर्थ पुरोहित हेल्पलाइन: +91 98256 00778</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
