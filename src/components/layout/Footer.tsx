import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Landmark, Copy, Check, QrCode } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <footer id="trust" className="bg-[#120704] text-stone-300 border-t-2 border-[#D4AF37]/40 pt-16 pb-8 relative overflow-hidden">
      {/* Sacred subtle glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#6D071A]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Top Sacred Shanti Mantra Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#200B06] via-[#2D1009] to-[#200B06] border border-[#D4AF37]/35 text-center space-y-2 shadow-xl">
          <p className="font-serif text-lg sm:text-2xl text-[#FFE27A] tracking-wider drop-shadow-sm font-semibold">
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
          </p>
          <p className="text-xs sm:text-sm text-[#D8CCC4] font-serif">
            "May all beings be in supreme peace and free from affliction; may all perceive auspiciousness."
          </p>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Trust Profile & Statutory Legal Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-md shrink-0 bg-[#2A0E08]">
                <img
                  src="/punya-passport-logo.jpg"
                  alt="पुण्य पासपोर्ट - सलाहकारेश्वर महादेव तीर्थ"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="font-serif font-black text-[#FFE27A] text-lg leading-tight">
                  श्री सलाहकारेश्वर महादेव तीर्थ
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-serif text-[#D8CCC4] font-bold">Salahkareshwar Mahadev Tirth</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-serif font-black uppercase bg-[#6D071A] text-[#FFE885] border border-[#D4AF37]/40">
                    पुण्य पासपोर्ट
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
              A sacred religious sanctum & spiritual initiative dedicated to authentic Vedic Pran Pratishtha, Salahkareshwar Mahadev Shivling Sthapana, and pan-India consecrated Prasad delivery with complete Vedic transparency.
            </p>

            {/* Official Registration Card */}
            <div className="p-3.5 rounded-xl bg-[#1D0C08] border border-[#D4AF37]/30 text-xs space-y-2">
              <div className="text-[#FFE27A] font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FF7722]" />
                <span>Statutory Legal Credentials</span>
              </div>
              <div className="space-y-1 text-stone-300 font-mono text-[11px]">
                <div className="flex justify-between items-center border-b border-stone-800 pb-1">
                  <span className="text-stone-400">e-PAN Card:</span>
                  <strong className="text-amber-300">ABETS6872M</strong>
                </div>
                <div className="flex justify-between items-center border-b border-stone-800 pb-1">
                  <span className="text-stone-400">Date of Formation:</span>
                  <span className="text-stone-300">09/08/2022</span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-stone-400">Udyam Reg:</span>
                  <strong className="text-amber-300">UDYAM-GJ-24-0064289</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Sacred Offerings */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FFE27A] text-base border-b border-[#D4AF37]/25 pb-2 uppercase tracking-wide">
              प्रमुख सेवा व संकल्प (Offerings)
            </h4>
            <ul className="space-y-2.5 text-sm font-serif">
              <li>
                <a href="#shivling-sthapana" className="hover:text-gold-300 transition-colors flex items-center gap-2 text-stone-200">
                  <span className="text-[#FF7722]">›</span>
                  श्री सलाहकारेश्वर शिवलिंग स्थापना (₹5,100)
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-gold-300 transition-colors flex items-center gap-2 text-stone-200">
                  <span className="text-[#FF7722]">›</span>
                  वैदिक प्राण प्रतिष्ठा एवं रुद्राभिषेक
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-gold-300 transition-colors flex items-center gap-2 text-stone-200">
                  <span className="text-[#FF7722]">›</span>
                  गोत्र व यजमान नाम संकल्प विधान
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-gold-300 transition-colors flex items-center gap-2 text-stone-200">
                  <span className="text-[#FF7722]">›</span>
                  पुण्य पासपोर्ट अनुष्ठान पत्र
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-gold-300 transition-colors flex items-center gap-2 text-stone-200">
                  <span className="text-[#FF7722]">›</span>
                  स्पीड पोस्ट द्वारा अभिमंत्रित महाप्रसाद
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Bank Account & UPI Direct Offering */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FFE27A] text-base border-b border-[#D4AF37]/25 pb-2 uppercase tracking-wide flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#FF7722]" />
              <span>बैंक व यूपीआई (Direct Dakshina)</span>
            </h4>
            
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#1E0D08] to-[#170905] border border-[#D4AF37]/35 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                <span className="text-stone-400 font-sans">Bank:</span>
                <span className="font-serif font-bold text-[#FFE27A]">Kotak Mahindra Bank</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                <span className="text-stone-400 font-sans">Branch:</span>
                <span className="text-stone-200">Gotri Branch, Vadodara</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-sans">Current A/c:</span>
                  <button
                    onClick={() => copyToClipboard('2847327173', 'acc')}
                    className="flex items-center gap-1 font-mono font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                    title="Click to copy account number"
                  >
                    <span>2847327173</span>
                    {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-sans">IFSC Code:</span>
                  <button
                    onClick={() => copyToClipboard('KKBK0002747', 'ifsc')}
                    className="flex items-center gap-1 font-mono font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                    title="Click to copy IFSC"
                  >
                    <span>KKBK0002747</span>
                    {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                  </button>
                </div>
              </div>
              <div className="pt-1 border-t border-stone-800">
                <div className="flex items-center justify-between bg-[#2A0E08] p-2 rounded-lg border border-[#D4AF37]/30">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-[#FF7722]" />
                    <span className="text-stone-400 font-sans">UPI ID:</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('Salahkareshwar@kotak', 'upi')}
                    className="flex items-center gap-1 font-mono font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer"
                    title="Click to copy UPI ID"
                  >
                    <span>Salahkareshwar@kotak</span>
                    {copiedField === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 italic font-serif">
              * Dedicated account for temple offerings & Punya Passport rituals.
            </p>
          </div>

          {/* Column 4: Sanctum Secretariat & Helpline */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FFE27A] text-base border-b border-[#D4AF37]/25 pb-2 uppercase tracking-wide">
              सचिवालय व संपर्क (Sanctum Contact)
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF7722] mt-1 shrink-0" />
                <span className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                  408, Souvenir Flats, Opp GreenField Bungalows, Laxmipura, Gotri Sevasi Road, New Alkapuri, Vadodara, Gujarat - 390012
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href="tel:+919825600778"
                  className="font-mono text-sm text-amber-300 hover:underline font-bold"
                >
                  +91 98256 00778
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href="mailto:himanshu@meratrainer.com"
                  className="font-mono text-xs text-stone-300 hover:text-amber-300 underline"
                >
                  himanshu@meratrainer.com
                </a>
              </div>
              <div className="pt-2 text-xs text-stone-400 font-serif border-t border-stone-800">
                दर्शन व संकल्प सेवा समय: प्रातः 6:00 से रात्रि 9:00 बजे तक
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Sankalp Authenticity Disclaimer */}
        <div className="p-4 rounded-xl bg-[#1B0B07] border border-[#D4AF37]/30 text-xs text-stone-300 space-y-1.5 shadow-inner">
          <p className="font-serif font-bold text-[#FFE27A] flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#FF7722]" />
            धार्मिक एवं संकल्प शुचिता घोषणा (Sacred Sankalp Authenticity Declaration)
          </p>
          <p className="leading-relaxed font-serif text-stone-300 text-xs">
            श्री सलाहकारेश्वर महादेव तीर्थ में संपन्न होने वाली समस्त पूजाएं एवं शिवलिंग स्थापना कार्य प्रामाणिक श्रुति-स्मृति विधान से यजमान के नाम व गोत्र का उच्चारण कर संपन्न कराए जाते हैं। प्रसाद की शुचिता (Sanctity) बनाए रखने हेतु केवल शुद्ध वैदिक सामग्री, गंगाजल व सीलबंद वैदिक भस्म का उपयोग होता है।
          </p>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4 font-serif">
          <p>© {new Date().getFullYear()} श्री सलाहकारेश्वर महादेव तीर्थ (Salahkareshwar Mahadev Tirth). सर्वाधिकार सुरक्षित। पुण्य पासपोर्ट पहल।</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-amber-300 transition-colors">नियम व शर्तें (Terms)</a>
            <a href="#privacy" className="hover:text-amber-300 transition-colors">गोपनीयता नीति (Privacy)</a>
            <a href="#refund" className="hover:text-amber-300 transition-colors">रिफंड एवं संकल्प नीति (Refund Policy)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
