import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="trust" className="bg-stone-950 text-stone-300 border-t-2 border-gold-500/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Sacred Shanti Mantra Banner */}
        <div className="p-6 rounded-xl bg-stone-900/90 border border-gold-500/30 text-center space-y-2">
          <p className="font-serif text-lg sm:text-xl text-gold-400 tracking-wide">
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
          </p>
          <p className="text-xs sm:text-sm text-stone-400 font-sans">
            "May all beings everywhere be happy and free from illness; may all perceive what is auspicious."
          </p>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Trust Profile & Legal Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon-700 border border-gold-500 flex items-center justify-center">
                <span className="font-serif font-bold text-gold-400 text-lg">ॐ</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-gold-400 text-lg">श्री सोमनाथ मन्दिरम्</h4>
                <p className="text-xs text-stone-400">Shree Somnath Sanctum Seva Trust</p>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Registered Vedic Religious & Charitable Trust under the Indian Trusts Act, 1882. Dedicated to preserving ancient Vedic Vidhi, sanctified temple rituals, and pan-India Prasad consecration.
            </p>
            <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs space-y-1">
              <div className="text-gold-400 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-saffron-500" />
                Trust Reg No: E-8823/UP/VNS / TR-108/VARANASI
              </div>
              <div className="text-stone-400">
                Donations tax exempt under Sec 80G of Income Tax Act.
              </div>
            </div>
          </div>

          {/* Column 2: Sacred Offerings */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-gold-400 text-base border-b border-gold-500/20 pb-2">
              प्रमुख पूजा व सेवा (Sacred Offerings)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#shivling-sthapana" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  नर्मदेश्वर शिवलिंग स्थापना
                </a>
              </li>
              <li>
                <a href="#rudrabhishek" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  एकादश वार महा रुद्राभिषेक
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  महामृत्युंजय शांति जप
                </a>
              </li>
              <li>
                <a href="#prasad" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  काशी विश्वनाथ महाप्रसाद सेवा
                </a>
              </li>
              <li>
                <a href="#yantra" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  प्राण प्रतिष्ठित श्रीयंत्र प्रतिष्ठा
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Devotee Guidelines & Integrity */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-gold-400 text-base border-b border-gold-500/20 pb-2">
              भक्त मार्गदर्शिका (Devotee Services)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#vedic-vidhi" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  संकल्प एवं गोत्र विधान (Sankalp Vidhi)
                </a>
              </li>
              <li>
                <a href="#prasad-delivery" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  प्रसाद डिलीवरी ट्रैकिंग (Prasad Dispatch)
                </a>
              </li>
              <li>
                <a href="#receipt" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  डिजिटल दान रसीद (Tax Receipts)
                </a>
              </li>
              <li>
                <a href="#priests" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  प्रमाणित पुरोहित परिचय (Certified Priests)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <span className="text-saffron-500">›</span>
                  प्रायः पूछे जाने वाले प्रश्न (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sanctum Address & Priest Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-gold-400 text-base border-b border-gold-500/20 pb-2">
              मंदिर संपर्क (Contact & Sanctum)
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron-500 mt-1 shrink-0" />
                <span>Dashashwamedh Ghat Road, Varanasi, Uttar Pradesh 221001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 98765 43210 (हेल्पलाइन 6 AM - 9 PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>seva@shreemandirtrust.org</span>
              </div>
              <div className="pt-2 text-xs text-stone-400">
                मंदिर गर्भगृह दर्शन समय: प्रातः 4:00 से रात्रि 11:00 बजे तक
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Sankalp Authenticity Disclaimer */}
        <div className="p-4 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-400 space-y-1">
          <p className="font-semibold text-gold-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-saffron-500" />
            धार्मिक एवं संकल्प घोषणा (Sacred Sankalp Authenticity Declaration)
          </p>
          <p className="leading-relaxed">
            सभी अनुष्ठान, पूजन एवं शिवलिंग स्थापना कार्य काशी के वैदिक ब्राह्मणों द्वारा प्रामाणिक श्रुति-स्मृति विधान से यजमान के नाम व गोत्र का उच्चारण कर संपन्न कराए जाते हैं। प्रसाद की शुचिता (Sanctity) बनाए रखने हेतु केवल शुद्ध गंगाजल, गौघृत एवं सीलबंद वैदिक भस्म का उपयोग होता है।
          </p>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="border-t border-stone-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} श्री सोमनाथ मन्दिरम् ट्रस्ट (Shree Somnath Sanctum Seva Trust). सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-stone-300 transition-colors">नियम व शर्तें (Terms)</a>
            <a href="#privacy" className="hover:text-stone-300 transition-colors">गोपनीयता नीति (Privacy)</a>
            <a href="#refund" className="hover:text-stone-300 transition-colors">रिफंड एवं संकल्प नीति (Refund Policy)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
