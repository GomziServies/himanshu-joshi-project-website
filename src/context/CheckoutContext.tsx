import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckoutLine, DevoteeCustomer, VerifyPaymentResponse } from '../types/api';
import { initiateRazorpayCheckout } from '../services/checkoutService';
import { SankalpDrawer } from '../components/sankalp/SankalpDrawer';
import { TestPaymentDialog } from '../components/sankalp/TestPaymentDialog';
import { SacredReceiptModal } from '../components/receipt/SacredReceiptModal';
import { useCart } from './CartContext';

interface StartCheckoutOptions {
  /** Empty the cart once this payment succeeds. */
  fromCart?: boolean;
}

interface CheckoutContextValue {
  startCheckout: (lines: CheckoutLine[], options?: StartCheckoutOptions) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

export function totalOf(lines: CheckoutLine[]): number {
  return lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
}

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clear } = useCart();
  const [checkout, setCheckout] = useState<{ lines: CheckoutLine[]; fromCart: boolean } | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolveTestPayment, setResolveTestPayment] = useState<((confirmed: boolean) => void) | null>(null);
  const [receipt, setReceipt] = useState<{
    receipt: VerifyPaymentResponse;
    devotee: DevoteeCustomer;
    lines: CheckoutLine[];
  } | null>(null);

  const startCheckout = useCallback((lines: CheckoutLine[], options: StartCheckoutOptions = {}) => {
    setError(null);
    setCheckout({ lines, fromCart: Boolean(options.fromCart) });
  }, []);

  const closeCheckout = useCallback(() => setCheckout(null), []);

  const answerTestPayment = (confirmed: boolean) => {
    resolveTestPayment?.(confirmed);
    setResolveTestPayment(null);
  };

  const handleSubmit = async (customer: DevoteeCustomer) => {
    if (!checkout) return;
    const { lines, fromCart } = checkout;
    setIsPaying(true);
    setError(null);

    await initiateRazorpayCheckout({
      request: {
        customer: { ...customer, sankalpName: customer.name },
        items: lines.map((line) => ({ productId: line.product._id, quantity: line.quantity }))
      },
      description: lines.map((line) => `${line.product.title} × ${line.quantity}`).join(', ').slice(0, 250),
      confirmTestPayment: () => new Promise<boolean>((resolve) => setResolveTestPayment(() => resolve)),
      onSuccess: (result) => {
        setIsPaying(false);
        setCheckout(null);
        if (fromCart) clear();
        setReceipt({ receipt: result, devotee: customer, lines });
      },
      onError: (err) => {
        setIsPaying(false);
        setError(err.message);
      },
      onDismiss: () => setIsPaying(false)
    });
  };

  return (
    <CheckoutContext.Provider value={{ startCheckout }}>
      {children}

      {checkout && (
        <SankalpDrawer
          lines={checkout.lines}
          isOpen
          onClose={closeCheckout}
          onSubmit={handleSubmit}
          isLoading={isPaying}
          error={error}
        />
      )}

      {resolveTestPayment && checkout && (
        <TestPaymentDialog
          amount={totalOf(checkout.lines)}
          onConfirm={() => answerTestPayment(true)}
          onCancel={() => answerTestPayment(false)}
        />
      )}

      {receipt && (
        <SacredReceiptModal
          isOpen
          onClose={() => setReceipt(null)}
          receiptData={receipt.receipt}
          devotee={receipt.devotee}
          lines={receipt.lines}
        />
      )}
    </CheckoutContext.Provider>
  );
};

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used within a CheckoutProvider');
  return context;
}
