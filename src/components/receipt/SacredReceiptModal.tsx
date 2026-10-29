import React from 'react';
import { VerifyPaymentResponse, DevoteeCustomer, ProductOffering } from '../../types/api';
import { CheckCircle2, Printer, X, ShieldCheck, HeartHandshake } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] text-[#1A1412] rounded-2xl shadow-2xl border-2 border-gold-500/50 p-6 sm:p-8 my-8 print:p-0 print:border-none print:shadow-none print:bg-white print:w-full">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors print:hidden cursor-pointer"
          aria-label="Close receipt"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Sacred Header */}
        <div className="text-center border-b-2 border-gold-500/30 pb-6 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-maroon-700/10 text-maroon-700 mb-3 print:mb-1">
            <CheckCircle2 className="w-10 h-10 text-maroon-700" />
          </div>
          <p className="text-xs font-semibold tracking-widest text-saffron-600 uppercase">
            ॥ श्री महादेवाष्टकम् ॥
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-maroon-700 mt-1">
            Offering Consecration Receipt
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Shree Somnath Sanctum Seva Trust • Reg No: TR-108/VARANASI • 80G Tax Exempt
          </p>
        </div>

        {/* Vedic Blessing */}
        <div className="bg-[#FAF4EB] border border-gold-500/40 rounded-xl p-4 text-center mb-6">
          <p className="font-serif text-maroon-700 font-semibold text-sm sm:text-base italic">
            "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥"
          </p>
          <p className="text-xs text-stone-600 mt-1">
            May Mahadev’s supreme grace, health, and auspicious prosperity illuminate your family lineage.
          </p>
        </div>

        {/* Itemized Order & Financial Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 bg-white p-4 rounded-xl border border-stone-200">
          <div>
            <span className="text-stone-500 text-xs uppercase block">Receipt Number</span>
            <span className="font-mono font-bold text-maroon-700">{receiptData.receiptNumber}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block">Temple Order Number</span>
            <span className="font-mono font-bold text-stone-800">{receiptData.orderNumber}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block">Offering / Seva</span>
            <span className="font-semibold text-stone-900">{offering.title}</span>
          </div>
          <div>
            <span className="text-stone-500 text-xs uppercase block">Dakshina Amount</span>
            <span className="font-bold text-lg text-maroon-700">₹{receiptData.amount?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Sankalp & Devotee Credentials */}
        <div className="border border-stone-200 rounded-xl p-4 text-sm mb-6 bg-[#FAF4EB]">
          <h4 className="font-serif font-bold text-maroon-700 mb-2 text-sm flex items-center gap-2">
            <HeartHandshake className="w-4 h-4" /> Devotee Sankalp Particulars
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-stone-500 block">Yajman Name:</span>
              <strong className="text-stone-900">{devotee.name}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Sankalp Gotra:</span>
              <strong className="text-stone-900">{devotee.gotra || 'Kashyapa'}</strong>
            </div>
            {devotee.nakshatra && (
              <div>
                <span className="text-stone-500 block">Nakshatra:</span>
                <strong className="text-stone-900">{devotee.nakshatra}</strong>
              </div>
            )}
            <div>
              <span className="text-stone-500 block">Prayer Intention:</span>
              <strong className="text-stone-900">{devotee.prayerIntention || 'Family Peace & Prosperity'}</strong>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gold-500/20 text-xs">
            <span className="text-stone-500 block">Consecrated Prasad Delivery Address:</span>
            <p className="text-stone-800">
              {devotee.address.street}, {devotee.address.city}, {devotee.address.state} -{' '}
              {devotee.address.postalCode}, {devotee.address.country}
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-200 pt-4 mb-6">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Cryptographically Verified
          </span>
          <span>Prasad Dispatched via India Post Speed Post</span>
        </div>

        {/* Action Buttons (Print / Done) */}
        <div className="flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold-500 text-maroon-700 bg-amber-50 hover:bg-amber-100 font-semibold text-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-lg bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-sm transition-colors shadow-md cursor-pointer"
          >
            Jai Mahadev (Done)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SacredReceiptModal;
