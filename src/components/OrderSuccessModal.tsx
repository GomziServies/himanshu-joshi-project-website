import React from 'react';
import { Product, DevoteeSankalp } from '../types';
import { CheckCircle2, Printer, Mail, Sparkles, X, HeartHandshake } from 'lucide-react';

interface OrderSuccessModalProps {
  details: {
    orderId: string;
    orderNumber: string;
    receiptNumber?: string;
    amount: number;
    customer: DevoteeSankalp;
    product: Product;
  };
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ details, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-2xl border-2 border-temple-gold shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:m-0">
        
        {/* Sacred Header */}
        <div className="bg-gradient-to-r from-temple-maroon-dark via-temple-maroon to-temple-sanctum p-6 text-white text-center relative border-b border-temple-gold/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 print:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-full bg-temple-gold/20 border-2 border-temple-gold mx-auto flex items-center justify-center mb-3 shadow-diya">
            <CheckCircle2 className="w-9 h-9 text-temple-gold" />
          </div>
          <span className="text-xs font-serif uppercase tracking-widest text-temple-gold-light block">
            ॥ श्री हर हर महादेव ॥
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Seva Consecration Confirmed
          </h2>
          <p className="text-xs text-gray-200 mt-1">
            Your sacred Sankalp has been accepted and scheduled at the sanctum.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Key Identifiers */}
          <div className="grid grid-cols-2 gap-4 bg-temple-ivory-warm rounded-xl p-4 border border-temple-gold/30 text-xs">
            <div>
              <span className="text-gray-500 block uppercase font-medium">Order Number</span>
              <span className="font-mono font-bold text-temple-sanctum text-sm">{details.orderNumber}</span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase font-medium">Receipt Number</span>
              <span className="font-mono font-bold text-temple-maroon text-sm">
                {details.receiptNumber || 'RCPT-ONLINE-GENERATED'}
              </span>
            </div>
          </div>

          {/* Seva Summary */}
          <div className="space-y-3 text-xs border-b border-gray-100 pb-4">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Seva Offering:</span>
              <span className="font-serif font-bold text-temple-sanctum">{details.product.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Devotee (Yajman):</span>
              <span className="font-medium text-temple-sanctum">{details.customer.sankalpName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Family Gotra:</span>
              <span className="font-medium text-temple-sanctum">{details.customer.gotra}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Seva Date:</span>
              <span className="font-medium text-temple-sanctum">{details.customer.ceremonyDate}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-semibold">Total Dakshina Paid:</span>
              <span className="font-serif font-bold text-base text-temple-maroon">
                ₹{details.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Email Notice Card */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">Automated Email Receipt Dispatched</p>
              <p>
                A consecrated, itemized payment receipt has been dispatched to{' '}
                <span className="font-semibold underline">{details.customer.email}</span>. A permanent copy is stored in the Temple Trust Ledger.
              </p>
            </div>
          </div>

          {/* Dispatch Notice */}
          <div className="p-4 rounded-xl bg-temple-ivory-warm border border-temple-gold/40 flex items-start gap-3 text-xs text-gray-700">
            <Sparkles className="w-4 h-4 text-temple-gold flex-shrink-0 mt-0.5" />
            <p>
              The sanctified Prasad box containing the consecrated Narmadeshwar Shivling, Bhasma, and holy Gangajal will be dispatched to your registered address in{' '}
              <span className="font-semibold">{details.customer.address.city}, {details.customer.address.state}</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-lg border border-temple-gold/60 text-temple-sanctum font-serif text-xs font-bold uppercase tracking-wider hover:bg-temple-ivory-dark transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-temple-gold" />
              <span>Print Trust Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg saffron-gradient text-white font-serif text-xs font-bold uppercase tracking-wider shadow-diya hover:shadow-gold-glow transition-all flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Return to Sanctum Home</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

