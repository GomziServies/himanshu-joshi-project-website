import React from 'react';
import { Sparkles, Flame, ShieldCheck } from 'lucide-react';

export const MandirShlokaSection: React.FC = () => {
  return (
    <section id="mandir-shloka" className="py-20 bg-gradient-to-b from-[#140608] via-[#2A0A10] to-[#140608] text-white border-y-4 border-[#D4AF37]/50 relative overflow-hidden">
      {/* Decorative Golden Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Shloka Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#FFE885] font-serif text-xs uppercase tracking-widest shadow-md">
            <Flame className="w-4 h-4 text-[#FF7722] animate-diya" />
            <span>॥ श्री सलाहकारेश्वर तीर्थ माहात्म्यम् ॥</span>
            <Flame className="w-4 h-4 text-[#FF7722] animate-diya" />
          </div>
          
          <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-[#FFE885] tracking-wide mt-2 drop-shadow-md">
            "सर्वपापहरं पुण्यं सलाहकारेश्वरं परम्"
          </h3>
          <p className="text-[#E8DFD8] text-sm sm:text-base font-serif italic max-w-2xl mx-auto leading-relaxed">
            "Worship and consecration of Lord Shiva at Sri Salahkareshwar Mahadev Tirth removes all adversities, dispelling negativity and blessing the devotee's lineage with lasting auspiciousness."
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
        </div>

        {/* 3 Sacred Agamic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Swayambhu Lingam Consecration */}
          <div className="bg-[#1C080D]/80 backdrop-blur-md rounded-2xl p-7 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFE885] font-serif text-3xl font-black shadow-diya group-hover:scale-105 transition-transform">
              ॐ
            </div>
            <h4 className="font-serif font-black text-lg text-[#FFE885]">
              Swayambhu Sanctum Consecration
            </h4>
            <p className="text-xs sm:text-sm text-[#D8CCC4] leading-relaxed font-serif">
              Every Shivling is consecrated at Sri Salahkareshwar Mahadev Tirth, energized with Rigvedic mantras, holy Gangajal snanam, and sacred Agamic rituals to awaken pure divine cosmic vibrations in your home mandir.
            </p>
          </div>

          {/* Card 2: Household Blessing */}
          <div className="bg-[#1C080D]/80 backdrop-blur-md rounded-2xl p-7 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFE885] shadow-diya group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7 text-[#FFE885]" />
            </div>
            <h4 className="font-serif font-black text-lg text-[#FFE885]">
              Vastu & Graha Shanti in Griha
            </h4>
            <p className="text-xs sm:text-sm text-[#D8CCC4] leading-relaxed font-serif">
              The sacred Shiva Purana affirms that daily abhishek on a consecrated Shivling blessed by Sri Salahkareshwar Mahadev neutralizes Vastu Dosha, planetary afflictions, and ill fortune, protecting all generations of your household.
            </p>
          </div>

          {/* Card 3: Vedic Gotra Sankalp */}
          <div className="bg-[#1C080D]/80 backdrop-blur-md rounded-2xl p-7 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D071A] to-[#8B0000] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFE885] shadow-diya group-hover:scale-105 transition-transform">
              <Sparkles className="w-7 h-7 text-[#FFE885]" />
            </div>
            <h4 className="font-serif font-black text-lg text-[#FFE885]">
              Personalized Gotra Sankalp
            </h4>
            <p className="text-xs sm:text-sm text-[#D8CCC4] leading-relaxed font-serif">
              Initiated Vedic priests at Salahkareshwar Mahadev Tirth chant the sacred Namakam-Chamakam and Rudra Suktas, explicitly invoking your Yajman name, Gotra, and Nakshatra into the consecrated Lingam before dispatch.
            </p>
          </div>

        </div>

        {/* Lingashtakam Verse Royal Plaque */}
        <div className="p-8 rounded-3xl bg-[#0F0406]/90 border-2 border-[#D4AF37] text-center space-y-3 max-w-4xl mx-auto shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#6D071A] text-[#FFE885] border border-[#D4AF37] text-[10px] font-serif font-bold uppercase tracking-widest">
            ॥ श्री लिङ्गाष्टकम् ॥
          </div>
          <p className="font-serif text-sm sm:text-lg text-[#FFE885] font-black tracking-wider leading-relaxed">
            ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम् । जन्मजदुःखविनाशकलिङ्गं तत् प्रणमामि सदाशिवलिङ्गम् ॥
          </p>
          <p className="text-xs sm:text-sm text-stone-300 font-serif">
            "I bow before that Sadashiva Lingam which is worshipped by Brahma, Vishnu and the celestial Devas, which is pure, resplendent, and destroys the cycle of worldly suffering."
          </p>
        </div>

      </div>
    </section>
  );
};

export default MandirShlokaSection;
