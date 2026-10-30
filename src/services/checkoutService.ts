/**
 * src/services/checkoutService.ts
 * Orchestrates order initiation, Razorpay modal launch, payment verification, and receipt generation.
 */
import { apiRequest } from './apiClient';
import { loadRazorpayScript } from './razorpayLoader';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  ProductOffering
} from '../types/api';
import { RazorpayOptions, RazorpayPaymentSuccessPayload } from '../types/razorpay';

export interface InitiateCheckoutParams {
  request: CreateOrderRequest;
  offering: ProductOffering;
  onSuccess: (receipt: VerifyPaymentResponse) => void;
  onError: (error: Error) => void;
  onDismiss?: () => void;
}

export async function initiateRazorpayCheckout(params: InitiateCheckoutParams): Promise<void> {
  const { request, offering, onSuccess, onError, onDismiss } = params;

  try {
    // Step 1: Ensure Razorpay SDK is loaded
    await loadRazorpayScript();

    // Step 2: Request server to calculate authoritative total and create Razorpay order
    const orderData = await apiRequest<CreateOrderResponse>('/orders/create-order', {
      method: 'POST',
      body: JSON.stringify(request),
      timeoutMs: 10000
    });

    if (!orderData || !orderData.success || !orderData.razorpayOrderId) {
      throw new Error(orderData?.message || 'Failed to initialize temple offering order with payment gateway.');
    }

    // Step 3: Configure Razorpay modal options
    const options: RazorpayOptions = {
      key: orderData.key || 'rzp_test_placeholder',
      amount: orderData.amount, // in paise
      currency: orderData.currency || 'INR',
      name: 'Salahkareshwar Mahadev Tirth (पुण्य पासपोर्ट)',
      description: `${offering.title} (Sankalp: ${request.customer.sankalpName || request.customer.name})`,
      image: typeof window !== 'undefined' ? `${window.location.origin}/punya-passport-logo.jpg` : '/punya-passport-logo.jpg',
      order_id: orderData.razorpayOrderId,
      prefill: {
        name: request.customer.name,
        email: request.customer.email,
        contact: request.customer.phone
      },
      notes: {
        orderNumber: orderData.orderNumber,
        sankalpName: request.customer.sankalpName,
        gotra: request.customer.gotra,
        offeringTitle: offering.title
      },
      theme: {
        color: '#8B0000', // Deep Sanctum Crimson / Temple Maroon
        backdrop_color: 'rgba(26, 20, 18, 0.85)'
      },
      handler: async (response: RazorpayPaymentSuccessPayload) => {
        try {
          // Step 4: Dispatch payment verification tokens to server
          const verificationPayload: VerifyPaymentRequest = {
            orderId: orderData.orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          const verifyResult = await apiRequest<VerifyPaymentResponse>('/orders/verify-payment', {
            method: 'POST',
            body: JSON.stringify(verificationPayload),
            timeoutMs: 12000
          });

          if (!verifyResult || !verifyResult.success) {
            throw new Error(verifyResult?.message || 'Cryptographic payment verification failed.');
          }

          // Step 5: Notify devotee with verified receipt
          onSuccess(verifyResult);
        } catch (verifyErr: any) {
          onError(
            new Error(
              `Payment verification alert: ${verifyErr.message}. If payment was deducted, reference Payment ID ${response.razorpay_payment_id} with our temple helpdesk.`
            )
          );
        }
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
        escape: false,
        backdropclose: false
      }
    };

    // Step 6: Launch modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error: any) {
    onError(error instanceof Error ? error : new Error(error.message || 'Payment initiation failed'));
  }
}
