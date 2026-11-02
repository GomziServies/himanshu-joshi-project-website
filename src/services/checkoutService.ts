/**
 * src/services/checkoutService.ts
 * Orchestrates order initiation, the payment step (Razorpay, or a simulated test payment
 * when the server is in demo mode), and server-side payment verification.
 */
import { apiRequest } from './apiClient';
import { loadRazorpayScript } from './razorpayLoader';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse
} from '../types/api';
import { RazorpayOptions, RazorpayPaymentSuccessPayload } from '../types/razorpay';

export interface InitiateCheckoutParams {
  request: CreateOrderRequest;
  description: string;
  confirmTestPayment: () => Promise<boolean>;
  onSuccess: (receipt: VerifyPaymentResponse) => void;
  onError: (error: Error) => void;
  onDismiss?: () => void;
}

export async function initiateRazorpayCheckout(params: InitiateCheckoutParams): Promise<void> {
  const { request, description, confirmTestPayment, onSuccess, onError, onDismiss } = params;

  try {
    // Step 1: Server computes the authoritative total and creates the gateway order
    const orderData = await apiRequest<CreateOrderResponse>('/orders/create-order', {
      method: 'POST',
      body: JSON.stringify(request),
      timeoutMs: 15000
    });

    const verifyAndFinish = async (response: RazorpayPaymentSuccessPayload) => {
      try {
        const verificationPayload: VerifyPaymentRequest = {
          orderId: orderData.orderId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        };

        const verifyResult = await apiRequest<VerifyPaymentResponse>('/orders/verify-payment', {
          method: 'POST',
          body: JSON.stringify(verificationPayload),
          timeoutMs: 15000
        });

        onSuccess(verifyResult);
      } catch (verifyErr: any) {
        onError(
          new Error(
            `We could not confirm your payment. If money was deducted, please call +91 98256 00778 with Payment ID ${response.razorpay_payment_id}. (${verifyErr.message})`
          )
        );
      }
    };

    // Step 2a: Demo mode has no gateway, so ask for an explicit test confirmation
    if (orderData.isDemo) {
      if (await confirmTestPayment()) {
        await verifyAndFinish({
          razorpay_order_id: orderData.razorpayOrderId,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: 'demo_mock_signature'
        });
      } else if (onDismiss) {
        onDismiss();
      }
      return;
    }

    // Step 2b: Live payment through the Razorpay modal
    await loadRazorpayScript();

    const options: RazorpayOptions = {
      key: orderData.key,
      amount: orderData.amount, // in paise
      currency: orderData.currency || 'INR',
      name: 'Salahkareshwar Mahadev Tirth',
      description,
      image: `${window.location.origin}/punya-passport-logo.jpg`,
      order_id: orderData.razorpayOrderId,
      prefill: {
        name: request.customer.name,
        email: request.customer.email,
        contact: request.customer.phone
      },
      notes: {
        orderNumber: orderData.orderNumber,
        offering: description
      },
      theme: {
        color: '#7A5B1E'
      },
      handler: verifyAndFinish,
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
        escape: false,
        backdropclose: false
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error: any) {
    onError(error instanceof Error ? error : new Error(error.message || 'Payment could not be started.'));
  }
}
