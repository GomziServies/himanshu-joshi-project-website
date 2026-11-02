import React from 'react';
import { Printer } from 'lucide-react';
import { CheckoutLine, DevoteeCustomer, VerifyPaymentResponse } from '../../types/api';
import { Diya } from '../layout/Ornaments';

interface SacredReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: VerifyPaymentResponse;
  devotee: DevoteeCustomer;
  lines: CheckoutLine[];
}

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-ivory-200 py-2 last:border-0">
    <dt className="shrink-0 text-ink-muted">{label}</dt>
    <dd className="text-right font-medium text-ink">{value}</dd>
  </div>
);

export const SacredReceiptModal: React.FC<SacredReceiptModalProps> = ({
  isOpen,
  onClose,
  receiptData,
  devotee,
  lines
}) => {
  if (!isOpen) return null;

  const { address } = devotee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-sanctum/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
        className="print-area my-8 w-full max-w-lg overflow-hidden rounded-2xl bg-ivory-50 shadow-2xl"
      >
        <div className="jaali bg-sanctum px-6 pb-6 pt-5 text-center">
          <Diya className="mx-auto h-16 w-16" />
          <p lang="hi" className="mt-1 font-deva text-2xl text-marigold-400">हर हर महादेव</p>
          <h2 id="receipt-title" className="mt-1 font-title text-2xl text-brass-300">Your offering is received</h2>
          <p className="mt-1 text-ivory-200/80">
            Thank you, {devotee.name}. May Mahadev bless you and your family.
          </p>
        </div>

        <div className="px-6 py-5">
          <dl>
            <Row label="Receipt no." value={receiptData.receiptNumber} />
            <Row label="Order no." value={receiptData.orderNumber} />
            <Row
              label="Offering"
              value={lines.map((line) => (
                <span key={line.product._id} className="block">
                  {line.product.title} × {line.quantity}
                </span>
              ))}
            />
            {devotee.gotra && <Row label="Gotra" value={devotee.gotra} />}
            <Row
              label="Send to"
              value={`${address.street}, ${address.city}, ${address.state} - ${address.postalCode}`}
            />
            <Row
              label="Amount"
              value={<span className="text-2xl font-bold text-sindoor-600">₹{receiptData.amount?.toLocaleString('en-IN')}</span>}
            />
          </dl>

          <p className="mt-4 text-center text-sm text-ink-muted">
            श्री सलाहकारेश्वर महादेव तीर्थ, Gotri, Vadodara
            <br />
            e-PAN ABETS6872M · +91 98256 00778
          </p>

          <div className="mt-5 flex justify-end gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-brass-500 px-5 py-2 font-medium text-ink hover:bg-ivory-100"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button type="button" onClick={onClose} className="btn-offer !px-6 !py-2 !text-base">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredReceiptModal;
