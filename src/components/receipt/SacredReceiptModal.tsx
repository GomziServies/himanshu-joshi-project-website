import React from 'react';
import { VerifyPaymentResponse, DevoteeCustomer, ProductOffering } from '../../types/api';
import { Printer, X, ShieldCheck, HeartHandshake, Landmark } from 'lucide-react';

interface SacredReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: VerifyPaymentResponse;
  devotee: DevoteeCustomer;
  offering: ProductOffering;
}

export const SacredReceiptModal: React.FC<SacredReceiptModalProps> = ({
  isOpen,
  onClose,
  receiptData,
  devotee,
  offering
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] text-[#1A1412] rounded-2xl shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 my-8 print:p-0 print:border-none print:shadow-none print:bg-white print:w-full">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors print:hidden cursor-pointer"
          aria-label="Close receipt"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Sacred Header with Punya Passport Medallion */}
        <div className="text-center border-b-2 border-[#D4AF37]/40 pb-6 mb-6 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-md mb-1 bg-[#2A0E08]">
            <img
              src="/punya-passport-logo.jpg"
              alt="पुण्य पासपोर्ट - सलाहकारेश्वर महादेव तीर्थ"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs font-serif font-black tracking-widest text-[#FF7722] uppercase">
            ॥ श्री सलाहकारेश्वर विजयते ॥
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#6D071A]">
            श्री सलाहकारेश्वर महादेव तीर्थ
          </h2>
          <p className="text-xs font-serif text-stone-700 font-semibold tracking-wider">
            पुण्य पासपोर्ट (Punya Passport) • Sacred Consecration & Seva Receipt
          </p>
          <div className="text-[11px] text-stone-600 font-mono flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1">
            <span>Gotri, Vadodara (Gujarat)</span>
            <span>•</span>
            <span>e-PAN: <strong className="text-stone-900">ABETS6872M</strong></span>
            <span>•</span>
            <span>Udyam: <strong className="text-stone-900">UDYAM-GJ-24-0064289</strong></span>
          </div>
        </div>

        {/* Vedic Blessing */}
        <div className="bg-[#FAF4EB] border border-[#D4AF37]/50 rounded-xl p-4 text-center mb-6">
          <p className="font-serif text-[#6D071A] font-bold text-sm sm:text-base italic">
            "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥"
          </p>
          <p className="text-xs text-stone-600 mt-1 font-serif">
            May Mahadev’s supreme grace, longevity, and auspicious prosperity illuminate your family lineage.
          </p>
        </div>

        {/* Itemized Order & Financial Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 bg-white p-4 rounded-xl border border-stone-200">
          <div>
            <span className="text-stone-500 text-xs uppercase block font-sans">Official Receipt Number</span>
            <span className="font-mono font-bold text-[#6D071A]">{receiptData.receiptNumber}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block font-sans">Tirth Order Number</span>
            <span className="font-mono font-bold text-stone-800">{receiptData.orderNumber}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block font-sans">Consecrated Seva / Offering</span>
            <span className="font-semibold text-stone-900 font-serif">{offering.title}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block font-sans">Net Dakshina Amount</span>
            <span className="font-bold text-xl text-[#6D071A] font-serif">₹{receiptData.amount?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Sankalp & Devotee Credentials */}
        <div className="border border-stone-200 rounded-xl p-4 text-sm mb-6 bg-[#FAF4EB]">
          <h4 className="font-serif font-bold text-[#6D071A] mb-2 text-sm flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#FF7722]" /> 
            <span>Devotee Vedic Sankalp Particulars (यजमान संकल्प)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
            <div>
              <span className="text-stone-500 block font-sans">Yajman Name:</span>
              <strong className="text-stone-900 text-sm">{devotee.name}</strong>
            </div>
            <div>
              <span className="text-stone-500 block font-sans">Sankalp Gotra:</span>
              <strong className="text-stone-900 text-sm">{devotee.gotra || 'Kashyapa'}</strong>
            </div>
            {devotee.nakshatra && (
              <div>
                <span className="text-stone-500 block font-sans">Janma Nakshatra:</span>
                <strong className="text-stone-900">{devotee.nakshatra}</strong>
              </div>
            )}
            <div>
              <span className="text-stone-500 block font-sans">Prayer Intention:</span>
              <strong className="text-stone-900">{devotee.prayerIntention || 'Family Peace & Prosperity'}</strong>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#D4AF37]/30 text-xs">
            <span className="text-stone-500 block font-sans">Consecrated Prasad Speed Post Address:</span>
            <p className="text-stone-900 font-medium">
              {devotee.address.street}, {devotee.address.city}, {devotee.address.state} -{' '}
              {devotee.address.postalCode}, {devotee.address.country}
            </p>
          </div>
        </div>

        {/* Official Bank Settlement Metadata */}
        <div className="p-3 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-600 mb-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#6D071A]" />
            <span>Bank: <strong>Kotak Mahindra Bank, Gotri Branch</strong></span>
          </div>
          <span>A/c: <strong className="font-mono">2847327173</strong></span>
          <span>IFSC: <strong className="font-mono">KKBK0002747</strong></span>
          <span>UPI: <strong className="font-mono text-emerald-800">Salahkareshwar@kotak</strong></span>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-200 pt-4 mb-6">
          <span className="flex items-center gap-1.5 font-medium text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Cryptographically Verified & Logged in Tirth Ledger
          </span>
          <span className="text-stone-600 font-serif">Helpline: +91 98256 00778</span>
        </div>

        {/* Action Buttons (Print / Done) */}
        <div className="flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37] text-[#6D071A] bg-amber-50 hover:bg-amber-100 font-semibold text-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Official Receipt
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-lg bg-[#6D071A] hover:bg-[#520513] text-[#FFE885] font-semibold text-sm transition-colors shadow-md cursor-pointer border border-[#D4AF37]/40"
          >
            हर हर महादेव (Done)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SacredReceiptModal;
