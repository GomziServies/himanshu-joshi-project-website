import React from 'react';

interface TestPaymentDialogProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Shown instead of Razorpay while the server runs in demo mode. No money moves. */
export const TestPaymentDialog: React.FC<TestPaymentDialogProps> = ({ amount, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-sanctum/70 p-4">
    <div role="alertdialog" aria-modal="true" aria-labelledby="test-payment-title" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
      <h2 id="test-payment-title" className="font-title text-2xl text-ink">Test payment</h2>
      <p className="mt-2 text-lg text-ink-muted">
        Razorpay keys are not set up yet, so no money will be charged for this ₹{amount.toLocaleString('en-IN')} test.
      </p>
      <div className="mt-5 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-full border border-ivory-200 px-5 py-2 font-medium text-ink hover:bg-ivory-100">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} className="btn-offer !px-5 !py-2 !text-base">
          Complete test payment
        </button>
      </div>
    </div>
  </div>
);

export default TestPaymentDialog;
